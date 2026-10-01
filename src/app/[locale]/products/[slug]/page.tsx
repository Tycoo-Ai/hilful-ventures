import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { DEPARTMENTS, PROCESS_STEPS, WHY_US_ITEMS, TESTIMONIALS } from "@/data/hilful-data";
import { getProductBySlugServer, getDepartmentBySlugServer } from "@/lib/cms/cms-service";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const prod = (await getProductBySlugServer(slug)) || DEPARTMENTS.flatMap((d) => d.products).find((p) => p.slug === slug);
  if (!prod) return { title: "Product Not Found" };

  return {
    title: `${prod.name} | Hilful Ventures`,
    description: prod.shortDesc,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const prod = (await getProductBySlugServer(slug)) || DEPARTMENTS.flatMap((d) => d.products).find((p) => p.slug === slug);

  if (!prod) {
    notFound();
  }

  const dept = (await getDepartmentBySlugServer(prod.departmentSlug)) || DEPARTMENTS.find((d) => d.slug === prod.departmentSlug);
  const relatedProducts = dept?.products.filter((p) => p.slug !== slug) || [];

  return (
    <div style={{ backgroundColor: "#F6F0E4", color: "#1E130C", minHeight: "100vh" }}>
      {/* 1. PRODUCT HERO & GALLERY */}
      <section
        style={{
          paddingTop: "120px",
          paddingBottom: "80px",
          backgroundColor: "#1E130C",
          color: "#F6F0E4",
          borderBottom: "1px solid rgba(168, 104, 58, 0.3)",
        }}
      >
        <div className="container-xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "24px" }}>
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
                  Products
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href={`/departments/${prod.departmentSlug}`}
                  style={{ color: "rgba(246, 240, 228, 0.7)", textDecoration: "none" }}
                >
                  {prod.departmentName}
                </Link>
              </li>
              <li>/</li>
              <li style={{ color: "#F6F0E4", fontWeight: 600 }}>{prod.name}</li>
            </ol>
          </nav>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "56px",
              alignItems: "center",
            }}
          >
            {/* Left: Product Main Image & Zoom Presentation */}
            <div>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "400px",
                  borderRadius: "6px",
                  overflow: "hidden",
                  border: "1px solid rgba(168, 104, 58, 0.4)",
                  backgroundColor: "#0F0A06",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                }}
              >
                <Image
                  src={prod.image}
                  alt={prod.name}
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>

              {/* Gallery Thumbnails */}
              {prod.galleryImages && prod.galleryImages.length > 1 && (
                <div style={{ display: "flex", gap: "12px", marginTop: "14px" }}>
                  {prod.galleryImages.map((img, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: "relative",
                        width: "80px",
                        height: "60px",
                        borderRadius: "4px",
                        overflow: "hidden",
                        border: "1px solid rgba(168, 104, 58, 0.5)",
                      }}
                    >
                      <Image src={img} alt={`${prod.name} ${idx + 1}`} fill style={{ objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Essential Specs & Fast CTAs */}
            <div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#C9935A",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                {prod.departmentName}
              </span>

              <h1
                style={{
                  fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                  fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: "#F6F0E4",
                  marginBottom: "16px",
                }}
              >
                {prod.name}
              </h1>

              <p
                style={{
                  fontSize: "1.05rem",
                  color: "rgba(246, 240, 228, 0.8)",
                  lineHeight: 1.7,
                  marginBottom: "24px",
                }}
              >
                {prod.shortDesc}
              </p>

              {/* Fast Spec Bento */}
              <div
                style={{
                  backgroundColor: "rgba(42, 27, 16, 0.75)",
                  border: "1px solid rgba(168, 104, 58, 0.3)",
                  borderRadius: "6px",
                  padding: "20px",
                  marginBottom: "28px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                }}
              >
                <div>
                  <span style={{ fontSize: "11px", color: "#C9935A", textTransform: "uppercase" }}>
                    Minimum Order Qty
                  </span>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#F6F0E4", margin: "2px 0 0 0" }}>
                    {prod.specs.moq}
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: "#C9935A", textTransform: "uppercase" }}>
                    Compliance Grade
                  </span>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#F6F0E4", margin: "2px 0 0 0" }}>
                    {prod.specs.grade}
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: "#C9935A", textTransform: "uppercase" }}>
                    Origin Desk
                  </span>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#F6F0E4", margin: "2px 0 0 0" }}>
                    {prod.specs.origin}
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: "#C9935A", textTransform: "uppercase" }}>
                    Packaging Format
                  </span>
                  <p style={{ fontSize: "13px", fontWeight: 500, color: "#F6F0E4", margin: "2px 0 0 0" }}>
                    {prod.specs.packaging}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <a
                  href="#quote-form"
                  style={{
                    backgroundColor: "#A8683A",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "13px 28px",
                    borderRadius: "4px",
                    textDecoration: "none",
                  }}
                >
                  Request Official Quote
                </a>

                <a
                  href={`https://wa.me/919655522111?text=${encodeURIComponent(`Hello Hilful Ventures, I want to enquire about ${prod.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: "#25D366",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: 600,
                    padding: "13px 20px",
                    borderRadius: "4px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  WhatsApp Trade Desk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIFICATION TABLE & APPLICATIONS */}
      <section style={{ padding: "80px 0", backgroundColor: "#F6F0E4" }}>
        <div className="container-xl">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "48px",
            }}
          >
            {/* Left: Detailed Specification Table */}
            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#A8683A",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Technical Parameters
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                  fontSize: "2.2rem",
                  color: "#1E130C",
                  marginBottom: "24px",
                }}
              >
                Specification Matrix
              </h2>

              <div
                style={{
                  backgroundColor: "#EADFC9",
                  borderRadius: "6px",
                  border: "1px solid rgba(168, 104, 58, 0.3)",
                  overflow: "hidden",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid rgba(168, 104, 58, 0.2)" }}>
                      <td style={{ padding: "14px 18px", color: "#5A3A22", fontWeight: 600, width: "35%" }}>
                        Product Name
                      </td>
                      <td style={{ padding: "14px 18px", color: "#1E130C", fontWeight: 600 }}>
                        {prod.specs.name}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(168, 104, 58, 0.2)" }}>
                      <td style={{ padding: "14px 18px", color: "#5A3A22", fontWeight: 600 }}>
                        Grade Standard
                      </td>
                      <td style={{ padding: "14px 18px", color: "#1E130C" }}>
                        {prod.specs.grade}
                      </td>
                    </tr>
                    {prod.specs.purityOrForm && (
                      <tr style={{ borderBottom: "1px solid rgba(168, 104, 58, 0.2)" }}>
                        <td style={{ padding: "14px 18px", color: "#5A3A22", fontWeight: 600 }}>
                          Form / Purity
                        </td>
                        <td style={{ padding: "14px 18px", color: "#1E130C" }}>
                          {prod.specs.purityOrForm}
                        </td>
                      </tr>
                    )}
                    <tr style={{ borderBottom: "1px solid rgba(168, 104, 58, 0.2)" }}>
                      <td style={{ padding: "14px 18px", color: "#5A3A22", fontWeight: 600 }}>
                        Export Packaging
                      </td>
                      <td style={{ padding: "14px 18px", color: "#1E130C" }}>
                        {prod.specs.packaging}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(168, 104, 58, 0.2)" }}>
                      <td style={{ padding: "14px 18px", color: "#5A3A22", fontWeight: 600 }}>
                        Minimum Order Qty
                      </td>
                      <td style={{ padding: "14px 18px", color: "#1E130C", fontWeight: 600 }}>
                        {prod.specs.moq}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "14px 18px", color: "#5A3A22", fontWeight: 600 }}>
                        Supply Origin
                      </td>
                      <td style={{ padding: "14px 18px", color: "#1E130C" }}>
                        {prod.specs.origin}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Applications & Quality Documents */}
            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#A8683A",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Industrial Utilization
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                  fontSize: "2.2rem",
                  color: "#1E130C",
                  marginBottom: "24px",
                }}
              >
                Primary Applications
              </h2>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 32px 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {prod.applications.map((app, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontSize: "14px",
                      color: "#3B2314",
                      backgroundColor: "#EADFC9",
                      padding: "12px 16px",
                      borderRadius: "4px",
                      border: "1px solid rgba(168, 104, 58, 0.2)",
                    }}
                  >
                    <span style={{ color: "#A8683A", fontWeight: 700 }}>✓</span>
                    <span>{app}</span>
                  </li>
                ))}
              </ul>

              {/* Quality & Shipping Docs */}
              <h3
                style={{
                  fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                  fontSize: "1.45rem",
                  color: "#1E130C",
                  marginBottom: "14px",
                }}
              >
                Accompanying Documentation
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {prod.qualityDocs.map((doc, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      backgroundColor: "#1E130C",
                      color: "#F6F0E4",
                      padding: "6px 12px",
                      borderRadius: "3px",
                    }}
                  >
                    📄 {doc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RELATED PRODUCTS IN SAME DEPARTMENT */}
      {relatedProducts.length > 0 && (
        <section
          style={{
            padding: "80px 0",
            backgroundColor: "#EADFC9",
            borderTop: "1px solid rgba(168, 104, 58, 0.25)",
          }}
        >
          <div className="container-xl">
            <div style={{ marginBottom: "36px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#A8683A",
                  }}
                >
                  Department Catalog
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                    fontSize: "2rem",
                    color: "#1E130C",
                  }}
                >
                  More from {prod.departmentName}
                </h3>
              </div>
              <Link
                href={`/departments/${prod.departmentSlug}`}
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#A8683A",
                  textDecoration: "none",
                }}
              >
                View Department &rarr;
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {relatedProducts.map((rp) => (
                <div
                  key={rp.slug}
                  style={{
                    backgroundColor: "#F6F0E4",
                    borderRadius: "6px",
                    border: "1px solid rgba(168, 104, 58, 0.25)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ position: "relative", width: "100%", height: "180px" }}>
                    <Image src={rp.image} alt={rp.name} fill style={{ objectFit: "cover" }} sizes="300px" />
                  </div>
                  <div style={{ padding: "18px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h4
                      style={{
                        fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "#1E130C",
                        marginBottom: "6px",
                      }}
                    >
                      {rp.name}
                    </h4>
                    <p style={{ fontSize: "12px", color: "#5A3A22", marginBottom: "14px" }}>
                      MOQ: {rp.specs.moq}
                    </p>
                    <Link
                      href={`/products/${rp.slug}`}
                      style={{
                        marginTop: "auto",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#A8683A",
                        textDecoration: "none",
                      }}
                    >
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. PRE-FILLED QUOTATION FORM ANCHOR */}
      <section
        id="quote-form"
        style={{
          padding: "90px 0",
          backgroundColor: "#1E130C",
          color: "#F6F0E4",
        }}
      >
        <div className="container-xl" style={{ maxWidth: "700px", textAlign: "center" }}>
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
            Direct Commercial Enquiry
          </span>
          <h2
            style={{
              fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
              fontSize: "2.6rem",
              color: "#F6F0E4",
              marginBottom: "14px",
            }}
          >
            Request Official Quotation for {prod.name}
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "rgba(246, 240, 228, 0.8)",
              lineHeight: 1.7,
              marginBottom: "36px",
            }}
          >
            Our Chennai and Assosa trading desks manage orders for {prod.name}. Contact us below for port-specific CIF pricing, inspection schedules, and minimum container volumes.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <a
              href={`https://wa.me/919655522111?text=${encodeURIComponent(`Hello Hilful Ventures, I would like to request a quotation for ${prod.name} (MOQ: ${prod.specs.moq}).`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#25D366",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 600,
                padding: "14px 28px",
                borderRadius: "4px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              WhatsApp Commercial Desk
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
                padding: "14px 28px",
                borderRadius: "4px",
                textDecoration: "none",
              }}
            >
              Go to Full Contact Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
