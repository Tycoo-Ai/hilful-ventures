import { Globe } from "lucide-react";

export default function AdminSeoPage() {
  const routes = [
    {
      path: "/en",
      title: "Hilful Ventures | Integrated Mining & Energy Solutions",
      description: "International industrial company operating across integrated mining, energy, exploration, equipment, project management and commodities/trading capabilities.",
      locale: "en_US",
      status: "Optimized",
    },
    {
      path: "/ar",
      title: "حلفول فنتشرز | حلول التعدين والطاقة المتكاملة",
      description: "شركة صناعية دولية تعمل في مجالات التعدين المتكامل، الطاقة، الاستكشاف، المعدات، إدارة المشاريع وتجارة السلع الأساسية.",
      locale: "ar_SA",
      status: "Optimized",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <div className="border-b border-[#1b3450] pb-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-400 bg-accent-950/60 border border-accent-800/40 px-2 py-0.5 rounded-xs">
            CMS Entity / SeoMetadata
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white font-sans mt-2">
          SEO &amp; OpenGraph Metadata
        </h1>
        <p className="text-xs text-neutral-400 font-mono mt-1">
          Search engine positioning, social preview cards, and canonical URL configuration across locales.
        </p>
      </div>

      <div className="space-y-6">
        {routes.map((rt) => (
          <div
            key={rt.path}
            className="p-6 rounded-sm bg-[#0c1a2a] border border-[#1b3450] space-y-3"
          >
            <div className="flex items-center justify-between border-b border-[#182e46] pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-accent-400" />
                <span className="text-xs font-mono font-bold text-white uppercase">
                  {rt.path} &bull; {rt.locale}
                </span>
              </div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-green-400 bg-green-950/60 px-2 py-0.5 rounded-xs border border-green-700/60 font-bold">
                {rt.status}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                Meta Title
              </span>
              <p className="text-sm font-sans font-semibold text-white bg-[#08121d] p-3 rounded-sm border border-[#1e3857]">
                {rt.title}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                Meta Description
              </span>
              <p className="text-xs text-neutral-200 bg-[#08121d] p-3 rounded-sm border border-[#1e3857] leading-relaxed">
                {rt.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
