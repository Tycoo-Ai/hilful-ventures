"use client";

import { useEffect, useRef, useState } from "react";
import { OFFICES, DEPARTMENTS } from "@/data/hilful-data";

export function FinalCTA({ content }: { content?: any }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeOfficeKey, setActiveOfficeKey] = useState<"india" | "ethiopia">("india");
  const [selectedOfficeInForm, setSelectedOfficeInForm] = useState<string>("India (Chennai HQ)");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const currentOffice =
    OFFICES.find((o) => o.key === activeOfficeKey) || OFFICES[0];

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      className="section section--dark"
      id="contact"
      ref={sectionRef}
      aria-label="Contact and Trade Enquiry"
      style={{
        backgroundColor: "#1E130C",
        color: "#F6F0E4",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      <div className="container-xl">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 56px auto" }}>
          <p
            className="label reveal"
            style={{
              color: "#C9935A",
              fontSize: "12px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            10 / Contact &amp; Enquiries
          </p>
          <h2
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: 1.1,
              color: "#F6F0E4",
              marginBottom: "16px",
            }}
          >
            Start a Direct <em style={{ color: "#C9935A", fontStyle: "italic" }}>Conversation</em>
          </h2>
          <p
            className="reveal reveal-delay-2"
            style={{
              fontSize: "1.05rem",
              color: "rgba(246, 240, 228, 0.75)",
              lineHeight: 1.7,
            }}
          >
            Connect directly with our desk in Chennai, India or our East African regional office in Assosa, Ethiopia. We provide guaranteed trade pricing, technical specifications, and shipping schedules.
          </p>
        </div>

        {/* 2-Column Split: Offices Tabs & Map vs Enquiry Form */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* LEFT: Both Offices with Tabs & Interactive Map */}
          <div
            className="reveal reveal-delay-1"
            style={{
              backgroundColor: "rgba(42, 27, 16, 0.8)",
              border: "1px solid rgba(168, 104, 58, 0.35)",
              borderRadius: "6px",
              padding: "28px",
              boxShadow: "0 12px 36px rgba(0, 0, 0, 0.4)",
            }}
          >
            {/* Tabs for India vs Ethiopia */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                borderBottom: "1px solid rgba(168, 104, 58, 0.25)",
                paddingBottom: "16px",
                marginBottom: "24px",
              }}
            >
              <button
                type="button"
                onClick={() => setActiveOfficeKey("india")}
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: "4px",
                  border: activeOfficeKey === "india" ? "1px solid #A8683A" : "1px solid transparent",
                  backgroundColor: activeOfficeKey === "india" ? "#A8683A" : "rgba(246, 240, 228, 0.05)",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <span>🇮🇳</span>
                <span>India (Chennai HQ)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveOfficeKey("ethiopia")}
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: "4px",
                  border: activeOfficeKey === "ethiopia" ? "1px solid #A8683A" : "1px solid transparent",
                  backgroundColor: activeOfficeKey === "ethiopia" ? "#A8683A" : "rgba(246, 240, 228, 0.05)",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <span>🇪🇹</span>
                <span>Ethiopia Office</span>
              </button>
            </div>

            {/* Active Office Details */}
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  display: "inline-block",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C9935A",
                  marginBottom: "8px",
                }}
              >
                {currentOffice.badge}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "#F6F0E4",
                  marginBottom: "12px",
                }}
              >
                {currentOffice.name}
              </h3>

              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "14px" }}>
                <span style={{ color: "#A8683A", fontSize: "16px" }}>📍</span>
                <p style={{ fontSize: "14px", color: "rgba(246, 240, 228, 0.8)", lineHeight: 1.6, margin: 0 }}>
                  {currentOffice.address}
                </p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 24px", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#A8683A" }}>📞</span>
                  <a
                    href={`tel:${currentOffice.phone1.replace(/\s+/g, "")}`}
                    style={{ fontSize: "14px", color: "#C9935A", fontWeight: 600, textDecoration: "none" }}
                  >
                    {currentOffice.phone1}
                  </a>
                  {currentOffice.phone2 && (
                    <span style={{ fontSize: "13px", color: "rgba(246, 240, 228, 0.6)" }}>
                      / {currentOffice.phone2}
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#A8683A" }}>✉️</span>
                  <a
                    href={`mailto:${currentOffice.email}`}
                    style={{ fontSize: "14px", color: "#F6F0E4", textDecoration: "none" }}
                  >
                    {currentOffice.email}
                  </a>
                </div>
              </div>

              {/* Get Directions Link */}
              <a
                href={currentOffice.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#C9935A",
                  textDecoration: "none",
                }}
              >
                <span>Get directions on Google Maps</span>
                <span>&rarr;</span>
              </a>
            </div>

            {/* Embedded Responsive Map */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "220px",
                borderRadius: "4px",
                overflow: "hidden",
                border: "1px solid rgba(168, 104, 58, 0.3)",
              }}
            >
              <iframe
                title={`Map of ${currentOffice.name}`}
                src={currentOffice.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* RIGHT: Floating-Label / Routed Enquiry Form */}
          <div
            className="reveal reveal-delay-2"
            style={{
              backgroundColor: "rgba(42, 27, 16, 0.8)",
              border: "1px solid rgba(168, 104, 58, 0.35)",
              borderRadius: "6px",
              padding: "32px",
              boxShadow: "0 12px 36px rgba(0, 0, 0, 0.4)",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#F6F0E4",
                marginBottom: "8px",
              }}
            >
              Submit a Quotation Request
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "rgba(246, 240, 228, 0.7)",
                marginBottom: "24px",
              }}
            >
              Select your preferred branch for localized commercial routing. Our commodity desk replies within 4 business hours.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              {/* Office / Country Dropdown */}
              <div style={{ marginBottom: "18px" }}>
                <label
                  htmlFor="contact-office"
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#C9935A",
                    marginBottom: "6px",
                  }}
                >
                  Destination Office / Route
                </label>
                <select
                  id="contact-office"
                  name="country"
                  value={selectedOfficeInForm}
                  onChange={(e) => setSelectedOfficeInForm(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    backgroundColor: "#1E130C",
                    border: "1px solid rgba(168, 104, 58, 0.4)",
                    borderRadius: "4px",
                    color: "#F6F0E4",
                    fontSize: "14px",
                    outline: "none",
                  }}
                >
                  <option value="India (Chennai HQ)">🇮🇳 India Office (Chennai - Global Trade Desk)</option>
                  <option value="Ethiopia Office (Assosa)">🇪🇹 Ethiopia Office (Assosa - East Africa Regional)</option>
                </select>
              </div>

              {/* Department / Product Selection */}
              <div style={{ marginBottom: "18px" }}>
                <label
                  htmlFor="contact-dept"
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#C9935A",
                    marginBottom: "6px",
                  }}
                >
                  Department / Product Interest
                </label>
                <select
                  id="contact-dept"
                  name="areaOfInterest"
                  defaultValue="Mining & Drilling Chemicals"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    backgroundColor: "#1E130C",
                    border: "1px solid rgba(168, 104, 58, 0.4)",
                    borderRadius: "4px",
                    color: "#F6F0E4",
                    fontSize: "14px",
                    outline: "none",
                  }}
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept.slug} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Company */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "18px",
                }}
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#C9935A",
                      marginBottom: "6px",
                    }}
                  >
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Full name"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      backgroundColor: "#1E130C",
                      border: "1px solid rgba(168, 104, 58, 0.4)",
                      borderRadius: "4px",
                      color: "#F6F0E4",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-company"
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#C9935A",
                      marginBottom: "6px",
                    }}
                  >
                    Company Name
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    placeholder="Corporation or Mill"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      backgroundColor: "#1E130C",
                      border: "1px solid rgba(168, 104, 58, 0.4)",
                      borderRadius: "4px",
                      color: "#F6F0E4",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "18px",
                }}
              >
                <div>
                  <label
                    htmlFor="contact-email"
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#C9935A",
                      marginBottom: "6px",
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      backgroundColor: "#1E130C",
                      border: "1px solid rgba(168, 104, 58, 0.4)",
                      borderRadius: "4px",
                      color: "#F6F0E4",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#C9935A",
                      marginBottom: "6px",
                    }}
                  >
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 99940 33191"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      backgroundColor: "#1E130C",
                      border: "1px solid rgba(168, 104, 58, 0.4)",
                      borderRadius: "4px",
                      color: "#F6F0E4",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: "22px" }}>
                <label
                  htmlFor="contact-message"
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#C9935A",
                    marginBottom: "6px",
                  }}
                >
                  Specific Specifications or Quantity Requirements *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Specify target volume (e.g. 50 MT), destination port (CIF / FOB), and required testing standards (COA, API 13A, PSIC)..."
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    backgroundColor: "#1E130C",
                    border: "1px solid rgba(168, 104, 58, 0.4)",
                    borderRadius: "4px",
                    color: "#F6F0E4",
                    fontSize: "14px",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Status Notice */}
              {status === "sent" && (
                <div
                  style={{
                    backgroundColor: "rgba(37, 211, 102, 0.15)",
                    border: "1px solid #25D366",
                    color: "#25D366",
                    padding: "12px 16px",
                    borderRadius: "4px",
                    marginBottom: "16px",
                    fontSize: "14px",
                  }}
                >
                  ✓ Thank you. Your inquiry has been routed to our {selectedOfficeInForm} desk. A trade manager will contact you promptly.
                </div>
              )}

              {status === "error" && (
                <div
                  style={{
                    backgroundColor: "rgba(220, 38, 38, 0.15)",
                    border: "1px solid #ef4444",
                    color: "#f87171",
                    padding: "12px 16px",
                    borderRadius: "4px",
                    marginBottom: "16px",
                    fontSize: "14px",
                  }}
                >
                  There was an issue dispatching your request. Please email us directly at hilfulventures@gmail.com or call +91 99940 33191.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  backgroundColor: "#A8683A",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  transition: "background 0.2s ease",
                  boxShadow: "0 4px 14px rgba(168, 104, 58, 0.3)",
                }}
                onMouseEnter={(e) => {
                  if (status !== "sending") e.currentTarget.style.backgroundColor = "#874D25";
                }}
                onMouseLeave={(e) => {
                  if (status !== "sending") e.currentTarget.style.backgroundColor = "#A8683A";
                }}
              >
                {status === "sending" ? "Routing Enquiry..." : "Send Formal Enquiry"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
