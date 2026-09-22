# HILFUL VENTURES PVT LTD — Development Plan

> **Document version:** 1.0
> **Date:** 2026-09-22
> **Status:** Awaiting approval before implementation

---

## Development Phases

The project is divided into five phases. Each phase produces a shippable increment.
No phase begins until the previous one is reviewed and approved.

---

## Phase 1 — Foundation & Design System

**Estimated duration:** 3-4 days
**Goal:** Bootable Next.js application with design system, layout shell, and database schema.

### 1.1 Project Initialization

- [ ] Install pnpm globally
- [ ] Initialize Next.js 16 project with TypeScript, Tailwind CSS v4, App Router
- [ ] Configure `tsconfig.json` with strict mode and path aliases
- [ ] Configure Tailwind CSS v4 with PostCSS
- [ ] Set up ESLint + Prettier with project rules
- [ ] Initialize Git repository with `.gitignore`
- [ ] Create `.env.example` with all required variables

### 1.2 Database Schema

- [ ] Create `prisma/schema.prisma` with all 11 entities (see `CONTENT_MODEL.md`)
- [ ] Configure PostgreSQL connection
- [ ] Run initial migration
- [ ] Create seed script with minimal test data
- [ ] Verify Prisma Studio access

### 1.3 Design System

- [ ] Define CSS custom properties (colors, typography, spacing, shadows)
- [ ] Select and self-host typefaces (primary: editorial serif or geometric sans; secondary: clean sans)
- [ ] Build primitive UI components: Button, Input, Select, Card, Dialog, Badge
- [ ] Build layout components: SectionWrapper, Container, PageHeader
- [ ] Document component usage in Storybook or a dedicated `/dev` page (optional)

### 1.4 Layout Shell

- [ ] Root layout with font loading, metadata, and locale provider
- [ ] Header with navigation (desktop + mobile)
- [ ] Footer with company information, links, and social icons
- [ ] Locale switcher component
- [ ] 404 page with branded design
- [ ] Loading states and error boundaries

### 1.5 Internationalization Setup

- [ ] Configure `next-intl` with middleware
- [ ] Create `[locale]` route group
- [ ] Set up English message file with navigation, footer, and common strings
- [ ] Create Arabic message file (placeholder strings, RTL layout tested)
- [ ] Verify locale detection and URL-based switching

### Phase 1 Exit Criteria

- [x] Application starts without errors
- [x] Navigation renders on all breakpoints
- [x] Locale switching works (English ↔ Arabic)
- [x] Database connection verified
- [x] All primitives render correctly
- [x] Git repository initialized with clean history

---

## Phase 2 — Public Pages (Content-Driven)

**Estimated duration:** 5-7 days
**Goal:** All public-facing pages built with placeholder content zones (not fake content).

### 2.1 Homepage

- [ ] Hero section with background media slot and headline
- [ ] Services overview section (4 service cards linking to detail pages)
- [ ] Company introduction section with editorial layout
- [ ] Statistics/metrics section (content to be provided by client)
- [ ] CTA banner section
- [ ] Animate sections with Framer Motion `whileInView`

### 2.2 About Us Page

- [ ] Company story section with editorial typography
- [ ] Vision / Mission / Values section
- [ ] Leadership team section (grid layout, photo + bio)
- [ ] Timeline or milestones section (if client provides data)

### 2.3 Services Pages

- [ ] Services index page with overview cards
- [ ] Service detail page template (`/services/[slug]`)
- [ ] Four service pages:
  - Minerals & Oil Exploration
  - Mining Equipment Leasing
  - Turnkey Mining Project Management
  - Mineral & Hydrocarbon Commodities Trading
- [ ] Each page: hero, description, key capabilities, related projects, CTA

### 2.4 Equipment Fleet Page

- [ ] Filterable equipment catalog grid
- [ ] Equipment card with image, name, category, specifications
- [ ] Detail modal or expandable view for each item
- [ ] Category filter (drilling, excavation, transport, etc.)

### 2.5 Projects Page

- [ ] Project portfolio grid with category filtering
- [ ] Project detail page (`/projects/[slug]`)
- [ ] Each project: hero image, description, scope, location, status
- [ ] Image gallery with lightbox

### 2.6 HSE & Governance Page

- [ ] Policy statement sections
- [ ] Certifications display (layout only — no fake certifications)
- [ ] Safety statistics section (layout only — content to be provided)
- [ ] Governance structure section

