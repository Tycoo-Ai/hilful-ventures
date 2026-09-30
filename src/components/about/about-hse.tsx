"use client";

import { Container } from "@/components/ui";
import { Reveal, FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import type { AboutContent } from "@/data/about-content";

interface AboutHseProps {
  content: AboutContent["hse"];
}

export function AboutHse({ content }: AboutHseProps) {
  return (
    <section className="py-24 lg:py-32 bg-[#fafafc] text-[#0c1a2a] border-b border-neutral-200">
      <Container size="full">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <FadeIn delay={0.05}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-1 bg-accent-500 rounded-xs" />
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-accent-700">
                {content.sectionTag}
              </span>
            </div>
          </FadeIn>

          <Reveal delay={0.1}>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0c1a2a] leading-tight font-heading">
              {content.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              {content.subtext}
            </p>
          </Reveal>
        </div>

        {/* 2 Institutional Pillars */}
        <StaggerChildren
          staggerDelay={0.1}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {content.pillars.map((pillar, idx) => (
            <StaggerItem
              key={idx}
              className="p-8 lg:p-10 rounded-sm bg-white border border-neutral-200/90 hover:border-neutral-300 flex flex-col justify-between transition-all duration-200 shadow-sm relative"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-sm bg-[#0c1a2a] border border-[#1e3856] text-accent-400 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-accent-700 block">
                      Compliance Domain 0{idx + 1}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#0c1a2a] font-heading">
                      {pillar.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-neutral-600 leading-relaxed mb-6 font-normal">
                  {pillar.description}
                </p>

                {/* Specific Protocol Checkpoints */}
                <div className="space-y-3 pt-4 border-t border-neutral-100">
                  {pillar.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-accent-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-neutral-700 font-normal">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-sans text-neutral-500 uppercase">
                <span>Site Inspection Regimen</span>
                <span className="text-accent-700 font-bold">Standardized</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
