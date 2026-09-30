"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui";
import { Compass, ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-[70vh] flex items-center justify-center bg-[#070e17] text-white px-4 py-24 relative overflow-hidden"
    >
      {/* Structural background lines */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#070e17]/80 to-[#070e17] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#142337_1px,transparent_1px),linear-gradient(to_bottom,#142337_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <Container size="sm" className="relative z-10 text-center">
        <div className="max-w-lg mx-auto space-y-6">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#0d1c2d] border border-[#203f63] flex items-center justify-center text-accent-400 shadow-md">
            <Compass className="w-7 h-7" />
          </div>

          <div className="inline-block px-3 py-1 rounded bg-[#0b1b2d] border border-[#1d3856] text-accent-400 font-semibold text-xs uppercase tracking-[0.2em]">
            {isArabic ? "رمز الخطأ ٤٠٤" : "HTTP STATUS 404"}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            {isArabic ? "الصفحة غير موجودة" : "PAGE NOT FOUND"}
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans max-w-md mx-auto">
            {isArabic
              ? "لم يتم العثور على المسار المطلوب. ربما تم نقله أو أن الرابط غير صحيح."
              : "The requested route is not available or may have been relocated across the operational structure."}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent-400 hover:bg-accent-300 text-neutral-950 font-sans font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-md">
                <Home className="w-4 h-4" />
                <span>{isArabic ? "العودة للرئيسية" : "RETURN HOME"}</span>
              </button>
            </Link>

            <Link href="/services" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent hover:bg-white/5 border border-white/20 hover:border-white/40 text-white font-sans font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer">
                <span>{isArabic ? "استعراض القدرات" : "EXPLORE CAPABILITIES"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-accent-400 rtl:rotate-180" />
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
