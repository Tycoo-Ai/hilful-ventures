import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { DEPARTMENTS, type DepartmentItem, type ProductItem } from "@/data/hilful-data";
import { homeContent, type HomeContent } from "@/data/home-content";
import { aboutContentEn, aboutContentAr, type AboutContent } from "@/data/about-content";
import cmsAboutDefault from "@/data/cms-about.json";
import { saveCloudJson, getCloudJson } from "@/lib/cloud-storage";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src", "data");
const DEPTS_FILE = path.join(DATA_DIR, "cms-departments.json");
const PRODS_FILE = path.join(DATA_DIR, "cms-products.json");
const HOME_FILE = path.join(DATA_DIR, "cms-home.json");
const ABOUT_FILE = path.join(DATA_DIR, "cms-about.json");
const GALLERY_FILE = path.join(DATA_DIR, "cms-gallery.json");
const MINING_SITES_FILE = path.join(DATA_DIR, "cms-mining-sites.json");

const memoryCache = new Map<string, any>();
const TMP_DIR = path.join("/tmp", "hilful-data");

function getTmpPath(filePath: string): string {
  const fileName = path.basename(filePath);
  return path.join(TMP_DIR, fileName);
}

function ensureDirectoryExists() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch {}
}

function readJsonFile<T>(filePath: string): T | null {
  if (memoryCache.has(filePath)) {
    return memoryCache.get(filePath) as T;
  }
  try {
    const tmpPath = getTmpPath(filePath);
    if (fs.existsSync(tmpPath)) {
      const data = fs.readFileSync(tmpPath, "utf-8");
      const parsed = JSON.parse(data) as T;
      memoryCache.set(filePath, parsed);
      return parsed;
    }
  } catch {}

  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(data) as T;
      memoryCache.set(filePath, parsed);
      return parsed;
    }
  } catch (err) {
    console.warn(`[CMS Service] Failed to read ${filePath}:`, err);
  }
  return null;
}

function writeJsonFile<T>(filePath: string, data: T): void {
  memoryCache.set(filePath, data);
  try {
    ensureDirectoryExists();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    try {
      if (!fs.existsSync(TMP_DIR)) {
        fs.mkdirSync(TMP_DIR, { recursive: true });
      }
      fs.writeFileSync(getTmpPath(filePath), JSON.stringify(data, null, 2), "utf-8");
    } catch (tmpErr) {
      console.warn(`[CMS Service] /tmp fallback also failed for ${filePath}:`, tmpErr);
    }
  }
}

/**
 * Universal Cache Invalidation
 */
export function revalidateWebRoutes(paths: string[] = []) {
  try {
    revalidatePath("/", "layout");
    revalidatePath("/[locale]", "layout");
    revalidatePath("/en", "layout");
    revalidatePath("/ar", "layout");
    for (const p of paths) {
      try {
        revalidatePath(p);
      } catch {}
    }
  } catch {
    // In background or build contexts revalidatePath might no-op safely
  }
}

// ============================================================================
// DEPARTMENTS SERVICE
// ============================================================================

