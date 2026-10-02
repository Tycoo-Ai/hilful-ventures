/**
 * HILFUL VENTURES — Master Business & Product Catalog Data
 * Single source of truth for departments, products, offices, specs, and trust signals.
 */

export interface ProductSpec {
  name: string;
  grade: string;
  packaging: string;
  moq: string;
  origin: string;
  purityOrForm?: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  departmentSlug: string;
  departmentName: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  galleryImages: string[];
  specs: ProductSpec;
  applications: string[];
  qualityDocs: string[];
  shippingOptions: string[];
  brochureUrl?: string;
  featured?: boolean;
}

export interface DepartmentItem {
  id: string;
  slug: string;
  number: string;
  name: string;
  tagline: string;
  overview: string;
  whatWeDo: string;
  image: string;
  coverImage: string;
  icon: string;
  products: ProductItem[];
  specSummary: { label: string; value: string }[];
  process: { step: string; title: string; desc: string }[];
  qualityCertifications: string[];
  faqs: { q: string; a: string }[];
}

export interface OfficeLocation {
  id: string;
  key: "india" | "ethiopia";
  country: string;
  name: string;
  address: string;
  email: string;
  phone1: string;
  phone2?: string;
  mapEmbedUrl: string;
  googleMapsLink: string;
  badge: string;
  hours: string;
}

export const OFFICES: OfficeLocation[] = [
  {
    id: "office-in",
    key: "india",
    country: "India",
    name: "Hilful Ventures Pvt Ltd",
    address: "211 (201), Linghi Chetty Street, Mannady, Chennai - 600 001, Tamil Nadu, India",
    email: "hilfulventures@gmail.com",
    phone1: "+91 96555 22111",
    phone2: "+91 99940 33191",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.2087522502663!2d80.28723657577558!3d13.090333212351232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f5053b2169b%3A0xb3638dbfecdf36b9!2sLinghi%20Chetty%20St%2C%20Mannadi%2C%20George%20Town%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    googleMapsLink: "https://maps.google.com/?q=211+Linghi+Chetty+Street+Mannady+Chennai+600001",
    badge: "Headquarters & Global Trade Desk",
    hours: "Mon – Sat: 09:00 – 18:30 IST",
  },
  {
    id: "office-et",
    key: "ethiopia",
    country: "Ethiopia",
    name: "Hilful Ventures PLC",
    address: "Suite 4, Face To Face Building, Zone 1, Assosa Woreda, Benishangul-Gumuz, Ethiopia",
    email: "hilfulaso@gmail.com",
    phone1: "+251 988 228 550",
    phone2: "+251 988 228 550",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63044.20016259049!2d34.50275811776856!3d10.061730075676767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1655fa7216a964bf%3A0xe54b9d3e8e19c0b1!2sAsosa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set",
    googleMapsLink: "https://maps.google.com/?q=Face+To+Face+Building+Zone+1+Assosa+Benishangul+Gumuz+Ethiopia",
    badge: "East African Operations & Regional Liaison",
    hours: "Mon – Fri: 08:30 – 17:30 EAT",
  },
];

