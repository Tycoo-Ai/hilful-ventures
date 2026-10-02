import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  getMiningSitesWithMetaServer,
  saveMiningSiteServer,
  saveMiningSitesBulkServer,
  deleteMiningSiteServer,
} from "@/lib/cms/cms-service";

export async function GET() {
  try {
    const { sites, source } = await getMiningSitesWithMetaServer();
    return NextResponse.json({ success: true, sites, source });
  } catch (err: unknown) {
    console.error("[Mining Sites API GET] Error:", err);
    return NextResponse.json({ error: "Failed to retrieve mining sites" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // If client supplied the full authoritative list (e.g., self-healing or reordering)
    if (body && Array.isArray(body.allSites) && body.allSites.length > 0) {
      const savedSites = await saveMiningSitesBulkServer(body.allSites);
      return NextResponse.json({ success: true, sites: savedSites });
    }

    const siteData = body?.site || body;
    if (!siteData || !siteData.title || !siteData.country) {
      return NextResponse.json(
        { error: "Site title and country are required" },
        { status: 400 }
      );
    }

    if (!siteData.id) {
      siteData.id = `site-${Date.now()}`;
    }

    const saved = await saveMiningSiteServer(siteData);
    return NextResponse.json({ success: true, site: saved });
  } catch (err: unknown) {
    console.error("[Mining Sites API POST] Error:", err);
    const msg = err instanceof Error ? err.message : "Failed to save mining site";
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
    const id = body?.id;
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Invalid mining site ID provided" },
        { status: 400 }
      );
    }

    await deleteMiningSiteServer(id);
    return NextResponse.json({
      success: true,
      message: "Mining site deleted successfully",
    });
  } catch (err: unknown) {
    console.error("[Mining Sites API DELETE] Error:", err);
    const msg = err instanceof Error ? err.message : "Failed to delete mining site";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