export async function getDepartmentsServer(): Promise<DepartmentItem[]> {
  // 1. Check persistent Cloudinary storage first
  try {
    const cloudDepts = await getCloudJson<DepartmentItem[]>("cms-departments");
    if (cloudDepts && Array.isArray(cloudDepts) && cloudDepts.length > 0) {
      writeJsonFile(DEPTS_FILE, cloudDepts);
      return cloudDepts;
    }
  } catch {}

  // 2. Fallback to local file store
  const cached = readJsonFile<DepartmentItem[]>(DEPTS_FILE);
  if (cached && Array.isArray(cached) && cached.length > 0) {
    return cached;
  }

  // 3. Try Prisma database
  try {
    const dbDepts = await prisma.department.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        products: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (dbDepts && dbDepts.length > 0) {
      const formatted: DepartmentItem[] = dbDepts.map((d) => ({
        id: d.id,
        slug: d.slug,
        number: d.number,
        name: d.name,
        tagline: d.tagline,
        overview: d.overview,
        whatWeDo: d.whatWeDo,
        image: d.image,
        coverImage: d.coverImage,
        icon: d.icon || "Layers",
        products: (d.products || []).map((p) => ({
          id: p.id,
          slug: p.slug,
          name: p.name,
          departmentSlug: p.departmentSlug,
          departmentName: p.departmentName,
          shortDesc: p.shortDesc,
          fullDesc: p.fullDesc,
          image: p.image,
          galleryImages: p.galleryImages || [p.image],
          specs: (p.specs as any) || { name: p.name, grade: "", packaging: "", moq: "", origin: "Global" },
          applications: p.applications || [],
          qualityDocs: p.qualityDocs || ["COA", "SDS"],
          shippingOptions: p.shippingOptions || ["FOB", "CIF Global Gateway Ports"],
          brochureUrl: p.brochureUrl || undefined,
        })),
        specSummary: (d.specSummary as any) || [],
        process: (d.process as any) || [],
        qualityCertifications: (d.qualityCertifications as any) || [],
        faqs: (d.faqs as any) || [],
      }));

      // Cache to disk
      writeJsonFile(DEPTS_FILE, formatted);
      return formatted;
    }
  } catch (err) {
    console.warn("[CMS Service] Prisma department fetch fallback:", err);
  }

  // 3. Fallback to default Hilful data and persist to disk
  writeJsonFile(DEPTS_FILE, DEPARTMENTS);
  return DEPARTMENTS;
}

export async function getDepartmentBySlugServer(slug: string): Promise<DepartmentItem | null> {
  const depts = await getDepartmentsServer();
  const normalizedSlug =
    slug === "waste-paper" ? "minerals-mud-chemicals" :
    slug === "used-tyres" ? "quartz-and-fly-ash" :
    slug;
  const dept = depts.find((d) => d.slug === normalizedSlug) || null;
  if (!dept) return null;

  // Hydrate products with latest live products store so product changes (photos, specs, MOQ)
  // are immediately visible on the department page!
  try {
    const allProds = await getProductsServer();
    const deptProds = allProds.filter((p) => p.departmentSlug === dept.slug);
    if (deptProds.length > 0) {
      return { ...dept, products: deptProds };
    }
  } catch {}

  return dept;
}

export async function saveDepartmentServer(dept: DepartmentItem): Promise<DepartmentItem> {
  const current = await getDepartmentsServer();
  const existingIdx = current.findIndex((d) => d.slug === dept.slug || d.id === dept.id);

  let updatedList: DepartmentItem[];
  if (existingIdx >= 0) {
    updatedList = [...current];
    updatedList[existingIdx] = {
      ...current[existingIdx],
      ...dept,
    };
  } else {
    updatedList = [...current, dept];
  }

  // Persist to local disk JSON store immediately
  writeJsonFile(DEPTS_FILE, updatedList);

  // Persist to Cloudinary raw storage
  try {
    await saveCloudJson("cms-departments", updatedList);
  } catch (cloudErr) {
    console.warn("[CMS Service] Cloudinary department save warning:", cloudErr);
  }

  // Persist to Prisma DB asynchronously (best effort)
  try {
    await prisma.department.upsert({
      where: { slug: dept.slug },
      update: {
        name: dept.name,
        tagline: dept.tagline,
        overview: dept.overview,
        whatWeDo: dept.whatWeDo,
        image: dept.image,
        coverImage: dept.coverImage || dept.image,
        number: dept.number,
        icon: dept.icon || "Layers",
        specSummary: (dept.specSummary as any) || [],
        process: (dept.process as any) || [],
        qualityCertifications: (dept.qualityCertifications as any) || [],
        faqs: (dept.faqs as any) || [],
        updatedAt: new Date(),
      },
      create: {
        id: dept.id || `dept-${Date.now()}`,
        slug: dept.slug,
        name: dept.name,
        tagline: dept.tagline,
        overview: dept.overview,
        whatWeDo: dept.whatWeDo,
        image: dept.image,
        coverImage: dept.coverImage || dept.image,
        number: dept.number || "01",
        icon: dept.icon || "Layers",
        specSummary: (dept.specSummary as any) || [],
        process: (dept.process as any) || [],
        qualityCertifications: (dept.qualityCertifications as any) || [],
        faqs: (dept.faqs as any) || [],
      },
    });
  } catch (err) {
    console.warn("[CMS Service] Prisma department upsert warning:", err);
  }

  // Invalidate Next.js cache so web pages reflect immediately
  revalidateWebRoutes([
    `/en/departments/${dept.slug}`,
    `/ar/departments/${dept.slug}`,
    "/en/products",
    "/ar/products",
    "/admin/departments",
  ]);

  return dept;
}

