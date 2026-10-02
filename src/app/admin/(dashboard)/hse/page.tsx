"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Save, CheckCircle, ShieldCheck } from "lucide-react";

interface TrustPillar {
  num: string;
  tag: string;
  title: string;
  body: string;
}

const DEFAULT_TRUST_PILLARS: TrustPillar[] = [
  {
    num: "01",
    tag: "CONCESSION ASSET BACKING",
    title: "Direct Geological Asset Security",
    body: "Secured physical concessions and verified exploratory deposits in high-yield belts (Assosa & Eastern corridors) with JORC-aligned reserves.",
  },
  {
    num: "02",
    tag: "CROSS-BORDER JURISDICTION",
    title: "Dual-Continent Corporate Governance",
    body: "Structured operations across India and Ethiopia providing full sovereign statutory compliance, mineral export permits, and zero counterparty ambiguity.",
  },
  {
    num: "03",
    tag: "ASSAY INTEGRITY",
    title: "100% Laboratory Assay Verification",
    body: "Every ore shipment, chemical lot, and alloy batch is pre-inspected by certified independent bureaus (SGS, ALS, Bureau Veritas) with traceable COAs.",
  },
  {
    num: "04",
    tag: "CAPITAL DISCIPLINE",
    title: "De-risked Off-Take & Liquidity Protection",
    body: "Incoterms-governed contracts with insured CIF/FOB terms, backed by established institutional banking facilities protecting partner liquidity.",
  },
];

export default function AdminProcessPage() {
  const [pillars, setPillars] = useState<TrustPillar[]>(DEFAULT_TRUST_PILLARS);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const local = localStorage.getItem("hilful_cms_process");
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPillars(parsed);
        }
      }
    } catch {}
  }, []);

  const handleUpdate = (index: number, field: keyof TrustPillar, value: string) => {
    const updated = [...pillars];
    updated[index] = { ...updated[index], [field]: value };
    setPillars(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      localStorage.setItem("hilful_cms_process", JSON.stringify(pillars));
      setStatusMessage("✓ Institutional Assurance & Investor Governance pillars saved!");
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
            Investor Trust Architecture
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
            Institutional Assurance &amp; Governance (Process)
          </h1>
          <p style={{ color: "rgba(246,240,228,0.75)", fontSize: "14px", marginTop: "6px", maxWidth: "65ch", lineHeight: 1.6 }}>
            Manage the four core pillars that demonstrate to institutional capital partners and investors why Hilful Ventures is a trustworthy cross-border partner.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Link
            href="/en#process"
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
            <span>{saving ? "Saving..." : "Save Governance"}</span>
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

      {/* 4 Trust Pillars in Luxury Palette */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
        {pillars.map((pil, idx) => (
          <div
            key={pil.num}
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
                  {pil.num}
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
                INVESTOR READY
              </span>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9935A", marginBottom: "6px" }}>
                Pillar Category Badge
              </label>
              <input
                type="text"
                value={pil.tag}
                onChange={(e) => handleUpdate(idx, "tag", e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "4px",
                  backgroundColor: "#2A1B10",
                  border: "1px solid rgba(168, 104, 58, 0.35)",
                  color: "#F6F0E4",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9935A", marginBottom: "6px" }}>
                Pillar Headline
              </label>
              <input
                type="text"
                value={pil.title}
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
                Detailed Operational Protocol
              </label>
              <textarea
                rows={3}
                value={pil.body}
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
