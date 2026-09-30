"use client";

import { Container } from "@/components/ui";
import { Reveal, FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import { ArrowDown, ArrowRight } from "lucide-react";
import type { AboutContent } from "@/data/about-content";

interface OperatingModelProps {
  content: AboutContent["operatingModel"];
}

export function OperatingModel({ content }: OperatingModelProps) {
  return (
    <section className="py-24 lg:py-32 bg-[#0c1a2a] text-white border-b border-[#1f3550] relative overflow-hidden">
      {/* Background Subtle Geometric Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3856_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a2a] via-[#10243b]/40 to-[#0c1a2a] pointer-events-none" />

      <Container size="full" className="relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <FadeIn delay={0.05}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-1 bg-accent-500 rounded-xs" />
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-accent-400">
                {content.sectionTag}
              </span>
            </div>
          </FadeIn>

          <Reveal delay={0.1}>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-heading">
              {content.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-normal max-w-2xl">
              {content.subtext}
            </p>
          </Reveal>
        </div>

        {/* 5-Stage Stepped Pipeline Layout */}
        <div className="relative">
          {/* Desktop Connecting Horizontal Bar */}
          <div className="hidden xl:block absolute top-12 left-8 right-8 h-0.5 bg-gradient-to-r from-accent-500/20 via-[#234b73] to-accent-500/20 z-0" />

          <StaggerChildren
            staggerDelay={0.08}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 relative z-10"
          >
            {content.stages.map((stage, idx) => (
              <StaggerItem
                key={stage.step}
                className="group p-6 rounded-sm bg-[#10243b]/90 hover:bg-[#142e4a] border border-[#1f3f63] hover:border-accent-400/50 flex flex-col justify-between transition-all duration-300 shadow-md relative"
              >
                {/* Subtle top indicator */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#1f3f63] group-hover:bg-gradient-to-r group-hover:from-accent-500 group-hover:to-accent-400 transition-colors" />

                <div>
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-6 pt-1">
                    <div className="w-10 h-10 rounded-sm bg-[#081320] border border-[#2a4d74] text-accent-400 font-heading font-extrabold flex items-center justify-center text-xs shadow-sm group-hover:border-accent-400/60 group-hover:text-accent-300 transition-colors">
                      {stage.step}
                    </div>

                    {/* Step arrow indicator */}
                    <div className="text-neutral-500 group-hover:text-accent-400 transition-colors">
                      {idx < content.stages.length - 1 && (
                        <>
                          <ArrowRight className="hidden xl:block w-4 h-4 rtl:rotate-180" />
                          <ArrowDown className="block xl:hidden w-4 h-4" />
                        </>
                      )}
                    </div>
                  </div>

                  <h3 className="text-base font-bold tracking-tight text-white mb-2 font-heading group-hover:text-accent-300 transition-colors">
                    {stage.title}
                  </h3>

                  <p className="text-xs text-neutral-300 leading-relaxed font-normal mb-6">
                    {stage.description}
                  </p>
                </div>

                {/* Scope points */}
                <div className="pt-4 border-t border-[#1b3552] space-y-1.5">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-accent-400 block mb-2">
                    Scope Parameters:
                  </span>
                  {stage.scope.map((item, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center gap-1.5 text-[11px] text-neutral-400"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent-500/60" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>

        {/* Model Transparency Note */}
        <FadeIn delay={0.3}>
          <div className="mt-12 p-4 rounded-sm bg-[#081320]/80 border border-[#1b3552] text-xs text-neutral-400 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent-400 shrink-0" />
            <p>
              <strong className="text-neutral-200">Capability Architecture Model:</strong> The sequential flow above illustrates Hilful’s integrated capability framework across extractive phases. Operational scope for specific partner ventures is configured based on site requirements and contractual terms.
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