// ============================================================================
// PRODUCTS SERVICE
// ============================================================================

export async function getProductsServer(departmentSlug?: string): Promise<ProductItem[]> {
  let products: ProductItem[] = [];

  // 1. Check persistent Cloudinary storage first
  try {
    const cloudProds = await getCloudJson<ProductItem[]>("cms-products");
    if (cloudProds && Array.isArray(cloudProds) && cloudProds.length > 0) {
      writeJsonFile(PRODS_FILE, cloudProds);
      products = cloudProds;
    }
  } catch {}

  // 2. Check local JSON file if cloud didn't return
  if (products.length === 0) {
    const cached = readJsonFile<ProductItem[]>(PRODS_FILE);
    if (cached && Array.isArray(cached) && cached.length > 0) {
      products = cached;
    }
  }

  // 3. Fallback to Prisma database
  if (products.length === 0) {
    try {
      const dbProds = await prisma.product.findMany({
        orderBy: { sortOrder: "asc" },
      });

      if (dbProds && dbProds.length > 0) {
        products = dbProds.map((p) => ({
          id: p.id,
          slug: p.slug,
          name: p.name,
          departmentSlug: p.departmentSlug,
          departmentName: p.departmentName,
          shortDesc: p.shortDesc,
          fullDesc: p.fullDesc,
          image: p.image,
          galleryImages: p.galleryImages || [p.image],
          specs: (p.specs as any) || { name: p.name, grade: "", packaging: "", moq: "", origin: "Global" },
          applications: p.applications || [],
          qualityDocs: p.qualityDocs || ["COA", "SDS"],
          shippingOptions: p.shippingOptions || ["FOB", "CIF Global Gateway Ports"],
          brochureUrl: p.brochureUrl || undefined,
        }));
        writeJsonFile(PRODS_FILE, products);
      }
    } catch (err) {
      console.warn("[CMS Service] Prisma product fetch fallback:", err);
    }
  }

    // 4. Fallback from DEPARTMENTS flatMap
    if (products.length === 0) {
      const depts = await getDepartmentsServer();
      products = depts.flatMap((d) => d.products);
      writeJsonFile(PRODS_FILE, products);
    }

  if (departmentSlug && departmentSlug !== "all") {
    return products.filter((p) => p.departmentSlug === departmentSlug);
  }
  return products;
}

export async function getProductBySlugServer(slug: string): Promise<ProductItem | null> {
  const prods = await getProductsServer();
  return prods.find((p) => p.slug === slug) || null;
}

