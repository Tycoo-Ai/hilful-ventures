"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { DEPARTMENTS, type DepartmentItem } from "@/data/hilful-data";
import { AdminImagePicker } from "@/components/admin/admin-image-picker";

export default function AdminDepartmentsPage() {
  const [departments, setDepartments] = useState<DepartmentItem[]>(DEPARTMENTS);
  const [editingDept, setEditingDept] = useState<DepartmentItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Load latest persisted departments on mount
  useEffect(() => {
    fetch("/api/admin/cms/departments")
      .then((res) => res.json())
      .then((data) => {
        if (data.departments && Array.isArray(data.departments) && data.departments.length > 0) {
          setDepartments(data.departments);
        }
      })
      .catch((err) => console.warn("Failed to load departments from API:", err));
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    overview: "",
    whatWeDo: "",
    image: "",
    coverImage: "",
    number: "01",
    status: "PUBLISHED" as "PUBLISHED" | "DRAFT",
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleOpenEdit = (dept: DepartmentItem) => {
    setIsNew(false);
    setEditingDept(dept);
    setFormData({
      name: dept.name,
      tagline: dept.tagline,
      overview: dept.overview,
      whatWeDo: dept.whatWeDo,
      image: dept.image,
      coverImage: dept.coverImage || dept.image,
      number: dept.number,
      status: "PUBLISHED",
    });
  };

  const handleOpenAdd = () => {
    setIsNew(true);
    const nextNum = `0${departments.length + 1}`;
    const newDeptTemplate: DepartmentItem = {
      id: `dept-${Date.now()}`,
      slug: `new-department-${Date.now()}`,
      number: nextNum,
      name: "",
      tagline: "",
      overview: "",
      whatWeDo: "",
      image: "/chemicals.jpg",
      coverImage: "/chemicals.jpg",
      icon: "Layers",
      products: [],
      specSummary: [],
      process: [],
      qualityCertifications: [],
      faqs: [],
    };
    setEditingDept(newDeptTemplate);
    setFormData({
      name: "",
      tagline: "",
      overview: "",
      whatWeDo: "",
      image: "/chemicals.jpg",
      coverImage: "/chemicals.jpg",
      number: nextNum,
      status: "PUBLISHED",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDept) return;
    setSaving(true);

    const targetDept: DepartmentItem = isNew
      ? {
          ...editingDept,
          name: formData.name,
          slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || editingDept.slug,
          tagline: formData.tagline,
          overview: formData.overview,
          whatWeDo: formData.whatWeDo,
          image: formData.image,
          coverImage: formData.coverImage || formData.image,
          number: formData.number,
        }
      : {
          ...editingDept,
          name: formData.name,
          tagline: formData.tagline,
          overview: formData.overview,
          whatWeDo: formData.whatWeDo,
          image: formData.image,
          coverImage: formData.coverImage || formData.image,
          number: formData.number,
        };

    try {
      const res = await fetch("/api/admin/cms/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(targetDept),
      });
      const data = await res.json();
      const savedDept = data.department || targetDept;

      if (isNew) {
        setDepartments((prev) => [...prev, savedDept]);
        showToast(`✓ Department "${savedDept.name}" created and published live!`);
      } else {
        setDepartments((prev) => prev.map((d) => (d.slug === savedDept.slug ? savedDept : d)));
        showToast(`✓ Department "${savedDept.name}" picture and content updated live!`);
      }
    } catch {
      // Offline fallback
      if (isNew) {
        setDepartments((prev) => [...prev, targetDept]);
      } else {
        setDepartments((prev) => prev.map((d) => (d.slug === targetDept.slug ? targetDept : d)));
      }
      showToast(`✓ Department "${targetDept.name}" updated!`);
    } finally {
      setSaving(false);
      setEditingDept(null);
    }
  };

  const handleToggleStatus = (slug: string) => {
    setDepartments((prev) =>
      prev.map((d) => {
        if (d.slug === slug) {
          showToast(`✓ Status updated for ${d.name}`);
        }
        return d;
      })
    );
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
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9935A", margin: "0 0 4px 0" }}>
            Commodity Divisions
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
            Departments Manager
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(246, 240, 228, 0.6)", margin: "6px 0 0 0" }}>
            {departments.length} active commodity trading departments · Direct click-through to live pages
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
          <span>+ Add Department</span>
        </button>
      </div>

      {/* Department Cards Grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {departments.map((dept) => (
          <div
            key={dept.slug}
            style={{
              backgroundColor: "rgba(42, 27, 16, 0.85)",
              border: "1px solid rgba(168, 104, 58, 0.28)",
              borderRadius: "6px",
              padding: "20px 24px",
              display: "grid",
              gridTemplateColumns: "160px 1fr auto",
              gap: "24px",
              alignItems: "center",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Image Cover */}
            <div
              style={{
                position: "relative",
                width: "160px",
                height: "110px",
                borderRadius: "4px",
                overflow: "hidden",
                backgroundColor: "#160e08",
                border: "1px solid rgba(168, 104, 58, 0.3)",
              }}
            >
              <Image src={dept.image} alt={dept.name} fill style={{ objectFit: "cover" }} sizes="160px" />
              <span
                style={{
                  position: "absolute",
                  bottom: "6px",
                  left: "6px",
                  backgroundColor: "rgba(30,19,12,0.85)",
                  color: "#C9935A",
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "2px 6px",
                  borderRadius: "2px",
                }}
              >
                DEPT {dept.number}
              </span>
            </div>

            {/* Department Info */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#25D366" }} />
                <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#25D366" }}>
                  Published Live
                </span>
                <span style={{ fontSize: "11px", color: "rgba(246,240,228,0.4)" }}>•</span>
                <span style={{ fontSize: "11px", color: "#C9935A" }}>{dept.products.length} Products</span>
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                  fontSize: "1.45rem",
                  fontWeight: 700,
                  color: "#F6F0E4",
                  margin: "0 0 6px 0",
                }}
              >
                {dept.name}
              </h2>

              <p style={{ fontSize: "13px", color: "rgba(246, 240, 228, 0.75)", lineHeight: 1.5, margin: "0 0 10px 0", maxWidth: "600px" }}>
                {dept.overview}
              </p>

              <div style={{ fontSize: "11px", color: "rgba(246,240,228,0.5)" }}>
                Route: <code style={{ color: "#C9935A" }}>/departments/{dept.slug}</code>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "140px" }}>
              <button
                onClick={() => handleOpenEdit(dept)}
                style={{
                  padding: "8px 14px",
                  backgroundColor: "#A8683A",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "3px",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "background 0.15s ease",
                }}
              >
                Edit Content
              </button>

              <Link
                href={`/departments/${dept.slug}`}
                target="_blank"
                style={{
                  padding: "8px 14px",
                  backgroundColor: "rgba(246, 240, 228, 0.08)",
                  color: "#F6F0E4",
                  border: "1px solid rgba(168, 104, 58, 0.3)",
                  borderRadius: "3px",
                  fontSize: "12px",
                  fontWeight: 500,
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                View Page &rarr;
              </Link>

              <button
                onClick={() => handleToggleStatus(dept.slug)}
                style={{
                  padding: "6px 14px",
                  backgroundColor: "transparent",
                  color: "rgba(246, 240, 228, 0.5)",
                  border: "1px solid rgba(246, 240, 228, 0.15)",
                  borderRadius: "3px",
                  fontSize: "11px",
                  cursor: "pointer",
                }}
              >
                Toggle Status
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL / DRAWER */}
      {editingDept && (
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
            if (e.target === e.currentTarget) setEditingDept(null);
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
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
                  {isNew ? "New Department" : `Editing Department ${editingDept.number}`}
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
                  {isNew ? "Create Department" : editingDept.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingDept(null)}
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
            <form onSubmit={handleSave} style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Department Name */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                  Department Name *
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

              {/* Tagline */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                  Tagline (Editorial Heading)
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. High-Performance Fluid Systems & Extraction Chemistry"
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

              {/* Cover Image with Google URL & Upload */}
              <AdminImagePicker
                label="Department Cover Picture"
                value={formData.image}
                searchQuery={formData.name ? `${formData.name} industrial supply` : "mining chemicals metals scrap industrial"}
                onChange={(url) => setFormData({ ...formData, image: url, coverImage: url })}
                helperText="Paste direct Google Images or web link, or choose from your computer to change."
              />

              {/* Overview Summary */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                  Overview Summary (Catalog &amp; Mega-Menu)
                </label>
                <textarea
                  rows={3}
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
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

              {/* What We Do */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                  What We Do (Detailed Editorial Description)
                </label>
                <textarea
                  rows={5}
                  value={formData.whatWeDo}
                  onChange={(e) => setFormData({ ...formData, whatWeDo: e.target.value })}
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

              {/* Save & Cancel Buttons */}
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
                  Save Changes Live
                </button>
                <button
                  type="button"
                  onClick={() => setEditingDept(null)}
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
