import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  getProjectList,
  saveProjectItem,
} from "@/lib/cms/repository";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  // Admin gets full project showcase list including drafts
  const items = await getProjectList(true);
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
      return NextResponse.json({ error: "Project title and ID are required" }, { status: 400 });
    }
    const saved = await saveProjectItem(item);
    return NextResponse.json({ success: true, item: saved });
  } catch (err) {
    console.error("Projects CMS API error:", err);
    return NextResponse.json({ error: "Failed to save project item" }, { status: 500 });
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
        { error: "Invalid project item ID provided" },
        { status: 400 }
      );
    }

    const existing = await prisma.project.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Project item not found or already deleted", notFound: true },
        { status: 404 }
      );
    }

    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/en/projects");
    revalidatePath("/ar/projects");
    revalidatePath("/[locale]/projects", "page");

    return NextResponse.json({
      success: true,
      message: "Project item deleted successfully",
    });
  } catch (err: unknown) {
    const prismaErr = err as { code?: string };
    if (prismaErr?.code === "P2025") {
      return NextResponse.json(
        { error: "Project item not found or already deleted", notFound: true },
        { status: 404 }
      );
    }
    console.error("Projects CMS API delete error:", err);
    return NextResponse.json(
      { error: "Failed to delete project item" },
      { status: 500 }
    );
  }
}
