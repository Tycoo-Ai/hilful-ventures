import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminSession } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized: Administrator session required to access Preview Mode." },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const targetPath = searchParams.get("path") || "/en";
  const disable = searchParams.get("disable");

  const cookieStore = await cookies();

  if (disable === "true") {
    cookieStore.delete("hilful_preview_mode");
    return NextResponse.redirect(new URL(targetPath, request.url));
  }

  // Set preview cookie valid for 1 hour
  cookieStore.set("hilful_preview_mode", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 3600,
  });

  return NextResponse.redirect(new URL(targetPath, request.url));
}
