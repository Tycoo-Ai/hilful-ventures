"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AdminImagePicker } from "@/components/admin/admin-image-picker";
import type { MiningSiteItem } from "@/lib/cms/cms-service";

const initialSites: MiningSiteItem[] = [
  {
    id: "site-assosa-01",
    title: "Assosa Placer & Hard-Rock Concession Hub",
    country: "Ethiopia",
    region: "Benishangul-Gumuz Region (Blue Nile Basin)",
    type: "ACTIVE_OPERATING",
    category: "Gold Mining & Extraction",
    mineralScope: "Alluvial Gold, Placer Pay-Dirt, Auriferous Quartz Veins (92% - 98.5% Au)",
    status: "ACTIVE",
    statusBadge: "Direct Hilful Active Concession",
    description: "Primary open-pit alluvial excavation and mineral recovery concession operating under direct Hilful field management. Features active hydraulic excavator benches, Knelson gravity concentrators, multi-tier wash plants, and an on-site induction furnace with certified fire assay verification.",
    imageUrl: "/hero-mine.jpg",
    coordinates: "10.0667° N, 34.5333° E",
    keyMetrics: {
      scaleOrArea: "140 Hectares Direct Concession",
      processingCapacity: "850 Metric Tons/Day Slurry Throughput",
      logisticsRoute: "Direct Armored Escort to National Bank Vaults / Addis Ababa Gateway",
      assayIntegrity: "Certified Fire Assay + Serialized Stamp Bar System",
    },
    operationalHighlights: [
      "100% chemical-free primary gravity extraction via centrifugal hydrocyclones",
      "On-site security perimeter and Brink's/Malca-Amit compliant chain of custody",
      "Direct smelter casting of 1kg and 5kg unrefined gold doré bars",
      "Full compliance with Ministry of Mines & Energy environmental covenants",
    ],
    sortOrder: 1,
  },
  {
    id: "site-dima-02",
    title: "Dima & Akobo River Basin Alluvial Benches",
    country: "Ethiopia",
    region: "Gambela & South-West Alluvial Corridor",
    type: "ACTIVE_OPERATING",
    category: "Gold Mining & Extraction",
    mineralScope: "High-Yield Auriferous Gravels & Coarse Gravity Concentrates",
    status: "ACTIVE",
    statusBadge: "Active Field Operation",
    description: "Continuous alluvial mining and river terrace gravel processing operation. Deploys heavy-duty submersible slurry pumps and mechanical trommel screens to capture coarse placer gold particles from deep alluvial horizons.",
    imageUrl: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1400&q=85",
    coordinates: "7.5333° N, 35.1667° E",
    keyMetrics: {
      scaleOrArea: "85 Hectares Riverine Concession",
      processingCapacity: "500 Metric Tons/Day Wash Capacity",
      logisticsRoute: "Secure Regional Hub to Central Bank Custody",
      assayIntegrity: "XRF Spectral Density & Fire Assay Cross-Verification",
    },
    operationalHighlights: [
      "Heavy trommel sizing with multi-stage sluice riffles and rubber matting",
      "Coarse free-gold recovery without toxic chemical leaching",
      "Dedicated mechanical repair shop for continuous Caterpillar/Komatsu uptime",
      "Local community watershed preservation and tailing settling basins",
    ],
    sortOrder: 2,
  },
  {
    id: "site-oromia-04",
    title: "Nejo & Guji Mining Cooperatives Modernization",
    country: "Ethiopia",
    region: "Oromia Regional State (Nejo & Shakiso Belts)",
    type: "ASSISTING_PARTNER",
    category: "Technical Advisory & Equipment Leasing",
    mineralScope: "Alluvial Gold, Artisanal Pay-Dirt Beneficiation, Gravity Feed",
    status: "IN_PROGRESS",
    statusBadge: "Technical Assistance Operation",
    description: "Hilful Ventures provides technical engineering assistance, high-efficiency equipment leasing (excavators, high-bankers, shaking tables), and environmental remediation oversight to licensed artisanal mining cooperatives, replacing toxic practices with mechanized gravity recovery.",
    imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=85",
    coordinates: "9.5000° N, 35.5000° E",
    keyMetrics: {
      scaleOrArea: "Assisting 12 Licensed Cooperatives (650+ Artisanal Miners)",
      processingCapacity: "Aggregate > 1,200 MT/Day Assisted Pay-Dirt",
      logisticsRoute: "Regional Aggregation Centers to Authorized Gold Desks",
      assayIntegrity: "Mercury-Free Verified Extraction Protocols",
    },
    operationalHighlights: [
      "Leasing and field maintenance for heavy hydraulic excavators and dumpers",
      "Implementation of Gemini shaking tables boosting gold recovery from 35% to 85%",
      "Complete elimination of mercury through clean physical gravity separation",
      "Formal commercial off-take agreements providing transparent market rates",
    ],
    sortOrder: 4,
  },
  {
    id: "site-sudan-06",
    title: "Red Sea State & Nile Basin Mineral Corridor",
    country: "Sudan",
    region: "Red Sea Hills & Northern River Nile Mining Districts",
    type: "FEASIBLE_EXPANSION",
    category: "Mineral Exploration & Sovereign Corridor",
    mineralScope: "Gold Doré Aggregation, Placer Processing, Heavy Equipment Deployment",
    status: "LICENSED",
    statusBadge: "Bilateral Commercial Framework",
    description: "Established cross-border trade relationships and licensing readiness for equipment leasing, secondary mineral processing, and secure gold trading corridors between Port Sudan, Khartoum, and regional trading terminals.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
    coordinates: "19.6167° N, 37.2167° E",
    keyMetrics: {
      scaleOrArea: "Red Sea Mining Corridor",
      processingCapacity: "Custom Plant Engineering & Mobile Scalability",
      logisticsRoute: "Port Sudan Maritime Route / Armored Air Freight",
      assayIntegrity: "Standardized Sovereign Customs & Assay Oversight",
    },
    operationalHighlights: [
      "Direct supply of API drilling polymers to energy exploration operators",
      "Turnkey mobile washing plant delivery and operator training",
      "Licensed bullion settlement and vault logistics infrastructure",
      "Cross-border clearance capability via bilateral trade agreements",
    ],
    sortOrder: 6,
  },
  {
    id: "site-india-07",
    title: "Tamil Nadu Global Trade Desk & Refining Gateway",
    country: "India",
    region: "Chennai Port Corridor & Industrial Petrochemical Hub",
    type: "FEASIBLE_EXPANSION",
    category: "Chemical Refining, Metal Scrap & Fly Ash Logistics",
    mineralScope: "Drilling Mud Chemicals, HMS 1&2 Scrap, Quartz Silica, ASTM Fly Ash",
    status: "ACTIVE",
    statusBadge: "Global Operating Headquarters",
    description: "Hilful's corporate commercial engine and chemical compounding coordination headquarters. Manages global procurement, laboratory quality compliance, containerized ocean logistics (FOB Chennai / Nhava Sheva / CIF Global Ports), and secondary metal dismantling operations.",
    imageUrl: "/metals.jpg",
    coordinates: "13.0827° N, 80.2707° E",
    keyMetrics: {
      scaleOrArea: "Centralized Global Trade Headquarters & Logistics Desks",
      processingCapacity: "Over 50,000 MT/Year Multi-Commodity Trade Flow",
      logisticsRoute: "Port of Chennai, Ennore, Kamarajar & Nhava Sheva",
      assayIntegrity: "NABL Accredited Third-Party Assays (SGS / Bureau Veritas)",
    },
    operationalHighlights: [
      "Central trade desk connecting East Africa, Middle East, and Asia",
      "Bulk containerization and bulk vessel chartering for mineral exports",
      "Strict compliance with Indian Customs, DGFT, and international Incoterms 2020",
      "Chemical laboratory formulation and ASTM / API standard certification",
    ],
    sortOrder: 7,
  },
  {
    id: "site-uae-08",
    title: "Dubai Multi Commodities (DMCC) Vault & Trading Desk",
    country: "United Arab Emirates",
    region: "Dubai DMCC Bullion & Energy Financial Center",
    type: "FEASIBLE_EXPANSION",
    category: "Precious Metals Bullion Settlement & Energy Trading",
    mineralScope: "Assayed Gold Bullion (999.9 Good Delivery), Petroleum Hydrocarbons",
    status: "AVAILABLE_FOR_PARTNERSHIP",
    statusBadge: "Financial & Bullion Gateway",
    description: "Institutional commercial gateway for secondary precious metal refining, vault-to-vault settlement, LBMA Good Delivery conversion, and Middle Eastern petrochemical distribution. Serves capital partners, family offices, and sovereign wealth investors.",
    imageUrl: "/gold-dore-bars.jpg",
    coordinates: "25.0772° N, 55.1403° E",
    keyMetrics: {
      scaleOrArea: "DMCC Free Zone Commercial Corridor",
      processingCapacity: "Institutional Bullion Settlement & Escrow Delivery",
      logisticsRoute: "Secured Armored Air Transits (Brink's / Transguard / Malca-Amit)",
      assayIntegrity: "OECD Compliant Due Diligence & LBMA Certified Refineries",
    },
    operationalHighlights: [
      "Direct delivery to DMCC accredited refineries for 99.99% purity conversion",
      "Secure escrow commercial contracts and documentary letters of credit (LC)",
      "Investor verification room for bullion custody and origin chain documentation",
      "Regional base for East African and GCC commodity flows",
    ],
    sortOrder: 8,
  },
];

