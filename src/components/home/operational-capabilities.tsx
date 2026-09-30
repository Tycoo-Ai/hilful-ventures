"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { DEPARTMENTS, type DepartmentItem } from "@/data/hilful-data";

export function OperationalCapabilities({
  sectionTag,
  items,
  departments,
}: {
  sectionTag?: string;
  items?: any[];
  departments?: DepartmentItem[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [deptList, setDeptList] = useState<DepartmentItem[]>(departments && departments.length > 0 ? departments : DEPARTMENTS);

  useEffect(() => {
    fetch("/api/admin/cms/departments")
      .then((r) => r.json())
      .then((d) => {
        if (d.departments && Array.isArray(d.departments) && d.departments.length > 0) {
          setDeptList(d.departments);
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
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="section section--dark"
      id="products"
      ref={sectionRef}
      aria-label="Our Commodity Departments"
      style={{
        backgroundColor: "#1E130C",
        color: "#F6F0E4",
        padding: "100px 0",
      }}
    >
      <div className="container-xl" style={{ marginBottom: "clamp(2rem, 4vw, 4rem)" }}>
        <p className="label reveal" style={{ color: "#C9935A", fontSize: "12px", letterSpacing: "0.28em", textTransform: "uppercase" }}>
          05 / Trading Disciplines
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "20px" }}>
          <h2
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
              fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
              color: "#F6F0E4",
              marginTop: "0.5rem",
              lineHeight: 1.1,
              maxWidth: "20ch",
            }}
          >
            Four Dedicated Lines,<br />
            <em style={{ color: "#C9935A", fontStyle: "italic" }}>Unified Global Delivery</em>
          </h2>
          <Link
            href="/products"
            className="reveal reveal-delay-2"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#C9935A",
              border: "1px solid rgba(201, 147, 90, 0.4)",
              padding: "10px 20px",
              borderRadius: "3px",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#A8683A";
              e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#C9935A";
            }}
          >
            Browse Full Product Catalog &rarr;
          </Link>
        </div>
      </div>

      {/* 4 Alternating or 2x2 Grid Cards Linking to /departments/[slug] */}
      <div className="container-xl">
        <div
          className="reveal reveal-delay-2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "24px",
          }}
        >
          {deptList.map((dept) => (
            <Link
              key={dept.slug}
              href={`/departments/${dept.slug}`}
              style={{
                textDecoration: "none",
                display: "block",
                position: "relative",
                height: "clamp(340px, 48vh, 440px)",
                borderRadius: "6px",
                overflow: "hidden",
                border: "1px solid rgba(168, 104, 58, 0.35)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                transition: "transform 0.3s ease, border-color 0.3s ease",
              }}
              className="hv-card-interactive"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "#C9935A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(168, 104, 58, 0.35)";
              }}
            >
              {/* Cover Photo */}
              <Image
                src={dept.image}
                alt={dept.name}
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Cinematic Vignette Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(30,19,12,0.96) 0%, rgba(30,19,12,0.6) 45%, rgba(30,19,12,0.2) 100%)",
                }}
              />

              {/* Department Content */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                      fontSize: "1.75rem",
                      fontWeight: 700,
                      color: "#C9935A",
                    }}
                  >
                    {dept.number}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#F6F0E4",
                      backgroundColor: "rgba(168, 104, 58, 0.5)",
                      padding: "4px 10px",
                      borderRadius: "2px",
                    }}
                  >
                    {dept.products.length} Products
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                    fontSize: "1.85rem",
                    fontWeight: 700,
                    lineHeight: 1.15,
                    color: "#F6F0E4",
                    marginBottom: "10px",
                  }}
                >
                  {dept.name}
                </h3>

                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(246, 240, 228, 0.8)",
                    lineHeight: 1.6,
                    marginBottom: "18px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {dept.overview}
                </p>

                {/* Key Product Bullets */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginBottom: "20px",
                  }}
                >
                  {dept.products.slice(0, 3).map((p) => (
                    <span
                      key={p.slug}
                      style={{
                        fontSize: "11px",
                        color: "#EADFC9",
                        backgroundColor: "rgba(246, 240, 228, 0.12)",
                        padding: "3px 8px",
                        borderRadius: "2px",
                      }}
                    >
                      • {p.name}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#C9935A",
                  }}
                >
                  <span>Explore Department Specification &amp; Products</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
