import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  getGlobalSettings,
  saveGlobalSettings,
} from "@/lib/cms/repository";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  const settings = await getGlobalSettings();
  return NextResponse.json({ settings });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const result = await saveGlobalSettings(data);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Settings CMS API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
