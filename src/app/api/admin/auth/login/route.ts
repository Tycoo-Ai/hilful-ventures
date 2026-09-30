import { NextResponse } from "next/server";
import { loginAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const success = await loginAdmin(password);

    if (success) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Invalid administrator credentials" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal authentication error" },
      { status: 500 }
    );
  }
}
