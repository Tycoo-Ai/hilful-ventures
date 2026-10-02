import { v2 as cloudinary } from "cloudinary";
import { ensureCloudinaryConfig, isCloudinaryConfigured } from "./cloudinary";

const CLOUD_CACHE = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL_MS = 1000 * 30; // 30 seconds memory cache

/**
 * Saves a JSON document to Cloudinary raw storage for persistent cross-serverless access.
 */
export async function saveCloudJson(key: string, data: any): Promise<boolean> {
  if (!isCloudinaryConfigured()) {
    console.warn(`[CloudStorage] Cloudinary not configured, skipping save for ${key}`);
    return false;
  }

  try {
    ensureCloudinaryConfig();
    const jsonStr = JSON.stringify(data);
    const base64 = Buffer.from(jsonStr).toString("base64");
    const dataUri = `data:application/json;base64,${base64}`;

    await cloudinary.uploader.upload(dataUri, {
      public_id: key,
      folder: "hilful/cms",
      resource_type: "raw",
      overwrite: true,
      invalidate: true,
    });

    // Update local memory cache immediately
    CLOUD_CACHE.set(key, { data, timestamp: Date.now() });
    return true;
  } catch (err) {
    console.warn(`[CloudStorage] Failed to save ${key} to Cloudinary:`, err);
    return false;
  }
}

/**
 * Reads a JSON document from Cloudinary raw storage with retry and extended timeout.
 */
export async function getCloudJson<T>(key: string): Promise<T | null> {
  const cached = CLOUD_CACHE.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data as T;
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "sbjkwjoj";

  // Try fetch with 7s timeout and 1 retry
  for (let attempt = 1; attempt <= 2; attempt++) {
    const url = `https://res.cloudinary.com/${cloudName}/raw/upload/hilful/cms/${key}?_t=${Date.now()}_${attempt}`;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);

      const res = await fetch(url, {
        signal: controller.signal,
        cache: "no-store",
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        CLOUD_CACHE.set(key, { data, timestamp: Date.now() });
        return data as T;
      }
    } catch (err) {
      if (attempt === 2) {
        console.warn(`[CloudStorage] Attempt ${attempt} failed for ${key}:`, err);
      }
    }
  }

  return cached ? (cached.data as T) : null;
}

