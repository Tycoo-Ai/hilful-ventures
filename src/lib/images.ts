/**
 * Hilful Ventures Pvt Ltd — Centralized Image System
 *
 * Source of truth for all imagery across the application.
 * Architecture:
 * - Development: Curated high-resolution industrial/mining photography placeholders
 * - Production: Direct drop-in swap via Admin Media Library / Cloudinary CDN
 * - Next.js Image optimization (width, height, priority, responsive sizes)
 */

export interface ImageAsset {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio?: "16/9" | "21/9" | "4/3" | "1/1" | "16/7" | "3/2";
  priority?: boolean;
  category?: string;
  caption?: string;
}

export const homeImages = {
  hero: {
    id: "hero-industrial",
    // Premium open-pit mining / geological landscape
    src: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=2000&q=85",
    alt: "Representative open-pit mining landscape and heavy industrial extraction terrain",
    width: 2000,
    height: 900,
    priority: true,
    aspectRatio: "16/7",
    caption: "Representative geological terrain and industrial mining operations",
  },
  about: {
    id: "about-geology",
    // Geologist inspecting core / geological stratification
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85",
    alt: "Representative geological terrain and mineral resource exploration mapping",
    width: 1400,
    height: 950,
    aspectRatio: "4/3",
    caption: "Representative geological modeling and subsurface evaluation framework",
  },
  capabilities: {
    exploration: {
      id: "cap-exploration",
      src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
      alt: "Representative geological core drilling and survey instruments",
      width: 1200,
      height: 800,
      aspectRatio: "16/9",
      caption: "Representative minerals and oil prospecting operations",
    },
    equipment: {
      id: "cap-equipment",
      src: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=85",
      alt: "Representative heavy mining excavators and earthmoving machinery fleet",
      width: 1200,
      height: 800,
      aspectRatio: "16/9",
      caption: "Representative mining machinery deployment and fleet logistics",
    },
    projectManagement: {
      id: "cap-project-mgmt",
      src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85",
      alt: "Representative mining civil infrastructure and processing plant setup",
      width: 1200,
      height: 800,
      aspectRatio: "16/9",
      caption: "Representative extraction and processing infrastructure management",
    },
    commodities: {
      id: "cap-commodities",
      src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
      alt: "Representative bulk mineral commodities freight terminal and logistics",
      width: 1200,
      height: 800,
      aspectRatio: "16/9",
      caption: "Representative physical commodities procurement and supply chain delivery",
    },
  },
  equipmentCatalog: [
    {
      id: "eq-excavator",
      name: "Heavy Hydraulic Excavators",
      category: "Excavators",
      src: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=900&q=80",
      alt: "Representative heavy hydraulic excavator operating at extraction face",
      description: "High-capacity extraction and material handling equipment for active mining benches.",
      width: 900,
      height: 600,
    },
    {
      id: "eq-haultruck",
      name: "Rigid Haul Trucks",
      category: "Haul Trucks",
      src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80",
      alt: "Representative off-highway heavy mining haul truck transporting bulk ore",
      description: "Heavy-duty off-highway payload transport engineered for continuous haulage cycles.",
      width: 900,
      height: 600,
    },
    {
      id: "eq-wheel-loader",
      name: "Large Wheel Loaders",
      category: "Wheel Loaders",
      src: "https://images.unsplash.com/photo-1579781354186-012d7e850ad7?auto=format&fit=crop&w=900&q=80",
      alt: "Representative industrial wheel loader at material handling yard",
      description: "High-volume bucket loading for stockpiles, crushing feed, and railhead transfers.",
      width: 900,
      height: 600,
    },
    {
      id: "eq-dozer",
      name: "Track-Type Dozers",
      category: "Dozers",
      src: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
      alt: "Representative heavy track bulldozer on mining haul road preparation",
      description: "High-traction earthmoving and site grading machinery for bench maintenance and haul road construction.",
      width: 900,
      height: 600,
    },
    {
      id: "eq-drill-rig",
      name: "Rotary & Blast-Hole Drill Rigs",
      category: "Drill Rigs",
      src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
      alt: "Representative surface rotary blast-hole drilling rig on bench",
      description: "Precision penetration drill rigs for exploratory coring, pre-split, and production blast patterns.",
      width: 900,
      height: 600,
    },
    {
      id: "eq-crusher",
      name: "Mobile Crushing & Screening Plants",
      category: "Mobile Crushing / Screening",
      src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
      alt: "Representative mobile track crushing and aggregate screening plant",
      description: "Rapidly deployable track-mounted primary crushers and multi-deck screening units for on-site sizing.",
      width: 900,
      height: 600,
    },
  ],
  hse: {
    id: "hse-stewardship",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=85",
    alt: "Representative ecosystem preservation and sustainable industrial environmental management",
    width: 1400,
    height: 800,
    aspectRatio: "16/9",
    caption: "Representative operational discipline protecting regional ecosystems and local communities",
  },
  showcase: [
    {
      id: "gal-1",
      title: "Mining Operations",
      category: "Mining & Extraction",
      src: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=85",
      alt: "Representative industrial open-pit mining bench operations",
      caption: "Representative open-bench extractive operations and material haulage",
      width: 1200,
      height: 800,
    },
    {
      id: "gal-2",
      title: "Heavy Equipment Fleet",
      category: "Heavy Equipment",
      src: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=85",
      alt: "Representative hydraulic excavators deployed at project site",
      caption: "Representative high-availability machinery operating under preventative maintenance",
      width: 1200,
      height: 800,
    },
    {
      id: "gal-3",
      title: "Geological Exploration",
      category: "Exploration",
      src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
      alt: "Representative geological stratigraphic assessment in rugged terrain",
      caption: "Representative surface mapping and core evaluation across frontier plays",
      width: 1200,
      height: 800,
    },
    {
      id: "gal-4",
      title: "Bulk Commodities Logistics",
      category: "Commodities & Logistics",
      src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
      alt: "Representative bulk industrial freight terminal and multi-modal handling",
      caption: "Representative cross-border logistics and chain-of-custody execution",
      width: 1200,
      height: 800,
    },
    {
      id: "gal-5",
      title: "Processing Infrastructure",
      category: "Processing",
      src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85",
      alt: "Representative turnkey processing plant civil works and assembly",
      caption: "Representative site civil works and primary processing setup",
      width: 1200,
      height: 800,
    },
    {
      id: "gal-6",
      title: "Field Deployment",
      category: "Field Operations",
      src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=85",
      alt: "Representative haulage equipment operating on access roads",
      caption: "Representative continuous fleet utilization and telematics monitoring",
      width: 1200,
      height: 800,
    },
  ],
} as const;