export async function saveProductServer(product: ProductItem): Promise<ProductItem> {
  const current = await getProductsServer();
  const existingIdx = current.findIndex((p) => p.slug === product.slug || p.id === product.id);

  let updatedList: ProductItem[];
  if (existingIdx >= 0) {
    updatedList = [...current];
    updatedList[existingIdx] = {
      ...current[existingIdx],
      ...product,
    };
  } else {
    updatedList = [product, ...current];
  }

  // Persist to local disk JSON store immediately
  writeJsonFile(PRODS_FILE, updatedList);

  // Persist to Cloudinary raw JSON for cross-serverless persistence
  try {
    await saveCloudJson("cms-products", updatedList);
  } catch (cloudErr) {
    console.warn("[CMS Service] Cloudinary product save warning:", cloudErr);
  }

  // Also update parent department in departments store
  try {
    const depts = await getDepartmentsServer();
    const deptIdx = depts.findIndex((d) => d.slug === product.departmentSlug);
    if (deptIdx >= 0) {
      const targetDept = depts[deptIdx];
      const prodInDeptIdx = targetDept.products.findIndex((p) => p.slug === product.slug);
      if (prodInDeptIdx >= 0) {
        targetDept.products[prodInDeptIdx] = product;
      } else {
        targetDept.products.push(product);
      }
      writeJsonFile(DEPTS_FILE, depts);
      try {
        await saveCloudJson("cms-departments", depts);
      } catch (cloudDeptErr) {
        console.warn("[CMS Service] Cloudinary department update warning:", cloudDeptErr);
      }
    }
  } catch (syncErr) {
    console.warn("[CMS Service] Department product sync warning:", syncErr);
  }

  // Persist to Prisma DB
  try {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        departmentSlug: product.departmentSlug,
        departmentName: product.departmentName,
        shortDesc: product.shortDesc,
        fullDesc: product.fullDesc,
        image: product.image,
        galleryImages: product.galleryImages || [product.image],
        specs: (product.specs as any) || {},
        applications: product.applications || [],
        qualityDocs: product.qualityDocs || [],
        shippingOptions: product.shippingOptions || [],
        brochureUrl: product.brochureUrl || null,
        updatedAt: new Date(),
      },
      create: {
        id: product.id || `prod-${Date.now()}`,
        slug: product.slug,
        name: product.name,
        departmentSlug: product.departmentSlug,
        departmentName: product.departmentName,
        shortDesc: product.shortDesc,
        fullDesc: product.fullDesc,
        image: product.image,
        galleryImages: product.galleryImages || [product.image],
        specs: (product.specs as any) || {},
        applications: product.applications || [],
        qualityDocs: product.qualityDocs || [],
        shippingOptions: product.shippingOptions || [],
        brochureUrl: product.brochureUrl || null,
      },
    });
  } catch (err) {
    console.warn("[CMS Service] Prisma product upsert warning:", err);
  }

  // Revalidate Next.js cache
  revalidateWebRoutes([
    "/en/products",
    "/ar/products",
    `/en/products/${product.slug}`,
    `/ar/products/${product.slug}`,
    `/en/departments/${product.departmentSlug}`,
    `/ar/departments/${product.departmentSlug}`,
    "/admin/products",
  ]);

  return product;
}

export async function deleteProductServer(slugOrId: string): Promise<boolean> {
  const current = await getProductsServer();
  const updatedList = current.filter((p) => p.slug !== slugOrId && p.id !== slugOrId);
  writeJsonFile(PRODS_FILE, updatedList);

  try {
    await saveCloudJson("cms-products", updatedList);
  } catch (cloudErr) {
    console.warn("[CMS Service] Cloudinary product delete warning:", cloudErr);
  }

  try {
    await prisma.product.deleteMany({
      where: {
        OR: [{ slug: slugOrId }, { id: slugOrId }],
      },
    });
  } catch (err) {
    console.warn("[CMS Service] Prisma product delete warning:", err);
  }

  revalidateWebRoutes(["/en/products", "/ar/products", "/admin/products"]);
  return true;
}

// ============================================================================
// HOME CMS SERVICE
// ============================================================================

export interface HomeDiskData {
  en?: Partial<HomeContent>;
  ar?: Partial<HomeContent>;
}

export async function getHomeServer(locale: "en" | "ar" = "en"): Promise<HomeContent> {
  const base = JSON.parse(JSON.stringify(homeContent[locale]));
  let disk: HomeDiskData | null = null;

  // 1. Check persistent Cloudinary storage first
  try {
    const cloudHome = await getCloudJson<HomeDiskData>("cms-home");
    if (cloudHome && (cloudHome[locale] || cloudHome.en)) {
      disk = cloudHome;
      writeJsonFile(HOME_FILE, cloudHome);
    }
  } catch {}

  // 2. Fallback to local disk file
  if (!disk || !disk[locale]) {
    disk = readJsonFile<HomeDiskData>(HOME_FILE);
  }

  const aboutData = await getAboutServer(locale);
  const portrait = aboutData?.portraitImage;

  let home = base;
  if (disk && disk[locale]) {
    home = {
      ...base,
      ...disk[locale],
      hero: {
        ...base.hero,
        ...(disk[locale]?.hero || {}),
      },
    };
  }

  if (aboutData) {
    home.about = {
      ...home.about,
      ...aboutData,
      portraitImage: portrait || (home.about as any)?.portraitImage || "/about-portrait.jpg",
      directors: aboutData.directors || (home.about as any)?.directors,
    } as any;
  }

  return home;
}

