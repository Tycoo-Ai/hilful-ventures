"use client";

import { SafeImage } from "@/components/ui/safe-image";
import { Container } from "@/components/ui";
import { Reveal, FadeIn } from "@/components/animations";
import { aboutImages } from "@/lib/images";

interface AboutHeroProps {
  eyebrow: string;
  headline: string;
  subheadline: string;
  description: string;
  heroImage?: string;
  heroImageAlt?: string;
}

export function AboutHero({
  eyebrow,
  headline,
  subheadline,
  description,
  heroImage,
  heroImageAlt,
}: AboutHeroProps) {
  return (
    <section className="relative min-h-[65vh] lg:min-h-[75vh] flex items-center justify-center overflow-hidden bg-[#070e17] text-white">
      {/* Background Cinematic Image with Directional Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <SafeImage
          src={heroImage || aboutImages.hero.src}
          alt={heroImageAlt || aboutImages.hero.alt}
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

          {/* Subheadline & Description */}
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

          {/* Institutional Values Ribbon */}
          <FadeIn delay={0.28}>
            <div className="mt-10 pt-8 border-t border-[#1e3856]/80 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs font-sans text-neutral-300">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-accent-400" />
                <span className="font-semibold uppercase tracking-wider text-white">Technical Precision</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-accent-400" />
                <span className="font-semibold uppercase tracking-wider text-white">Capital Efficiency</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-accent-400" />
                <span className="font-semibold uppercase tracking-wider text-white">Integrated Delivery</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
