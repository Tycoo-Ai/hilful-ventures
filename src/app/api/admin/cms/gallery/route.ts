import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  getGalleryServer,
  saveGalleryItemServer,
  deleteGalleryItemServer,
} from "@/lib/cms/cms-service";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  // Admin gets full list (including drafts) from persistent store
  const items = await getGalleryServer(true);
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  try {
    const item = await request.json();
    if (!item?.id || !item?.title) {
      return NextResponse.json({ error: "Gallery item title and ID are required" }, { status: 400 });
    }
    const saved = await saveGalleryItemServer(item);
    return NextResponse.json({ success: true, item: saved });
  } catch (err) {
    console.error("Gallery CMS API error:", err);
    return NextResponse.json({ error: "Failed to save gallery item" }, { status: 500 });
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
        { error: "Invalid gallery item ID provided" },
        { status: 400 }
      );
    }

    await deleteGalleryItemServer(id);

    return NextResponse.json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (err: unknown) {
    console.error("Gallery CMS API delete error:", err);
    return NextResponse.json(
      { error: "Failed to delete gallery item" },
      { status: 500 }
    );
  }
}