export async function saveHomeHeroServer(
  locale: "en" | "ar" = "en",
  heroData: any
): Promise<HomeContent> {
  const disk = readJsonFile<HomeDiskData>(HOME_FILE) || {};
  const current = disk[locale] || {};
  const updatedHero = {
    ...(current.hero || {}),
    ...heroData,
    heroImage: heroData.heroImage || current.hero?.heroImage || "/hero-mine.jpg",
  };

  disk[locale] = {
    ...current,
    hero: updatedHero as any,
  };

  writeJsonFile(HOME_FILE, disk);

  try {
    await saveCloudJson("cms-home", disk);
  } catch (cloudErr) {
    console.warn("[CMS Service] Cloudinary home save warning:", cloudErr);
  }

  try {
    const page = await prisma.page.upsert({
      where: { slug: "home" },
      update: {},
      create: { slug: "home", title: "Hilful Ventures Homepage", isPublished: true },
    });

    await prisma.pageSection.upsert({
      where: {
        pageId_sectionKey_locale_status: {
          pageId: page.id,
          sectionKey: "hero",
          locale,
          status: "PUBLISHED",
        },
      },
      update: { data: heroData, updatedAt: new Date() },
      create: {
        pageId: page.id,
        sectionKey: "hero",
        locale,
        status: "PUBLISHED",
        data: heroData,
      },
    });
  } catch (err) {
    console.warn("[CMS Service] Prisma home hero upsert warning:", err);
  }

  revalidateWebRoutes(["/", "/en", "/ar", "/admin/home"]);
  return getHomeServer(locale);
}

// ============================================================================
// ABOUT CMS SERVICE
// ============================================================================

export interface AboutDiskData {
  en?: any;
  ar?: any;
}

export async function getAboutServer(locale: "en" | "ar" = "en"): Promise<any> {
  const base = JSON.parse(JSON.stringify(locale === "ar" ? aboutContentAr : aboutContentEn));
  let disk: AboutDiskData | null = null;

  // 1. MUST TRY READING FROM PERSISTENT CLOUDINARY JSON FIRST!
  try {
    const cloudData = await getCloudJson<AboutDiskData>("cms-about");
    if (cloudData && (cloudData[locale] || cloudData.en)) {
      disk = cloudData;
      writeJsonFile(ABOUT_FILE, cloudData);
    }
  } catch {}

  // 2. Fallback to local disk file if Cloudinary was unreachable or empty
  if (!disk || !disk[locale]) {
    disk = readJsonFile<AboutDiskData>(ABOUT_FILE);
  }

  // 3. Fallback to bundled cms-about.json
  if (!disk || (!disk[locale] && !disk.en)) {
    disk = (cmsAboutDefault as unknown) as AboutDiskData;
  }

  const aboutData = disk?.[locale] || disk?.en;
  if (aboutData) {
    return {
      ...base,
      ...aboutData,
      portraitImage: aboutData.portraitImage || base.portraitImage,
      directors:
        aboutData.directors && Array.isArray(aboutData.directors) && aboutData.directors.length > 0
          ? aboutData.directors
          : base.directors,
      whoWeAre: {
        ...base.whoWeAre,
        image: aboutData.portraitImage || base.portraitImage || base.whoWeAre?.image,
        portraitImage: aboutData.portraitImage || base.portraitImage,
      },
    };
  }
  return base;
}

