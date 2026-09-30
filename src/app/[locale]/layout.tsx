import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AdminQuickAccess } from "@/components/layout/admin-quick-access";
import { localeDirection, type Locale } from "@/i18n/config";
import { getGlobalSettings } from "@/lib/cms/repository";
import type { Metadata } from "next";


import { FloatingContact } from "@/components/layout/floating-contact";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return {
    title: {
      default: isArabic
        ? "هلفول فنتشرز المحدودة | تداول السلع الصناعية والتعدينية"
        : "Hilful Ventures Pvt Ltd | Global Industrial Commodities & Mining Chemicals",
      template: isArabic ? "%s | هلفول فنتشرز" : "%s | Hilful Ventures",
    },
    description: isArabic
      ? "توريد وتداول المواد الكيميائية للتعدين والحفر، المعادن، كيماويات التنقيب عن النفط والغاز، والكوارتز والرماد المتطاير عبر القارات."
      : "Global trading in mining & drilling chemicals, ferrous & non-ferrous metals, minerals & mud chemicals for ONG exploration, and quartz & fly ash. Reliable supply across continents.",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = localeDirection[locale as Locale] || "ltr";

  const settings = await getGlobalSettings();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div className="flex min-h-dvh flex-col" dir={dir} lang={locale}>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer settings={settings} />
        <FloatingContact settings={settings} />
        <AdminQuickAccess />
      </div>
    </NextIntlClientProvider>
  );
}
