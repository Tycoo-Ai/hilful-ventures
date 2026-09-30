import Link from "next/link";
import { getCMSDashboardKPIs } from "@/lib/cms/repository";

// Shared card style
const card = {
  background: "rgba(59,35,20,0.35)",
  border: "1px solid rgba(168,104,58,0.15)",
  padding: "1.5rem",
} as const;

const label = {
  fontSize: "0.5625rem",
  fontWeight: 500,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(246,240,228,0.4)",
};

const bigNum = {
  fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', serif)",
  fontSize: "3rem",
  fontWeight: 300,
  color: "var(--ivory, #F6F0E4)",
  lineHeight: 1,
};

const actionLink = (accent = false) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.5rem",
  padding: "0.65rem 1.1rem",
  background: accent ? "var(--caramel, #C9935A)" : "rgba(168,104,58,0.1)",
  border: `1px solid ${accent ? "transparent" : "rgba(168,104,58,0.2)"}`,
  color: accent ? "var(--espresso, #1E130C)" : "rgba(246,240,228,0.75)",
  fontSize: "0.6875rem",
  fontWeight: accent ? 600 : 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  textDecoration: "none",
  transition: "all 0.2s ease",
  cursor: "pointer",
  width: "100%",
});

const Arrow = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" style={{ color: "#4ade80" }}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default async function AdminDashboardPage() {
  const kpiData = await getCMSDashboardKPIs();

  const quickLinks = [
    { label: "Homepage", sub: "Edit hero, sections, copy", href: "/admin/home", accent: true },
    { label: "Departments", sub: "4 product departments", href: "/admin/departments", accent: false },
    { label: "Gallery", sub: "Upload & manage images", href: "/admin/gallery", accent: false },
    { label: "Enquiries", sub: `${kpiData.inquiriesCount} received`, href: "/admin/inquiries", accent: false },
  ];

  const statusRows = [
    "Homepage (All Sections)",
    "About Us",
    "Departments (4)",
    "Gallery & Media",
    "Enquiries Inbox",
    "SEO & Metadata",
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <h1 style={{
            fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', serif)",
            fontSize: "2.5rem",
            fontWeight: 300,
            color: "var(--ivory, #F6F0E4)",
            margin: "0 0 0.25rem",
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}>
            Dashboard
          </h1>
          <p style={{ ...label, color: "rgba(246,240,228,0.35)" }}>
            Last sync: {new Date(kpiData.lastSync).toLocaleString()} · {kpiData.engine}
          </p>
        </div>
        <Link href="/en" target="_blank" style={actionLink(true)}>
          View Live Site <Arrow />
        </Link>
      </div>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "rgba(168,104,58,0.1)" }}>
        {[
          { label: "Published Sections", value: kpiData.publishedSections, accent: "rgba(74,222,128,0.8)", sub: `${kpiData.draftCount} drafts` },
          { label: "Media Assets", value: kpiData.mediaCount, accent: "var(--caramel, #C9935A)", sub: `${kpiData.galleryCount} gallery items` },
          { label: "Departments", value: 4, accent: "var(--copper, #A8683A)", sub: "Product lines" },
          { label: "Enquiries", value: kpiData.inquiriesCount, accent: "#c084fc", sub: "Total received" },
        ].map((kpi) => (
          <div key={kpi.label} style={{ ...card, borderRadius: 0, border: "none" }}>
            <p style={label}>{kpi.label}</p>
            <div style={{ ...bigNum, color: kpi.accent, marginTop: "0.5rem" }}>{kpi.value}</div>
            <p style={{ ...label, marginTop: "0.25rem" }}>{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick access + status */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>

        {/* Quick access */}
        <div style={card}>
          <p style={{ ...label, marginBottom: "1.25rem" }}>Quick Access</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {quickLinks.map((ql) => (
              <Link key={ql.href} href={ql.href} style={actionLink(ql.accent)} id={`dash-link-${ql.label.toLowerCase().replace(/\s/g, "-")}`}>
                <span>
                  <span style={{ display: "block", lineHeight: 1 }}>{ql.label}</span>
                  <span style={{ fontSize: "0.625rem", opacity: 0.6, marginTop: "0.15rem", display: "block" }}>{ql.sub}</span>
                </span>
                <Arrow />
              </Link>
            ))}
          </div>
        </div>

        {/* System status */}
        <div style={card}>
          <p style={{ ...label, marginBottom: "1.25rem" }}>System Status</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {statusRows.map((row, i) => (
              <div key={row} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.6rem 0",
                borderBottom: i < statusRows.length - 1 ? "1px solid rgba(168,104,58,0.08)" : "none",
              }}>
                <span style={{ fontSize: "0.8125rem", color: "rgba(246,240,228,0.7)" }}>{row}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.6875rem", color: "#4ade80" }}>
                  <CheckIcon /> Live
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent enquiries */}
      <div style={card}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <p style={label}>Recent Enquiries</p>
          <Link href="/admin/inquiries" style={{ ...label, color: "var(--caramel, #C9935A)", textDecoration: "none" }}>
            View all →
          </Link>
        </div>
        {kpiData.recentInquiries.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem", color: "rgba(246,240,228,0.25)", fontSize: "0.875rem" }}>
            No enquiries yet. They will appear here once submitted.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {kpiData.recentInquiries.map((inq: { id: string; name: string; company: string | null; enquiryType: string; createdAt: Date | string; status: string }, i: number) => (
              <div key={inq.id} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem 0",
                borderBottom: i < kpiData.recentInquiries.length - 1 ? "1px solid rgba(168,104,58,0.08)" : "none",
              }}>
                <div>
                  <div style={{ fontSize: "0.875rem", color: "var(--ivory, #F6F0E4)", fontWeight: 500 }}>{inq.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(246,240,228,0.4)", marginTop: "0.1rem" }}>{inq.company || "Private"}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{
                    display: "inline-block",
                    padding: "0.2rem 0.5rem",
                    background: "rgba(168,104,58,0.15)",
                    color: "var(--caramel, #C9935A)",
                    fontSize: "0.625rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}>{inq.enquiryType}</span>
                  <div style={{ ...label, marginTop: "0.2rem" }}>{new Date(inq.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
