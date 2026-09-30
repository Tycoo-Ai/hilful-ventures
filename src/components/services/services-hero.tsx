"use client";

import { SafeImage } from "@/components/ui/safe-image";
import { Container } from "@/components/ui";
import { Reveal, FadeIn } from "@/components/animations";
import { servicesImages } from "@/lib/images";

interface ServicesHeroProps {
  eyebrow: string;
  headline: string;
  subheadline: string;
  description: string;
}

export function ServicesHero({
  eyebrow,
  headline,
  subheadline,
  description,
}: ServicesHeroProps) {
  return (
    <section className="relative min-h-[65vh] lg:min-h-[75vh] flex items-center justify-center overflow-hidden bg-[#070e17] text-white">
      {/* Background Image with Rich Industrial Contrast */}
      <div className="absolute inset-0 z-0">
        <SafeImage
          src={servicesImages.hero.src}
          alt={servicesImages.hero.alt}
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
              <span>{eyebrow}</span>
            </div>
          </FadeIn>

          {/* Main Headline */}
          <Reveal delay={0.12}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
              {headline}
            </h1>
          </Reveal>

          {/* Subheadline & Narrative */}
          <Reveal delay={0.2}>
            <div className="mt-6 space-y-4">
              <p className="text-sm sm:text-base font-sans font-semibold tracking-wider uppercase text-accent-400">
                {subheadline}
              </p>
              <p className="text-base sm:text-xl text-neutral-300 leading-relaxed font-normal max-w-3xl">
                {description}
              </p>
            </div>
          </Reveal>

          {/* Core Division Quick Nav */}
          <FadeIn delay={0.28}>
            <div className="mt-10 pt-8 border-t border-[#1e3856]/80 flex flex-wrap items-center gap-4 text-xs font-sans text-neutral-300">
              <span className="text-accent-400 font-bold uppercase tracking-wider">Operational Domains:</span>
              <a href="#exploration" className="hover:text-white transition-colors underline-offset-4 hover:underline">
                01. Exploration
              </a>
              <span className="text-neutral-600">&middot;</span>
              <a href="#equipment" className="hover:text-white transition-colors underline-offset-4 hover:underline">
                02. Equipment Leasing
              </a>
              <span className="text-neutral-600">&middot;</span>
              <a href="#project-management" className="hover:text-white transition-colors underline-offset-4 hover:underline">
                03. Turnkey Projects
              </a>
              <span className="text-neutral-600">&middot;</span>
              <a href="#commodities" className="hover:text-white transition-colors underline-offset-4 hover:underline">
                04. Commodities Trading
              </a>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
