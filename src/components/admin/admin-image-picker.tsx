"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  ExternalLink,
  Search,
  Check,
  X,
  Loader2,
  Sparkles,
} from "lucide-react";

interface AdminImagePickerProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  searchQuery?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "3/2" | "auto";
  recommendedPresets?: Array<{ label: string; url: string }>;
  helperText?: string;
}

const DEFAULT_PRESETS = [
  { label: "Mining Chemicals", url: "/chemicals.jpg" },
  { label: "Ferrous & Metal Scrap", url: "/metals.jpg" },
  { label: "Iron Ore / Mud Chemicals", url: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80" },
  { label: "Quartz & Fly Ash", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80" },
  { label: "Industrial Complex", url: "/hero-mine.jpg" },
  { label: "Corporate Portrait", url: "/about-portrait.jpg" },
];

export function AdminImagePicker({
  value,
  onChange,
  label = "Picture / Image Asset",
  searchQuery = "industrial commodities export",
  aspectRatio = "16/9",
  recommendedPresets = DEFAULT_PRESETS,
  helperText,
}: AdminImagePickerProps) {
  const [activeTab, setActiveTab] = useState<"url" | "upload" | "presets">("url");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Aspect ratio styling
  const aspectClass =
    aspectRatio === "1/1"
      ? "aspect-square"
      : aspectRatio === "4/3"
      ? "aspect-[4/3]"
      : aspectRatio === "3/2"
      ? "aspect-[3/2]"
      : "aspect-video";

  // Handle local file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    setImgError(false);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", searchQuery.split(" ")[0] || "General");

      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onChange(data.url);
        setUploadError(null);
      } else {
        const errorMsg = data?.error || "Upload failed. Please try again.";
        setUploadError(errorMsg);
        alert(`Image Upload Error: ${errorMsg}`);
      }
    } catch (err: any) {
      const errorMsg = err?.message || "Network error while uploading image.";
      setUploadError(errorMsg);
      alert(`Image Upload Error: ${errorMsg}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Paste from clipboard helper
  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && (text.startsWith("http://") || text.startsWith("https://") || text.startsWith("/"))) {
        onChange(text.trim());
        setImgError(false);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Browser permissions restriction, user can paste directly into input
    }
  };

  // Google Images search url
  const googleSearchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
    searchQuery + " high resolution commercial"
  )}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {/* Header Label & Google Helper */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
        <label
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "#C9935A",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <ImageIcon size={14} />
          {label}
        </label>

        <a
          href={googleSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "11px",
            color: "#C9935A",
            textDecoration: "none",
            backgroundColor: "rgba(201, 147, 90, 0.12)",
            padding: "4px 10px",
            borderRadius: "4px",
            border: "1px solid rgba(201, 147, 90, 0.3)",
            transition: "all 0.2s ease",
          }}
          title="Search Google Images in new tab, right click an image and choose 'Copy image address'"
        >
          <Search size={12} />
          <span>Find on Google Images</span>
          <ExternalLink size={10} />
        </a>
      </div>

      {/* Main Image Control Card */}
      <div
        style={{
          backgroundColor: "#160e08",
          border: "1px solid rgba(168, 104, 58, 0.35)",
          borderRadius: "6px",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {/* Live Preview & Status Bar */}
        <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Thumbnail Box */}
          <div
            style={{
              position: "relative",
              width: "160px",
              height: "100px",
              backgroundColor: "#0d0805",
              borderRadius: "4px",
              overflow: "hidden",
              border: "1px solid rgba(168, 104, 58, 0.4)",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {value && !imgError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value}
                alt="Selected Picture"
                onError={() => setImgError(true)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(246, 240, 228, 0.4)",
                  fontSize: "11px",
                  padding: "8px",
                  textAlign: "center",
                  gap: "4px",
                }}
              >
                <ImageIcon size={20} style={{ opacity: 0.6 }} />
                <span>{imgError ? "Preview unavailable" : "No image"}</span>
              </div>
            )}

            {/* Clear Button */}
            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setImgError(false);
                }}
                title="Remove image"
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                  color: "#F6F0E4",
                  border: "none",
                  borderRadius: "50%",
                  width: "22px",
                  height: "22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Quick Actions & Tab Selector */}
          <div style={{ flex: 1, minWidth: "220px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid rgba(168,104,58,0.2)", paddingBottom: "8px" }}>
              <button
                type="button"
                onClick={() => setActiveTab("url")}
                style={{
                  padding: "6px 12px",
                  backgroundColor: activeTab === "url" ? "#A8683A" : "transparent",
                  color: activeTab === "url" ? "#FFFFFF" : "rgba(246,240,228,0.75)",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <LinkIcon size={12} />
                Google / Web URL
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("upload")}
                style={{
                  padding: "6px 12px",
                  backgroundColor: activeTab === "upload" ? "#A8683A" : "transparent",
                  color: activeTab === "upload" ? "#FFFFFF" : "rgba(246,240,228,0.75)",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Upload size={12} />
                Upload / Change Picture
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("presets")}
                style={{
                  padding: "6px 12px",
                  backgroundColor: activeTab === "presets" ? "#A8683A" : "transparent",
                  color: activeTab === "presets" ? "#FFFFFF" : "rgba(246,240,228,0.75)",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Sparkles size={12} />
                Presets
              </button>
            </div>

            {/* TAB 1: Google Images / Web URL input */}
            {activeTab === "url" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.value);
                      setImgError(false);
                    }}
                    placeholder="https://... (Paste Google Images URL, Unsplash, or CDN link)"
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      backgroundColor: "#0d0805",
                      border: "1px solid rgba(168, 104, 58, 0.4)",
                      color: "#F6F0E4",
                      borderRadius: "4px",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  />
                  <button
                    type="button"
                    onClick={handlePasteClipboard}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "rgba(246,240,228,0.1)",
                      border: "1px solid rgba(168,104,58,0.4)",
                      color: "#F6F0E4",
                      borderRadius: "4px",
                      fontSize: "12px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                    title="Paste from clipboard"
                  >
                    {copied ? <Check size={14} color="#25D366" /> : <LinkIcon size={14} />}
                    <span>{copied ? "Pasted!" : "Paste"}</span>
                  </button>
                </div>
                <span style={{ fontSize: "11px", color: "rgba(246,240,228,0.55)" }}>
                  Paste any direct Google Images URL, Unsplash URL, or local path (e.g. <code>/chemicals.jpg</code>).
                </span>
              </div>
            )}

            {/* TAB 2: Upload / Change from Computer */}
            {activeTab === "upload" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
                  style={{ display: "none" }}
                />

                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 18px",
                      backgroundColor: "#A8683A",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "4px",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: uploading ? "not-allowed" : "pointer",
                      opacity: uploading ? 0.7 : 1,
                    }}
                  >
                    {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                    <span>{uploading ? "Uploading Picture..." : "Choose Picture from Computer"}</span>
                  </button>

                  <span style={{ fontSize: "11px", color: "rgba(246,240,228,0.6)" }}>
                    JPG, PNG, WebP up to 25MB
                  </span>
                </div>

                {uploadError && (
                  <div style={{ fontSize: "11px", color: "#EF4444" }}>
                    {uploadError}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Curated Hilful Presets */}
            {activeTab === "presets" && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {recommendedPresets.map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => {
                      onChange(preset.url);
                      setImgError(false);
                    }}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: value === preset.url ? "rgba(168,104,58,0.4)" : "rgba(246,240,228,0.06)",
                      border: value === preset.url ? "1px solid #C9935A" : "1px solid rgba(168,104,58,0.25)",
                      color: value === preset.url ? "#C9935A" : "rgba(246,240,228,0.85)",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: 500,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span>{preset.label}</span>
                    {value === preset.url && <Check size={10} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {helperText && (
          <div style={{ fontSize: "11px", color: "rgba(246,240,228,0.5)", borderTop: "1px solid rgba(168,104,58,0.15)", paddingTop: "8px" }}>
            {helperText}
          </div>
        )}
      </div>
    </div>
  );
}
