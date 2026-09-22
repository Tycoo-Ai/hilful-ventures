import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except:
  // - API routes
  // - Next.js internal files (_next)
  // - Static files (images, fonts, etc.)
  // - Admin routes (handled separately, no locale prefix)
  matcher: [
    "/((?!api|_next|_vercel|admin|.*\\..*).*)",
    "/",
  ],
};
