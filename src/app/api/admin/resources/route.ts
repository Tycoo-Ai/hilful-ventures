import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getAllAdminResources, saveResource } from "@/lib/resources-service";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  const resources = await getAllAdminResources();
  return NextResponse.json({ resources });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  try {
    const item = await request.json();
    const saved = await saveResource(item);
    return NextResponse.json({ success: true, item: saved });
  } catch (err) {
    console.error("[Admin Resources API] Error saving resource:", err);
    return NextResponse.json({ error: "Failed to save resource" }, { status: 500 });
  }
}
