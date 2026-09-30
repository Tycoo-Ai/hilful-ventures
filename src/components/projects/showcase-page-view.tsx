"use client";

import { useState, useMemo } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui";
import { Reveal, FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import { ArrowRight, ArrowUpRight, AlertCircle, ChevronRight } from "lucide-react";
import type { ShowcasePageContent } from "@/data/showcase-content";

interface ShowcasePageViewProps {
  content: ShowcasePageContent;
  locale?: string;
}

export function ShowcasePageView({ content, locale = "en" }: ShowcasePageViewProps) {
  const isArabic = locale === "ar";
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return content.items;
    return content.items.filter((item) => item.categoryKey === selectedCategory);
  }, [content.items, selectedCategory]);

  return (
    <article dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-white">
      {/* =========================================================================
          SECTION 01: SHOWCASE HERO
          ========================================================================= */}
      <section className="relative min-h-[60vh] lg:min-h-[68vh] flex items-center justify-center overflow-hidden bg-[#070e17] text-white">
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=2000&q=85"
            alt="Open-bench industrial extraction and operational terrain"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-60 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e17] via-[#070e17]/70 to-[#070e17]/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,14,23,0.7)_100%)]" />
        </div>

        <Container size="full" className="relative z-10 pt-28 pb-20">
          <div className="max-w-4xl">
            <FadeIn delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0e2238] border border-accent-500/40 text-accent-300 text-xs font-sans font-bold uppercase tracking-widest shadow-xs mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                <span>{content.hero.eyebrow}</span>
              </div>
            </FadeIn>

            <Reveal delay={0.12}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
                {content.hero.headline}
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 text-base sm:text-xl text-neutral-300 leading-relaxed font-normal max-w-3xl">
                {content.hero.subtext}
              </p>
            </Reveal>

            <FadeIn delay={0.28}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/contact">
                  <button
                    type="button"
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#c89343] hover:bg-[#b88132] text-neutral-950 text-xs font-sans font-bold uppercase tracking-wider rounded-sm transition-all shadow-md cursor-pointer border border-[#d49f4f] active:scale-[0.98]"
                  >
                    <span>{content.hero.primaryCta}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </button>
                </Link>

                <Link href="/services">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0e2136] hover:bg-[#142e4a] text-white border border-[#274f79] hover:border-accent-400/50 text-xs font-sans font-semibold uppercase tracking-wider rounded-sm transition-all shadow-sm cursor-pointer"
                  >
                    <span>{content.hero.secondaryCta}</span>
                    <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 02: EXPLICIT VISUAL REFERENCE & NON-HISTORICAL DISCLAIMER
          ========================================================================= */}
      <section className="bg-[#fafafc] border-b border-neutral-200 py-6">
        <Container size="full">
          <div className="flex items-start gap-4 p-5 rounded-sm bg-white border border-neutral-200/90 shadow-2xs">
            <AlertCircle className="w-5 h-5 text-accent-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              <span className="font-bold text-[#0c1a2a] block mb-1">
                {isArabic ? "إيضاح مرجعي حول المواد البصرية:" : "Operational Context & Visual Reference Notice:"}
              </span>
              <p>{content.hero.disclaimer}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 03: DISCIPLINE FILTERING & SHOWCASE CARDS
          ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white text-[#0c1a2a] border-b border-neutral-200">
        <Container size="full">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12 border-b border-neutral-200 pb-6">
            {content.categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-xs text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#0c1a2a] text-white shadow-sm"
                      : "bg-[#f4f5f8] text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900 border border-neutral-200/80"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Cards Grid */}
          <StaggerChildren
            staggerDelay={0.07}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item) => (
              <StaggerItem key={item.id}>
                <div className="h-full rounded-sm bg-white border border-neutral-200/90 hover:border-accent-500/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                  <div>
                    {/* Visual Reference Image */}
                    <div className="relative h-60 w-full overflow-hidden bg-neutral-900">
                      <SafeImage
                        src={item.imageUrl}
                        alt={item.altText}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a2a]/80 via-transparent to-transparent" />
                      <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-2.5 py-1 rounded-xs bg-[#0c1a2a]/90 border border-neutral-700/80 text-[10px] font-bold text-accent-300 uppercase tracking-widest">
                        {item.category}
                      </div>
                      <div className="absolute bottom-2.5 left-4 rtl:left-auto rtl:right-4 text-[10px] font-semibold text-neutral-300 uppercase tracking-wider">
                        {isArabic ? "سياق ميداني عام" : "OPERATIONAL REFERENCE"}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold tracking-tight text-[#0c1a2a] mb-2.5 font-heading">
                        {item.title}
                      </h3>

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-6">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Connected Capability Link Footer */}
                  <div className="px-6 pb-6 pt-3 border-t border-neutral-100 bg-[#fafafc]">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 block mb-0.5">
                          {isArabic ? "القدرة المرتبطة:" : "Related Hilful Capability:"}
                        </span>
                        <span className="text-xs font-bold text-[#0c1a2a]">
                          {item.capabilityName}
                        </span>
                      </div>
                      <Link
                        href={item.capabilityLink}
                        className="p-2 rounded-xs bg-white hover:bg-accent-500 hover:text-neutral-950 text-accent-700 border border-neutral-200 transition-colors shadow-2xs cursor-pointer"
                        aria-label={`View ${item.capabilityName}`}
                      >
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                      </Link>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 04: FINAL CTA
          ========================================================================= */}
      <section className="py-24 lg:py-32 bg-[#07121f] text-white border-b border-[#1b3452] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(197,143,44,0.12),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07121f] via-[#0d2238]/40 to-[#07121f] pointer-events-none" />

        <Container size="full">
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <FadeIn delay={0.05}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0e243d]/80 border border-accent-500/30 text-accent-300 text-xs font-sans font-bold uppercase tracking-widest shadow-md">
                <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                <span>{isArabic ? "التعاقد التشغيلي" : "CAPABILITY ALIGNMENT & PROPOSALS"}</span>
              </div>
            </FadeIn>

            <Reveal delay={0.12}>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
                {content.cta.headline}
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed font-normal">
                {content.cta.subtext}
              </p>
            </Reveal>

            <FadeIn delay={0.28}>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link href="/contact">
                  <button
                    type="button"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-[#c89343] hover:bg-[#b88132] text-neutral-950 text-xs font-sans font-bold uppercase tracking-wider rounded-sm transition-all shadow-md cursor-pointer border border-[#d49f4f] active:scale-[0.98]"
                  >
                    <span>{content.cta.primaryText}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </button>
                </Link>

                <Link href="/services">
                  <button
                    type="button"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0d2238] hover:bg-[#132f4e] text-white border border-[#234b73] hover:border-accent-400/50 text-xs font-sans font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                  >
                    <span>{content.cta.secondaryText}</span>
                    <ArrowUpRight className="w-4 h-4 text-accent-400 rtl:rotate-270 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </Link>
              </div>
            </FadeIn>

            <div className="pt-10 text-[11px] font-sans font-semibold text-neutral-400 uppercase tracking-widest">
              {isArabic
                ? "شركة هلفول فنتشرز المحدودة · استعراض القدرات التشغيلية والميدانية"
                : "HILFUL VENTURES PVT LTD · OPERATIONAL SHOWCASE & CAPABILITY DISIPLINES"}
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
