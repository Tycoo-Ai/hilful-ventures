import { cookies } from "next/headers";
import { getAdminSession } from "@/lib/auth";

export async function isPreviewActive(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const previewCookie = cookieStore.get("hilful_preview_mode");
    if (previewCookie?.value === "true") {
      const session = await getAdminSession();
      return !!session;
    }
  } catch {
    return false;
  }
  return false;
}