export async function saveAboutServer(locale: "en" | "ar" = "en", data: any): Promise<any> {
  let disk = readJsonFile<AboutDiskData>(ABOUT_FILE) || {};
  if (!disk || Object.keys(disk).length === 0) {
    try {
      const cloudData = await getCloudJson<AboutDiskData>("cms-about");
      if (cloudData) disk = cloudData;
    } catch {}
  }
  if (!disk || Object.keys(disk).length === 0) {
    disk = JSON.parse(JSON.stringify(cmsAboutDefault));
  }

  disk[locale] = {
    ...(disk[locale] || {}),
    ...data,
  };
  writeJsonFile(ABOUT_FILE, disk);

  // Permanently sync to Cloudinary raw cloud storage so Netlify lambdas stay in sync!
  try {
    await saveCloudJson("cms-about", disk);
  } catch (cloudErr) {
    console.warn("[CMS Service] Cloudinary raw upload warning:", cloudErr);
  }

  try {
    const page = await prisma.page.upsert({
      where: { slug: "about" },
      update: {},
      create: { slug: "about", title: "About Hilful Ventures", isPublished: true },
    });

    await prisma.pageSection.upsert({
      where: {
        pageId_sectionKey_locale_status: {
          pageId: page.id,
          sectionKey: "main",
          locale,
          status: "PUBLISHED",
        },
      },
      update: { data, updatedAt: new Date() },
      create: {
        pageId: page.id,
        sectionKey: "main",
        locale,
        status: "PUBLISHED",
        data,
      },
    });
  } catch (err) {
    console.warn("[CMS Service] Prisma about upsert warning:", err);
  }

  revalidateWebRoutes(["/en/about", "/ar/about", "/admin/about", "/", "/en", "/ar"]);
  return disk[locale];
}

// ============================================================================
// GALLERY CMS SERVICE
// ============================================================================

export interface GalleryDiskItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption: string;
  status: "PUBLISHED" | "DRAFT";
  featured?: boolean;
}

const DEFAULT_GALLERY_ITEMS: GalleryDiskItem[] = [
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

export async function getGalleryServer(includeDrafts = false): Promise<GalleryDiskItem[]> {
  // 1. Try persistent Cloudinary storage first
  try {
    const cloudGal = await getCloudJson<GalleryDiskItem[]>("cms-gallery");
    if (cloudGal && Array.isArray(cloudGal) && cloudGal.length > 0) {
      writeJsonFile(GALLERY_FILE, cloudGal);
      return includeDrafts ? cloudGal : cloudGal.filter((i) => i.status === "PUBLISHED");
    }
  } catch {}

  const disk = readJsonFile<GalleryDiskItem[]>(GALLERY_FILE);
  if (disk && Array.isArray(disk) && disk.length > 0) {
    return includeDrafts ? disk : disk.filter((i) => i.status === "PUBLISHED");
  }

  writeJsonFile(GALLERY_FILE, DEFAULT_GALLERY_ITEMS);
  return includeDrafts ? DEFAULT_GALLERY_ITEMS : DEFAULT_GALLERY_ITEMS.filter((i) => i.status === "PUBLISHED");
}

export async function saveGalleryItemServer(item: GalleryDiskItem): Promise<GalleryDiskItem> {
  const current = await getGalleryServer(true);
  const idx = current.findIndex((i) => i.id === item.id);

  let updated: GalleryDiskItem[];
  if (idx >= 0) {
    updated = [...current];
    updated[idx] = { ...current[idx], ...item };
  } else {
    updated = [item, ...current];
  }

  writeJsonFile(GALLERY_FILE, updated);

  try {
    await saveCloudJson("cms-gallery", updated);
  } catch (cloudErr) {
    console.warn("[CMS Service] Cloudinary gallery save warning:", cloudErr);
  }

  try {
    await prisma.galleryItem.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        category: item.category,
        caption: item.caption,
        imageUrl: item.imageUrl,
        status: item.status,
        updatedAt: new Date(),
      },
      create: {
        id: item.id,
        title: item.title,
        category: item.category,
        caption: item.caption,
        imageUrl: item.imageUrl,
        status: item.status,
        sortOrder: 0,
      },
    });
  } catch (err) {
    console.warn("[CMS Service] Prisma gallery item upsert warning:", err);
  }

  revalidateWebRoutes(["/en/gallery", "/ar/gallery", "/admin/gallery"]);
  return item;
}

