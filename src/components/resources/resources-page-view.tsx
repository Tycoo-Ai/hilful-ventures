"use client";

import { useState } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import { Container } from "@/components/ui";
import { Reveal, FadeIn } from "@/components/animations";
import {
  FileText,
  Download,
  Eye,
  Clock,
  ShieldCheck,
  X,
} from "lucide-react";
import type { ResourceItem } from "@/lib/resources-service";

interface ResourcesPageViewProps {
  resources: ResourceItem[];
  locale?: string;
  heroImage?: string;
}

export function ResourcesPageView({ resources, locale = "en", heroImage }: ResourcesPageViewProps) {
  const isArabic = locale === "ar";
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [previewResource, setPreviewResource] = useState<ResourceItem | null>(null);

  const categories = isArabic
    ? [
        { key: "ALL", label: "كافة الوثائق" },
        { key: "BROCHURE", label: "الكتيب التعريفي" },
        { key: "CAPABILITIES", label: "دليل الأسطول والقدرات" },
        { key: "TECHNICAL", label: "المعايير الفنية والتشغيلية" },
      ]
    : [
        { key: "ALL", label: "ALL DOCUMENTS" },
        { key: "BROCHURE", label: "COMPANY BROCHURE" },
        { key: "CAPABILITIES", label: "CAPABILITIES & FLEET" },
        { key: "TECHNICAL", label: "TECHNICAL & SAFETY" },
      ];

  const filteredResources = resources.filter((item) => {
    if (selectedCategory === "ALL") return true;
    return item.category === selectedCategory;
  });

  return (
    <article dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-white">
      {/* =========================================================================
          SECTION 01: HERO
          ========================================================================= */}
      <section className="relative min-h-[50vh] lg:min-h-[58vh] flex items-center justify-center overflow-hidden bg-[#070e17] text-white">
        <div className="absolute inset-0 z-0">
          <SafeImage
            src={heroImage || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=85"}
            alt="Representative corporate documentation and geological technical charts"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-60 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e17] via-[#070e17]/70 to-[#070e17]/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,14,23,0.7)_100%)]" />
        </div>

        <Container size="full" className="relative z-10 pt-28 pb-16">
          <div className="max-w-4xl">
            <FadeIn delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0e2238] border border-accent-500/40 text-accent-300 text-xs font-sans font-bold uppercase tracking-widest shadow-xs mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                <span>
                  {isArabic ? "مركز الوثائق والموارد" : "DOCUMENT CENTER & RESOURCES"}
                </span>
              </div>
            </FadeIn>

            <Reveal delay={0.12}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
                {isArabic
                  ? "الوثائق المؤسسية والكتيبات الفنية"
                  : "CORPORATE PUBLICATIONS & TECHNICAL DOCUMENTS"}
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 text-base sm:text-xl text-neutral-300 leading-relaxed font-normal max-w-3xl">
                {isArabic
                  ? "الكتيبات التعريفية الرسمية، والمواصفات الفنية للأسطول، والوثائق المؤسسية الصادرة عن شركة هلفول فنتشرز المحدودة."
                  : "Authorized corporate materials, equipment fleet specifications, and technical capability documentation published by Hilful Ventures Pvt Ltd."}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 02: EDITORIAL NOTICE
          ========================================================================= */}
      <section className="bg-[#fafafc] border-b border-neutral-200 py-6">
        <Container size="full">
          <div className="flex items-start gap-4 p-5 rounded-sm bg-white border border-neutral-200/90 shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-accent-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              <span className="font-bold text-[#0c1a2a] block mb-1">
                {isArabic ? "بروتوكول نشر الوثائق المؤسسية:" : "Document Governance Protocol:"}
              </span>
              <p>
                {isArabic
                  ? "يتم إتاحة وتحديث الكتيبات التعريفية والوثائق الفنية فور اعتمادها الإداري. لا يتم نشر أي وثائق وهمية التزاماً بمعايير الشفافية المؤسسية الصارمة."
                  : "Official brochures and technical capability sheets are indexed for review. Documents pending official administrative release are designated as 'Document In Preparation' in compliance with strict corporate transparency."}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 03: RESOURCE LIST & BROCHURE PREVIEW
          ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white text-[#0c1a2a] border-b border-neutral-200">
        <Container size="full">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10 border-b border-neutral-200 pb-6">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-xs text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#0c1a2a] text-white shadow-sm"
                      : "bg-[#f4f5f8] text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900 border border-neutral-200/80"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Resources Grid */}
          <div className="space-y-6">
            {filteredResources.map((item) => (
              <div
                key={item.id}
                className="p-7 rounded-sm bg-[#fafafc] border border-neutral-200/90 hover:border-accent-500/40 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-accent-50 border border-accent-200 flex items-center justify-center text-accent-700 shrink-0 mt-0.5">
                    <FileText className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                      <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-xs bg-[#0c1a2a] text-accent-300 font-bold">
                        {item.category}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs bg-neutral-200 text-neutral-700 font-semibold">
                        {item.format}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-medium">
                        {item.language}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-heading text-[#0c1a2a] mb-1.5">
                      {isArabic ? item.titleAr : item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl font-normal">
                      {isArabic ? item.descriptionAr : item.description}
                    </p>
                  </div>
                </div>

                {/* Actions / Metadata */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-neutral-200">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium mr-2 rtl:mr-0 rtl:ml-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{isArabic ? "قيد الإعداد المؤسسي" : "Preparing Publication"}</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setPreviewResource(item)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xs bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 text-xs font-sans font-semibold transition-colors cursor-pointer w-full sm:w-auto shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isArabic ? "معاينة الوثيقة" : "Preview Metadata"}</span>
                    </button>

                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xs bg-neutral-200 text-neutral-400 text-xs font-sans font-semibold cursor-not-allowed w-full sm:w-auto"
                      title={isArabic ? "المستند قيد الإعداد المؤسسي" : "Document under preparation"}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{isArabic ? "تحميل (قيد الإعداد)" : "Download (Pending)"}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Resource Preview Modal */}
      {previewResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white border border-neutral-200 rounded-sm shadow-2xl p-6 text-[#0c1a2a] space-y-6">
            <div className="flex items-start justify-between border-b border-neutral-200 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent-700 block mb-1">
                  {previewResource.category} · {previewResource.format}
                </span>
                <h3 className="text-xl font-bold font-heading">
                  {isArabic ? previewResource.titleAr : previewResource.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewResource(null)}
                className="p-1.5 rounded-xs text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-sans text-neutral-600">
              <p className="text-sm leading-relaxed">
                {isArabic ? previewResource.descriptionAr : previewResource.description}
              </p>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-sm bg-[#fafafc] border border-neutral-200 text-[11px] font-sans">
                <div>
                  <span className="text-neutral-400 block mb-0.5">{isArabic ? "صيغة الملف:" : "File Format:"}</span>
                  <span className="font-bold text-[#0c1a2a]">{previewResource.format}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5">{isArabic ? "لغة الوثيقة:" : "Language:"}</span>
                  <span className="font-bold text-[#0c1a2a]">{previewResource.language}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5">{isArabic ? "الحالة:" : "Status:"}</span>
                  <span className="font-bold text-amber-700">{isArabic ? "قيد الإعداد للنشر" : "Preparing for Publication"}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5">{isArabic ? "الجهة الصادرة:" : "Issuing Entity:"}</span>
                  <span className="font-bold text-[#0c1a2a]">Hilful Ventures Pvt Ltd</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
              <span className="text-xs text-neutral-500 italic">
                {isArabic ? "الوثيقة قيد التوثيق الرسمي" : "Official release pending administrative sign-off"}
              </span>
              <button
                onClick={() => setPreviewResource(null)}
                className="px-5 py-2.5 rounded-xs bg-[#0c1a2a] hover:bg-[#142d4a] text-white text-xs font-sans font-bold uppercase tracking-wider cursor-pointer"
              >
                {isArabic ? "إغلاق" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
