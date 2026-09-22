# HILFUL VENTURES PVT LTD — Content Model

> **Document version:** 1.0
> **Date:** 2026-09-22
> **Status:** Awaiting approval before implementation

This document describes every CMS entity that will be modeled in the PostgreSQL database
via Prisma. Each entity includes its purpose, important fields, and relationships.

---

## Entity Relationship Overview

```
User ──────────────────────────────────────────────────────┐
                                                           │ createdBy / updatedBy
Page ──────┬── Translation                                 │
Service ───┤── Translation ── Media (featured + gallery)   │
Equipment ─┤── Translation ── Media (photos)               ├── all entities
Project ───┤── Translation ── Media (gallery)              │
HomepageSection ─┤── Translation                           │
BrochureVersion ─┤── Media (file)                          │
Inquiry                                                    │
SiteSetting                                                │
Media ─────────────────────────────────────────────────────┘
```

---

## 1. User

**Purpose:** Admin users who manage the website content through the CMS.

| Field            | Type           | Notes                                        |
|------------------|----------------|----------------------------------------------|
| `id`             | UUID           | Primary key                                  |
| `email`          | String         | Unique, used for login                       |
| `name`           | String         | Display name                                 |
| `passwordHash`   | String         | Bcrypt-hashed password                       |
| `role`           | Enum           | `ADMIN`, `EDITOR`, `VIEWER`                  |
| `avatarUrl`      | String?        | Optional profile image                       |
| `isActive`       | Boolean        | Soft disable without deletion                |
| `lastLoginAt`    | DateTime?      | Tracks last successful login                 |
| `createdAt`      | DateTime       | Auto-set on creation                         |
| `updatedAt`      | DateTime       | Auto-updated on change                       |

**Relationships:**
- One-to-many with all content entities (as `createdBy` / `updatedBy` audit fields)

**Business Rules:**
- At least one `ADMIN` user must exist at all times
- Passwords must meet minimum complexity requirements (enforced at application level)
- Email addresses are case-insensitive and trimmed on save

---

## 2. Page

**Purpose:** CMS-managed static pages — About Us, HSE & Governance, and any future pages
that don't fit into a specialized entity.

| Field            | Type           | Notes                                        |
|------------------|----------------|----------------------------------------------|
| `id`             | UUID           | Primary key                                  |
| `slug`           | String         | URL path segment — unique, kebab-case        |
| `title`          | String         | Page title (default locale)                  |
| `content`        | Text           | Rich text / HTML body (default locale)       |
| `excerpt`        | String?        | Short summary for listings and SEO           |
| `metaTitle`      | String?        | Override for SEO title tag                   |
| `metaDescription`| String?        | SEO meta description                         |
| `ogImageId`      | UUID?          | FK to Media — Open Graph image               |
| `template`       | String         | Layout template identifier (e.g., `default`, `editorial`, `full-width`) |
| `sortOrder`      | Int            | Controls order in navigation                 |
| `isPublished`    | Boolean        | Draft/published toggle                       |
| `publishedAt`    | DateTime?      | When the page was first published            |
| `createdById`    | UUID           | FK to User                                   |
| `updatedById`    | UUID           | FK to User                                   |
| `createdAt`      | DateTime       | Auto-set                                     |
| `updatedAt`      | DateTime       | Auto-updated                                 |

**Relationships:**
- Belongs to User (createdBy, updatedBy)
- Has many Translations (for multilingual content)
- Belongs to Media (optional OG image)

**Business Rules:**
- Slug must be unique across all pages
- Changing a slug should create a redirect from the old URL (handled at application level)
- `content` stores sanitized HTML — rich text editor output

---

## 3. Service

**Purpose:** The four core service offerings of Hilful Ventures, each with its own detail page.

| Field            | Type           | Notes                                        |
|------------------|----------------|----------------------------------------------|
| `id`             | UUID           | Primary key                                  |
| `slug`           | String         | URL path — unique, kebab-case                |
| `title`          | String         | Service name (default locale)                |
| `subtitle`       | String?        | Short tagline or description                 |
| `description`    | Text           | Full rich text description (default locale)  |
| `excerpt`        | String?        | Summary for cards and listings               |
| `iconName`       | String?        | Lucide icon identifier for the service       |
| `featuredImageId`| UUID?          | FK to Media — hero/featured image            |
| `capabilities`   | JSON           | Array of key capability strings              |
| `metaTitle`      | String?        | SEO title override                           |
| `metaDescription`| String?        | SEO description                              |
| `sortOrder`      | Int            | Display order on services index              |
| `isPublished`    | Boolean        | Draft/published toggle                       |
| `createdById`    | UUID           | FK to User                                   |
| `updatedById`    | UUID           | FK to User                                   |
| `createdAt`      | DateTime       | Auto-set                                     |
| `updatedAt`      | DateTime       | Auto-updated                                 |