export const aboutImages = {
  hero: {
    id: "about-hero",
    src: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=2000&q=85",
    alt: "Representative industrial mining terrain and large-scale extractive infrastructure",
    width: 2000,
    height: 900,
    priority: true,
  },
  whoWeAre: {
    id: "about-who-we-are",
    src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
    alt: "Representative industrial engineering oversight and field operational management",
    width: 1200,
    height: 900,
  },
  operatingModel: {
    id: "about-model",
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=85",
    alt: "Representative integrated industrial project development and extraction infrastructure",
    width: 1400,
    height: 800,
  },
  hse: {
    id: "about-hse",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=85",
    alt: "Representative operational safety protocols and site inspection standards",
    width: 1200,
    height: 800,
  },
} as const;

export const servicesImages = {
  hero: {
    id: "services-hero",
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=85",
    alt: "Representative integrated industrial mining, energy exploration, and resource development",
    width: 2000,
    height: 900,
    priority: true,
  },
  exploration: {
    id: "serv-exploration",
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
    alt: "Representative geological mapping, core drilling, and resource evaluation framework",
    width: 1200,
    height: 800,
  },
  equipment: {
    id: "serv-equipment",
    src: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=85",
    alt: "Representative heavy mining fleet leasing, hydraulic excavators, and haulage machinery",
    width: 1200,
    height: 800,
  },
  projectManagement: {
    id: "serv-project-mgmt",
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85",
    alt: "Representative turnkey mining civil works, infrastructure development, and extraction management",
    width: 1200,
    height: 800,
  },
  commodities: {
    id: "serv-commodities",
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
    alt: "Representative mineral and hydrocarbon commodities physical trading and terminal logistics",
    width: 1200,
    height: 800,
  },
} as const;
