export type DepartmentCategory =
  | "GOLD_MINING"
  | "DRILLING_CHEMICALS"
  | "METALS"
  | "ONG_MINERALS"
  | "QUARTZ_FLYASH";

export interface GalleryImageItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: DepartmentCategory | string;
  departmentName?: string;
  aspectRatio: "featured" | "landscape" | "portrait" | "wide";
  caption: string;
  technicalMetadata: string;
}

export interface GalleryPageContent {
  hero: {
    eyebrow: string;
    headline: string;
    subtext: string;
    disclaimer: string;
  };
  filters: {
    key: string;
    label: string;
  }[];
  items: GalleryImageItem[];
  cta: {
    headline: string;
    subtext: string;
    primaryText: string;
    secondaryText: string;
  };
}

export const galleryContentEn: GalleryPageContent = {
  hero: {
    eyebrow: "OPERATIONAL MEDIA & FIELD LOGISTICS",
    headline: "DEPARTMENT OPERATIONAL GALLERY",
    subtext:
      "A photographic representation of Hilful Ventures' 5 primary commodity divisions: Primary Gold Mining & Concession Extraction, Drilling & Mud Chemicals, Ferrous & Non-Ferrous Secondary Metals, ONG Exploration Minerals, and Industrial Quartz & Fly Ash.",
    disclaimer:
      "All imagery represents active field concessions, chemical manufacturing, metal shearing yards, and mineral processing facilities operated or contracted by Hilful Ventures across India, Ethiopia, and international trading corridors.",
  },
  filters: [
    { key: "ALL", label: "ALL DEPARTMENTS" },
    { key: "GOLD_MINING", label: "01. GOLD MINING & EXTRACTION" },
    { key: "DRILLING_CHEMICALS", label: "02. DRILLING & MUD CHEMICALS" },
    { key: "METALS", label: "03. SECONDARY METALS" },
    { key: "ONG_MINERALS", label: "04. ONG MINERALS & MUD" },
    { key: "QUARTZ_FLYASH", label: "05. QUARTZ & FLY ASH" },
  ],
  items: [
    // 01. GOLD MINING & EXTRACTION
    {
      id: "gal-gold-01",
      src: "/hero-mine.jpg",
      alt: "Open-pit alluvial gold extraction and hydraulic benches in Assosa",
      title: "Primary Gold Concession Extraction & Alluvial Benches",
      category: "GOLD_MINING",
      departmentName: "01. Gold Mining & Mineral Extraction",
      aspectRatio: "featured",
      caption: "High-yield alluvial gold mining concession pit and pay-dirt extraction in Assosa Woreda, Benishangul-Gumuz, Ethiopia.",
      technicalMetadata: "SURFACE EXTRACTION · ASSOSA CONCESSION HUB",
    },
    {
      id: "gal-gold-02",
      src: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1400&q=85",
      alt: "Centrifugal gravity separation and shaking table circuits",
      title: "Knelson Gravity Separation & Hydrocyclone Sizing",
      category: "GOLD_MINING",
      departmentName: "01. Gold Mining & Mineral Extraction",
      aspectRatio: "landscape",
      caption: "Chemical-free centrifugal recovery circuits capturing fine auriferous gold particles from alluvial wash slurry.",
      technicalMetadata: "GRAVITY ENRICHMENT · KNELSON SEPARATION",
    },
    {
      id: "gal-gold-03",
      src: "/hero-mine.jpg",
      alt: "Assayed gold dore bars and bullion verification",
      title: "Assayed Mine-Smelted Gold Doré Bars (92%-98.5% Au)",
      category: "GOLD_MINING",
      departmentName: "01. Gold Mining & Mineral Extraction",
      aspectRatio: "portrait",
      caption: "Mine-site induction furnace smelted gold doré bars stamped and certified with independent fire assay certificates.",
      technicalMetadata: "ASSAY COMPLIANCE · LBMA SPEC FEEDSTOCK",
    },

    // 02. DRILLING & MUD CHEMICALS
    {
      id: "gal-chem-01",
      src: "/chemicals.jpg",
      alt: "API Spec 13A drilling fluid polymers and bentonite compounding",
      title: "API 13A Drilling Fluid Polymers & Rheology Additives",
      category: "DRILLING_CHEMICALS",
      departmentName: "02. Drilling & Mud Chemicals",
      aspectRatio: "featured",
      caption: "Specialized PAC-LV, xanthan polymer complexes, and organophilic clays packaged in hermetic export craft bags.",
      technicalMetadata: "API SPEC 13A · DOWNHOLE FLUID STABILITY",
    },
    {
      id: "gal-chem-02",
      src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
      alt: "High-temperature HPHT drilling fluid laboratory testing",
      title: "HPHT Rheological Testing & Fluid Loss Control",
      category: "DRILLING_CHEMICALS",
      departmentName: "02. Drilling & Mud Chemicals",
      aspectRatio: "landscape",
      caption: "High pressure high temperature (HPHT) filter press verification confirming minimal mud cake permeability.",
      technicalMetadata: "LABORATORY ASSAY · BATCH COA VERIFICATION",
    },
    {
      id: "gal-chem-03",
      src: "/chemicals.jpg",
      alt: "Modified pregelatinized starch derivatives warehouse",
      title: "Pregelatinized Crosslinked Modified Starch",
      category: "DRILLING_CHEMICALS",
      departmentName: "02. Drilling & Mud Chemicals",
      aspectRatio: "portrait",
      caption: "Thermal endurance up to 130°C in high-salinity brines for borehole wall consolidation and fluid stabilization.",
      technicalMetadata: "ORGANIC DERIVATIVES · DESICCATED PACKAGING",
    },

    // 03. FERROUS / NON-FERROUS METAL
    {
      id: "gal-metal-01",
      src: "/metals.jpg",
      alt: "Heavy melting steel scrap HMS 1 and 2 shearing",
      title: "HMS 1 & 2 Steel Scrap Hydraulic Baling & Shearing",
      category: "METALS",
      departmentName: "03. Ferrous & Non-Ferrous Secondary Metals",
      aspectRatio: "wide",
      caption: "ISRI 200-206 certified 80:20 heavy melting steel scrap processed for high furnace charge density.",
      technicalMetadata: "ISRI CODE 200-206 · ZERO RADIATION CHECK",
    },
    {
      id: "gal-metal-02",
      src: "/metals.jpg",
      alt: "Pure bare bright electrolytic copper wire millberry",
      title: "99.9% Pure Millberry Copper Wire Scrap",
      category: "METALS",
      departmentName: "03. Ferrous & Non-Ferrous Secondary Metals",
      aspectRatio: "landscape",
      caption: "Unalloyed bright electrolytic copper wire bundles sourced from electrical transmission dismantling.",
      technicalMetadata: "99.9% COPPER PURITY · FOUNDRY SMELTING FEED",
    },
    {
      id: "gal-metal-03",
      src: "/metals.jpg",
      alt: "Secondary aluminium extrusion and brass scrap lots",
      title: "Secondary Aluminium Tense/Tabor & Honey Brass Scrap",
      category: "METALS",
      departmentName: "03. Ferrous & Non-Ferrous Secondary Metals",
      aspectRatio: "portrait",
      caption: "Dense sorted secondary non-ferrous foundry melts loaded into 20ft ocean containers with verified weighbridge slips.",
      technicalMetadata: "PSIC CERTIFIED · MARITIME FREIGHT DISPATCH",
    },

    // 04. MINERALS & MUD CHEMICALS TO ONG EXPLORATION
    {
      id: "gal-ong-01",
      src: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80",
      alt: "High-grade iron ore lump and sinter fines pit loading",
      title: "High Fe Content Iron Ore (62% - 64.5% Fe Lumps & Fines)",
      category: "ONG_MINERALS",
      departmentName: "04. Minerals & Mud Chemicals to ONG Exploration",
      aspectRatio: "featured",
      caption: "Calibrated 10-40mm lump ore and sinter fines sourced from certified mining concessions for blast furnace and DRI steelmaking.",
      technicalMetadata: "62-64.5% FE GRADE · LOW IMPURITY ASSAY",
    },
    {
      id: "gal-ong-02",
      src: "/chemicals.jpg",
      alt: "High-density drilling barite weighting agent bagging",
      title: "High-Density Drilling Barite (4.20 SG BaSO4)",
      category: "ONG_MINERALS",
      departmentName: "04. Minerals & Mud Chemicals to ONG Exploration",
      aspectRatio: "landscape",
      caption: "Ultra-heavy barium sulfate weighing powders milled to API 13A particle specifications for high-pressure exploration wells.",
      technicalMetadata: "SPECIFIC GRAVITY >= 4.20 · API 13A SECTION 11",
    },
    {
      id: "gal-ong-03",
      src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
      alt: "Metallurgical sinter ore and mineral concentrates handling",
      title: "Metallurgical Sinter Feed & Ore Concentrates",
      category: "ONG_MINERALS",
      departmentName: "04. Minerals & Mud Chemicals to ONG Exploration",
      aspectRatio: "portrait",
      caption: "Bulk mineral charges prepared to custom grain sizing and moisture profiles for cupola and arc furnace smelting.",
      technicalMetadata: "BULK VESSEL & FCL · CUSTOM SIZING",
    },

    // 05. QUARTZ AND FLY ASH
    {
      id: "gal-quartz-01",
      src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
      alt: "Electrostatic precipitator collection of pulverized fuel fly ash",
      title: "ASTM C618 Class F & Class C Pulverized Fuel Fly Ash",
      category: "QUARTZ_FLYASH",
      departmentName: "05. Quartz and Fly Ash",
      aspectRatio: "wide",
      caption: "Classified pozzolanic micro-powder with loss on ignition under 3%, packed in 1.4 MT moisture-sealed jumbo tote bags.",
      technicalMetadata: "ASTM C618 COMPLIANT · LOI < 3.0%",
    },
    {
      id: "gal-quartz-02",
      src: "/hero-mine.jpg",
      alt: "Snow-white natural silica quartz lumps and granules",
      title: "High-Purity Natural Crystalline Quartz (99.5%+ SiO2)",
      category: "QUARTZ_FLYASH",
      departmentName: "05. Quartz and Fly Ash",
      aspectRatio: "landscape",
      caption: "Optically sorted snow-white vein quartz with ultra-low iron (Fe2O3 < 0.02%) for float glass and engineered quartz stone.",
      technicalMetadata: "SIO2 >= 99.5% · OPTICAL PURITY SORTED",
    },
    {
      id: "gal-quartz-03",
      src: "/chemicals.jpg",
      alt: "Iron-free micronized quartz powder and cenospheres",
      title: "Micronized Silica Flour (300-500 Mesh) & Cenospheres",
      category: "QUARTZ_FLYASH",
      departmentName: "05. Quartz and Fly Ash",
      aspectRatio: "portrait",
      caption: "Super-fine ball-milled crystalline silica flour and lightweight buoyant cenospheres for oil-well cementing and refractories.",
      technicalMetadata: "300-500 MESH · ABRASION RESISTANT MATRIX",
    },
  ],
  cta: {
    headline: "Require High-Resolution Specifications or Laboratory Inspection Assays?",
    subtext:
      "Contact our Chennai Trade Desk (+91 96555 22111) or Assosa Field Office (+251 988 228 550) for batch Certificates of Analysis (COA), dangerous goods declarations, or pre-shipment sampling.",
    primaryText: "Request Batch COA & Quotation",
    secondaryText: "Connect via WhatsApp",
  },
};

