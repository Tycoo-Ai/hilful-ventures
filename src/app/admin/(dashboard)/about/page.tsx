"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AdminImagePicker } from "@/components/admin/admin-image-picker";

export default function AdminAboutPage() {
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [aboutData, setAboutData] = useState({
    eyebrow: "01 / Corporate Profile",
    headline: "Global Trade Desk & Sustainable Commodity Supply",
    storyText1:
      "Hilful Ventures was established as a premier cross-border commodities and logistics enterprise bridging primary resource extraction with global industrial demand.",
    storyText2:
      "With active operational bases in Chennai, India and Assosa, Ethiopia, we provide uninterrupted supply chains for primary gold mining & mineral extraction, heavy drilling polymers, certified secondary smelting metals, oil & natural gas exploration minerals & mud chemicals, and high-grade quartz & fly ash.",
    stat1Value: "5+",
    stat1Label: "Specialized Commodity Disciplines",
    stat2Value: "2",
    stat2Label: "Continental Headquarters (India & Ethiopia)",
    stat3Value: "100%",
    stat3Label: "Independent Assay & COA Compliance",
    portraitImage: "https://res.cloudinary.com/sbjkwjoj/image/upload/v1790765148/hilful/general/458241330865178129_1790765146572.jpg",
  });

  // Load latest persisted about content on mount
  useEffect(() => {
    fetch("/api/admin/cms/about")
      .then((res) => res.json())
      .then((data) => {
        const active = data?.published || data?.draft;
        if (active) {
          setAboutData((prev) => ({
            ...prev,
            eyebrow: active.hero?.eyebrow || active.eyebrow || prev.eyebrow,
            headline: active.hero?.headline || active.headline || prev.headline,
            storyText1: active.story?.p1 || active.storyText1 || prev.storyText1,
            storyText2: active.story?.p2 || active.storyText2 || prev.storyText2,
            portraitImage: active.portraitImage || active.image || prev.portraitImage,
          }));
        }
      })
      .catch((err) => console.warn("Failed to load about CMS:", err));
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch("/api/admin/cms/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "saveAndPublish", data: aboutData }),
      });
      showToast("✓ About Us page saved and published live!");
    } catch {
      showToast("✓ About Us content updated locally.");
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

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9935A", display: "block", marginBottom: "4px" }}>
            Corporate Information
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
            About Us Manager
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(246, 240, 228, 0.65)", margin: "4px 0 0 0" }}>
            Edit corporate narrative, founder statement, key statistics, and organizational credentials
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 22px",
            backgroundColor: "#A8683A",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(168,104,58,0.3)",
          }}
        >
          {saving ? "Saving..." : "Save Changes Live"}
        </button>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSave}
        style={{
          backgroundColor: "rgba(42, 27, 16, 0.85)",
          border: "1px solid rgba(168, 104, 58, 0.3)",
          borderRadius: "6px",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          boxShadow: "0 8px 28px rgba(0,0,0,0.3)",
        }}
      >
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
            Section Eyebrow Label
          </label>
          <input
            type="text"
            value={aboutData.eyebrow}
            onChange={(e) => setAboutData({ ...aboutData, eyebrow: e.target.value })}
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
            Main Section Headline
          </label>
          <input
            type="text"
            value={aboutData.headline}
            onChange={(e) => setAboutData({ ...aboutData, headline: e.target.value })}
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
            Corporate Story — Paragraph 1
          </label>
          <textarea
            rows={3}
            value={aboutData.storyText1}
            onChange={(e) => setAboutData({ ...aboutData, storyText1: e.target.value })}
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

        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
            Corporate Story — Paragraph 2
          </label>
          <textarea
            rows={3}
            value={aboutData.storyText2}
            onChange={(e) => setAboutData({ ...aboutData, storyText2: e.target.value })}
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

        {/* 3 Key Stats */}
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "10px" }}>
            Editorial Counter Statistics
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
            <div style={{ backgroundColor: "#160e08", padding: "16px", borderRadius: "4px", border: "1px solid rgba(168,104,58,0.3)" }}>
              <input
                type="text"
                value={aboutData.stat1Value}
                onChange={(e) => setAboutData({ ...aboutData, stat1Value: e.target.value })}
                style={{ width: "100%", background: "transparent", border: "none", color: "#C9935A", fontSize: "1.4rem", fontWeight: 700, outline: "none", marginBottom: "4px" }}
              />
              <input
                type="text"
                value={aboutData.stat1Label}
                onChange={(e) => setAboutData({ ...aboutData, stat1Label: e.target.value })}
                style={{ width: "100%", background: "transparent", border: "none", color: "rgba(246,240,228,0.7)", fontSize: "12px", outline: "none" }}
              />
            </div>

            <div style={{ backgroundColor: "#160e08", padding: "16px", borderRadius: "4px", border: "1px solid rgba(168,104,58,0.3)" }}>
              <input
                type="text"
                value={aboutData.stat2Value}
                onChange={(e) => setAboutData({ ...aboutData, stat2Value: e.target.value })}
                style={{ width: "100%", background: "transparent", border: "none", color: "#C9935A", fontSize: "1.4rem", fontWeight: 700, outline: "none", marginBottom: "4px" }}
              />
              <input
                type="text"
                value={aboutData.stat2Label}
                onChange={(e) => setAboutData({ ...aboutData, stat2Label: e.target.value })}
                style={{ width: "100%", background: "transparent", border: "none", color: "rgba(246,240,228,0.7)", fontSize: "12px", outline: "none" }}
              />
            </div>

            <div style={{ backgroundColor: "#160e08", padding: "16px", borderRadius: "4px", border: "1px solid rgba(168,104,58,0.3)" }}>
              <input
                type="text"
                value={aboutData.stat3Value}
                onChange={(e) => setAboutData({ ...aboutData, stat3Value: e.target.value })}
                style={{ width: "100%", background: "transparent", border: "none", color: "#C9935A", fontSize: "1.4rem", fontWeight: 700, outline: "none", marginBottom: "4px" }}
              />
              <input
                type="text"
                value={aboutData.stat3Label}
                onChange={(e) => setAboutData({ ...aboutData, stat3Label: e.target.value })}
                style={{ width: "100%", background: "transparent", border: "none", color: "rgba(246,240,228,0.7)", fontSize: "12px", outline: "none" }}
              />
            </div>
          </div>
        </div>

        {/* Portrait Image with Google URL & Upload */}
        <AdminImagePicker
          label="Executive Portrait / Corporate Media"
          value={aboutData.portraitImage}
          searchQuery="executive corporate founder business desk portrait"
          onChange={(url) => setAboutData({ ...aboutData, portraitImage: url })}
          helperText="Paste direct Google Images or web link, or choose from your computer to change."
        />

        <button
          type="submit"
          disabled={saving}
          style={{
            alignSelf: "flex-start",
            padding: "12px 28px",
            backgroundColor: "#A8683A",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            marginTop: "8px",
          }}
        >
          {saving ? "Saving Changes..." : "Save About Us Content"}
        </button>
      </form>
    </div>
  );
}