### 2.7 Resources / Brochure Page

- [ ] Downloadable brochure section with versioning
- [ ] File card component with download tracking
- [ ] Optional: newsletter signup form

### 2.8 Contact / Business Inquiry Page

- [ ] Contact form with validation (name, email, phone, company, message, service interest)
- [ ] Company contact information section
- [ ] Office location(s) with map placeholder
- [ ] Form submission via Server Action with email notification

### Phase 2 Exit Criteria

- [x] All pages render correctly at mobile, tablet, and desktop breakpoints
- [x] Navigation links to all pages
- [x] Forms validate and submit
- [x] Animations are smooth and respect `prefers-reduced-motion`
- [x] SEO metadata is correct on every page
- [x] Pages load under 3 seconds on simulated 3G

---

## Phase 3 — Admin CMS

**Estimated duration:** 5-7 days
**Goal:** Functional admin panel for managing all content entities.

### 3.1 Authentication

- [ ] NextAuth v5 setup with credentials provider
- [ ] Login page with branded design
- [ ] Session management with database strategy
- [ ] Middleware protection for `/admin/*` routes
- [ ] Role-based access control (Admin, Editor, Viewer)

### 3.2 Admin Dashboard

- [ ] Dashboard layout with sidebar navigation
- [ ] Quick stats: total pages, services, projects, pending inquiries
- [ ] Recent activity feed
- [ ] System status indicators

### 3.3 Content Management

- [ ] **Pages** — CRUD with rich text editor, SEO fields, translation support
- [ ] **Services** — CRUD with slug generation, media attachment, feature lists
- [ ] **Equipment** — CRUD with specifications, categories, media gallery
- [ ] **Projects** — CRUD with status tracking, location, gallery, related services
- [ ] **Media** — Upload, organize, delete; image preview with metadata editing
- [ ] **Homepage Sections** — Reorder, enable/disable, edit content per section
- [ ] **Inquiries** — View, filter, mark as read/responded, export
- [ ] **Brochure Versions** — Upload new versions, manage download links
- [ ] **Translations** — Side-by-side editing for each locale
- [ ] **Site Settings** — Global config (contact info, social links, analytics IDs)
- [ ] **Users** — Invite, assign roles, deactivate

### 3.4 Media Management

- [ ] Drag-and-drop upload interface
- [ ] Image cropping and preview
- [ ] Automatic responsive variant generation
- [ ] Blur hash generation on upload
- [ ] Media library with search and filtering

### 3.5 On-Demand Revalidation

- [ ] `/api/revalidate` endpoint triggered on content save
- [ ] Revalidate only affected paths (not full site)
- [ ] Admin UI feedback confirming cache purge

### Phase 3 Exit Criteria

- [x] All entities can be created, read, updated, and deleted
- [x] Role-based access is enforced
- [x] Media uploads work reliably
- [x] Content changes appear on public site within seconds (via revalidation)
- [x] Admin UI is responsive and usable on tablet

---

## Phase 4 — Polish, Performance & SEO

**Estimated duration:** 3-4 days
**Goal:** Production-quality performance, accessibility, and search engine optimization.

### 4.1 Performance

- [ ] Lighthouse audit — target 90+ on all metrics
- [ ] Bundle analysis — identify and eliminate unnecessary client JS
- [ ] Image optimization audit — verify all images use `next/image` with correct `sizes`
- [ ] Font loading optimization (preload, `font-display: swap`)
- [ ] Database query optimization (Prisma query logging, N+1 detection)

### 4.2 SEO

- [ ] Dynamic `sitemap.xml` generation
- [ ] Dynamic `robots.txt`
- [ ] JSON-LD structured data (Organization, LocalBusiness, BreadcrumbList)
- [ ] `hreflang` alternate links for all pages
- [ ] Canonical URLs
- [ ] Open Graph images per page (static or dynamically generated)
- [ ] Twitter Card metadata
- [ ] Meta title and description for every page

### 4.3 Accessibility

- [ ] Keyboard navigation audit
- [ ] Screen reader testing (NVDA or VoiceOver)
- [ ] Focus indicators on all interactive elements
- [ ] ARIA labels on icons and interactive components
- [ ] Color contrast compliance (WCAG 2.1 AA)
- [ ] `prefers-reduced-motion` fallbacks

### 4.4 Cross-Browser Testing

