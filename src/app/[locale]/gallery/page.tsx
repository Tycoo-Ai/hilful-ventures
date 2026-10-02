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

function mapCategory(cat: string): "GOLD_MINING" | "DRILLING_CHEMICALS" | "METALS" | "ONG_MINERALS" | "QUARTZ_FLYASH" {
  const upper = (cat || "").toUpperCase();
  if (upper.includes("GOLD") || upper.includes("DORE") || upper.includes("ALLUVIAL")) return "GOLD_MINING";
  if (upper.includes("DRILL") || upper.includes("POLYMER") || upper.includes("STARCH") || upper.includes("FLUID")) return "DRILLING_CHEMICALS";
  if (upper.includes("METAL") || upper.includes("STEEL") || upper.includes("COPPER") || upper.includes("SCRAP") || upper.includes("ALUMINIUM")) return "METALS";
  if (upper.includes("ONG") || upper.includes("IRON") || upper.includes("BARITE") || upper.includes("SINTER")) return "ONG_MINERALS";
  if (upper.includes("QUARTZ") || upper.includes("FLY") || upper.includes("ASH") || upper.includes("SILICA")) return "QUARTZ_FLYASH";
  return "GOLD_MINING";
}

const DEPT_NAMES: Record<string, string> = {
  GOLD_MINING: "01. Gold Mining & Mineral Extraction",
  DRILLING_CHEMICALS: "02. Drilling & Mud Chemicals",
  METALS: "03. Ferrous & Non-Ferrous Secondary Metals",
  ONG_MINERALS: "04. Minerals & Mud Chemicals to ONG Exploration",
  QUARTZ_FLYASH: "05. Quartz and Fly Ash",
};

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
      const cmsMapped = galleryItems.map((g, idx) => {
        const cat = mapCategory(g.category);
        return {
          id: g.id,
          src: g.imageUrl,
          alt: g.title,
          title: g.title,
          category: cat,
          departmentName: DEPT_NAMES[cat] || "Hilful Department Operations",
          aspectRatio: (idx % 3 === 0 ? "featured" : "landscape") as "featured" | "landscape",
          caption: g.caption || g.title,
          technicalMetadata: "FIELD CONCESSION · DISCIPLINE INSPECTED",
        };
      });

      // Use the CMS list as the single source of truth for the live gallery
      content.items = cmsMapped;
    }
  } catch (err) {
    console.warn("Gallery CMS overlay fallback:", err);
  }

  return <GalleryPageView content={content} locale={locale} />;
}
