import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import type { Metadata } from "next";
import { getMiningSitesServer } from "@/lib/cms/cms-service";
import { MiningSitesClient } from "@/components/mining/mining-sites-client";
import { FinalCta } from "@/components/home/final-cta";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return {
    title: isArabic
      ? "مواقع التعدين واستكشاف المعادن | هلفول فنتشرز"
      : "Active Mining Sites & Exploration Footprint | Hilful Ventures",
    description: isArabic
      ? "بوابة الامتيازات التعدينية النشطة والشراكات الفنية وممرات التجارة السيادية لشركة هلفول فنتشرز عبر إثيوبيا والشرق الأوسط والهند."
      : "Hilful Ventures active mining concessions, technical cooperative partnerships, and permitted sovereign exploration corridors across East Africa, India, and the Arabian Gulf.",
  };
}

export default async function MiningSitesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isArabic = locale === "ar";

  const sites = await getMiningSitesServer();

  return (
    <div style={{ backgroundColor: "#F6F0E4", color: "#1E130C", minHeight: "100vh" }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: "relative",
          paddingTop: "130px",
          paddingBottom: "80px",
          backgroundColor: "#1E130C",
          color: "#F6F0E4",
          borderBottom: "1px solid rgba(168, 104, 58, 0.3)",
          overflow: "hidden",
        }}
      >
        {/* Subtle Background Pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.18,
            backgroundImage: "url(/hero-mine.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="container-xl" style={{ position: "relative", zIndex: 2 }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "20px" }}>
            <ol
              style={{
                listStyle: "none",
                display: "flex",
                gap: "8px",
                fontSize: "12px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: 0,
                margin: 0,
                color: "#C9935A",
              }}
            >
              <li>
                <Link href="/" style={{ color: "rgba(246, 240, 228, 0.7)", textDecoration: "none" }}>
                  {isArabic ? "الرئيسية" : "Home"}
                </Link>
              </li>
              <li>/</li>
              <li style={{ color: "#F6F0E4", fontWeight: 600 }}>
                {isArabic ? "مواقع التعدين والاستكشاف" : "Mining Sites & Concessions"}
              </li>
            </ol>
          </nav>

          <div style={{ maxWidth: "860px" }}>
            <span
              style={{
                display: "inline-block",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C9935A",
                marginBottom: "12px",
              }}
            >
              {isArabic ? "الامتيازات الميدانية والعمليات السيادية" : "CONCESSIONS & FIELD OPERATIONS"}
            </span>

            <h1
              style={{
                fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                fontWeight: 700,
                lineHeight: 1.12,
                color: "#F6F0E4",
                marginBottom: "20px",
              }}
            >
              {isArabic ? (
                <>
                  مواقع التعدين النشطة و<span style={{ color: "#C9935A", fontStyle: "italic" }}>بصمة الاستكشاف</span> المعدني
                </>
              ) : (
                <>
                  Active Mining Sites & <span style={{ color: "#C9935A", fontStyle: "italic" }}>Exploration</span> Footprint
                </>
              )}
            </h1>

            <p
              style={{
                fontSize: "1.05rem",
                color: "rgba(246, 240, 228, 0.8)",
                lineHeight: 1.7,
                marginBottom: "36px",
              }}
            >
              {isArabic
                ? "دليل ميداني شامل لامتيازات التعدين السطحي المباشر للذهب، والشراكات الفنية لتحديث التعاونيات المرخصة، وممرات التجارة السيادية الآمنة التي تديرها هلفول فنتشرز في شرق إفريقيا والخليج والهند."
                : "A verified operational dossier of Hilful Ventures' direct open-cast placer gold concessions, technical modernization partnerships with licensed artisanal mining cooperatives, and permitted cross-border trading corridors across East Africa, India, and the Arabian Gulf."}
            </p>

            {/* Corporate Proof Metrics Bar */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "16px",
                backgroundColor: "rgba(30, 19, 12, 0.75)",
                border: "1px solid rgba(168, 104, 58, 0.35)",
                borderRadius: "6px",
                padding: "20px 24px",
                backdropFilter: "blur(6px)",
              }}
            >
              <div>
                <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#C9935A", lineHeight: 1 }}>140+ Ha</div>
                <div style={{ fontSize: "11px", color: "rgba(246, 240, 228, 0.7)", marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {isArabic ? "امتياز تعدين نشط" : "Direct Active Concessions"}
                </div>
              </div>

              <div>
                <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#C9935A", lineHeight: 1 }}>1,200+ MT</div>
                <div style={{ fontSize: "11px", color: "rgba(246, 240, 228, 0.7)", marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {isArabic ? "سعة غسيل ومعالجة يومية" : "Daily Beneficiation Slurry"}
                </div>
              </div>

              <div>
                <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#C9935A", lineHeight: 1 }}>92% - 98.5%</div>
                <div style={{ fontSize: "11px", color: "rgba(246, 240, 228, 0.7)", marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {isArabic ? "نقاء سبائك الذهب دوريه" : "Smelted Gold Doré Purity"}
                </div>
              </div>

              <div>
                <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#C9935A", lineHeight: 1 }}>3 Nations</div>
                <div style={{ fontSize: "11px", color: "rgba(246, 240, 228, 0.7)", marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {isArabic ? "مكاتب مرخصة سيادياً" : "Sovereign Permitted Corridors"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN SITES CATALOG / DOSSIERS */}
      <section style={{ padding: "80px 0" }}>
        <div className="container-xl">
          <MiningSitesClient sites={sites} locale={locale} />
        </div>
      </section>

      {/* 3. INVESTOR & CAPITAL PARTNER TRUST ARCHITECTURE */}
      <section
        style={{
          padding: "80px 0",
          backgroundColor: "#1E130C",
          color: "#F6F0E4",
          borderTop: "1px solid rgba(168, 104, 58, 0.3)",
          borderBottom: "1px solid rgba(168, 104, 58, 0.3)",
        }}
      >
        <div className="container-xl">
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 56px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C9935A",
                display: "block",
                marginBottom: "8px",
              }}
            >
              {isArabic ? "حوكمة المستثمرين والشركاء الماليين" : "GOVERNANCE & INVESTOR ASSURANCE"}
            </span>
            <h2
              style={{
                fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                fontSize: "2.4rem",
                fontWeight: 700,
                color: "#F6F0E4",
                marginBottom: "16px",
              }}
            >
              {isArabic
                ? "لماذا يثق المستثمرون ورؤوس الأموال في عملياتنا الميدانية"
                : "Why Capital Partners Trust Our Concession Footprint"}
            </h2>
            <p style={{ color: "rgba(246, 240, 228, 0.75)", fontSize: "15px", lineHeight: 1.7 }}>
              {isArabic
                ? "ندير جميع مواقع التعدين تحت مظلة الامتيازات القانونية الوطنية وبروتوكولات منظمة التعاون الاقتصادي والتنمية وسلاسل التوريد المعتمدة."
                : "Every concession and partner footprint operates under statutory mineral licensing, environmental covenants, and transparent banking chain-of-custody oversight."}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "28px",
            }}
          >
            {[
              {
                num: "01",
                title: isArabic ? "أصول حقيقية ملموسة" : "Asset-Backed Reserves",
                desc: isArabic
                  ? "احتياطيات مثبتة تحت إدارة حقول تعدين مباشرة مع أسطول آلات ثقيلة مملوك بالكامل يضمن استمرارية التشغيل."
                  : "Every operation is backed by verifiable geological pay-dirt horizons, active extraction pits, and fully dedicated earthmoving fleet assets.",
              },
              {
                num: "02",
                title: isArabic ? "امتيازات قانونية مرخصة" : "Sovereign Legal Clearances",
                desc: isArabic
                  ? "تراخيص استخراج رسمية صادرة عن وزارة المناجم وإشراف بنك إثيوبيا المركزي على جميع شحنات الذهب المصدرة."
                  : "Direct mineral exploitation covenants registered with the Ministry of Mines and National Bank of Ethiopia export clearances.",
              },
              {
                num: "03",
                title: isArabic ? "فحوصات معملية مستقلة" : "Independent Fire Assay Integrity",
                desc: isArabic
                  ? "شهادات فحص معتمدة دولياً لكل دفعة مصهورة لضمان النقاء بنسبة 92% إلى 98.5% قبل التسليم."
                  : "All smelted doré bars and ore feeds undergo accredited fire assay testing and XRF spectroscopy prior to vault transfer.",
              },
              {
                num: "04",
                title: isArabic ? "سلسلة توريد مؤمنة" : "Secured Custody & Offtake",
                desc: isArabic
                  ? "نقل مدرع معتمد عبر كبرى شركات الحراسة الدولية (برينكس / مالكا-أميت) مباشرة إلى الخزائن المصرفية العالمية."
                  : "Armored air logistics under Brink's and Malca-Amit protocols delivering directly into DMCC and LBMA accredited vault systems.",
              },
            ].map((col) => (
              <div
                key={col.num}
                style={{
                  backgroundColor: "#26180F",
                  border: "1px solid rgba(168, 104, 58, 0.25)",
                  borderRadius: "6px",
                  padding: "28px 24px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "rgba(201, 147, 90, 0.4)",
                    display: "block",
                    marginBottom: "12px",
                  }}
                >
                  {col.num}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "#F6F0E4",
                    marginBottom: "10px",
                  }}
                >
                  {col.title}
                </h3>
                <p style={{ fontSize: "13px", color: "rgba(246, 240, 228, 0.75)", lineHeight: 1.6, margin: 0 }}>
                  {col.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMMERCIAL QUERY ANCHOR SECTION */}
      <div id="commercial-query-section">
        <FinalCta locale={locale} />
      </div>
    </div>
  );
}