**Relationships:**
- Belongs to User (createdBy, updatedBy)
- Belongs to Media (featured image)
- Has many Translations
- Has many Projects (a project can be linked to one or more services)
- Has many Media (gallery images via a join table)

**Initial Services (from client content document):**
1. Minerals & Oil Exploration
2. Mining Equipment Leasing
3. Turnkey Mining Project Management
4. Mineral & Hydrocarbon Commodities Trading

---

## 4. Equipment

**Purpose:** Equipment fleet catalog — machinery and vehicles available for projects or leasing.

| Field              | Type           | Notes                                      |
|--------------------|----------------|--------------------------------------------|
| `id`               | UUID           | Primary key                                |
| `name`             | String         | Equipment name (default locale)            |
| `category`         | String         | Category (drilling, excavation, transport, processing, etc.) |
| `manufacturer`     | String?        | Equipment manufacturer                     |
| `model`            | String?        | Model number or name                       |
| `yearOfManufacture`| Int?           | Year manufactured                          |
| `specifications`   | JSON           | Key-value specifications (power, capacity, weight, etc.) |
| `description`      | Text?          | Detailed description (default locale)      |
| `condition`        | Enum           | `NEW`, `EXCELLENT`, `GOOD`, `FAIR`         |
| `availabilityStatus`| Enum          | `AVAILABLE`, `IN_USE`, `MAINTENANCE`, `RETIRED` |
| `featuredImageId`  | UUID?          | FK to Media — primary photo                |
| `isPublished`      | Boolean        | Show on public site                        |
| `sortOrder`        | Int            | Display order within category              |
| `createdById`      | UUID           | FK to User                                 |
| `updatedById`      | UUID           | FK to User                                 |
| `createdAt`        | DateTime       | Auto-set                                   |
| `updatedAt`        | DateTime       | Auto-updated                               |

**Relationships:**
- Belongs to User (createdBy, updatedBy)
- Belongs to Media (featured image)
- Has many Media (gallery photos via join table)
- Has many Translations

**Notes:**
- `specifications` is a JSON field to accommodate varying spec types per equipment category
  (e.g., horsepower for engines, bucket capacity for excavators, payload for trucks)
- The admin UI should provide a dynamic key-value editor for specifications

---

## 5. Project

**Purpose:** Portfolio of completed and active projects — demonstrates Hilful Ventures'
track record and capabilities.

| Field            | Type           | Notes                                        |
|------------------|----------------|----------------------------------------------|
| `id`             | UUID           | Primary key                                  |
| `slug`           | String         | URL path — unique, kebab-case                |
| `title`          | String         | Project name (default locale)                |
| `description`    | Text           | Detailed project description (default locale)|
| `excerpt`        | String?        | Summary for cards and listings               |
| `clientName`     | String?        | Client or partner name (if permitted)        |
| `location`       | String?        | Project location (country, region)           |
| `startDate`      | DateTime?      | Project start date                           |
| `endDate`        | DateTime?      | Project end date (null if ongoing)           |
| `status`         | Enum           | `PLANNED`, `IN_PROGRESS`, `COMPLETED`        |
| `scope`          | JSON?          | Array of scope items / deliverables          |
| `featuredImageId`| UUID?          | FK to Media — hero image                     |
| `metaTitle`      | String?        | SEO title override                           |
| `metaDescription`| String?        | SEO description                              |
| `isPublished`    | Boolean        | Draft/published toggle                       |
| `isFeatured`     | Boolean        | Show on homepage or featured sections        |
| `sortOrder`      | Int            | Display order                                |
| `createdById`    | UUID           | FK to User                                   |
| `updatedById`    | UUID           | FK to User                                   |
| `createdAt`      | DateTime       | Auto-set                                     |
| `updatedAt`      | DateTime       | Auto-updated                                 |

**Relationships:**
- Belongs to User (createdBy, updatedBy)
- Belongs to Media (featured image)
- Has many Media (project gallery via join table)
- Has many Translations
- Belongs to many Services (a project may showcase one or more services)

---

## 6. Media

**Purpose:** Centralized media library for all images, documents, and files used across
the website. Every image and document is uploaded once and referenced by other entities.

