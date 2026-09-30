import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ContactPageView } from "@/components/contact";
import { getPublishedContactContent } from "@/lib/cms/repository";
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
  const content = await getPublishedContactContent(isArabic ? "ar" : "en");

  const pageTitle = isArabic
    ? "التواصل والاستفسارات التشغيلية | هلفول فنتشرز"
    : "Contact & Operational Enquiries | Hilful Ventures";

  const description = content.hero?.subheadline || (isArabic
    ? "تواصل مع شركة هلفول فنتشرز المحدودة لمناقشة فرص التعاقد والاستفسارات التشغيلية وعروض الأسعار في قطاعي التعدين والطاقة."
    : "Connect with Hilful Ventures Pvt Ltd for operational proposals, machinery leasing inquiries, and mining project management requirements.");

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        en: "/en/contact",
        ar: "/ar/contact",
      },
    },
    openGraph: {
      title: pageTitle,
      description,
      type: "website",
      locale: isArabic ? "ar" : "en",
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isArabic = locale === "ar";
  const isPreview = await isPreviewActive();
  const content = await getPublishedContactContent(isArabic ? "ar" : "en", isPreview);

  return <ContactPageView locale={locale} content={content} />;
}
