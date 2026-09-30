"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Invisible keyboard listener for administrative terminal access.
 * Pressing Ctrl+Shift+A (or Cmd+Shift+A) instantly redirects to /admin/login.
 */
export function AdminQuickAccess() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+Shift+A or Cmd+Shift+A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        router.push("/admin/login");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return null;
}
