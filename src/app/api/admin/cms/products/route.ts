import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getProductsServer, saveProductServer, deleteProductServer } from "@/lib/cms/cms-service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dept = searchParams.get("department") || undefined;
    const products = await getProductsServer(dept);
    return NextResponse.json({ success: true, products });
  } catch (err: unknown) {
    console.error("[Products API GET] Error:", err);
    return NextResponse.json({ error: "Failed to retrieve products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body || !body.name || !body.departmentSlug) {
      return NextResponse.json({ error: "Product name and department are required" }, { status: 400 });
    }

    const saved = await saveProductServer(body);
    return NextResponse.json({ success: true, product: saved });
  } catch (err: unknown) {
    console.error("[Products API POST] Error:", err);
    const msg = err instanceof Error ? err.message : "Failed to save product";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const idOrSlug = body.slug || body.id;
    if (!idOrSlug) {
      return NextResponse.json({ error: "Product identifier is required" }, { status: 400 });
    }

    await deleteProductServer(idOrSlug);
    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (err: unknown) {
    console.error("[Products API DELETE] Error:", err);
    const msg = err instanceof Error ? err.message : "Failed to delete product";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
