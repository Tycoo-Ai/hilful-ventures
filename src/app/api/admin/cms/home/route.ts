import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  getDraftHomeContent,
  getPublishedHomeContent,
  saveHeroDraft,
  publishHero,
  saveHomeSectionDraft,
  publishHomeSection,
  revalidateAllCms,
} from "@/lib/cms/repository";
import { getHomeServer, saveHomeHeroServer } from "@/lib/cms/cms-service";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get("locale") as "en" | "ar") || "en";

  // Check persistent disk store first
  const homeData = await getHomeServer(locale);

  return NextResponse.json({
    draft: homeData,
    published: homeData,
  });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  try {
    const { action, section, locale = "en", data } = await request.json();

    // Instant save & publish in one atomic action for sudden website updates
    if (action === "saveAndPublish" || action === "saveDraft" || action === "publish") {
      if (section === "hero") {
        await saveHomeHeroServer(locale, data);
        try {
          await saveHeroDraft(locale, data);
          await publishHero(locale);
        } catch {}
        revalidateAllCms();
        return NextResponse.json({ success: true, hero: data, live: true });
      } else if (section) {
        try {
          await saveHomeSectionDraft(section, locale, data);
          await publishHomeSection(section, locale);
        } catch {}
        revalidateAllCms();
        return NextResponse.json({ success: true, section: data, live: true });
      }
    }

    if (action === "publish") {
      if (section === "hero") {
        const published = await publishHero(locale);
        revalidateAllCms();
        return NextResponse.json(published);
      } else if (section) {
        const published = await publishHomeSection(section, locale);
        revalidateAllCms();
        return NextResponse.json(published);
      }
    }

    return NextResponse.json({ error: "Invalid action or section" }, { status: 400 });
  } catch (err) {
    console.error("Home CMS API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
