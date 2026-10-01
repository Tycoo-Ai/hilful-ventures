"use client";

import { useEffect, useRef } from "react";

const REASONS = [
  {
    title: "Verified Quality",
    body: "Every shipment is backed by third-party inspection certificates and documented material grades — no surprises.",
  },
  {
    title: "Global Network",
    body: "Procurement offices and supplier relationships across Asia, Europe, and the Middle East ensure competitive pricing and supply continuity.",
  },
  {
    title: "Large Volume Capability",
    body: "We handle bulk orders from 20MT to multi-thousand tonne contracts, matched to your production schedule.",
  },
  {
    title: "Responsive Trading",
    body: "Dedicated account managers with deep product knowledge respond within hours — not days.",
  },
  {
    title: "Compliance Ready",
    body: "All exports comply with origin documentation, hazardous material regulations, and destination country import requirements.",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function HilfulAdvantage({ sectionTag, headline, items }: { sectionTag?: string; headline?: string; items?: any[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="section section--dark"
      id="why"
      ref={sectionRef}
      aria-label="Why choose Hilful Ventures"
      style={{
        backgroundColor: "#1E130C",
        color: "#F6F0E4",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      <div className="container-xl">
        <div className="hv-why">
          <div className="hv-why__left">
            <p className="label reveal" style={{ color: "#C9935A", fontSize: "12px", letterSpacing: "0.28em", textTransform: "uppercase" }}>
              The Hilful Advantage
            </p>
            <h2
              className="reveal reveal-delay-1"
              style={{
                fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                lineHeight: 1.1,
                color: "#F6F0E4",
                marginTop: "0.5rem",
                marginBottom: "1.5rem",
              }}
            >
              Why Global<br />
              Buyers Choose
              <br />
              <em style={{ fontStyle: "italic", color: "#C9935A" }}>
                Hilful
              </em>
            </h2>
            <p
              className="reveal reveal-delay-2"
              style={{
                color: "rgba(246, 240, 228, 0.8)",
                fontSize: "1rem",
                lineHeight: 1.8,
                maxWidth: "44ch",
              }}
            >
              Decades of sector expertise, a vetted supplier network,
              and a relentless focus on delivery reliability set us apart
              in a commodity market where trust is the ultimate currency.
            </p>
          </div>

          <ul className="hv-why__items reveal reveal-delay-2" role="list">
            {REASONS.map((r, i) => (
              <li key={r.title} className="hv-why__item">
                <span className="hv-why__num" aria-hidden="true" style={{ color: "#C9935A" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="hv-why__title" style={{ color: "#F6F0E4" }}>{r.title}</h3>
                  <p className="hv-why__body" style={{ color: "rgba(246, 240, 228, 0.75)" }}>{r.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