export default function AdminMiningSitesPage() {
  const [sites, setSites] = useState<MiningSiteItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const local = localStorage.getItem("hilful_cms_mining_sites");
        if (local) {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch {}
    }
    return initialSites;
  });
  const [filterType, setFilterType] = useState<string>("all");
  const [editingSite, setEditingSite] = useState<MiningSiteItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let localHasCustom = false;
    let localData: MiningSiteItem[] = [];

    // 1. Load from localStorage first for zero-latency instant rendering of user edits
    try {
      const local = localStorage.getItem("hilful_cms_mining_sites");
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          localData = parsed;
          setSites(parsed);
          localHasCustom = true;
        }
      }
    } catch {}

    // 2. Fetch from cloud / API to sync latest server changes
    fetch("/api/admin/cms/mining-sites")
      .then((r) => r.json())
      .then((data) => {
        if (data.sites && Array.isArray(data.sites) && data.sites.length > 0) {
          // If server fell back to defaults because Cloudinary was momentarily slow,
          // but browser already has user's custom edits in localStorage, DO NOT revert!
          // Instead, self-heal the server by syncing the user's edits back up!
          if (data.source === "default" && localHasCustom && localData.length > 0) {
            console.log("[CMS] Server returned default fallback; auto-healing server with local edits...");
            fetch("/api/admin/cms/mining-sites", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ allSites: localData }),
            }).catch(() => {});
            return;
          }

          setSites(data.sites);
          try {
            localStorage.setItem("hilful_cms_mining_sites", JSON.stringify(data.sites));
          } catch {}
        }
      })
      .catch((err) => console.warn("Failed to load mining sites from API:", err));

    // 3. Listen to cross-tab BroadcastChannel
    try {
      if (typeof BroadcastChannel !== "undefined") {
        const bc = new BroadcastChannel("hilful_cms_channel");
        bc.onmessage = (event) => {
          if (event.data?.type === "MINING_SITES_UPDATED" && Array.isArray(event.data?.data)) {
            setSites(event.data.data);
          }
        };
        return () => bc.close();
      }
    } catch {}
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    country: "Ethiopia",
    region: "",
    type: "ACTIVE_OPERATING" as MiningSiteItem["type"],
    category: "Gold Mining & Extraction",
    mineralScope: "",
    status: "ACTIVE" as MiningSiteItem["status"],
    statusBadge: "Active Concession",
    description: "",
    imageUrl: "/hero-mine.jpg",
    coordinates: "",
    scaleOrArea: "",
    processingCapacity: "",
    logisticsRoute: "",
    assayIntegrity: "",
    highlightsStr: "",
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const filtered = sites.filter((s) => {
    return filterType === "all" || s.type === filterType;
  });

  const handleOpenEdit = (site: MiningSiteItem) => {
    setIsNew(false);
    setEditingSite(site);
    setFormData({
      title: site.title,
      country: site.country,
      region: site.region,
      type: site.type,
      category: site.category,
      mineralScope: site.mineralScope,
      status: site.status,
      statusBadge: site.statusBadge,
      description: site.description,
      imageUrl: site.imageUrl,
      coordinates: site.coordinates || "",
      scaleOrArea: site.keyMetrics?.scaleOrArea || "",
      processingCapacity: site.keyMetrics?.processingCapacity || "",
      logisticsRoute: site.keyMetrics?.logisticsRoute || "",
      assayIntegrity: site.keyMetrics?.assayIntegrity || "",
      highlightsStr: (site.operationalHighlights || []).join("\n"),
    });
  };

  const handleOpenAdd = () => {
    setIsNew(true);
    const newTemplate: MiningSiteItem = {
      id: `site-${Date.now()}`,
      title: "",
      country: "Ethiopia",
      region: "",
      type: "ACTIVE_OPERATING",
      category: "Gold Mining & Extraction",
      mineralScope: "Alluvial Gold & Mineral Extraction",
      status: "ACTIVE",
      statusBadge: "Active Field Concession",
      description: "",
      imageUrl: "/hero-mine.jpg",
      coordinates: "",
      keyMetrics: {
        scaleOrArea: "",
        processingCapacity: "",
        logisticsRoute: "",
        assayIntegrity: "",
      },
      operationalHighlights: [],
      sortOrder: sites.length + 1,
    };
    setEditingSite(newTemplate);
    setFormData({
      title: "",
      country: "Ethiopia",
      region: "",
      type: "ACTIVE_OPERATING",
      category: "Gold Mining & Extraction",
      mineralScope: "Alluvial Gold & Mineral Extraction",
      status: "ACTIVE",
      statusBadge: "Active Field Concession",
      description: "",
      imageUrl: "/hero-mine.jpg",
      coordinates: "",
      scaleOrArea: "",
      processingCapacity: "",
      logisticsRoute: "",
      assayIntegrity: "",
      highlightsStr: "",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSite) return;
    setSaving(true);

    const highlights = formData.highlightsStr
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const targetSite: MiningSiteItem = {
      ...editingSite,
      title: formData.title,
      country: formData.country,
      region: formData.region,
      type: formData.type,
      category: formData.category,
      mineralScope: formData.mineralScope,
      status: formData.status,
      statusBadge: formData.statusBadge,
      description: formData.description,
      imageUrl: formData.imageUrl,
      coordinates: formData.coordinates,
      keyMetrics: {
        scaleOrArea: formData.scaleOrArea,
        processingCapacity: formData.processingCapacity,
        logisticsRoute: formData.logisticsRoute,
        assayIntegrity: formData.assayIntegrity,
      },
      operationalHighlights: highlights,
    };

    let nextSites: MiningSiteItem[];
    if (isNew) {
      nextSites = [targetSite, ...sites];
    } else {
      nextSites = sites.map((s) => (s.id === targetSite.id ? targetSite : s));
    }
    setSites(nextSites);

    // Save to localStorage immediately so user edits are NEVER lost
    try {
      localStorage.setItem("hilful_cms_mining_sites", JSON.stringify(nextSites));
      if (typeof BroadcastChannel !== "undefined") {
        const bc = new BroadcastChannel("hilful_cms_channel");
        bc.postMessage({ type: "MINING_SITES_UPDATED", data: nextSites });
        bc.close();
      }
    } catch {}

    try {
      const res = await fetch("/api/admin/cms/mining-sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site: targetSite, allSites: nextSites }),
      });
      const data = await res.json();
      if (data.sites && Array.isArray(data.sites)) {
        setSites(data.sites);
        try {
          localStorage.setItem("hilful_cms_mining_sites", JSON.stringify(data.sites));
        } catch {}
      } else if (data.site) {
        const updatedWithServer = nextSites.map((s) => (s.id === data.site.id ? data.site : s));
        setSites(updatedWithServer);
        try {
          localStorage.setItem("hilful_cms_mining_sites", JSON.stringify(updatedWithServer));
        } catch {}
      }
      showToast(`✓ Site "${targetSite.title}" saved live to cloud & portal!`);
    } catch {
      showToast(`✓ Site "${targetSite.title}" saved locally.`);
    } finally {
      setSaving(false);
      setEditingSite(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this mining site / concession?")) {
      const nextSites = sites.filter((s) => s.id !== id);
      setSites(nextSites);

      try {
        localStorage.setItem("hilful_cms_mining_sites", JSON.stringify(nextSites));
        if (typeof BroadcastChannel !== "undefined") {
          const bc = new BroadcastChannel("hilful_cms_channel");
          bc.postMessage({ type: "MINING_SITES_UPDATED", data: nextSites });
          bc.close();
        }
      } catch {}

      try {
        await fetch("/api/admin/cms/mining-sites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ allSites: nextSites }),
        });
        showToast("✓ Site deleted from live portal.");
      } catch {
        showToast("✓ Site deleted locally.");
      }
      setEditingSite(null);
    }
  };

  const getTypeLabel = (type: MiningSiteItem["type"]) => {
    switch (type) {
      case "ACTIVE_OPERATING":
        return "Sites We Are Working On (Active Operating)";
      case "ASSISTING_PARTNER":
        return "Sites We Are Assisting (Technical Partnerships)";
      case "FEASIBLE_EXPANSION":
        return "Sites & Countries We Can Operate In (Eligible Scope)";
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
            boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
            zIndex: 9999,
          }}
        >
          {toast}
        </div>
      )}

      {/* Header Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "16px",
          borderBottom: "1px solid rgba(168, 104, 58, 0.2)",
          paddingBottom: "20px",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9935A",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Operational Concessions & Infrastructure
          </span>
          <h1
            style={{
              fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
              fontSize: "2.1rem",
              fontWeight: 700,
              color: "#F6F0E4",
              margin: 0,
            }}
          >
            Mining Sites & Exploration Portal
          </h1>
          <p style={{ color: "rgba(246, 240, 228, 0.65)", fontSize: "14px", marginTop: "6px" }}>
            Configure active mining concessions (working on), partner operations (assisting), and sovereign jurisdictions for investor and partner review.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <a
            href="/en/mining-sites"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "10px 18px",
              backgroundColor: "transparent",
              color: "#C9935A",
              border: "1px solid rgba(201, 147, 90, 0.4)",
              borderRadius: "4px",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>Preview Public View</span>
            <span>&rarr;</span>
          </a>

          <button
            type="button"
            onClick={handleOpenAdd}
            style={{
              padding: "10px 20px",
              backgroundColor: "#A8683A",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "4px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            + Add New Site / Concession
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
        {[
          { key: "all", label: `All Sites & Jurisdictions (${sites.length})` },
          { key: "ACTIVE_OPERATING", label: `Sites We Are Working On (${sites.filter((s) => s.type === "ACTIVE_OPERATING").length})` },
          { key: "ASSISTING_PARTNER", label: `Sites We Are Assisting (${sites.filter((s) => s.type === "ASSISTING_PARTNER").length})` },
          { key: "FEASIBLE_EXPANSION", label: `Countries & Corridors (${sites.filter((s) => s.type === "FEASIBLE_EXPANSION").length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterType(tab.key)}
            style={{
              padding: "8px 16px",
              backgroundColor: filterType === tab.key ? "#A8683A" : "rgba(30, 19, 12, 0.7)",
              color: filterType === tab.key ? "#FFFFFF" : "#F6F0E4",
              border: "1px solid rgba(168, 104, 58, 0.3)",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Site Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "24px",
        }}
      >
        {filtered.map((site) => (
          <div
            key={site.id}
            style={{
              backgroundColor: "#26180F",
              borderRadius: "6px",
              border: "1px solid rgba(168, 104, 58, 0.25)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
            }}
          >
            {/* Site Image & Badges */}
            <div style={{ position: "relative", width: "100%", height: "180px", backgroundColor: "#0F0A06" }}>
              <Image
                src={site.imageUrl || "/hero-mine.jpg"}
                alt={site.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="400px"
              />
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  backgroundColor: site.type === "ACTIVE_OPERATING" ? "rgba(16, 185, 129, 0.9)" : site.type === "ASSISTING_PARTNER" ? "rgba(201, 147, 90, 0.9)" : "rgba(59, 130, 246, 0.9)",
                  color: "#1E130C",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "4px 8px",
                  borderRadius: "2px",
                }}
              >
                {site.type === "ACTIVE_OPERATING" ? "Working On" : site.type === "ASSISTING_PARTNER" ? "Assisting" : "Feasible Corridor"}
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  backgroundColor: "rgba(30, 19, 12, 0.85)",
                  color: "#F6F0E4",
                  fontSize: "11px",
                  fontWeight: 600,
                  padding: "3px 8px",
                  borderRadius: "2px",
                }}
              >
                {site.country}
              </div>
            </div>

            {/* Card Content */}
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1, gap: "10px" }}>
              <div>
                <span style={{ fontSize: "11px", color: "#C9935A", textTransform: "uppercase", fontWeight: 600 }}>
                  {site.region}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "#F6F0E4",
                    marginTop: "2px",
                    marginBottom: "6px",
                  }}
                >
                  {site.title}
                </h3>
                <p style={{ fontSize: "12px", color: "rgba(246, 240, 228, 0.75)", lineHeight: 1.5, margin: 0 }}>
                  {site.description.slice(0, 140)}...
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(30, 19, 12, 0.6)",
                  padding: "10px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#C9935A" }}>Scope:</span>
                  <strong style={{ color: "#F6F0E4", textAlign: "right", maxWidth: "70%" }}>{site.mineralScope}</strong>
                </div>
                {site.keyMetrics?.scaleOrArea && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#C9935A" }}>Scale:</span>
                    <strong style={{ color: "#F6F0E4" }}>{site.keyMetrics.scaleOrArea}</strong>
                  </div>
                )}
                {site.keyMetrics?.processingCapacity && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#C9935A" }}>Throughput:</span>
                    <strong style={{ color: "#F6F0E4" }}>{site.keyMetrics.processingCapacity}</strong>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ marginTop: "auto", display: "flex", gap: "10px", paddingTop: "10px" }}>
                <button
                  type="button"
                  onClick={() => handleOpenEdit(site)}
                  style={{
                    flex: 1,
                    padding: "9px 12px",
                    backgroundColor: "#A8683A",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "3px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Edit Concession
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(site.id)}
                  style={{
                    padding: "9px 12px",
                    backgroundColor: "rgba(220, 38, 38, 0.2)",
                    color: "#f87171",
                    border: "1px solid rgba(220, 38, 38, 0.3)",
                    borderRadius: "3px",
                    fontSize: "12px",
                    fontWeight: 600,
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

      {/* Edit / Add Modal */}
      {editingSite && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#26180F",
              border: "1px solid rgba(168, 104, 58, 0.4)",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "760px",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "28px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2
                style={{
                  fontFamily: "var(--font-heading-stack, 'Cormorant Garamond', Georgia, serif)",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "#F6F0E4",
                  margin: 0,
                }}
              >
                {isNew ? "+ Add Mining Site / Concession" : `Edit Concession: ${editingSite.title}`}
              </h2>
              <button
                type="button"
                onClick={() => setEditingSite(null)}
                style={{ background: "none", border: "none", color: "#F6F0E4", fontSize: "20px", cursor: "pointer" }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Title */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                  Site / Concession Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Assosa Placer & Hard-Rock Concession Hub"
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

              {/* Type & Country in 2 columns */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                    Operational Category / Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
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
                    <option value="ACTIVE_OPERATING">Sites We Are Working On (Active Operating)</option>
                    <option value="ASSISTING_PARTNER">Sites We Are Assisting (Technical Partnerships)</option>
                    <option value="FEASIBLE_EXPANSION">Sites & Countries We Can Operate In (Eligible Scope)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. Ethiopia, Sudan, India, UAE"
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

              {/* Region & Coordinates */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                    Region / Mining District
                  </label>
                  <input
                    type="text"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    placeholder="e.g. Benishangul-Gumuz (Blue Nile Basin)"
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
                    GPS Coordinates (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.coordinates}
                    onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                    placeholder="e.g. 10.0667° N, 34.5333° E"
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

              {/* Status Badge & Mineral Scope */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                    Status Badge Text
                  </label>
                  <input
                    type="text"
                    value={formData.statusBadge}
                    onChange={(e) => setFormData({ ...formData, statusBadge: e.target.value })}
                    placeholder="e.g. Direct Hilful Active Concession"
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
                    Mineral Target / Scope
                  </label>
                  <input
                    type="text"
                    value={formData.mineralScope}
                    onChange={(e) => setFormData({ ...formData, mineralScope: e.target.value })}
                    placeholder="e.g. Alluvial Gold, Placer Pay-Dirt (92-98% Au)"
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

              {/* Image Picker */}
              <AdminImagePicker
                label="Site / Concession Image"
                value={formData.imageUrl}
                searchQuery="open pit gold mining concession extraction heavy plant"
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                helperText="Paste direct image URL or upload field concession photo."
              />

              {/* Description */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                  Operational Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detail geological horizons, equipment deployed, washing plant throughput, and custody protocols."
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

              {/* Metrics: Scale, Throughput, Logistics */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                    Concession Scale / Area
                  </label>
                  <input
                    type="text"
                    value={formData.scaleOrArea}
                    onChange={(e) => setFormData({ ...formData, scaleOrArea: e.target.value })}
                    placeholder="e.g. 140 Hectares Direct Concession"
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
                    Daily Throughput / Processing
                  </label>
                  <input
                    type="text"
                    value={formData.processingCapacity}
                    onChange={(e) => setFormData({ ...formData, processingCapacity: e.target.value })}
                    placeholder="e.g. 850 Metric Tons/Day Throughput"
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

              {/* Operational Highlights */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#C9935A", textTransform: "uppercase", marginBottom: "6px" }}>
                  Operational Highlights (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.highlightsStr}
                  onChange={(e) => setFormData({ ...formData, highlightsStr: e.target.value })}
                  placeholder="e.g. 100% chemical-free primary gravity extraction via centrifugal hydrocyclones&#10;On-site security perimeter and Brink's compliant chain of custody&#10;Direct smelter casting of 1kg and 5kg unrefined doré bars"
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
              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                <button
                  type="submit"
                  disabled={saving}
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
                  {saving ? "Saving..." : "Save Concession Live"}
                </button>

                <button
                  type="button"
                  onClick={() => setEditingSite(null)}
                  style={{
                    padding: "12px 18px",
                    backgroundColor: "transparent",
                    color: "#F6F0E4",
                    border: "1px solid rgba(246, 240, 228, 0.2)",
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
