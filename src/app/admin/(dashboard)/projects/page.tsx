"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Save,
  Send,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Eye,
} from "lucide-react";
import type { CMSProjectItem } from "@/lib/cms/types";
import { MediaUploadInput } from "@/components/admin/media-upload-input";

export default function AdminProjectsPage() {
  const [items, setItems] = useState<CMSProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/cms/projects");
      if (res.ok) {
        const json = await res.json();
        setItems(json.items || []);
      }
    } catch (err) {
      console.error("Failed to load project items", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch("/api/admin/cms/projects");
        if (res.ok) {
          const json = await res.json();
          if (!ignore) {
            setItems(json.items || []);
          }
        }
      } catch (err) {
        console.error("Failed to load project items", err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  const handleSaveItem = async (item: CMSProjectItem, targetStatus?: "DRAFT" | "PUBLISHED") => {
    setSaving(true);
    setStatusMessage(null);
    try {
      const itemToSave = targetStatus ? { ...item, status: targetStatus } : item;

      const res = await fetch("/api/admin/cms/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemToSave),
      });

      if (!res.ok) throw new Error("Failed to save showcase item");

      setItems((prev) => prev.map((i) => (i.id === item.id ? itemToSave : i)));

      setStatusMessage({
        type: "success",
        text:
          itemToSave.status === "PUBLISHED"
            ? `✓ Showcase item "${item.title}" published to live website!`
            : `✓ Draft saved for "${item.title}". Public website remains unchanged until published.`,
      });
    } catch {
      setStatusMessage({
        type: "error",
        text: "Failed to persist showcase item.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to remove this Capability in Context showcase item?")) return;
    setSaving(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/cms/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.status === 404) {
        setItems((prev) => prev.filter((i) => i.id !== id));
        setStatusMessage({
          type: "success",
          text: "Showcase item was already removed or does not exist.",
        });
        await fetchProjects();
        return;
      }

      if (!res.ok) throw new Error("Failed to delete item");

      setItems((prev) => prev.filter((i) => i.id !== id));
      setStatusMessage({
        type: "success",
        text: "Showcase item removed successfully.",
      });
      await fetchProjects();
    } catch {
      setStatusMessage({
        type: "error",
        text: "Failed to remove showcase item.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAddItem = () => {
    const newItem: CMSProjectItem = {
      id: `proj-${Date.now()}`,
      title: "New Capability in Context",
      category: "Frontier Extraction Program",
      description: "Integrated deployment across mining exploration and equipment logistics.",
      imageUrl: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=1200",
      altText: "Mining capability execution",
      capabilityName: "Core Mining Discipline",
      capabilityLink: "/services",
      status: "DRAFT",
      sortOrder: items.length,
    };
    setItems([newItem, ...items]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-neutral-400 font-mono text-sm">
          <RefreshCw className="w-4 h-4 animate-spin text-accent-400" />
          <span>Loading Capability in Context items...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-24">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#182a3e] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-400 bg-accent-950/60 border border-accent-800/40 px-2 py-0.5 rounded-xs">
              CMS Entity / Project
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans mt-2">
            Capability in Context (Projects)
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Real-world operational illustrations demonstrating Hilful&apos;s four core capability disciplines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/api/preview?path=/en/projects"
            target="_blank"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-[#122236] hover:bg-[#182c44] text-neutral-300 hover:text-white text-xs font-mono font-semibold uppercase tracking-wider transition-colors border border-[#1f3a58]"
          >
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span>Preview Showcase</span>
            <ExternalLink className="w-3 h-3 text-neutral-500" />
          </Link>

          <button
            type="button"
            onClick={handleAddItem}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-accent-500 hover:bg-accent-400 text-neutral-950 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Showcase Item</span>
          </button>
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
          <span className="flex-1">{statusMessage.text}</span>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-neutral-400 hover:text-white"
          >
            &times;
          </button>
        </div>
      )}

      {/* Project Cards List */}
      <div className="space-y-6">
        {items.length === 0 && (
          <div className="p-12 text-center border border-dashed border-[#1a2e44] rounded-sm">
            <p className="text-xs font-mono text-neutral-400">
              No showcase items configured in database. Click &ldquo;Add Showcase Item&rdquo; above.
            </p>
          </div>
        )}

        {items.map((item, idx) => (
          <div
            key={item.id}
            className="p-5 rounded-sm bg-[#0c1a2a] border border-[#1b3450] space-y-4 hover:border-[#2a4e75] transition-colors"
          >
            <div className="flex items-center justify-between border-b border-[#14263b] pb-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-accent-400 font-bold">
                  #{String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  ID: <span className="text-neutral-200">{item.id}</span>
                </span>
                <span
                  className={`text-[9px] font-mono px-2 py-0.5 rounded-xs uppercase tracking-wider font-bold ${
                    item.status === "PUBLISHED"
                      ? "bg-green-950/80 text-green-300 border border-green-700/60"
                      : "bg-amber-950/80 text-amber-300 border border-amber-700/60"
                  }`}
                >
                  {item.status || "DRAFT"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-red-950/30 rounded-xs transition-colors cursor-pointer"
                  title="Remove Showcase Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[idx] = { ...item, title: e.target.value };
                      setItems(updated);
                    }}
                    className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3 py-1.5 text-sm text-white focus:outline-none focus:border-accent-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={item.category}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[idx] = { ...item, category: e.target.value };
                      setItems(updated);
                    }}
                    className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3 py-1.5 text-sm text-white focus:outline-none focus:border-accent-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1">
                    Discipline Link
                  </label>
                  <input
                    type="text"
                    value={item.capabilityLink || ""}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[idx] = { ...item, capabilityLink: e.target.value };
                      setItems(updated);
                    }}
                    className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3 py-1.5 text-xs text-neutral-300 focus:outline-none focus:border-accent-500"
                    placeholder="/services/exploration-prospecting"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1">
                    Discipline Name
                  </label>
                  <input
                    type="text"
                    value={item.capabilityName || ""}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[idx] = { ...item, capabilityName: e.target.value };
                      setItems(updated);
                    }}
                    className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3 py-1.5 text-xs text-neutral-300 focus:outline-none focus:border-accent-500"
                    placeholder="Mineral Exploration & Prospecting"
                  />
                </div>
              </div>

              {/* Media Upload & Library Picker */}
              <MediaUploadInput
                label="Showcase Photography"
                value={item.imageUrl}
                onChange={(url) => {
                  const updated = [...items];
                  updated[idx] = { ...item, imageUrl: url };
                  setItems(updated);
                }}
                altText={item.altText}
                onAltTextChange={(alt) => {
                  const updated = [...items];
                  updated[idx] = { ...item, altText: alt };
                  setItems(updated);
                }}
                category="Projects"
                description="Upload industrial showcase photo from device/gallery or pick from library."
              />

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={item.description}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[idx] = { ...item, description: e.target.value };
                    setItems(updated);
                  }}
                  className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3 py-1.5 text-xs text-neutral-300 focus:outline-none focus:border-accent-500"
                />
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleSaveItem(item, "DRAFT")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#162f4d] hover:bg-[#1c3a5e] text-white text-xs font-mono font-semibold uppercase tracking-wider transition-colors border border-[#2a5480] cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5 text-accent-400" />
                  <span>Save Draft</span>
                </button>

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleSaveItem(item, "PUBLISHED")}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-sm bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5 fill-neutral-950" />
                  <span>Publish to Website</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
