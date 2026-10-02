"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import type { MiningSiteItem } from "@/lib/cms/cms-service";

interface MiningSitesClientProps {
  sites: MiningSiteItem[];
  locale: string;
}

export function MiningSitesClient({ sites, locale }: MiningSitesClientProps) {
  const [siteList, setSiteList] = useState<MiningSiteItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const local = localStorage.getItem("hilful_cms_mining_sites");
        if (local) {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {}
    }
    return sites;
  });
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const isArabic = locale === "ar";

  // Hydrate from localStorage / cross-tab broadcast live
  useEffect(() => {
    try {
      const local = localStorage.getItem("hilful_cms_mining_sites");
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSiteList(parsed);
        }
      }
    } catch {}

    try {
      if (typeof BroadcastChannel !== "undefined") {
        const bc = new BroadcastChannel("hilful_cms_channel");
        bc.onmessage = (event) => {
          if (event.data?.type === "MINING_SITES_UPDATED" && Array.isArray(event.data?.data)) {
            setSiteList(event.data.data);
          }
        };
        return () => bc.close();
      }
    } catch {}
  }, []);

  const filteredSites = siteList.filter((site) => {
    if (activeFilter === "ALL") return true;
    return site.type === activeFilter;
  });

  const getFilterBadgeColor = (type: MiningSiteItem["type"]) => {
    switch (type) {
      case "ACTIVE_OPERATING":
        return "#10B981"; // Emerald green
      case "ASSISTING_PARTNER":
        return "#C9935A"; // Warm Gold / Caramel
      case "FEASIBLE_EXPANSION":
        return "#60A5FA"; // Corporate Steel Blue
    }
  };

  const getFilterTypeTitle = (type: MiningSiteItem["type"]) => {
    switch (type) {
      case "ACTIVE_OPERATING":
        return isArabic ? "مواقع نشطة نعمل عليها" : "Sites We Are Working On";
      case "ASSISTING_PARTNER":
        return isArabic ? "مواقع نقوم بمساندتها فنياً" : "Sites We Are Assisting";
      case "FEASIBLE_EXPANSION":
        return isArabic ? "مواقع ودول مرخصة للعمل" : "Sites & Countries We Can Operate In";
    }
  };

  return (
    <div>
      {/* 1. INTERACTIVE FILTER BUTTONS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "48px",
        }}
      >
        {[
          { key: "ALL", label: isArabic ? `جميع المواقع والامتيازات (${sites.length})` : `All Footprints (${sites.length})` },
          {
            key: "ACTIVE_OPERATING",
            label: isArabic ? `مواقع نعمل عليها مباشرة (${sites.filter((s) => s.type === "ACTIVE_OPERATING").length})` : `Sites We Are Working On (${sites.filter((s) => s.type === "ACTIVE_OPERATING").length})`,
          },
          {
            key: "ASSISTING_PARTNER",
            label: isArabic ? `مواقع نقوم بمساندتها (${sites.filter((s) => s.type === "ASSISTING_PARTNER").length})` : `Sites We Are Assisting (${sites.filter((s) => s.type === "ASSISTING_PARTNER").length})`,
          },
          {
            key: "FEASIBLE_EXPANSION",
            label: isArabic ? `دول وممرات مرخصة (${sites.filter((s) => s.type === "FEASIBLE_EXPANSION").length})` : `Countries & Frameworks (${sites.filter((s) => s.type === "FEASIBLE_EXPANSION").length})`,
          },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveFilter(tab.key)}
            style={{
              padding: "12px 24px",
              backgroundColor: activeFilter === tab.key ? "#1E130C" : "rgba(30, 19, 12, 0.05)",
              color: activeFilter === tab.key ? "#F6F0E4" : "#1E130C",
              border: activeFilter === tab.key ? "1px solid #1E130C" : "1px solid rgba(168, 104, 58, 0.3)",
              borderRadius: "4px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 2. SITES DOSSIER GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "36px",
        }}
      >
        {filteredSites.map((site) => (
          <article
            key={site.id}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "6px",
              border: "1px solid rgba(168, 104, 58, 0.25)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 6px 24px rgba(30, 19, 12, 0.08)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            {/* Field Concession Photo & Top Badges */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "230px",
                backgroundColor: "#1E130C",
              }}
            >
              <Image
                src={site.imageUrl || "/hero-mine.jpg"}
                alt={site.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 420px"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(30, 19, 12, 0.8) 0%, rgba(30, 19, 12, 0.1) 60%)",
                }}
              />

              {/* Status / Scope Tag */}
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "14px",
                  backgroundColor: getFilterBadgeColor(site.type),
                  color: "#1E130C",
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "5px 10px",
                  borderRadius: "2px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                {getFilterTypeTitle(site.type)}
              </div>

              {/* Country & Coordinates */}
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "14px",
                  right: "14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  color: "#F6F0E4",
                }}
              >
                <div>
                  <span style={{ fontSize: "11px", color: "#C9935A", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", display: "block" }}>
                    {site.country}
                  </span>
                  <span style={{ fontSize: "12px", fontWeight: 500 }}>{site.region}</span>
                </div>
                {site.coordinates && (
                  <span
                    style={{
                      fontSize: "10px",
                      backgroundColor: "rgba(30, 19, 12, 0.75)",
                      padding: "3px 6px",
                      borderRadius: "2px",
                      fontFamily: "monospace",
                      letterSpacing: "0.05em",
                      color: "rgba(246, 240, 228, 0.8)",
                    }}
                  >
                    {site.coordinates}
                  </span>
                )}
              </div>
            </div>

            {/* Card Body */}
            <div style={{ padding: "26px", display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{ marginBottom: "14px" }}>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#A8683A",
                    marginBottom: "4px",
                  }}
                >
                  {site.statusBadge}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                    fontSize: "1.45rem",
                    fontWeight: 700,
                    color: "#1E130C",
                    lineHeight: 1.25,
                    margin: 0,
                  }}
                >
                  {site.title}
                </h3>
              </div>

              {/* Mineral Target Box */}
              <div
                style={{
                  backgroundColor: "#F6F0E4",
                  border: "1px solid rgba(168, 104, 58, 0.25)",
                  padding: "10px 14px",
                  borderRadius: "4px",
                  marginBottom: "16px",
                }}
              >
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#5A3A22", textTransform: "uppercase", display: "block" }}>
                  Mineral Scope:
                </span>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#1E130C", margin: "2px 0 0" }}>
                  {site.mineralScope}
                </p>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "13px",
                  color: "#5A3A22",
                  lineHeight: 1.6,
                  marginBottom: "18px",
                }}
              >
                {site.description}
              </p>

              {/* Technical Specifications Matrix */}
              <div
                style={{
                  backgroundColor: "#FBF7EF",
                  border: "1px solid rgba(168, 104, 58, 0.15)",
                  borderRadius: "4px",
                  padding: "12px 14px",
                  marginBottom: "18px",
                  fontSize: "12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                {site.keyMetrics?.scaleOrArea && (
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed rgba(168, 104, 58, 0.15)", paddingBottom: "4px" }}>
                    <span style={{ color: "#7A5A42" }}>Concession Scale:</span>
                    <strong style={{ color: "#1E130C", textAlign: "right" }}>{site.keyMetrics.scaleOrArea}</strong>
                  </div>
                )}
                {site.keyMetrics?.processingCapacity && (
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed rgba(168, 104, 58, 0.15)", paddingBottom: "4px" }}>
                    <span style={{ color: "#7A5A42" }}>Throughput:</span>
                    <strong style={{ color: "#1E130C", textAlign: "right" }}>{site.keyMetrics.processingCapacity}</strong>
                  </div>
                )}
                {site.keyMetrics?.logisticsRoute && (
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed rgba(168, 104, 58, 0.15)", paddingBottom: "4px" }}>
                    <span style={{ color: "#7A5A42" }}>Logistics Corridor:</span>
                    <strong style={{ color: "#1E130C", textAlign: "right", maxWidth: "60%" }}>{site.keyMetrics.logisticsRoute}</strong>
                  </div>
                )}
                {site.keyMetrics?.assayIntegrity && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#7A5A42" }}>Assay Integrity:</span>
                    <strong style={{ color: "#1E130C", textAlign: "right", maxWidth: "60%" }}>{site.keyMetrics.assayIntegrity}</strong>
                  </div>
                )}
              </div>

              {/* Operational Highlights */}
              {site.operationalHighlights && site.operationalHighlights.length > 0 && (
                <div style={{ marginBottom: "22px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#1E130C", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "8px" }}>
                    Operational Scope & Controls:
                  </span>
                  <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "12px", color: "#5A3A22", lineHeight: 1.6 }}>
                    {site.operationalHighlights.map((hl, i) => (
                      <li key={i} style={{ marginBottom: "4px" }}>
                        {hl}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ marginTop: "auto", display: "flex", gap: "10px", paddingTop: "6px" }}>
                <a
                  href={`#enquire-site-${site.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("commercial-query-section");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "11px 16px",
                    backgroundColor: "#1E130C",
                    color: "#F6F0E4",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    borderRadius: "3px",
                    textDecoration: "none",
                  }}
                >
                  Submit Commercial Query
                </a>

                <a
                  href={`https://wa.me/919655522111?text=${encodeURIComponent(`Hello Hilful Ventures, I am an investor/partner interested in inquiring about the ${site.title} (${site.country}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "11px 14px",
                    backgroundColor: "#25D366",
                    color: "#FFFFFF",
                    borderRadius: "3px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                  }}
                  title="Direct WhatsApp Dispatch"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.948 3.03.948 3.182 0 5.768-2.586 5.769-5.766.001-3.182-2.585-5.735-5.767-5.735zm0 10.457c-.908 0-1.747-.251-2.474-.698l-.177-.105-1.576.413.421-1.536-.116-.185c-.477-.759-.728-1.583-.728-2.479 0-2.617 2.13-4.747 4.747-4.747 2.618 0 4.748 2.13 4.748 4.747 0 2.618-2.13 4.588-4.748 4.588z"/>
                  </svg>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
