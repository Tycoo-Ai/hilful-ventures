"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import {
  Truck,
  Plus,
  Edit2,
  Trash2,
  Save,
  Send,
  X,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Eye,
  ExternalLink,
} from "lucide-react";
import type { CMSEquipmentItem } from "@/lib/cms/types";
import { MediaUploadInput } from "@/components/admin/media-upload-input";

export default function AdminEquipmentPage() {
  const [items, setItems] = useState<CMSEquipmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<CMSEquipmentItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const loadEquipment = async () => {
    try {
      const res = await fetch("/api/admin/cms/equipment");
      if (res.ok) {
        const json = await res.json();
        setItems(json.items || []);
      }
    } catch (err) {
      console.error("Failed to load equipment catalog", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function fetchInitial() {
      try {
        const res = await fetch("/api/admin/cms/equipment");
        if (res.ok) {
          const json = await res.json();
          if (!ignore) {
            setItems(json.items || []);
          }
        }
      } catch (err) {
        console.error("Failed to load equipment catalog", err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    fetchInitial();
    return () => {
      ignore = true;
    };
  }, []);

  const handleEdit = (item: CMSEquipmentItem) => {
    setEditingItem({ ...item });
    setIsNew(false);
  };

  const handleCreateNew = () => {
    setEditingItem({
      id: `eq-${Date.now()}`,
      name: "",
      category: "Heavy Earthmoving",
      description: "",
      imageUrl:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
      altText: "Industrial equipment unit",
      status: "DRAFT",
      sortOrder: items.length,
    });
    setIsNew(true);
  };

  const handleSaveWithStatus = async (targetStatus: "DRAFT" | "PUBLISHED") => {
    if (!editingItem) return;

    setSaving(true);
    setStatusMessage(null);
    try {
      const payload = {
        ...editingItem,
        status: targetStatus,
      };

      const res = await fetch("/api/admin/cms/equipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatusMessage({
          type: "success",
          text:
            targetStatus === "PUBLISHED"
              ? `✓ Equipment item "${editingItem.name}" published to live website!`
              : `✓ Draft saved for "${editingItem.name}". Public website remains unchanged until published.`,
        });
        setEditingItem(null);
        await loadEquipment();
      } else {
        setStatusMessage({
          type: "error",
          text: "Failed to save equipment item to database.",
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Network error occurred while saving equipment item.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from the active fleet catalog?`)) {
      return;
    }

    try {
      const res = await fetch("/api/admin/cms/equipment", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.status === 404) {
        setStatusMessage({
          type: "success",
          text: `Equipment item was already removed or does not exist.`,
        });
        await loadEquipment();
        return;
      }

      if (res.ok) {
        setStatusMessage({
          type: "success",
          text: `Equipment item "${name}" deleted from CMS catalog.`,
        });
        await loadEquipment();
      } else {
        setStatusMessage({
          type: "error",
          text: "Failed to delete equipment item.",
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Failed to delete equipment item.",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1b3450] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-400 bg-accent-950/60 border border-accent-800/40 px-2 py-0.5 rounded-xs">
              CMS Entity / Equipment
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans mt-2">
            Equipment Fleet Catalog
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Supported machinery categories with genuine operational descriptions and photography.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <Link
            href="/api/preview?path=/en/equipment"
            target="_blank"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#122236] hover:bg-[#182c44] text-neutral-300 hover:text-white text-xs font-mono font-semibold uppercase tracking-wider rounded-sm transition-colors border border-[#1f3a58]"
          >
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span>Preview Fleet</span>
            <ExternalLink className="w-3 h-3 text-neutral-500" />
          </Link>

          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500 hover:bg-accent-400 text-neutral-950 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Equipment Category</span>
          </button>
        </div>
      </div>

      {/* Status Alert Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-sm border flex items-center gap-3 text-xs font-mono ${
            statusMessage.type === "success"
              ? "bg-green-950/40 border-green-700/60 text-green-300"
              : "bg-red-950/40 border-red-700/60 text-red-300"
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

      {/* Loading state */}
      {loading ? (
        <div className="flex items-center justify-center h-48 text-neutral-400 font-mono text-xs gap-3">
          <RefreshCw className="w-4 h-4 animate-spin text-accent-400" />
          <span>Loading equipment fleet records...</span>
        </div>
      ) : (
        /* Equipment Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#0c1a2a] rounded-sm border border-[#1b3450] overflow-hidden flex flex-col justify-between group hover:border-[#2d5f8a] transition-colors"
            >
              <div>
                <div className="relative aspect-video w-full bg-[#070e17] overflow-hidden">
                  <SafeImage
                    src={item.imageUrl}
                    alt={item.altText || item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-xs uppercase tracking-wider font-bold ${
                        item.status === "PUBLISHED"
                          ? "bg-green-950/80 text-green-300 border border-green-700/60"
                          : "bg-amber-950/80 text-amber-300 border border-amber-700/60"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent-400">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white font-sans">{item.name}</h3>
                  <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#091522] border-t border-[#152a40] flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-500">
                  ID: {item.id}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-1.5 text-neutral-400 hover:text-white hover:bg-[#122336] rounded-xs transition-colors cursor-pointer"
                    title="Edit Item"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-red-950/30 rounded-xs transition-colors cursor-pointer"
                    title="Delete Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-[#050b14]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0c1a2a] border border-[#1b3450] rounded-sm max-w-xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#182e46] pb-4">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-accent-400" />
                <h3 className="text-lg font-bold text-white font-sans">
                  {isNew ? "Add Equipment Category" : "Edit Equipment Record"}
                </h3>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
                    Category Type
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        category: e.target.value,
                      })
                    }
                    className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white font-sans focus:outline-none focus:border-accent-500"
                    placeholder="e.g. Heavy Earthmoving"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
                    Publication Status
                  </label>
                  <select
                    value={editingItem.status}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        status: e.target.value as "DRAFT" | "PUBLISHED",
                      })
                    }
                    className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-accent-500"
                  >
                    <option value="DRAFT">DRAFT (Admin Preview Only)</option>
                    <option value="PUBLISHED">PUBLISHED (Public Fleet)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
                  Equipment Category Name
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, name: e.target.value })
                  }
                  className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-sm text-white font-sans focus:outline-none focus:border-accent-500"
                  placeholder="e.g. Excavators"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
                  Operational Application Description
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm p-3 text-sm text-neutral-200 font-sans leading-relaxed focus:outline-none focus:border-accent-500"
                  placeholder="Heavy earthmoving and overburden removal equipment supporting large-scale surface mining..."
                />
              </div>

              {/* Media Upload & Library Picker */}
              <MediaUploadInput
                label="Equipment Fleet Imagery"
                value={editingItem.imageUrl}
                onChange={(url) =>
                  setEditingItem({ ...editingItem, imageUrl: url })
                }
                altText={editingItem.altText}
                onAltTextChange={(alt) =>
                  setEditingItem({ ...editingItem, altText: alt })
                }
                category="Equipment"
                description="Upload equipment machinery photo from your device/gallery or pick from library."
              />

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#182e46]">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 bg-transparent text-neutral-400 hover:text-white text-xs font-mono uppercase tracking-wider"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSaveWithStatus("DRAFT")}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#162f4d] hover:bg-[#1c3a5e] text-white text-xs font-mono font-semibold uppercase tracking-wider rounded-sm transition-colors border border-[#2a5480] cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5 text-accent-400" />
                    <span>{saving ? "Saving..." : "Save Draft"}</span>
                  </button>

                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSaveWithStatus("PUBLISHED")}
                    className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5 fill-neutral-950" />
                    <span>{saving ? "Publishing..." : "Publish to Fleet"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