export async function deleteGalleryItemServer(id: string): Promise<boolean> {
  const current = await getGalleryServer(true);
  const updated = current.filter((i) => i.id !== id);
  writeJsonFile(GALLERY_FILE, updated);

  try {
    await saveCloudJson("cms-gallery", updated);
  } catch (cloudErr) {
    console.warn("[CMS Service] Cloudinary gallery delete warning:", cloudErr);
  }

  try {
    await prisma.galleryItem.deleteMany({
      where: { id },
    });
  } catch (err) {
    console.warn("[CMS Service] Prisma gallery item delete warning:", err);
  }

  revalidateWebRoutes(["/en/gallery", "/ar/gallery", "/admin/gallery"]);
  return true;
}

// ============================================================================
// MINING & EXPLORATION SITES CMS SERVICE
// ============================================================================

export interface MiningSiteItem {
  id: string;
  title: string;
  country: string;
  region: string;
  type: "ACTIVE_OPERATING" | "ASSISTING_PARTNER" | "FEASIBLE_EXPANSION";
  category: string;
  mineralScope: string;
  status: "ACTIVE" | "IN_PROGRESS" | "LICENSED" | "AVAILABLE_FOR_PARTNERSHIP";
  statusBadge: string;
  description: string;
  imageUrl: string;
  coordinates?: string;
  keyMetrics?: {
    scaleOrArea?: string;
    processingCapacity?: string;
    logisticsRoute?: string;
    assayIntegrity?: string;
  };
  operationalHighlights: string[];
  sortOrder: number;
}

