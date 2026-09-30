import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import {
  ServicesHero,
  CapabilityOverview,
  CapabilityDetailSection,
  ServicesCta,
} from "@/components/services";
import { getPublishedServicesContent } from "@/lib/cms/repository";
import { isPreviewActive } from "@/lib/cms/preview";
import { servicesImages } from "@/lib/images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";
  const content = await getPublishedServicesContent(isArabic ? "ar" : "en");

  return {
    title: isArabic
      ? "القدرات والخدمات الأساسية | شركة هلفول فنتشرز المحدودة"
      : "Core Capabilities & Services | Hilful Ventures Pvt Ltd",
    description: content.hero.description,
    alternates: {
      canonical: `/${locale}/services`,
      languages: {
        en: "/en/services",
        ar: "/ar/services",
      },
    },
    openGraph: {
      title: isArabic
        ? "القدرات والخدمات الأساسية | شركة هلفول فنتشرز المحدودة"
        : "Core Capabilities & Services | Hilful Ventures Pvt Ltd",
      description: content.hero.description,
      type: "website",
      locale: isArabic ? "ar" : "en",
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isArabic = locale === "ar";
  const isPreview = await isPreviewActive();
  const content = await getPublishedServicesContent(isArabic ? "ar" : "en", isPreview);

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Cinematic Services Hero */}
      <ServicesHero
        eyebrow={content.hero.eyebrow}
        headline={content.hero.headline}
        subheadline={content.hero.subheadline}
        description={content.hero.description}
      />

      {/* 2. Editorial 4-Pillar Capability Overview */}
      <CapabilityOverview content={content.overview} />

      {/* 3. Capability 01: Exploration & Subsurface Evaluation (White Surface) */}
      <CapabilityDetailSection
        capability={content.capabilities[0]}
        image={servicesImages.exploration}
        isDark={false}
        reverseLayout={false}
      />

      {/* 4. Capability 02: Heavy Mining Equipment & Fleet Logistics (Deep Navy Surface) */}
      <CapabilityDetailSection
        capability={content.capabilities[1]}
        image={servicesImages.equipment}
        isDark={true}
        reverseLayout={true}
      />

      {/* 5. Capability 03: Turnkey Mining Project Management (White Surface) */}
      <CapabilityDetailSection
        capability={content.capabilities[2]}
        image={servicesImages.projectManagement}
        isDark={false}
        reverseLayout={false}
      />

      {/* 6. Capability 04: Physical Commodities & Byproduct Off-Take (Deep Navy Surface) */}
      <CapabilityDetailSection
        capability={content.capabilities[3]}
        image={servicesImages.commodities}
        isDark={true}
        reverseLayout={true}
      />

      {/* 7. Commercial & Operational Closing CTA */}
      <ServicesCta content={content.cta} />
    </main>
  );
}
