"use client";

import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui";
import { Reveal, FadeIn } from "@/components/animations";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ServicesContent } from "@/data/services-content";

interface ServicesCtaProps {
  content: ServicesContent["cta"];
}

export function ServicesCta({ content }: ServicesCtaProps) {
  return (
    <section className="py-24 lg:py-32 bg-[#07121f] text-white border-b border-[#1b3452] relative overflow-hidden">
      {/* Ambient Radial Warmth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(197,143,44,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07121f] via-[#0d2238]/40 to-[#07121f] pointer-events-none" />

      <Container size="full">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <FadeIn delay={0.05}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0e243d]/80 border border-accent-500/30 text-accent-300 text-xs font-sans font-bold uppercase tracking-widest shadow-md">
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
              <span>COMMERCIAL &amp; OPERATIONAL ENGAGEMENT</span>
            </div>
          </FadeIn>

          <Reveal delay={0.12}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
              {content.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed font-normal">
              {content.subtext}
            </p>
          </Reveal>

          <FadeIn delay={0.28}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href={content.primaryCta.href}>
                <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-500 via-accent-400 to-accent-600 hover:brightness-105 text-neutral-950 text-xs font-sans font-bold uppercase tracking-wider rounded-sm transition-all shadow-xl shadow-accent-500/15 cursor-pointer border border-accent-400">
                  <span>{content.primaryCta.text}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </button>
              </Link>

              <Link href={content.secondaryCta.href}>
                <button className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0d2238] hover:bg-[#132f4e] text-white border border-[#234b73] text-xs font-sans font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer shadow-md">
                  <span>{content.secondaryCta.text}</span>
                  <ArrowUpRight className="w-4 h-4 text-accent-400 rtl:rotate-270 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Link>
            </div>
          </FadeIn>

          <div className="pt-10 text-[11px] font-sans font-semibold text-neutral-400 uppercase tracking-widest">
            HILFUL VENTURES PVT LTD &middot; INTEGRATED MINING, ENERGY &amp; INFRASTRUCTURE CAPABILITIES
          </div>
        </div>
      </Container>
    </section>
  );
}
