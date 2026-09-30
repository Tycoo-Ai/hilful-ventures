import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  getDraftContactContent,
  getPublishedContactContent,
  saveContactDraft,
  publishContact,
} from "@/lib/cms/repository";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get("locale") as "en" | "ar") || "en";

  const [draft, published] = await Promise.all([
    getDraftContactContent(locale),
    getPublishedContactContent(locale),
  ]);

  return NextResponse.json({ draft, published });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  try {
    const { action, locale = "en", data } = await request.json();

    if (action === "saveDraft") {
      const result = await saveContactDraft(locale, data);
      return NextResponse.json(result);
    }

    if (action === "publish") {
      const result = await publishContact(locale);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error("Contact CMS API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
