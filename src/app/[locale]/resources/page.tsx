import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getPublishedResources } from "@/lib/resources-service";
import { ResourcesPageView } from "@/components/resources";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";
  return {
    title: isArabic
      ? "الموارد والكتيبات المؤسسية | هلفول فنتشرز"
      : "Resources & Corporate Publications | Hilful Ventures",
    description: isArabic
      ? "تنزيل الكتيب التعريفي لشركة هلفول فنتشرز ووثائق القدرات التشغيلية والمواصفات الفنية للأسطول والمعايير التشغيلية."
      : "Access official Hilful Ventures publications, company overview brochure, fleet technical specifications, and operational standards.",
    openGraph: {
      title: isArabic
        ? "الموارد والكتيبات المؤسسية | هلفول فنتشرز"
        : "Resources & Corporate Publications | Hilful Ventures",
      description: isArabic
        ? "الوثائق الرسمية والكتيبات الفنية لشركة هلفول فنتشرز"
        : "Authorized corporate materials, company brochure, and operational specifications.",
      locale: isArabic ? "ar_SA" : "en_US",
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const resources = await getPublishedResources();

  return <ResourcesPageView resources={resources} locale={locale} />;
}