| Field            | Type           | Notes                                        |
|------------------|----------------|----------------------------------------------|
| `id`             | UUID           | Primary key                                  |
| `filename`       | String         | Original filename                            |
| `url`            | String         | Public URL (CDN or object storage)           |
| `thumbnailUrl`   | String?        | Thumbnail variant URL                        |
| `mediumUrl`      | String?        | Medium variant URL                           |
| `mimeType`       | String         | MIME type (image/webp, application/pdf, etc.) |
| `fileSize`       | Int            | File size in bytes                           |
| `width`          | Int?           | Image width in pixels                        |
| `height`         | Int?           | Image height in pixels                       |
| `altText`        | String?        | Alt text for accessibility and SEO           |
| `caption`        | String?        | Optional caption                             |
| `blurDataUrl`    | String?        | Base64 blur placeholder for images           |
| `folder`         | String?        | Organizational folder path                   |
| `uploadedById`   | UUID           | FK to User who uploaded                      |
| `createdAt`      | DateTime       | Auto-set                                     |
| `updatedAt`      | DateTime       | Auto-updated                                 |

**Relationships:**
- Belongs to User (uploadedBy)
- Referenced by Page, Service, Equipment, Project, HomepageSection, BrochureVersion
  (via direct FK or join tables)

**Business Rules:**
- On upload: validate MIME type against allowlist, enforce max file size (10MB images, 50MB documents)
- For images: generate thumbnail (200px), medium (800px), and full-size variants
- Generate blur hash and store as `blurDataUrl`
- Deleting a media item should check for active references first

---

## 7. Translation

**Purpose:** Stores translated content for any entity and locale. Enables the admin to
provide translated versions of any content field without duplicating the entire entity.

| Field            | Type           | Notes                                        |
|------------------|----------------|----------------------------------------------|
| `id`             | UUID           | Primary key                                  |
| `entityType`     | String         | Polymorphic identifier (`page`, `service`, `equipment`, `project`, etc.) |
| `entityId`       | UUID           | ID of the translated entity                  |
| `locale`         | String         | Locale code (`en`, `ar`, etc.)               |
| `field`          | String         | Name of the translated field (`title`, `description`, `excerpt`, etc.) |
| `value`          | Text           | Translated content                           |
| `createdAt`      | DateTime       | Auto-set                                     |
| `updatedAt`      | DateTime       | Auto-updated                                 |

**Relationships:**
- Polymorphic relationship to any translatable entity

**Indexes:**
- Unique composite index: `(entityType, entityId, locale, field)`
- Index on `(entityType, entityId, locale)` for batch loading all translations for an entity

**Business Rules:**
- The default locale (`en`) content is stored directly on the entity itself
- Only non-default locales use the Translation table
- Admin UI should show side-by-side editing (source locale + target locale)

**Example Records:**

| entityType | entityId   | locale | field         | value                             |
|------------|------------|--------|---------------|-----------------------------------|
| service    | uuid-001   | ar     | title         | استكشاف المعادن والنفط            |
| service    | uuid-001   | ar     | description   | (Arabic description text...)      |
| page       | uuid-002   | ar     | title         | من نحن                            |
| page       | uuid-002   | ar     | content       | (Arabic page content...)          |

---

## 8. HomepageSection

**Purpose:** Configurable, ordered sections for the homepage. Each section has a type
(hero, stats, services, CTA, etc.) and can be reordered, enabled/disabled, and edited
from the admin panel.

| Field            | Type           | Notes                                        |
|------------------|----------------|----------------------------------------------|
| `id`             | UUID           | Primary key                                  |
| `sectionType`    | Enum           | `HERO`, `SERVICES_OVERVIEW`, `ABOUT_PREVIEW`, `STATS`, `PROJECTS_FEATURED`, `CTA`, `PARTNERS`, `TESTIMONIALS` |
| `title`          | String?        | Section heading (default locale)             |
| `subtitle`       | String?        | Section subheading (default locale)          |
| `content`        | JSON?          | Section-specific structured content          |
| `backgroundMediaId` | UUID?       | FK to Media — background image or video      |
| `sortOrder`      | Int            | Display order on homepage                    |
| `isEnabled`      | Boolean        | Toggle section visibility                    |
| `config`         | JSON?          | Section-specific configuration (layout variant, animation style, etc.) |
| `createdById`    | UUID           | FK to User                                   |
| `updatedById`    | UUID           | FK to User                                   |
| `createdAt`      | DateTime       | Auto-set                                     |
| `updatedAt`      | DateTime       | Auto-updated                                 |

