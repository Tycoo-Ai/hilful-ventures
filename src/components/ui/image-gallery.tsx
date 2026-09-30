"use client";

import { useState } from "react";
import { SafeImage } from "./safe-image";
import { Lightbox, type LightboxImage } from "./lightbox";
import { Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  items: LightboxImage[];
  showFilter?: boolean;
  className?: string;
}

export function ImageGallery({
  items,
  showFilter = true,
  className,
}: ImageGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Extract unique categories
  const categories = [
    "ALL",
    ...Array.from(new Set(items.map((it) => it.category).filter(Boolean) as string[])),
  ];

  const filteredItems =
    selectedCategory === "ALL"
      ? items
      : items.filter((it) => it.category === selectedCategory);

  const handleOpenLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Optional Category Filter Pills */}
      {showFilter && categories.length > 2 && (
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 text-xs font-sans font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer border",
                selectedCategory === cat
                  ? "bg-gradient-to-r from-accent-500 via-accent-400 to-accent-600 text-neutral-950 font-bold border-accent-400 shadow-md shadow-accent-500/10"
                  : "bg-white text-neutral-700 hover:text-neutral-950 border-neutral-200/90 hover:border-neutral-300 shadow-2xs"
              )}
            >
              {cat === "ALL" ? "All Operations" : cat}
            </button>
          ))}
        </div>
      )}

      {/* Editorial Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.src + idx}
            onClick={() => handleOpenLightbox(idx)}
            className="group relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-900 border border-neutral-200/90 hover:border-accent-500/50 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer focus-visible:outline-accent-500"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpenLightbox(idx);
              }
            }}
            aria-label={`View ${item.title || item.alt} full size`}
          >
            {/* Image with subtle hover zoom */}
            <SafeImage
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />

            {/* Directional Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070e17]/95 via-[#070e17]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

            {/* Zoom Icon Indicator */}
            <div className="absolute top-3.5 right-3.5 p-2 rounded-xs bg-[#0c1a2a] text-white border border-[#2d5f8a] opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xs">
              <Maximize2 className="w-3.5 h-3.5 text-accent-400" />
            </div>

            {/* Bottom Caption Information */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              {item.category && (
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-accent-400 block mb-1">
                  {item.category}
                </span>
              )}
              {item.title && (
                <h4 className="text-sm sm:text-base font-bold tracking-tight text-white mb-1 font-heading">
                  {item.title}
                </h4>
              )}
              {item.caption && (
                <p className="text-xs text-neutral-300 line-clamp-1 font-normal">
                  {item.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        images={filteredItems}
        currentIndex={activeImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setActiveImageIndex}
      />
    </div>
  );
}
