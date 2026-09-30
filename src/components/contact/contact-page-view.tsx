"use client";

import { useState } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import { Container } from "@/components/ui";
import { Reveal, FadeIn } from "@/components/animations";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Building2,
  Mail,
  Paperclip,
} from "lucide-react";
import type { EnquiryType } from "@/lib/contact-submission";
import type { ContactPageContent } from "@/lib/cms/repository";

interface ContactPageViewProps {
  locale?: string;
  content?: ContactPageContent;
}

export function ContactPageView({ locale = "en", content }: ContactPageViewProps) {
  const isArabic = locale === "ar";

  const [enquiryType, setEnquiryType] = useState<EnquiryType>("PROPOSAL");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    areaOfInterest: "Minerals & Oil Exploration & Prospecting",
    message: "",
    attachmentName: "",
  });

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submittedId, setSubmittedId] = useState<string>("");

  const areasOfInterest = isArabic
    ? [
        "استكشاف وتنقيب المعادن والنفط",
        "تأجير معدات التعدين واللوجستيات",
        "إدارة مشاريع التعدين المتكاملة",
        "تداول السلع المعدنية والهيدروكربونية",
        "استفسار تشغيلي عام أو شراكة",
      ]
    : [
        "Minerals & Oil Exploration & Prospecting",
        "Mining Equipment Leasing & Fleet Logistics",
        "Turnkey Mining Project Management",
        "Mineral & Hydrocarbon Commodities Trading",
        "General Operational Inquiry / Corporate",
      ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setErrorMessage("");
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          enquiryType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormStatus("error");
        setErrorMessage(data.message || (isArabic ? "حدث خطأ أثناء إرسال الطلب." : "An error occurred during submission."));
        if (data.errors) {
          setFieldErrors(data.errors);
        }
        return;
      }

      setFormStatus("success");
      setSubmittedId(data.submissionId || "");
    } catch {
      setFormStatus("error");
      setErrorMessage(
        isArabic
          ? "تعذر الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت."
          : "Unable to reach the server. Please check your network connection."
      );
    }
  };

  return (
    <article dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-white">
      {/* =========================================================================
          SECTION 01: CONTACT HERO
          ========================================================================= */}
      <section className="relative min-h-[50vh] lg:min-h-[58vh] flex items-center justify-center overflow-hidden bg-[#070e17] text-white">
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=85"
            alt="Industrial project infrastructure and commercial operations"
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
                  {content?.hero?.eyebrow ||
                    (isArabic
                      ? "التواصل والاستفسارات التشغيلية"
                      : "CONTACT & OPERATIONAL ENQUIRIES")}
                </span>
              </div>
            </FadeIn>

            <Reveal delay={0.12}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
                {content?.hero?.headline ||
                  (isArabic
                    ? "هل أنت مستعد لمناقشة متطلباتك القادمة في التعدين أو الطاقة؟"
                    : "READY TO DISCUSS YOUR NEXT MINING OR ENERGY REQUIREMENT?")}
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 text-base sm:text-xl text-neutral-300 leading-relaxed font-normal max-w-3xl">
                {content?.hero?.subheadline ||
                  (isArabic
                    ? "تواصل مع فريقنا التشغيلي والتجاري لبحث متطلبات الاستكشاف، وتأجير الآليات، وإدارة المشاريع، أو تداول السلع."
                    : "Connect with our operational leadership to evaluate exploration programs, capital equipment leasing, turnkey project management, or commodities trade execution.")}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 02: FORM & CORPORATE CHANNELS
          ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white text-[#0c1a2a] border-b border-neutral-200">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Form Column */}
            <div className="lg:col-span-8">
              <div className="p-8 sm:p-10 rounded-sm bg-[#fafafc] border border-neutral-200/90 shadow-xs">
                {/* Enquiry Type Selector Tabs */}
                <div className="mb-8">
                  <span className="text-[11px] text-accent-700 font-bold uppercase tracking-wider block mb-3">
                    {isArabic ? "حدد مسار الاستفسار التجاري:" : "Select Primary Enquiry Path:"}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        key: "PROPOSAL" as EnquiryType,
                        en: "REQUEST A PROPOSAL",
                        ar: "طلب مقترح تشغيلي",
                      },
                      {
                        key: "TENDER" as EnquiryType,
                        en: "TENDER / RFP ENQUIRY",
                        ar: "مناقصة / طلب عروض (RFP)",
                      },
                      {
                        key: "GENERAL" as EnquiryType,
                        en: "GENERAL ENQUIRY",
                        ar: "استفسار عام",
                      },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setEnquiryType(tab.key)}
                        className={`p-3.5 rounded-sm border text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer text-center ${
                          enquiryType === tab.key
                            ? "bg-[#0c1a2a] text-white border-[#0c1a2a] shadow-sm"
                            : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400"
                        }`}
                      >
                        {isArabic ? tab.ar : tab.en}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submission Success State */}
                {formStatus === "success" ? (
                  <div className="p-8 rounded-sm bg-white border border-emerald-300 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold font-heading text-[#0c1a2a]">
                      {isArabic ? "تم استلام استفسارك بنجاح" : "Enquiry Received"}
                    </h3>
                    <p className="text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
                      {isArabic
                        ? "تم استلام استفسارك بنجاح. المعلومات المدخلة متاحة الآن للمراجعة الفنية والتشغيلية."
                        : "Your enquiry has been received. The submitted information is now available for review."}
                    </p>
                    {submittedId && (
                      <div className="inline-block p-2.5 rounded-xs bg-neutral-100 font-mono text-xs text-neutral-700">
                        {isArabic ? "رقم المرجع:" : "Reference ID:"} <span className="font-bold">{submittedId}</span>
                      </div>
                    )}
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setFormStatus("idle");
                          setFormData({
                            name: "",
                            company: "",
                            email: "",
                            phone: "",
                            country: "",
                            areaOfInterest: areasOfInterest[0],
                            message: "",
                            attachmentName: "",
                          });
                        }}
                        className="px-6 py-2.5 rounded-xs bg-[#0c1a2a] hover:bg-[#142d4a] text-white text-xs font-sans font-bold uppercase tracking-wider cursor-pointer"
                      >
                        {isArabic ? "إرسال استفسار آخر" : "Submit Another Enquiry"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {formStatus === "error" && errorMessage && (
                      <div className="p-4 rounded-sm bg-rose-50 border border-rose-200 text-rose-800 text-xs font-sans flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#0c1a2a] mb-1.5">
                          {isArabic ? "الاسم الكامل *" : "Full Name *"}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={isArabic ? "الاسم الكريم" : "Your full name"}
                          className={`w-full px-4 py-3 rounded-xs border text-xs text-neutral-900 bg-white focus:outline-hidden focus:border-accent-500 transition-colors ${
                            fieldErrors.name ? "border-rose-500" : "border-neutral-300"
                          }`}
                        />
                        {fieldErrors.name && (
                          <span className="text-[11px] text-rose-600 mt-1 block">{fieldErrors.name}</span>
                        )}
                      </div>

                      {/* Company */}
                      <div>
                        <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#0c1a2a] mb-1.5">
                          {isArabic ? "اسم الشركة / الجهة *" : "Company / Entity *"}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder={isArabic ? "اسم الشركة أو المؤسسة" : "Company or organization name"}
                          className={`w-full px-4 py-3 rounded-xs border text-xs text-neutral-900 bg-white focus:outline-hidden focus:border-accent-500 transition-colors ${
                            fieldErrors.company ? "border-rose-500" : "border-neutral-300"
                          }`}
                        />
                        {fieldErrors.company && (
                          <span className="text-[11px] text-rose-600 mt-1 block">{fieldErrors.company}</span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Work Email */}
                      <div>
                        <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#0c1a2a] mb-1.5">
                          {isArabic ? "البريد الإلكتروني للعمل *" : "Work Email *"}
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className={`w-full px-4 py-3 rounded-xs border text-xs text-neutral-900 bg-white focus:outline-hidden focus:border-accent-500 transition-colors ${
                            fieldErrors.email ? "border-rose-500" : "border-neutral-300"
                          }`}
                        />
                        {fieldErrors.email && (
                          <span className="text-[11px] text-rose-600 mt-1 block">{fieldErrors.email}</span>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#0c1a2a] mb-1.5">
                          {isArabic ? "رقم الهاتف *" : "Phone Number *"}
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+000 000000000"
                          className={`w-full px-4 py-3 rounded-xs border text-xs text-neutral-900 bg-white focus:outline-hidden focus:border-accent-500 transition-colors ${
                            fieldErrors.phone ? "border-rose-500" : "border-neutral-300"
                          }`}
                        />
                        {fieldErrors.phone && (
                          <span className="text-[11px] text-rose-600 mt-1 block">{fieldErrors.phone}</span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Country / Region */}
                      <div>
                        <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#0c1a2a] mb-1.5">
                          {isArabic ? "الدولة / المنطقة التشغيلية *" : "Country / Region *"}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          placeholder={isArabic ? "الدولة أو موقع المشروع" : "Project location or country"}
                          className={`w-full px-4 py-3 rounded-xs border text-xs text-neutral-900 bg-white focus:outline-hidden focus:border-accent-500 transition-colors ${
                            fieldErrors.country ? "border-rose-500" : "border-neutral-300"
                          }`}
                        />
                        {fieldErrors.country && (
                          <span className="text-[11px] text-rose-600 mt-1 block">{fieldErrors.country}</span>
                        )}
                      </div>

                      {/* Area of Interest */}
                      <div>
                        <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#0c1a2a] mb-1.5">
                          {isArabic ? "مجال الاهتمام الرئيسي *" : "Area of Primary Interest *"}
                        </label>
                        <select
                          value={formData.areaOfInterest}
                          onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
                          className="w-full px-4 py-3 rounded-xs border border-neutral-300 text-xs text-neutral-900 bg-white focus:outline-hidden focus:border-accent-500 transition-colors"
                        >
                          {areasOfInterest.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message / Specifications */}
                    <div>
                      <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#0c1a2a] mb-1.5">
                        {isArabic ? "تفاصيل المتطلبات والمواصفات *" : "Project Scope & Specifications *"}
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={
                          isArabic
                            ? "يرجى توضيح نطاق المشروع، نوع الآليات المطلوبة، أو المعطيات الجيولوجية المتاحة، والجدول الزمني التقديري..."
                            : "Provide a detailed overview of the required scope, machinery requirements, geological parameters, or commercial delivery timeline..."
                        }
                        className={`w-full px-4 py-3 rounded-xs border text-xs text-neutral-900 bg-white focus:outline-hidden focus:border-accent-500 transition-colors ${
                          fieldErrors.message ? "border-rose-500" : "border-neutral-300"
                        }`}
                      />
                      {fieldErrors.message && (
                        <span className="text-[11px] text-rose-600 mt-1 block">{fieldErrors.message}</span>
                      )}
                    </div>

                    {/* Technical Specification Attachment Notice (Option A: Architecture-Ready) */}
                    <div>
                      <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#0c1a2a] mb-1.5">
                        {isArabic ? "مرفقات المواصفات الفنية" : "Technical Specification Document"}
                      </label>
                      <div className="p-3.5 rounded-xs bg-[#f8fafc] border border-neutral-200 text-xs text-neutral-600 flex items-start gap-3">
                        <Paperclip className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="font-semibold text-neutral-800 block text-xs">
                            {isArabic
                              ? "إرفاق الملفات المباشر معلق حالياً"
                              : "Direct file upload is currently unavailable"}
                          </span>
                          <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
                            {isArabic
                              ? "يرجى تضمين مواصفات الآليات أو معطيات الحفر والاستكشاف في حقل تفاصيل المتطلبات أعلاه. سيتم تفعيل رفع الملفات فور ربط التخزين السحابي المعتمد."
                              : "Please include machinery specifications, project parameters, or exploration data directly in the scope field above. Direct document upload will be enabled upon cloud storage activation."}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={formStatus === "submitting"}
                        className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-500 via-accent-400 to-accent-600 hover:brightness-105 text-neutral-950 text-xs font-sans font-bold uppercase tracking-wider rounded-sm transition-all shadow-lg shadow-accent-500/15 cursor-pointer border border-accent-400 w-full sm:w-auto disabled:opacity-50"
                      >
                        <span>
                          {formStatus === "submitting"
                            ? isArabic
                              ? "جاري إرسال الطلب..."
                              : "Submitting Enquiry..."
                            : isArabic
                            ? "إرسال الاستفسار التشغيلي"
                            : "Submit Operational Enquiry"}
                        </span>
                        <Send className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Corporate Channels Column (Strict Non-Fictional Notice) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-7 rounded-sm bg-[#fafafc] border border-neutral-200/90 shadow-2xs space-y-6">
                <div className="border-b border-neutral-200 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent-700 block mb-1">
                    {content?.registry?.tag || (isArabic ? "الهوية المؤسسية" : "CORPORATE REGISTRY")}
                  </span>
                  <h3 className="text-lg font-bold font-heading text-[#0c1a2a]">
                    {content?.registry?.companyName || (isArabic ? "شركة هلفول فنتشرز المحدودة" : "Hilful Ventures Pvt Ltd")}
                  </h3>
                  <p className="text-xs text-neutral-500 font-sans mt-0.5">
                    {content?.registry?.subtitle || (isArabic ? "حلول التعدين والطاقة المتكاملة" : "Integrated Mining & Energy Solutions")}
                  </p>
                </div>

                <div className="space-y-4 text-xs text-neutral-600">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-4 h-4 text-accent-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#0c1a2a] block">
                        {content?.registry?.registeredOfficeLabel || (isArabic ? "المقر المسجل:" : "Registered Office:")}
                      </span>
                      <span className="text-neutral-500 italic">
                        {content?.registry?.registeredOfficeValue || (isArabic
                          ? "سيتم إدراجه وفق التوثيق الإداري الرسمي"
                          : "Subject to official administrative allocation")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-accent-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#0c1a2a] block">
                        {content?.registry?.emailLabel || (isArabic ? "قنوات التواصل التجارية:" : "Commercial Inquiries Desk:")}
                      </span>
                      <span className="text-neutral-500 italic">
                        {content?.registry?.emailValue || (isArabic
                          ? "يتم التعامل مع كافة الطلبات عبر النموذج التشغيلي المعتمد"
                          : "Routed through the authorized operational proposal portal")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200">
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xs bg-white border border-neutral-200/80 text-[11px] text-neutral-600 leading-relaxed">
                    <ShieldCheck className="w-4 h-4 text-accent-700 shrink-0 mt-0.5" />
                    <span>
                      {isArabic
                        ? "توجيه الحوكمة: لا يتم اختلاق أي عناوين أو أرقام اتصال غير مصرح بها التزاماً بسياسات النزاهة المؤسسية الصارمة."
                        : "Governance Notice: Unauthorized contact coordinates and unverified addresses are strictly withheld in accordance with source integrity protocols."}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
