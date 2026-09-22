# HILFUL VENTURES PVT LTD — Architecture Document

> **Document version:** 1.0
> **Date:** 2026-09-22
> **Status:** Architecture review — awaiting approval before implementation

---

## A. Environment Information

| Component       | Detected Version | Notes                                    |
|-----------------|------------------|------------------------------------------|
| **OS**          | Windows 10 Pro   | NT 10.0.19045.0                          |
| **Node.js**     | v20.18.1         | LTS — fully compatible with Next.js 16   |
| **npm**         | 10.8.2           | Ships with Node 20                       |
| **Git**         | 2.47.1           | Ready for version control                |
| **pnpm**        | Not installed     | Will install as project package manager  |
| **yarn**        | Not installed     | Not needed                               |
| **TypeScript**  | Not global        | Will be project-local                    |
| **Workspace**   | Empty directory   | `G:\hilful-ventures` — clean slate       |

---

## B. Recommended Stack (Pinned Versions)

### Core Framework

| Package              | Version    | Rationale                                                       |
|----------------------|------------|-----------------------------------------------------------------|
| `next`               | `16.3.5`   | Latest stable — App Router, Server Components, Server Actions   |
| `react`              | `^19.0.0`  | Required peer of Next.js 16                                     |
| `react-dom`          | `^19.0.0`  | Required peer of Next.js 16                                     |
| `typescript`         | `~5.9.3`   | Latest stable 5.x — proven compatibility with Next.js 16        |

> **Why not TypeScript 7.0?** TS 7.0.2 was recently released but Next.js 16 has not declared
> explicit support for it yet. Using 5.9.x avoids potential type resolution or build issues.

### Styling

| Package                | Version  | Rationale                                             |
|------------------------|----------|-------------------------------------------------------|
| `tailwindcss`          | `4.3.3`  | Utility-first CSS — v4 uses CSS-native config         |
| `@tailwindcss/postcss` | `4.3.3`  | PostCSS integration for Tailwind v4                   |

### Database & ORM

| Package          | Version   | Rationale                                               |
|------------------|-----------|---------------------------------------------------------|
| `prisma`         | `7.10.0`  | Schema-driven ORM with migrations, seeding, studio      |
| `@prisma/client` | `7.10.0`  | Type-safe database client generated from schema         |

> **PostgreSQL version:** 15.x or 16.x recommended on the deployment server.

### Authentication

| Package      | Version           | Rationale                                          |
|--------------|-------------------|----------------------------------------------------|
| `next-auth`  | `5.0.0-beta.32`   | v5 beta — designed for App Router + Server Actions |

> **Note:** NextAuth v5 is still in beta but is the only version designed for the Next.js
> App Router. The v4 stable line (`4.24.x`) targets the Pages Router. We recommend v5 with
> the understanding that its API may shift slightly before GA. Alternative: `lucia-auth` if
> the team prefers a stable, non-beta solution.

### Internationalization

| Package      | Version   | Rationale                                                     |
|--------------|-----------|---------------------------------------------------------------|
| `next-intl`  | `4.14.6`  | First-class App Router support, ICU message format, type-safe |

### Animation

| Package          | Version   | Rationale                                                    |
|------------------|-----------|--------------------------------------------------------------|
| `framer-motion`  | `13.4.0`  | Declarative React animations — covers 95% of UI motion needs |
| `gsap`           | `3.15.0`  | Reserved for scroll-driven, timeline, or canvas animations   |

### Image / Media

| Package  | Version   | Rationale                                  |
|----------|-----------|--------------------------------------------|
| `sharp`  | `0.35.4`  | Next.js image optimization backend         |

### Utilities (to be added as needed)

| Package                      | Purpose                                  |
|------------------------------|------------------------------------------|
| `zod`                        | Runtime validation for forms & API input |
| `react-hook-form`            | Performant form handling                 |
| `@tanstack/react-query`     | Client-side data fetching & caching      |
| `clsx` / `tailwind-merge`   | Conditional class composition            |
| `lucide-react`               | Icon library — consistent, tree-shakable |
| `sonner`                     | Toast notifications                      |
| `nuqs`                       | Type-safe URL search params              |

