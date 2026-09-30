import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import {
  AboutHero,
  WhoWeAre,
  OperatingModel,
  AboutAdvantage,
  AboutHse,
  AboutCta,
} from "@/components/about";
import { getAboutServer } from "@/lib/cms/cms-service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";
  const content = await getAboutServer(isArabic ? "ar" : "en");

  return {
    title: isArabic
      ? "عن هلفول فنتشرز | حلول التعدين والطاقة المتكاملة"
      : "About Hilful Ventures | Integrated Mining & Energy Solutions",
    description: content.hero.description,
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        en: "/en/about",
        ar: "/ar/about",
      },
    },
    openGraph: {
      title: isArabic
        ? "عن هلفول فنتشرز | حلول التعدين والطاقة المتكاملة"
        : "About Hilful Ventures | Integrated Mining & Energy Solutions",
      description: content.hero.description,
      type: "website",
      locale: isArabic ? "ar" : "en",
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isArabic = locale === "ar";
  const content = await getAboutServer(isArabic ? "ar" : "en");

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Cinematic Institutional Hero */}
      <AboutHero
        eyebrow={content.hero.eyebrow}
        headline={content.hero.headline}
        subheadline={content.hero.subheadline}
        description={content.hero.description}
        heroImage={(content.hero as { image?: string }).image}
        heroImageAlt={(content.hero as { imageAlt?: string }).imageAlt}
      />

      {/* 2. Editorial Two-Column: Who We Are & 4 Divisions */}
      <WhoWeAre
        content={{
          ...content.whoWeAre,
          portraitImage: content.portraitImage || (content.whoWeAre as any)?.image,
        }}
      />

      {/* 3. Deep Navy: Integrated Operating Model */}
      <OperatingModel content={content.operatingModel} />

      {/* 4. White Editorial: 4 Institutional Principles */}
      <AboutAdvantage content={content.advantage} />

      {/* 5. Refined HSE: Safety & Regulatory Compliance */}
      <AboutHse content={content.hse} />

      {/* 6. Closing Commercial & Operational CTA */}
      <AboutCta content={content.closingCta} />
    </main>
  );
}
