"use client";

import { useState, useMemo } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import { Link } from "@/i18n/routing";
import { Container, Lightbox, type LightboxImage } from "@/components/ui";
import { Reveal, FadeIn } from "@/components/animations";
import { ArrowRight, ArrowUpRight, Maximize2, AlertCircle } from "lucide-react";
import type { GalleryPageContent } from "@/data/gallery-content";

interface GalleryPageViewProps {
  content: GalleryPageContent;
  locale?: string;
}

export function GalleryPageView({ content, locale = "en" }: GalleryPageViewProps) {
  const isArabic = locale === "ar";
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems = useMemo(() => {
    if (selectedFilter === "ALL") return content.items;
    return content.items.filter((item) => item.category === selectedFilter);
  }, [content.items, selectedFilter]);

  // Map to format required by existing accessible Lightbox component
  const lightboxImages: LightboxImage[] = useMemo(() => {
    return filteredItems.map((item) => ({
      src: item.src,
      alt: item.alt,
      title: item.title,
      caption: item.caption,
      category: item.category,
    }));
  }, [filteredItems]);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <article dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-white">
      {/* =========================================================================
          SECTION 01: GALLERY HERO
          ========================================================================= */}
      <section className="relative min-h-[60vh] lg:min-h-[68vh] flex items-center justify-center overflow-hidden bg-[#070e17] text-white">
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=85"
            alt="Representative geological terrain and mining exploration environment"
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
            <FadeIn delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0e2238] border border-accent-500/40 text-accent-300 text-xs font-sans font-bold uppercase tracking-widest shadow-xs mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                <span>{content.hero.eyebrow}</span>
              </div>
            </FadeIn>

            <Reveal delay={0.12}>
              <h1
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight font-heading"
                style={{ color: "#F6F0E4" }}
              >
                {content.hero.headline}
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p
                className="mt-6 text-base sm:text-xl leading-relaxed font-normal max-w-3xl"
                style={{ color: "rgba(246, 240, 228, 0.85)" }}
              >
                {content.hero.subtext}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 02: EDITORIAL REFERENCE NOTICE
          ========================================================================= */}
      <section className="bg-[#fafafc] border-b border-neutral-200 py-6">
        <Container size="full">
          <div className="flex items-start gap-4 p-5 rounded-sm bg-white border border-neutral-200/90 shadow-2xs">
            <AlertCircle className="w-5 h-5 text-accent-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              <span className="font-bold text-[#0c1a2a] block mb-1">
                {isArabic ? "إشعار مرجعي بالصور الفوتوغرافية:" : "Photographic Context & Reference Notice:"}
              </span>
              <p>{content.hero.disclaimer}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 03: SECTOR FILTERING & MASONRY/EDITORIAL GRID
          ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white text-[#0c1a2a] border-b border-neutral-200">
        <Container size="full">
          {/* Client-Side Category Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12 border-b border-neutral-200 pb-6">
            {content.filters.map((filter) => {
              const isActive = selectedFilter === filter.key;
              return (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`px-4 py-2 rounded-xs text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#0c1a2a] text-white shadow-sm"
                      : "bg-[#f4f5f8] text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900 border border-neutral-200/80"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Guaranteed Visible Responsive Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px] lg:auto-rows-[300px]">
            {filteredItems.map((item, idx) => {
              const isFeatured = item.aspectRatio === "featured";
              const isWide = item.aspectRatio === "wide";
              const isPortrait = item.aspectRatio === "portrait";

              const spanClasses = isFeatured
                ? "md:col-span-2 md:row-span-2"
                : isWide
                ? "md:col-span-2"
                : isPortrait
                ? "md:row-span-2"
                : "col-span-1";

              return (
                <div
                  key={item.id}
                  className={`${spanClasses} h-full min-h-[280px] w-full`}
                >
                  <div
                    onClick={() => handleOpenLightbox(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleOpenLightbox(idx);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    className="relative w-full h-full min-h-[280px] rounded-sm overflow-hidden bg-neutral-900 group cursor-pointer border border-neutral-200/90 focus-visible:outline-accent-600 shadow-2xs hover:shadow-lg transition-all duration-300"
                    aria-label={`Open photo in lightbox: ${item.title}`}
                  >
                    <SafeImage
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes={
                        isFeatured
                          ? "(max-width: 768px) 100vw, 66vw"
                          : isWide
                          ? "(max-width: 768px) 100vw, 66vw"
                          : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      }
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95 group-hover:brightness-100"
                    />

                    {/* Dark gradient overlay for typography readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070e17] via-[#070e17]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                    {/* Top Sector Tag & Expand Icon */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-xs bg-[#0c1a2a] text-accent-300 border border-neutral-700">
                        {item.departmentName || item.category}
                      </span>
                      <div className="p-2 rounded-xs bg-[#0c1a2a]/80 text-white group-hover:bg-accent-500 group-hover:text-neutral-950 transition-colors shadow-2xs">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Bottom Metadata & Captions */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10 text-white">
                      <span className="text-[10px] text-accent-400 font-semibold uppercase tracking-wider block mb-1">
                        {item.technicalMetadata}
                      </span>
                      <h3
                        className={`${
                          isFeatured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
                        } font-bold tracking-tight text-white mb-1.5 font-heading leading-tight`}
                        style={{ color: "#F6F0E4" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-xs text-neutral-300 leading-relaxed font-normal line-clamp-2"
                        style={{ color: "rgba(246, 240, 228, 0.85)" }}
                      >
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="py-16 text-center text-neutral-500 font-mono text-sm">
              No media assets found for this department.
            </div>
          )}
        </Container>
      </section>

      {/* Accessible Lightbox Modal */}
      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={(newIdx) => setLightboxIndex(newIdx)}
      />

      {/* =========================================================================
          SECTION 04: FINAL CTA
          ========================================================================= */}
      <section className="py-24 lg:py-32 bg-[#07121f] text-white border-b border-[#1b3452] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(197,143,44,0.12),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07121f] via-[#0d2238]/40 to-[#07121f] pointer-events-none" />

        <Container size="full">
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <FadeIn delay={0.05}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0e243d]/80 border border-accent-500/30 text-accent-300 text-xs font-sans font-bold uppercase tracking-widest shadow-md">
                <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                <span>{isArabic ? "التعاقد والتنسيق الفني" : "COMMERCIAL & TECHNICAL INQUIRIES"}</span>
              </div>
            </FadeIn>

            <Reveal delay={0.12}>
              <h2
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight font-heading"
                style={{ color: "#F6F0E4" }}
              >
                {content.cta.headline}
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p
                className="text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-normal"
                style={{ color: "rgba(246, 240, 228, 0.85)" }}
              >
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
                ? "شركة هلفول فنتشرز المحدودة · المعرض البصري للصناعات والعمليات"
                : "HILFUL VENTURES PVT LTD · INDUSTRIAL SECTORS, EQUIPMENT & OPERATIONS"}
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
