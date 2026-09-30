"use client";

import { SafeImage } from "@/components/ui/safe-image";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui";
import { Reveal, FadeIn } from "@/components/animations";
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  ArrowRight,
  HardHat,
  Scale,
  Wrench,
  Compass,
} from "lucide-react";
import type { HseContent } from "@/data/hse-content";

interface HsePageViewProps {
  content: HseContent;
  locale?: string;
}

export function HsePageView({ content, locale = "en" }: HsePageViewProps) {
  const isArabic = locale === "ar";

  return (
    <article dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-white">
      {/* =========================================================================
          SECTION 01: EDITORIAL HERO (DEEP NAVY)
          ========================================================================= */}
      <section className="relative min-h-[58vh] lg:min-h-[64vh] flex items-center justify-center overflow-hidden bg-[#070e17] text-white">
        <div className="absolute inset-0 z-0">
          <SafeImage
            src={(content.hero as { image?: string }).image || "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=85"}
            alt="Representative industrial field oversight and operational safety standards"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25 brightness-75 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e17] via-[#070e17]/80 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#070e17]/50 to-[#070e17]" />
        </div>

        <Container size="lg" className="relative z-10 py-24 sm:py-28">
          <div className="max-w-3xl space-y-6">
            <FadeIn delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d1c2d] border border-[#203f63] text-accent-400 text-[11px] font-semibold uppercase tracking-[0.15em]">
                <ShieldCheck className="w-3.5 h-3.5 text-accent-400" />
                <span>{content.hero.eyebrow}</span>
              </div>
            </FadeIn>

            <Reveal delay={0.12}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-heading">
                {content.hero.headline}
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg sm:text-xl text-neutral-300 font-medium leading-relaxed">
                {content.hero.subheadline}
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-sans max-w-2xl">
                {content.hero.description}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 02: PRINCIPLES INTRO (EDITORIAL WHITE SURFACE)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white border-b border-neutral-200">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-4">
              <FadeIn delay={0.05}>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b7d56]">
                  {content.principlesIntro.sectionTag}
                </div>
              </FadeIn>
              <Reveal delay={0.1}>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight leading-snug font-heading">
                  {content.principlesIntro.headline}
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7 space-y-6 text-neutral-700 text-base sm:text-lg leading-relaxed font-sans">
              <Reveal delay={0.15}>
                <p>{content.principlesIntro.leadParagraph}</p>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="text-sm sm:text-base text-neutral-600">
                  {content.principlesIntro.supportingParagraph}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 03: CORE PILLARS (STRUCTURED INSTITUTIONAL CARDS)
          ========================================================================= */}
      <section className="py-24 lg:py-32 bg-[#f8fafc] border-b border-neutral-200">
        <Container size="lg">
          <div className="space-y-16 lg:space-y-24">
            {content.pillars.map((pillar, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = idx === 0 ? HardHat : Scale;
              const imageSrc =
                idx === 0
                  ? "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85"
                  : "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=85";

              return (
                <div
                  key={pillar.number}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
                >
                  {/* Text Block */}
                  <div
                    className={`lg:col-span-7 space-y-6 ${
                      !isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#0b1b2d] text-accent-400 tracking-wider">
                        PILLAR {pillar.number}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                        {pillar.subtitle}
                      </span>
                    </div>

                    <Reveal delay={0.08}>
                      <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-heading">
                        {pillar.title}
                      </h3>
                    </Reveal>

                    <Reveal delay={0.14}>
                      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
                        {pillar.description}
                      </p>
                    </Reveal>

                    <div className="space-y-3 pt-2">
                      {pillar.points.map((pt, pIdx) => (
                        <FadeIn key={pIdx} delay={0.16 + pIdx * 0.04}>
                          <div className="flex items-start gap-3 p-3.5 rounded-sm bg-white border border-neutral-200/80 shadow-xs">
                            <CheckCircle2 className="w-4 h-4 text-[#9b7d56] shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                              {pt}
                            </span>
                          </div>
                        </FadeIn>
                      ))}
                    </div>
                  </div>

                  {/* Operational Image */}
                  <div
                    className={`lg:col-span-5 ${
                      !isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <FadeIn delay={0.18}>
                      <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-neutral-300 shadow-xl bg-neutral-900">
                        <SafeImage
                          src={imageSrc}
                          alt={pillar.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 42vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xs bg-[#0b1b2d] border border-[#1a3556] text-white flex items-center justify-between text-xs">
                          <span className="text-[11px] font-semibold text-accent-300 tracking-wider">
                            OPERATIONAL STANDARD {pillar.number}
                          </span>
                          <Icon className="w-4 h-4 text-accent-400" />
                        </div>
                      </div>
                    </FadeIn>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 04: OPERATIONAL GOVERNANCE IN PRACTICE
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white border-b border-neutral-200">
        <Container size="lg">
          <div className="max-w-2xl mb-12 lg:mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b7d56]">
              {content.operationalGovernance.sectionTag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-heading">
              {content.operationalGovernance.headline}
            </h2>
            <p className="text-sm sm:text-base text-neutral-600">
              {content.operationalGovernance.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.operationalGovernance.items.map((item, idx) => {
              const icons = [Wrench, Compass, Scale, ShieldCheck];
              const Icon = icons[idx % icons.length];
              return (
                <FadeIn key={idx} delay={0.06 * idx}>
                  <div className="p-6 rounded-sm bg-[#fbfcfd] border border-neutral-200 h-full flex flex-col justify-between hover:border-neutral-300 transition-colors">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded bg-[#0b1b2d] text-accent-400 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold text-neutral-900 font-heading">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 05: INSTITUTIONAL COMPLIANCE DISCLOSURE (NO FABRICATED CLAIMS)
          ========================================================================= */}
      <section className="py-14 bg-[#f8fafc] border-b border-neutral-200">
        <Container size="md">
          <div className="p-6 sm:p-8 rounded-sm bg-white border border-neutral-300 shadow-xs flex flex-col sm:flex-row items-start gap-5">
            <div className="w-10 h-10 rounded-sm bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
              <FileText className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#9b7d56] font-bold">
                {content.disclosure.tag}
              </span>
              <h4 className="text-sm font-bold text-neutral-900">
                {content.disclosure.title}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {content.disclosure.text}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 06: CLOSING INSTITUTIONAL CTA (DEEP NAVY)
          ========================================================================= */}
      <section className="py-20 lg:py-24 bg-[#07121f] text-white">
        <Container size="md" className="text-center space-y-6">
          <FadeIn delay={0.05}>
            <div className="w-12 h-12 mx-auto rounded-full bg-[#0d1c2d] border border-[#203f63] flex items-center justify-center text-accent-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </FadeIn>

          <Reveal delay={0.1}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight font-heading text-white">
              {content.closingCta.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
              {content.closingCta.subtext}
            </p>
          </Reveal>

          <FadeIn delay={0.22}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href={content.closingCta.primaryCta.href}>
                <button className="w-full sm:w-auto px-7 py-3.5 bg-[#c89343] hover:bg-[#b88132] text-neutral-950 font-sans font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-sm border border-[#d49f4f] active:scale-[0.98]">
                  {content.closingCta.primaryCta.text}
                </button>
              </Link>
              <Link href={content.closingCta.secondaryCta.href}>
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0d2238] hover:bg-[#132f4e] border border-[#234b73] hover:border-accent-400/50 text-white font-sans font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-xs active:scale-[0.98]">
                  <span>{content.closingCta.secondaryCta.text}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent-400 rtl:rotate-180" />
                </button>
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </article>
  );
}
