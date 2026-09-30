"use client";

import { useState, useRef } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import {
  Upload,
  Image as ImageIcon,
  FolderOpen,
  X,
  Check,
  Film,
  Loader2,
} from "lucide-react";
import type { CMSMediaAsset } from "@/lib/cms/types";

interface MediaUploadInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  altText?: string;
  onAltTextChange?: (alt: string) => void;
  category?: string;
  description?: string;
  acceptVideo?: boolean;
}

export function MediaUploadInput({
  label,
  value,
  onChange,
  altText,
  onAltTextChange,
  category = "General",
  description,
  acceptVideo = false,
}: MediaUploadInputProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [libraryAssets, setLibraryAssets] = useState<CMSMediaAsset[]>([]);
  const [loadingLibrary, setLoadingLibrary] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showManualUrl, setShowManualUrl] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isVideo =
    value?.toLowerCase().endsWith(".mp4") ||
    value?.toLowerCase().endsWith(".webm") ||
    value?.toLowerCase().endsWith(".mov");

  // Load existing assets for library picker
  const openLibraryModal = async () => {
    setIsLibraryOpen(true);
    setLoadingLibrary(true);
    try {
      const res = await fetch("/api/admin/cms/media");
      if (res.ok) {
        const json = await res.json();
        setLibraryAssets(json.assets || []);
      }
    } catch (err) {
      console.error("Failed to load library assets:", err);
    } finally {
      setLoadingLibrary(false);
    }
  };

  // Handle direct file upload from computer/device gallery
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    if (altText) formData.append("altText", altText);

    try {
      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.url);
      if (onAltTextChange && !altText) {
        onAltTextChange(data.asset?.altText || file.name);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload file";
      setUploadError(msg);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const filteredAssets = libraryAssets.filter(
    (a) =>
      a.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.altText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-3 font-sans">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#C9935A]">
          {label}
        </label>
        <div className="flex items-center gap-2">
          <a
            href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(category + " industrial supply")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#C9935A] hover:text-[#E8BD8C] bg-[rgba(201,147,90,0.1)] px-2 py-1 rounded border border-[rgba(201,147,90,0.3)] transition-colors flex items-center gap-1"
            title="Search Google Images in new tab"
          >
            <span>Google Images</span>
            <span className="text-[9px]">↗</span>
          </a>
          <button
            type="button"
            onClick={() => setShowManualUrl(!showManualUrl)}
            className="text-[11px] text-neutral-400 hover:text-[#C9935A] transition-colors"
          >
            {showManualUrl ? "Hide URL" : "Paste URL"}
          </button>
        </div>
      </div>

      {description && (
        <p className="text-xs text-[rgba(246,240,228,0.65)] font-sans leading-relaxed">
          {description}
        </p>
      )}

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptVideo ? "image/*,video/*" : "image/*"}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Visual Upload & Preview Container */}
      <div className="p-4 rounded-sm bg-[#160e08] border border-[rgba(168,104,58,0.35)] space-y-4">
        {/* Current Media Preview */}
        {value ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#0d0805] p-3 rounded-xs border border-[rgba(168,104,58,0.3)]">
            <div className="relative w-32 h-20 rounded-xs overflow-hidden bg-black border border-[rgba(168,104,58,0.4)] shrink-0">
              {isVideo ? (
                <video
                  src={value}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={value}
                  alt={altText || label}
                  className="w-full h-full object-cover"
                />
              )}
              {isVideo && (
                <div className="absolute top-1 right-1 bg-black/70 p-1 rounded-xs">
                  <Film className="w-3 h-3 text-[#C9935A]" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-green-400 bg-green-950/60 border border-green-800/40 px-1.5 py-0.5 rounded-xs">
                Active Media
              </span>
              <p className="text-xs font-mono text-[rgba(246,240,228,0.8)] truncate" title={value}>
                {value}
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="px-2.5 py-1.5 bg-[#A8683A] hover:bg-[#8e542d] text-white text-xs font-mono rounded-xs transition-colors cursor-pointer"
              >
                Change Picture
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                className="p-1.5 text-neutral-400 hover:text-red-400 transition-colors"
                title="Remove Media"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Empty State: Upload Action Zone */
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[rgba(168,104,58,0.35)] hover:border-[#C9935A] bg-[#0d0805] hover:bg-[#1a0f08] p-6 rounded-sm text-center cursor-pointer transition-colors group"
          >
            {uploading ? (
              <div className="flex flex-col items-center justify-center space-y-2">
                <Loader2 className="w-8 h-8 text-[#C9935A] animate-spin" />
                <span className="text-xs font-mono text-[rgba(246,240,228,0.8)]">
                  Uploading media...
                </span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-[rgba(168,104,58,0.2)] border border-[rgba(168,104,58,0.4)] flex items-center justify-center text-[#C9935A] group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-neutral-200">
                  <span className="text-[#C9935A] font-bold underline">
                    Click to upload from device
                  </span>{" "}
                  or drag and drop
                </div>
                <p className="text-[11px] text-[rgba(246,240,228,0.5)] font-mono">
                  Supports JPG, PNG, WebP, SVG{acceptVideo ? ", MP4, WebM" : ""} (Max 25MB)
                </p>
              </div>
            )}
          </div>
        )}

        {/* Error message */}
        {uploadError && (
          <p className="text-xs font-mono text-red-400 bg-red-950/40 p-2 rounded-xs border border-red-800">
            {uploadError}
          </p>
        )}

        {/* Action Buttons: Device Upload & Media Library */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#A8683A] hover:bg-[#8e542d] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Upload className="w-3.5 h-3.5" />
            )}
            <span>Upload / Change from Device</span>
          </button>

          <button
            type="button"
            onClick={openLibraryModal}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-[rgba(246,240,228,0.08)] hover:bg-[rgba(246,240,228,0.15)] border border-[rgba(168,104,58,0.35)] text-[#C9935A] text-xs font-mono font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
          >
            <FolderOpen className="w-3.5 h-3.5 text-[#C9935A]" />
            <span>Choose from Media Library</span>
          </button>
        </div>

        {/* Direct Google Images / Web URL Input (Always Prominent) */}
        {showManualUrl && (
          <div className="pt-3 border-t border-[rgba(168,104,58,0.2)] space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9935A] block">
              Google Images or Web URL:
            </span>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://... (Paste Google Images link or web URL)"
              className="w-full px-3 py-2 bg-[#0d0805] border border-[rgba(168,104,58,0.4)] rounded-xs text-xs font-mono text-[#F6F0E4] focus:outline-none focus:border-[#C9935A]"
            />
          </div>
        )}

        {/* Optional Alt Text Input */}
        {onAltTextChange && (
          <div className="pt-2 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
              Accessibility Alt Text / Description:
            </span>
            <input
              type="text"
              value={altText || ""}
              onChange={(e) => onAltTextChange(e.target.value)}
              placeholder="Descriptive label for screen readers and SEO..."
              className="w-full px-3 py-1.5 bg-[#050b13] border border-[#1b3450] rounded-xs text-xs font-sans text-neutral-200 focus:outline-none focus:border-accent-500"
            />
          </div>
        )}
      </div>

      {/* Media Library Selection Modal */}
      {isLibraryOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0c1a2a] border border-[#1f3e62] rounded-sm max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-[#1b3450] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-sans">
                  Select from Media Library
                </h3>
                <p className="text-xs text-neutral-400 font-mono">
                  Click any uploaded asset to insert it directly.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsLibraryOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bar & Upload from modal */}
            <div className="p-4 border-b border-[#14283f] bg-[#070e17] flex items-center justify-between gap-4">
              <input
                type="text"
                placeholder="Search media by filename or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 bg-[#0c1a2a] border border-[#1b3450] rounded-xs text-xs font-mono text-white focus:outline-none focus:border-accent-500"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-3 py-2 bg-accent-500 hover:bg-accent-400 text-neutral-950 text-xs font-mono font-bold rounded-xs shrink-0 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload New</span>
              </button>
            </div>

            {/* Assets Grid */}
            <div className="p-4 overflow-y-auto flex-1">
              {loadingLibrary ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-8 h-8 text-accent-400 animate-spin" />
                </div>
              ) : filteredAssets.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <ImageIcon className="w-12 h-12 text-neutral-600 mx-auto" />
                  <p className="text-xs font-mono text-neutral-400">
                    No media assets found. Upload images or videos using the button above.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {filteredAssets.map((asset) => {
                    const isSelected = value === asset.url;
                    return (
                      <div
                        key={asset.id}
                        onClick={() => {
                          onChange(asset.url);
                          if (onAltTextChange && asset.altText) {
                            onAltTextChange(asset.altText);
                          }
                          setIsLibraryOpen(false);
                        }}
                        className={`group relative rounded-xs overflow-hidden border cursor-pointer transition-all aspect-video bg-[#050b13] ${
                          isSelected
                            ? "border-accent-400 ring-2 ring-accent-400/50"
                            : "border-[#1c3654] hover:border-accent-400/60"
                        }`}
                      >
                        <SafeImage
                          src={asset.url}
                          alt={asset.altText}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                          <p className="text-[10px] font-mono text-white truncate">
                            {asset.filename}
                          </p>
                          <span className="text-[9px] font-mono text-accent-300">
                            {asset.category}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 bg-accent-500 text-neutral-950 p-0.5 rounded-full">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-[#1b3450] bg-[#070e17] flex justify-end">
              <button
                type="button"
                onClick={() => setIsLibraryOpen(false)}
                className="px-4 py-2 bg-[#122740] hover:bg-[#183457] text-white text-xs font-mono rounded-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
