"use client";

import { useEffect, useCallback } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxImage {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  category?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const currentImage = images[currentIndex];

  const handleNext = useCallback(() => {
    onIndexChange((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  const handlePrev = useCallback(() => {
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070e17]/95 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-label="Image gallery lightbox"
      >
        {/* Top Controls Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-20 text-white">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-accent-400 tracking-wider">
              {currentIndex + 1} / {images.length}
            </span>
            {currentImage.category && (
              <span className="text-[10px] font-medium uppercase tracking-widest px-2.5 py-1 rounded-xs bg-[#122740] border border-[#2d5f8a] text-neutral-300">
                {currentImage.category}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-sm bg-[#0c1a2a] hover:bg-[#162f4d] border border-[#2d5f8a] text-neutral-200 hover:text-white transition-colors cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-sm bg-[#0c1a2a]/80 hover:bg-[#162f4d] border border-[#2d5f8a] text-white transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
          </button>
        )}

        {/* Image Stage */}
        <div className="relative w-full max-w-5xl h-[70vh] sm:h-[78vh] px-4 flex items-center justify-center">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative w-full h-full"
          >
            <SafeImage
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-sm bg-[#0c1a2a]/80 hover:bg-[#162f4d] border border-[#2d5f8a] text-white transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 rtl:rotate-180" />
          </button>
        )}

        {/* Bottom Caption Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-[#070e17] via-[#070e17]/80 to-transparent z-20 text-center">
          {currentImage.title && (
            <h4 className="text-sm sm:text-base font-bold text-white mb-1 font-sans">
              {currentImage.title}
            </h4>
          )}
          {currentImage.caption && (
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto font-normal">
              {currentImage.caption}
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
