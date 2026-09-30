import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getCMSDashboardKPIs } from "@/lib/cms/repository";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  const kpis = await getCMSDashboardKPIs();
  return NextResponse.json(kpis);
}
