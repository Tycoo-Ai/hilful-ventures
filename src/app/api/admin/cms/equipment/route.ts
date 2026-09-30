import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  getEquipmentList,
  saveEquipmentItem,
} from "@/lib/cms/repository";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  // Admin gets full equipment catalog including drafts
  const items = await getEquipmentList(true);
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  try {
    const item = await request.json();
    if (!item?.id || !item?.name) {
      return NextResponse.json({ error: "Equipment name and ID are required" }, { status: 400 });
    }
    const saved = await saveEquipmentItem(item);
    return NextResponse.json({ success: true, item: saved });
  } catch (err) {
    console.error("Equipment CMS API error:", err);
    return NextResponse.json({ error: "Failed to save equipment item" }, { status: 500 });
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
        { error: "Invalid equipment item ID provided" },
        { status: 400 }
      );
    }

    const existing = await prisma.equipment.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Equipment item not found or already deleted", notFound: true },
        { status: 404 }
      );
    }

    await prisma.equipment.delete({
      where: { id },
    });

    revalidatePath("/en/equipment");
    revalidatePath("/ar/equipment");
    revalidatePath("/[locale]/equipment", "page");

    return NextResponse.json({
      success: true,
      message: "Equipment item deleted successfully",
    });
  } catch (err: unknown) {
    const prismaErr = err as { code?: string };
    if (prismaErr?.code === "P2025") {
      return NextResponse.json(
        { error: "Equipment item not found or already deleted", notFound: true },
        { status: 404 }
      );
    }
    console.error("Equipment CMS API error:", err);
    return NextResponse.json(
      { error: "Failed to delete equipment item" },
      { status: 500 }
    );
  }
}
