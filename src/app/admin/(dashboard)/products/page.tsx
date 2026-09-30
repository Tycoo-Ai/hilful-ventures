"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { DEPARTMENTS, type ProductItem } from "@/data/hilful-data";
import { AdminImagePicker } from "@/components/admin/admin-image-picker";

const initialProducts = DEPARTMENTS.flatMap((d) => d.products);

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [filterDept, setFilterDept] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Load latest persisted products on mount
  useEffect(() => {
    fetch("/api/admin/cms/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.products && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.warn("Failed to load products from API:", err));
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    departmentSlug: "mining-drilling-chemicals",
    shortDesc: "",
    fullDesc: "",
    image: "/chemicals.jpg",
    grade: "",
    packaging: "",
    moq: "",
    origin: "",
    applicationsStr: "",
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const filtered = products.filter((p) => {
    const matchDept = filterDept === "all" || p.departmentSlug === filterDept;
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.specs.grade.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });

  const handleOpenEdit = (prod: ProductItem) => {
    setIsNew(false);
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      departmentSlug: prod.departmentSlug,
      shortDesc: prod.shortDesc,
      fullDesc: prod.fullDesc,
      image: prod.image,
      grade: prod.specs.grade,
      packaging: prod.specs.packaging,
      moq: prod.specs.moq,
      origin: prod.specs.origin,
      applicationsStr: prod.applications.join(", "),
    });
  };

  const handleOpenAdd = () => {
    setIsNew(true);
    const newProdTemplate: ProductItem = {
      id: `prod-${Date.now()}`,
      slug: `new-product-${Date.now()}`,
      name: "",
      departmentSlug: filterDept === "all" ? "mining-drilling-chemicals" : filterDept,
      departmentName: "Mining & Drilling Chemicals",
      shortDesc: "",
      fullDesc: "",
      image: "/chemicals.jpg",
      galleryImages: ["/chemicals.jpg"],
      specs: {
        name: "",
        grade: "",
        packaging: "",
        moq: "",
        origin: "India",
      },
      applications: [],
      qualityDocs: ["Certificate of Analysis (COA)", "Safety Data Sheet (SDS)"],
      shippingOptions: ["FOB", "CIF Global Gateway Ports"],
    };

    setEditingProduct(newProdTemplate);
    setFormData({
      name: "",
      departmentSlug: newProdTemplate.departmentSlug,
      shortDesc: "",
      fullDesc: "",
      image: "/chemicals.jpg",
      grade: "",
      packaging: "",
      moq: "20 Metric Tons",
      origin: "India",
      applicationsStr: "",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setSaving(true);

    const deptObj = DEPARTMENTS.find((d) => d.slug === formData.departmentSlug) || DEPARTMENTS[0];
    const appsList = formData.applicationsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const targetProd: ProductItem = isNew
      ? {
          ...editingProduct,
          name: formData.name,
          slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || editingProduct.slug,
          departmentSlug: deptObj.slug,
          departmentName: deptObj.name,
          shortDesc: formData.shortDesc,
          fullDesc: formData.fullDesc,
          image: formData.image,
          specs: {
            name: formData.name,
            grade: formData.grade,
            packaging: formData.packaging,
            moq: formData.moq,
            origin: formData.origin,
          },
          applications: appsList.length > 0 ? appsList : ["General industrial usage"],
        }
      : {
          ...editingProduct,
          name: formData.name,
          departmentSlug: deptObj.slug,
          departmentName: deptObj.name,
          shortDesc: formData.shortDesc,
          fullDesc: formData.fullDesc,
          image: formData.image,
          specs: {
            ...editingProduct.specs,
            grade: formData.grade,
            packaging: formData.packaging,
            moq: formData.moq,
            origin: formData.origin,
          },
          applications: appsList,
        };

    try {
      const res = await fetch("/api/admin/cms/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(targetProd),
      });
      const data = await res.json();
      const savedProd = data.product || targetProd;

      if (isNew) {
        setProducts((prev) => [savedProd, ...prev]);
        showToast(`✓ Commodity "${savedProd.name}" added to catalog live!`);
      } else {
        setProducts((prev) => prev.map((p) => (p.slug === savedProd.slug ? savedProd : p)));
        showToast(`✓ Product "${savedProd.name}" picture and specifications updated live!`);
      }
    } catch {
      if (isNew) {
        setProducts((prev) => [targetProd, ...prev]);
      } else {
        setProducts((prev) => prev.map((p) => (p.slug === targetProd.slug ? targetProd : p)));
      }
      showToast(`✓ Product "${targetProd.name}" updated!`);
    } finally {
      setSaving(false);
      setEditingProduct(null);
    }
  };

  const handleDelete = async (slug: string) => {
    if (confirm("Are you sure you want to remove this product from the live catalog?")) {
      try {
        await fetch("/api/admin/cms/products", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });
        setProducts((prev) => prev.filter((p) => p.slug !== slug));
        showToast("✓ Product removed from live catalog.");
      } catch {
        setProducts((prev) => prev.filter((p) => p.slug !== slug));
        showToast("✓ Product removed.");
      }
      setEditingProduct(null);
    }
  };

  return (
    <div style={{ maxWidth: "1150px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            backgroundColor: "#25D366",
            color: "#1E130C",
            fontWeight: 600,
            fontSize: "14px",
            padding: "14px 24px",
            borderRadius: "4px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            zIndex: 9999,
          }}
        >
          {toast}
        </div>
      )}

      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9935A", margin: "0 0 4px 0" }}>
            Catalog Management
          </p>
          <h1
            style={{
              fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
              fontSize: "2.4rem",
              fontWeight: 700,
              color: "#F6F0E4",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Products &amp; Commodities
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(246, 240, 228, 0.6)", margin: "6px 0 0 0" }}>
            {products.length} registered commodities across 4 departments · Full spec &amp; live preview control
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            backgroundColor: "#A8683A",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(168,104,58,0.3)",
          }}
        >
          <span>+ Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          backgroundColor: "#1E130C",
          padding: "14px 20px",
          borderRadius: "6px",
          border: "1px solid rgba(168, 104, 58, 0.25)",
        }}
      >
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            onClick={() => setFilterDept("all")}
            style={{
              padding: "7px 14px",
              fontSize: "12px",
              fontWeight: 600,
              borderRadius: "3px",
              backgroundColor: filterDept === "all" ? "#A8683A" : "transparent",
              color: "#F6F0E4",
              border: "1px solid rgba(168, 104, 58, 0.35)",
              cursor: "pointer",
            }}
          >
            All Departments ({products.length})
          </button>
          {DEPARTMENTS.map((d) => (
            <button
              key={d.slug}
              onClick={() => setFilterDept(d.slug)}
              style={{
                padding: "7px 14px",
                fontSize: "12px",
                fontWeight: 600,
                borderRadius: "3px",
                backgroundColor: filterDept === d.slug ? "#A8683A" : "transparent",
                color: "#F6F0E4",
                border: "1px solid rgba(168, 104, 58, 0.35)",
                cursor: "pointer",
              }}
            >
              {d.name}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Filter commodities, grades..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 14px",
            backgroundColor: "#160e08",
            border: "1px solid rgba(168, 104, 58, 0.4)",
            color: "#F6F0E4",
            fontSize: "13px",
            outline: "none",
            borderRadius: "3px",
            minWidth: "220px",
          }}
        />
      </div>

      {/* Products List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {filtered.map((prod) => (
          <div
            key={prod.slug}
            style={{
              backgroundColor: "rgba(42, 27, 16, 0.85)",
              border: "1px solid rgba(168, 104, 58, 0.25)",
              borderRadius: "6px",
              padding: "16px 20px",
              display: "grid",
              gridTemplateColumns: "130px 1fr 200px auto",
              gap: "20px",
              alignItems: "center",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
            }}
          >
            {/* Thumbnail */}
            <div
              style={{
                position: "relative",
                width: "130px",
                height: "85px",
                borderRadius: "4px",
                overflow: "hidden",
                backgroundColor: "#160e08",
                border: "1px solid rgba(168, 104, 58, 0.2)",
              }}
            >
              <Image src={prod.image} alt={prod.name} fill style={{ objectFit: "cover" }} sizes="130px" />
            </div>

            {/* Title & Info */}
            <div>
              <span style={{ fontSize: "10px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {prod.departmentName}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  color: "#F6F0E4",
                  margin: "3px 0 6px 0",
                  lineHeight: 1.2,
                }}
              >
                {prod.name}
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "rgba(246, 240, 228, 0.65)",
                  margin: 0,
                  maxWidth: "520px",
                  lineHeight: 1.4,
                }}
              >
                {prod.shortDesc}
              </p>
            </div>

            {/* Specs Summary */}
            <div style={{ fontSize: "12px", color: "rgba(246, 240, 228, 0.75)", display: "flex", flexDirection: "column", gap: "4px" }}>
              <div>MOQ: <strong style={{ color: "#F6F0E4" }}>{prod.specs.moq}</strong></div>
              <div>Grade: <span style={{ color: "#C9935A" }}>{prod.specs.grade}</span></div>
              <div style={{ fontSize: "11px", color: "rgba(246,240,228,0.45)" }}>Origin: {prod.specs.origin}</div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <button
                onClick={() => handleOpenEdit(prod)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#A8683A",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "3px",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <Link
                href={`/products/${prod.slug}`}
                target="_blank"
                style={{
                  padding: "6px 14px",
                  backgroundColor: "rgba(246, 240, 228, 0.08)",
                  color: "#F6F0E4",
                  border: "1px solid rgba(168, 104, 58, 0.3)",
                  borderRadius: "3px",
                  fontSize: "11px",
                  fontWeight: 500,
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                View Live &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "flex-end",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditingProduct(null);
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "640px",
              height: "100%",
              backgroundColor: "#1E130C",
              borderLeft: "1px solid rgba(168, 104, 58, 0.4)",
              color: "#F6F0E4",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              boxShadow: "-8px 0 32px rgba(0,0,0,0.6)",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "24px 28px",
                borderBottom: "1px solid rgba(168, 104, 58, 0.25)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#C9935A", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  {isNew ? "New Commodity" : "Edit Commodity"}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    margin: "4px 0 0 0",
                    color: "#F6F0E4",
                  }}
                >
                  {isNew ? "Add Product" : editingProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(246,240,228,0.7)",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Product Name */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    backgroundColor: "#160e08",
                    border: "1px solid rgba(168, 104, 58, 0.4)",
                    color: "#F6F0E4",
                    borderRadius: "4px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              {/* Department Dropdown */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                  Department *
                </label>
                <select
                  value={formData.departmentSlug}
                  onChange={(e) => setFormData({ ...formData, departmentSlug: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    backgroundColor: "#160e08",
                    border: "1px solid rgba(168, 104, 58, 0.4)",
                    color: "#F6F0E4",
                    borderRadius: "4px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d.slug} value={d.slug}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Short Description */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                  Short Description (Catalog Cards)
                </label>
                <textarea
                  rows={2}
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    backgroundColor: "#160e08",
                    border: "1px solid rgba(168, 104, 58, 0.4)",
                    color: "#F6F0E4",
                    borderRadius: "4px",
                    fontSize: "14px",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Grade & Packaging in 2 columns */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                    Grade Standard *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    placeholder="e.g. API Spec 13A"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      backgroundColor: "#160e08",
                      border: "1px solid rgba(168, 104, 58, 0.4)",
                      color: "#F6F0E4",
                      borderRadius: "4px",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                    Export Packaging
                  </label>
                  <input
                    type="text"
                    value={formData.packaging}
                    onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
                    placeholder="e.g. 25kg multi-wall bags"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      backgroundColor: "#160e08",
                      border: "1px solid rgba(168, 104, 58, 0.4)",
                      color: "#F6F0E4",
                      borderRadius: "4px",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* MOQ & Origin in 2 columns */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                    Minimum Order Qty (MOQ)
                  </label>
                  <input
                    type="text"
                    value={formData.moq}
                    onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                    placeholder="e.g. 20 Metric Tons"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      backgroundColor: "#160e08",
                      border: "1px solid rgba(168, 104, 58, 0.4)",
                      color: "#F6F0E4",
                      borderRadius: "4px",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                    Supply Origin
                  </label>
                  <input
                    type="text"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    placeholder="e.g. India / International"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      backgroundColor: "#160e08",
                      border: "1px solid rgba(168, 104, 58, 0.4)",
                      color: "#F6F0E4",
                      borderRadius: "4px",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Commodity Image with Google URL & Upload */}
              <AdminImagePicker
                label="Commodity Product Picture"
                value={formData.image}
                searchQuery={formData.name ? `${formData.name} industrial commodity` : "mining chemicals metal scrap iron ore mud chemicals quartz fly ash"}
                onChange={(url) => setFormData({ ...formData, image: url })}
                helperText="Paste direct Google Images or web link, or choose from your computer to change."
              />

              {/* Applications */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                  Applications (comma separated)
                </label>
                <textarea
                  rows={3}
                  value={formData.applicationsStr}
                  onChange={(e) => setFormData({ ...formData, applicationsStr: e.target.value })}
                  placeholder="e.g. Deep onshore drilling, Wellbore stabilization, Horizontal drilling"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    backgroundColor: "#160e08",
                    border: "1px solid rgba(168, 104, 58, 0.4)",
                    color: "#F6F0E4",
                    borderRadius: "4px",
                    fontSize: "14px",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "12px 20px",
                    backgroundColor: "#A8683A",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  Save Commodity Live
                </button>

                {!isNew && (
                  <button
                    type="button"
                    onClick={() => handleDelete(editingProduct.slug)}
                    style={{
                      padding: "12px 18px",
                      backgroundColor: "rgba(220, 38, 38, 0.2)",
                      color: "#f87171",
                      border: "1px solid #ef4444",
                      borderRadius: "4px",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  style={{
                    padding: "12px 20px",
                    backgroundColor: "transparent",
                    color: "#F6F0E4",
                    border: "1px solid rgba(168, 104, 58, 0.4)",
                    borderRadius: "4px",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
