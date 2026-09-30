import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getDepartmentsServer, saveDepartmentServer } from "@/lib/cms/cms-service";

export async function GET() {
  try {
    const departments = await getDepartmentsServer();
    return NextResponse.json({ success: true, departments });
  } catch (err: unknown) {
    console.error("[Departments API GET] Error:", err);
    return NextResponse.json({ error: "Failed to retrieve departments" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body || !body.name) {
      return NextResponse.json({ error: "Department name is required" }, { status: 400 });
    }

    const saved = await saveDepartmentServer(body);
    return NextResponse.json({ success: true, department: saved });
  } catch (err: unknown) {
    console.error("[Departments API POST] Error:", err);
    const msg = err instanceof Error ? err.message : "Failed to save department";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
