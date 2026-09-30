import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { HsePageView } from "@/components/hse";
import { getPublishedHseContent } from "@/lib/cms/repository";
import { isPreviewActive } from "@/lib/cms/preview";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";
  const content = await getPublishedHseContent(isArabic ? "ar" : "en");

  return {
    title: isArabic
      ? "الصحة والسلامة والمعايير التشغيلية | هلفول فنتشرز"
      : "HSE & Operational Standards | Hilful Ventures",
    description:
      content.hero.description ||
      (isArabic
        ? "سلامة الكوادر الميدانية والامتثال للأنظمة التعدينية وشروط التراخيص ومعايير تشغيل المعدات في هلفول فنتشرز."
        : "Workforce safety, operational protocols, and host-jurisdiction regulatory compliance across Hilful Ventures mining and energy operations."),
    openGraph: {
      title: isArabic
        ? "الصحة والسلامة والمعايير التشغيلية | هلفول فنتشرز"
        : "HSE & Operational Standards | Hilful Ventures",
      description: isArabic
        ? "معايير السلامة التشغيلية والامتثال للأنظمة التعدينية"
        : "Workforce safety protocols and statutory regulatory compliance standards.",
      locale: isArabic ? "ar_SA" : "en_US",
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function HsePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isArabic = locale === "ar";
  const isPreview = await isPreviewActive();
  const content = await getPublishedHseContent(isArabic ? "ar" : "en", isPreview);

  return <HsePageView content={content} locale={locale} />;
}
