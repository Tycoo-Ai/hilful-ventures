"use client";

import { SafeImage } from "@/components/ui/safe-image";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui";
import { Reveal, FadeIn } from "@/components/animations";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { CapabilityDetail } from "@/data/services-content";

interface CapabilityDetailSectionProps {
  capability: CapabilityDetail;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  isDark?: boolean;
  reverseLayout?: boolean;
}

export function CapabilityDetailSection({
  capability,
  image,
  isDark = false,
  reverseLayout = false,
}: CapabilityDetailSectionProps) {
  const bgClass = isDark
    ? "bg-[#0c1a2a] text-white border-b border-[#1f3550]"
    : "bg-white text-[#0c1a2a] border-b border-neutral-200";

  const cardBgClass = isDark
    ? "bg-[#10243b] border-[#1f3f63] text-neutral-200"
    : "bg-[#fafafc] border-neutral-200/90 text-neutral-700";

  return (
    <section id={capability.id} className={`py-24 lg:py-32 scroll-mt-20 ${bgClass}`}>
      <Container size="full">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start ${
            reverseLayout ? "lg:grid-flow-dense" : ""
          }`}
        >
          {/* Image & Operational Spec-Sheet Column */}
          <div
            className={`lg:col-span-5 space-y-6 ${
              reverseLayout ? "lg:col-start-8" : ""
            }`}
          >
            <Reveal>
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-900 border border-neutral-200 shadow-xl">
                <SafeImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070e17]/85 via-transparent to-transparent pointer-events-none" />

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-accent-400 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-accent-400 pointer-events-none" />

                {/* Bottom Image Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-accent-400 block mb-1">
                    {capability.tagline}
                  </span>
                  <p className="text-xs text-neutral-200 font-normal">
                    {image.alt}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Operational Parameters Table */}
            <FadeIn delay={0.15}>
              <div className={`p-6 rounded-sm border ${cardBgClass} shadow-xs`}>
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-accent-700 dark:text-accent-400 block mb-4">
                  Operational Parameters
                </span>
                <div className="space-y-3 divide-y divide-neutral-200/50 dark:divide-[#1f3f63]">
                  {capability.operationalParameters.map((param, pIdx) => (
                    <div
                      key={pIdx}
                      className="pt-2.5 first:pt-0 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs gap-1"
                    >
                      <span className="text-neutral-500 dark:text-neutral-400 font-medium">
                        {param.label}
                      </span>
                      <span className="font-semibold text-[#0c1a2a] dark:text-white sm:text-right">
                        {param.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Narrative, Scope & Deliverables Column */}
          <div
            className={`lg:col-span-7 space-y-8 ${
              reverseLayout ? "lg:col-start-1" : ""
            }`}
          >
            <div>
              <FadeIn delay={0.05}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl sm:text-2xl font-extrabold font-heading text-accent-700 dark:text-accent-400">
                    {capability.number}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                  <span className="text-xs font-sans font-bold uppercase tracking-widest text-accent-700 dark:text-accent-400">
                    CORE CAPABILITY
                  </span>
                </div>
              </FadeIn>

              <Reveal delay={0.1}>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight font-heading">
                  {capability.title}
                </h2>
              </Reveal>

              <Reveal delay={0.15}>
                <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                  {capability.overview}
                </p>
              </Reveal>
            </div>

            {/* Scope Checklist */}
            <div className="pt-6 border-t border-neutral-200 dark:border-[#1f3f63]">
              <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-4">
                Technical Scope &amp; Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {capability.scopeList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent-600 dark:text-accent-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables Box */}
            <div className={`p-6 rounded-sm border ${cardBgClass}`}>
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-accent-700 dark:text-accent-400 mb-3">
                Key Technical Deliverables
              </h4>
              <ul className="space-y-2">
                {capability.deliverables.map((del, dIdx) => (
                  <li
                    key={dIdx}
                    className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-500/70 mt-1.5 shrink-0" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preserved Oil Byproduct Note (If Applicable) */}
            {capability.byproductNote && (
              <div className="p-4 rounded-sm bg-neutral-100 dark:bg-[#081320] border-l-4 border-accent-500 text-xs text-neutral-700 dark:text-neutral-300">
                <span className="font-bold text-[#0c1a2a] dark:text-white block mb-1">
                  Byproduct Extraction Note:
                </span>
                <p className="leading-relaxed">{capability.byproductNote}</p>
              </div>
            )}

            {/* Link to Dedicated Service Sub-Route */}
            <div className="pt-2">
              <Link href={capability.slug}>
                <button
                  type="button"
                  className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-sm text-xs font-sans font-bold uppercase tracking-wider bg-accent-500 hover:bg-accent-400 text-neutral-950 transition-all shadow-md cursor-pointer border border-accent-600/30"
                >
                  <span>Explore Division Details</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
