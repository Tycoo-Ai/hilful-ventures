"use client";

import { useState, useEffect } from "react";
import { OFFICES } from "@/data/hilful-data";

export function FloatingContact({ settings }: { settings?: any }) {
  const [showCallPopover, setShowCallPopover] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mounted, setMounted] = useState(false);

  const indiaOffice = OFFICES.find((o) => o.key === "india") || OFFICES[0];
  const ethiopiaOffice = OFFICES.find((o) => o.key === "ethiopia") || OFFICES[1];

  const whatsappNumber = "919994033191";
  const whatsappMsg = encodeURIComponent(
    "Hello Hilful Ventures, I would like to enquire about your products."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!mounted) return null;

  return (
    <>
      <aside
        aria-label="Quick contact and support options"
        style={{
          position: "fixed",
          right: "20px",
          bottom: "24px",
          zIndex: 90,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {/* Back to top button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            title="Back to top"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "#F6F0E4",
              color: "#1E130C",
              border: "1px solid rgba(168,104,58,0.4)",
              boxShadow: "0 4px 14px rgba(30,19,12,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.2s ease, background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.background = "#EADFC9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "#F6F0E4";
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        )}

        {/* 1. WhatsApp Button */}
        <div style={{ position: "relative" }}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Hilful Ventures on WhatsApp"
            id="floating-whatsapp"
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "#25D366",
              color: "#FFFFFF",
              boxShadow: "0 6px 18px rgba(37,211,102,0.38)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              position: "relative",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {/* Pulse Ring */}
            <span
              style={{
                position: "absolute",
                inset: "-4px",
                borderRadius: "50%",
                border: "2px solid #25D366",
                opacity: 0.6,
                animation: "whatsapp-pulse 3s infinite ease-out",
                pointerEvents: "none",
              }}
            />
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>

        {/* 2. Call Button with Popover */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowCallPopover(!showCallPopover)}
            aria-label="Direct Phone Lines"
            id="floating-call"
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "#A8683A",
              color: "#FFFFFF",
              border: "none",
              boxShadow: "0 6px 18px rgba(168,104,58,0.38)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.2s ease, background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.background = "#C9935A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = "#A8683A";
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </button>

          {/* Popover */}
          {showCallPopover && (
            <div
              style={{
                position: "absolute",
                right: "64px",
                bottom: "0px",
                width: "280px",
                background: "#1E130C",
                border: "1px solid #A8683A",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
                color: "#F6F0E4",
                zIndex: 100,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid rgba(168,104,58,0.3)",
                  paddingBottom: "8px",
                  marginBottom: "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "0.6875rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#C9935A",
                    fontWeight: 600,
                  }}
                >
                  Direct Phone Lines
                </span>
                <button
                  onClick={() => setShowCallPopover(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#F6F0E4",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                  aria-label="Close popover"
                >
                  &times;
                </button>
              </div>

              {/* India Line */}
              <div style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#F6F0E4",
                    marginBottom: "4px",
                  }}
                >
                  🇮🇳 India (Chennai Trade Desk)
                </div>
                <a
                  href={`tel:${indiaOffice.phone1.replace(/\s+/g, "")}`}
                  style={{
                    display: "block",
                    fontSize: "0.8125rem",
                    color: "#C9935A",
                    textDecoration: "none",
                    fontWeight: 500,
                    marginBottom: "2px",
                  }}
                >
                  {indiaOffice.phone1}
                </a>
                {indiaOffice.phone2 && (
                  <a
                    href={`tel:${indiaOffice.phone2.replace(/\s+/g, "")}`}
                    style={{
                      display: "block",
                      fontSize: "0.8125rem",
                      color: "#EADFC9",
                      textDecoration: "none",
                    }}
                  >
                    {indiaOffice.phone2}
                  </a>
                )}
              </div>

              {/* Ethiopia Line */}
              <div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#F6F0E4",
                    marginBottom: "4px",
                  }}
                >
                  🇪🇹 Ethiopia (Assosa Office)
                </div>
                <a
                  href={`tel:${ethiopiaOffice.phone1.replace(/\s+/g, "")}`}
                  style={{
                    display: "block",
                    fontSize: "0.8125rem",
                    color: "#C9935A",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  {ethiopiaOffice.phone1}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 3. Email Button */}
        <div style={{ position: "relative" }}>
          <a
            href="mailto:hilfulventures@gmail.com?subject=Product%20Enquiry%20-%20Hilful%20Ventures"
            aria-label="Email Hilful Ventures"
            id="floating-email"
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "#1E130C",
              color: "#F6F0E4",
              border: "1px solid rgba(168,104,58,0.5)",
              boxShadow: "0 6px 18px rgba(30,19,12,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              transition: "transform 0.2s ease, background 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.background = "#3B2314";
              e.currentTarget.style.borderColor = "#C9935A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = "#1E130C";
              e.currentTarget.style.borderColor = "rgba(168,104,58,0.5)";
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        </div>
      </aside>

      <style jsx global>{`
        @keyframes whatsapp-pulse {
          0% {
            transform: scale(0.95);
            opacity: 0.8;
          }
          70% {
            transform: scale(1.35);
            opacity: 0;
          }
          100% {
            transform: scale(1.35);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
