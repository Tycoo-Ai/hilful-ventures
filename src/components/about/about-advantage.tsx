"use client";

import { Container } from "@/components/ui";
import { Reveal, FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import type { AboutContent } from "@/data/about-content";

interface AboutAdvantageProps {
  content: AboutContent["advantage"];
}

export function AboutAdvantage({ content }: AboutAdvantageProps) {
  return (
    <section className="py-24 lg:py-32 bg-white text-[#0c1a2a] border-b border-neutral-200">
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

        {/* 4 Core Institutional Principles Grid */}
        <StaggerChildren
          staggerDelay={0.08}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {content.principles.map((item) => (
            <StaggerItem
              key={item.number}
              className="p-8 rounded-sm bg-[#fafafc] hover:bg-white border border-neutral-200/90 hover:border-accent-500/40 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group relative overflow-hidden"
            >
              {/* Subtle top indicator */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-200 group-hover:bg-gradient-to-r group-hover:from-accent-500 group-hover:to-accent-400 transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-extrabold font-heading text-accent-700 group-hover:text-accent-600 transition-colors">
                    {item.number}.
                  </span>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-neutral-400 group-hover:text-accent-700 transition-colors">
                    Institutional Standard
                  </span>
                </div>

                <h3 className="text-lg font-bold tracking-tight text-[#0c1a2a] mb-3 font-heading group-hover:text-[#050f1a] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-200 flex items-center justify-between text-[10px] font-sans font-semibold text-neutral-400 uppercase tracking-wider">
                <span>Governance Protocol</span>
                <span className="text-accent-700 font-bold">Active</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
