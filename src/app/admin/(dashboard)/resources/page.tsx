"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  RefreshCw,
} from "lucide-react";
import type { ResourceItem } from "@/lib/resources-service";

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadResources = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/resources");
      if (res.ok) {
        const json = await res.json();
        setResources(json.resources || []);
      }
    } catch (err) {
      console.error("Failed to load admin resources:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchInitial = async () => {
      try {
        const res = await fetch("/api/admin/resources");
        if (res.ok && isMounted) {
          const json = await res.json();
          setResources(json.resources || []);
        }
      } catch (err) {
        console.error("Failed to load admin resources:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchInitial();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1a2e44]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-accent-400" />
            <span className="text-[10px] font-mono text-accent-400 uppercase tracking-widest">
              PUBLICATIONS &amp; DOWNLOADS
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
            Resource Library &amp; Publications
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Manage corporate profile brochures, equipment specs, and technical documentation
          </p>
        </div>

        <button
          onClick={loadResources}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-sm bg-[#122740] hover:bg-[#1a375a] border border-[#2d5f8a] text-xs font-mono text-neutral-200 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Publications Table */}
      <div className="rounded-sm bg-[#0e1a28] border border-[#1a2e44] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#182a3e] bg-[#070e17] text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Document Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Language</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">File State</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#182a3e] font-sans">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-400 font-mono text-xs">
                    Loading publications...
                  </td>
                </tr>
              ) : resources.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-400 font-mono text-xs">
                    No resources currently registered.
                  </td>
                </tr>
              ) : (
                resources.map((item) => (
                  <tr key={item.id} className="hover:bg-[#122336]/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 text-accent-400 shrink-0" />
                        <span>{item.title}</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                        {item.description}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#122740] border border-[#234b73] text-accent-300">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[11px] font-mono text-neutral-300">
                      {item.language}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-xs font-bold ${
                          item.status === "PUBLISHED"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[11px] font-mono text-neutral-400">
                      {item.fileSize || "Pending upload"}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-[10px] font-mono text-neutral-500 italic">
                        Draft Control Active
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