**Relationships:**
- Belongs to User (createdBy, updatedBy)
- Belongs to Media (background media)
- Has many Translations

**Notes:**
- The `content` JSON field is typed differently per `sectionType`. For example:
  - `HERO`: `{ headline: string, subheadline: string, ctaText: string, ctaUrl: string }`
  - `STATS`: `{ items: [{ label: string, value: string, suffix: string }] }`
  - `SERVICES_OVERVIEW`: `{ serviceIds: string[] }` (references to Service entities)
- The front-end homepage component reads sections in `sortOrder` and renders the appropriate
  component for each `sectionType`

---

## 9. Inquiry

**Purpose:** Stores submissions from the Contact / Business Inquiry form. Not publicly
visible — only accessible to admin users.

| Field            | Type           | Notes                                        |
|------------------|----------------|----------------------------------------------|
| `id`             | UUID           | Primary key                                  |
| `fullName`       | String         | Contact person's full name                   |
| `email`          | String         | Contact email address                        |
| `phone`          | String?        | Phone number                                 |
| `company`        | String?        | Company or organization name                 |
| `country`        | String?        | Country of origin                            |
| `serviceInterest`| String?        | Which service they're interested in          |
| `message`        | Text           | Inquiry message body                         |
| `source`         | String?        | Page or referral source                      |
| `status`         | Enum           | `NEW`, `READ`, `RESPONDED`, `ARCHIVED`       |
| `respondedAt`    | DateTime?      | When the inquiry was responded to            |
| `respondedById`  | UUID?          | FK to User who responded                     |
| `internalNotes`  | Text?          | Private notes by admin staff                 |
| `ipAddress`      | String?        | Submitter's IP (for spam detection)          |
| `userAgent`      | String?        | Browser user agent (for spam detection)      |
| `createdAt`      | DateTime       | Submission timestamp                         |

**Relationships:**
- Belongs to User (respondedBy — optional)

**Business Rules:**
- Rate limit form submissions by IP address (application level)
- Send email notification to configured admin email on new submission
- `ipAddress` and `userAgent` are stored for spam analysis but never displayed publicly
- Inquiries are never hard-deleted — only archived

---

## 10. BrochureVersion

**Purpose:** Versioned downloadable brochures and company profile documents. Tracks
download count and allows the admin to publish new versions while keeping old ones available.

| Field            | Type           | Notes                                        |
|------------------|----------------|----------------------------------------------|
| `id`             | UUID           | Primary key                                  |
| `title`          | String         | Display title (e.g., "Company Profile 2026") |
| `description`    | String?        | Brief description of this version            |
| `version`        | String         | Version identifier (e.g., "3.0", "2026-Q3")  |
| `fileId`         | UUID           | FK to Media — the downloadable file          |
| `fileFormat`     | String         | File format (PDF, DOCX, etc.)                |
| `language`       | String         | Primary language of the document             |
| `downloadCount`  | Int            | Number of downloads (incremented via API)    |
| `isActive`       | Boolean        | Currently featured version                   |
| `publishedAt`    | DateTime?      | When this version was published              |
| `createdById`    | UUID           | FK to User                                   |
| `createdAt`      | DateTime       | Auto-set                                     |
| `updatedAt`      | DateTime       | Auto-updated                                 |

**Relationships:**
- Belongs to User (createdBy)
- Belongs to Media (the file itself)
- Has many Translations

**Business Rules:**
- Only one brochure version should be marked `isActive` at a time per language
- Download count is incremented atomically via a dedicated API endpoint
- Old versions remain accessible by direct URL but are not prominently displayed

---

## 11. SiteSetting

**Purpose:** Global key-value configuration for the website. Stores contact information,
social media links, analytics IDs, and other site-wide settings that should be editable
from the admin panel without code changes.

| Field            | Type           | Notes                                        |
|------------------|----------------|----------------------------------------------|
| `id`             | UUID           | Primary key                                  |
| `key`            | String         | Setting key — unique, dot-notated (e.g., `contact.email`, `social.linkedin`) |
| `value`          | Text           | Setting value                                |
| `type`           | Enum           | `STRING`, `NUMBER`, `BOOLEAN`, `JSON`, `URL`, `EMAIL` |
| `group`          | String         | Grouping for admin UI (e.g., `contact`, `social`, `seo`, `analytics`) |
| `label`          | String         | Human-readable label for admin UI            |
| `description`    | String?        | Help text for the admin                      |
| `isPublic`       | Boolean        | Whether this setting is exposed to the front-end |
| `updatedById`    | UUID?          | FK to User                                   |
| `updatedAt`      | DateTime       | Auto-updated                                 |

