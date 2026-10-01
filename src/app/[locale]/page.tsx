import { setRequestLocale } from "next-intl/server";
import { getHomeServer, getDepartmentsServer, getAboutServer } from "@/lib/cms/cms-service";
import { isPreviewActive } from "@/lib/cms/preview";
import {
  HeroSection,
  CapabilityStrip,
  AboutSection,
  OperationalCapabilities,
  EquipmentShowcase,
  HilfulAdvantage,
  HSESection,
  EngagementProcess,
  ProjectShowcase,
  FinalCTA,
} from "@/components/home";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return {
    title: isArabic
      ? "هلفول فنتشرز | تجارة صناعية عالمية"
      : "Hilful Ventures | Global Industrial Commodities Trading",
    description: isArabic
      ? "تجارة عالمية في المواد الصناعية — كيماويات التعدين والحفر، المعادن، كيماويات التنقيب عن النفط والغاز، والكوارتز والرماد المتطاير."
      : "Global trading in mining & drilling chemicals, ferrous & non-ferrous metals, minerals & mud chemicals for ONG exploration, and quartz & fly ash. Reliable supply across continents.",
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ar: "/ar" },
    },
    openGraph: {
      title: "Hilful Ventures | Rooted in Earth. Trusted Worldwide.",
      description:
        "Industrial commodities trading — mining chemicals, ferrous metals, minerals & mud chemicals, quartz & fly ash.",
      type: "website",
      locale: isArabic ? "ar_SA" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "Hilful Ventures | Rooted in Earth. Trusted Worldwide.",
      description:
        "Global industrial commodities trading across 4 core product lines.",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isArabic = locale === "ar";
  const [content, departments, aboutData] = await Promise.all([
    getHomeServer(isArabic ? "ar" : "en"),
    getDepartmentsServer(),
    getAboutServer(isArabic ? "ar" : "en"),
  ]);

  return (
    <div style={{ background: "var(--ivory)" }}>
      {/* 01 — Cinematic hero, parallax mine photo */}
      <HeroSection content={content.hero} isArabic={isArabic} />

      {/* 02 — Animated product-category ticker */}
      <CapabilityStrip />

      {/* 03 — About: portrait + editorial copy + stats */}
      <AboutSection
        content={{
          ...content.about,
          ...aboutData,
          portraitImage: aboutData?.portraitImage || content.about?.portraitImage,
          directors: aboutData?.directors || (content.about as any)?.directors,
        }}
      />

      {/* 04 — Products: 2×2 full-bleed image grid */}
      <OperationalCapabilities
        departments={departments}
        sectionTag={content.capabilities?.sectionTag}
        items={content.capabilities?.items}
      />

      {/* 05 — Why Hilful: split layout numbered list */}
      <HilfulAdvantage
        sectionTag={content.advantage?.sectionTag}
        headline={content.advantage?.headline}
        items={content.advantage?.items}
      />

      {/* 06 — Process: 4-column parchment steps */}
      <EngagementProcess
        sectionTag={content.engagement?.sectionTag}
        headline={content.engagement?.headline}
        steps={content.engagement?.steps}
      />

      {/* 07 — Contact + enquiry form */}
      <FinalCTA content={content.finalCta} />
    </div>
  );
}
