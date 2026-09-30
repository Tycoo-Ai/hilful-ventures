export type ContentStatus = "DRAFT" | "PREVIEW" | "PUBLISHED";

export interface CMSHeroData {
  categoryPill: string;
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  telemetryLabels: string[];
}

export interface CMSEquipmentItem {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  altText: string;
  status: ContentStatus;
  sortOrder: number;
}

export interface CMSProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  altText: string;
  capabilityName: string;
  capabilityLink: string;
  status: ContentStatus;
  sortOrder: number;
}

export interface CMSGalleryItem {
  id: string;
  title: string;
  category: string;
  caption?: string;
  imageUrl: string;
  altText?: string;
  technicalMetadata?: string;
  status: ContentStatus;
  sortOrder: number;
}

export interface CMSMediaAsset {
  id: string;
  filename: string;
  url: string;
  altText: string;
  width: number;
  height: number;
  format: string;
  category: string;
  caption?: string;
  provider?: "CLOUDINARY" | "LOCAL" | "UNSPLASH";
  publicId?: string | null;
  uploadedAt: string;
  updatedAt?: string;
}

export interface CMSGlobalSettings {
  brand: {
    siteName: string;
    siteNameAr: string;
    tagline: string;
    taglineAr: string;
    logoText: string;
    registrationNumber: string;
  };
  header: {
    ctaText: string;
    ctaTextAr: string;
    ctaHref: string;
  };
  footer: {
    description: string;
    descriptionAr: string;
    copyrightText: string;
    copyrightTextAr: string;
  };
  seoDefaults: {
    defaultTitle: string;
    defaultTitleAr: string;
    defaultDescription: string;
    defaultDescriptionAr: string;
    ogImage: string;
  };
}

export interface CMSSectionRecord<T = unknown> {
  id: string;
  sectionKey: string;
  locale: "en" | "ar";
  draftData: T;
  publishedData: T;
  updatedAt: string;
  publishedAt?: string;
}

