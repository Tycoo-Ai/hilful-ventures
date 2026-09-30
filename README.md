# Hilful Ventures — Global Commodities & Exploration Trading Platform

Rooted in Earth. Trusted Worldwide.

A luxury editorial industrial commodities trading and resource supply web platform built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM**.

---

## 🌍 Core Trading Disciplines

1. **Department 01: Mining & Drilling Chemicals** — Heavy drilling polymers, bentonite rheology modifiers, and fluid additives.
2. **Department 02: Ferrous & Non-Ferrous Secondary Metals** — HMS 1&2, copper scrap, and foundry remelting stock.
3. **Department 03: Minerals & Mud Chemicals to ONG Exploration** — API-grade mud chemicals, barite, attapulgite, and metallurgical iron ore.
4. **Department 04: Quartz and Fly Ash** — Micronized Class F & C pozzolanic fly ash, industrial quartz silica, and micro-silica.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ or 20+
- PostgreSQL database (or Prisma-supported provider)
- Cloudinary account for media assets (optional for local mock mode)

### 2. Installation
```bash
git clone https://github.com/Tycoo-Ai/hilful.git
cd hilful
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 4. Database Setup
```bash
npx prisma generate
npx prisma db push
```

### 5. Run Locally
```bash
npm run dev
# or for production server
npm run build
npm run start
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🛠 Features
- **Bilingual & Bi-directional**: Full English (`/en`) & Arabic (`/ar`) with contextual RTL styling.
- **Administrative CMS**: Content dashboard for hero, about, 4 departments, products, gallery, equipment, and contact inquiries.
- **Media Management**: Direct Cloudinary integration with preset libraries and Google image URLs.
- **Responsive Layout**: Precision typography and adaptive mobile/tablet viewports.
