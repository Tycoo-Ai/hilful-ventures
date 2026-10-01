import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { DEPARTMENTS, type DepartmentItem } from "@/data/hilful-data";
import { getDepartmentsServer, getDepartmentBySlugServer } from "@/lib/cms/cms-service";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dept = (await getDepartmentBySlugServer(slug)) || DEPARTMENTS.find((d) => d.slug === slug);
  if (!dept) return { title: "Department Not Found" };

  return {
    title: `${dept.name} | Hilful Ventures`,
    description: dept.overview,
  };
}

export default async function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const dept = (await getDepartmentBySlugServer(slug)) || DEPARTMENTS.find((d) => d.slug === slug);

  if (!dept) {
    notFound();
  }

  const allDepts = await getDepartmentsServer();
  const relatedDepts = (allDepts && allDepts.length > 0 ? allDepts : DEPARTMENTS).filter((d) => d.slug !== slug);

  return (
    <div style={{ backgroundColor: "#F6F0E4", color: "#1E130C", minHeight: "100vh" }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "120px",
          paddingBottom: "80px",
          backgroundColor: "#1E130C",
          color: "#F6F0E4",
          borderBottom: "1px solid rgba(168, 104, 58, 0.3)",
          overflow: "hidden",
        }}
      >
        {/* Cover Background with Brown Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.28,
            backgroundImage: `url(${dept.coverImage})`,
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
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/products" style={{ color: "rgba(246, 240, 228, 0.7)", textDecoration: "none" }}>
                  Departments
                </Link>
              </li>
              <li>/</li>
              <li style={{ color: "#F6F0E4", fontWeight: 600 }}>{dept.name}</li>
            </ol>
          </nav>

          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#C9935A",
              display: "block",
              marginBottom: "12px",
            }}
          >
            Department {dept.number}
          </span>

          <h1
            style={{
              fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#F6F0E4",
              marginBottom: "16px",
              maxWidth: "850px",
            }}
          >
            {dept.name}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
              fontStyle: "italic",
              fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
              color: "#C9935A",
              marginBottom: "24px",
              maxWidth: "750px",
            }}
          >
            {dept.tagline}
          </p>

          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "rgba(246, 240, 228, 0.8)",
              maxWidth: "720px",
              marginBottom: "32px",
            }}
          >
            {dept.overview}
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a
              href="#products-list"
              style={{
                backgroundColor: "#A8683A",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "12px 24px",
                borderRadius: "3px",
                textDecoration: "none",
              }}
            >
              View Products ({dept.products.length})
            </a>
            <a
              href="#enquiry-form"
              style={{
                border: "1px solid rgba(201, 147, 90, 0.6)",
                color: "#F6F0E4",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "12px 24px",
                borderRadius: "3px",
                textDecoration: "none",
              }}
            >
              Request Department Quote
            </a>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE DO & SPEC HIGHLIGHTS */}
      <section style={{ padding: "90px 0", backgroundColor: "#F6F0E4" }}>
        <div className="container-xl">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "56px",
              alignItems: "center",
            }}
          >
            {/* Left: Editorial Description */}
            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#A8683A",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                01 / Operational Mandate
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  lineHeight: 1.15,
                  color: "#1E130C",
                  marginBottom: "20px",
                }}
              >
                What We Do in{" "}
                <em style={{ color: "#A8683A", fontStyle: "italic" }}>
                  {dept.name}
                </em>
              </h2>
              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "#5A3A22",
                  marginBottom: "24px",
                }}
              >
                {dept.whatWeDo}
              </p>

              {/* Quality Badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {dept.qualityCertifications.map((cert) => (
                  <span
                    key={cert}
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      backgroundColor: "#EADFC9",
                      color: "#1E130C",
                      padding: "6px 12px",
                      borderRadius: "3px",
                      border: "1px solid rgba(168, 104, 58, 0.3)",
                    }}
                  >
                    ✓ {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Spec Summary Bento Card */}
            <div
              style={{
                backgroundColor: "#EADFC9",
                borderRadius: "6px",
                border: "1px solid rgba(168, 104, 58, 0.3)",
                padding: "36px",
                boxShadow: "0 8px 24px rgba(30, 19, 12, 0.08)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#1E130C",
                  marginBottom: "20px",
                  borderBottom: "1px solid rgba(168, 104, 58, 0.25)",
                  paddingBottom: "12px",
                }}
              >
                Department Supply Benchmark
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {dept.specSummary.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px dashed rgba(168, 104, 58, 0.2)",
                      paddingBottom: "10px",
                      fontSize: "14px",
                    }}
                  >
                    <span style={{ color: "#5A3A22", fontWeight: 500 }}>
                      {item.label}
                    </span>
                    <strong style={{ color: "#1E130C", textAlign: "right" }}>
                      {item.value}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCTS LIST & SPEC CARDS */}
      <section
        id="products-list"
        style={{
          padding: "90px 0",
          backgroundColor: "#EADFC9",
          borderTop: "1px solid rgba(168, 104, 58, 0.25)",
          borderBottom: "1px solid rgba(168, 104, 58, 0.25)",
        }}
      >
        <div className="container-xl">
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 56px auto" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#A8683A",
                display: "block",
                marginBottom: "8px",
              }}
            >
              02 / Product Offerings
            </span>
            <h2
              style={{
                fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                color: "#1E130C",
                lineHeight: 1.15,
                marginBottom: "14px",
              }}
            >
              Available Commodities in {dept.name}
            </h2>
            <p style={{ color: "#5A3A22", fontSize: "1rem" }}>
              Explore specific grades, packing specifications, minimum order quantities (MOQ), and laboratory assurance documentation.
            </p>
          </div>

          {/* Product Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "32px",
            }}
          >
            {dept.products.map((prod) => (
              <div
                key={prod.slug}
                style={{
                  backgroundColor: "#F6F0E4",
                  borderRadius: "6px",
                  border: "1px solid rgba(168, 104, 58, 0.25)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 16px rgba(30, 19, 12, 0.05)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                {/* Product Image */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "220px",
                    backgroundColor: "#1E130C",
                  }}
                >
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "12px",
                      backgroundColor: "rgba(30, 19, 12, 0.85)",
                      color: "#F6F0E4",
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: "2px",
                      letterSpacing: "0.08em",
                    }}
                  >
                    MOQ: {prod.specs.moq}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                      fontSize: "1.45rem",
                      fontWeight: 700,
                      color: "#1E130C",
                      marginBottom: "10px",
                      lineHeight: 1.2,
                    }}
                  >
                    {prod.name}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#5A3A22",
                      lineHeight: 1.6,
                      marginBottom: "16px",
                    }}
                  >
                    {prod.shortDesc}
                  </p>

                  {/* Spec table */}
                  <div
                    style={{
                      backgroundColor: "#EADFC9",
                      borderRadius: "4px",
                      padding: "12px",
                      marginBottom: "16px",
                      fontSize: "12px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ color: "#5A3A22" }}>Grade:</span>
                      <strong style={{ color: "#1E130C" }}>{prod.specs.grade}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ color: "#5A3A22" }}>Packaging:</span>
                      <strong style={{ color: "#1E130C", textAlign: "right", maxWidth: "60%" }}>
                        {prod.specs.packaging}
                      </strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#5A3A22" }}>Origin:</span>
                      <strong style={{ color: "#1E130C" }}>{prod.specs.origin}</strong>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ marginTop: "auto", display: "flex", gap: "10px" }}>
                    <Link
                      href={`/products/${prod.slug}`}
                      style={{
                        flex: 1,
                        textAlign: "center",
                        padding: "10px",
                        backgroundColor: "#1E130C",
                        color: "#F6F0E4",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        borderRadius: "3px",
                        textDecoration: "none",
                      }}
                    >
                      View Details
                    </Link>

                    <a
                      href="#enquiry-form"
                      style={{
                        padding: "10px 14px",
                        backgroundColor: "#A8683A",
                        color: "#FFFFFF",
                        fontSize: "12px",
                        fontWeight: 600,
                        borderRadius: "3px",
                        textDecoration: "none",
                      }}
                    >
                      Enquire
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DEPARTMENT PROCESS */}
      <section style={{ padding: "90px 0", backgroundColor: "#F6F0E4" }}>
        <div className="container-xl">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 56px auto" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#A8683A",
                display: "block",
                marginBottom: "8px",
              }}
            >
              03 / Execution Protocol
            </span>
            <h2
              style={{
                fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "#1E130C",
              }}
            >
              Quality &amp; Loading Process
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "28px",
            }}
          >
            {dept.process.map((step) => (
              <div
                key={step.step}
                style={{
                  backgroundColor: "#EADFC9",
                  padding: "32px 24px",
                  borderRadius: "6px",
                  border: "1px solid rgba(168, 104, 58, 0.25)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#A8683A",
                    display: "block",
                    marginBottom: "12px",
                  }}
                >
                  Step {step.step}
                </span>
                <h4
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    color: "#1E130C",
                    marginBottom: "10px",
                  }}
                >
                  {step.title}
                </h4>
                <p style={{ fontSize: "0.875rem", color: "#5A3A22", lineHeight: 1.7 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ ACCORDION */}
      <section
        style={{
          padding: "80px 0",
          backgroundColor: "#EADFC9",
          borderTop: "1px solid rgba(168, 104, 58, 0.25)",
        }}
      >
        <div className="container-xl" style={{ maxWidth: "860px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#A8683A",
                display: "block",
                marginBottom: "8px",
              }}
            >
              04 / Frequently Asked Questions
            </span>
            <h2
              style={{
                fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                fontSize: "2.4rem",
                color: "#1E130C",
              }}
            >
              Questions on {dept.name}
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {dept.faqs.map((faq, i) => (
              <details
                key={i}
                style={{
                  backgroundColor: "#F6F0E4",
                  borderRadius: "6px",
                  padding: "18px 24px",
                  border: "1px solid rgba(168, 104, 58, 0.25)",
                  cursor: "pointer",
                }}
              >
                <summary
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#1E130C",
                    outline: "none",
                  }}
                >
                  {faq.q}
                </summary>
                <p
                  style={{
                    marginTop: "14px",
                    fontSize: "0.9375rem",
                    color: "#5A3A22",
                    lineHeight: 1.7,
                  }}
                >
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 6. RELATED DEPARTMENTS */}
      <section style={{ padding: "80px 0", backgroundColor: "#F6F0E4" }}>
        <div className="container-xl">
          <div style={{ marginBottom: "36px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#A8683A",
                }}
              >
                Other Capabilities
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                  fontSize: "1.85rem",
                  color: "#1E130C",
                }}
              >
                Related Trading Departments
              </h3>
            </div>
            <Link
              href="/products"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#A8683A",
                textDecoration: "none",
              }}
            >
              View All 4 Departments &rarr;
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {relatedDepts.map((rd) => (
              <Link
                key={rd.slug}
                href={`/departments/${rd.slug}`}
                style={{
                  textDecoration: "none",
                  backgroundColor: "#EADFC9",
                  borderRadius: "6px",
                  border: "1px solid rgba(168, 104, 58, 0.2)",
                  overflow: "hidden",
                  display: "block",
                  transition: "transform 0.2s ease",
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "140px" }}>
                  <Image src={rd.image} alt={rd.name} fill style={{ objectFit: "cover" }} sizes="300px" />
                </div>
                <div style={{ padding: "16px" }}>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#A8683A",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Dept {rd.number}
                  </span>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1E130C", marginBottom: "6px" }}>
                    {rd.name}
                  </h4>
                  <p style={{ fontSize: "12px", color: "#5A3A22", margin: 0 }}>
                    {rd.products.length} Products Listed
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PRE-FILLED ENQUIRY FORM ANCHOR */}
      <section
        id="enquiry-form"
        style={{
          padding: "90px 0",
          backgroundColor: "#1E130C",
          color: "#F6F0E4",
        }}
      >
        <div className="container-xl" style={{ maxWidth: "720px", textAlign: "center" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#C9935A",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Direct Commercial Desk
          </span>
          <h2
            style={{
              fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
              fontSize: "2.6rem",
              color: "#F6F0E4",
              marginBottom: "16px",
            }}
          >
            Request Quotation for {dept.name}
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "rgba(246, 240, 228, 0.75)",
              lineHeight: 1.7,
              marginBottom: "36px",
            }}
          >
            Our Chennai and Assosa trading desks manage orders for {dept.name}. Contact us below for port-specific CIF pricing, inspection schedules, and minimum container volumes.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <a
              href={`https://wa.me/919655522111?text=${encodeURIComponent(`Hello Hilful Ventures, I am enquiring about ${dept.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#25D366",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 600,
                padding: "12px 24px",
                borderRadius: "4px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Enquire on WhatsApp
            </a>

            <Link
              href="/contact"
              style={{
                backgroundColor: "#A8683A",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "12px 24px",
                borderRadius: "4px",
                textDecoration: "none",
              }}
            >
              Go to Full Enquiry Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
