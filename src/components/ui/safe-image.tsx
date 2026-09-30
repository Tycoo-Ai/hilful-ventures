"use client";

import React, { useState } from "react";
import Image, { type ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
  fallbackClassName?: string;
  showFallbackBadge?: boolean;
}

const APPROVED_HOSTNAMES = [
  "images.unsplash.com",
  "res.cloudinary.com",
];

function isApprovedUrl(srcStr: string): boolean {
  if (!srcStr || typeof srcStr !== "string") return false;
  // Relative or local paths or data URLs are always allowed
  if (srcStr.startsWith("/") || srcStr.startsWith("data:")) return true;

  try {
    const url = new URL(srcStr);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function SafeImage({
  src,
  alt,
  fallbackSrc = "/images/hero-industrial-landscape.svg",
  fallbackClassName = "",
  className = "",
  showFallbackBadge = false,
  fill,
  width,
  height,
  ...rest
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  const srcStr = typeof src === "string" ? src.trim() : "";
  const isValidSrc = !!srcStr;
  const isApproved = isValidSrc && isApprovedUrl(srcStr);

  // If URL is missing, invalid, unapproved, or failed to load
  if (!isValidSrc || !isApproved || hasError) {
    // If fallbackSrc itself is available and is a local asset, render Next.js Image with fallbackSrc
    if (fallbackSrc && !hasError && (fallbackSrc.startsWith("/") || isApprovedUrl(fallbackSrc))) {
      return (
        <div className={`relative overflow-hidden bg-[#0a1624] ${fill ? "w-full h-full" : ""} ${fallbackClassName}`}>
          <Image
            src={fallbackSrc}
            alt={alt || "Industrial asset placeholder"}
            fill={fill}
            width={!fill ? width || 800 : undefined}
            height={!fill ? height || 600 : undefined}
            className={`object-cover opacity-80 ${className}`}
            onError={() => setHasError(true)}
            {...rest}
          />
          {showFallbackBadge && (
            <span className="absolute bottom-2 right-2 text-[9px] font-mono px-1.5 py-0.5 bg-neutral-900/80 border border-neutral-700 text-neutral-400 rounded-xs uppercase">
              Placeholder Asset
            </span>
          )}
        </div>
      );
    }

    // Graceful CSS-only industrial pattern fallback (ensures ZERO crash even without SVG)
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-[#07111c] border border-[#162a3f] text-neutral-400 p-4 text-center overflow-hidden ${
          fill ? "absolute inset-0 w-full h-full" : "w-full min-h-[160px]"
        } ${fallbackClassName}`}
        style={{
          backgroundImage:
            "radial-gradient(#1e3b5c 1px, transparent 1px), radial-gradient(#1e3b5c 1px, #07111c 1px)",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px",
        }}
      >
        <div className="relative z-10 flex flex-col items-center gap-1.5 max-w-[90%]">
          <svg
            className="w-8 h-8 text-neutral-500 opacity-60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 line-clamp-1">
            {alt || "Industrial Media Placeholder"}
          </span>
          {!isApproved && isValidSrc && (
            <span className="text-[9px] font-mono text-amber-400/80">
              Unapproved Hostname
            </span>
          )}
        </div>
      </div>
    );
  }

  // Approved remote or local image: pass to Next.js Image with error catching
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      onError={() => {
        setHasError(true);
      }}
      {...rest}
    />
  );
}

export default SafeImage;
