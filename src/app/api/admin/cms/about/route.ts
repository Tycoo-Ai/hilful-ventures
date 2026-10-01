import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  saveAboutDraft,
  publishAbout,
} from "@/lib/cms/repository";
import { getAboutServer, saveAboutServer } from "@/lib/cms/cms-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get("locale") as "en" | "ar") || "en";

  const aboutData = await getAboutServer(locale);

  return NextResponse.json({ draft: aboutData, published: aboutData });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  try {
    const { action, locale = "en", data } = await request.json();

    await saveAboutServer(locale, data);

    try {
      if (action === "saveAndPublish" || action === "publish") {
        await saveAboutDraft(locale, data);
        await publishAbout(locale);
      } else if (action === "saveDraft") {
        await saveAboutDraft(locale, data);
      }
    } catch {}

    return NextResponse.json({ success: true, about: data, live: true });
  } catch (err) {
    console.error("About CMS API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
