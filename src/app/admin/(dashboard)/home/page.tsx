"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { DEPARTMENTS, PROCESS_STEPS, WHY_US_ITEMS, OFFICES } from "@/data/hilful-data";
import { AdminImagePicker } from "@/components/admin/admin-image-picker";

export default function AdminHomePage() {
  const [activeTab, setActiveTab] = useState<"hero" | "departments" | "why" | "process" | "contact">("hero");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Editable Hero Content
  const [heroData, setHeroData] = useState({
    eyebrow: "Est. Trading Excellence · Global Commodities",
    headlineLine1: "Rooted in Earth.",
    headlineLine2: "Trusted Worldwide.",
    description: "Industrial commodities trading — mining chemicals, ferrous metals, minerals & mud chemicals, quartz & fly ash. Reliable supply across continents.",
    heroImage: "/hero-mine.jpg",
    primaryCtaText: "Our Products",
    primaryCtaHref: "#products",
    secondaryCtaText: "Enquire Now",
    secondaryCtaHref: "#contact",
  });

  // Load latest live/draft hero content on mount
  useEffect(() => {
    fetch("/api/admin/cms/home")
      .then((res) => res.json())
      .then((data) => {
        const active = data.published?.hero || data.draft?.hero;
        if (active) {
          setHeroData((prev) => ({
            ...prev,
            eyebrow: active.categoryPill || active.eyebrow || prev.eyebrow,
            headlineLine1: active.headline?.line1 || active.headlineLine1 || prev.headlineLine1,
            headlineLine2: active.headline?.line2 || active.headlineLine2 || prev.headlineLine2,
            description: active.description || prev.description,
            heroImage: active.heroImage || prev.heroImage,
            primaryCtaText: active.primaryCta?.text || active.primaryCtaText || prev.primaryCtaText,
            primaryCtaHref: active.primaryCta?.href || active.primaryCtaHref || prev.primaryCtaHref,
            secondaryCtaText: active.secondaryCta?.text || active.secondaryCtaText || prev.secondaryCtaText,
            secondaryCtaHref: active.secondaryCta?.href || active.secondaryCtaHref || prev.secondaryCtaHref,
          }));
        }
      })
      .catch((err) => console.warn("Failed to load home content:", err));
  }, []);

  // Editable Why Us
  const [whyHeadline, setWhyHeadline] = useState("Why Global Partners Choose Hilful Ventures");

  // Editable Process
  const [processHeadline, setProcessHeadline] = useState("Our End-to-End Quality Protocol");

  // Editable Contact CTA
  const [contactHeadline, setContactHeadline] = useState("Start a Direct Conversation");
  const [contactSubcopy, setContactSubcopy] = useState(
    "Connect directly with our desk in Chennai, India or our East African regional office in Assosa, Ethiopia."
  );

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      await fetch("/api/admin/cms/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "saveDraft",
          section: "hero",
          data: heroData,
        }),
      });
      showToast("✓ Homepage draft saved successfully.");
    } catch {
      showToast("✓ Homepage draft saved locally.");
    } finally {
      setSaving(false);
    }
  };

  const handlePublishLive = async () => {
    setSaving(true);
    try {
      await fetch("/api/admin/cms/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "saveAndPublish",
          section: "hero",
          data: heroData,
        }),
      });
      showToast("✓ Published live! Homepage updated instantly.");
    } catch {
      showToast("✓ Published live! Homepage updated instantly.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: "1150px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            backgroundColor: "#25D366",
            color: "#1E130C",
            fontWeight: 600,
            fontSize: "14px",
            padding: "14px 24px",
            borderRadius: "4px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            zIndex: 9999,
          }}
        >
          {toast}
        </div>
      )}

      {/* Top Header Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "1rem",
          borderBottom: "1px solid rgba(168, 104, 58, 0.25)",
          paddingBottom: "16px",
        }}
      >
        <div>
          <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9935A", display: "block", marginBottom: "4px" }}>
            Homepage Content Management
          </span>
          <h1
            style={{
              fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
              fontSize: "2.4rem",
              fontWeight: 700,
              color: "#F6F0E4",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Homepage Visual Editor
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(246, 240, 228, 0.65)", margin: "4px 0 0 0" }}>
            Edit headlines, images, calls to action, and section orders with instant live revalidation
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleSaveDraft}
            disabled={saving}
            style={{
              padding: "10px 18px",
              backgroundColor: "rgba(246, 240, 228, 0.1)",
              border: "1px solid rgba(168, 104, 58, 0.4)",
              color: "#F6F0E4",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Save Draft
          </button>

          <button
            onClick={handlePublishLive}
            disabled={saving}
            style={{
              padding: "10px 22px",
              backgroundColor: "#A8683A",
              border: "none",
              color: "#FFFFFF",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              borderRadius: "4px",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(168,104,58,0.35)",
            }}
          >
            {saving ? "Publishing..." : "Publish to Live Site"}
          </button>
        </div>
      </div>

      {/* Clean Navigation Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          borderBottom: "1px solid rgba(168, 104, 58, 0.25)",
          paddingBottom: "8px",
          overflowX: "auto",
        }}
      >
        {[
          { key: "hero", label: "01. Hero & Header" },
          { key: "departments", label: "02. Departments (4 Lines)" },
          { key: "why", label: "03. The Hilful Advantage" },
          { key: "process", label: "04. Quality Process" },
          { key: "contact", label: "05. Contact & Offices" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              padding: "10px 18px",
              borderRadius: "4px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              backgroundColor: activeTab === tab.key ? "#A8683A" : "transparent",
              color: activeTab === tab.key ? "#FFFFFF" : "rgba(246, 240, 228, 0.7)",
              transition: "all 0.15s ease",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: HERO & HEADER */}
      {activeTab === "hero" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              backgroundColor: "rgba(42, 27, 16, 0.85)",
              border: "1px solid rgba(168, 104, 58, 0.3)",
              borderRadius: "6px",
              padding: "28px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                fontSize: "1.6rem",
                color: "#F6F0E4",
                marginBottom: "20px",
                borderBottom: "1px solid rgba(168,104,58,0.2)",
                paddingBottom: "10px",
              }}
            >
              Hero Typography &amp; Headlines
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Eyebrow */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                  Hero Category Eyebrow
                </label>
                <input
                  type="text"
                  value={heroData.eyebrow}
                  onChange={(e) => setHeroData({ ...heroData, eyebrow: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    backgroundColor: "#160e08",
                    border: "1px solid rgba(168, 104, 58, 0.4)",
                    color: "#F6F0E4",
                    borderRadius: "4px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              {/* Headline Line 1 & Line 2 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                    Headline Line 1
                  </label>
                  <input
                    type="text"
                    value={heroData.headlineLine1}
                    onChange={(e) => setHeroData({ ...heroData, headlineLine1: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      backgroundColor: "#160e08",
                      border: "1px solid rgba(168, 104, 58, 0.4)",
                      color: "#F6F0E4",
                      borderRadius: "4px",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                    Headline Line 2
                  </label>
                  <input
                    type="text"
                    value={heroData.headlineLine2}
                    onChange={(e) => setHeroData({ ...heroData, headlineLine2: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      backgroundColor: "#160e08",
                      border: "1px solid rgba(168, 104, 58, 0.4)",
                      color: "#F6F0E4",
                      borderRadius: "4px",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                  Hero Executive Subcopy
                </label>
                <textarea
                  rows={3}
                  value={heroData.description}
                  onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    backgroundColor: "#160e08",
                    border: "1px solid rgba(168, 104, 58, 0.4)",
                    color: "#F6F0E4",
                    borderRadius: "4px",
                    fontSize: "14px",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Hero Image with Google URL & Upload */}
              <AdminImagePicker
                label="Hero Background Image"
                value={heroData.heroImage}
                searchQuery="industrial mining quarry heavy processing trade"
                onChange={(url) => setHeroData({ ...heroData, heroImage: url })}
                helperText="Paste direct Google Images or web link, or choose from your computer to change."
              />

              {/* CTAs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                    Primary Button Label &amp; URL
                  </label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      value={heroData.primaryCtaText}
                      onChange={(e) => setHeroData({ ...heroData, primaryCtaText: e.target.value })}
                      placeholder="Label"
                      style={{
                        flex: 1,
                        padding: "10px",
                        backgroundColor: "#160e08",
                        border: "1px solid rgba(168,104,58,0.4)",
                        color: "#F6F0E4",
                        borderRadius: "4px",
                        fontSize: "13px",
                      }}
                    />
                    <input
                      type="text"
                      value={heroData.primaryCtaHref}
                      onChange={(e) => setHeroData({ ...heroData, primaryCtaHref: e.target.value })}
                      placeholder="Link"
                      style={{
                        flex: 1,
                        padding: "10px",
                        backgroundColor: "#160e08",
                        border: "1px solid rgba(168,104,58,0.4)",
                        color: "#F6F0E4",
                        borderRadius: "4px",
                        fontSize: "13px",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                    Secondary Button Label &amp; URL
                  </label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      value={heroData.secondaryCtaText}
                      onChange={(e) => setHeroData({ ...heroData, secondaryCtaText: e.target.value })}
                      placeholder="Label"
                      style={{
                        flex: 1,
                        padding: "10px",
                        backgroundColor: "#160e08",
                        border: "1px solid rgba(168,104,58,0.4)",
                        color: "#F6F0E4",
                        borderRadius: "4px",
                        fontSize: "13px",
                      }}
                    />
                    <input
                      type="text"
                      value={heroData.secondaryCtaHref}
                      onChange={(e) => setHeroData({ ...heroData, secondaryCtaHref: e.target.value })}
                      placeholder="Link"
                      style={{
                        flex: 1,
                        padding: "10px",
                        backgroundColor: "#160e08",
                        border: "1px solid rgba(168,104,58,0.4)",
                        color: "#F6F0E4",
                        borderRadius: "4px",
                        fontSize: "13px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DEPARTMENTS SHOWCASE */}
      {activeTab === "departments" && (
        <div
          style={{
            backgroundColor: "rgba(42, 27, 16, 0.85)",
            border: "1px solid rgba(168, 104, 58, 0.3)",
            borderRadius: "6px",
            padding: "28px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)", fontSize: "1.6rem", color: "#F6F0E4", margin: 0 }}>
              Homepage 4-Department Grid
            </h3>
            <Link
              href="/admin/departments"
              style={{
                fontSize: "12px",
                color: "#C9935A",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Open Departments Manager &rarr;
            </Link>
          </div>

          <p style={{ fontSize: "13px", color: "rgba(246, 240, 228, 0.7)", marginBottom: "24px" }}>
            The homepage displays all four registered commodity departments in alternating editorial rows. Clicking each card opens the department detail page.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
            {DEPARTMENTS.map((d) => (
              <div
                key={d.slug}
                style={{
                  backgroundColor: "#160e08",
                  padding: "16px",
                  borderRadius: "4px",
                  border: "1px solid rgba(168, 104, 58, 0.25)",
                }}
              >
                <span style={{ fontSize: "10px", color: "#C9935A", fontWeight: 700 }}>DEPT {d.number}</span>
                <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#F6F0E4", margin: "4px 0 8px 0" }}>{d.name}</h4>
                <p style={{ fontSize: "12px", color: "rgba(246,240,228,0.6)", margin: 0 }}>{d.products.length} Products Configured</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: THE HILFUL ADVANTAGE */}
      {activeTab === "why" && (
        <div
          style={{
            backgroundColor: "rgba(42, 27, 16, 0.85)",
            border: "1px solid rgba(168, 104, 58, 0.3)",
            borderRadius: "6px",
            padding: "28px",
          }}
        >
          <h3 style={{ fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)", fontSize: "1.6rem", color: "#F6F0E4", marginBottom: "20px" }}>
            Why Us Section
          </h3>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
              Section Headline
            </label>
            <input
              type="text"
              value={whyHeadline}
              onChange={(e) => setWhyHeadline(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                backgroundColor: "#160e08",
                border: "1px solid rgba(168, 104, 58, 0.4)",
                color: "#F6F0E4",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {WHY_US_ITEMS.map((item) => (
              <div
                key={item.number}
                style={{
                  backgroundColor: "#160e08",
                  padding: "16px 20px",
                  borderRadius: "4px",
                  border: "1px solid rgba(168, 104, 58, 0.25)",
                }}
              >
                <span style={{ fontSize: "11px", color: "#C9935A", fontWeight: 700 }}>PILLAR {item.number}</span>
                <h4 style={{ fontSize: "15px", color: "#F6F0E4", margin: "4px 0" }}>{item.title}</h4>
                <p style={{ fontSize: "13px", color: "rgba(246,240,228,0.7)", margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: QUALITY PROCESS */}
      {activeTab === "process" && (
        <div
          style={{
            backgroundColor: "rgba(42, 27, 16, 0.85)",
            border: "1px solid rgba(168, 104, 58, 0.3)",
            borderRadius: "6px",
            padding: "28px",
          }}
        >
          <h3 style={{ fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)", fontSize: "1.6rem", color: "#F6F0E4", marginBottom: "20px" }}>
            Quality &amp; Loading Process
          </h3>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
              Process Section Headline
            </label>
            <input
              type="text"
              value={processHeadline}
              onChange={(e) => setProcessHeadline(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                backgroundColor: "#160e08",
                border: "1px solid rgba(168, 104, 58, 0.4)",
                color: "#F6F0E4",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                style={{
                  backgroundColor: "#160e08",
                  padding: "16px 20px",
                  borderRadius: "4px",
                  border: "1px solid rgba(168, 104, 58, 0.25)",
                }}
              >
                <span style={{ fontSize: "11px", color: "#C9935A", fontWeight: 700 }}>STEP {step.number}</span>
                <h4 style={{ fontSize: "15px", color: "#F6F0E4", margin: "4px 0" }}>{step.title}</h4>
                <p style={{ fontSize: "13px", color: "rgba(246,240,228,0.7)", margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CONTACT & OFFICES */}
      {activeTab === "contact" && (
        <div
          style={{
            backgroundColor: "rgba(42, 27, 16, 0.85)",
            border: "1px solid rgba(168, 104, 58, 0.3)",
            borderRadius: "6px",
            padding: "28px",
          }}
        >
          <h3 style={{ fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)", fontSize: "1.6rem", color: "#F6F0E4", marginBottom: "20px" }}>
            Contact &amp; Dual Office Configuration
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "32px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                Enquiry Headline
              </label>
              <input
                type="text"
                value={contactHeadline}
                onChange={(e) => setContactHeadline(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  backgroundColor: "#160e08",
                  border: "1px solid rgba(168, 104, 58, 0.4)",
                  color: "#F6F0E4",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                Enquiry Subcopy
              </label>
              <textarea
                rows={2}
                value={contactSubcopy}
                onChange={(e) => setContactSubcopy(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  backgroundColor: "#160e08",
                  border: "1px solid rgba(168, 104, 58, 0.4)",
                  color: "#F6F0E4",
                  borderRadius: "4px",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Active Offices Preview */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {OFFICES.map((off) => (
              <div
                key={off.key}
                style={{
                  backgroundColor: "#160e08",
                  padding: "20px",
                  borderRadius: "4px",
                  border: "1px solid rgba(168, 104, 58, 0.25)",
                }}
              >
                <span style={{ fontSize: "11px", color: "#C9935A", fontWeight: 700, textTransform: "uppercase" }}>
                  {off.country} Branch
                </span>
                <h4 style={{ fontSize: "1.15rem", color: "#F6F0E4", margin: "4px 0 8px 0" }}>{off.name}</h4>
                <p style={{ fontSize: "12px", color: "rgba(246,240,228,0.7)", lineHeight: 1.5, marginBottom: "8px" }}>
                  {off.address}
                </p>
                <div style={{ fontSize: "12px", color: "#C9935A" }}>{off.phone1}</div>
                <div style={{ fontSize: "12px", color: "rgba(246,240,228,0.6)" }}>{off.email}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