### Development Tools

| Package        | Purpose                                  |
|----------------|------------------------------------------|
| `eslint`       | Linting — Next.js + TypeScript rules     |
| `prettier`     | Code formatting                          |
| `husky`        | Git hooks for pre-commit checks          |
| `lint-staged`  | Run linters on staged files only         |

### Package Manager

**pnpm** — chosen for:
- Strict dependency isolation (avoids phantom dependencies)
- Faster installs via content-addressable storage
- Excellent monorepo support if the project scales
- Native workspace support

---

## C. Folder Structure

```
hilful-ventures/
├── .github/
│   └── workflows/
│       ├── ci.yml                  # Lint + type-check + test
│       └── deploy.yml              # Production deployment
│
├── prisma/
│   ├── schema.prisma               # Database schema
│   ├── migrations/                 # Generated migration files
│   └── seed.ts                     # Database seeding script
│
├── public/
│   ├── fonts/                      # Self-hosted web fonts
│   ├── images/                     # Static images (logos, favicons)
│   ├── og/                         # Open Graph images
│   ├── robots.txt
│   └── sitemap.xml                 # Generated at build time
│
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── [locale]/               # Locale-scoped routes
│   │   │   ├── layout.tsx          # Root locale layout
│   │   │   ├── page.tsx            # Home page
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── services/
│   │   │   │   ├── page.tsx        # Services index
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx    # Individual service
│   │   │   ├── equipment/
│   │   │   │   └── page.tsx
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── hse/
│   │   │   │   └── page.tsx        # HSE & Governance
│   │   │   ├── resources/
│   │   │   │   └── page.tsx        # Brochure / Downloads
│   │   │   └── contact/
│   │   │       └── page.tsx        # Contact & Business Inquiry
│   │   │
│   │   ├── admin/                  # CMS admin (not locale-scoped)
│   │   │   ├── layout.tsx          # Admin shell with sidebar
│   │   │   ├── page.tsx            # Dashboard
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   ├── equipment/
│   │   │   ├── projects/
│   │   │   ├── media/
│   │   │   ├── inquiries/
│   │   │   ├── translations/
│   │   │   ├── settings/
│   │   │   └── users/
│   │   │
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/
│   │   │   │   └── route.ts
│   │   │   ├── contact/
│   │   │   │   └── route.ts
│   │   │   ├── admin/              # Protected admin API
│   │   │   │   ├── upload/
│   │   │   │   └── [entity]/
│   │   │   └── revalidate/
│   │   │       └── route.ts        # On-demand ISR revalidation
│   │   │
│   │   ├── layout.tsx              # Root layout (html, body)
│   │   ├── not-found.tsx
│   │   └── global-error.tsx
│   │
│   ├── components/
│   │   ├── ui/                     # Primitive UI components
│   │   ├── layout/                 # Structural components (header, footer, nav)
│   │   ├── sections/               # Homepage / page section blocks
│   │   ├── forms/                  # Form components
│   │   └── admin/                  # Admin-specific components
│   │
│   ├── lib/
│   │   ├── db.ts                   # Prisma client singleton
│   │   ├── auth.ts                 # NextAuth configuration
│   │   ├── utils.ts                # General utilities
│   │   ├── constants.ts            # App-wide constants
│   │   ├── validations/            # Zod schemas
│   │   └── seo.ts                  # SEO metadata helpers
│   │
│   ├── hooks/                      # Custom React hooks
│   ├── styles/
│   │   └── globals.css             # Tailwind directives + custom properties
│   │
│   ├── types/                      # TypeScript type definitions
│   │
│   └── i18n/
│       ├── config.ts               # Locale list, default locale
│       ├── request.ts              # next-intl request configuration
│       └── messages/               # Translation JSON files
│           ├── en.json
│           └── ar.json             # Arabic (RTL)
│
├── .env.local
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── middleware.ts                    # Locale detection + auth guard
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── pnpm-lock.yaml
```

