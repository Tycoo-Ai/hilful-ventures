import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeContent } from "@/data/home-content";

export default function AdminCapabilitiesPage() {
  const capabilities = homeContent.en.capabilities.items;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1b3450] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-400 bg-accent-950/60 border border-accent-800/40 px-2 py-0.5 rounded-xs">
              CMS Entity / Capability
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight font-sans mt-2" style={{ color: "#F6F0E4" }}>
            Operational Capabilities ({capabilities.length} Pillars)
          </h1>
          <p className="text-xs font-mono mt-1" style={{ color: "#D1C7B7" }}>
            Core industrial capability pillars strictly validated against Hilful operational scope.
          </p>
        </div>

        <Link
          href="/en#capabilities"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#162f4d] hover:bg-[#1a385a] text-[#F6F0E4] text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-colors border border-[#2d5f8a] self-start sm:self-auto"
        >
          <span>View on Public Site</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {capabilities.map((cap) => (
          <div
            key={cap.id}
            className="p-6 rounded-sm bg-[#0c1a2a] border border-[#1b3450] space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#182e46] pb-3">
              <span className="text-xs font-mono font-bold text-accent-400 uppercase" style={{ color: "#C9935A" }}>
                Pillar {cap.number}
              </span>
              <span className="text-[9px] font-mono uppercase tracking-wider text-green-400 bg-green-950/60 px-2 py-0.5 rounded-xs border border-green-700/60 font-bold" style={{ color: "#4ade80" }}>
                PUBLISHED
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold font-sans mb-1" style={{ color: "#F6F0E4" }}>
                {cap.title}
              </h3>
            </div>

            <p className="text-xs leading-relaxed" style={{ color: "#D1C7B7" }}>
              {cap.overview}
            </p>

            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase tracking-wider block mb-2" style={{ color: "#9c9284" }}>
                Operational Scope
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cap.activities.map((act, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono px-2 py-1 rounded-xs bg-[#091522] border border-[#1e3857]"
                    style={{ color: "#F6F0E4" }}
                  >
                    {act}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
