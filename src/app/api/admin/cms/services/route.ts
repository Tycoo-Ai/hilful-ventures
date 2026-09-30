import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  getDraftServicesContent,
  getPublishedServicesContent,
  saveServicesDraft,
  publishServices,
  getDraftServiceDetail,
  getPublishedServiceDetail,
  saveServiceDetailDraft,
  publishServiceDetail,
} from "@/lib/cms/repository";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get("locale") as "en" | "ar") || "en";
  const slug = searchParams.get("slug");

  if (slug) {
    const [draft, published] = await Promise.all([
      getDraftServiceDetail(slug, locale),
      getPublishedServiceDetail(slug, locale),
    ]);
    return NextResponse.json({ draft, published });
  }

  const [draft, published] = await Promise.all([
    getDraftServicesContent(locale),
    getPublishedServicesContent(locale),
  ]);

  return NextResponse.json({ draft, published });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  try {
    const { action, slug, locale = "en", data } = await request.json();

    if (slug) {
      if (action === "saveDraft") {
        const result = await saveServiceDetailDraft(slug, locale, data);
        return NextResponse.json(result);
      }
      if (action === "publish") {
        const result = await publishServiceDetail(slug, locale);
        return NextResponse.json(result);
      }
    } else {
      if (action === "saveDraft") {
        const result = await saveServicesDraft(locale, data);
        return NextResponse.json(result);
      }
      if (action === "publish") {
        const result = await publishServices(locale);
        return NextResponse.json(result);
      }
    }

    return NextResponse.json({ error: "Invalid action or parameters" }, { status: 400 });
  } catch (err) {
    console.error("Services CMS API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
