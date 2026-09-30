"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Save,
  Send,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Eye,
  Sparkles,
  Inbox,
} from "lucide-react";
import type { ContactPageContent } from "@/lib/cms/repository";

export default function AdminContactCmsPage() {
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [formData, setFormData] = useState<Partial<ContactPageContent>>({
    hero: {
      eyebrow: "",
      headline: "",
      subheadline: "",
    },
    registry: {
      tag: "",
      companyName: "",
      subtitle: "",
      registeredOfficeLabel: "",
      registeredOfficeValue: "",
      emailLabel: "",
      emailValue: "",
    },
  });

  useEffect(() => {
    let ignore = false;
    async function fetchContact() {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/cms/contact?locale=${locale}`);
        if (res.ok) {
          const json = await res.json();
          const content = json.draft || json.published;
          if (content && !ignore) {
            setFormData(content);
          }
        }
      } catch (err) {
        console.error("Failed to load contact CMS content", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchContact();
    return () => {
      ignore = true;
    };
  }, [locale]);

  const handleSaveDraft = async () => {
    setSaving(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/cms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "saveDraft",
          locale,
          data: formData,
        }),
      });

      if (!res.ok) throw new Error("Draft save failed");
      setStatusMessage({
        type: "success",
        text: "Contact page draft saved to PostgreSQL. Public site remains unchanged until published.",
      });
    } catch {
      setStatusMessage({
        type: "error",
        text: "Failed to persist draft. Check database connection.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!confirm(`Publish updated Contact content to live website for /${locale}/contact?`)) return;
    setSaving(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/cms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "publish",
          locale,
        }),
      });

      if (!res.ok) throw new Error("Publish failed");
      setStatusMessage({
        type: "success",
        text: `Published successfully to /${locale}/contact!`,
      });
    } catch {
      setStatusMessage({
        type: "error",
        text: "Publication failed. Check server logs.",
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
          <span>Loading Contact CMS content...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-24">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#182a3e] pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
            Contact Page CMS Editor
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Corporate headers, registry details, and communication channels
          </p>
        </div>

        {/* Locale & Inquiries Link */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#162f4d] hover:bg-[#1a385a] text-accent-400 text-xs font-mono font-semibold uppercase tracking-wider border border-[#2d5f8a] transition-colors"
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>View Submissions</span>
          </Link>

          <Link
            href={`/api/preview?path=/${locale}/contact`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#162f4d] hover:bg-[#1a385a] text-accent-400 text-xs font-mono font-semibold uppercase tracking-wider border border-[#2d5f8a] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Secure Preview</span>
          </Link>

          <div className="flex items-center bg-[#091522] border border-[#1b3450] rounded-sm p-1">
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`px-3 py-1 text-xs font-mono font-semibold rounded-xs transition-colors cursor-pointer ${
                locale === "en"
                  ? "bg-accent-500 text-neutral-950 font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLocale("ar")}
              className={`px-3 py-1 text-xs font-mono font-semibold rounded-xs transition-colors cursor-pointer ${
                locale === "ar"
                  ? "bg-accent-500 text-neutral-950 font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              العربية
            </button>
          </div>
        </div>
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

      {/* Hero Content */}
      <div className="bg-[#0c1a2a] p-6 rounded-sm border border-[#1b3450] space-y-4">
        <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-accent-400 border-b border-[#182e46] pb-3">
          1. Hero &amp; Subsurface Inquiries Intro
        </h2>
        <div>
          <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
            Hero Eyebrow
          </label>
          <input
            type="text"
            value={formData.hero?.eyebrow || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                hero: { ...formData.hero!, eyebrow: e.target.value },
              })
            }
            className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
            Headline
          </label>
          <input
            type="text"
            value={formData.hero?.headline || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                hero: { ...formData.hero!, headline: e.target.value },
              })
            }
            className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
            Subheadline / Instructions
          </label>
          <textarea
            rows={3}
            value={formData.hero?.subheadline || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                hero: { ...formData.hero!, subheadline: e.target.value },
              })
            }
            className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
          />
        </div>
      </div>

      {/* Registry Information */}
      <div className="bg-[#0c1a2a] p-6 rounded-sm border border-[#1b3450] space-y-4">
        <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-accent-400 border-b border-[#182e46] pb-3">
          2. Corporate Registry Identification
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
              Tag
            </label>
            <input
              type="text"
              value={formData.registry?.tag || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  registry: { ...formData.registry!, tag: e.target.value },
                })
              }
              className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
              Company Legal Entity
            </label>
            <input
              type="text"
              value={formData.registry?.companyName || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  registry: { ...formData.registry!, companyName: e.target.value },
                })
              }
              className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
              Registered Office Label
            </label>
            <input
              type="text"
              value={formData.registry?.registeredOfficeLabel || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  registry: {
                    ...formData.registry!,
                    registeredOfficeLabel: e.target.value,
                  },
                })
              }
              className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
              Registered Jurisdiction Value
            </label>
            <input
              type="text"
              value={formData.registry?.registeredOfficeValue || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  registry: {
                    ...formData.registry!,
                    registeredOfficeValue: e.target.value,
                  },
                })
              }
              className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
            Direct Commercial Email
          </label>
          <input
            type="email"
            value={formData.registry?.emailValue || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                registry: { ...formData.registry!, emailValue: e.target.value },
              })
            }
            className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
          />
        </div>
      </div>

      {/* Floating Action Bar: Save Draft | Preview | Publish */}
      <div className="sticky bottom-6 bg-[#0c1a2ad9] backdrop-blur-md p-4 rounded-sm border border-[#234368] shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-neutral-300">
            Target: <strong className="text-accent-400">/{locale}/contact</strong>
          </span>
          <span className="text-neutral-600">|</span>
          <span className="text-xs font-mono text-neutral-400">
            Entity: <strong className="text-white">PageSection (contact.main)</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={saving}
            onClick={handleSaveDraft}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#162f4d] hover:bg-[#1c3a5e] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-colors border border-[#2a5480] cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>

          <Link
            href={`/api/preview?path=/${locale}/contact`}
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#122236] hover:bg-[#182c44] text-neutral-200 text-xs font-mono font-semibold uppercase tracking-wider rounded-sm transition-colors border border-[#1f3a58]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Mode</span>
            <ExternalLink className="w-3 h-3 text-neutral-500" />
          </Link>

          <button
            type="button"
            disabled={saving}
            onClick={handlePublish}
            className="inline-flex items-center gap-2 px-5 py-2 bg-accent-500 hover:bg-accent-400 text-neutral-950 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-colors shadow-md cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{saving ? "Publishing..." : "Publish to Production"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
