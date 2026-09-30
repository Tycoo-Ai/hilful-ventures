import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import path from "path";
import {
  isCloudinaryConfigured,
  uploadToCloudinary,
  getCloudinaryFolder,
} from "@/lib/cloudinary";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const category = (formData.get("category") as string) || "General";
    const altText = (formData.get("altText") as string) || "";
    const caption = (formData.get("caption") as string) || "";
    const replaceId = formData.get("replaceId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Allowed MIME types: images and videos
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
      "image/svg+xml",
      "image/gif",
      "video/mp4",
      "video/webm",
      "video/quicktime",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: `Unsupported file type: ${file.type}. Please upload an image (JPG, PNG, WebP, SVG) or video (MP4, WebM).`,
        },
        { status: 400 }
      );
    }

    // Maximum file size: 25MB for images, 100MB for videos
    const isVideo = file.type.startsWith("video/");
    const maxBytes = isVideo ? 100 * 1024 * 1024 : 25 * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        {
          error: `File size exceeds limit (${isVideo ? "100MB" : "25MB"}).`,
        },
        { status: 400 }
      );
    }

    // Generate sanitized clean filename
    const originalExt = path.extname(file.name) || (isVideo ? ".mp4" : ".jpg");
    const rawName = path.basename(file.name, originalExt).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40);
    const publicId = `${rawName}_${Date.now()}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let finalUrl = "";
    let provider = "LOCAL";
    let width = 1200;
    let height = 800;
    let format = originalExt.replace(".", "") || "jpg";

    if (isCloudinaryConfigured()) {
      try {
        const folder = getCloudinaryFolder(category);
        const cloudinaryResult = await uploadToCloudinary(buffer, {
          folder,
          publicId,
          resourceType: isVideo ? "video" : "image",
          tags: ["hilful-ventures", category.toLowerCase()],
        });
        finalUrl = cloudinaryResult.secureUrl;
        provider = "CLOUDINARY";
        width = cloudinaryResult.width;
        height = cloudinaryResult.height;
        format = cloudinaryResult.format;
      } catch (cloudErr) {
        console.warn("[Cloudinary Upload] Falling back to local storage:", cloudErr);
      }
    }

    // If Cloudinary is not configured or failed, save directly to public/uploads
    if (!finalUrl) {
      const fs = await import("fs/promises");
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadsDir, { recursive: true });
      const savedFileName = `${publicId}${originalExt}`;
      const filePath = path.join(uploadsDir, savedFileName);
      await fs.writeFile(filePath, buffer);
      finalUrl = `/uploads/${savedFileName}`;
      provider = "LOCAL";
    }

    let asset = null;
    try {
      if (replaceId) {
        asset = await prisma.mediaAsset.update({
          where: { id: replaceId },
          data: {
            filename: file.name,
            url: finalUrl,
            altText: altText || rawName.replace(/_/g, " "),
            width,
            height,
            format,
            category,
            caption: caption || file.name,
            provider: provider as "CLOUDINARY" | "LOCAL" | "UNSPLASH",
            publicId,
          },
        });
      } else {
        asset = await prisma.mediaAsset.create({
          data: {
            filename: file.name,
            url: finalUrl,
            altText: altText || rawName.replace(/_/g, " "),
            width,
            height,
            format,
            category,
            caption: caption || file.name,
            provider: provider as "CLOUDINARY" | "LOCAL" | "UNSPLASH",
            publicId,
          },
        });
      }
    } catch (dbErr) {
      console.warn("[Upload API] MediaAsset DB record skipped (standalone mode):", dbErr);
    }

    try {
      revalidatePath("/admin/media");
    } catch {}

    return NextResponse.json({
      success: true,
      url: finalUrl,
      publicId,
      asset: asset || {
        id: publicId,
        url: finalUrl,
        filename: file.name,
        category,
        altText: altText || rawName,
      },
      message: provider === "CLOUDINARY" ? "Media uploaded to Cloudinary." : "Media uploaded successfully to local storage.",
    });
  } catch (err: unknown) {
    console.error("[Media Upload API] Error:", err);
    const errorMsg = err instanceof Error ? err.message : "Failed to process binary upload.";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
