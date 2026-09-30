"use client";

import { SafeImage } from "@/components/ui/safe-image";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui";
import { Reveal, FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react";
import type { ServiceDetailConfig } from "@/data/service-detail-content";

interface ServiceDetailPageProps {
  config?: ServiceDetailConfig;
  content?: ServiceDetailConfig;
  locale?: string;
  heroImage: {
    src: string;
    alt: string;
  };
}

export function ServiceDetailPage({
  config,
  content,
  locale = "en",
  heroImage,
}: ServiceDetailPageProps) {
  const activeContent = (config || content)!;
  const isArabic = locale === "ar";

  const labels = isArabic
    ? {
        reqProposal: "طلب مقترح تشغيلي",
        viewAllCaps: "عرض جميع القدرات",
        overviewEyebrow: "نظرة عامة على القدرة",
        scopeEyebrow: "نطاق العمل الفني",
        methodologyEyebrow: "منهجية التنفيذ",
        methodologyBadge: "تسلسل إجرائي منظم",
        deliverablesEyebrow: "المخرجات والأطر الفنية",
        byproductTitle: "بيان معالجة المشتقات النفطية:",
        connectedEyebrow: "الهندسة المتكاملة",
        connectedHeading: "القدرات ذات الصلة.",
        connectedSubtext: "القدرات التي تدعم التعاقدات المتكاملة عبر دورة حياة التعدين والاستخراج:",
        exploreCap: "استكشاف القدرة",
        relatedDomain: "مجال مرتبط",
        capabilityPrefix: "القدرة",
        ctaBadge: "التعاقد التجاري والتشغيلي",
        footerTag: "شركة هلفول فنتشرز المحدودة · قدرات متكاملة في التعدين والطاقة والبنية التحتية",
      }
    : {
        reqProposal: "Request an Operational Proposal",
        viewAllCaps: "View All Capabilities",
        overviewEyebrow: "CAPABILITY OVERVIEW",
        scopeEyebrow: "SCOPE OF WORK",
        methodologyEyebrow: "METHODOLOGY",
        methodologyBadge: "STRUCTURED WORKFLOW SEQUENCE",
        deliverablesEyebrow: "DELIVERABLES & TECHNICAL FRAMEWORK",
        byproductTitle: "Byproduct Processing Statement:",
        connectedEyebrow: "INTEGRATED ARCHITECTURE",
        connectedHeading: "Connected Capabilities.",
        connectedSubtext: "Capabilities that can support an integrated engagement across the extractive lifecycle:",
        exploreCap: "Explore Capability",
        relatedDomain: "Related Domain",
        capabilityPrefix: "Capability",
        ctaBadge: "COMMERCIAL & OPERATIONAL ENGAGEMENT",
        footerTag: "HILFUL VENTURES PVT LTD · INTEGRATED MINING, ENERGY & INFRASTRUCTURE CAPABILITIES",
      };

  return (
    <article
      dir={isArabic ? "rtl" : "ltr"}
      className={`min-h-screen bg-white ${isArabic ? "font-sans" : ""}`}
    >
      {/* =========================================================================
          SECTION 01: CAPABILITY HERO
          ========================================================================= */}
      <section className="relative min-h-[65vh] lg:min-h-[72vh] flex items-center justify-center overflow-hidden bg-[#070e17] text-white">
        {/* Background Industrial Photography */}
        <div className="absolute inset-0 z-0">
          <SafeImage
            src={heroImage.src}
            alt={heroImage.alt}
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
                <span>{activeContent.eyebrow}</span>
              </div>
            </FadeIn>

            {/* Large Capability Title */}
            <Reveal delay={0.12}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
                {activeContent.title}
              </h1>
            </Reveal>

            {/* Short Source-Supported Description */}
            <Reveal delay={0.2}>
              <p className="mt-6 text-base sm:text-xl text-neutral-300 leading-relaxed font-normal max-w-3xl">
                {activeContent.heroDescription}
              </p>
            </Reveal>

            {/* Primary & Secondary CTAs */}
            <FadeIn delay={0.28}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/contact">
                  <button
                    type="button"
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#c89343] hover:bg-[#b88132] text-neutral-950 text-xs font-sans font-bold uppercase tracking-wider rounded-sm transition-all shadow-md cursor-pointer border border-[#d49f4f] active:scale-[0.98]"
                  >
                    <span>{labels.reqProposal}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </button>
                </Link>

                <Link href="/services">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0e2136] hover:bg-[#142e4a] text-white border border-[#274f79] hover:border-accent-400/50 text-xs font-sans font-semibold uppercase tracking-wider rounded-sm transition-all shadow-sm cursor-pointer"
                  >
                    <span>{labels.viewAllCaps}</span>
                    <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 02: CAPABILITY OVERVIEW (Editorial Two-Column)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white text-[#0c1a2a] border-b border-neutral-200">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Heading & Operational Spec Sheet */}
            <div className="lg:col-span-5 space-y-6">
              <FadeIn delay={0.05}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-1 bg-accent-500 rounded-xs" />
                  <span className="text-xs font-sans font-bold uppercase tracking-widest text-accent-700">
                    {labels.overviewEyebrow}
                  </span>
                </div>
              </FadeIn>

              <Reveal delay={0.1}>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0c1a2a] leading-tight font-heading">
                  {activeContent.overviewHeading}
                </h2>
              </Reveal>

              {/* Operational Parameters Table */}
              <div className="mt-8 p-6 rounded-sm bg-[#fafafc] border border-neutral-200/90 shadow-2xs">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-accent-700 block mb-4">
                  {activeContent.operationalParametersHeading}
                </span>
                <div className="space-y-3 divide-y divide-neutral-200/60">
                  {activeContent.operationalParameters.map((param, pIdx) => (
                    <div
                      key={pIdx}
                      className={`pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1 sm:gap-4`}
                    >
                      <span className="font-semibold text-neutral-500 uppercase tracking-wide">
                        {param.label}
                      </span>
                      <span className="font-bold text-[#0c1a2a] sm:text-end">
                        {param.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Concise Source-Based Explanation */}
            <div className="lg:col-span-7 space-y-6 text-neutral-700 font-normal leading-relaxed text-base sm:text-lg">
              {activeContent.overviewText.map((paragraph, idx) => (
                <Reveal key={idx} delay={0.15 + idx * 0.08}>
                  <p className="border-s-2 border-neutral-200 ps-6">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 03: SCOPE OF WORK (Source-Supported Composition)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#fafafc] text-[#0c1a2a] border-b border-neutral-200">
        <Container size="full">
          {/* Header */}
          <div className="max-w-3xl mb-14">
            <FadeIn delay={0.05}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-1 bg-accent-500 rounded-xs" />
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-accent-700">
                  {labels.scopeEyebrow}
                </span>
              </div>
            </FadeIn>

            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0c1a2a] leading-tight font-heading">
                {activeContent.scopeHeading}
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                {activeContent.scopeSubtext}
              </p>
            </Reveal>
          </div>

          {/* Scope Composition Grid */}
          <StaggerChildren
            staggerDelay={0.07}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {activeContent.scopeItems.map((item, idx) => (
              <StaggerItem key={idx}>
                <div className="h-full p-7 rounded-sm bg-white border border-neutral-200/90 hover:border-accent-500/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                  <div>
                    {/* Ordinal numbering */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-accent-700">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="w-2 h-2 rounded-full bg-neutral-200 group-hover:bg-accent-500 transition-colors" />
                    </div>

                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#0c1a2a] mb-2.5 font-heading">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 04: METHODOLOGY / PROCESS (Deep Navy Stepped Sequence)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#0c1a2a] text-white border-b border-[#1b3452] relative overflow-hidden">
        {/* Subtle radial warmth */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

        <Container size="full">
          <div className="max-w-3xl mb-14">
            <FadeIn delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122740] border border-[#234b73] text-accent-300 text-xs font-sans font-bold uppercase tracking-widest shadow-2xs mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                <span>{labels.methodologyEyebrow}</span>
              </div>
            </FadeIn>

            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight font-heading">
                {activeContent.methodologyHeading}
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                {activeContent.methodologySubtext}
              </p>
            </Reveal>
          </div>

          {/* Stepped Process Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {activeContent.methodologySteps.map((step) => (
              <div
                key={step.step}
                className="relative p-7 rounded-sm bg-[#0e2136] border border-[#1e3c60] hover:border-accent-500/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-heading text-accent-400">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-semibold uppercase text-neutral-400 tracking-widest">
                      PHASE
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-white mb-2 font-heading">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#18314e] flex items-center justify-between text-[11px] font-sans text-neutral-400">
                  <span>SPECIFICATION</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400/70" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 05: DELIVERABLES & TECHNICAL FRAMEWORK
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white text-[#0c1a2a] border-b border-neutral-200">
        <Container size="full">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <FadeIn delay={0.05}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-200 text-accent-800 text-xs font-sans font-bold uppercase tracking-widest shadow-2xs mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-600" />
                  <span>{labels.deliverablesEyebrow}</span>
                </div>
              </FadeIn>

              <Reveal delay={0.1}>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0c1a2a] leading-tight font-heading">
                  {activeContent.deliverablesHeading}
                </h2>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal max-w-2xl mx-auto">
                  {activeContent.deliverablesSubtext}
                </p>
              </Reveal>
            </div>

            {/* Deliverables List Card */}
            <div className="p-8 lg:p-10 rounded-sm bg-[#fafafc] border border-neutral-200/90 shadow-xs space-y-4">
              {activeContent.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 pb-4 last:pb-0 border-b last:border-b-0 border-neutral-200/60"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-800 font-medium leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Preserved Oil Byproduct Note (If Present) */}
            {activeContent.byproductNote && (
              <div
                className={`mt-8 p-6 rounded-sm bg-[#fafafc] ${
                  isArabic ? "border-r-4 border-r-accent-500" : "border-l-4 border-l-accent-500"
                } text-xs sm:text-sm text-neutral-700 shadow-2xs`}
              >
                <span className="font-bold text-[#0c1a2a] block mb-1">
                  {labels.byproductTitle}
                </span>
                <p className="leading-relaxed font-normal">{activeContent.byproductNote}</p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 06: CONNECTED CAPABILITIES (Related Capabilities)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#fafafc] text-[#0c1a2a] border-b border-neutral-200">
        <Container size="full">
          <div className="max-w-3xl mb-12">
            <FadeIn delay={0.05}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-1 bg-accent-500 rounded-xs" />
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-accent-700">
                  {labels.connectedEyebrow}
                </span>
              </div>
            </FadeIn>

            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0c1a2a] leading-tight font-heading">
                {labels.connectedHeading}
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                {labels.connectedSubtext}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeContent.connectedCapabilities.map((conn) => (
              <div
                key={conn.slug}
                className="group p-8 rounded-sm bg-white border border-neutral-200/90 hover:border-accent-500/40 flex flex-col justify-between transition-all duration-300 hover:shadow-lg relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-heading font-extrabold text-accent-700">
                      {labels.capabilityPrefix} {conn.number}
                    </span>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-neutral-400">
                      {labels.relatedDomain}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold tracking-tight text-[#0c1a2a] mb-2 font-heading group-hover:text-[#06101c] transition-colors">
                    {conn.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {conn.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100">
                  <Link
                    href={`/services/${conn.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-sans font-bold text-accent-700 hover:text-accent-800 uppercase tracking-wider group-hover:underline underline-offset-4"
                  >
                    <span>{labels.exploreCap}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 07: FINAL CTA
          ========================================================================= */}
      <section className="py-24 lg:py-32 bg-[#07121f] text-white border-b border-[#1b3452] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(197,143,44,0.12),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07121f] via-[#0d2238]/40 to-[#07121f] pointer-events-none" />

        <Container size="full">
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <FadeIn delay={0.05}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0e243d]/80 border border-accent-500/30 text-accent-300 text-xs font-sans font-bold uppercase tracking-widest shadow-md">
                <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                <span>{labels.ctaBadge}</span>
              </div>
            </FadeIn>

            <Reveal delay={0.12}>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
                {activeContent.cta.headline}
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed font-normal">
                {activeContent.cta.subtext}
              </p>
            </Reveal>

            <FadeIn delay={0.28}>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link href="/contact">
                  <button
                    type="button"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-[#c89343] hover:bg-[#b88132] text-neutral-950 text-xs font-sans font-bold uppercase tracking-wider rounded-sm transition-all shadow-md cursor-pointer border border-[#d49f4f] active:scale-[0.98]"
                  >
                    <span>{activeContent.cta.primaryText}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </button>
                </Link>

                <Link href="/services">
                  <button
                    type="button"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0d2238] hover:bg-[#132f4e] text-white border border-[#234b73] hover:border-accent-400/50 text-xs font-sans font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                  >
                    <span>{activeContent.cta.secondaryText}</span>
                    <ArrowUpRight className="w-4 h-4 text-accent-400 rtl:rotate-270 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </Link>
              </div>
            </FadeIn>

            <div className="pt-10 text-[11px] font-sans font-semibold text-neutral-400 uppercase tracking-widest">
              {labels.footerTag}
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
