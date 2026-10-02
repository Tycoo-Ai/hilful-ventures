"use client";

import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import Image from "next/image";
import { DEPARTMENTS } from "@/data/hilful-data";

export function Header({ settings }: { settings?: any }) {
  const [depts, setDepts] = useState(DEPARTMENTS);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeDeptSlug, setActiveDeptSlug] = useState<string>(DEPARTMENTS[0].slug);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>("products");

  const megaMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Close menus automatically whenever navigating to a new route
  useEffect(() => {
    setMegaOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Fetch live departments so mega-menu reflects updated cover pictures and titles
  useEffect(() => {
    fetch("/api/admin/cms/departments")
      .then((r) => r.json())
      .then((d) => {
        if (d.departments && Array.isArray(d.departments) && d.departments.length > 0) {
          setDepts(d.departments);
        }
      })
      .catch(() => {});
  }, []);

  // Listen for scroll to apply slight shrink effect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mega-menu on click outside or Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const isInsideNav = navRef.current ? navRef.current.contains(target) : false;
      const isInsideMega = megaMenuRef.current ? megaMenuRef.current.contains(target) : false;
      if (!isInsideNav && !isInsideMega) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const activeDept =
    depts.find((d) => d.slug === activeDeptSlug) || depts[0] || DEPARTMENTS[0];

  return (
    <>
      <header
        ref={navRef}
        role="banner"
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: "#F6F0E4", // SOLID ivory surface — never transparent
          color: "#1E130C",
          borderBottom: "1px solid rgba(168, 104, 58, 0.28)",
          boxShadow: scrolled
            ? "0 6px 24px rgba(30, 19, 12, 0.12)"
            : "0 2px 10px rgba(30, 19, 12, 0.05)",
          height: scrolled ? "68px" : "76px",
          transition: "height 0.25s ease, box-shadow 0.25s ease",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="container-xl"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Hilful Ventures Home"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                fontSize: "1.75rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#1E130C",
                lineHeight: 1,
              }}
            >
              Hilful{" "}
              <span style={{ color: "#A8683A", fontWeight: 600 }}>
                Ventures
              </span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center"
            style={{ gap: "2rem" }}
          >
            <Link
              href="/#home"
              className="hv-nav-link"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#1E130C",
                textDecoration: "none",
                position: "relative",
                padding: "8px 0",
              }}
            >
              Home
            </Link>

            <Link
              href="/#about"
              className="hv-nav-link"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#1E130C",
                textDecoration: "none",
                position: "relative",
                padding: "8px 0",
              }}
            >
              About
            </Link>

            {/* Products with Dropdown Mega-Menu */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setMegaOpen(true)}
            >
              <button
                type="button"
                onClick={() => setMegaOpen(!megaOpen)}
                aria-expanded={megaOpen}
                aria-haspopup="true"
                className="hv-nav-link"
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: megaOpen ? "#A8683A" : "#1E130C",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 0",
                }}
              >
                <span>Products</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: megaOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>

            <Link
              href="/#why"
              className="hv-nav-link"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#1E130C",
                textDecoration: "none",
                position: "relative",
                padding: "8px 0",
              }}
            >
              Why Us
            </Link>

            <Link
              href="/#process"
              className="hv-nav-link"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#1E130C",
                textDecoration: "none",
                position: "relative",
                padding: "8px 0",
              }}
            >
              Process
            </Link>

            <Link
              href="/gallery"
              className="hv-nav-link"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#1E130C",
                textDecoration: "none",
                position: "relative",
                padding: "8px 0",
              }}
            >
              Gallery
            </Link>

            <Link
              href="/#contact"
              className="hv-nav-link"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#1E130C",
                textDecoration: "none",
                position: "relative",
                padding: "8px 0",
              }}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div
            className="hidden md:flex items-center"
            style={{ gap: "12px" }}
          >
            <Link
              href="/products"
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#5A3A22",
                border: "1px solid rgba(168,104,58,0.4)",
                padding: "8px 16px",
                borderRadius: "3px",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#A8683A";
                e.currentTarget.style.color = "#1E130C";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(168,104,58,0.4)";
                e.currentTarget.style.color = "#5A3A22";
              }}
            >
              Catalog
            </Link>

            <Link
              href="/contact"
              id="header-cta-enquire"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: "#A8683A", // Solid copper
                color: "#FFFFFF",
                padding: "9px 20px",
                borderRadius: "3px",
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(168,104,58,0.25)",
                transition: "background 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#874D25";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#A8683A";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Enquire
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            style={{
              background: "none",
              border: "none",
              color: "#1E130C",
              cursor: "pointer",
            }}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* FULL-WIDTH MEGA MENU (IVORY WITH COPPER TOP BORDER) */}
      {megaOpen && (
        <div
          ref={megaMenuRef}
          onMouseLeave={() => setMegaOpen(false)}
          style={{
            position: "fixed",
            top: scrolled ? "68px" : "76px",
            left: 0,
            right: 0,
            backgroundColor: "#F6F0E4",
            borderTop: "2px solid #A8683A", // Copper accent border
            borderBottom: "1px solid rgba(168,104,58,0.25)",
            boxShadow: "0 18px 45px rgba(30,19,12,0.18)",
            zIndex: 95,
            animation: "megaSlideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div
            className="container-xl"
            style={{
              paddingTop: "32px",
              paddingBottom: "36px",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr) 300px",
              gap: "28px",
            }}
          >
            {/* 4 Department Columns */}
            {depts.map((dept) => (
              <div
                key={dept.slug}
                onMouseEnter={() => setActiveDeptSlug(dept.slug)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderRight: "1px solid rgba(168,104,58,0.12)",
                  paddingRight: "18px",
                }}
              >
                {/* Department Header */}
                <Link
                  href={`/departments/${dept.slug}`}
                  onClick={() => setMegaOpen(false)}
                  style={{
                    textDecoration: "none",
                    marginBottom: "14px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#A8683A",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Dept {dept.number}
                  </span>
                  <h4
                    style={{
                      fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: activeDeptSlug === dept.slug ? "#A8683A" : "#1E130C",
                      lineHeight: 1.25,
                      transition: "color 0.15s ease",
                    }}
                  >
                    {dept.name}
                  </h4>
                </Link>

                {/* Product Links */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "9px",
                  }}
                >
                  {dept.products.map((prod) => (
                    <li key={prod.slug}>
                      <Link
                        href={`/products/${prod.slug}`}
                        onClick={() => setMegaOpen(false)}
                        style={{
                          fontSize: "13px",
                          color: "#3B2314",
                          textDecoration: "none",
                          lineHeight: 1.4,
                          display: "inline-block",
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#A8683A";
                          e.currentTarget.style.transform = "translateX(3px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "#3B2314";
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                      >
                        {prod.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* View department link */}
                <Link
                  href={`/departments/${dept.slug}`}
                  onClick={() => setMegaOpen(false)}
                  style={{
                    marginTop: "auto",
                    paddingTop: "16px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#A8683A",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  View department &rarr;
                </Link>
              </div>
            ))}

            {/* Featured Dynamic Card on Right */}
            <div
              style={{
                backgroundColor: "#EADFC9",
                borderRadius: "4px",
                border: "1px solid rgba(168,104,58,0.25)",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 16px rgba(30,19,12,0.06)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "130px",
                  borderRadius: "3px",
                  overflow: "hidden",
                  marginBottom: "12px",
                  backgroundColor: "#1E130C",
                }}
              >
                <Image
                  src={activeDept.image}
                  alt={activeDept.name}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="268px"
                />
                <span
                  style={{
                    position: "absolute",
                    top: "8px",
                    left: "8px",
                    background: "rgba(30,19,12,0.85)",
                    color: "#F6F0E4",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    padding: "3px 8px",
                    textTransform: "uppercase",
                    borderRadius: "2px",
                  }}
                >
                  Featured Dept
                </span>
              </div>

              <h5
                style={{
                  fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#1E130C",
                  marginBottom: "6px",
                  lineHeight: 1.2,
                }}
              >
                {activeDept.name}
              </h5>

              <p
                style={{
                  fontSize: "12px",
                  color: "#5A3A22",
                  lineHeight: 1.5,
                  marginBottom: "14px",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {activeDept.overview}
              </p>

              <Link
                href="/products"
                onClick={() => setMegaOpen(false)}
                style={{
                  marginTop: "auto",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  backgroundColor: "#A8683A",
                  padding: "8px 12px",
                  textAlign: "center",
                  borderRadius: "2px",
                  textDecoration: "none",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#874D25")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#A8683A")}
              >
                Browse Full Catalog &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE ACCORDION DRAWER (FULL SCREEN ESPRESSO SURFACE) */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            top: "64px",
            backgroundColor: "#1E130C", // Espresso background
            color: "#F6F0E4",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            padding: "24px 20px 80px 20px",
          }}
        >
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <Link
              href="/#home"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "18px",
                fontWeight: 500,
                color: "#F6F0E4",
                textDecoration: "none",
                padding: "8px 0",
                borderBottom: "1px solid rgba(168,104,58,0.2)",
              }}
            >
              Home
            </Link>

            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "18px",
                fontWeight: 500,
                color: "#F6F0E4",
                textDecoration: "none",
                padding: "8px 0",
                borderBottom: "1px solid rgba(168,104,58,0.2)",
              }}
            >
              About
            </Link>

            {/* Products Accordion */}
            <div style={{ borderBottom: "1px solid rgba(168,104,58,0.2)", paddingBottom: "8px" }}>
              <button
                type="button"
                onClick={() =>
                  setMobileAccordion(mobileAccordion === "products" ? null : "products")
                }
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "none",
                  border: "none",
                  color: "#F6F0E4",
                  fontSize: "18px",
                  fontWeight: 500,
                  padding: "8px 0",
                  cursor: "pointer",
                }}
              >
                <span>Departments &amp; Products</span>
                <span style={{ color: "#C9935A" }}>
                  {mobileAccordion === "products" ? "−" : "+"}
                </span>
              </button>

              {mobileAccordion === "products" && (
                <div
                  style={{
                    paddingLeft: "12px",
                    marginTop: "8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  {depts.map((dept) => (
                    <div key={dept.slug}>
                      <Link
                        href={`/departments/${dept.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          fontSize: "15px",
                          fontWeight: 600,
                          color: "#C9935A",
                          textDecoration: "none",
                          display: "block",
                          marginBottom: "4px",
                        }}
                      >
                        {dept.name}
                      </Link>
                      <div
                        style={{
                          paddingLeft: "10px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                        }}
                      >
                        {dept.products.map((p) => (
                          <Link
                            key={p.slug}
                            href={`/products/${p.slug}`}
                            onClick={() => setMobileMenuOpen(false)}
                            style={{
                              fontSize: "13px",
                              color: "rgba(246,240,228,0.75)",
                              textDecoration: "none",
                            }}
                          >
                            • {p.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/#why"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "18px",
                fontWeight: 500,
                color: "#F6F0E4",
                textDecoration: "none",
                padding: "8px 0",
                borderBottom: "1px solid rgba(168,104,58,0.2)",
              }}
            >
              Why Us
            </Link>

            <Link
              href="/#process"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "18px",
                fontWeight: 500,
                color: "#F6F0E4",
                textDecoration: "none",
                padding: "8px 0",
                borderBottom: "1px solid rgba(168,104,58,0.2)",
              }}
            >
              Process
            </Link>

            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "18px",
                fontWeight: 500,
                color: "#F6F0E4",
                textDecoration: "none",
                padding: "8px 0",
                borderBottom: "1px solid rgba(168,104,58,0.2)",
              }}
            >
              Gallery
            </Link>

            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "18px",
                fontWeight: 500,
                color: "#F6F0E4",
                textDecoration: "none",
                padding: "8px 0",
                borderBottom: "1px solid rgba(168,104,58,0.2)",
              }}
            >
              Contact
            </Link>

            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#C9935A",
                textDecoration: "none",
                padding: "8px 0",
              }}
            >
              All Products Catalog &rarr;
            </Link>
          </nav>

          {/* Pinned Enquire Button at bottom */}
          <div
            style={{
              marginTop: "auto",
              paddingTop: "24px",
            }}
          >
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: "block",
                textAlign: "center",
                background: "#A8683A",
                color: "#FFFFFF",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "14px 20px",
                borderRadius: "4px",
                textDecoration: "none",
              }}
            >
              Enquire Now
            </Link>
          </div>
        </div>
      )}

      {/* Global CSS for Navigation Link Underline Sweep & MegaMenu Slide */}
      <style jsx global>{`
        .hv-nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 2px;
          width: 0;
          height: 2px;
          background-color: #A8683A;
          transition: width 0.25s ease;
        }
        .hv-nav-link:hover::after {
          width: 100%;
        }
        @keyframes megaSlideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
