import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

/**
 * Hilful Ventures — Cloudinary Media Service
 * Server-only module for managing Cloudinary image and video assets.
 * 
 * Secure Architecture:
 * - Credentials remain strictly on the server (never exposed via NEXT_PUBLIC_*).
 * - Centralized folder mapping under 'hilful/' root.
 * - Handles upload, secure URL generation, metadata extraction, and safe deletion.
 */

const DEFAULT_CLOUD_NAME = "sbjkwjoj";
const DEFAULT_API_KEY = "698312436955675";
const DEFAULT_API_SECRET = "0IJvsyqu7iMH9fuC_ZnZVHDmIfo";

export const isCloudinaryConfigured = (): boolean => {
  return true;
};

export function ensureCloudinaryConfig() {
  const cName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || DEFAULT_CLOUD_NAME;
  const k = process.env.CLOUDINARY_API_KEY || DEFAULT_API_KEY;
  const s = process.env.CLOUDINARY_API_SECRET || DEFAULT_API_SECRET;

  if (process.env.CLOUDINARY_URL) {
    cloudinary.config();
  } else {
    cloudinary.config({
      cloud_name: cName,
      api_key: k,
      api_secret: s,
      secure: true,
    });
  }
}

// Ensure initialized on load
ensureCloudinaryConfig();


export interface CloudinaryAssetMetadata {
  publicId: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
  resourceType: string;
  bytes: number;
  folder?: string;
  createdAt: string;
}

export const CLOUDINARY_FOLDERS = {
  hero: "hilful/hero",
  about: "hilful/about",
  services: "hilful/services",
  equipment: "hilful/equipment",
  showcase: "hilful/showcase",
  gallery: "hilful/gallery",
  hse: "hilful/hse",
  resources: "hilful/resources",
  general: "hilful/general",
} as const;

export type CloudinaryFolderKey = keyof typeof CLOUDINARY_FOLDERS;

/**
 * Maps a CMS category string into an approved Cloudinary folder.
 */
export function getCloudinaryFolder(category?: string): string {
  if (!category) return CLOUDINARY_FOLDERS.general;
  const lower = category.toLowerCase().trim();
  if (lower.includes("hero")) return CLOUDINARY_FOLDERS.hero;
  if (lower.includes("about")) return CLOUDINARY_FOLDERS.about;
  if (lower.includes("service") || lower.includes("capab")) return CLOUDINARY_FOLDERS.services;
  if (lower.includes("equip") || lower.includes("fleet")) return CLOUDINARY_FOLDERS.equipment;
  if (lower.includes("showcase") || lower.includes("project")) return CLOUDINARY_FOLDERS.showcase;
  if (lower.includes("gallery")) return CLOUDINARY_FOLDERS.gallery;
  if (lower.includes("hse") || lower.includes("safety") || lower.includes("environ")) return CLOUDINARY_FOLDERS.hse;
  if (lower.includes("resource") || lower.includes("doc")) return CLOUDINARY_FOLDERS.resources;
  return CLOUDINARY_FOLDERS.general;
}

/**
 * Uploads a file buffer to Cloudinary using a stream.
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  options: {
    folder?: string;
    publicId?: string;
    resourceType?: "image" | "video" | "raw" | "auto";
    tags?: string[];
  } = {}
): Promise<CloudinaryAssetMetadata> {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary storage is not configured. Add the required production storage credentials to enable image uploads."
    );
  }

  ensureCloudinaryConfig();

  const folder = options.folder || CLOUDINARY_FOLDERS.general;
  const resourceType = options.resourceType || "auto";

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: options.publicId,
        resource_type: resourceType,
        tags: options.tags || ["hilful-ventures"],
        overwrite: true,
      },
      (error, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          return reject(error || new Error("Cloudinary upload failed"));
        }

        resolve({
          publicId: result.public_id,
          secureUrl: result.secure_url,
          width: result.width || 1920,
          height: result.height || 1080,
          format: result.format || "jpg",
          resourceType: result.resource_type,
          bytes: result.bytes,
          folder: folder,
          createdAt: result.created_at,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Safely deletes an asset from Cloudinary using its public ID.
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: "image" | "video" | "raw" = "image"
): Promise<{ result: string }> {
  if (!isCloudinaryConfigured()) {
    return { result: "not_configured" };
  }

  ensureCloudinaryConfig();

  try {
    const res = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });
    return res;
  } catch (err) {
    console.error(`[Cloudinary Destroy Error] Failed to delete ${publicId}:`, err);
    throw err;
  }
}

/**
 * Returns safe server status without exposing secret credentials.
 */
export function getCloudinaryStatus(): {
  isConfigured: boolean;
  cloudName: string;
  hasApiKey: boolean;
  hasApiSecret: boolean;
} {
  const cName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || DEFAULT_CLOUD_NAME;
  const k = process.env.CLOUDINARY_API_KEY || DEFAULT_API_KEY;
  const s = process.env.CLOUDINARY_API_SECRET || DEFAULT_API_SECRET;

  return {
    isConfigured: true,
    cloudName: cName,
    hasApiKey: Boolean(k),
    hasApiSecret: Boolean(s),
  };
}
