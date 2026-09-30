import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hilfulventures.com";

  const routes = [
    "",
    "/about",
    "/services",
    "/services/exploration-prospecting",
    "/services/equipment-leasing",
    "/services/mining-project-management",
    "/services/commodities-trading",
    "/equipment",
    "/projects",
    "/gallery",
    "/hse",
    "/resources",
    "/contact",
  ];

  const locales = ["en", "ar"];
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      const url = `${baseUrl}/${locale}${route}`;
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : route.startsWith("/services") ? 0.9 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            ar: `${baseUrl}/ar${route}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}
