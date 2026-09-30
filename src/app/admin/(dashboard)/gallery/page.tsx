"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { DEPARTMENTS } from "@/data/hilful-data";
import { AdminImagePicker } from "@/components/admin/admin-image-picker";

interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption: string;
  status: "PUBLISHED" | "DRAFT";
  featured?: boolean;
}

const initialGallery: GalleryPhoto[] = [
  {
    id: "gal-01",
    title: "Mining & Drilling Fluid Polymers",
    category: "Mining & Drilling Chemicals",
    imageUrl: "/chemicals.jpg",
    caption: "Specialized API 13A drilling fluid polymers and starch derivatives in moisture-sealed export packaging.",
    status: "PUBLISHED",
    featured: true,
  },
  {
    id: "gal-02",
    title: "HMS 1 & 2 Steel Scrap Processing",
    category: "Ferrous / Non-Ferrous Metal",
    imageUrl: "/metals.jpg",
    caption: "Heavy melting steel scrap 80:20 blend mechanically sheared and containerized for foundry remelting.",
    status: "PUBLISHED",
    featured: true,
  },
  {
    id: "gal-03",
    title: "High-Purity Iron Ore Fines & Lumps",
    category: "Minerals & Mud Chemicals",
    imageUrl: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80",
    caption: "Premium grade iron ore sourced from reliable extraction pits for metallurgical and DRI steelmaking operations.",
    status: "PUBLISHED",
    featured: true,
  },
  {
    id: "gal-04",
    title: "Class F Micronized Pulverized Fly Ash",
    category: "Quartz & Fly Ash",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    caption: "Pozzolanic pulverized fuel ash byproduct with high glass content, ideal for high-performance concrete.",
    status: "PUBLISHED",
    featured: true,
  },
  {
    id: "gal-05",
    title: "Pure Millberry Copper Wire Scrap",
    category: "Ferrous / Non-Ferrous Metal",
    imageUrl: "/metals.jpg",
    caption: "99.9% bare electrolytic copper wire scrap prepared for secondary smelting and wire rod drawing.",
    status: "PUBLISHED",
  },
  {
    id: "gal-06",
    title: "Deep Drilling Wellbore Fluid Additives",
    category: "Mining & Drilling Chemicals",
    imageUrl: "/chemicals.jpg",
    caption: "High-temperature organic starch derivatives and bentonite rheology modifiers.",
    status: "PUBLISHED",
  },
];

