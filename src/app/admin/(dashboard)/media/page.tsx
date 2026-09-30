"use client";

import { useState, useEffect, useCallback } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import {
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  X,
  Upload,
  Search,
  Edit2,
  Info,
  Shield,
  Layers,
  Cloud,
  CloudOff,
  Copy,
  Check,
} from "lucide-react";
import type { CMSMediaAsset } from "@/lib/cms/types";

interface ExtendedMediaAsset extends CMSMediaAsset {
  usages?: string[];
  inUse?: boolean;
}

const categories = [
  "All",
  "Hero",
  "About",
  "Services",
  "Equipment",
  "Showcase",
  "Gallery",
  "HSE",
  "Resources",
];

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<ExtendedMediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingAsset, setEditingAsset] = useState<ExtendedMediaAsset | null>(null);
  const [replacingAsset, setReplacingAsset] = useState<ExtendedMediaAsset | null>(null);
  const [viewingUsageAsset, setViewingUsageAsset] = useState<ExtendedMediaAsset | null>(null);
  const [saving, setSaving] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [cloudinaryConfig, setCloudinaryConfig] = useState<{
    isConfigured: boolean;
    cloudName: string;
  }>({ isConfigured: false, cloudName: "" });

  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "warning";
    text: string;
  } | null>(null);

  const [newAsset, setNewAsset] = useState<{
    filename: string;
    url: string;
    altText: string;
    category: string;
    caption: string;
    width: number;
    height: number;
    format: string;
    provider: "CLOUDINARY" | "LOCAL" | "UNSPLASH";
  }>({
    filename: "",
    url: "",
    altText: "",
    category: "Hero",
    caption: "",
    width: 1920,
    height: 1080,
    format: "jpg",
    provider: "CLOUDINARY",
  });

  const loadAssets = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/cms/media");
      if (res.ok) {
        const json = await res.json();
        setAssets(json.assets || []);
        if (json.cloudinary) {
          setCloudinaryConfig(json.cloudinary);
        }
      }
    } catch (err) {
      console.error("Failed to load media assets", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch("/api/admin/cms/media");
        if (res.ok) {
          const json = await res.json();
          if (!ignore) {
            setAssets(json.assets || []);
            if (json.cloudinary) {
              setCloudinaryConfig(json.cloudinary);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load media assets", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);
    try {
      const assetToSave = {
        id: editingAsset ? editingAsset.id : `med-${Date.now()}`,
        filename: editingAsset ? editingAsset.filename : newAsset.filename,
        url: editingAsset ? editingAsset.url : newAsset.url,
        altText: editingAsset ? editingAsset.altText : newAsset.altText,
        category: editingAsset ? editingAsset.category : newAsset.category,
        caption: editingAsset ? editingAsset.caption : newAsset.caption,
        width: editingAsset ? editingAsset.width : newAsset.width,
        height: editingAsset ? editingAsset.height : newAsset.height,
        format: editingAsset ? editingAsset.format : newAsset.format,
        provider: editingAsset ? editingAsset.provider : newAsset.provider,
        publicId: editingAsset ? editingAsset.publicId : null,
      };

      const res = await fetch("/api/admin/cms/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assetToSave),
      });

      if (res.ok) {
        setStatusMessage({
          type: "success",
          text: `Asset "${assetToSave.filename}" saved into Media Library!`,
        });
        setIsAdding(false);
        setEditingAsset(null);
        setNewAsset({
          filename: "",
          url: "",
          altText: "",
          category: "Hero",
          caption: "",
          width: 1920,
          height: 1080,
          format: "jpg",
          provider: "CLOUDINARY",
        });
        await loadAssets();
      } else {
        const errJson = await res.json();
        setStatusMessage({
          type: "error",
          text: errJson.error || "Failed to save media asset.",
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Network error saving media asset.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, filename: string) => {
    if (!confirm(`Delete "${filename}" from the Media Library?`)) return;

    try {
      const res = await fetch("/api/admin/cms/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const json = await res.json();

      if (res.ok) {
        setStatusMessage({
          type: "success",
          text: `Asset "${filename}" deleted successfully.`,
        });
        await loadAssets();
      } else if (res.status === 409 || json.inUse) {
        setStatusMessage({
          type: "warning",
          text: `Cannot delete "${filename}": This media is currently in use across ${json.usages?.length || 1} section(s).`,
        });
      } else {
        setStatusMessage({
          type: "error",
          text: json.error || "Failed to delete media asset.",
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Network error communicating with media server.",
      });
    }
  };

  const handleUploadFile = async (file: File, replaceTargetId?: string) => {
    setSaving(true);
    setStatusMessage(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", replacingAsset?.category || newAsset.category || "General");
    formData.append("altText", replacingAsset?.altText || newAsset.altText || file.name);
    formData.append("caption", replacingAsset?.caption || newAsset.caption || file.name);
    if (replaceTargetId) {
      formData.append("replaceId", replaceTargetId);
    }

    try {
      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            "Cloudinary storage is not configured. Add the required production storage credentials to enable image uploads."
        );
      }

      setStatusMessage({
        type: "success",
        text: replaceTargetId
          ? `Asset replaced successfully with new Cloudinary upload!`
          : `File "${file.name}" uploaded to Cloudinary successfully!`,
      });
      setIsAdding(false);
      setReplacingAsset(null);
      await loadAssets();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setStatusMessage({
        type: "error",
        text: msg,
      });
    } finally {
      setSaving(false);
    }
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesCat =
      selectedCategory === "All" ||
      asset.category?.toLowerCase() === selectedCategory.toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      asset.filename.toLowerCase().includes(q) ||
      asset.altText.toLowerCase().includes(q) ||
      (asset.publicId && asset.publicId.toLowerCase().includes(q)) ||
      (asset.caption && asset.caption.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1b3450] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-400 bg-accent-950/60 border border-accent-800/40 px-2 py-0.5 rounded-xs">
              CMS Entity / MediaAsset
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 border border-[#1b3450] px-2 py-0.5 rounded-xs">
              {assets.length} Total Assets
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans mt-2">
            Centralized Media Library
          </h1>
          <p className="text-xs text-neutral-400 font-sans mt-1">
            Production media architecture: Cloudinary CDN &middot; PostgreSQL metadata registry &middot; Centralized CMS visual asset wiring.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-accent-500 to-accent-600 hover:brightness-105 text-neutral-950 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload / Register Asset</span>
        </button>
      </div>

      {/* Cloudinary Architecture & Credentials Status Banner */}
      <div className="p-4 sm:p-5 rounded-sm bg-[#0a1726] border border-[#1d3d61] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2">
            {cloudinaryConfig.isConfigured ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400">
                <Cloud className="w-4 h-4" />
                <span>CLOUDINARY STORAGE: CONNECTED</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400">
                <CloudOff className="w-4 h-4" />
                <span>CLOUDINARY STORAGE: NOT CONFIGURED IN CURRENT ENVIRONMENT</span>
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-300 font-sans leading-relaxed">
            {cloudinaryConfig.isConfigured ? (
              <span>
                Binary storage is wired to Cloudinary cloud (<code>{cloudinaryConfig.cloudName}</code>). Metadata and live usages are tracked in PostgreSQL.
              </span>
            ) : (
              <span>
                Direct binary uploads to Cloudinary require production environment credentials (<code>CLOUDINARY_CLOUD_NAME</code>, <code>CLOUDINARY_API_KEY</code>, <code>CLOUDINARY_API_SECRET</code>). The system is running in <strong>Metadata &amp; Media Reference Registry Mode</strong>, with all representative imagery managed through PostgreSQL.
              </span>
            )}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <span className="text-[11px] font-mono px-3 py-1.5 rounded-xs border uppercase font-bold bg-[#07111c] text-neutral-300 border-[#234b73]">
            Tier: Cloudinary &rarr; PostgreSQL &rarr; CMS &rarr; Website
          </span>
        </div>
      </div>

      {/* Status Alert Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-sm border flex items-center gap-3 text-xs font-mono ${
            statusMessage.type === "success"
              ? "bg-emerald-950/50 border-emerald-700/60 text-emerald-300"
              : statusMessage.type === "warning"
              ? "bg-amber-950/50 border-amber-700/60 text-amber-300"
              : "bg-rose-950/50 border-rose-700/60 text-rose-300"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
          ) : statusMessage.type === "warning" ? (
            <Info className="w-4 h-4 shrink-0 text-amber-400" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
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

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#0c1a2a] p-4 rounded-sm border border-[#1b3450]">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xs text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? "bg-accent-500 text-neutral-950 font-bold"
                  : "text-neutral-400 hover:text-white hover:bg-[#122438]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-72 relative">
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by filename, alt text, public ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm pl-8 pr-3 py-2 text-xs text-white placeholder-neutral-500 font-sans focus:outline-none focus:border-accent-500"
          />
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex items-center justify-center h-56 text-neutral-400 font-mono text-xs gap-3">
          <RefreshCw className="w-4 h-4 animate-spin text-accent-400" />
          <span>Loading media repository...</span>
        </div>
      ) : filteredAssets.length === 0 ? (
        <div className="p-12 text-center bg-[#0c1a2a] border border-[#1b3450] rounded-sm text-neutral-400 font-sans text-xs">
          No media assets found matching the selected filter.
        </div>
      ) : (
        /* Media Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-[#0c1a2a] rounded-sm border border-[#1b3450] overflow-hidden flex flex-col justify-between group hover:border-[#2d5f8a] transition-all shadow-sm"
            >
              <div>
                {/* Media Preview Box */}
                <div className="relative aspect-video w-full bg-[#070e17] overflow-hidden">
                  <SafeImage
                    src={asset.url}
                    alt={asset.altText}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-xs bg-[#091522cc] backdrop-blur-xs text-accent-300 border border-[#203c5d] uppercase font-bold">
                      {asset.category}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-xs uppercase font-bold ${
                        asset.provider === "CLOUDINARY"
                          ? "bg-emerald-950/80 text-emerald-300 border border-emerald-700/60"
                          : "bg-blue-950/80 text-blue-300 border border-blue-700/60"
                      }`}
                    >
                      {asset.provider || "CLOUDINARY"}
                    </span>
                  </div>

                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => handleCopyUrl(asset.url, asset.id)}
                      className="p-1.5 rounded-xs bg-[#07111c]/80 text-neutral-300 hover:text-white border border-[#234b73] transition-colors"
                      title="Copy URL"
                    >
                      {copiedId === asset.id ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Metadata Details */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4
                      className="text-xs font-mono font-bold text-white truncate flex-1"
                      title={asset.filename}
                    >
                      {asset.filename}
                    </h4>
                  </div>

                  {asset.publicId && (
                    <div className="text-[10px] font-mono text-neutral-400 truncate" title={asset.publicId}>
                      <span className="text-neutral-500">ID:</span> {asset.publicId}
                    </div>
                  )}

                  <p
                    className="text-[11px] text-neutral-300 line-clamp-2 leading-relaxed"
                    title={asset.altText}
                  >
                    {asset.altText}
                  </p>

                  <div className="text-[10px] font-mono text-neutral-500 flex items-center justify-between pt-1 border-t border-[#142940]">
                    <span>
                      {asset.width} &times; {asset.height}
                    </span>
                    <span className="uppercase font-semibold text-neutral-400">
                      {asset.format}
                    </span>
                  </div>

                  {/* Usage Badge */}
                  <div className="pt-1.5">
                    {asset.inUse && asset.usages && asset.usages.length > 0 ? (
                      <button
                        onClick={() => setViewingUsageAsset(asset)}
                        className="w-full text-start text-[10px] font-mono py-1 px-2 rounded-xs bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 hover:bg-emerald-950/60 transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span>&bull; In Use ({asset.usages.length} reference{asset.usages.length > 1 ? "s" : ""})</span>
                        <Info className="w-3 h-3 text-emerald-400" />
                      </button>
                    ) : (
                      <span className="text-[10px] font-mono py-1 px-2 rounded-xs bg-neutral-900/60 text-neutral-400 border border-neutral-800 block">
                        Unreferenced / Available
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="p-3 bg-[#091522] border-t border-[#152a40] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <a
                    href={asset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-neutral-400 hover:text-white rounded-xs transition-colors"
                    title="Open full resolution in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setEditingAsset(asset)}
                    className="p-1.5 text-neutral-400 hover:text-accent-400 rounded-xs transition-colors cursor-pointer"
                    title="Edit Metadata (Alt, Title, Caption)"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setReplacingAsset(asset)}
                    className="p-1.5 text-neutral-400 hover:text-accent-400 rounded-xs transition-colors cursor-pointer"
                    title="Replace Image File"
                  >
                    <Upload className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => handleDelete(asset.id, asset.filename)}
                  disabled={asset.inUse}
                  className={`p-1.5 rounded-xs transition-colors cursor-pointer ${
                    asset.inUse
                      ? "text-neutral-600 cursor-not-allowed opacity-50"
                      : "text-rose-400 hover:text-rose-300 hover:bg-rose-950/40"
                  }`}
                  title={asset.inUse ? "Asset is in use and protected from deletion" : "Delete Asset"}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Usage References Modal */}
      {viewingUsageAsset && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c1a2a] border border-[#234368] rounded-sm w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[#182e46] flex items-center justify-between bg-[#0a1522]">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-accent-400" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  Live Usage References: {viewingUsageAsset.filename}
                </h3>
              </div>
              <button
                onClick={() => setViewingUsageAsset(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-neutral-300 font-sans">
                This media asset is currently referenced across the following active CMS pages and records:
              </p>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {viewingUsageAsset.usages?.map((usage, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#08121d] border border-[#1e3857] rounded-sm text-xs font-mono text-emerald-300 flex items-center gap-2.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{usage}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-sm bg-amber-950/30 border border-amber-800/40 text-[11px] font-sans text-amber-300 leading-relaxed">
                <Shield className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
                <strong>Deletion Protection Active:</strong> Referencing records must be reassigned before this media asset can be removed from the system.
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setViewingUsageAsset(null)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono uppercase tracking-wider rounded-sm cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Metadata Modal */}
      {editingAsset && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c1a2a] border border-[#234368] rounded-sm w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[#182e46] flex items-center justify-between bg-[#0a1522]">
              <div className="flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-accent-400" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  Edit Metadata: {editingAsset.filename}
                </h3>
              </div>
              <button
                onClick={() => setEditingAsset(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAsset} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
                  Filename / Identifier
                </label>
                <input
                  type="text"
                  required
                  value={editingAsset.filename}
                  onChange={(e) =>
                    setEditingAsset({ ...editingAsset, filename: e.target.value })
                  }
                  className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-accent-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={editingAsset.category}
                  onChange={(e) =>
                    setEditingAsset({ ...editingAsset, category: e.target.value })
                  }
                  className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-accent-500"
                >
                  {categories.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
                  Representative Alt Text / Accessibility
                </label>
                <input
                  type="text"
                  required
                  value={editingAsset.altText}
                  onChange={(e) =>
                    setEditingAsset({ ...editingAsset, altText: e.target.value })
                  }
                  className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-xs text-white font-sans focus:outline-none focus:border-accent-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
                  Representative Caption / Narrative
                </label>
                <input
                  type="text"
                  value={editingAsset.caption || ""}
                  onChange={(e) =>
                    setEditingAsset({ ...editingAsset, caption: e.target.value })
                  }
                  className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-2 text-xs text-white font-sans focus:outline-none focus:border-accent-500"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#182e46]">
                <button
                  type="button"
                  onClick={() => setEditingAsset(null)}
                  className="px-4 py-2 text-neutral-400 hover:text-white text-xs font-mono uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-accent-500 hover:bg-accent-400 text-neutral-950 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                >
                  {saving ? "Saving..." : "Save Metadata"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Replace Image Modal */}
      {replacingAsset && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c1a2a] border border-[#234368] rounded-sm w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[#182e46] flex items-center justify-between bg-[#0a1522]">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-accent-400" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  Replace Image: {replacingAsset.filename}
                </h3>
              </div>
              <button
                onClick={() => setReplacingAsset(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-3 bg-[#08121d] border border-[#1e3857] rounded-sm text-xs font-sans text-neutral-300">
                Replaces the visual file for <strong>{replacingAsset.filename}</strong> while preserving existing references in CMS sections.
              </div>

              <div>
                <input
                  type="file"
                  id="replace-file-picker"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUploadFile(file, replacingAsset.id);
                  }}
                  className="hidden"
                />
                <div
                  onClick={() => document.getElementById("replace-file-picker")?.click()}
                  className="border-2 border-dashed border-[#244870] hover:border-accent-400 bg-[#07111c] hover:bg-[#0a1829] p-8 rounded-sm text-center cursor-pointer transition-colors"
                >
                  <Upload className="w-8 h-8 text-accent-400 mx-auto mb-2" />
                  <p className="text-xs font-mono text-white font-bold">
                    Click to choose replacement image from your device
                  </p>
                  <p className="text-[11px] text-neutral-400 font-mono mt-1">
                    Uploads directly {cloudinaryConfig.isConfigured ? "to Cloudinary" : "to local storage"} (folder: hilful/{replacingAsset.category.toLowerCase()})
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#182e46] flex justify-end">
                <button
                  type="button"
                  onClick={() => setReplacingAsset(null)}
                  className="px-4 py-2 text-neutral-400 hover:text-white text-xs font-mono uppercase tracking-wider"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Register New Asset Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c1a2a] border border-[#234368] rounded-sm w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[#182e46] flex items-center justify-between bg-[#0a1522]">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-accent-400" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  Register Media Asset
                </h3>
              </div>
              <button
                onClick={() => setIsAdding(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Direct Binary Upload (Local & Cloudinary) */}
              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">
                  Direct Binary Upload from Device
                </label>
                <div>
                  <input
                    type="file"
                    id="new-file-picker"
                    accept="image/*,video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUploadFile(file);
                    }}
                    className="hidden"
                  />
                  <div
                    onClick={() => document.getElementById("new-file-picker")?.click()}
                    className="border-2 border-dashed border-[#244870] hover:border-accent-400 bg-[#07111c] hover:bg-[#0a1829] p-6 rounded-sm text-center cursor-pointer transition-colors"
                  >
                    <Upload className="w-7 h-7 text-accent-400 mx-auto mb-2" />
                    <p className="text-xs font-mono text-white font-bold">
                      Click to select image or video from device
                    </p>
                    <p className="text-[11px] text-neutral-400 font-mono mt-1">
                      Uploads directly {cloudinaryConfig.isConfigured ? "to Cloudinary" : "to local storage"} (JPG, PNG, WebP, MP4)
                    </p>
                  </div>
                </div>
              </div>

              {/* Or Register Verified URL */}
              <form onSubmit={handleSaveAsset} className="space-y-4 pt-4 border-t border-[#182e46]">
                <div>
                  <span className="text-[11px] font-mono text-accent-400 uppercase tracking-wider block mb-2 font-bold">
                    Or Register Verified Image Reference
                  </span>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                    Image Secure URL:
                  </label>
                  <input
                    type="text"
                    required
                    value={newAsset.url}
                    onChange={(e) => setNewAsset({ ...newAsset, url: e.target.value })}
                    className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-accent-500"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                    Identifier / Filename:
                  </label>
                  <input
                    type="text"
                    required
                    value={newAsset.filename}
                    onChange={(e) => setNewAsset({ ...newAsset, filename: e.target.value })}
                    className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-accent-500"
                    placeholder="e.g. hero-open-pit-operation.jpg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                      Category:
                    </label>
                    <select
                      value={newAsset.category}
                      onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value })}
                      className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-accent-500"
                    >
                      {categories.filter((c) => c !== "All").map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                      Provider:
                    </label>
                    <select
                      value={newAsset.provider}
                      onChange={(e) =>
                        setNewAsset({
                          ...newAsset,
                          provider: e.target.value as "CLOUDINARY" | "LOCAL" | "UNSPLASH",
                        })
                      }
                      className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-accent-500"
                    >
                      <option value="CLOUDINARY">Cloudinary</option>
                      <option value="UNSPLASH">Unsplash (Approved)</option>
                      <option value="LOCAL">Local Project</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                    Representative Alt Text:
                  </label>
                  <input
                    type="text"
                    required
                    value={newAsset.altText}
                    onChange={(e) => setNewAsset({ ...newAsset, altText: e.target.value })}
                    className="w-full bg-[#08121d] border border-[#1e3857] rounded-sm px-3.5 py-1.5 text-xs text-white font-sans focus:outline-none focus:border-accent-500"
                    placeholder="Representative industrial operational environment"
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#182e46]">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-4 py-2 text-neutral-400 hover:text-white text-xs font-mono uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving || !newAsset.url}
                    className="px-5 py-2 bg-accent-500 hover:bg-accent-400 text-neutral-950 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {saving ? "Registering..." : "Register Metadata"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
