import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { GalleryPageView } from "@/components/gallery";
import { galleryContentEn, galleryContentAr, type GalleryPageContent } from "@/data/gallery-content";
import { getGalleryServer } from "@/lib/cms/cms-service";
import { isPreviewActive } from "@/lib/cms/preview";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";
  const content = isArabic ? galleryContentAr : galleryContentEn;

  const pageTitle = isArabic
    ? `${content.hero.headline} | هلفول فنتشرز`
    : `${content.hero.headline} | Hilful Ventures`;

  return {
    title: pageTitle,
    description: content.hero.subtext,
    alternates: {
      canonical: `/${locale}/gallery`,
      languages: {
        en: "/en/gallery",
        ar: "/ar/gallery",
      },
    },
    openGraph: {
      title: pageTitle,
      description: content.hero.subtext,
      type: "website",
      locale: isArabic ? "ar" : "en",
    },
  };
}

function mapCategory(cat: string): "EXPLORATION" | "EQUIPMENT" | "MINING" | "INFRASTRUCTURE" | "ENERGY" | "LOGISTICS" {
  const upper = (cat || "").toUpperCase();
  if (upper.includes("EXPLOR")) return "EXPLORATION";
  if (upper.includes("EQUIP")) return "EQUIPMENT";
  if (upper.includes("ENERGY") || upper.includes("HYDRO")) return "ENERGY";
  if (upper.includes("LOGISTIC") || upper.includes("COMMODIT")) return "LOGISTICS";
  if (upper.includes("INFRA") || upper.includes("PROCESS") || upper.includes("DEVELOP")) return "INFRASTRUCTURE";
  return "MINING";
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isArabic = locale === "ar";
  const baseContent = isArabic ? galleryContentAr : galleryContentEn;
  const content: GalleryPageContent = JSON.parse(JSON.stringify(baseContent));

  try {
    const isPreview = await isPreviewActive();
    const galleryItems = await getGalleryServer(isPreview);
    if (galleryItems && galleryItems.length > 0) {
      content.items = galleryItems.map((g, idx) => ({
        id: g.id,
        src: g.imageUrl,
        alt: g.title,
        title: g.title,
        category: mapCategory(g.category),
        aspectRatio: idx % 3 === 0 ? "featured" : "landscape",
        caption: g.caption || g.title,
        technicalMetadata: "FIELD OPERATION · INDUSTRIAL DISCIPLINE",
      }));
    }
  } catch (err) {
    console.warn("Gallery CMS overlay fallback:", err);
  }

  return <GalleryPageView content={content} locale={locale} />;
}
