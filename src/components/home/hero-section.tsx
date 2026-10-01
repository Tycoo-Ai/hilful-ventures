"use client";

import { useEffect, useRef, useState } from "react";

interface HeroContent {
  headline?: { line1?: string; line2?: string };
  tagline?: string;
  categoryPill?: string;
  subheadline?: string;
  description?: string;
  heroImage?: string;
  heroImageAlt?: string;
  primaryCta?: { text?: string; href?: string };
  secondaryCta?: { text?: string; href?: string };
}

export function HeroSection({
  content: initialContent,
  isArabic,
}: {
  content?: HeroContent;
  isArabic?: boolean;
}) {
  const [content, setContent] = useState<HeroContent | undefined>(initialContent);
  const bgRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  // Sync state if initialContent changes
  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
    }
  }, [initialContent]);

  // Client-side fallback to ensure fresh image if admin just uploaded/changed
  useEffect(() => {
    fetch("/api/admin/cms/home")
      .then((res) => res.json())
      .then((data) => {
        const live = data?.published?.hero || data?.draft?.hero;
        if (live && live.heroImage) {
          setContent((prev) => ({
            ...prev,
            ...live,
            heroImage: live.heroImage || prev?.heroImage,
          }));
        }
      })
      .catch(() => {});
  }, []);

  /* Parallax on scroll */
  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current) return;
      const y = window.scrollY;
      bgRef.current.style.transform = `translateY(${y * 0.35}px) scale(1.05)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Entry animations */
  useEffect(() => {
    const els = [
      { el: tagRef.current, delay: 200 },
      { el: h1Ref.current, delay: 400 },
      { el: subRef.current, delay: 600 },
      { el: ctasRef.current, delay: 750 },
    ];

    els.forEach(({ el, delay }) => {
      if (!el) return;
      setTimeout(() => {
        el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)`;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, delay);
    });
  }, []);

  const bgStyle = content?.heroImage
    ? { backgroundImage: `url("${content.heroImage}")` }
    : undefined;

  return (
    <section className="hv-hero" id="home" aria-label="Hero">
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="hv-hero__bg"
        aria-hidden="true"
        style={bgStyle}
      />
      <div className="hv-hero__overlay" aria-hidden="true" />

      {/* Scroll indicator */}
      <div className="hv-scroll-indicator" aria-hidden="true">
        <span className="hv-scroll-indicator__text">Scroll</span>
        <span className="hv-scroll-indicator__line" />
      </div>

      {/* Content */}
      <div className="hv-hero__content">
        <div ref={tagRef} className="hv-hero__tag" style={{ color: "#C9935A" }}>
          {(content as any)?.eyebrow || content?.categoryPill || content?.tagline || "Est. Trading Excellence · Global Commodities"}
        </div>

        <h1 ref={h1Ref} className="hv-hero__h1" style={{ color: "#F6F0E4" }}>
          {(content as any)?.headlineLine1 || content?.headline?.line1 || "Rooted in Earth."}
          {((content as any)?.headlineLine2 || content?.headline?.line2) && (
            <>
              <br />
              <span style={{ color: "#F6F0E4" }}>{(content as any)?.headlineLine2 || content?.headline?.line2}</span>
            </>
          )}
        </h1>

        <p ref={subRef} className="hv-hero__sub" style={{ color: "rgba(246, 240, 228, 0.88)" }}>
          {content?.description ||
            content?.subheadline ||
            "Industrial commodities trading — mining chemicals, ferrous metals, minerals & mud chemicals, quartz & fly ash. Reliable supply across continents."}
        </p>

        <div ref={ctasRef} className="hv-hero__ctas">
          <a
            href={(content as any)?.primaryCtaHref || content?.primaryCta?.href || "#products"}
            className="btn-primary"
            id="hero-cta-products"
          >
            {(content as any)?.primaryCtaText || content?.primaryCta?.text || "Our Products"}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href={(content as any)?.secondaryCtaHref || content?.secondaryCta?.href || "#contact"}
            className="btn-ghost"
            id="hero-cta-enquire"
          >
            {(content as any)?.secondaryCtaText || content?.secondaryCta?.text || "Enquire Now"}
          </a>
        </div>
      </div>
    </section>
  );
}