export const galleryContentAr: GalleryPageContent = {
  ...galleryContentEn,
  hero: {
    eyebrow: "وسائط العمليات والخدمات اللوجستية الميدانية",
    headline: "معرض الأقسام التشغيلية",
    subtext:
      "تمثيل فوتوغرافي لأقسام السلع الخمسة الرئيسية في هلفول فنتشرز: تعدين الذهب واستخراج المعادن، والكيماويات الخاصة بالحفر، والمعادن الثانوية، ومعادن النفط والغاز، والكوارتز والرماد المتطاير.",
    disclaimer:
      "تمثل جميع الصور امتيازات ميدانية ومرافق معالجة نشطة تديرها شركة هلفول فنتشرز عبر الهند وإثيوبيا وممرات التجارة الدولية.",
  },
  filters: [
    { key: "ALL", label: "جميع الأقسام" },
    { key: "GOLD_MINING", label: "01. تعدين واستخراج الذهب" },
    { key: "DRILLING_CHEMICALS", label: "02. كيماويات الحفر وطين الحفر" },
    { key: "METALS", label: "03. المعادن الثانوية الحديدية وغير الحديدية" },
    { key: "ONG_MINERALS", label: "04. معادن استكشاف النفط والغاز" },
    { key: "QUARTZ_FLYASH", label: "05. الكوارتز والرماد المتطاير" },
  ],
};
