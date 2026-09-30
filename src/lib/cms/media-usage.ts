import { prisma } from "@/lib/prisma";

/**
 * Hilful Ventures — Media Asset Usage Tracker
 * Computes live references to a MediaAsset across all CMS sections, equipment,
 * gallery, project showcase, and global settings to prevent accidental deletion
 * and broken links on the public website.
 */

export async function getMediaUsages(
  assetId: string,
  assetUrl?: string
): Promise<string[]> {
  const usages: string[] = [];

  try {
    const urlsToSearch: string[] = [];
    if (assetUrl) urlsToSearch.push(assetUrl);

    // If assetId is provided, get the record to be certain of its URL
    if (assetId) {
      const record = await prisma.mediaAsset.findUnique({
        where: { id: assetId },
      });
      if (record?.url && !urlsToSearch.includes(record.url)) {
        urlsToSearch.push(record.url);
      }
    }

    if (urlsToSearch.length === 0) return usages;

    // 1. Check Equipment table
    const equipmentItems = await prisma.equipment.findMany({
      where: {
        OR: urlsToSearch.map((u) => ({
          imageUrl: { contains: u },
        })),
      },
      select: { id: true, name: true, category: true, status: true },
    });
    for (const eq of equipmentItems) {
      usages.push(`Equipment: ${eq.name} [${eq.category}] (${eq.status})`);
    }

    // 2. Check GalleryItem table
    const galleryItems = await prisma.galleryItem.findMany({
      where: {
        OR: urlsToSearch.map((u) => ({
          imageUrl: { contains: u },
        })),
      },
      select: { id: true, title: true, category: true, status: true },
    });
    for (const gal of galleryItems) {
      usages.push(`Gallery: ${gal.title} [${gal.category}] (${gal.status})`);
    }

    // 3. Check Project Showcase table
    const projectItems = await prisma.project.findMany({
      where: {
        OR: urlsToSearch.map((u) => ({
          imageUrl: { contains: u },
        })),
      },
      select: { id: true, title: true, category: true, status: true },
    });
    for (const proj of projectItems) {
      usages.push(`Project Showcase: ${proj.title} [${proj.category}] (${proj.status})`);
    }

    // 4. Check PageSection table (Home, About, Services, HSE, Contact sections)
    const sections = await prisma.pageSection.findMany({
      select: {
        id: true,
        sectionKey: true,
        locale: true,
        status: true,
        page: { select: { slug: true } },
        data: true,
      },
    });

    for (const sec of sections) {
      const pageName = sec.page?.slug || "general";
      const dataStr = JSON.stringify(sec.data || {});

      const matches = urlsToSearch.some((u) => dataStr.includes(u));

      if (matches) {
        const state = sec.status === "PUBLISHED" ? "Published" : "Draft";
        usages.push(`Page: /${sec.locale}/${pageName} → Section: ${sec.sectionKey} (${state})`);
      }
    }

    // 5. Check SEO Metadata
    const seoRecords = await prisma.seoMetadata.findMany({
      where: {
        OR: urlsToSearch.map((u) => ({
          ogImage: { contains: u },
        })),
      },
      select: { path: true, locale: true },
    });
    for (const s of seoRecords) {
      usages.push(`SEO / OpenGraph: ${s.path} (${s.locale})`);
    }
  } catch (err) {
    console.error("[Media Usage Tracker] Error querying references:", err);
  }

  return Array.from(new Set(usages));
}