**Expected Settings:**

| Key                       | Type    | Group     | Example Value                        |
|---------------------------|---------|-----------|--------------------------------------|
| `contact.email`           | EMAIL   | contact   | info@hilfulventures.com              |
| `contact.phone`           | STRING  | contact   | +91-XXXXXXXXXX                       |
| `contact.address`         | STRING  | contact   | (Company address)                    |
| `social.linkedin`         | URL     | social    | https://linkedin.com/company/hilful  |
| `social.twitter`          | URL     | social    | https://twitter.com/hilful           |
| `seo.defaultTitle`        | STRING  | seo       | Hilful Ventures Pvt Ltd              |
| `seo.defaultDescription`  | STRING  | seo       | (Company description)                |
| `seo.googleAnalyticsId`   | STRING  | analytics | G-XXXXXXXXXX                         |
| `company.name`            | STRING  | company   | Hilful Ventures Pvt Ltd              |
| `company.tagline`         | STRING  | company   | (Company tagline)                    |
| `company.registrationNo`  | STRING  | company   | (Registration number)                |

---

## Cross-Cutting Concerns

### Audit Trail

Every content entity (Page, Service, Equipment, Project, HomepageSection, BrochureVersion)
includes:
- `createdById` — FK to User who created the record
- `updatedById` — FK to User who last modified the record
- `createdAt` — Auto-set timestamp
- `updatedAt` — Auto-updated timestamp

### Soft Delete Strategy

Content entities are **not hard-deleted**. Instead:
- A `isPublished` flag controls public visibility
- Future enhancement: add `deletedAt` timestamp for soft deletion with restore capability

### JSON Fields

Several entities use JSON fields for flexible, schema-less data:
- `Equipment.specifications` — varying key-value specs per equipment type
- `Project.scope` — array of scope items
- `Service.capabilities` — array of capability strings
- `HomepageSection.content` — section-specific structured data
- `HomepageSection.config` — section-specific display configuration

These JSON fields are typed in the application layer using Zod schemas and TypeScript interfaces
to ensure runtime validation despite the flexible storage format.

### ID Strategy

All entities use **UUIDs** (v4) as primary keys for:
- No sequential ID enumeration (security)
- Safe for distributed systems and future microservice extraction
- Compatible with Prisma's `@default(uuid())` directive

---

## Prisma Schema Preview

The following is a structural preview of the Prisma schema. The actual implementation will
be created during Phase 1 of development.

```prisma
// This is a preview — not the final schema

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum UserRole {
  ADMIN
  EDITOR
  VIEWER
}

enum InquiryStatus {
  NEW
  READ
  RESPONDED
  ARCHIVED
}

enum ProjectStatus {
  PLANNED
  IN_PROGRESS
  COMPLETED
}

enum EquipmentCondition {
  NEW
  EXCELLENT
  GOOD
  FAIR
}

enum EquipmentAvailability {
  AVAILABLE
  IN_USE
  MAINTENANCE
  RETIRED
}

enum HomepageSectionType {
  HERO
  SERVICES_OVERVIEW
  ABOUT_PREVIEW
  STATS
  PROJECTS_FEATURED
  CTA
  PARTNERS
  TESTIMONIALS
}

enum SettingType {
  STRING
  NUMBER
  BOOLEAN
  JSON
  URL
  EMAIL
}

model User {
  id           String    @id @default(uuid())
  email        String    @unique
  name         String
  passwordHash String
  role         UserRole  @default(EDITOR)
  avatarUrl    String?
  isActive     Boolean   @default(true)
  lastLoginAt  DateTime?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  // ... relations omitted for brevity
}

// ... remaining models follow the field definitions above
```

---

## Data Flow Diagrams

### Public Page Rendering

```
Browser Request
      |
      v
Next.js Middleware (locale detection)
      |
      v
App Router ([locale]/services/[slug])
      |
      v
Server Component (fetches data)
      |
      v
Prisma Query: Service + Translations (where locale = current)
      |
      v
Render page with correct language content
      |
      v
ISR Cache (revalidate on-demand from admin)
```

### Admin Content Update

```
Admin edits Service in CMS
      |
      v
Server Action validates with Zod
      |
      v
Prisma update: Service record + Translations
      |
      v
Trigger revalidation: POST /api/revalidate
      |
      v
Next.js purges ISR cache for affected paths
      |
      v
Next public request gets fresh content
```
