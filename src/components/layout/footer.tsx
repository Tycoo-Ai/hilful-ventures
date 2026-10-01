"use client";

import Link from "next/link";
import { DEPARTMENTS, OFFICES } from "@/data/hilful-data";

export function Footer({ settings }: { settings?: any }) {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const indiaOffice = OFFICES.find((o) => o.key === "india") || OFFICES[0];
  const ethiopiaOffice = OFFICES.find((o) => o.key === "ethiopia") || OFFICES[1];

  return (
    <footer
      role="contentinfo"
      id="footer"
      style={{
        backgroundColor: "#1E130C", // Espresso
        color: "#F6F0E4",
        borderTop: "1px solid rgba(168, 104, 58, 0.3)",
        paddingTop: "72px",
        paddingBottom: "36px",
      }}
    >
      <div className="container-xl">
        {/* Main Grid: 4 Columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "48px 32px",
            marginBottom: "64px",
          }}
        >
          {/* 1. Brand Column */}
          <div>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "inline-block",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                  fontSize: "1.85rem",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#F6F0E4",
                }}
              >
                Hilful <span style={{ color: "#C9935A" }}>Ventures</span>
              </span>
            </Link>

            <p
              style={{
                fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                fontStyle: "italic",
                fontSize: "1.15rem",
                color: "#C9935A",
                marginBottom: "16px",
              }}
            >
              Rooted in Earth. Trusted Worldwide.
            </p>

            <p
              style={{
                fontSize: "0.875rem",
                color: "rgba(246, 240, 228, 0.7)",
                lineHeight: 1.7,
                maxWidth: "34ch",
                marginBottom: "24px",
              }}
            >
              International commodities trading specializing in primary gold mining &amp; mineral extraction, heavy drilling chemicals, secondary ferrous and non-ferrous metals, minerals &amp; mud chemicals for ONG exploration, and quartz &amp; fly ash.
            </p>

            {/* Socials / Direct Messaging */}
            <div style={{ display: "flex", gap: "12px" }}>
              <a
                href="https://wa.me/919655522111?text=Hello%20Hilful%20Ventures%2C%20I%20would%20like%20to%20enquire%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hilful Ventures WhatsApp"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  background: "#25D366",
                  color: "#FFFFFF",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  textDecoration: "none",
                }}
              >
                WhatsApp Direct
              </a>
            </div>
          </div>

          {/* 2. Departments Column */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C9935A",
                marginBottom: "20px",
              }}
            >
              Departments
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {DEPARTMENTS.map((dept) => (
                <li key={dept.slug}>
                  <Link
                    href={`/departments/${dept.slug}`}
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(246, 240, 228, 0.8)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#C9935A")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246, 240, 228, 0.8)")}
                  >
                    {dept.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#C9935A",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    marginTop: "6px",
                  }}
                >
                  Full Product Catalog &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. India Headquarters */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C9935A",
                marginBottom: "20px",
              }}
            >
              🇮🇳 India Office (HQ)
            </h4>
            <p
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#F6F0E4",
                marginBottom: "6px",
              }}
            >
              {indiaOffice.name}
            </p>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "rgba(246, 240, 228, 0.7)",
                lineHeight: 1.6,
                marginBottom: "14px",
              }}
            >
              {indiaOffice.address}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.8125rem" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <span style={{ color: "#C9935A", fontWeight: 600 }}>Phone:</span>
                <a
                  href={`tel:${indiaOffice.phone1.replace(/\s+/g, "")}`}
                  style={{ color: "#F6F0E4", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#C9935A")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#F6F0E4")}
                >
                  {indiaOffice.phone1}
                </a>
              </div>
              {indiaOffice.phone2 && (
                <div style={{ display: "flex", gap: "6px" }}>
                  <span style={{ color: "#C9935A", fontWeight: 600 }}>Alt:</span>
                  <a
                    href={`tel:${indiaOffice.phone2.replace(/\s+/g, "")}`}
                    style={{ color: "#F6F0E4", textDecoration: "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#C9935A")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#F6F0E4")}
                  >
                    {indiaOffice.phone2}
                  </a>
                </div>
              )}
              <div style={{ display: "flex", gap: "6px" }}>
                <span style={{ color: "#C9935A", fontWeight: 600 }}>Email:</span>
                <a
                  href={`mailto:${indiaOffice.email}`}
                  style={{ color: "#F6F0E4", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#C9935A")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#F6F0E4")}
                >
                  {indiaOffice.email}
                </a>
              </div>
            </div>
          </div>

          {/* 4. Ethiopia Regional Office */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C9935A",
                marginBottom: "20px",
              }}
            >
              🇪🇹 Ethiopia Office
            </h4>
            <p
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#F6F0E4",
                marginBottom: "6px",
              }}
            >
              {ethiopiaOffice.name}
            </p>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "rgba(246, 240, 228, 0.7)",
                lineHeight: 1.6,
                marginBottom: "14px",
              }}
            >
              {ethiopiaOffice.address}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.8125rem" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <span style={{ color: "#C9935A", fontWeight: 600 }}>Phone:</span>
                <a
                  href={`tel:${ethiopiaOffice.phone1.replace(/\s+/g, "")}`}
                  style={{ color: "#F6F0E4", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#C9935A")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#F6F0E4")}
                >
                  {ethiopiaOffice.phone1}
                </a>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <span style={{ color: "#C9935A", fontWeight: 600 }}>Email:</span>
                <a
                  href={`mailto:${ethiopiaOffice.email}`}
                  style={{ color: "#F6F0E4", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#C9935A")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#F6F0E4")}
                >
                  {ethiopiaOffice.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div
          style={{
            borderTop: "1px solid rgba(168, 104, 58, 0.2)",
            paddingTop: "24px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              color: "rgba(246, 240, 228, 0.5)",
              margin: 0,
            }}
          >
            &copy; {year} Hilful Ventures Pvt Ltd &amp; Hilful Ventures PLC. All rights reserved.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link
              href="/admin/login"
              style={{
                fontSize: "0.75rem",
                color: "rgba(246, 240, 228, 0.4)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C9935A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246, 240, 228, 0.4)")}
            >
              CMS Portal
            </Link>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              style={{
                background: "none",
                border: "none",
                color: "#C9935A",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Back to Top</span>
              <span>&uarr;</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