- [ ] Chrome, Firefox, Safari, Edge (latest 2 versions)
- [ ] iOS Safari, Android Chrome
- [ ] RTL layout verification (Arabic)

### Phase 4 Exit Criteria

- [x] Lighthouse: Performance 90+, Accessibility 95+, SEO 95+, Best Practices 95+
- [x] All pages pass axe-core accessibility checks
- [x] Sitemap and robots.txt are valid
- [x] Structured data validates in Google Rich Results Test

---

## Phase 5 — Deployment & Handover

**Estimated duration:** 2-3 days
**Goal:** Production deployment, documentation, and knowledge transfer.

### 5.1 Deployment

- [ ] Production environment setup (Vercel or Docker)
- [ ] PostgreSQL production database provisioning
- [ ] Object storage setup for media
- [ ] Environment variable configuration
- [ ] Domain and SSL configuration
- [ ] Preview deployment workflow for PRs

### 5.2 CI/CD

- [ ] GitHub Actions: lint + type-check on PR
- [ ] GitHub Actions: automated deployment on main branch merge
- [ ] Branch protection rules on `main`

### 5.3 Documentation

- [ ] `README.md` — project overview, setup instructions, development workflow
- [ ] Admin user guide — how to manage content, upload media, handle inquiries
- [ ] Environment variable reference
- [ ] Deployment runbook

### 5.4 Handover

- [ ] Initial admin user creation
- [ ] Client walkthrough of admin panel
- [ ] Content migration guide (if existing content needs to be imported)
- [ ] Support and maintenance agreement (out of scope for development)

### Phase 5 Exit Criteria

- [x] Production site is live and accessible
- [x] Admin panel is functional with initial admin user
- [x] CI/CD pipeline runs successfully
- [x] Documentation is complete and reviewed

---

## Risks & Decisions Requiring Human Approval

### Decisions Required

| # | Decision                                           | Options                                         | Impact    |
|---|----------------------------------------------------|-------------------------------------------------|-----------|
| 1 | **Authentication library**                         | NextAuth v5 (beta) vs. Lucia Auth (stable)      | High      |
| 2 | **Deployment platform**                            | Vercel vs. Self-hosted Docker                   | High      |
| 3 | **Object storage provider**                        | Vercel Blob, Cloudflare R2, AWS S3              | Medium    |
| 4 | **PostgreSQL host**                                | Neon, Supabase, AWS RDS, self-hosted            | Medium    |
| 5 | **Default locale prefix**                          | Show `/en/` in URL vs. unprefixed English       | Low       |
| 6 | **Additional locales beyond English and Arabic**   | Which languages, and when?                      | Medium    |
| 7 | **Email delivery service**                         | SendGrid, Resend, AWS SES, SMTP                 | Low       |
| 8 | **Domain name**                                    | Client to confirm production domain             | High      |
| 9 | **Brand assets**                                   | Logo, color palette, typeface preferences        | High      |

### Risks

| # | Risk                                               | Mitigation                                       |
|---|----------------------------------------------------|--------------------------------------------------|
| 1 | NextAuth v5 API may change before GA               | Pin exact version; isolate auth logic in `lib/auth.ts` for easy swapping |
| 2 | Content not ready when pages are built              | Design pages with clear content zones; use placeholder layouts, not fake data |
| 3 | Arabic translation quality                          | Use professional translator; automated translation only as draft baseline |
| 4 | Large media files affecting performance             | Enforce upload size limits; generate optimized variants on upload |
| 5 | TypeScript 5.9 vs 7.0 upgrade path                 | Start with 5.9.x; upgrade to 7.x when Next.js officially supports it |
| 6 | GSAP licensing for commercial use                   | Verify GSAP license terms; use standard license (free for most commercial sites) |

---

## Timeline Summary

| Phase | Name                        | Duration     | Cumulative |
|-------|-----------------------------|-------------|------------|
| 1     | Foundation & Design System  | 3-4 days    | Week 1     |
| 2     | Public Pages                | 5-7 days    | Week 2-3   |
| 3     | Admin CMS                   | 5-7 days    | Week 3-4   |
| 4     | Polish & SEO                | 3-4 days    | Week 5     |
| 5     | Deployment & Handover       | 2-3 days    | Week 5-6   |
| **Total** |                         | **18-25 days** |         |

> These estimates assume a single developer working full-time. Parallel work on Phase 2
> (front-end) and Phase 3 (back-end) could reduce the total timeline by 3-5 days.
