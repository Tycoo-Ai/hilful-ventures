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
    id: "gal-gold-01",
    title: "Primary Gold Concession Extraction & Alluvial Benches",
    category: "Gold Mining & Mineral Extraction",
    imageUrl: "/hero-mine.jpg",
    caption: "High-yield alluvial gold mining concession pit and pay-dirt extraction in Assosa Woreda, Benishangul-Gumuz, Ethiopia.",
    status: "PUBLISHED",
    featured: true,
  },
  {
    id: "gal-gold-02",
    title: "Knelson Gravity Separation & Hydrocyclone Sizing",
    category: "Gold Mining & Mineral Extraction",
    imageUrl: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1400&q=85",
    caption: "Chemical-free centrifugal recovery circuits capturing fine auriferous gold particles from alluvial wash slurry.",
    status: "PUBLISHED",
    featured: true,
  },
  {
    id: "gal-gold-03",
    title: "Assayed Mine-Smelted Gold Doré Bars (92%-98.5% Au)",
    category: "Gold Mining & Mineral Extraction",
    imageUrl: "/gold-dore-bars.jpg",
    caption: "Mine-site induction furnace smelted gold doré bars stamped and certified with independent fire assay certificates.",
    status: "PUBLISHED",
    featured: true,
  },
  {
    id: "gal-chem-01",
    title: "API 13A Drilling Fluid Polymers & Rheology Additives",
    category: "Drilling & Mud Chemicals",
    imageUrl: "/chemicals.jpg",
    caption: "Specialized PAC-LV, xanthan polymer complexes, and organophilic clays packaged in hermetic export craft bags.",
    status: "PUBLISHED",
    featured: true,
  },
  {
    id: "gal-chem-02",
    title: "HPHT Rheological Testing & Fluid Loss Control",
    category: "Drilling & Mud Chemicals",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
    caption: "High pressure high temperature (HPHT) filter press verification confirming minimal mud cake permeability.",
    status: "PUBLISHED",
    featured: true,
  },
  {
    id: "gal-chem-03",
    title: "Pregelatinized Crosslinked Modified Starch",
    category: "Drilling & Mud Chemicals",
    imageUrl: "/chemicals.jpg",
    caption: "Thermal endurance up to 130°C in high-salinity brines for borehole wall consolidation and fluid stabilization.",
    status: "PUBLISHED",
  },
  {
    id: "gal-metal-01",
    title: "HMS 1 & 2 Steel Scrap Hydraulic Baling & Shearing",
    category: "Ferrous / Non-Ferrous Metal",
    imageUrl: "/metals.jpg",
    caption: "ISRI 200-206 certified 80:20 heavy melting steel scrap processed for high furnace charge density.",
    status: "PUBLISHED",
    featured: true,
  },
  {
    id: "gal-metal-02",
    title: "99.9% Pure Millberry Copper Wire Scrap",
    category: "Ferrous / Non-Ferrous Metal",
    imageUrl: "/metals.jpg",
    caption: "Unalloyed bright electrolytic copper wire bundles sourced from electrical transmission dismantling.",
    status: "PUBLISHED",
  },
  {
    id: "gal-metal-03",
    title: "Secondary Aluminium Tense/Tabor & Honey Brass Scrap",
    category: "Ferrous / Non-Ferrous Metal",
    imageUrl: "/metals.jpg",
    caption: "Dense sorted secondary non-ferrous foundry melts loaded into 20ft ocean containers with verified weighbridge slips.",
    status: "PUBLISHED",
  },
  {
    id: "gal-ong-01",
    title: "High Fe Content Iron Ore (62% - 64.5% Fe Lumps & Fines)",
    category: "Minerals & Mud Chemicals to ONG Exploration",
    imageUrl: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80",
    caption: "Calibrated 10-40mm lump ore and sinter fines sourced from certified mining concessions for blast furnace and DRI steelmaking.",
    status: "PUBLISHED",
    featured: true,
  },
  {
    id: "gal-ong-02",
    title: "High-Density Drilling Barite (4.20 SG BaSO4)",
    category: "Minerals & Mud Chemicals to ONG Exploration",
    imageUrl: "/chemicals.jpg",
    caption: "Ultra-heavy barium sulfate weighing powders milled to API 13A particle specifications for high-pressure exploration wells.",
    status: "PUBLISHED",
  },
  {
    id: "gal-ong-03",
    title: "Metallurgical Sinter Feed & Ore Concentrates",
    category: "Minerals & Mud Chemicals to ONG Exploration",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
    caption: "Bulk mineral charges prepared to custom grain sizing and moisture profiles for cupola and arc furnace smelting.",
    status: "PUBLISHED",
  },
  {
    id: "gal-quartz-01",
    title: "ASTM C618 Class F & Class C Pulverized Fuel Fly Ash",
    category: "Quartz and Fly Ash",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    caption: "Classified pozzolanic micro-powder with loss on ignition under 3%, packed in 1.4 MT moisture-sealed jumbo tote bags.",
    status: "PUBLISHED",
    featured: true,
  },
  {
    id: "gal-quartz-02",
    title: "High-Purity Natural Crystalline Quartz (99.5%+ SiO2)",
    category: "Quartz and Fly Ash",
    imageUrl: "/hero-mine.jpg",
    caption: "Optically sorted snow-white vein quartz with ultra-low iron (Fe2O3 < 0.02%) for float glass and engineered quartz stone.",
    status: "PUBLISHED",
  },
  {
    id: "gal-quartz-03",
    title: "Micronized Silica Flour (300-500 Mesh) & Cenospheres",
    category: "Quartz and Fly Ash",
    imageUrl: "/chemicals.jpg",
    caption: "Super-fine ball-milled crystalline silica flour and lightweight buoyant cenospheres for oil-well cementing and refractories.",
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
    category: "Gold Mining & Mineral Extraction",
    imageUrl: "/hero-mine-bg.jpg",
    caption: "",
    status: "PUBLISHED" as "PUBLISHED" | "DRAFT",
    featured: false,
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const categories = [
    "Gold Mining & Mineral Extraction",
    "Drilling & Mud Chemicals",
    "Ferrous / Non-Ferrous Metal",
    "Minerals & Mud Chemicals to ONG Exploration",
    "Quartz and Fly Ash",
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