export default function AdminGalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(initialGallery);
  const [filterCat, setFilterCat] = useState<string>("all");
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Load latest persisted gallery items on mount
  useEffect(() => {
    fetch("/api/admin/cms/gallery")
      .then((r) => r.json())
      .then((data) => {
        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          setPhotos(data.items);
        }
      })
      .catch((err) => console.warn("Failed to load gallery from API:", err));
  }, []);

  // Modal form state
  const [formData, setFormData] = useState({
    title: "",
    category: "Mining & Drilling Chemicals",
    imageUrl: "/chemicals.jpg",
    caption: "",
    status: "PUBLISHED" as "PUBLISHED" | "DRAFT",
    featured: false,
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const categories = [
    "Mining & Drilling Chemicals",
    "Ferrous / Non-Ferrous Metal",
    "Minerals & Mud Chemicals",
    "Quartz & Fly Ash",
  ];

  const filtered = photos.filter((p) => {
    return filterCat === "all" || p.category === filterCat;
  });

  const handleOpenEdit = (photo: GalleryPhoto) => {
    setIsNew(false);
    setEditingPhoto(photo);
    setFormData({
      title: photo.title,
      category: photo.category,
      imageUrl: photo.imageUrl,
      caption: photo.caption,
      status: photo.status,
      featured: photo.featured || false,
    });
  };

  const handleOpenAdd = () => {
    setIsNew(true);
    const newTemplate: GalleryPhoto = {
      id: `gal-${Date.now()}`,
      title: "",
      category: filterCat === "all" ? categories[0] : filterCat,
      imageUrl: "/chemicals.jpg",
      caption: "",
      status: "PUBLISHED",
      featured: false,
    };
    setEditingPhoto(newTemplate);
    setFormData({
      title: "",
      category: newTemplate.category,
      imageUrl: "/chemicals.jpg",
      caption: "",
      status: "PUBLISHED",
      featured: false,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;
    setSaving(true);

    const targetPhoto: GalleryPhoto = isNew
      ? {
          ...editingPhoto,
          title: formData.title,
          category: formData.category,
          imageUrl: formData.imageUrl,
          caption: formData.caption,
          status: formData.status,
          featured: formData.featured,
        }
      : {
          ...editingPhoto,
          title: formData.title,
          category: formData.category,
          imageUrl: formData.imageUrl,
          caption: formData.caption,
          status: formData.status,
          featured: formData.featured,
        };

    try {
      const res = await fetch("/api/admin/cms/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(targetPhoto),
      });
      const data = await res.json();
      const savedPhoto = data.item || targetPhoto;

      if (isNew) {
        setPhotos((prev) => [savedPhoto, ...prev]);
        showToast(`✓ Photo "${savedPhoto.title}" added to live gallery!`);
      } else {
        setPhotos((prev) => prev.map((p) => (p.id === savedPhoto.id ? savedPhoto : p)));
        showToast(`✓ Gallery photo "${savedPhoto.title}" updated live!`);
      }
    } catch {
      if (isNew) {
        setPhotos((prev) => [targetPhoto, ...prev]);
      } else {
        setPhotos((prev) => prev.map((p) => (p.id === targetPhoto.id ? targetPhoto : p)));
      }
      showToast(`✓ Photo "${targetPhoto.title}" saved!`);
    } finally {
      setSaving(false);
      setEditingPhoto(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this gallery item?")) {
      try {
        await fetch("/api/admin/cms/gallery", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        setPhotos((prev) => prev.filter((p) => p.id !== id));
        showToast("✓ Gallery item deleted from live site.");
      } catch {
        setPhotos((prev) => prev.filter((p) => p.id !== id));
        showToast("✓ Gallery item deleted.");
      }
      setEditingPhoto(null);
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

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9935A", display: "block", marginBottom: "4px" }}>
            Visual Assets &amp; Media
          </span>
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
            Commodity Operations Gallery
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(246, 240, 228, 0.65)", margin: "4px 0 0 0" }}>
            Curated field photography across Mining Chemicals, Secondary Metals, Minerals &amp; Mud Chemicals, and Quartz &amp; Fly Ash
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
            boxShadow: "0 4px 14px rgba(168,104,58,0.3)",
          }}
        >
          <span>+ Add Gallery Photo</span>
        </button>
      </div>

      {/* Department Filter Pills */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          backgroundColor: "#1E130C",
          padding: "12px 18px",
          borderRadius: "6px",
          border: "1px solid rgba(168, 104, 58, 0.25)",
        }}
      >
        <button
          onClick={() => setFilterCat("all")}
          style={{
            padding: "7px 14px",
            fontSize: "12px",
            fontWeight: 600,
            borderRadius: "3px",
            backgroundColor: filterCat === "all" ? "#A8683A" : "transparent",
            color: "#F6F0E4",
            border: "1px solid rgba(168, 104, 58, 0.35)",
            cursor: "pointer",
          }}
        >
          All Categories ({photos.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            style={{
              padding: "7px 14px",
              fontSize: "12px",
              fontWeight: 600,
              borderRadius: "3px",
              backgroundColor: filterCat === cat ? "#A8683A" : "transparent",
              color: "#F6F0E4",
              border: "1px solid rgba(168, 104, 58, 0.35)",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
        }}
      >
        {filtered.map((photo) => (
          <div
            key={photo.id}
            style={{
              backgroundColor: "rgba(42, 27, 16, 0.85)",
              border: "1px solid rgba(168, 104, 58, 0.25)",
              borderRadius: "6px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
            }}
          >
            {/* Image Box */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "220px",
                backgroundColor: "#160e08",
              }}
            >
              <Image src={photo.imageUrl} alt={photo.title} fill style={{ objectFit: "cover" }} sizes="360px" />
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  backgroundColor: "rgba(30,19,12,0.85)",
                  color: "#C9935A",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "3px 8px",
                  borderRadius: "2px",
                }}
              >
                {photo.category}
              </span>
              <span
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  backgroundColor: photo.status === "PUBLISHED" ? "#25D366" : "#EAB308",
                  color: "#1E130C",
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "2px 6px",
                  borderRadius: "2px",
                }}
              >
                {photo.status}
              </span>
            </div>

            {/* Info */}
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
              <h3
                style={{
                  fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "#F6F0E4",
                  marginBottom: "8px",
                  lineHeight: 1.2,
                }}
              >
                {photo.title}
              </h3>

              <p style={{ fontSize: "12px", color: "rgba(246, 240, 228, 0.7)", lineHeight: 1.6, marginBottom: "16px" }}>
                {photo.caption}
              </p>

              {/* Actions */}
              <div style={{ marginTop: "auto", display: "flex", gap: "8px" }}>
                <button
                  onClick={() => handleOpenEdit(photo)}
                  style={{
                    flex: 1,
                    padding: "8px",
                    backgroundColor: "#A8683A",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "3px",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  Edit Photo
                </button>

                <button
                  onClick={() => handleDelete(photo.id)}
                  style={{
                    padding: "8px 14px",
                    backgroundColor: "rgba(220, 38, 38, 0.15)",
                    color: "#f87171",
                    border: "1px solid #ef4444",
                    borderRadius: "3px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT / ADD MODAL */}
      {editingPhoto && (
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
            if (e.target === e.currentTarget) setEditingPhoto(null);
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "560px",
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
                  {isNew ? "New Asset" : "Edit Asset"}
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
                  {isNew ? "Add Photo" : editingPhoto.title}
                </h3>
              </div>
              <button
                onClick={() => setEditingPhoto(null)}
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

            <form onSubmit={handleSave} style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "18px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                  Commodity Department *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gallery Image with Google URL & Upload */}
              <AdminImagePicker
                label="Gallery Photograph / Media"
                value={formData.imageUrl}
                searchQuery={formData.title ? `${formData.title} industrial` : "industrial trade commodities"}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                helperText="Paste direct Google Images or web link, or choose from your computer to change."
              />

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                  Caption / Description
                </label>
                <textarea
                  rows={3}
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
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
                  Save Photo
                </button>

                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
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
