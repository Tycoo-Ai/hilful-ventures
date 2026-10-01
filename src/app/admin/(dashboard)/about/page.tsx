"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AdminImagePicker } from "@/components/admin/admin-image-picker";

export interface DirectorItem {
  id: string;
  name: string;
  role: string;
  image: string;
}

const INITIAL_DIRECTORS: DirectorItem[] = [
  {
    id: "dir-2",
    name: "Ghazi Ali",
    role: "Executive Director",
    image: "https://res.cloudinary.com/sbjkwjoj/image/upload/v1790858088/hilful/general/WhatsApp_Image_2026-10-01_at_10_58_52_AM_1790858088079.jpg",
  },
  {
    id: "dir-1",
    name: "Navas",
    role: "Founder & Managing Director",
    image: "https://res.cloudinary.com/sbjkwjoj/image/upload/v1790858099/hilful/general/WhatsApp_Image_2026-09-19_at_11_47_19_AM_1790858099276.jpg",
  },
  {
    id: "dir-3",
    name: "ISOOOR KHAN",
    role: "Director of Operations",
    image: "https://res.cloudinary.com/sbjkwjoj/image/upload/v1790858105/hilful/general/WhatsApp_Image_2026-10-01_at_10_58_51_AM_1790858105877.jpg",
  },
];

