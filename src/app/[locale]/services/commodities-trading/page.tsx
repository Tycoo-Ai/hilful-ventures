import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/services";
import { getPublishedServiceDetail } from "@/lib/cms/repository";
import { isPreviewActive } from "@/lib/cms/preview";
import { servicesImages } from "@/lib/images";

const SLUG = "commodities-trading";

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
  const content = await getPublishedServiceDetail(SLUG, isArabic ? "ar" : "en");

  if (!content) return {};

  const pageTitle = isArabic
    ? `${content.title} | هلفول فنتشرز`
    : `${content.title} | Hilful Ventures`;

  return {
    title: pageTitle,
    description: content.heroDescription,
    alternates: {
      canonical: `/${locale}/services/${SLUG}`,
      languages: {
        en: `/en/services/${SLUG}`,
        ar: `/ar/services/${SLUG}`,
      },
    },
    openGraph: {
      title: pageTitle,
      description: content.heroDescription,
      type: "website",
      locale: isArabic ? "ar" : "en",
    },
  };
}

export default async function CommoditiesTradingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isArabic = locale === "ar";
  const isPreview = await isPreviewActive();
  const config = await getPublishedServiceDetail(SLUG, isArabic ? "ar" : "en", isPreview);

  if (!config) {
    notFound();
  }

  return (
    <ServiceDetailPage
      config={config}
      locale={locale}
      heroImage={servicesImages.commodities}
    />
  );
}
