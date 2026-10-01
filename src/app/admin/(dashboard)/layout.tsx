import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div
      className="admin-shell"
      style={{
        minHeight: "100dvh",
        background: "#160e08",
        color: "#F6F0E4",
        display: "flex",
        fontFamily: "var(--font-body-stack, Inter, system-ui, sans-serif)",
      }}
    >
      {/* Fixed Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top bar */}
        <header style={{
          height: "60px",
          background: "rgba(30,19,12,0.95)",
          borderBottom: "1px solid rgba(168,104,58,0.15)",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#4ade80",
              flexShrink: 0,
              boxShadow: "0 0 8px rgba(74,222,128,0.5)",
            }} />
            <span style={{
              fontSize: "0.6875rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(246,240,228,0.5)",
            }}>
              CMS · Live
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link
              href="/en"
              target="_blank"
              id="admin-view-site"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.45rem 0.9rem",
                background: "rgba(168,104,58,0.12)",
                border: "1px solid rgba(168,104,58,0.25)",
                color: "rgba(246,240,228,0.7)",
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              View Site
            </Link>
            <div style={{
              padding: "0.45rem 0.9rem",
              background: "var(--caramel, #C9935A)",
              color: "var(--espresso, #1E130C)",
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}>
              Published
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main style={{ flex: 1, padding: "2rem", overflowY: "auto", background: "#160e08" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
