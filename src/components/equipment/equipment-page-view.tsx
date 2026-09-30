"use client";

import { SafeImage } from "@/components/ui/safe-image";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui";
import { Reveal, FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronRight, ShieldCheck, Cpu, Clock } from "lucide-react";
import type { EquipmentPageContent } from "@/data/equipment-content";

interface EquipmentPageViewProps {
  content: EquipmentPageContent;
  locale?: string;
}

export function EquipmentPageView({ content, locale = "en" }: EquipmentPageViewProps) {
  const isArabic = locale === "ar";

  return (
    <article dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-white">
      {/* =========================================================================
          SECTION 01: EQUIPMENT HERO
          ========================================================================= */}
      <section className="relative min-h-[65vh] lg:min-h-[72vh] flex items-center justify-center overflow-hidden bg-[#070e17] text-white">
        {/* Background Industrial Machinery Photography */}
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=2000&q=85"
            alt="Representative heavy hydraulic excavators and mining extraction fleet"
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
            {/* Eyebrow badge */}
            <FadeIn delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0e2238] border border-accent-500/40 text-accent-300 text-xs font-sans font-bold uppercase tracking-widest shadow-xs mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                <span>{content.hero.eyebrow}</span>
              </div>
            </FadeIn>

            {/* Headline */}
            <Reveal delay={0.12}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
                {content.hero.title}
              </h1>
            </Reveal>

            {/* Factual Description */}
            <Reveal delay={0.2}>
              <p className="mt-6 text-base sm:text-xl text-neutral-300 leading-relaxed font-normal max-w-3xl">
                {content.hero.description}
              </p>
            </Reveal>

            {/* Action CTAs */}
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
          SECTION 02: EDITORIAL OVERVIEW
          ========================================================================= */}
      <section className="py-20 lg:py-24 bg-white text-[#0c1a2a] border-b border-neutral-200">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-4">
              <FadeIn delay={0.05}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-1 bg-accent-500 rounded-xs" />
                  <span className="text-xs font-sans font-bold uppercase tracking-widest text-accent-700">
                    {isArabic ? "نشر الأسطول" : "FLEET MOBILIZATION"}
                  </span>
                </div>
              </FadeIn>

              <Reveal delay={0.1}>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0c1a2a] leading-tight font-heading">
                  {content.overview.heading}
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7 space-y-6 text-neutral-700 font-normal leading-relaxed text-base sm:text-lg">
              {content.overview.description.map((para, idx) => (
                <Reveal key={idx} delay={0.15 + idx * 0.08}>
                  <p className="border-s-2 border-neutral-200 ps-6">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 03: SIX EQUIPMENT CATEGORIES
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#fafafc] text-[#0c1a2a] border-b border-neutral-200">
        <Container size="full">
          <div className="max-w-3xl mb-14">
            <FadeIn delay={0.05}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-1 bg-accent-500 rounded-xs" />
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-accent-700">
                  {content.categoriesSection.eyebrow}
                </span>
              </div>
            </FadeIn>

            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0c1a2a] leading-tight font-heading">
                {content.categoriesSection.heading}
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                {content.categoriesSection.subtext}
              </p>
            </Reveal>
          </div>

          {/* 6 Category Cards Grid */}
          <StaggerChildren
            staggerDelay={0.08}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {content.categoriesSection.items.map((item) => (
              <StaggerItem key={item.id}>
                <div className="h-full rounded-sm bg-white border border-neutral-200/90 hover:border-accent-500/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                  <div>
                    {/* Machine Image */}
                    <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                      <SafeImage
                        src={item.imageUrl}
                        alt={item.altText}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a2a]/80 via-transparent to-transparent" />
                      <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-2.5 py-1 rounded-xs bg-[#0c1a2a]/90 border border-neutral-700/80 text-[11px] font-bold text-accent-300">
                        {item.number}
                      </div>
                      <div className="absolute bottom-3 left-4 rtl:left-auto rtl:right-4 text-xs font-bold text-neutral-200 uppercase tracking-widest">
                        {item.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold tracking-tight text-[#0c1a2a] mb-2 font-heading">
                        {item.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-4">
                        {item.description}
                      </p>

                      <div className="pt-3 border-t border-neutral-100">
                        <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-accent-700 block mb-1">
                          {isArabic ? "الدور التشغيلي الميداني:" : "Operational Role:"}
                        </span>
                        <p className="text-xs text-neutral-700 leading-relaxed">
                          {item.operationalRole}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="px-6 pb-6 pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-xs font-sans font-bold text-accent-700 hover:text-accent-800 uppercase tracking-wider group-hover:underline underline-offset-4"
                    >
                      <span>{isArabic ? "طلب مواصفات وتأجير" : "Request Lease Specifications"}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 04: LEASE MODELS (Deep Navy Feature)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#0c1a2a] text-white border-b border-[#1b3452] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

        <Container size="full">
          <div className="max-w-3xl mb-14">
            <FadeIn delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122740] border border-[#234b73] text-accent-300 text-xs font-sans font-bold uppercase tracking-widest shadow-2xs mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                <span>{content.leaseModelsSection.eyebrow}</span>
              </div>
            </FadeIn>

            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight font-heading">
                {content.leaseModelsSection.heading}
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                {content.leaseModelsSection.subtext}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.leaseModelsSection.models.map((model, idx) => (
              <div
                key={idx}
                className="p-8 rounded-sm bg-[#0e2136] border border-[#1e3c60] hover:border-accent-500/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-xs bg-[#142d4a] text-accent-300 border border-accent-500/30 font-semibold">
                      {model.badge}
                    </span>
                    <span className="text-xs text-neutral-400 font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-white mb-2 font-heading">
                    {model.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal mb-6 pb-6 border-b border-[#1b3452]">
                    {model.summary}
                  </p>

                  <div className="space-y-3">
                    {model.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-accent-400 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#18314e] text-[11px] font-sans text-neutral-400">
                  <span>HILFUL OPERATIONAL STRUCTURE</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 05: FLEET CAPABILITY & RELIABILITY PRINCIPLES
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white text-[#0c1a2a] border-b border-neutral-200">
        <Container size="full">
          <div className="max-w-3xl mb-14">
            <FadeIn delay={0.05}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-1 bg-accent-500 rounded-xs" />
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-accent-700">
                  {content.fleetCapabilitySection.eyebrow}
                </span>
              </div>
            </FadeIn>

            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0c1a2a] leading-tight font-heading">
                {content.fleetCapabilitySection.heading}
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                {content.fleetCapabilitySection.subtext}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.fleetCapabilitySection.pillars.map((pillar, pIdx) => {
              const Icon = pIdx === 0 ? ShieldCheck : pIdx === 1 ? Cpu : Clock;
              return (
                <div
                  key={pIdx}
                  className="p-8 rounded-sm bg-[#fafafc] border border-neutral-200/90 shadow-2xs space-y-4"
                >
                  <div className="w-10 h-10 rounded-sm bg-accent-50 border border-accent-200 flex items-center justify-center text-accent-700">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold tracking-tight text-[#0c1a2a] font-heading">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 06: FINAL CTA
          ========================================================================= */}
      <section className="py-24 lg:py-32 bg-[#07121f] text-white border-b border-[#1b3452] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(197,143,44,0.12),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07121f] via-[#0d2238]/40 to-[#07121f] pointer-events-none" />

        <Container size="full">
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <FadeIn delay={0.05}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0e243d]/80 border border-accent-500/30 text-accent-300 text-xs font-sans font-bold uppercase tracking-widest shadow-md">
                <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                <span>{isArabic ? "طلب وتأجير الأسطول" : "FLEET SPECIFICATION & ENGAGEMENT"}</span>
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
                ? "شركة هلفول فنتشرز المحدودة · حلول تأجير ولوجستيات الأسطول التعديني"
                : "HILFUL VENTURES PVT LTD · MINING EQUIPMENT LEASING & FLEET LOGISTICS"}
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