### Folder Structure Rationale

1. **`src/app/[locale]/`** — All public-facing routes are nested under a dynamic locale segment.
   `next-intl` middleware handles locale detection and redirects.

2. **`src/app/admin/`** — The admin CMS lives outside the locale scope. It is English-only
   and protected by NextAuth middleware.

3. **`src/components/`** — Four sub-folders separate concerns:
   - `ui/` — atomic, reusable primitives (buttons, inputs, cards)
   - `layout/` — structural page chrome (header, footer, nav)
   - `sections/` — composable content blocks for page building
   - `admin/` — admin-only components that are not loaded on public pages

4. **`src/lib/`** — Non-React utilities, database client, auth config, validation schemas.
   Keeps business logic out of components.

5. **`prisma/`** — Database schema, migrations, and seed script live at the project root
   for CLI tool compatibility.

---

## D. Architecture Decisions

### D.1 Rendering Strategy

| Page Type              | Strategy          | Rationale                                         |
|------------------------|-------------------|---------------------------------------------------|
| Home                   | ISR (60s)         | Dynamic content, but doesn't change per-request   |
| About                  | Static (SSG)      | Rarely changes                                    |
| Services (index)       | ISR (300s)        | CMS-managed, moderate update frequency            |
| Service detail         | ISR (300s)        | Same as above                                     |
| Equipment              | ISR (300s)        | Catalog data, periodic updates                    |
| Projects               | ISR (300s)        | Infrequent additions                              |
| HSE & Governance       | Static (SSG)      | Compliance content — changes are deliberate       |
| Resources / Brochure   | ISR (600s)        | File downloads, rare updates                      |
| Contact                | Static + Client   | Static page with client-side form submission      |
| Admin                  | SSR (dynamic)     | Always server-rendered, never cached publicly     |

On-demand revalidation via `/api/revalidate` will be triggered from the admin CMS when
content is updated, ensuring public pages reflect changes within seconds.

### D.2 Server Components vs Client Components

**Default to Server Components.** Only add `"use client"` when the component genuinely requires:
- Browser event handlers (onClick, onChange, onSubmit)
- React state (`useState`, `useReducer`)
- Browser APIs (`IntersectionObserver`, `window`, `navigator`)
- Animation libraries (`framer-motion` AnimatePresence, motion components)

This keeps the JavaScript bundle lean on content-heavy public pages.

### D.3 API Architecture

- **Server Actions** — for mutations (form submissions, admin CRUD). Eliminates the need for
  dedicated API routes in most cases.
- **Route Handlers (`/api/`)** — reserved for webhooks, authentication callbacks, file uploads,
  and third-party integrations that require traditional HTTP endpoints.

### D.4 Styling Architecture

Tailwind CSS v4 with a custom design system defined in `globals.css`:

```
Design Tokens (CSS custom properties)
├── Colors          → Brand palette, neutrals, semantic colors
├── Typography      → Font families, size scale, line heights
├── Spacing         → Consistent spacing scale
├── Shadows         → Elevation system
├── Border Radius   → Minimal — avoid excessive rounding
└── Breakpoints     → Mobile-first responsive design
```

**Design philosophy:** The aesthetic should evoke **premium industrial editorial** —
think annual report typography, clean whitespace, bold photography with restrained color
accents. No excessive gradients, no glassmorphism, no generic SaaS card grids.

### D.5 Error Handling

- `global-error.tsx` — catches unhandled errors in the root layout
- `not-found.tsx` — custom 404 page with navigation
- `error.tsx` — per-route error boundaries where needed
- API errors return structured JSON: `{ error: string, code: string, details?: unknown }`

---

## E. CMS Data Model

> Detailed entity descriptions are in `CONTENT_MODEL.md`.

Summary of entities:

| Entity             | Purpose                                                    |
|--------------------|------------------------------------------------------------|
| `User`             | Admin users with role-based access                         |
| `Page`             | CMS-managed static pages (About, HSE, etc.)                |
| `Service`          | Service offerings with detailed descriptions               |
| `Equipment`        | Equipment fleet catalog                                    |
| `Project`          | Portfolio of completed and active projects                  |
| `Media`            | Centralized media library for images and documents         |
| `Translation`      | Key-value translation strings per locale                   |
| `HomepageSection`  | Ordered, configurable sections for the homepage            |
| `Inquiry`          | Business inquiry and contact form submissions              |
| `BrochureVersion`  | Versioned downloadable brochure/resource files             |
| `SiteSetting`      | Global configuration (contact info, social links, etc.)    |

---

## F. Multilingual Strategy

### Supported Locales (Initial)

| Locale | Language | Direction | Priority |
|--------|----------|-----------|----------|
| `en`   | English  | LTR       | Default  |
| `ar`   | Arabic   | RTL       | Phase 2  |

Additional locales (Hindi, French, etc.) can be added by creating a new message file and
adding the locale code to the configuration array.

### Implementation

1. **Routing:** `next-intl` with middleware-based locale detection. URL structure: `/{locale}/path`.
   The default locale (`en`) can optionally be unprefixed (i.e., `/about` -> English,
   `/ar/about` -> Arabic).

2. **Content translation:**
   - **UI strings** (buttons, labels, navigation) -> JSON message files in `src/i18n/messages/`
   - **CMS content** (page bodies, service descriptions) -> `Translation` database table linked
     to each entity via a polymorphic `entityType` + `entityId` pattern

3. **RTL support:** Tailwind's `rtl:` variant handles directional styles. The root `<html>`
   element receives `dir="rtl"` when the active locale requires it.

4. **SEO:** Each locale generates its own set of metadata, Open Graph tags, and `hreflang`
   alternate links.

5. **Date/number formatting:** `next-intl` provides locale-aware formatting via `useFormatter`.

### Translation Workflow

```
Content created in English (default)
        |
        v
Admin marks content for translation
        |
        v
Translator fills in translation for each locale
        |
        v
Published content serves the appropriate locale
```

---

## G. Animation Strategy

### Philosophy

Animation should be **purposeful and restrained**. Every animation must serve one of:
- **Orientation** — help the user understand spatial relationships
- **Attention** — draw focus to important state changes
- **Delight** — subtle polish that elevates perceived quality

Animations must **never delay or obstruct** the user from accessing content.

### Library Assignment

| Use Case                              | Library            | Rationale                              |
|---------------------------------------|--------------------|----------------------------------------|
| Page transitions                      | Framer Motion      | AnimatePresence + layout animations    |
| Section reveal on scroll              | Framer Motion      | `whileInView` + viewport detection     |
| Hover / press interactions            | Framer Motion      | `whileHover`, `whileTap` variants      |
| Navigation menu open/close            | Framer Motion      | Height/opacity transitions             |
| Number counter animations             | Framer Motion      | `useMotionValue` + `animate`           |
| Complex scroll-linked parallax        | GSAP ScrollTrigger | Pin, scrub, timeline control           |
| Equipment/project image sequences     | GSAP               | Only if filmstrip or canvas effect     |
| Staggered text reveals (hero)         | Framer Motion      | `staggerChildren` variants             |

### Performance Constraints

- Prefer CSS `transform` and `opacity` — these are GPU-composited
- Avoid animating `width`, `height`, `top`, `left` — these trigger layout recalculation
- Use `will-change` sparingly and only on actively animating elements
- All animations must respect `prefers-reduced-motion` — provide static fallbacks
- GSAP is loaded only on pages that need it (dynamic import)
- Target 60fps on mid-range mobile devices

---

## H. Image & Media Strategy

### Next.js Image Optimization

- Use `next/image` for all images — automatic format conversion (WebP/AVIF), responsive
  `srcSet`, and lazy loading
- `sharp` installed as the optimization backend for production builds
- Define explicit `sizes` attributes on all `<Image>` components to prevent unnecessary
  downloads

### Image Categories

