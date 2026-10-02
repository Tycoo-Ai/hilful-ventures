"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

// Inline SVG icons — matches lucide style, 14×14
const Icons = {
  dashboard: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  home: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  departments: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>,
  gallery: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  about: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  whyus: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><polyline points="20 6 9 17 4 12"/></svg>,
  process: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>,
  enquiries: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  media: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>,
  nav: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  theme: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  seo: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  settings: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  logout: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
};

const navGroups: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: Icons.dashboard },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Homepage", href: "/admin/home", icon: Icons.home },
      { label: "Departments", href: "/admin/departments", icon: Icons.departments },
      { label: "Products", href: "/admin/products", icon: Icons.departments },
      { label: "Gallery", href: "/admin/gallery", icon: Icons.gallery },
      { label: "About Us", href: "/admin/about", icon: Icons.about },
      { label: "Why Us (Advantage)", href: "/admin/capabilities", icon: Icons.whyus },
      { label: "Investor Trust (Process)", href: "/admin/hse", icon: Icons.process },
    ],
  },
  {
    title: "Commercial",
    items: [
      { label: "Commercial Queries", href: "/admin/inquiries", icon: Icons.enquiries },
    ],
  },
  {
    title: "Site & Governance",
    items: [
      { label: "Media Library", href: "/admin/media", icon: Icons.media },
      { label: "SEO & Metadata", href: "/admin/seo", icon: Icons.seo },
      { label: "Settings & Theme", href: "/admin/settings", icon: Icons.settings },
    ],
  },
];

// CSS-in-JS style helpers
const sidebarStyles = {
  aside: {
    width: "220px",
    background: "#1a0f08",
    borderRight: "1px solid rgba(168,104,58,0.12)",
    display: "flex",
    flexDirection: "column" as const,
    flexShrink: 0,
    minHeight: "100dvh",
  },
  brand: {
    padding: "1.25rem 1.25rem 1rem",
    borderBottom: "1px solid rgba(168,104,58,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    textDecoration: "none",
  },
  logoMark: {
    width: "32px",
    height: "32px",
    background: "var(--copper, #A8683A)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  groupTitle: {
    fontSize: "0.5625rem",
    fontWeight: 600,
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "rgba(168,104,58,0.5)",
    padding: "0 0.875rem",
    marginBottom: "0.25rem",
  },
};

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside style={sidebarStyles.aside}>
      {/* Brand */}
      <div style={sidebarStyles.brand}>
        <div style={sidebarStyles.logoMark}>
          <span style={{
            fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', serif)",
            fontSize: "1rem",
            fontWeight: 500,
            color: "var(--ivory, #F6F0E4)",
            lineHeight: 1,
          }}>HV</span>
        </div>
        <div>
          <div style={{
            fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', serif)",
            fontSize: "1.1rem",
            fontWeight: 500,
            color: "var(--ivory, #F6F0E4)",
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}>
            Hilful<span style={{ color: "var(--caramel, #C9935A)" }}> CMS</span>
          </div>
          <div style={{
            fontSize: "0.5625rem",
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(246,240,228,0.3)",
            marginTop: "0.1rem",
          }}>
            Control Panel
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "1rem 0.75rem" }} role="navigation" aria-label="Admin navigation">
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {navGroups.map((group) => (
            <div key={group.title}>
              <p style={sidebarStyles.groupTitle}>{group.title}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1px" }} role="list">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || (pathname.startsWith(item.href + "/") && item.href !== "/admin/settings");
                  return (
                    <li key={item.label + item.href}>
                      <Link
                        href={item.href}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.625rem",
                          padding: "0.5rem 0.625rem",
                          borderRadius: "2px",
                          fontSize: "0.8125rem",
                          fontWeight: isActive ? 500 : 400,
                          color: isActive ? "var(--caramel, #C9935A)" : "rgba(246,240,228,0.45)",
                          background: isActive ? "rgba(168,104,58,0.1)" : "transparent",
                          borderLeft: isActive ? "2px solid var(--caramel, #C9935A)" : "2px solid transparent",
                          textDecoration: "none",
                          transition: "all 0.15s ease",
                          letterSpacing: "0.01em",
                        }}
                      >
                        <span style={{ flexShrink: 0, opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* User / Logout */}
      <div style={{
        padding: "1rem 0.75rem",
        borderTop: "1px solid rgba(168,104,58,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}>
        {/* Avatar row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
          padding: "0.5rem",
          background: "rgba(168,104,58,0.06)",
          border: "1px solid rgba(168,104,58,0.1)",
        }}>
          <div style={{
            width: "28px",
            height: "28px",
            background: "var(--copper, #A8683A)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--ivory, #F6F0E4)" }}>A</span>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 500, color: "rgba(246,240,228,0.85)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              Administrator
            </div>
            <div style={{ fontSize: "0.625rem", color: "rgba(246,240,228,0.3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              admin
            </div>
          </div>
        </div>

        <button
          id="admin-logout"
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.4rem",
            padding: "0.5rem",
            background: "transparent",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "rgba(239,68,68,0.6)",
            fontSize: "0.6875rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.15s ease",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.08)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgb(239,68,68)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(239,68,68,0.6)";
          }}
        >
          {Icons.logout}
          Sign Out
        </button>
      </div>
    </aside>
  );
}
