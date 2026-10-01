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
  // 1. Try local file store first for ultra-fast response
  const cached = readJsonFile<DepartmentItem[]>(DEPTS_FILE);
  if (cached && Array.isArray(cached) && cached.length > 0) {
    return cached;
  }

  // 2. Try persistent Cloudinary storage
  try {
    const cloudDepts = await getCloudJson<DepartmentItem[]>("cms-departments");
    if (cloudDepts && Array.isArray(cloudDepts) && cloudDepts.length > 0) {
      writeJsonFile(DEPTS_FILE, cloudDepts);
      return cloudDepts;
    }
  } catch {}

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
  return depts.find((d) => d.slug === normalizedSlug) || null;
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
  const disk = readJsonFile<HomeDiskData>(HOME_FILE);
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
  let disk = readJsonFile<AboutDiskData>(ABOUT_FILE);

  // 1. Try reading from persistent Cloudinary JSON first
  if (!disk || !disk[locale]) {
    try {
      const cloudData = await getCloudJson<AboutDiskData>("cms-about");
      if (cloudData && (cloudData[locale] || cloudData.en)) {
        disk = cloudData;
        writeJsonFile(ABOUT_FILE, cloudData);
      }
    } catch {}
  }

  // 2. Fallback to bundled cms-about.json
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

