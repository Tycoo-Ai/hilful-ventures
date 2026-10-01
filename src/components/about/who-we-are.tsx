"use client";

import { useState, useEffect } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import { Container } from "@/components/ui";
import { Reveal, FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import { aboutImages } from "@/lib/images";
import type { AboutContent } from "@/data/about-content";

interface WhoWeAreProps {
  content: AboutContent["whoWeAre"];
}

export function WhoWeAre({ content }: WhoWeAreProps) {
  const initialImg =
    (content as any)?.portraitImage ||
    (content as { image?: string }).image ||
    aboutImages.whoWeAre.src;

  const [activeImage, setActiveImage] = useState<string>(initialImg);

  useEffect(() => {
    try {
      const local = localStorage.getItem("hilful_cms_about");
      if (local) {
        const parsed = JSON.parse(local);
        const img = parsed.portraitImage || parsed.directors?.[0]?.image;
        if (img) setActiveImage(img);
      }
    } catch {}

    const handleUpdate = (e: any) => {
      const updated = e.detail;
      const img = updated?.portraitImage || updated?.directors?.[0]?.image;
      if (img) setActiveImage(img);
    };
    window.addEventListener("hilful_about_updated", handleUpdate);
    return () => window.removeEventListener("hilful_about_updated", handleUpdate);
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-white text-[#0c1a2a] border-b border-neutral-200">
      <Container size="full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Large Editorial Industrial Image */}
          <div className="lg:col-span-5 relative">
            <Reveal>
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-neutral-900 border border-neutral-200 shadow-xl">
                <SafeImage
                  src={activeImage}
                  alt={(content as { imageAlt?: string }).imageAlt || aboutImages.whoWeAre.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070e17]/80 via-transparent to-transparent pointer-events-none" />

                {/* Corner Architectural Accent */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-accent-400 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-accent-400 pointer-events-none" />

                {/* Bottom Image Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-accent-400 block mb-1">
                    Operational Discipline
                  </span>
                  <p className="text-xs text-neutral-200 font-normal">
                    Field engineering oversight and technical asset governance
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Decorative structural watermark */}
            <div className="hidden sm:block absolute -bottom-6 -left-6 w-32 h-32 border border-neutral-200 rounded-sm -z-10 bg-neutral-50" />
          </div>

          {/* Right Column: Institutional Narrative & Capability Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div>
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
            </div>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
              {content.paragraphs.map((p, idx) => (
                <Reveal key={idx} delay={0.12 + idx * 0.05}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>

            {/* 4 Capability Pillars Grid */}
            <div className="pt-6 border-t border-neutral-200">
              <StaggerChildren
                staggerDelay={0.08}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {content.pillars.map((pillar) => (
                  <StaggerItem
                    key={pillar.number}
                    className="p-6 rounded-sm bg-[#fafafc] border border-neutral-200/80 hover:border-accent-500/40 transition-colors shadow-2xs group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-heading font-extrabold text-accent-700">
                        {pillar.number}.
                      </span>
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-neutral-400 group-hover:text-accent-700 transition-colors">
                        Core Division
                      </span>
                    </div>
                    <h3 className="text-base font-bold tracking-tight text-[#0c1a2a] font-heading mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
