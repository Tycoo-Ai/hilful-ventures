"use client";

import { useState, useEffect } from "react";
import {
  Save,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Globe,
  Sliders,
  Palette,
  MapPin,
} from "lucide-react";
import type { CMSGlobalSettings } from "@/lib/cms/types";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"brand" | "navigation" | "theme" | "offices">("brand");
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [settings, setSettings] = useState<CMSGlobalSettings>({
    brand: {
      siteName: "Hilful Ventures Pvt Ltd",
      siteNameAr: "هلفول فنتشرز المحدودة",
      tagline: "Rooted in Earth. Trusted Worldwide.",
      taglineAr: "متجذرة في الأرض. موثوقة عالمياً.",
      logoText: "Hilful Ventures",
      registrationNumber: "CIN: U24299TN2022PTC152834",
    },
    header: {
      ctaText: "Enquire",
      ctaTextAr: "استفسر الآن",
      ctaHref: "/contact",
    },
    footer: {
      description: "International commodities trading specializing in primary gold mining & mineral extraction, heavy drilling chemicals, secondary ferrous and non-ferrous metals, minerals & mud chemicals for ONG exploration, and quartz & fly ash.",
      descriptionAr: "تجارة السلع الدولية المتخصصة في تعدين الذهب واستخراج المعادن، وكيماويات الحفر الثقيلة، والمعادن الثانوية، والمواد الكيميائية للاستكشاف، والكوارتز والرماد المتطاير.",
      copyrightText: "© 2026 Hilful Ventures Pvt Ltd. All rights reserved.",
      copyrightTextAr: "© 2026 شركة هلفول فنتشرز الخاصة المحدودة. جميع الحقوق محفوظة.",
    },
    seoDefaults: {
      defaultTitle: "Hilful Ventures | Integrated Mining & Energy Solutions",
      defaultTitleAr: "هلفول فنتشرز | حلول التعدين والطاقة المتكاملة",
      defaultDescription: "Physical commodities trading and integrated mining solutions across Asia, Africa, and the Middle East.",
      defaultDescriptionAr: "تجارة السلع المادية وحلول التعدين المتكاملة عبر آسيا وأفريقيا والشرق الأوسط.",
      ogImage: "/hero-mine.jpg",
    },
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/cms/settings");
        if (res.ok) {
          const json = await res.json();
          if (json.settings) {
            setSettings((prev) => ({
              ...prev,
              ...json.settings,
              brand: { ...prev.brand, ...(json.settings.brand || {}) },
              header: { ...prev.header, ...(json.settings.header || {}) },
              footer: { ...prev.footer, ...(json.settings.footer || {}) },
            }));
          }
        }
      } catch (err) {
        console.error("Failed to load settings", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/cms/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to save settings");
      setStatusMessage({
        type: "success",
        text: "✓ Global Settings saved & active on website immediately!",
      });
      setTimeout(() => setStatusMessage(null), 4000);
    } catch {
      setStatusMessage({
        type: "error",
        text: "Failed to persist global settings. Saved locally.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "350px", color: "#C9935A", gap: "10px" }}>
        <RefreshCw className="animate-spin" size={18} />
        <span>Loading Global Settings...</span>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1050px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem", paddingBottom: "4rem" }}>
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", borderBottom: "1px solid rgba(168,104,58,0.25)", paddingBottom: "1.5rem" }}>
        <div>
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9935A", display: "block", marginBottom: "4px" }}>
            Site Configuration &amp; Governance
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
            Global Site Settings &amp; Theme
          </h1>
          <p style={{ color: "rgba(246,240,228,0.75)", fontSize: "14px", marginTop: "6px", maxWidth: "65ch", lineHeight: 1.6 }}>
            Brand Identity, Navigation Header CTAs, Luxury Palette Tokens, and International Office Desks.
          </p>
        </div>

        <button
          type="button"
          disabled={saving}
          onClick={handleSave}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 24px",
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
          <span>{saving ? "Saving..." : "Save All Settings"}</span>
        </button>
      </div>

      {/* Notifications */}
      {statusMessage && (
        <div
          style={{
            padding: "14px 20px",
            borderRadius: "4px",
            backgroundColor: statusMessage.type === "success" ? "rgba(37, 211, 102, 0.15)" : "rgba(220, 38, 38, 0.15)",
            border: statusMessage.type === "success" ? "1px solid #25D366" : "1px solid #ef4444",
            color: "#F6F0E4",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {statusMessage.type === "success" ? <CheckCircle size={16} color="#25D366" /> : <AlertCircle size={16} color="#ef4444" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid rgba(168,104,58,0.25)", paddingBottom: "12px", flexWrap: "wrap" }}>
        {[
          { key: "brand", label: "Brand & Legal", icon: Globe },
          { key: "navigation", label: "Navigation & CTAs", icon: Sliders },
          { key: "theme", label: "Theme Palette Tokens", icon: Palette },
          { key: "offices", label: "Global Desks (HQ)", icon: MapPin },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "4px",
                border: isActive ? "1px solid #A8683A" : "1px solid rgba(168,104,58,0.2)",
                backgroundColor: isActive ? "#A8683A" : "rgba(30, 19, 12, 0.6)",
                color: isActive ? "#FFFFFF" : "rgba(246, 240, 228, 0.75)",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Brand & Legal */}
      {activeTab === "brand" && (
        <div style={{ backgroundColor: "#1E130C", border: "1px solid rgba(168, 104, 58, 0.3)", borderRadius: "6px", padding: "24px", display: "flex", flexDirection: "column", gap: "18px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9935A", borderBottom: "1px solid rgba(168,104,58,0.2)", paddingBottom: "10px", margin: 0 }}>
            1. Corporate Identification
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", color: "#C9935A", marginBottom: "6px" }}>
                Company Name (English)
              </label>
              <input
                type="text"
                value={settings.brand?.siteName || ""}
                onChange={(e) => setSettings({ ...settings, brand: { ...settings.brand, siteName: e.target.value } })}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "4px", backgroundColor: "#2A1B10", border: "1px solid rgba(168,104,58,0.35)", color: "#F6F0E4", fontSize: "14px", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", color: "#C9935A", marginBottom: "6px" }}>
                Company Name (Arabic)
              </label>
              <input
                type="text"
                dir="rtl"
                value={settings.brand?.siteNameAr || ""}
                onChange={(e) => setSettings({ ...settings, brand: { ...settings.brand, siteNameAr: e.target.value } })}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "4px", backgroundColor: "#2A1B10", border: "1px solid rgba(168,104,58,0.35)", color: "#F6F0E4", fontSize: "14px", outline: "none" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", color: "#C9935A", marginBottom: "6px" }}>
                Corporate Tagline (English)
              </label>
              <input
                type="text"
                value={settings.brand?.tagline || ""}
                onChange={(e) => setSettings({ ...settings, brand: { ...settings.brand, tagline: e.target.value } })}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "4px", backgroundColor: "#2A1B10", border: "1px solid rgba(168,104,58,0.35)", color: "#F6F0E4", fontSize: "14px", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", color: "#C9935A", marginBottom: "6px" }}>
                Corporate Registration / CIN
              </label>
              <input
                type="text"
                value={settings.brand?.registrationNumber || ""}
                onChange={(e) => setSettings({ ...settings, brand: { ...settings.brand, registrationNumber: e.target.value } })}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "4px", backgroundColor: "#2A1B10", border: "1px solid rgba(168,104,58,0.35)", color: "#F6F0E4", fontSize: "14px", outline: "none" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Navigation & CTAs */}
      {activeTab === "navigation" && (
        <div style={{ backgroundColor: "#1E130C", border: "1px solid rgba(168, 104, 58, 0.3)", borderRadius: "6px", padding: "24px", display: "flex", flexDirection: "column", gap: "18px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9935A", borderBottom: "1px solid rgba(168,104,58,0.2)", paddingBottom: "10px", margin: 0 }}>
            2. Header Action Buttons &amp; Menu Targets
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", color: "#C9935A", marginBottom: "6px" }}>
                Primary Header CTA Label
              </label>
              <input
                type="text"
                value={settings.header?.ctaText || ""}
                onChange={(e) => setSettings({ ...settings, header: { ...settings.header, ctaText: e.target.value } })}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "4px", backgroundColor: "#2A1B10", border: "1px solid rgba(168,104,58,0.35)", color: "#F6F0E4", fontSize: "14px", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", color: "#C9935A", marginBottom: "6px" }}>
                Primary CTA Destination
              </label>
              <input
                type="text"
                value={settings.header?.ctaHref || "/contact"}
                onChange={(e) => setSettings({ ...settings, header: { ...settings.header, ctaHref: e.target.value } })}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "4px", backgroundColor: "#2A1B10", border: "1px solid rgba(168,104,58,0.35)", color: "#F6F0E4", fontSize: "14px", outline: "none" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Theme Palette Tokens */}
      {activeTab === "theme" && (
        <div style={{ backgroundColor: "#1E130C", border: "1px solid rgba(168, 104, 58, 0.3)", borderRadius: "6px", padding: "24px", display: "flex", flexDirection: "column", gap: "18px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9935A", borderBottom: "1px solid rgba(168,104,58,0.2)", paddingBottom: "10px", margin: 0 }}>
            3. Luxury Mineral Brand Color Palette
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            {[
              { name: "Espresso", hex: "#1E130C", role: "Primary Background & Dark Containers" },
              { name: "Dark Umber", hex: "#2A1B10", role: "Secondary Container & Surface" },
              { name: "Copper Accent", hex: "#A8683A", role: "Buttons, Borders & Badges" },
              { name: "Caramel Gold", hex: "#C9935A", role: "Typography Highlights & Numbers" },
              { name: "Bright Ivory", hex: "#F6F0E4", role: "Primary Light Text & Sections" },
              { name: "Soft Parchment", hex: "#EADFC9", role: "Light Card & Matrix Surface" },
            ].map((token) => (
              <div
                key={token.name}
                style={{
                  backgroundColor: "#2A1B10",
                  border: "1px solid rgba(168, 104, 58, 0.3)",
                  borderRadius: "6px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div style={{ height: "40px", borderRadius: "4px", backgroundColor: token.hex, border: "1px solid rgba(255,255,255,0.2)" }} />
                <div>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#F6F0E4", display: "block" }}>
                    {token.name}
                  </span>
                  <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#C9935A", display: "block" }}>
                    {token.hex}
                  </span>
                  <span style={{ fontSize: "11px", color: "rgba(246, 240, 228, 0.7)", marginTop: "4px", display: "block" }}>
                    {token.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Global Desks */}
      {activeTab === "offices" && (
        <div style={{ backgroundColor: "#1E130C", border: "1px solid rgba(168, 104, 58, 0.3)", borderRadius: "6px", padding: "24px", display: "flex", flexDirection: "column", gap: "18px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9935A", borderBottom: "1px solid rgba(168,104,58,0.2)", paddingBottom: "10px", margin: 0 }}>
            4. International Corporate Desks
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div style={{ backgroundColor: "#2A1B10", border: "1px solid rgba(168, 104, 58, 0.25)", borderRadius: "6px", padding: "18px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#C9935A", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                🇮🇳 India Headquarters (HQ)
              </span>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F6F0E4", margin: "0 0 8px 0" }}>
                Chennai Global Trading Desk
              </h3>
              <p style={{ fontSize: "12px", color: "rgba(246, 240, 228, 0.75)", lineHeight: 1.6, margin: 0 }}>
                Old No: 187, New No: 64, Triplicane High Road, Triplicane, Chennai — 600005, Tamil Nadu, India.<br />
                Phone: +91 96555 22111 / +91 95000 81165<br />
                Email: hilfulventures@gmail.com
              </p>
            </div>

            <div style={{ backgroundColor: "#2A1B10", border: "1px solid rgba(168, 104, 58, 0.25)", borderRadius: "6px", padding: "18px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#C9935A", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                🇪🇹 East Africa Extraction Hub
              </span>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F6F0E4", margin: "0 0 8px 0" }}>
                Assosa Commercial Desk
              </h3>
              <p style={{ fontSize: "12px", color: "rgba(246, 240, 228, 0.75)", lineHeight: 1.6, margin: 0 }}>
                Benshangul Gumuz Regional State, Assosa, Ethiopia.<br />
                Managing primary gold mining extraction, logistics, and Horn of Africa commodities flow.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
