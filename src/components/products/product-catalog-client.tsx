"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import type { DepartmentItem, ProductItem } from "@/data/hilful-data";

interface Props {
  departments: DepartmentItem[];
  initialProducts: ProductItem[];
}

export function ProductCatalogClient({ departments, initialProducts }: Props) {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [selectedDeptSlug, setSelectedDeptSlug] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    try {
      const local = localStorage.getItem("hilful_cms_products");
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }
    } catch {}

    let bc: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== "undefined") {
      try {
        bc = new BroadcastChannel("hilful_cms_channel");
        bc.onmessage = (event) => {
          if (event.data?.type === "PRODUCTS_UPDATED" && Array.isArray(event.data?.data)) {
            setProducts(event.data.data);
          }
        };
      } catch {}
    }

    return () => {
      if (bc) bc.close();
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesDept =
        selectedDeptSlug === "all" || product.departmentSlug === selectedDeptSlug;
      const matchesQuery =
        searchQuery.trim() === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.specs.grade.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDept && matchesQuery;
    });
  }, [products, selectedDeptSlug, searchQuery]);

  return (
    <div className="container-xl" style={{ padding: "64px clamp(1.5rem, 5vw, 6rem)" }}>
      {/* 4 Department Hero Tiles */}
      <div style={{ marginBottom: "56px" }}>
        <h3
          style={{
            fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
            fontSize: "1.75rem",
            color: "#1E130C",
            marginBottom: "20px",
          }}
        >
          Select Department
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
            gap: "20px",
          }}
        >
          {departments.map((dept) => {
            const isSelected = selectedDeptSlug === dept.slug;
            return (
              <button
                key={dept.slug}
                type="button"
                onClick={() =>
                  setSelectedDeptSlug(isSelected ? "all" : dept.slug)
                }
                style={{
                  position: "relative",
                  height: "140px",
                  borderRadius: "6px",
                  overflow: "hidden",
                  border: isSelected ? "2px solid #A8683A" : "1px solid rgba(168, 104, 58, 0.25)",
                  boxShadow: isSelected ? "0 8px 24px rgba(168, 104, 58, 0.3)" : "none",
                  cursor: "pointer",
                  textAlign: "left",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  transition: "all 0.2s ease",
                }}
              >
                <Image
                  src={dept.image}
                  alt={dept.name}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="300px"
                />
                {/* Dark Gradient Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(30,19,12,0.92) 0%, rgba(30,19,12,0.4) 60%, transparent 100%)",
                  }}
                />
                <div style={{ position: "relative", zIndex: 2 }}>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#C9935A",
                      display: "block",
                      marginBottom: "2px",
                    }}
                  >
                    Dept {dept.number}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "#F6F0E4",
                      lineHeight: 1.2,
                    }}
                  >
                    {dept.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          backgroundColor: "#EADFC9",
          padding: "16px 24px",
          borderRadius: "6px",
          border: "1px solid rgba(168, 104, 58, 0.25)",
          marginBottom: "40px",
        }}
      >
        {/* Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          <button
            type="button"
            onClick={() => setSelectedDeptSlug("all")}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              border: "1px solid #A8683A",
              backgroundColor: selectedDeptSlug === "all" ? "#A8683A" : "transparent",
              color: selectedDeptSlug === "all" ? "#FFFFFF" : "#1E130C",
              transition: "all 0.15s ease",
            }}
          >
            All Products ({initialProducts.length})
          </button>

          {departments.map((dept) => {
            const isSelected = selectedDeptSlug === dept.slug;
            return (
              <button
                key={dept.slug}
                type="button"
                onClick={() => setSelectedDeptSlug(dept.slug)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "1px solid rgba(168, 104, 58, 0.4)",
                  backgroundColor: isSelected ? "#A8683A" : "transparent",
                  color: isSelected ? "#FFFFFF" : "#5A3A22",
                  transition: "all 0.15s ease",
                }}
              >
                {dept.name} ({dept.products.length})
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div style={{ position: "relative", minWidth: "260px" }}>
          <input
            type="text"
            placeholder="Search by commodity, grade..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "4px",
              border: "1px solid rgba(168, 104, 58, 0.4)",
              backgroundColor: "#F6F0E4",
              color: "#1E130C",
              fontSize: "13px",
              outline: "none",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#5A3A22",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Catalog Results Grid */}
      {filteredProducts.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
            backgroundColor: "#EADFC9",
            borderRadius: "6px",
          }}
        >
          <p style={{ fontSize: "1.2rem", color: "#1E130C", marginBottom: "8px" }}>
            No commodities match your criteria.
          </p>
          <button
            onClick={() => {
              setSelectedDeptSlug("all");
              setSearchQuery("");
            }}
            style={{
              background: "#A8683A",
              color: "#FFFFFF",
              border: "none",
              padding: "8px 18px",
              borderRadius: "4px",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "28px",
          }}
        >
          {filteredProducts.map((prod) => (
            <div
              key={prod.slug}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "6px",
                border: "1px solid rgba(168, 104, 58, 0.22)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 18px rgba(30, 19, 12, 0.06)",
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
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    backgroundColor: "rgba(30, 19, 12, 0.85)",
                    color: "#C9935A",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "3px 8px",
                    borderRadius: "2px",
                  }}
                >
                  {prod.departmentName}
                </span>
                <span
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    right: "12px",
                    backgroundColor: "#A8683A",
                    color: "#FFFFFF",
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: "2px",
                  }}
                >
                  MOQ: {prod.specs.moq}
                </span>
              </div>

              {/* Content */}
              <div
                style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  backgroundColor: "#F6F0E4",
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                    fontSize: "1.45rem",
                    fontWeight: 700,
                    color: "#1E130C",
                    marginBottom: "10px",
                    lineHeight: 1.25,
                    minHeight: "56px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {prod.name}
                </h4>

                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#5A3A22",
                    lineHeight: 1.6,
                    marginBottom: "16px",
                    minHeight: "44px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {prod.shortDesc}
                </p>

                {/* Spec Chips */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginBottom: "20px",
                    minHeight: "32px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      backgroundColor: "#EADFC9",
                      color: "#1E130C",
                      padding: "4px 8px",
                      borderRadius: "3px",
                      border: "1px solid rgba(168,104,58,0.2)",
                    }}
                  >
                    Grade: {prod.specs.grade}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      backgroundColor: "#EADFC9",
                      color: "#1E130C",
                      padding: "4px 8px",
                      borderRadius: "3px",
                      border: "1px solid rgba(168,104,58,0.2)",
                    }}
                  >
                    Origin: {prod.specs.origin}
                  </span>
                </div>

                {/* Buttons */}
                <div style={{ marginTop: "auto", display: "flex", gap: "10px" }}>
                  <Link
                    href={`/products/${prod.slug}`}
                    style={{
                      flex: 1,
                      textAlign: "center",
                      padding: "10px 14px",
                      backgroundColor: "#1E130C",
                      color: "#F6F0E4",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      borderRadius: "3px",
                      textDecoration: "none",
                      transition: "background 0.15s ease",
                    }}
                  >
                    View Details
                  </Link>

                  <a
                    href={`https://wa.me/919655522111?text=${encodeURIComponent(`Hello Hilful Ventures, I would like to enquire about ${prod.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "10px 14px",
                      backgroundColor: "#A8683A",
                      color: "#FFFFFF",
                      fontSize: "12px",
                      fontWeight: 600,
                      borderRadius: "3px",
                      textDecoration: "none",
                      transition: "background 0.15s ease",
                    }}
                  >
                    Enquire
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
