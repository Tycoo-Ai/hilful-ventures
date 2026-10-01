"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface DirectorProfile {
  id: string;
  name: string;
  role?: string;
  image: string;
}

const DEFAULT_DIRECTORS: DirectorProfile[] = [
  {
    id: "dir-1",
    name: "Navas",
    role: "Founder & Managing Director",
    image: "https://res.cloudinary.com/sbjkwjoj/image/upload/v1790765148/hilful/general/458241330865178129_1790765146572.jpg",
  },
  {
    id: "dir-2",
    name: "Ghazi Ali",
    role: "Executive Director",
    image: "https://res.cloudinary.com/sbjkwjoj/image/upload/v1790765148/hilful/general/458241330865178129_1790765146572.jpg",
  },
  {
    id: "dir-3",
    name: "Noor",
    role: "Director of Operations",
    image: "https://res.cloudinary.com/sbjkwjoj/image/upload/v1790765148/hilful/general/458241330865178129_1790765146572.jpg",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AboutSection({ content: initialContent }: { content?: any }) {
  const [content, setContent] = useState(initialContent);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (initialContent) {
      setContent((prev: any) => {
        // If prev already has active custom directors from localStorage, preserve them
        if (prev?.directors && prev.directors.length > 0 && (!initialContent.directors || initialContent.directors.length === 0)) {
          return { ...initialContent, directors: prev.directors, portraitImage: prev.directors[0]?.image || initialContent.portraitImage };
        }
        return initialContent;
      });
    }
  }, [initialContent]);

  // Client-side instant hydration and real-time sync
  useEffect(() => {
    // 1. Instant check from localStorage (0ms latency, persists across refresh)
    try {
      const local = localStorage.getItem("hilful_cms_about");
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed.directors && Array.isArray(parsed.directors) && parsed.directors.length > 0) {
          setContent((prev: any) => ({
            ...prev,
            ...parsed,
            directors: parsed.directors,
            portraitImage: parsed.directors[0]?.image || parsed.portraitImage,
          }));
        }
      }
    } catch {}

    // 2. Cross-tab and same-window instant update listener
    const handleUpdate = (e: any) => {
      const updated = e.detail;
      if (updated && updated.directors && Array.isArray(updated.directors)) {
        setContent((prev: any) => ({
          ...prev,
          ...updated,
          directors: updated.directors,
          portraitImage: updated.directors[0]?.image || updated.portraitImage,
        }));
      }
    };
    window.addEventListener("hilful_about_updated", handleUpdate);

    let bc: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== "undefined") {
      try {
        bc = new BroadcastChannel("hilful_cms_channel");
        bc.onmessage = (event) => {
          if (event.data?.type === "ABOUT_UPDATED" && event.data?.data) {
            const d = event.data.data;
            setContent((prev: any) => ({
              ...prev,
              ...d,
              directors: d.directors,
              portraitImage: d.directors?.[0]?.image || d.portraitImage,
            }));
          }
        };
      } catch {}
    }

    // 3. Fallback network sync from Cloud/Server API
    fetch("/api/admin/cms/about")
      .then((res) => res.json())
      .then((data) => {
        const active = data?.published || data?.draft;
        if (active && active.directors && Array.isArray(active.directors) && active.directors.length > 0) {
          setContent((prev: any) => ({
            ...prev,
            ...active,
            portraitImage: active.directors[0]?.image || active.portraitImage || prev?.portraitImage,
            directors: active.directors,
          }));
          try {
            localStorage.setItem("hilful_cms_about", JSON.stringify(active));
          } catch {}
        }
      })
      .catch(() => {});

    return () => {
      window.removeEventListener("hilful_about_updated", handleUpdate);
      if (bc) bc.close();
    };
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

  // Compute directors list with guaranteed 3 or more fallback
  const directors: DirectorProfile[] =
    content?.directors && Array.isArray(content.directors) && content.directors.length > 0
      ? content.directors
      : content?.portraitImage
      ? [
          {
            id: "dir-1",
            name: "Navas",
            role: "Founder & Managing Director",
            image: content.portraitImage,
          },
          ...DEFAULT_DIRECTORS.slice(1),
        ]
      : DEFAULT_DIRECTORS;

  // 5-second automatic rotation
  useEffect(() => {
    if (directors.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % directors.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [directors.length, isPaused, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + directors.length) % directors.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % directors.length);
  };

  const currentDirector = directors[currentIndex] || directors[0];

  return (
    <section className="section" id="about" ref={sectionRef} aria-label="About Hilful Ventures">
      <div className="container-xl">
        <div className="hv-about">
          {/* Image column with 5-second automatic director rotation */}
          <div
            className="hv-about__image-wrap reveal"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div className="hv-about__accent-line" aria-hidden="true" />

            {/* Carousel Slides */}
            {directors.map((dir, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={dir.id || `dir-${idx}`}
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "scale(1)" : "scale(1.04)",
                    transition: "opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
                    pointerEvents: isActive ? "auto" : "none",
                    zIndex: isActive ? 2 : 1,
                  }}
                >
                  <Image
                    src={dir.image || "/about-portrait.jpg"}
                    alt={dir.name || "Hilful Ventures Director"}
                    fill
                    unoptimized={typeof dir.image === "string" && dir.image.startsWith("http")}
                    style={{ objectFit: "cover", objectPosition: "center 20%" }}
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 380px, 480px"
                    priority={idx === 0}
                  />
                  {/* Subtle Dark Vignette at bottom for text contrast */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(20, 12, 7, 0.95) 0%, rgba(20, 12, 7, 0.4) 30%, transparent 65%)",
                    }}
                  />
                </div>
              );
            })}

            {/* Director Name Badge (Overlaying bottom of photo like screenshot 1) */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                right: "20px",
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {/* Brush/Pill style badge */}
              <div
                style={{
                  backgroundColor: "rgba(10, 6, 3, 0.92)",
                  border: "1px solid rgba(168, 104, 58, 0.6)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.6)",
                  borderRadius: "6px",
                  padding: "10px 16px",
                  backdropFilter: "blur(8px)",
                  display: "inline-block",
                  alignSelf: "flex-start",
                  transition: "all 0.4s ease",
                }}
              >
                <div
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                    lineHeight: 1.2,
                  }}
                >
                  {currentDirector.name}
                </div>
                {currentDirector.role && (
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#C9935A",
                      marginTop: "2px",
                    }}
                  >
                    {currentDirector.role}
                  </div>
                )}
              </div>

              {/* Progress bars / indicators & arrow controls */}
              {directors.length > 1 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "8px",
                    padding: "0 4px",
                  }}
                >
                  {/* Indicators */}
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    {directors.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Switch to Director ${idx + 1}`}
                        style={{
                          width: idx === currentIndex ? "24px" : "8px",
                          height: "4px",
                          borderRadius: "2px",
                          backgroundColor: idx === currentIndex ? "#A8683A" : "rgba(246, 240, 228, 0.3)",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                      />
                    ))}
                    <span style={{ fontSize: "10px", color: "rgba(246, 240, 228, 0.6)", marginLeft: "6px", fontWeight: 600 }}>
                      0{currentIndex + 1} / 0{directors.length}
                    </span>
                  </div>

                  {/* Manual Arrow Controls */}
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous Director"
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(20, 12, 7, 0.75)",
                        border: "1px solid rgba(168, 104, 58, 0.5)",
                        color: "#F6F0E4",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontSize: "12px",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A8683A")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(20, 12, 7, 0.75)")}
                    >
                      &#8592;
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next Director"
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(20, 12, 7, 0.75)",
                        border: "1px solid rgba(168, 104, 58, 0.5)",
                        color: "#F6F0E4",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontSize: "12px",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A8683A")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(20, 12, 7, 0.75)")}
                    >
                      &#8594;
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Text column */}
          <div className="hv-about__text">
            <p className="label reveal">{content?.eyebrow || "About Us"}</p>
            <h2 className="reveal reveal-delay-1">
              {content?.headline ? (
                <span>{content.headline}</span>
              ) : (
                <>
                  OUR<br />
                  <em style={{ fontStyle: "italic", color: "var(--copper)" }}>
                    DIRECTORS
                  </em>
                </>
              )}
            </h2>

            <p className="reveal reveal-delay-2">
              {content?.storyText1 ||
                content?.story?.p1 ||
                "ENGINEERED FOR OPERATIONAL PRECISION. BUILT FOR CAPITAL EFFICIENCY. Hilful Ventures was established as a premier cross-border commodities and logistics enterprise bridging primary resource extraction with global industrial demand."}
            </p>
            <p className="reveal reveal-delay-2">
              {content?.storyText2 ||
                content?.story?.p2 ||
                "With active operational bases in Chennai, India and Assosa, Ethiopia, we provide uninterrupted supply chains for primary gold mining & mineral extraction, heavy drilling polymers, certified secondary smelting metals, oil & natural gas exploration minerals & mud chemicals, and high-grade quartz & fly ash."}
            </p>

            <div className="hv-about__stats reveal reveal-delay-3">
              <div>
                <div className="hv-about__stat-num">{content?.stat1Value || "5+"}</div>
                <div className="hv-about__stat-label">{content?.stat1Label || "Specialized Commodity Disciplines"}</div>
              </div>
              <div>
                <div className="hv-about__stat-num">{content?.stat2Value || "2"}</div>
                <div className="hv-about__stat-label">{content?.stat2Label || "Continental Headquarters (India & Ethiopia)"}</div>
              </div>
              <div>
                <div className="hv-about__stat-num">{content?.stat3Value || "100%"}</div>
                <div className="hv-about__stat-label">{content?.stat3Label || "Independent Assay & COA Compliance"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
