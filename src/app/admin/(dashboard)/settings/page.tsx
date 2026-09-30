"use client";

import { useState, useEffect } from "react";
import {
  Save,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Globe,
  Shield,
  Layers,
} from "lucide-react";
import type { CMSGlobalSettings } from "@/lib/cms/types";
import { MediaUploadInput } from "@/components/admin/media-upload-input";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [settings, setSettings] = useState<CMSGlobalSettings>({
    brand: {
      siteName: "",
      siteNameAr: "",
      tagline: "",
      taglineAr: "",
      logoText: "",
      registrationNumber: "",
    },
    header: {
      ctaText: "",
      ctaTextAr: "",
      ctaHref: "",
    },
    footer: {
      description: "",
      descriptionAr: "",
      copyrightText: "",
      copyrightTextAr: "",
    },
    seoDefaults: {
      defaultTitle: "",
      defaultTitleAr: "",
      defaultDescription: "",
      defaultDescriptionAr: "",
      ogImage: "",
    },
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/cms/settings");
        if (res.ok) {
          const json = await res.json();
          if (json.settings) {
            setSettings(json.settings);
          }
        }
      } catch (err) {
        console.error("Failed to load settings", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/cms/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to save settings");
      setStatusMessage({
        type: "success",
        text: "✓ Global Settings saved & live on website immediately!",
      });
    } catch {
      setStatusMessage({
        type: "error",
        text: "Failed to persist global settings. Check database connection.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-neutral-400 font-mono text-sm">
          <RefreshCw className="w-4 h-4 animate-spin text-accent-400" />
          <span>Loading Global Settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-24">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#182a3e] pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
            Global Settings CMS
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Brand Identity, Header/Footer Content, Corporate Metadata, and Global SEO Defaults
          </p>
        </div>

        <button
          type="button"
          disabled={saving}
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-500 hover:bg-accent-400 text-neutral-950 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all shadow-md cursor-pointer disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{saving ? "Saving..." : "Save Global Settings"}</span>
        </button>
      </div>

      {/* Notifications */}
      {statusMessage && (
        <div
          className={`p-4 rounded-sm border flex items-center gap-3 text-xs font-mono ${
            statusMessage.type === "success"
              ? "bg-green-950/40 border-green-800 text-green-300"
              : "bg-red-950/40 border-red-800 text-red-300"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle className="w-4 h-4 shrink-0 text-green-400" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Brand Identity */}
      <div className="bg-[#0c1a2a] p-6 rounded-sm border border-[#1b3450] space-y-4">
        <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-accent-400 border-b border-[#182e46] pb-3 flex items-center gap-2">
          <Globe className="w-4 h-4" />
          1. Brand Identity &amp; Corporate Identification
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
              Site Name (English)
            </label>
            <input
              type="text"
              value={settings.brand?.siteName || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  brand: { ...settings.brand, siteName: e.target.value },
                })
              }
              className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
              Site Name (Arabic)
            </label>
            <input
              type="text"
              value={settings.brand?.siteNameAr || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  brand: { ...settings.brand, siteNameAr: e.target.value },
                })
              }
              className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
              Tagline (English)
            </label>
            <input
              type="text"
              value={settings.brand?.tagline || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  brand: { ...settings.brand, tagline: e.target.value },
                })
              }
              className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
              Tagline (Arabic)
            </label>
            <input
              type="text"
              value={settings.brand?.taglineAr || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  brand: { ...settings.brand, taglineAr: e.target.value },
                })
              }
              className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
            />
          </div>
        </div>
      </div>

      {/* Header CTA */}
      <div className="bg-[#0c1a2a] p-6 rounded-sm border border-[#1b3450] space-y-4">
        <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-accent-400 border-b border-[#182e46] pb-3 flex items-center gap-2">
          <Layers className="w-4 h-4" />
          2. Header Navigation CTA
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
              CTA Text (English)
            </label>
            <input
              type="text"
              value={settings.header?.ctaText || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  header: { ...settings.header, ctaText: e.target.value },
                })
              }
              className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
              CTA Text (Arabic)
            </label>
            <input
              type="text"
              value={settings.header?.ctaTextAr || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  header: { ...settings.header, ctaTextAr: e.target.value },
                })
              }
              className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
              Destination URL
            </label>
            <input
              type="text"
              value={settings.header?.ctaHref || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  header: { ...settings.header, ctaHref: e.target.value },
                })
              }
              className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
            />
          </div>
        </div>
      </div>

      {/* Footer Settings */}
      <div className="bg-[#0c1a2a] p-6 rounded-sm border border-[#1b3450] space-y-4">
        <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-accent-400 border-b border-[#182e46] pb-3">
          3. Corporate Footer Content
        </h2>

        <div>
          <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
            Institutional Description (English)
          </label>
          <textarea
            rows={2}
            value={settings.footer?.description || ""}
            onChange={(e) =>
              setSettings({
                ...settings,
                footer: { ...settings.footer, description: e.target.value },
              })
            }
            className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
            Institutional Description (Arabic)
          </label>
          <textarea
            rows={2}
            value={settings.footer?.descriptionAr || ""}
            onChange={(e) =>
              setSettings({
                ...settings,
                footer: { ...settings.footer, descriptionAr: e.target.value },
              })
            }
            className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
          />
        </div>
      </div>

      {/* SEO Defaults */}
      <div className="bg-[#0c1a2a] p-6 rounded-sm border border-[#1b3450] space-y-4">
        <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-accent-400 border-b border-[#182e46] pb-3 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          4. Global SEO &amp; Open Graph Defaults
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
              Default Title (English)
            </label>
            <input
              type="text"
              value={settings.seoDefaults?.defaultTitle || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seoDefaults: {
                    ...settings.seoDefaults,
                    defaultTitle: e.target.value,
                  },
                })
              }
              className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
              Default Title (Arabic)
            </label>
            <input
              type="text"
              value={settings.seoDefaults?.defaultTitleAr || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seoDefaults: {
                    ...settings.seoDefaults,
                    defaultTitleAr: e.target.value,
                  },
                })
              }
              className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
            />
          </div>
        </div>

        <div>
          <MediaUploadInput
            label="Default Open Graph / Social Share Image"
            value={settings.seoDefaults?.ogImage || ""}
            onChange={(url) =>
              setSettings({
                ...settings,
                seoDefaults: {
                  ...settings.seoDefaults,
                  ogImage: url,
                },
              })
            }
            category="Branding"
            description="Upload an image from your device/gallery or pick from library for social sharing previews."
          />
        </div>
      </div>
    </div>
  );
}
