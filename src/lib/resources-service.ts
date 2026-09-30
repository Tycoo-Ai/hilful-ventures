/**
 * Hilful Ventures Pvt Ltd — Resources & Publications Data Architecture
 */

import { prisma } from "@/lib/prisma";

export interface ResourceItem {
  id: string;
  title: string;
  titleAr: string;
  category: "CORPORATE" | "CAPABILITIES" | "TECHNICAL" | "BROCHURE";
  format: "PDF";
  language: "EN" | "AR" | "EN / AR";
  description: string;
  descriptionAr: string;
  status: "PUBLISHED" | "PREPARING";
  fileUrl?: string;
  fileSize?: string;
  updatedAt: string;
}

const resourcesStore: ResourceItem[] = [
  {
    id: "res-01",
    title: "Hilful Ventures Corporate Profile",
    titleAr: "الكتيب التعريفي المؤسسي لشركة هلفول فنتشرز",
    category: "BROCHURE",
    format: "PDF",
    language: "EN / AR",
    description:
      "Comprehensive introduction to Hilful Ventures' integrated mining, heavy machinery, project execution, and commodities trade capabilities.",
    descriptionAr:
      "دليل تعريفي شامل يوضح قدرات هلفول فنتشرز المتكاملة في قطاعات التعدين، وتأجير الآليات الثقيلة، وإدارة المشاريع، وتداول السلع.",
    status: "PREPARING",
    fileSize: "Document In Preparation",
    updatedAt: "2026-09-24",
  },
  {
    id: "res-02",
    title: "Equipment Fleet & Technical Specification Overview",
    titleAr: "دليل أسطول المعدات والمواصفات الفنية الميدانية",
    category: "CAPABILITIES",
    format: "PDF",
    language: "EN / AR",
    description:
      "Operational classifications covering excavators, haul trucks, wheel loaders, dozers, drill rigs, and mobile crushing/screening setups.",
    descriptionAr:
      "التصنيفات التشغيلية للأسطول بما في ذلك الحفارات، وشاحنات النقل، واللوادر، والبلدوزرات، وحفارات الآبار، ووحدات التكسير والغربلة.",
    status: "PREPARING",
    fileSize: "Document In Preparation",
    updatedAt: "2026-09-24",
  },
  {
    id: "res-03",
    title: "Workforce Safety & Site Operational Standards",
    titleAr: "معايير سلامة القوى العاملة والاشتراطات التشغيلية للمواقع",
    category: "TECHNICAL",
    format: "PDF",
    language: "EN / AR",
    description:
      "Operational safety awareness, equipment handling procedures, and regulatory alignment principles governing field engagements.",
    descriptionAr:
      "إجراءات التوعية بسلامة العمليات، ومعايير قيادة الآليات، ومبادئ الامتثال للاشتراطات التنظيمية في المواقع الميدانية.",
    status: "PREPARING",
    fileSize: "Document In Preparation",
    updatedAt: "2026-09-24",
  },
];

export async function getPublishedResources(): Promise<ResourceItem[]> {
  try {
    const page = await prisma.page.findUnique({
      where: { slug: "resources" },
      include: {
        sections: {
          where: { sectionKey: "catalog", status: "PUBLISHED" },
        },
      },
    });
    if (page && page.sections.length > 0 && page.sections[0].data) {
      return page.sections[0].data as unknown as ResourceItem[];
    }
  } catch (err) {
    console.warn("[Resources Service] DB query fallback:", err);
  }
  return [...resourcesStore];
}

export async function getAllAdminResources(): Promise<ResourceItem[]> {
  try {
    const page = await prisma.page.findUnique({
      where: { slug: "resources" },
      include: {
        sections: {
          where: { sectionKey: "catalog" },
        },
      },
    });
    const draft = page?.sections.find((s) => s.status === "DRAFT");
    const published = page?.sections.find((s) => s.status === "PUBLISHED");
    const active = draft || published;
    if (active && active.data) {
      return active.data as unknown as ResourceItem[];
    }
  } catch (err) {
    console.warn("[Resources Service] Admin query fallback:", err);
  }
  return [...resourcesStore];
}

export async function saveResource(item: ResourceItem): Promise<ResourceItem> {
  const current = await getAllAdminResources();
  const index = current.findIndex((r) => r.id === item.id);
  let updatedList: ResourceItem[];
  if (index >= 0) {
    updatedList = [...current];
    updatedList[index] = { ...item, updatedAt: new Date().toISOString() };
  } else {
    updatedList = [...current, { ...item, updatedAt: new Date().toISOString() }];
  }

  try {
    const page = await prisma.page.upsert({
      where: { slug: "resources" },
      update: {},
      create: {
        slug: "resources",
        title: "Resources & Corporate Publications",
        isPublished: true,
      },
    });

    await prisma.pageSection.upsert({
      where: {
        pageId_sectionKey_locale_status: {
          pageId: page.id,
          sectionKey: "catalog",
          locale: "en",
          status: "PUBLISHED",
        },
      },
      update: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: updatedList as any,
        updatedAt: new Date(),
      },
      create: {
        pageId: page.id,
        sectionKey: "catalog",
        locale: "en",
        status: "PUBLISHED",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: updatedList as any,
      },
    });
  } catch (err) {
    console.error("[Resources Service] Failed to persist resource to Prisma:", err);
    throw err;
  }

  return item;
}

