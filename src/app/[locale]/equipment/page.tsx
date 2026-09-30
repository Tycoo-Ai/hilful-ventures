import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { EquipmentPageView } from "@/components/equipment";
import { equipmentContentEn, equipmentContentAr, type EquipmentPageContent } from "@/data/equipment-content";
import { getEquipmentList } from "@/lib/cms/repository";
import { isPreviewActive } from "@/lib/cms/preview";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";
  const content = isArabic ? equipmentContentAr : equipmentContentEn;

  const pageTitle = isArabic
    ? `${content.hero.title} | هلفول فنتشرز`
    : `${content.hero.title} | Hilful Ventures`;

  return {
    title: pageTitle,
    description: content.hero.description,
    alternates: {
      canonical: `/${locale}/equipment`,
      languages: {
        en: "/en/equipment",
        ar: "/ar/equipment",
      },
    },
    openGraph: {
      title: pageTitle,
      description: content.hero.description,
      type: "website",
      locale: isArabic ? "ar" : "en",
    },
  };
}

export default async function EquipmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isArabic = locale === "ar";
  const baseContent = isArabic ? equipmentContentAr : equipmentContentEn;
  const content: EquipmentPageContent = JSON.parse(JSON.stringify(baseContent));

  try {
    const isPreview = await isPreviewActive();
    const eqList = await getEquipmentList(isPreview);
    if (eqList && eqList.length > 0) {
      content.categoriesSection.items = content.categoriesSection.items.map((cat, idx) => {
        const match =
          eqList.find(
            (e) =>
              e.id === cat.id ||
              e.category.toLowerCase() === cat.category.toLowerCase()
          ) || eqList[idx];

        if (match) {
          return {
            ...cat,
            name: isArabic ? cat.name : match.name,
            description: isArabic ? cat.description : match.description,
            imageUrl: match.imageUrl || cat.imageUrl,
            altText: match.altText || cat.altText,
          };
        }
        return cat;
      });
    }
  } catch (err) {
    console.warn("Equipment CMS overlay fallback:", err);
  }

  return <EquipmentPageView content={content} locale={locale} />;
}
