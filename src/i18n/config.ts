import { Pathnames } from "next-intl/routing";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

/**
 * Pathnames shared across all locales.
 * When Arabic content is added, locale-specific slugs can be defined here.
 */
export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
  "/about": "/about",
  "/services": "/services",
  "/services/[slug]": "/services/[slug]",
  "/equipment": "/equipment",
  "/projects": "/projects",
  "/projects/[slug]": "/projects/[slug]",
  "/hse": "/hse",
  "/resources": "/resources",
  "/contact": "/contact",
};
