"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AboutSection({ content: initialContent }: { content?: any }) {
  const [content, setContent] = useState(initialContent);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
    }
  }, [initialContent]);

  // Client-side fallback to ensure latest portrait and story from CMS
  useEffect(() => {
    fetch("/api/admin/cms/about")
      .then((res) => res.json())
      .then((data) => {
        const active = data?.published || data?.draft;
        if (active && (active.portraitImage || active.image)) {
          setContent((prev: any) => ({
            ...prev,
            ...active,
            portraitImage: active.portraitImage || active.image || prev?.portraitImage,
          }));
        }
      })
      .catch(() => {});
  }, []);

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
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const portraitSrc = content?.portraitImage || content?.image || "/about-portrait.jpg";

  return (
    <section className="section" id="about" ref={sectionRef} aria-label="About Hilful Ventures">
      <div className="container-xl">
        <div className="hv-about">
          {/* Image column */}
          <div className="hv-about__image-wrap reveal">
            <div className="hv-about__accent-line" aria-hidden="true" />
            <Image
              src={portraitSrc}
              alt="Hilful Ventures leadership"
              fill
              unoptimized={typeof portraitSrc === "string" && portraitSrc.startsWith("http")}
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
              sizes="(max-width: 768px) 90vw, (max-width: 1024px) 380px, 480px"
              priority={false}
            />
          </div>

          {/* Text column */}
          <div className="hv-about__text">
            <p className="label reveal">{content?.eyebrow || "About Us"}</p>
            <h2 className="reveal reveal-delay-1">
              {content?.headline ? (
                <span>{content.headline}</span>
              ) : (
                <>
                  A Heritage of<br />
                  <em style={{ fontStyle: "italic", color: "var(--copper)" }}>
                    Industrial Trust
                  </em>
                </>
              )}
            </h2>

            <p className="reveal reveal-delay-2">
              {content?.storyText1 ||
                content?.story?.p1 ||
                "Hilful Ventures is a privately held trading company with deep roots in industrial commodity markets. We source, verify, and deliver high-quality materials to manufacturers and processors worldwide."}
            </p>
            <p className="reveal reveal-delay-2">
              {content?.storyText2 ||
                content?.story?.p2 ||
                "From mining and drilling chemical compounds to ferrous and non-ferrous scrap metals, our network spans procurement hubs in Asia, Europe, and the Middle East — built on relationships measured in decades, not contracts."}
            </p>

            <div className="hv-about__stats reveal reveal-delay-3">
              <div>
                <div className="hv-about__stat-num">{content?.stat1Value || "4"}</div>
                <div className="hv-about__stat-label">{content?.stat1Label || "Core Product Lines"}</div>
              </div>
              <div>
                <div className="hv-about__stat-num">{content?.stat2Value || "20+"}</div>
                <div className="hv-about__stat-label">{content?.stat2Label || "Countries Served"}</div>
              </div>
              <div>
                <div className="hv-about__stat-num">{content?.stat3Value || "B2B"}</div>
                <div className="hv-about__stat-label">{content?.stat3Label || "Focused"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
