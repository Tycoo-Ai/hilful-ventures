import { DEPARTMENTS } from "@/data/hilful-data";
import { getDepartmentsServer, getProductsServer } from "@/lib/cms/cms-service";
import { ProductCatalogClient } from "@/components/products/product-catalog-client";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Industrial Commodities Catalog | Hilful Ventures",
  description:
    "Explore our complete product catalog: mining & drilling chemicals, ferrous & non-ferrous secondary metals, minerals & mud chemicals for ONG exploration, and quartz & fly ash.",
};

export default async function ProductsPage() {
  const departments = await getDepartmentsServer();
  const allProducts = await getProductsServer();

  return (
    <div style={{ backgroundColor: "#F6F0E4", color: "#1E130C", minHeight: "100vh" }}>
      {/* Hero Header */}
      <section
        style={{
          paddingTop: "120px",
          paddingBottom: "64px",
          backgroundColor: "#1E130C",
          color: "#F6F0E4",
          borderBottom: "1px solid rgba(168, 104, 58, 0.3)",
        }}
      >
        <div className="container-xl" style={{ textAlign: "center", maxWidth: "800px" }}>
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
            Global Commodities Catalog
          </span>
          <h1
            style={{
              fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
              fontSize: "clamp(2.5rem, 5.5vw, 4.2rem)",
              lineHeight: 1.1,
              marginBottom: "18px",
            }}
          >
            Industrial Product <em style={{ color: "#C9935A", fontStyle: "italic" }}>Showcase</em>
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "rgba(246, 240, 228, 0.8)",
              lineHeight: 1.7,
            }}
          >
            Direct containerized supply across 4 specialized trading disciplines: Mining &amp; Drilling Chemicals, Secondary Metals, Mill-Grade Recovered Fiber, and Graded Tyre Casings.
          </p>
        </div>
      </section>

      {/* Interactive Filterable Catalog Grid (Client Component) */}
      <ProductCatalogClient departments={departments} initialProducts={allProducts} />
    </div>
  );
}
