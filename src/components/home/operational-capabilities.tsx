"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { DEPARTMENTS, type DepartmentItem } from "@/data/hilful-data";

export function OperationalCapabilities({
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
            Five Dedicated Divisions,<br />
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

      {/* Balanced 5-Department Alignment Grid */}
      <div className="container-xl">
        <div
          className="reveal reveal-delay-2"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          {deptList.map((dept) => (
            <Link
              key={dept.slug}
              href={`/departments/${dept.slug}`}
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                flex: "1 1 340px",
                maxWidth: "380px",
                minWidth: "290px",
                height: "460px",
                borderRadius: "8px",
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
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
              />

              {/* Cinematic Vignette Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(20,12,7,0.98) 0%, rgba(20,12,7,0.72) 48%, rgba(20,12,7,0.3) 100%)",
                }}
              />

              {/* Pinned Top Header: Department Number & Products Count Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "24px",
                  right: "24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  zIndex: 3,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#C9935A",
                    textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                  }}
                >
                  {dept.number}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#F6F0E4",
                    backgroundColor: "rgba(168, 104, 58, 0.75)",
                    padding: "4px 12px",
                    borderRadius: "3px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {dept.products.length} Products
                </span>
              </div>

              {/* Bottom Content Body */}
              <div
                style={{
                  marginTop: "auto",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {/* Department Name with uniform height */}
                <h3
                  style={{
                    fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    lineHeight: 1.15,
                    color: "#F6F0E4",
                    marginBottom: "8px",
                    minHeight: "56px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {dept.name}
                </h3>

                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "rgba(246, 240, 228, 0.8)",
                    lineHeight: 1.55,
                    marginBottom: "14px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "38px",
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
                    marginBottom: "16px",
                    minHeight: "30px",
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
                        maxWidth: "100%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      • {p.name}
                    </span>
                  ))}
                </div>

                {/* Explore Action Button */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#C9935A",
                    paddingTop: "8px",
                    borderTop: "1px solid rgba(168, 104, 58, 0.25)",
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
