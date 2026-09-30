import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getMediaUsages } from "@/lib/cms/media-usage";
import { deleteFromCloudinary, isCloudinaryConfigured, getCloudinaryStatus } from "@/lib/cloudinary";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  try {
    const rawAssets = await prisma.mediaAsset.findMany({
      orderBy: { uploadedAt: "desc" },
    });

    // Populate live usage tracking for each asset
    const assetsWithUsage = await Promise.all(
      rawAssets.map(async (a) => {
        const usages = await getMediaUsages(a.id, a.url);
        return {
          id: a.id,
          filename: a.filename,
          url: a.url,
          altText: a.altText,
          width: a.width,
          height: a.height,
          format: a.format,
          category: a.category || "General",
          caption: a.caption || undefined,
          provider: (a.provider || "CLOUDINARY") as "CLOUDINARY" | "LOCAL" | "UNSPLASH",
          publicId: a.publicId || null,
          uploadedAt: a.uploadedAt.toISOString(),
          updatedAt: a.updatedAt.toISOString(),
          usages,
          inUse: usages.length > 0,
        };
      })
    );

    const cloudinaryStatus = getCloudinaryStatus();

    return NextResponse.json({
      assets: assetsWithUsage,
      cloudinary: cloudinaryStatus,
    });
  } catch (err: unknown) {
    console.error("Media CMS API fetch error:", err);
    return NextResponse.json({ error: "Failed to load media library" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  try {
    const asset = await request.json();
    if (!asset?.filename || !asset?.url) {
      return NextResponse.json({ error: "Filename and URL are required" }, { status: 400 });
    }

    const saved = await prisma.mediaAsset.upsert({
      where: { id: asset.id || `med-${Date.now()}` },
      update: {
        filename: asset.filename,
        url: asset.url,
        altText: asset.altText || "",
        width: asset.width || 1920,
        height: asset.height || 1080,
        format: asset.format || "jpg",
        category: asset.category || "General",
        caption: asset.caption || null,
        provider: asset.provider || "CLOUDINARY",
        publicId: asset.publicId || null,
      },
      create: {
        id: asset.id || `med-${Date.now()}`,
        filename: asset.filename,
        url: asset.url,
        altText: asset.altText || "",
        width: asset.width || 1920,
        height: asset.height || 1080,
        format: asset.format || "jpg",
        category: asset.category || "General",
        caption: asset.caption || null,
        provider: asset.provider || "CLOUDINARY",
        publicId: asset.publicId || null,
        uploadedAt: asset.uploadedAt ? new Date(asset.uploadedAt) : new Date(),
      },
    });

    return NextResponse.json({ success: true, asset: saved });
  } catch (err: unknown) {
    console.error("Media CMS API save error:", err);
    return NextResponse.json({ error: "Failed to save media asset" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = body?.id;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Invalid media asset ID provided" },
        { status: 400 }
      );
    }

    const existing = await prisma.mediaAsset.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Media asset not found or already deleted", notFound: true },
        { status: 404 }
      );
    }

    // Check usage tracking: DO NOT delete if asset is currently in use
    const usages = await getMediaUsages(existing.id, existing.url);
    if (usages.length > 0) {
      return NextResponse.json(
        {
          error: "This media is currently in use and cannot be deleted safely.",
          inUse: true,
          usages,
        },
        { status: 409 }
      );
    }

    // If hosted on Cloudinary, delete from remote storage
    if (existing.provider === "CLOUDINARY" && existing.publicId && isCloudinaryConfigured()) {
      try {
        await deleteFromCloudinary(existing.publicId, existing.format === "mp4" ? "video" : "image");
      } catch (cloudErr) {
        console.warn("[Media CMS API] Remote Cloudinary delete notice:", cloudErr);
      }
    }

    await prisma.mediaAsset.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Media asset deleted successfully",
    });
  } catch (err: unknown) {
    const prismaErr = err as { code?: string };
    if (prismaErr?.code === "P2025") {
      return NextResponse.json(
        { error: "Media asset not found or already deleted", notFound: true },
        { status: 404 }
      );
    }
    console.error("Media CMS API error:", err);
    return NextResponse.json({ error: "Failed to delete media asset" }, { status: 500 });
  }
}