| Category          | Source              | Format     | Notes                                    |
|-------------------|---------------------|------------|------------------------------------------|
| Hero backgrounds  | CMS upload          | WebP/AVIF  | 1920x1080 max, with blur placeholder     |
| Equipment photos  | CMS upload          | WebP       | 800x600 standard, with zoom capability   |
| Project gallery   | CMS upload          | WebP       | Lightbox with lazy-loaded full resolution |
| Team photos       | CMS upload          | WebP       | 400x400 square crop                      |
| Logo              | Static (`/public`)  | SVG        | Vector for crispness at all sizes        |
| Icons             | `lucide-react`      | SVG (JSX)  | Tree-shakable, consistent stroke width   |
| OG images         | Generated/Static    | JPEG       | 1200x630, per-page generation            |

### Media Upload Architecture

- Admin uploads -> processed by API route -> stored in object storage (e.g., Cloudflare R2,
  AWS S3, or Vercel Blob)
- On upload: generate responsive variants (thumbnail, medium, full) + blur placeholder hash
- Store metadata (dimensions, alt text, file size, MIME type) in the `Media` database table
- Serve via CDN with immutable cache headers

### Placeholder Strategy

- **Blur hash** — generated on upload, stored in the `Media` table, passed to `next/image`
  `blurDataURL` for smooth loading transitions
- No layout shift — all images have explicit `width` and `height` or use `fill` with a
  sized container

---

## I. Security Architecture

### Authentication

- NextAuth v5 with credential-based login for admin users
- Session stored server-side (database session strategy via Prisma adapter)
- CSRF protection built into NextAuth
- Admin routes protected by middleware — unauthenticated requests redirected to login

### Authorization

| Role      | Capabilities                                                 |
|-----------|--------------------------------------------------------------|
| `ADMIN`   | Full CRUD on all entities, user management, site settings    |
| `EDITOR`  | CRUD on content entities (pages, services, projects, media)  |
| `VIEWER`  | Read-only access to admin dashboard                          |

### Input Validation

- All form inputs validated with `zod` schemas on both client and server
- Server Actions and API routes re-validate all input (never trust the client)
- File uploads validated for MIME type, file size, and dimensions

### Headers & CSP

Configured in `next.config.ts`:
- `Content-Security-Policy` — restrict script/style/image sources
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — disable unused browser APIs

---

## J. Deployment Strategy

### Recommended Platform: Vercel

- Native Next.js support with zero-config deployment
- Edge middleware for locale detection
- ISR and on-demand revalidation support
- Automatic image optimization
- Preview deployments on PRs

### Alternative: Self-hosted (Docker)

If Vercel is not suitable:
- Dockerized Next.js standalone build
- PostgreSQL on managed service (e.g., Neon, Supabase, RDS)
- Object storage for media (Cloudflare R2 or S3)
- Reverse proxy (nginx or Caddy) for SSL termination

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/hilful_ventures

# Authentication
NEXTAUTH_SECRET=<random-secret>
NEXTAUTH_URL=https://hilfulventures.com

# Media Storage
STORAGE_ENDPOINT=<object-storage-url>
STORAGE_ACCESS_KEY=<key>
STORAGE_SECRET_KEY=<secret>
STORAGE_BUCKET=hilful-media

# Revalidation
REVALIDATION_SECRET=<webhook-secret>

# Optional
SMTP_HOST=<email-server>
SMTP_PORT=587
SMTP_USER=<email>
SMTP_PASSWORD=<password>
```

---

## Appendix: Reference Website Observations

The Harinimpex reference website (https://harinimpex.com) is a client-rendered SPA for
an export/trading company. Structural patterns to draw inspiration from (without copying):

- **Multi-section homepage** with hero, product categories, company stats, and CTA
- **Product/service categorization** with dedicated detail pages
- **Strong SEO metadata** — Open Graph, Twitter Cards, canonical URLs, structured data
- **Professional imagery** — product/industry photography as a key design element
- **Clear navigation hierarchy** — top-level categories with logical sub-pages

Our implementation will differ significantly in visual identity, code architecture
(server-rendered Next.js vs client-rendered SPA), content structure, and brand positioning.