export default function AdminAboutPage() {
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [aboutData, setAboutData] = useState({
    eyebrow: "ABOUT HILFUL",
    headline: "OUR DIRECTORS",
    storyText1:
      "ENGINEERED FOR OPERATIONAL PRECISION. BUILT FOR CAPITAL EFFICIENCY. Hilful Ventures was established as a premier cross-border commodities and logistics enterprise bridging primary resource extraction with global industrial demand.",
    storyText2:
      "With active operational bases in Chennai, India and Assosa, Ethiopia, we provide uninterrupted supply chains for primary gold mining & mineral extraction, heavy drilling polymers, certified secondary smelting metals, oil & natural gas exploration minerals & mud chemicals, and high-grade quartz & fly ash.",
    stat1Value: "5+",
    stat1Label: "Specialized Commodity Disciplines",
    stat2Value: "2",
    stat2Label: "Continental Headquarters (India & Ethiopia)",
    stat3Value: "100%",
    stat3Label: "Independent Assay & COA Compliance",
    portraitImage: "https://res.cloudinary.com/sbjkwjoj/image/upload/v1790858088/hilful/general/WhatsApp_Image_2026-10-01_at_10_58_52_AM_1790858088079.jpg",
    directors: INITIAL_DIRECTORS,
  });

  // Load latest persisted about content on mount (LocalStorage first, then Cloud/API)
  useEffect(() => {
    // 1. Instant hydration from localStorage
    try {
      const local = localStorage.getItem("hilful_cms_about");
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed.directors && Array.isArray(parsed.directors) && parsed.directors.length > 0) {
          setAboutData(parsed);
        }
      }
    } catch {}

    // 2. Network sync from Cloud/Server API
    fetch("/api/admin/cms/about")
      .then((res) => res.json())
      .then((data) => {
        const active = data?.published || data?.draft;
        if (active) {
          setAboutData((prev) => {
            const hasServerDirs =
              active.directors && Array.isArray(active.directors) && active.directors.length > 0;
            const chosenDirectors = hasServerDirs ? active.directors : prev.directors;

            const next = {
              ...prev,
              eyebrow: active.hero?.eyebrow || active.eyebrow || prev.eyebrow,
              headline: active.hero?.headline || active.headline || prev.headline,
              storyText1: active.story?.p1 || active.storyText1 || prev.storyText1,
              storyText2: active.story?.p2 || active.storyText2 || prev.storyText2,
              portraitImage:
                chosenDirectors[0]?.image || active.portraitImage || active.image || prev.portraitImage,
              directors: chosenDirectors,
            };

            // If server returned valid directors, persist to localStorage
            if (hasServerDirs) {
              try {
                localStorage.setItem("hilful_cms_about", JSON.stringify(next));
              } catch {}
            }
            return next;
          });
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
      // Sync portraitImage to the 1st director's image so legacy components stay in sync
      const payload = {
        ...aboutData,
        portraitImage: aboutData.directors[0]?.image || aboutData.portraitImage,
      };

      // 1. Immediately store in localStorage so a refresh can NEVER wipe it out
      try {
        localStorage.setItem("hilful_cms_about", JSON.stringify(payload));
        window.dispatchEvent(new CustomEvent("hilful_about_updated", { detail: payload }));
        if (typeof BroadcastChannel !== "undefined") {
          const bc = new BroadcastChannel("hilful_cms_channel");
          bc.postMessage({ type: "ABOUT_UPDATED", data: payload });
          bc.close();
        }
      } catch (storageErr) {
        console.warn("LocalStorage save warning:", storageErr);
      }

      // 2. Persist to API and Cloudinary
      const res = await fetch("/api/admin/cms/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "saveAndPublish", data: payload }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          alert("Your admin session has expired. Please log in again.");
          window.location.href = "/admin/login";
          return;
        }
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Server save failed");
      }

      showToast("✓ Directors and About Us page saved and published live!");
    } catch (err: any) {
      console.warn("About save error:", err);
      showToast(err?.message ? `⚠ ${err.message}` : "✓ Saved to browser storage.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddDirector = () => {
    const newDir: DirectorItem = {
      id: `dir-${Date.now()}`,
      name: "New Director",
      role: "Director",
      image: "https://res.cloudinary.com/sbjkwjoj/image/upload/v1790765148/hilful/general/458241330865178129_1790765146572.jpg",
    };
    setAboutData({
      ...aboutData,
      directors: [...aboutData.directors, newDir],
    });
    showToast("Added new director profile. Fill details below.");
  };

  const handleUpdateDirector = (index: number, field: keyof DirectorItem, value: string) => {
    const updated = [...aboutData.directors];
    updated[index] = { ...updated[index], [field]: value };
    setAboutData({ ...aboutData, directors: updated });
  };

  const handleRemoveDirector = (index: number) => {
    if (aboutData.directors.length <= 1) {
      alert("At least 1 director profile is required.");
      return;
    }
    const updated = aboutData.directors.filter((_, i) => i !== index);
    setAboutData({ ...aboutData, directors: updated });
  };

  const handleMoveDirector = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= aboutData.directors.length) return;
    const updated = [...aboutData.directors];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIdx, 0, moved);
    setAboutData({ ...aboutData, directors: updated });
    showToast(`Prioritized ${moved.name} as position #${targetIdx + 1}`);
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
            Corporate Leadership
          </span>
          <h1
            style={{
              fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
              fontSize: "2.2rem",
              fontWeight: 700,
              color: "#F6F0E4",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Directors &amp; Company Overview
          </h1>
          <p style={{ color: "rgba(246,240,228,0.7)", fontSize: "14px", marginTop: "6px", maxWidth: "60ch" }}>
            Manage the rotating 5-second Director portraits (choose 3 or more members) with respective names, titles, and company history.
          </p>
        </div>

        <Link
          href="/about"
          target="_blank"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 16px",
            backgroundColor: "#160e08",
            border: "1px solid rgba(168,104,58,0.35)",
            borderRadius: "4px",
            color: "#C9935A",
            fontSize: "12px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          <span>View Public Page</span>
          <span>&rarr;</span>
        </Link>
      </div>

      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* =========================================================================
            SECTION: 3+ DIRECTORS CAROUSEL MANAGER
            ========================================================================= */}
        <div style={{ backgroundColor: "#2A1B10", border: "1px solid rgba(168,104,58,0.35)", borderRadius: "6px", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)", fontSize: "1.4rem", fontWeight: 700, color: "#F6F0E4", margin: 0 }}>
                Directors &amp; Leadership Profiles (5-Second Rotating Carousel)
              </h2>
              <p style={{ color: "rgba(246,240,228,0.7)", fontSize: "13px", marginTop: "4px" }}>
                Add 3 or more directors. The <strong>#1 position is prioritized</strong> (shown first), and cycles every 5 seconds on the homepage with their respective name badge.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddDirector}
              style={{
                padding: "8px 16px",
                backgroundColor: "#A8683A",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              + Add Director Profile
            </button>
          </div>

          {/* Director Cards List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {aboutData.directors.map((director, idx) => (
              <div
                key={director.id || idx}
                style={{
                  backgroundColor: "#160e08",
                  border: idx === 0 ? "2px solid #C9935A" : "1px solid rgba(168,104,58,0.3)",
                  borderRadius: "6px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {/* Header row: Priority badge + Move Up/Down + Remove */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      style={{
                        backgroundColor: idx === 0 ? "#C9935A" : "rgba(168,104,58,0.3)",
                        color: idx === 0 ? "#1E130C" : "#F6F0E4",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: "20px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {idx === 0 ? "Priority #1 (Shown First)" : `Position #${idx + 1}`}
                    </span>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "#F6F0E4" }}>
                      {director.name || `Director ${idx + 1}`}
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveDirector(idx, "up")}
                      title="Prioritize (Move Up)"
                      style={{
                        padding: "4px 10px",
                        backgroundColor: "rgba(246,240,228,0.1)",
                        border: "1px solid rgba(168,104,58,0.3)",
                        color: idx === 0 ? "rgba(246,240,228,0.3)" : "#F6F0E4",
                        borderRadius: "3px",
                        fontSize: "11px",
                        cursor: idx === 0 ? "not-allowed" : "pointer",
                      }}
                    >
                      ▲ Move Up
                    </button>
                    <button
                      type="button"
                      disabled={idx === aboutData.directors.length - 1}
                      onClick={() => handleMoveDirector(idx, "down")}
                      title="Move Down"
                      style={{
                        padding: "4px 10px",
                        backgroundColor: "rgba(246,240,228,0.1)",
                        border: "1px solid rgba(168,104,58,0.3)",
                        color: idx === aboutData.directors.length - 1 ? "rgba(246,240,228,0.3)" : "#F6F0E4",
                        borderRadius: "3px",
                        fontSize: "11px",
                        cursor: idx === aboutData.directors.length - 1 ? "not-allowed" : "pointer",
                      }}
                    >
                      ▼ Move Down
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveDirector(idx)}
                      style={{
                        padding: "4px 10px",
                        backgroundColor: "rgba(220,38,38,0.2)",
                        border: "1px solid #ef4444",
                        color: "#f87171",
                        borderRadius: "3px",
                        fontSize: "11px",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Inputs: Name & Role */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "4px" }}>
                      Director Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={director.name}
                      placeholder="e.g. Ghazi Ali, Navas, Noor"
                      onChange={(e) => handleUpdateDirector(idx, "name", e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        backgroundColor: "#1E130C",
                        border: "1px solid rgba(168,104,58,0.4)",
                        borderRadius: "4px",
                        color: "#F6F0E4",
                        fontSize: "13px",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "4px" }}>
                      Designation / Role Title
                    </label>
                    <input
                      type="text"
                      value={director.role}
                      placeholder="e.g. Managing Director, Executive Director"
                      onChange={(e) => handleUpdateDirector(idx, "role", e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        backgroundColor: "#1E130C",
                        border: "1px solid rgba(168,104,58,0.4)",
                        borderRadius: "4px",
                        color: "#F6F0E4",
                        fontSize: "13px",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                {/* Image Picker for this director */}
                <AdminImagePicker
                  label={`Picture for ${director.name || `Director #${idx + 1}`}`}
                  value={director.image}
                  searchQuery="business director executive founder portrait"
                  onChange={(url) => handleUpdateDirector(idx, "image", url)}
                  helperText="Choose computer file, Google Image search, or paste direct web URL."
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section: Headline & Story Text */}
        <div style={{ backgroundColor: "#2A1B10", border: "1px solid rgba(168,104,58,0.35)", borderRadius: "6px", padding: "24px" }}>
          <h2 style={{ fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)", fontSize: "1.4rem", fontWeight: 700, color: "#F6F0E4", marginBottom: "16px" }}>
            Narrative &amp; Headings
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                Section Eyebrow
              </label>
              <input
                type="text"
                value={aboutData.eyebrow}
                onChange={(e) => setAboutData({ ...aboutData, eyebrow: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", backgroundColor: "#160e08", border: "1px solid rgba(168,104,58,0.4)", borderRadius: "4px", color: "#F6F0E4", fontSize: "14px", outline: "none" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                Main Headline
              </label>
              <input
                type="text"
                value={aboutData.headline}
                onChange={(e) => setAboutData({ ...aboutData, headline: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", backgroundColor: "#160e08", border: "1px solid rgba(168,104,58,0.4)", borderRadius: "4px", color: "#F6F0E4", fontSize: "14px", outline: "none" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
              Corporate Story — Paragraph 1
            </label>
            <textarea
              rows={3}
              value={aboutData.storyText1}
              onChange={(e) => setAboutData({ ...aboutData, storyText1: e.target.value })}
              style={{ width: "100%", padding: "10px 14px", backgroundColor: "#160e08", border: "1px solid rgba(168,104,58,0.4)", borderRadius: "4px", color: "#F6F0E4", fontSize: "14px", outline: "none", resize: "vertical" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
              Corporate Story — Paragraph 2
            </label>
            <textarea
              rows={3}
              value={aboutData.storyText2}
              onChange={(e) => setAboutData({ ...aboutData, storyText2: e.target.value })}
              style={{ width: "100%", padding: "10px 14px", backgroundColor: "#160e08", border: "1px solid rgba(168,104,58,0.4)", borderRadius: "4px", color: "#F6F0E4", fontSize: "14px", outline: "none", resize: "vertical" }}
            />
          </div>
        </div>

        {/* Section: Counter Statistics */}
        <div style={{ backgroundColor: "#2A1B10", border: "1px solid rgba(168,104,58,0.35)", borderRadius: "6px", padding: "24px" }}>
          <h2 style={{ fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)", fontSize: "1.4rem", fontWeight: 700, color: "#F6F0E4", marginBottom: "16px" }}>
            Editorial Counter Statistics
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
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

        <button
          type="submit"
          disabled={saving}
          style={{
            alignSelf: "flex-start",
            padding: "14px 32px",
            backgroundColor: "#A8683A",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: saving ? "not-allowed" : "pointer",
            boxShadow: "0 4px 14px rgba(168,104,58,0.4)",
          }}
        >
          {saving ? "Saving Changes..." : "Save Directors & Company Profile"}
        </button>
      </form>
    </div>
  );
}