export const DEPARTMENTS: DepartmentItem[] = [
  {
    id: "dept-1",
    slug: "gold-mining-extraction",
    number: "01",
    name: "Gold Mining & Mineral Extraction",
    tagline: "Primary Alluvial & Hard-Rock Gold Recovery, Bullion Assay & Concession Extraction",
    overview:
      "Hilful Ventures places gold mining and precious mineral recovery at the heart of our operations, executing large-scale alluvial extraction, gravity separation, and certified bullion refining in East Africa.",
    whatWeDo:
      "Headquartered in Assosa, Ethiopia and Chennai, India, our flagship Gold Mining division operates primary concessions equipped with high-yield centrifugal gravity concentrators, shaking tables, and zero-discharge washing circuits. We supply verified raw gold ore concentrates, unrefined doré bars (92% - 98.5% Au purity), and specialized precious metal extraction chemistry to accredited international refineries.",
    image: "/hero-mine.jpg",
    coverImage: "/hero-mine.jpg",
    icon: "Gem",
    specSummary: [
      { label: "Primary Concession Hub", value: "Assosa Woreda (Benishangul-Gumuz, Ethiopia)" },
      { label: "Assayed Au Dore Purity", value: "92.0% – 98.5% Fine Gold Assay" },
      { label: "Extraction Method", value: "Centrifugal Gravity Sluicing & Closed-Loop Cyanidation" },
      { label: "Export Compliance", value: "Ministry of Mines & Central Bank Certified" },
    ],
    process: [
      { step: "01", title: "Geological Survey & Pay-Dirt Sampling", desc: "Systematic core drilling, alluvial trench mapping, and atomic absorption spectrometry (AAS) assaying of auriferous pay-gravels." },
      { step: "02", title: "Centrifugal Gravity Recovery", desc: "Chemical-free primary processing using Knelson-type centrifugal bowls and reciprocating shaking tables maximizing free-milling Au yield." },
      { step: "03", title: "Mine-Site Smelting & Assayed Dore", desc: "Induction smelting into stamped doré bars with verified fire assay certificates, serial numbering, and secured chain of custody." },
    ],
    qualityCertifications: [
      "Ministry of Mines Concession License",
      "Independent Fire Assay Certification (SGS / Alex Stewart)",
      "OECD Due Diligence Responsible Minerals Standard",
      "National Bank of Ethiopia Sealed Export Clearance",
    ],
    faqs: [
      { q: "Is Gold Mining Hilful Ventures' primary operational focus?", a: "Yes. Gold mining and precious mineral extraction in East Africa constitutes our core primary division, backed by active concession operations and field headquarters in Assosa, Ethiopia." },
      { q: "What is the purity of your gold doré bars?", a: "Our mine-smelted gold doré bars carry guaranteed assay grades between 92.0% and 98.5% (22k to 23.5k equivalent purity) before secondary bullion refining." },
      { q: "How is export security and custody managed?", a: "All doré consignments are cleared through the National Bank of Ethiopia and escorted via premier armored logistics (Brink's / Malca-Amit) directly to destination gateway vaults." },
    ],
    products: [
      {
        id: "prod-101",
        slug: "gold-ore-concentrates",
        name: "Gold Ore Concentrates & Gravity Feeds",
        departmentSlug: "gold-mining-extraction",
        departmentName: "Gold Mining & Mineral Extraction",
        shortDesc: "High-grade auriferous mineral concentrates from alluvial and hard-rock gravity recovery circuits.",
        fullDesc:
          "Beneficiated gold ore concentrates extracted from rich placer gravels and quartz vein formations. Prepared through hydrocyclone sizing and multi-tier shaking tables to deliver high-yield furnace charge or leaching feed.",
        image: "/hero-mine.jpg",
        galleryImages: ["/hero-mine.jpg", "/chemicals.jpg"],
        specs: {
          name: "Auriferous Ore Concentrates",
          grade: "Au Grade: 50g/MT – 350g/MT Calibrated",
          packaging: "Heavy-duty UN-approved sealed tamper-evident steel drums",
          moq: "5 Metric Tons",
          origin: "Assosa Gold Mining Belt, Ethiopia",
          purityOrForm: "Coarse to fine mineral concentrate",
        },
        applications: [
          "Refinery pyrometallurgical smelting charge",
          "Vat and tank hydrometallurgical leaching plants",
          "Precious metal secondary upgrading operations",
        ],
        qualityDocs: ["Fire Assay Batch Certificate", "XRF Elemental Analysis", "Concession Origin Document", "Certificate of Origin"],
        shippingOptions: ["Secured Armored Air Freight", "Sealed 20ft ocean containers (FOB Djibouti / CIF Global Ports)"],
        brochureUrl: "#enquire",
        featured: true,
      },
      {
        id: "prod-102",
        slug: "assayed-gold-dore-bars",
        name: "Assayed Gold Dore Bars & Bullion",
        departmentSlug: "gold-mining-extraction",
        departmentName: "Gold Mining & Mineral Extraction",
        shortDesc: "Direct mine-smelted unrefined gold doré bars with verified fire assay purity (92% - 98.5% Au).",
        fullDesc:
          "Primary unrefined gold bullion bars cast directly at our mine-site induction foundries in Assosa. Every bar is individually stamped, weighed, and accompanied by accredited fire assay documentation ensuring strict OECD chain of custody.",
        image: "/gold-dore-bars.jpg",
        galleryImages: ["/gold-dore-bars.jpg"],
        specs: {
          name: "Raw Gold Doré Bars",
          grade: "Au Purity 92.0% – 98.5% (Verified Fire Assay)",
          packaging: "Secured tamper-evident security cases with serialized bolt seals",
          moq: "5 Kilograms (Commercial Lot)",
          origin: "Primary Concessions, Assosa, Ethiopia",
          purityOrForm: "Cast solid Doré Bars (1kg / 2.5kg / 5kg)",
        },
        applications: [
          "LBMA refinery feedstock for Good Delivery 99.99% gold",
          "Commercial bullion reserves and sovereign minting",
          "High-spec industrial electronics alloy feedstock",
        ],
        qualityDocs: ["Accredited Fire Assay Certificate", "Central Bank Export License", "OECD Chain of Custody Declaration"],
        shippingOptions: ["Brink's / Malca-Amit Armored Air Courier to Dubai, Zurich, London, or Mumbai"],
        brochureUrl: "#enquire",
        featured: true,
      },
      {
        id: "prod-103",
        slug: "alluvial-gold-recovery-systems",
        name: "Alluvial Gold Processing & Flotation Chemistry",
        departmentSlug: "gold-mining-extraction",
        departmentName: "Gold Mining & Mineral Extraction",
        shortDesc: "Specialized leaching agents, xanthates, and flotation reagents for maximum precious metal yield.",
        fullDesc:
          "High-efficiency leaching reagents, frothers, and collectors specifically formulated for fine-grain auriferous sands and refractory sulfidic gold ores, accelerating leaching kinetics and boosting gold recovery.",
        image: "/chemicals.jpg",
        galleryImages: ["/chemicals.jpg", "/hero-mine.jpg"],
        specs: {
          name: "Gold Extraction & Flotation Chemical System",
          grade: "Technical Grade Mineral Processing Reagents (98% Active)",
          packaging: "25kg moisture-proof craft bags / 1MT Jumbo tote units",
          moq: "20 Metric Tons (1 x 20ft FCL)",
          origin: "Direct Chemical Refineries (India)",
          purityOrForm: "Free-flowing dry crystals & concentrated liquid formulations",
        },
        applications: [
          "CIL / CIP gold leaching operations",
          "Placer gold centrifugal enrichment",
          "Refractory sulfide ore flotation",
        ],
        qualityDocs: ["Batch Inspection Certificate", "Dangerous Goods Compliance", "MSDS 16-Section Standard"],
        shippingOptions: ["Containerized 20ft ocean freight with IMO maritime safety clearance"],
        brochureUrl: "#enquire",
        featured: true,
      },
    ],
  },
  {
    id: "dept-2",
    slug: "drilling-chemicals",
    number: "02",
    name: "Drilling & Mud Chemicals",
    tagline: "High-Performance Fluid Systems & Specialized Extraction Chemistry",
    overview:
      "Formulated for deep borehole stability, rheology optimization, and extreme thermodynamic conditions in oil & gas exploration and heavy mineral drilling.",
    whatWeDo:
      "Hilful Ventures delivers certified drilling fluid polymers, organic starch derivatives, and high-purity inorganic rheology modifiers designed to endure high pressure and high temperature (HPHT) geological regimes. We collaborate directly with accredited chemical refineries to ensure international API Specification 13A standards.",
    image: "/chemicals.jpg",
    coverImage: "/chemicals.jpg",
    icon: "FlaskConical",
    specSummary: [
      { label: "Compliance Standard", value: "API Spec 13A / ISO 13500" },
      { label: "Primary Packaging", value: "25kg Craft Poly-Lined Bags / 1MT Jumbo" },
      { label: "Minimum Order Qty", value: "1 FCL (20-22 Metric Tons)" },
      { label: "Inspection", value: "SGS / Intertek Pre-Shipment Assay" },
    ],
    process: [
      { step: "01", title: "Polymer Characterization", desc: "Batch assaying of molecular weight, viscosity yield, and thermal endurance in simulated brine conditions." },
      { step: "02", title: "Moisture Barrier Packaging", desc: "Multi-ply laminated craft bags with hermetic LDPE liners to preserve desiccated chemical potency across maritime transit." },
      { step: "03", title: "Batch Certificate of Analysis", desc: "Every container lot carries verified COA, full SDS compliance, and independent laboratory viscosity curves." },
    ],
    qualityCertifications: ["API Spec 13A Certified", "ISO 9001:2015 Quality Management", "REACH Registered Chemistry", "SGS Pre-Shipment Seal Verified"],
    faqs: [
      { q: "Do you supply customized fluid formulations for HPHT wells?", a: "Yes. Our chemical blending partners can adjust yield points, filtration control profiles, and starch cross-linking degrees to match your downhole temperature gradient." },
      { q: "What is the standard lead time for full container loads?", a: "Factory dispatch occurs within 7 to 12 working days from LC confirmation, followed by express ocean transit to your destination port." },
      { q: "Can you provide pre-shipment sample testing?", a: "We courier certified 500g benchmark samples with accompanying batch COA and viscosity sheets for laboratory testing prior to commercial dispatch." },
    ],
    products: [
      {
        id: "prod-201",
        slug: "water-based-drilling-fluids",
        name: "Water Based Drilling Fluids",
        departmentSlug: "drilling-chemicals",
        departmentName: "Drilling & Mud Chemicals",
        shortDesc: "High-yield bentonite additives, PAC-LV, and xanthan polymer systems for borehole stability.",
        fullDesc:
          "Engineered for superior shale inhibition and cuttings suspension in diverse geological strata. Our water-based drilling polymer line provides optimal rheology control with negligible formation damage, supporting both fresh water and saturated salt fluid environments.",
        image: "/chemicals.jpg",
        galleryImages: ["/chemicals.jpg", "/hero-mine.jpg"],
        specs: {
          name: "Water Based Drilling Fluids",
          grade: "API Spec 13A Section 9 / 10 Compliant",
          packaging: "25kg multi-wall paper bags with PE inner liner, shrink-wrapped on ISPM-15 heat treated pallets",
          moq: "20 Metric Tons (1 x 20ft FCL)",
          origin: "India / International Direct Refinery",
          purityOrForm: "Fine white to off-white dry powder",
        },
        applications: [
          "Deep onshore exploration & geothermal drilling",
          "Borehole wall stabilization and shale swelling mitigation",
          "Horizontal directional drilling (HDD) and civil tunneling slurry",
          "Heavy mineral ore core drilling operations",
        ],
        qualityDocs: ["Certificate of Analysis (COA)", "Safety Data Sheet (SDS)", "API Spec 13A Conformity Report", "Certificate of Origin"],
        shippingOptions: ["FOB Chennai / Nhava Sheva", "CIF Djibouti Port (for Ethiopia / East Africa)", "CIF Jebel Ali / Middle East Ports", "CIF Global Gateway Ports"],
        brochureUrl: "#enquire",
        featured: true,
      },
      {
        id: "prod-202",
        slug: "oil-synthetic-based-fluids",
        name: "Oil / Synthetic Based Fluids",
        departmentSlug: "drilling-chemicals",
        departmentName: "Drilling & Mud Chemicals",
        shortDesc: "Primary & secondary emulsifiers, organophilic clays, and synthetic fluid loss controllers.",
        fullDesc:
          "Formulated for extreme wellbore conditions where water-based systems fail due to temperature, salt saturation, or reactive shale. Delivers high electrical stability, controlled fluid loss, and exceptional lubricity to prevent stuck pipe hazards in deep drilling.",
        image: "/chemicals.jpg",
        galleryImages: ["/chemicals.jpg"],
        specs: {
          name: "Oil / Synthetic Based Invert Fluids",
          grade: "Heavy-Duty Invert Emulsion Additives",
          packaging: "200L / 55 Gallon Steel Drums or 1,000L Composite IBC Tanks",
          moq: "16 Metric Tons (80 Drums / 16 IBCs)",
          origin: "India / Refinery Direct",
          purityOrForm: "High-density active liquid surfactant complex",
        },
        applications: [
          "High Pressure High Temperature (HPHT) hydrocarbon exploration",
          "Reactive gumbo shale formations and extended-reach horizontal drilling",
          "Deep offshore and desert basin drilling campaigns",
        ],
        qualityDocs: ["Batch Inspection COA", "IMO Maritime Hazmat Declarations", "MSDS 16-Section Standard", "Manufacturer Quality Guarantee"],
        shippingOptions: ["UN-Certified Steel Drums", "Composite IBC Tote Units", "20ft ISO Tank Containers"],
        brochureUrl: "#enquire",
        featured: true,
      },
      {
        id: "prod-203",
        slug: "modified-starch",
        name: "Modified Starch (Drilling Grade)",
        departmentSlug: "drilling-chemicals",
        departmentName: "Drilling & Mud Chemicals",
        shortDesc: "Pregelatinized, non-ionic crosslinked starch for high-temperature fluid loss mitigation.",
        fullDesc:
          "A premium grade pregelatinized corn/potato starch derivative tailored specifically for drilling fluid filtration control. Exhibits thermal stability up to 130°C and maintains functional polymer chain integrity even in saturated brine and divalent calcium ion conditions.",
        image: "/chemicals.jpg",
        galleryImages: ["/chemicals.jpg"],
        specs: {
          name: "Modified Starch (Drilling Filtration Control)",
          grade: "API Spec 13A Starch Compliant",
          packaging: "25kg craft paper bags with moisture-proof polyethylene liner",
          moq: "22 Metric Tons (1 x 20ft FCL)",
          origin: "India",
          purityOrForm: "Free-flowing light cream powder",
        },
        applications: [
          "API fluid loss control in fresh, sea, and saturated salt muds",
          "Non-damaging workover and completion fluid systems",
          "Core recovery drilling where minimal filter cake thickness is required",
        ],
        qualityDocs: ["API 13A Batch Analysis Certificate", "Thermal Degradation Curve Data", "Phytosanitary Certificate", "Non-Toxic Environmental Clearance"],
        shippingOptions: ["Palletized 25kg bags (40 bags per wooden pallet)", "Container bulk lining options available on request"],
        brochureUrl: "#enquire",
        featured: true,
      },
    ],
  },
  {
    id: "dept-3",
    slug: "ferrous-non-ferrous-metal",
    number: "03",
    name: "Ferrous / Non-Ferrous Metal",
    tagline: "Certified Secondary Industrial Scrap & Pure Foundry Melts",
    overview:
      "Direct containerized sourcing of heavy melting steel scrap, pure millberry copper, brass alloys, and secondary aluminium for foundries and electric arc furnaces.",
    whatWeDo:
      "Hilful Ventures links global recycling yards and industrial teardowns with steelworks and non-ferrous smelters across Asia and the Middle East. Every consignment undergoes strict sorting, radiation screening, and density compaction to optimize furnace charge efficiency.",
    image: "/metals.jpg",
    coverImage: "/metals.jpg",
    icon: "Layers",
    specSummary: [
      { label: "Classification", value: "ISRI Code 200 – 206 / Birch / Honey / Tense" },
      { label: "Radiation Check", value: "Zero Radioactivity Clearance Certified" },
      { label: "Shipment Form", value: "Heavy Bales, Bundles or Loose in 20ft Containers" },
      { label: "Inspection", value: "SGS / Alex Stewart / Inspectorate Assay" },
    ],
    process: [
      { step: "01", title: "Origin Radiation Screening", desc: "100% portal sensor scan for zero radioactive elements, explosive hazard exclusion, and closed cylinder elimination." },
      { step: "02", title: "Hydraulic Shear & Baling", desc: "Density optimization through heavy mechanical shearing and multi-axis compression baling to maximize container payload." },
      { step: "03", title: "Weight Bridge & Seal Verification", desc: "Dual digital weighbridge verification and high-security customs bottle bolt sealing at port of loading." },
    ],
    qualityCertifications: ["ISRI Standard Compliance", "Pre-Shipment Inspection (PSIC) Certified", "Radiation Free Guarantee", "Port Health & Environmental Clearance"],
    faqs: [
      { q: "What is your standard ratio for HMS 1 & 2 blends?", a: "We consistently supply ISRI 200-206 compliant blends in guaranteed 80:20 or 90:10 ratios with guaranteed thickness criteria." },
      { q: "Do you supply Pre-Shipment Inspection Certificates (PSIC)?", a: "Yes. All scrap metal consignments moving into regulated ports include mandatory DGFT-approved PSIC documents with verified weighment." },
      { q: "What is the purity guarantee on copper millberry scrap?", a: "Our millberry copper wire scrap delivers 99.9% minimum copper purity, free from tin, enamel, solder, or foreign grease contamination." },
    ],
    products: [
      {
        id: "prod-201",
        slug: "hms-1-2-steel-scrap",
        name: "HMS 1 & 2 Steel Scrap",
        departmentSlug: "ferrous-non-ferrous-metal",
        departmentName: "Ferrous / Non-Ferrous Metal",
        shortDesc: "Heavy Melting Steel 80:20 blend, cut to furnace size, zero prohibited items.",
        fullDesc:
          "Consistently graded heavy melting steel scrap sourced from industrial dismantling, structural beams, and heavy machinery frames. Clean cut to lengths under 1.5 meters to ensure effortless induction and electric arc furnace charging with minimal slag residue.",
        image: "/metals.jpg",
        galleryImages: ["/metals.jpg", "/hero-mine.jpg"],
        specs: {
          name: "Heavy Melting Steel (HMS 1 & 2 Blend)",
          grade: "ISRI 200 - 206 (80:20 Ratio)",
          packaging: "Loose stuffed in heavy-duty 20ft ocean containers",
          moq: "100 Metric Tons (4-5 Containers)",
          origin: "East Africa / Middle East / Direct Industrial Source",
          purityOrForm: "Heavy carbon steel cut lengths (thickness >= 6mm for HMS 1)",
        },
        applications: [
          "Electric Arc Furnace (EAF) primary steelmaking",
          "Induction furnace foundry melting for construction rebar",
          "Forging billet and structural casting production",
        ],
        qualityDocs: ["Pre-Shipment Inspection Certificate (PSIC)", "Radiation Free Certificate", "Weighbridge Dual Slips", "Bill of Lading & Commercial Invoice"],
        shippingOptions: ["Containerized 20ft heavy payload (25-27 MT per TEU)", "CFR / CIF Major Asian & Middle Eastern Ports"],
        brochureUrl: "#enquire",
        featured: true,
      },
      {
        id: "prod-202",
        slug: "steel-scrap-turnings",
        name: "Steel Scrap & Cast Iron Turnings",
        departmentSlug: "ferrous-non-ferrous-metal",
        departmentName: "Ferrous / Non-Ferrous Metal",
        shortDesc: "Clean dry machine turnings and briquetted cast iron borings for foundry remelt.",
        fullDesc:
          "Uniformly sorted machining residues and iron foundry borings. Processed through centrifuge de-oiling or high-pressure hydraulic briquetting to minimize oxidation losses and maximize molten metal yield during cupola or induction melting.",
        image: "/metals.jpg",
        galleryImages: ["/metals.jpg"],
        specs: {
          name: "Cast Iron Borings & Steel Turnings",
          grade: "ISRI 220 - 223 Compliant",
          packaging: "Compressed dense briquettes or bulk container stuffed",
          moq: "50 Metric Tons",
          origin: "Certified Industrial Machining Centers",
          purityOrForm: "Low-moisture briquetted or shredded iron chips",
        },
        applications: [
          "Grey iron and ductile iron automotive casting",
          "Counterweight and ballast casting production",
          "Secondary remelting charge optimization",
        ],
        qualityDocs: ["Chemical Composition Assay", "Moisture & Oil Content Certificate", "PSIC Inspection Documentation"],
        shippingOptions: ["20ft heavy containers", "FOB / CIF options available"],
        brochureUrl: "#enquire",
        featured: false,
      },
      {
        id: "prod-203",
        slug: "copper-cathodes-scrap",
        name: "Copper Wire / Millberry & Birch Scrap",
        departmentSlug: "ferrous-non-ferrous-metal",
        departmentName: "Ferrous / Non-Ferrous Metal",
        shortDesc: "99.9% pure electrolytic copper wire scrap, unalloyed, stripped bright wire.",
        fullDesc:
          "Premium clean copper wire scrap free of enamel, solder, burned insulation, and excess oxidation. Sourced from high-voltage transmission lines, power transformer dismantlings, and industrial cable stripping facilities.",
        image: "/metals.jpg",
        galleryImages: ["/metals.jpg"],
        specs: {
          name: "Copper Wire Scrap (Millberry / Berry)",
          grade: "ISRI Barley / Berry / Millberry (99.9% Cu min)",
          packaging: "Hydraulic wire-tied bales or strapped bundles on pallets",
          moq: "25 Metric Tons (1 x 20ft FCL)",
          origin: "Africa / Middle East Selected Industrial Stock",
          purityOrForm: "Bright bare electrolytic copper wire >= 1.2mm gauge",
        },
        applications: [
          "Copper rod continuous casting and wire drawing",
          "Electrical busbar, transformer strip, and brass alloying",
          "High-conductivity electrical alloy manufacturing",
        ],
        qualityDocs: ["Spectrometer Chemical Assay", "Independent Assay Report (SGS/AHK)", "Customs Export Clearance", "Certificate of Origin"],
        shippingOptions: ["High-security locked 20ft ocean containers", "Insured CIF maritime freight"],
        brochureUrl: "#enquire",
        featured: true,
      },
      {
        id: "prod-204",
        slug: "aluminium-brass-lead",
        name: "Aluminium, Brass & Lead Scrap",
        departmentSlug: "ferrous-non-ferrous-metal",
        departmentName: "Ferrous / Non-Ferrous Metal",
        shortDesc: "Tense/Tabor aluminium, Honey brass scrap, and soft lead remelt ingots.",
        fullDesc:
          "Broad portfolio of non-ferrous foundry feeds including sorted aluminium sheet and cast scrap, clean yellow brass valves and turnings, and refined soft lead pigs for battery recycling and alloy manufacturing.",
        image: "/metals.jpg",
        galleryImages: ["/metals.jpg"],
        specs: {
          name: "Aluminium, Brass & Secondary Lead Scrap",
          grade: "ISRI Tense / Tabor / Honey / Radio Compliant",
          packaging: "Strapped bales, jumbo boxes, or steel-banded pallets",
          moq: "25 Metric Tons",
          origin: "Global Secondary Recyclers",
          purityOrForm: "Dense mechanically sorted alloy fractions",
        },
        applications: [
          "Secondary aluminium extrusion billet and ingot casting",
          "Plumbing fixture and brass rod manufacturing",
          "Lead acid battery plate manufacturing",
        ],
        qualityDocs: ["Spectrographic Chemical Analysis", "PSIC Certificate", "Weight & Packing Verification"],
        shippingOptions: ["20ft and 40ft standard dry containers"],
        brochureUrl: "#enquire",
        featured: false,
      },
    ],
  },
  {
    id: "dept-4",
    slug: "minerals-mud-chemicals",
    number: "04",
    name: "Minerals & Mud Chemicals to ONG Exploration",
    tagline: "High-Grade Iron Ore & Specialized Mud Chemicals for ONG Drilling",
    overview:
      "Our premium iron ore is sourced from reliable mines and is ideal for steel production and other metallurgical processes. It offers high iron content and low impurities, ensuring efficient and cost-effective operations.",
    whatWeDo:
      "Hilful Ventures delivers certified high-purity iron ore and specialized drilling mud chemicals for Oil & Natural Gas (ONG) exploration. Sourced from accredited extraction concessions, our iron ore supplies international steelmakers with verified Fe content and minimal silica/alumina impurities, while our drilling mud formulations guarantee borehole hydrostatic stability under harsh exploration regimes.",
    image: "/hero-mine.jpg",
    coverImage: "/hero-mine.jpg",
    icon: "Mountain",
    specSummary: [
      { label: "Iron Ore Fe Purity", value: "62% - 64.5% Fe Content Guaranteed" },
      { label: "Mud Chemistry Standard", value: "API Spec 13A Section 9 / 10 / 11" },
      { label: "Minimum Order Qty", value: "Bulk Vessel (5,000 MT+) / 1 FCL" },
      { label: "Quality Inspection", value: "SGS / Intertek Pre-Shipment Assay" },
    ],
    process: [
      { step: "01", title: "Mine-Head Assay & Sizing", desc: "Rigorous spectrometer assaying at extraction sites for high Fe percentage, low moisture, and controlled silica/alumina ratios." },
      { step: "02", title: "Mud Chemistry Formulation", desc: "Batch synthesis and rheology testing of drilling bentonite and mud polymers under simulated borehole thermodynamic pressures." },
      { step: "03", title: "Sealed Logistics & Vessel Loading", desc: "Bulk vessel trimmed loading or moisture-sealed multi-ply packaging with full Certificate of Analysis (COA) documentation." },
    ],
    qualityCertifications: [
      "SGS / Intertek Independent Chemical Assay",
      "API Specification 13A for ONG Drilling Formulations",
      "ISO 9001:2015 Extraction & Handling Verification",
      "Port Weighbridge & Radiation Clearance Certificates",
    ],
    faqs: [
      { q: "What is the Fe content and grade of your iron ore?", a: "We supply premium high-grade lump ore (10-40mm) and sintering fines ranging from 62% to 64.5% Fe with low silica, low alumina, and minimal phosphorus impurities." },
      { q: "What drilling mud chemicals are available for ONG exploration?", a: "Our line covers API-grade drilling bentonite, high-density barite weighting agents, PAC polymers, and specialized drill fluid rheology modifiers." },
      { q: "What shipment sizes and terms can you execute?", a: "We accommodate bulk vessel consignments (Handysize to Supramax, 15,000–55,000 MT) as well as containerized ocean shipments (FCL) on FOB or CIF gateway terms." },
    ],
    products: [
      {
        id: "prod-301",
        slug: "premium-iron-ore-lump-fines",
        name: "Premium Iron Ore (Lump & Fines)",
        departmentSlug: "minerals-mud-chemicals",
        departmentName: "Minerals & Mud Chemicals to ONG Exploration",
        shortDesc: "High Fe content (62%-64.5%) sourced from reliable mines, ideal for steel production.",
        fullDesc:
          "Our premium iron ore is sourced from reliable mines and is ideal for steel production and other metallurgical processes. It offers high iron content and low impurities, ensuring efficient and cost-effective operations across blast furnace, DRI (Direct Reduced Iron), and induction steelmaking.",
        image: "/hero-mine.jpg",
        galleryImages: ["/hero-mine.jpg", "/metals.jpg"],
        specs: {
          name: "Premium Iron Ore (Lump & Fines)",
          grade: "62.0% - 64.5% Fe Content Guaranteed",
          packaging: "Bulk Vessel Stowed / Big Bags on Pallets",
          moq: "5,000 Metric Tons (Bulk) / 100 MT (Containerized)",
          origin: "Certified Mining Concessions (India / East Africa)",
          purityOrForm: "Calibrated Lumps (10-40mm) or Sinter Fines (0-10mm)",
        },
        applications: [
          "Blast furnace primary ironmaking and steelmaking",
          "Direct Reduced Iron (DRI / Sponge Iron) manufacturing",
          "Foundry billet, rebar, and structural casting remelt",
        ],
        qualityDocs: ["Independent Assay Certificate (SGS/Intertek)", "Moisture & Grain Size Report", "Radiation Free Certificate", "Certificate of Origin"],
        shippingOptions: ["Bulk carrier vessel loading (FOB / CIF)", "20ft ocean containers with heavy payload"],
        brochureUrl: "#enquire",
        featured: true,
      },
      {
        id: "prod-302",
        slug: "drilling-mud-chemicals-ong",
        name: "ONG Drilling Mud Chemicals & Additives",
        departmentSlug: "minerals-mud-chemicals",
        departmentName: "Minerals & Mud Chemicals to ONG Exploration",
        shortDesc: "API 13A certified bentonite, barite, and fluid-loss polymers for Oil & Natural Gas drilling.",
        fullDesc:
          "Formulated specifically for oil and natural gas (ONG) exploration, our drilling mud chemistry portfolio delivers borehole wall stability, cuttings suspension, and hydrostatic pressure control across high-pressure high-temperature (HPHT) exploration environments.",
        image: "/chemicals.jpg",
        galleryImages: ["/chemicals.jpg", "/hero-mine.jpg"],
        specs: {
          name: "ONG Drilling Mud Chemical System",
          grade: "API Spec 13A Section 9 / 10 / 11 Compliant",
          packaging: "25kg Multi-wall Moisture-proof Bags / 1MT Jumbo Bags",
          moq: "20 Metric Tons (1 x 20ft FCL)",
          origin: "Direct Accredited Refinery",
          purityOrForm: "Dry free-flowing powders & rheology modifiers",
        },
        applications: [
          "Deep onshore and offshore oil and gas drilling rigs",
          "Borehole wall stabilization and shale swelling mitigation",
          "Horizontal directional drilling (HDD) and geothermal wells",
        ],
        qualityDocs: ["Certificate of Analysis (COA)", "Safety Data Sheet (SDS)", "API 13A Conformity Report"],
        shippingOptions: ["20ft ocean containers on ISPM-15 heat-treated pallets"],
        brochureUrl: "#enquire",
        featured: true,
      },
      {
        id: "prod-303",
        slug: "high-density-drilling-barite",
        name: "High-Density Drilling Barite (4.20 SG)",
        departmentSlug: "minerals-mud-chemicals",
        departmentName: "Minerals & Mud Chemicals to ONG Exploration",
        shortDesc: "Heavy weighting agent for ONG drill string pressure control and wellbore stability.",
        fullDesc:
          "Premium barium sulfate (BaSO4) weighing agent milled to API 13A particle size distributions. Provides exact fluid density control with minimal abrasive wear on mud pumps and drilling equipment.",
        image: "/chemicals.jpg",
        galleryImages: ["/chemicals.jpg"],
        specs: {
          name: "Drilling Barite (BaSO4)",
          grade: "API 13A Minimum 4.20 g/cm³ Specific Gravity",
          packaging: "1.5 MT Big Bags with multi-layer PE liner",
          moq: "50 Metric Tons",
          origin: "High-Grade Barite Reserves",
          purityOrForm: "Fine grey-tan powder >= 97% passing 200 mesh",
        },
        applications: [
          "Well kill and weighting fluids in ONG drilling",
          "High-pressure reservoir hydrostatic pressure balance",
          "Subsea well completion fluids",
        ],
        qualityDocs: ["Specific Gravity Test Certificate", "Heavy Metals Assay", "SGS Pre-Shipment Inspection"],
        shippingOptions: ["Containerized 20ft FCL / Bulk Breakbulk"],
        brochureUrl: "#enquire",
        featured: false,
      },
      {
        id: "prod-304",
        slug: "metallurgical-sinter-ore",
        name: "Metallurgical Sinter Ore & Mineral Concentrates",
        departmentSlug: "minerals-mud-chemicals",
        departmentName: "Minerals & Mud Chemicals to ONG Exploration",
        shortDesc: "Beneficiated mineral concentrates tailored for induction and electric arc furnace operations.",
        fullDesc:
          "Processed mineral ores and metallurgical charges prepared to rigorous customer sizing and moisture specifications, ensuring optimal furnace thermal efficiency.",
        image: "/hero-mine.jpg",
        galleryImages: ["/hero-mine.jpg"],
        specs: {
          name: "Sinter Feed Ore Concentrate",
          grade: "Custom Metallurgical Grade (60%+ Fe)",
          packaging: "Bulk Vessel or 25-ton 20ft Heavy Containers",
          moq: "100 Metric Tons",
          origin: "Direct Primary Extraction Hubs",
          purityOrForm: "Dry sized mineral concentrate",
        },
        applications: [
          "Foundry cupola furnace operations",
          "Ferroalloy and non-ferrous smelting",
          "Thermal metallurgy and rebar production",
        ],
        qualityDocs: ["Chemical Composition Assay", "Grain Size Distribution Certificate"],
        shippingOptions: ["Containerized or Bulk Vessel charter"],
        brochureUrl: "#enquire",
        featured: false,
      },
    ],
  },
  {
    id: "dept-5",
    slug: "quartz-and-fly-ash",
    number: "05",
    name: "Quartz and Fly Ash",
    tagline: "Pulverized Fuel Ash & High-Purity Natural Quartz for Industrial Infrastructure",
    overview:
      "Fly Ash (pulverized fuel ash) is a byproduct of a coal-based thermal power station generated by the combustion of pulverized coal. Fly Ash is a fine, grey amorphous powder.",
    whatWeDo:
      "Hilful Ventures delivers classified power station Fly Ash (Class F & Class C) and premium natural Quartz (lumps, grains, and micro-silica flour). Sourced from established thermal power stations and high-purity quartz reserves, our materials serve ready-mix concrete batching plants, cement kilns, glass manufacturing, ceramics, and advanced refractory linings worldwide.",
    image: "/metals.jpg",
    coverImage: "/metals.jpg",
    icon: "Gem",
    specSummary: [
      { label: "Fly Ash Specification", value: "ASTM C618 Class F / Class C / BS EN 450" },
      { label: "Fly Ash Powder Form", value: "Fine Grey Amorphous Powder (LOI < 3.0%)" },
      { label: "Quartz Silica Purity", value: "99.2% - 99.8% SiO2 (Fe2O3 < 0.02%)" },
      { label: "Packaging Standards", value: "1.2 MT / 1.4 MT Jumbo Bags with PE Liners" },
    ],
    process: [
      { step: "01", title: "Precipitator Collection & Air Sizing", desc: "Dry electrostatic precipitation from thermal power station flue gases with cyclone classification to eliminate unburned carbon." },
      { step: "02", title: "Quartz Optical Sorting & Milling", desc: "Rigorous optical sorting of snow-white natural quartz followed by iron-free silica sand and flour milling." },
      { step: "03", title: "Moisture-Sealed Containerization", desc: "High-strength UV-treated jumbo bags with hermetic polyethylene inner liners to guarantee zero moisture contamination during ocean freight." },
    ],
    qualityCertifications: [
      "ASTM C618 Standard Specification for Fly Ash in Concrete",
      "BS EN 450 European Pozzolanic Concrete Standard",
      "XRF Chemical Assay & Loss on Ignition (LOI) Verification",
      "Fineness Sieve & Blaine Surface Area Inspection",
    ],
    faqs: [
      { q: "What is Fly Ash and what is its role in concrete?", a: "Fly Ash (pulverized fuel ash) is a byproduct of coal-based thermal power stations generated by the combustion of pulverized coal. Fly Ash is a fine, grey amorphous powder. It acts as a pozzolan, reacting with calcium hydroxide to form durable calcium silicate hydrate, reducing permeability and heat of hydration in concrete." },
      { q: "What silica content do you guarantee for your Quartz?", a: "Our natural quartz delivers between 99.2% and 99.8% SiO2 with ultra-low iron content (Fe2O3 < 0.02%), making it ideal for solar glass, optical ceramics, and artificial stone countertops." },
      { q: "What packaging and delivery methods are available?", a: "We supply in 1.2–1.4 MT moisture-proof jumbo bags stuffed into 20ft ocean containers (26–27 MT per TEU) as well as breakbulk vessel shipments." },
    ],
    products: [
      {
        id: "prod-401",
        slug: "pulverized-fuel-fly-ash",
        name: "Pulverized Fuel Fly Ash (Class F / Class C)",
        departmentSlug: "quartz-and-fly-ash",
        departmentName: "Quartz and Fly Ash",
        shortDesc: "Fine, grey amorphous powder byproduct of coal power stations, ASTM C618 compliant.",
        fullDesc:
          "Fly Ash (pulverized fuel ash) is a byproduct of a coal-based thermal power station generated by the combustion of pulverized coal. Fly Ash is a fine, grey amorphous powder. It acts as a high-performance pozzolanic supplementary cementitious material, reducing heat of hydration, mitigating alkali-silica reaction, and dramatically enhancing concrete durability.",
        image: "/metals.jpg",
        galleryImages: ["/metals.jpg", "/chemicals.jpg"],
        specs: {
          name: "Pulverized Fuel Fly Ash",
          grade: "ASTM C618 Class F & Class C / BS EN 450 Compliant",
          packaging: "1.2 MT to 1.4 MT Jumbo Bags with PE liner, or Bulk Bulker",
          moq: "50 Metric Tons (2 x 20ft FCL)",
          origin: "Modern Coal-Based Thermal Power Stations",
          purityOrForm: "Fine grey amorphous powder (Loss on Ignition < 3.0%)",
        },
        applications: [
          "Ready-mix concrete and precast infrastructure components",
          "Portland Pozzolana Cement (PPC) manufacturing",
          "Geopolymer bricks, structural embankments, and mine backfill",
        ],
        qualityDocs: ["ASTM C618 Compliance Certificate", "Loss on Ignition (LOI) Assay", "Blaine Fineness Report", "Certificate of Origin"],
        shippingOptions: ["20ft ocean containers with heavy payload (~26-27 MT per TEU)", "Bulk pneumatic bulker tankers"],
        brochureUrl: "#enquire",
        featured: true,
      },
      {
        id: "prod-402",
        slug: "high-purity-silica-quartz",
        name: "High-Purity Natural Quartz (Lumps & Granules)",
        departmentSlug: "quartz-and-fly-ash",
        departmentName: "Quartz and Fly Ash",
        shortDesc: "Snow-white natural silica quartz 99.5%+ SiO2, ultra-low iron, for glass and ceramics.",
        fullDesc:
          "Sourced from crystalline quartz veins and optically sorted to eliminate metallic and mica inclusions. Provides consistent hardness (Mohs 7), thermal stability, and chemically inert matrix for flat glass, container glass, and high-voltage electrical porcelain.",
        image: "/hero-mine.jpg",
        galleryImages: ["/hero-mine.jpg", "/metals.jpg"],
        specs: {
          name: "High-Purity Natural Quartz",
          grade: "SiO2 >= 99.5%, Fe2O3 <= 0.02%",
          packaging: "1.0 MT Jumbo Bags with multi-layer liner",
          moq: "25 Metric Tons (1 x 20ft FCL)",
          origin: "Certified Virgin Quartz Quarries",
          purityOrForm: "Snow-white crystalline lumps (25-100mm) or sized granules",
        },
        applications: [
          "Float glass and specialty container glass fabrication",
          "Ceramic sanitaryware, frit, and porcelain glaze formulations",
          "Engineered stone and artificial quartz countertop manufacturing",
        ],
        qualityDocs: ["XRF Chemical Assay Report", "Optical Purity Certification", "Grain Size Distribution Analysis"],
        shippingOptions: ["20ft ocean containers", "FOB / CIF major international ports"],
        brochureUrl: "#enquire",
        featured: true,
      },
      {
        id: "prod-403",
        slug: "micronized-silica-quartz-powder",
        name: "Micronized Quartz Powder / Silica Flour",
        departmentSlug: "quartz-and-fly-ash",
        departmentName: "Quartz and Fly Ash",
        shortDesc: "Micro-milled 300 to 500 mesh quartz powder for paint, epoxies, and refractory coatings.",
        fullDesc:
          "Iron-free ball milled crystalline silica flour with controlled particle size distribution. Delivers superior abrasion resistance, dimensional stability, and optical clarity in industrial coatings, specialty resins, and refractory ramming masses.",
        image: "/chemicals.jpg",
        galleryImages: ["/chemicals.jpg"],
        specs: {
          name: "Micronized Silica Flour",
          grade: "300 Mesh / 400 Mesh / 500 Mesh (99.2% SiO2)",
          packaging: "25kg / 50kg HDPE bags on shrink-wrapped pallets",
          moq: "20 Metric Tons",
          origin: "Precision Mineral Milling Facilities",
          purityOrForm: "Super-fine snow-white powder",
        },
        applications: [
          "Industrial epoxy coatings and marine anti-corrosion paints",
          "Refractory castables and foundry mould washes",
          "Silicone rubber, polymer sealants, and adhesive fillers",
        ],
        qualityDocs: ["Particle Size Distribution (PSD) Laser Analysis", "Spectrometer Assay"],
        shippingOptions: ["Palletized 20ft ocean containers"],
        brochureUrl: "#enquire",
        featured: false,
      },
      {
        id: "prod-404",
        slug: "cenospheres-thermal-microspheres",
        name: "Cenospheres & Thermal Bottom Ash",
        departmentSlug: "quartz-and-fly-ash",
        departmentName: "Quartz and Fly Ash",
        shortDesc: "Lightweight hollow ceramic microspheres and granular bottom ash aggregate.",
        fullDesc:
          "Naturally buoyant hollow silicate microspheres recovered from thermal power station ash lagoons. Provides exceptional strength-to-weight ratio, low thermal conductivity, and fire-resistant insulating properties for aerospace, drilling cements, and acoustic building boards.",
        image: "/metals.jpg",
        galleryImages: ["/metals.jpg"],
        specs: {
          name: "Thermal Cenospheres",
          grade: "True Density 0.70 - 0.85 g/cm³, Al2O3 >= 30%",
          packaging: "500kg - 600kg Big Bags with plastic inner liner",
          moq: "15 Metric Tons",
          origin: "Thermal Power Station Flotation Plants",
          purityOrForm: "Hollow spherical light-grey/tan microspheres",
        },
        applications: [
          "Lightweight oil well cementing slurries",
          "Thermal insulation coatings and syntactic foams",
          "Automotive composite plastics and acoustic paneling",
        ],
        qualityDocs: ["Bulk Density & Sieve Analysis", "Crush Strength Test Report"],
        shippingOptions: ["40ft High Cube containers for maximum volumetric load"],
        brochureUrl: "#enquire",
        featured: false,
      },
    ],
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Sourcing & Origin Verification",
    desc: "Long-term direct contracts with vetted refineries, mining concessions, and certified industrial recycling yards across Asia, Africa, and the Middle East.",
    image: "/chemicals.jpg",
  },
  {
    number: "02",
    title: "Testing & Laboratory Assay",
    desc: "Rigorous third-party pre-shipment inspections (SGS, Intertek, Bureau Veritas) confirming API standards, moisture limits, and zero radiation.",
    image: "/metals.jpg",
  },
  {
    number: "03",
    title: "Packing & Palletization",
    desc: "Maritime grade multi-ply packaging, hermetic moisture barriers, high-density hydraulic baling, and ISPM-15 heat-treated export pallets.",
    image: "/waste-tyres.jpg",
  },
  {
    number: "04",
    title: "Documentation & Regulatory Compliance",
    desc: "Complete documentation packs including verified Certificate of Analysis (COA), Bill of Lading, Certificate of Origin, SDS, and customs clearances.",
    image: "/chemicals.jpg",
  },
  {
    number: "05",
    title: "Global Maritime Dispatch",
    desc: "Scheduled ocean liner bookings from Chennai, Mumbai, Djibouti, and Jebel Ali to deepwater ports worldwide with real-time container tracking.",
    image: "/hero-mine.jpg",
  },
];

