import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ShowcasePageView } from "@/components/projects";
import { showcaseContentEn, showcaseContentAr, type ShowcasePageContent } from "@/data/showcase-content";
import { getProjectList } from "@/lib/cms/repository";
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
  const content = isArabic ? showcaseContentAr : showcaseContentEn;

  const pageTitle = isArabic
    ? `${content.hero.headline} | هلفول فنتشرز`
    : `${content.hero.headline} | Hilful Ventures`;

  return {
    title: pageTitle,
    description: content.hero.subtext,
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        en: "/en/projects",
        ar: "/ar/projects",
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

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isArabic = locale === "ar";
  const baseContent = isArabic ? showcaseContentAr : showcaseContentEn;
  const content: ShowcasePageContent = JSON.parse(JSON.stringify(baseContent));

  try {
    const isPreview = await isPreviewActive();
    const projectItems = await getProjectList(isPreview);
    if (projectItems && projectItems.length > 0) {
      content.items = projectItems.map((p) => ({
        id: p.id,
        category: p.category,
        categoryKey: "exploration",
        title: isArabic ? p.title : p.title,
        description: isArabic ? p.description : p.description,
        capabilityName: p.capabilityName || "Core Mining Discipline",
        capabilityLink: p.capabilityLink || "/services",
        imageUrl: p.imageUrl,
        altText: p.altText,
      }));
    }
  } catch (err) {
    console.warn("Project CMS overlay fallback:", err);
  }

  return <ShowcasePageView content={content} locale={locale} />;
}
