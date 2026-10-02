"use client";

import { useState } from "react";
import { Globe, Save, CheckCircle, Search } from "lucide-react";

export default function AdminSeoPage() {
  const [routes, setRoutes] = useState([
    {
      path: "/en",
      label: "Global English Portal",
      title: "Hilful Ventures | Integrated Mining & Energy Solutions",
      description: "International industrial company operating across integrated gold mining, drilling chemicals, scrap metals, ONG exploration mud chemicals, and high-grade quartz & fly ash.",
      locale: "en_US",
      status: "Optimized",
    },
    {
      path: "/ar",
      label: "Middle East Arabic Portal",
      title: "حلفول فنتشرز | حلول التعدين والطاقة المتكاملة",
      description: "شركة صناعية دولية متخصصة في تعدين الذهب، كيماويات الحفر الثقيلة، المعادن الثانوية، ومعادن التنقيب عن النفط والغاز.",
      locale: "ar_SA",
      status: "Optimized",
    },
    {
      path: "/en/products",
      label: "Commodities & Product Catalog",
      title: "Commodities & Product Catalog | Hilful Ventures",
      description: "Direct containerized supply across 5 specialized trading divisions with verified laboratory assay certificates.",
      locale: "en_US",
      status: "Optimized",
    },
    {
      path: "/en/about",
      label: "About & Leadership Profile",
      title: "About Hilful Ventures | Leadership & Operating Model",
      description: "Decades of sector expertise, cross-border corporate governance in India & Ethiopia, and relentless operational reliability.",
      locale: "en_US",
      status: "Optimized",
    },
  ]);

  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleUpdate = (idx: number, field: "title" | "description", val: string) => {
    const updated = [...routes];
    updated[idx] = { ...updated[idx], [field]: val };
    setRoutes(updated);
  };

  const handleSave = () => {
    setSaving(true);
    try {
      localStorage.setItem("hilful_cms_seo", JSON.stringify(routes));
      setStatusMessage("✓ SEO metadata updated and saved!");
      setTimeout(() => setStatusMessage(null), 3500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: "1050px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem", paddingBottom: "4rem" }}>
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", borderBottom: "1px solid rgba(168,104,58,0.25)", paddingBottom: "1.5rem" }}>
        <div>
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9935A", display: "block", marginBottom: "4px" }}>
            Search Engine Positioning &amp; Social Previews
          </span>
          <h1
            style={{
              fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
              fontSize: "2.4rem",
              fontWeight: 700,
              color: "#F6F0E4",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            SEO &amp; OpenGraph Metadata
          </h1>
          <p style={{ color: "rgba(246,240,228,0.75)", fontSize: "14px", marginTop: "6px", maxWidth: "65ch", lineHeight: 1.6 }}>
            Manage search engine meta titles, descriptions, and OpenGraph social share cards across localized routes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 22px",
            borderRadius: "4px",
            backgroundColor: "#A8683A",
            border: "none",
            color: "#FFFFFF",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: saving ? "not-allowed" : "pointer",
            boxShadow: "0 4px 14px rgba(168, 104, 58, 0.35)",
          }}
        >
          <Save size={14} />
          <span>{saving ? "Saving..." : "Save SEO Settings"}</span>
        </button>
      </div>

      {statusMessage && (
        <div
          style={{
            padding: "14px 20px",
            borderRadius: "4px",
            backgroundColor: "rgba(37, 211, 102, 0.15)",
            border: "1px solid #25D366",
            color: "#F6F0E4",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <CheckCircle size={16} color="#25D366" />
          <span>{statusMessage}</span>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {routes.map((rt, idx) => (
          <div
            key={rt.path}
            style={{
              backgroundColor: "#1E130C",
              border: "1px solid rgba(168, 104, 58, 0.3)",
              borderRadius: "6px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(168, 104, 58, 0.2)", paddingBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Globe size={18} color="#C9935A" />
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#F6F0E4" }}>
                  {rt.label}
                </span>
                <span style={{ fontSize: "11px", color: "rgba(246, 240, 228, 0.6)", backgroundColor: "rgba(168, 104, 58, 0.2)", padding: "2px 8px", borderRadius: "3px" }}>
                  {rt.path}
                </span>
              </div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#25D366",
                  backgroundColor: "rgba(37, 211, 102, 0.12)",
                  border: "1px solid rgba(37, 211, 102, 0.3)",
                  padding: "3px 8px",
                  borderRadius: "2px",
                }}
              >
                {rt.status}
              </span>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9935A", marginBottom: "6px" }}>
                Browser Title &amp; OpenGraph Title
              </label>
              <input
                type="text"
                value={rt.title}
                onChange={(e) => handleUpdate(idx, "title", e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "4px",
                  backgroundColor: "#2A1B10",
                  border: "1px solid rgba(168, 104, 58, 0.35)",
                  color: "#F6F0E4",
                  fontSize: "14px",
                  fontWeight: 600,
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9935A", marginBottom: "6px" }}>
                Meta Description (Search Snippet)
              </label>
              <textarea
                rows={2}
                value={rt.description}
                onChange={(e) => handleUpdate(idx, "description", e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "4px",
                  backgroundColor: "#2A1B10",
                  border: "1px solid rgba(168, 104, 58, 0.35)",
                  color: "#F6F0E4",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