export const WHY_US_ITEMS = [
  {
    number: "01",
    title: "Focused 5-Sector Specialization",
    desc: "We concentrate exclusively on Gold Mining & Extraction, Drilling Chemicals, Secondary Metals, Minerals & Mud Chemicals for ONG Exploration, and Quartz & Fly Ash — ensuring deep domain expertise and consistent grade precision.",
  },
  {
    number: "02",
    title: "Dual Presence: India & East Africa",
    desc: "Our dual-office footprint in Chennai (India) and Assosa (Ethiopia) gives us unique direct access to raw commodity origins and high-throughput export lanes.",
  },
  {
    number: "03",
    title: "Zero-Compromise Quality Assurance",
    desc: "Every consignment is backed by independent inspection certificates, laboratory assay curves, and strict compliance with international standards.",
  },
  {
    number: "04",
    title: "Secure Contractual Reliability",
    desc: "Transparent CIF and FOB terms, flexible banking arrangements including confirmed Letters of Credit (LC), and guaranteed vessel booking windows.",
  },
];

export const TESTIMONIALS = [
  {
    quote: "Hilful Ventures has been our reliable partner for API 13A drilling fluid polymers across three exploration campaigns. Delivery to port was on schedule and the batch COAs were spot on.",
    author: "Senior Drilling Operations Manager",
    company: "Gulf Energy & Drilling Services",
    location: "UAE & Oman",
  },
  {
    quote: "Sourcing consistent HMS 1&2 steel scrap without non-metallic contraries is difficult in this market. Hilful Ventures delivers clean cut scrap with verified weighbridge slips every time.",
    author: "Head of Procurement",
    company: "Apex Steel Foundries Ltd",
    location: "South Asia",
  },
  {
    quote: "The OCC Grade 11 bales from Hilful arrive with consistently low moisture under 12%, which prevents fiber degradation during transit and improves our testliner mill yields significantly.",
    author: "Pulp Furnish Director",
    company: "International Paper & Packaging Corp",
    location: "Middle East",
  },
];

export const GLOBAL_HUBS = [
  { name: "Chennai Port (HQ)", coords: [80.27, 13.08], role: "Global Commercial Desk & Indian Ocean Gateway", country: "India" },
  { name: "Assosa Woreda", coords: [34.53, 10.06], role: "East African Operations & Regional Liaison", country: "Ethiopia" },
  { name: "Djibouti Port", coords: [43.14, 11.58], role: "Strategic Horn of Africa Transit Terminal", country: "Djibouti" },
  { name: "Jebel Ali / Dubai", coords: [55.02, 24.98], role: "Middle East Re-Export & Financing Hub", country: "UAE" },
  { name: "Singapore", coords: [103.81, 1.35], role: "Southeast Asia Transshipment Channel", country: "Singapore" },
  { name: "Rotterdam", coords: [4.47, 51.92], role: "European Gateway & Secondary Metals Distribution", country: "Netherlands" },
  { name: "Houston Ship Channel", coords: [-95.28, 29.74], role: "North American Specialty Chemical Procurement", country: "USA" },
];
