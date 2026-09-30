import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import NotFound from "../not-found";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";
  return {
    title: isArabic ? "الصفحة غير موجودة | هلفول فنتشرز" : "Page Not Found | Hilful Ventures",
    description: isArabic ? "الصفحة المطلوبة غير موجودة" : "The requested page could not be found.",
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function NotFoundPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <NotFound />;
}