export const DEFAULT_MINING_SITES: MiningSiteItem[] = [
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
    id: "site-kurmuk-03",
    title: "Kurmuk Vein Quartz & Precious Hard-Rock Prospect",
    country: "Ethiopia",
    region: "Kurmuk Border Belt, Western Ethiopia",
    type: "ACTIVE_OPERATING",
    category: "Gold Mining & Extraction",
    mineralScope: "High-Grade Quartz Reefs & Sulfidic Gold Ore Concentrates",
    status: "ACTIVE",
    statusBadge: "Active Hard-Rock Quarrying",
    description: "Hard-rock open-cast development targeting auriferous quartz veins. Utilizing blast-hole drilling, track-mounted mobile jaw crushers, and secondary cone crushing units to produce high-grade mineral concentrates for smelting charges.",
    imageUrl: "/hero-mine.jpg",
    coordinates: "10.5500° N, 34.2833° E",
    keyMetrics: {
      scaleOrArea: "200 Hectares Target Geology",
      processingCapacity: "400 MT/Day Crushing & Gravity Sizing",
      logisticsRoute: "Secured Freight Corridors via Assosa Regional Logistics Base",
      assayIntegrity: "Independent Batch Geochemical Verification",
    },
    operationalHighlights: [
      "Primary jaw and tertiary impact crusher circuit delivering 10mm feed",
      "Secondary enrichment yielding 50g to 350g Au per metric ton concentrate",
      "Comprehensive core sample logging under JORC exploration principles",
      "Dedicated heavy machinery fleet backing extraction benches",
    ],
    sortOrder: 3,
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
    id: "site-afar-05",
    title: "Danakil Basin Industrial Drilling Minerals Facility",
    country: "Ethiopia",
    region: "Afar Depression & Rift Valley Industrial Belt",
    type: "ASSISTING_PARTNER",
    category: "Drilling & Industrial Minerals",
    mineralScope: "High-Density Drilling Barite (4.20 SG), Industrial Salts, Bentonite",
    status: "IN_PROGRESS",
    statusBadge: "Technical Partnership Site",
    description: "Hilful assists local mining operators in quality-controlled extraction, micronization, and packaging of heavy drilling barite and industrial salts for oil, gas, and geothermal well exploration across the East African Rift System.",
    imageUrl: "/chemicals.jpg",
    coordinates: "14.2417° N, 40.3000° E",
    keyMetrics: {
      scaleOrArea: "Regional Mineral Concession Hub",
      processingCapacity: "10,000 Metric Tons/Month API Milled Minerals",
      logisticsRoute: "Direct Rail & Road Corridor to Djibouti International Seaport",
      assayIntegrity: "API Spec 13A Section 11 Certified Weighting Agent",
    },
    operationalHighlights: [
      "Milling optimization for high-density 4.20+ SG drilling grade barium sulfate",
      "Automated 1.5 MT jumbo tote bag packing and moisture-barrier lining",
      "Turnkey logistics routing to onshore exploration rigs and Djibouti port",
      "Laboratory testing infrastructure for rheology and specific gravity control",
    ],
    sortOrder: 5,
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

export async function getMiningSitesServer(): Promise<MiningSiteItem[]> {
  // 1. Check persistent Cloudinary storage first
  try {
    const cloudSites = await getCloudJson<MiningSiteItem[]>("cms-mining-sites");
    if (cloudSites && Array.isArray(cloudSites) && cloudSites.length > 0) {
      writeJsonFile(MINING_SITES_FILE, cloudSites);
      return cloudSites.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    }
  } catch {}

  // 2. Fallback to local JSON file
  const disk = readJsonFile<MiningSiteItem[]>(MINING_SITES_FILE);
  if (disk && Array.isArray(disk) && disk.length > 0) {
    return disk.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  // 3. Guaranteed fallback to default canonical mining sites
  writeJsonFile(MINING_SITES_FILE, DEFAULT_MINING_SITES);
  return DEFAULT_MINING_SITES;
}

export async function saveMiningSiteServer(site: MiningSiteItem): Promise<MiningSiteItem> {
  const current = await getMiningSitesServer();
  const idx = current.findIndex((s) => s.id === site.id);

  let updated: MiningSiteItem[];
  if (idx >= 0) {
    updated = [...current];
    updated[idx] = { ...current[idx], ...site };
  } else {
    updated = [site, ...current];
  }

  writeJsonFile(MINING_SITES_FILE, updated);

  try {
    await saveCloudJson("cms-mining-sites", updated);
  } catch (cloudErr) {
    console.warn("[CMS Service] Cloudinary mining sites save warning:", cloudErr);
  }

  // Best-effort Prisma update to Project model
  try {
    await prisma.project.upsert({
      where: { id: site.id },
      update: {
        title: site.title,
        category: site.category,
        description: site.description,
        imageUrl: site.imageUrl,
        status: "PUBLISHED",
        sortOrder: site.sortOrder || 0,
        updatedAt: new Date(),
      },
      create: {
        id: site.id,
        title: site.title,
        category: site.category,
        description: site.description,
        imageUrl: site.imageUrl,
        status: "PUBLISHED",
        sortOrder: site.sortOrder || 0,
      },
    });
  } catch (err) {
    console.warn("[CMS Service] Prisma project upsert warning:", err);
  }

  revalidateWebRoutes([
    "/en/mining-sites",
    "/ar/mining-sites",
    "/en/exploration-portal",
    "/ar/exploration-portal",
    "/admin/mining-sites",
    "/",
    "/en",
    "/ar",
  ]);

  return site;
}

export async function deleteMiningSiteServer(id: string): Promise<boolean> {
  const current = await getMiningSitesServer();
  const updated = current.filter((s) => s.id !== id);
  writeJsonFile(MINING_SITES_FILE, updated);

  try {
    await saveCloudJson("cms-mining-sites", updated);
  } catch (cloudErr) {
    console.warn("[CMS Service] Cloudinary mining sites delete warning:", cloudErr);
  }

  try {
    await prisma.project.deleteMany({
      where: { id },
    });
  } catch (err) {
    console.warn("[CMS Service] Prisma project delete warning:", err);
  }

  revalidateWebRoutes([
    "/en/mining-sites",
    "/ar/mining-sites",
    "/en/exploration-portal",
    "/ar/exploration-portal",
    "/admin/mining-sites",
    "/",
    "/en",
    "/ar",
  ]);

  return true;
}


