"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Save, CheckCircle, ShieldCheck } from "lucide-react";

interface AdvantageItem {
  id: string;
  num: string;
  title: string;
  body: string;
}

const DEFAULT_ADVANTAGES: AdvantageItem[] = [
  {
    id: "adv-1",
    num: "01",
    title: "Verified Quality",
    body: "Every shipment is backed by third-party inspection certificates and documented material grades — no surprises.",
  },
  {
    id: "adv-2",
    num: "02",
    title: "Global Network",
    body: "Procurement offices and supplier relationships across Asia, Europe, and the Middle East ensure competitive pricing and supply continuity.",
  },
  {
    id: "adv-3",
    num: "03",
    title: "Large Volume Capability",
    body: "We handle bulk orders from 20MT to multi-thousand tonne contracts, matched to your production schedule.",
  },
  {
    id: "adv-4",
    num: "04",
    title: "Responsive Trading",
    body: "Dedicated account managers with deep product knowledge respond within hours — not days.",
  },
  {
    id: "adv-5",
    num: "05",
    title: "Compliance Ready",
    body: "All exports comply with origin documentation, hazardous material regulations, and destination country import requirements.",
  },
];

export default function AdminWhyUsPage() {
  const [items, setItems] = useState<AdvantageItem[]>(DEFAULT_ADVANTAGES);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const local = localStorage.getItem("hilful_cms_why_us");
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      }
    } catch {}
  }, []);

  const handleUpdate = (index: number, field: "title" | "body", value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      localStorage.setItem("hilful_cms_why_us", JSON.stringify(items));
      setStatusMessage("✓ The Hilful Advantage (Why Us) saved successfully!");
      setTimeout(() => setStatusMessage(null), 4000);
    } catch {
      setStatusMessage("⚠ Failed to save locally.");
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
            Value Proposition &amp; Trust Pillars
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
            The Hilful Advantage (Why Us)
          </h1>
          <p style={{ color: "rgba(246,240,228,0.75)", fontSize: "14px", marginTop: "6px", maxWidth: "65ch", lineHeight: 1.6 }}>
            Manage the 5 core reasons why global buyers and industrial partners choose Hilful Ventures across commodities and mining solutions.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Link
            href="/en#why"
            target="_blank"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 18px",
              borderRadius: "4px",
              backgroundColor: "rgba(168, 104, 58, 0.15)",
              border: "1px solid rgba(168, 104, 58, 0.4)",
              color: "#F6F0E4",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            <span>View on Live Web</span>
            <ArrowRight size={14} />
          </Link>

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
            <span>{saving ? "Saving..." : "Save Why Us"}</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
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

      {/* 5 Hilful Advantage Cards in Luxury Palette */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
        {items.map((adv, idx) => (
          <div
            key={adv.id}
            style={{
              backgroundColor: "#1E130C",
              border: "1px solid rgba(168, 104, 58, 0.3)",
              borderRadius: "6px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(168, 104, 58, 0.2)", paddingBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "#C9935A",
                  }}
                >
                  {adv.num}
                </span>
                <ShieldCheck size={16} color="#A8683A" />
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
                LIVE ON WEB
              </span>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9935A", marginBottom: "6px" }}>
                Advantage Title
              </label>
              <input
                type="text"
                value={adv.title}
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
                Description / Institutional Guarantee
              </label>
              <textarea
                rows={3}
                value={adv.body}
                onChange={(e) => handleUpdate(idx, "body", e.target.value)}
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
