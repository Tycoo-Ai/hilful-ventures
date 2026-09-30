"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Authentication failed");
      }
    } catch {
      setError("Unable to connect to authentication service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100dvh",
      background: "var(--espresso, #1E130C)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1.5rem",
      fontFamily: "var(--font-body, Inter, system-ui, sans-serif)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle background texture */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(90,58,34,0.3) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(168,104,58,0.15) 0%, transparent 50%)",
        pointerEvents: "none",
      }} />

      {/* Login card */}
      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "420px",
        background: "rgba(59,35,20,0.6)",
        border: "1px solid rgba(168,104,58,0.2)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        padding: "3rem 2.5rem",
      }}>
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          {/* Logo mark */}
          <div style={{
            width: "52px",
            height: "52px",
            background: "var(--copper, #A8683A)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
          }}>
            <span style={{
              fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', serif)",
              fontSize: "1.4rem",
              fontWeight: 500,
              color: "var(--ivory, #F6F0E4)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}>HV</span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', serif)",
            fontSize: "2rem",
            fontWeight: 400,
            color: "var(--ivory, #F6F0E4)",
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
            margin: "0 0 0.4rem",
          }}>
            Hilful Ventures
          </h1>
          <p style={{
            fontSize: "0.625rem",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--copper, #A8683A)",
            margin: 0,
          }}>
            Content Management System
          </p>
        </div>

        {/* Divider */}
        <div style={{
          height: "1px",
          background: "rgba(168,104,58,0.2)",
          marginBottom: "2rem",
        }} />

        {/* Error */}
        {error && (
          <div style={{
            marginBottom: "1.25rem",
            padding: "0.75rem 1rem",
            background: "rgba(220,38,38,0.1)",
            border: "1px solid rgba(220,38,38,0.3)",
            color: "#fca5a5",
            fontSize: "0.8rem",
            lineHeight: 1.5,
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{
              display: "block",
              fontSize: "0.625rem",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(246,240,228,0.5)",
              marginBottom: "0.5rem",
            }}>
              Administrator Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                style={{
                  width: "100%",
                  padding: "0.8rem 2.5rem 0.8rem 1rem",
                  background: "rgba(30,19,12,0.6)",
                  border: "1px solid rgba(168,104,58,0.25)",
                  color: "var(--ivory, #F6F0E4)",
                  fontSize: "0.9rem",
                  outline: "none",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => e.target.style.borderColor = "var(--caramel, #C9935A)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(168,104,58,0.25)"}
              />
              <svg
                style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", opacity: 0.4 }}
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
          </div>

          <button
            id="admin-login-submit"
            type="submit"
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.875rem 1.5rem",
              background: loading ? "rgba(201,147,90,0.5)" : "var(--caramel, #C9935A)",
              border: "none",
              color: "var(--espresso, #1E130C)",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              cursor: loading ? "wait" : "pointer",
              fontFamily: "inherit",
              transition: "background 0.2s ease, transform 0.1s ease",
            }}
            onMouseEnter={(e) => !loading && ((e.target as HTMLButtonElement).style.background = "var(--copper, #A8683A)")}
            onMouseLeave={(e) => !loading && ((e.target as HTMLButtonElement).style.background = "var(--caramel, #C9935A)")}
          >
            {loading ? "Signing in…" : "Sign In"}
            {!loading && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            )}
          </button>
        </form>

        {/* Footer */}
        <div style={{
          marginTop: "2rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid rgba(168,104,58,0.12)",
          textAlign: "center",
        }}>
          <p style={{
            fontSize: "0.625rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(246,240,228,0.25)",
          }}>
            Hilful Ventures Pvt Ltd · Authorized Access Only
          </p>
        </div>
      </div>
    </div>
  );
}
