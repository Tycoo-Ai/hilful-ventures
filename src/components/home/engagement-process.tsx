"use client";

import { useEffect, useRef } from "react";

const TRUST_PILLARS = [
  {
    num: "01",
    tag: "CONCESSION ASSET BACKING",
    title: "Direct Geological Asset Security",
    body: "Secured physical concessions and verified exploratory deposits in high-yield belts (Assosa & Eastern corridors) with JORC-aligned reserves.",
  },
  {
    num: "02",
    tag: "CROSS-BORDER JURISDICTION",
    title: "Dual-Continent Corporate Governance",
    body: "Structured operations across India and Ethiopia providing full sovereign statutory compliance, mineral export permits, and zero counterparty ambiguity.",
  },
  {
    num: "03",
    tag: "ASSAY INTEGRITY",
    title: "100% Laboratory Assay Verification",
    body: "Every ore shipment, chemical lot, and alloy batch is pre-inspected by certified independent bureaus (SGS, ALS, Bureau Veritas) with traceable COAs.",
  },
  {
    num: "04",
    tag: "CAPITAL DISCIPLINE",
    title: "De-risked Off-Take & Liquidity Protection",
    body: "Incoterms-governed contracts with insured CIF/FOB terms, backed by established institutional banking facilities protecting partner liquidity.",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EngagementProcess({ sectionTag, headline, steps }: { sectionTag?: string; headline?: string; steps?: any[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".hv-process__step");
    if (!cards) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.2 }
    );
    cards.forEach((el) => obs.observe(el));

    const revealEls = sectionRef.current?.querySelectorAll(".reveal");
    const obs2 = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs2.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    revealEls?.forEach((el) => obs2.observe(el));

    return () => { obs.disconnect(); obs2.disconnect(); };
  }, []);

  return (
    <section className="section section--parchment" id="process" ref={sectionRef} aria-label="Institutional Trust Architecture">
      <div className="container-xl" style={{ marginBottom: "clamp(2rem, 4vw, 4rem)" }}>
        <p className="label reveal" style={{ color: "var(--copper, #A8683A)", fontSize: "12px", letterSpacing: "0.28em", textTransform: "uppercase" }}>
          {sectionTag || "Institutional Assurance"}
        </p>
        <h2 className="reveal reveal-delay-1" style={{ marginTop: "0.75rem", fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)", fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "#1E130C", lineHeight: 1.15 }}>
          {headline ? (
            <span>{headline}</span>
          ) : (
            <>
              Why Capital Partners &amp; Investors<br />
              <em style={{ fontStyle: "italic", color: "var(--copper, #A8683A)" }}>Trust Hilful Ventures</em>
            </>
          )}
        </h2>
        <p className="reveal reveal-delay-2" style={{ color: "#5A3A22", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "60ch", marginTop: "1rem" }}>
          A fortified operational framework engineered for capital protection, transparency, regulatory resilience, and verified cross-border physical asset delivery.
        </p>
      </div>

      <div className="hv-process" role="list" aria-label="4 institutional trust pillars">
        {TRUST_PILLARS.map((s, i) => (
          <div
            key={s.num}
            className="hv-process__step"
            role="listitem"
            style={{ transitionDelay: `${i * 0.12}s` }}
          >
            <div className="hv-process__step-line" aria-hidden="true" />
            <div className="hv-process__step-num" aria-hidden="true" style={{ color: "rgba(168, 104, 58, 0.25)" }}>{s.num}</div>
            <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A8683A", display: "block", marginBottom: "8px" }}>
              {s.tag}
            </span>
            <h3 className="hv-process__step-title" style={{ fontSize: "1.3rem", color: "#1E130C", lineHeight: 1.25, marginBottom: "12px" }}>
              {s.title}
            </h3>
            <p className="hv-process__step-body" style={{ color: "#5A3A22", fontSize: "0.9rem", lineHeight: 1.65 }}>
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
