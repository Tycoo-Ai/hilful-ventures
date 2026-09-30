import { PrismaClient } from "@prisma/client";
import { DEPARTMENTS, OFFICES } from "../src/data/hilful-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Hilful Ventures CMS Seed...");

  // 1. Seed Owner Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "admin@hilfulventures.com";
  const passwordHash =
    process.env.ADMIN_PASSWORD_HASH ||
    "7a47564bb595136857c4985ff6289d12074a89e68c6ba165701eb319d3a0fe5f:697414a9d27ce866bc05a9e859b699e25ff1c05f505cf4dbc3ddf9664dc2a3560cdaa807d27bf6d29b48a259f1bb1b9f7721e60b99f9df40dff7b1db37660928";

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN" },
    create: {
      email: adminEmail,
      name: "Hilful Admin",
      passwordHash,
      role: "ADMIN",
    },
  });
  console.log(`✅ Admin user seeded: ${adminEmail}`);

  // 2. Seed Offices (India & Ethiopia)
  for (const office of OFFICES) {
    await prisma.office.upsert({
      where: { key: office.key },
      update: {
        country: office.country,
        name: office.name,
        address: office.address,
        email: office.email,
        phone1: office.phone1,
        phone2: office.phone2 || null,
        mapEmbedUrl: office.mapEmbedUrl,
        googleMapsLink: office.googleMapsLink,
        badge: office.badge,
        hours: office.hours,
      },
      create: {
        key: office.key,
        country: office.country,
        name: office.name,
        address: office.address,
        email: office.email,
        phone1: office.phone1,
        phone2: office.phone2 || null,
        mapEmbedUrl: office.mapEmbedUrl,
        googleMapsLink: office.googleMapsLink,
        badge: office.badge,
        hours: office.hours,
      },
    });
  }
  console.log("✅ India & Ethiopia offices seeded.");

  // 3. Seed 4 Departments & Products
  for (let i = 0; i < DEPARTMENTS.length; i++) {
    const dept = DEPARTMENTS[i];

    const seededDept = await prisma.department.upsert({
      where: { slug: dept.slug },
      update: {
        number: dept.number,
        name: dept.name,
        tagline: dept.tagline,
        overview: dept.overview,
        whatWeDo: dept.whatWeDo,
        image: dept.image,
        coverImage: dept.coverImage,
        icon: dept.icon,
        specSummary: dept.specSummary as any,
        process: dept.process as any,
        qualityCertifications: dept.qualityCertifications as any,
        faqs: dept.faqs as any,
        sortOrder: i,
        status: "PUBLISHED",
      },
      create: {
        slug: dept.slug,
        number: dept.number,
        name: dept.name,
        tagline: dept.tagline,
        overview: dept.overview,
        whatWeDo: dept.whatWeDo,
        image: dept.image,
        coverImage: dept.coverImage,
        icon: dept.icon,
        specSummary: dept.specSummary as any,
        process: dept.process as any,
        qualityCertifications: dept.qualityCertifications as any,
        faqs: dept.faqs as any,
        sortOrder: i,
        status: "PUBLISHED",
      },
    });

    // Seed products for this department
    for (let j = 0; j < dept.products.length; j++) {
      const prod = dept.products[j];
      await prisma.product.upsert({
        where: { slug: prod.slug },
        update: {
          name: prod.name,
          departmentSlug: seededDept.slug,
          departmentName: seededDept.name,
          shortDesc: prod.shortDesc,
          fullDesc: prod.fullDesc,
          image: prod.image,
          galleryImages: prod.galleryImages,
          specs: prod.specs as any,
          applications: prod.applications,
          qualityDocs: prod.qualityDocs,
          shippingOptions: prod.shippingOptions,
          brochureUrl: prod.brochureUrl || null,
          featured: prod.featured || false,
          sortOrder: j,
          status: "PUBLISHED",
        },
        create: {
          slug: prod.slug,
          name: prod.name,
          departmentSlug: seededDept.slug,
          departmentName: seededDept.name,
          shortDesc: prod.shortDesc,
          fullDesc: prod.fullDesc,
          image: prod.image,
          galleryImages: prod.galleryImages,
          specs: prod.specs as any,
          applications: prod.applications,
          qualityDocs: prod.qualityDocs,
          shippingOptions: prod.shippingOptions,
          brochureUrl: prod.brochureUrl || null,
          featured: prod.featured || false,
          sortOrder: j,
          status: "PUBLISHED",
        },
      });
    }
  }
  console.log("✅ 4 Departments and all starting commodities seeded.");

  // 4. Seed Theme Configuration (Brown & Ivory Luxury Theme)
  await prisma.themeConfig.upsert({
    where: { key: "global_theme" },
    update: {
      value: {
        espresso: "#1E130C",
        umber: "#3B2314",
        walnut: "#5A3A22",
        copper: "#A8683A",
        caramel: "#C9935A",
        ivory: "#F6F0E4",
        parchment: "#EADFC9",
        ink: "#2A1B10",
        filmGrain: true,
        navStyle: "ivory",
      },
    },
    create: {
      key: "global_theme",
      value: {
        espresso: "#1E130C",
        umber: "#3B2314",
        walnut: "#5A3A22",
        copper: "#A8683A",
        caramel: "#C9935A",
        ivory: "#F6F0E4",
        parchment: "#EADFC9",
        ink: "#2A1B10",
        filmGrain: true,
        navStyle: "ivory",
      },
    },
  });
  console.log("✅ Global theme tokens seeded.");

  console.log("🎉 Seed finished successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
