import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="min-h-dvh flex items-center justify-center bg-neutral-50 p-6 font-sans">
        <div className="max-w-md w-full bg-white border border-neutral-200 rounded-md p-8 text-center shadow-xs">
          <p className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-2">
            404
          </p>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            Page Not Found
          </h1>
          <p className="text-sm text-neutral-600 mb-6">
            The requested resource could not be found.
          </p>
          <Link
            href="/en"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-neutral-900 rounded-sm hover:bg-neutral-800 transition-colors"
          >
            Return to English Homepage
          </Link>
        </div>
      </body>
    </html>
  );
}
