"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Enquiry",
    body: "Share your product requirements, volume, quality specs, and destination country.",
  },
  {
    num: "02",
    title: "Sourcing",
    body: "We identify verified suppliers from our global network and obtain competitive pricing.",
  },
  {
    num: "03",
    title: "Inspection",
    body: "Third-party quality inspection and grade verification before shipment confirmation.",
  },
  {
    num: "04",
    title: "Delivery",
    body: "End-to-end logistics, documentation, and customs clearance support to your destination.",
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
    <section className="section section--parchment" id="process" ref={sectionRef} aria-label="How we work">
      <div className="container-xl" style={{ marginBottom: "clamp(2rem, 4vw, 4rem)" }}>
        <p className="label reveal">How We Work</p>
        <h2 className="reveal reveal-delay-1" style={{ marginTop: "0.75rem" }}>
          From Enquiry<br />
          to&nbsp;<em style={{ fontStyle: "italic", color: "var(--copper)" }}>Delivery</em>
        </h2>
      </div>

      <div className="hv-process" role="list" aria-label="4-step process">
        {STEPS.map((s, i) => (
          <div
            key={s.num}
            className="hv-process__step"
            role="listitem"
            style={{ transitionDelay: `${i * 0.12}s` }}
          >
            <div className="hv-process__step-line" aria-hidden="true" />
            <div className="hv-process__step-num" aria-hidden="true">{s.num}</div>
            <h3 className="hv-process__step-title">{s.title}</h3>
            <p className="hv-process__step-body">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
