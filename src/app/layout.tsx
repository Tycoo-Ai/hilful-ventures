import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Hilful Ventures Pvt Ltd | Rooted in Earth. Trusted Worldwide.",
    template: "%s | Hilful Ventures",
  },
  description:
    "Global trading in mining & drilling chemicals, ferrous & non-ferrous metals, minerals & mud chemicals for ONG exploration, and quartz & fly ash. Reliable supply chains across continents.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://hilfulventures.com"
  ),
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Root layout — Hilful Ventures luxury editorial system.
 * Provides Cormorant Garamond (display) + Inter (body) font variables.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable} ${ibmPlexArabic.variable}`}
    >
      <body className="min-h-dvh flex flex-col antialiased">{children}</body>
    </html>
  );
}
