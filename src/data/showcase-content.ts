export interface ShowcaseItem {
  id: string;
  category: string;
  categoryKey: string;
  title: string;
  description: string;
  capabilityName: string;
  capabilityLink: string;
  imageUrl: string;
  altText: string;
}

export interface ShowcasePageContent {
  hero: {
    eyebrow: string;
    headline: string;
    subtext: string;
    disclaimer: string;
    primaryCta: string;
    secondaryCta: string;
  };
  categories: { key: string; label: string }[];
  items: ShowcaseItem[];
  cta: {
    headline: string;
    subtext: string;
    primaryText: string;
    secondaryText: string;
  };
}

export const showcaseContentEn: ShowcasePageContent = {
  hero: {
    eyebrow: "OPERATIONAL SHOWCASE",
    headline: "CAPABILITY IN CONTEXT",
    subtext:
      "Visual examples illustrating the industrial environments and operational disciplines relevant to Hilful's capability portfolio.",
    disclaimer:
      "The following visual references illustrate the operational environments, equipment classes, and infrastructure disciplines aligned with Hilful's service scope. Imagery represents industry operational contexts and is not presented as historical Hilful project case studies.",
    primaryCta: "Request an Operational Proposal",
    secondaryCta: "View Capabilities",
  },
  categories: [
    { key: "all", label: "ALL DISCIPLINES" },
    { key: "exploration", label: "EXPLORATION & PROSPECTING" },
    { key: "equipment", label: "MINING EQUIPMENT" },
    { key: "site-dev", label: "SITE DEVELOPMENT" },
    { key: "processing", label: "PROCESSING & INFRASTRUCTURE" },
    { key: "commodities", label: "COMMODITIES & LOGISTICS" },
    { key: "energy", label: "ENERGY & HYDROCARBON OPERATIONS" },
  ],
  items: [
    {
      id: "sc-exploration",
      category: "Exploration & Prospecting",
      categoryKey: "exploration",
      title: "Geological Mapping & Subsurface Investigation",
      description:
        "Field reconnaissance, surface lithological mapping, and geophysical survey deployment across rugged frontier terrain to establish initial geological baseline data.",
      capabilityName: "Minerals & Oil Exploration & Prospecting",
      capabilityLink: "/services/exploration-prospecting",
      imageUrl:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
      altText: "Geological terrain assessment and structural field mapping context",
    },
    {
      id: "sc-equipment",
      category: "Mining Equipment",
      categoryKey: "equipment",
      title: "High-Capacity Earthmoving & Haulage Operations",
      description:
        "Heavy hydraulic excavators paired with rigid haul trucks operating in demanding open-bench extraction environments under scheduled maintenance frameworks.",
      capabilityName: "Mining Equipment Leasing & Fleet Logistics",
      capabilityLink: "/services/equipment-leasing",
      imageUrl:
        "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=85",
      altText: "Heavy extraction machinery operating in an open-pit bench environment",
    },
    {
      id: "sc-site-dev",
      category: "Site Development",
      categoryKey: "site-dev",
      title: "Mine Access, Benches & Civil Earthworks",
      description:
        "Comprehensive site civil engineering including engineered haul road construction, drainage channel formation, bench clearance, and foundation stabilization.",
      capabilityName: "Turnkey Mining Project Management",
      capabilityLink: "/services/mining-project-management",
      imageUrl:
        "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=85",
      altText: "Engineered mining haul roads and civil bench development",
    },
    {
      id: "sc-processing",
      category: "Processing & Infrastructure",
      categoryKey: "processing",
      title: "Mobile Crushing & Material Sizing Installation",
      description:
        "Assembly, installation, and commissioning of primary crushing and multi-deck screening circuits engineered for on-site material sizing and intermediate feed.",
      capabilityName: "Turnkey Mining Project Management",
      capabilityLink: "/services/mining-project-management",
      imageUrl:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85",
      altText: "Industrial crushing and mineral sizing plant infrastructure",
    },
    {
      id: "sc-commodities",
      category: "Commodities & Logistics",
      categoryKey: "commodities",
      title: "Bulk Material Transfer & Multi-Modal Freight",
      description:
        "Chain-of-custody transfer, export terminal handling, and bulk freight logistics governed by standard international commercial Incoterms.",
      capabilityName: "Mineral & Hydrocarbon Commodities Trading",
      capabilityLink: "/services/commodities-trading",
      imageUrl:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
      altText: "Bulk freight export logistics terminal and multi-modal handling yard",
    },
    {
      id: "sc-energy",
      category: "Energy & Hydrocarbon Operations",
      categoryKey: "energy",
      title: "Specialized Hydrocarbon Byproduct Handling",
      description:
        "Arranging processing and off-take of industrial oil byproducts—including Fuel Oil, Furnace Oil, HFO, and MHO—in structured collaboration with established facilities.",
      capabilityName: "Mineral & Hydrocarbon Commodities Trading",
      capabilityLink: "/services/commodities-trading",
      imageUrl:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
      altText: "Industrial energy infrastructure and hydrocarbon transfer facilities",
    },
  ],
  cta: {
    headline: "Ready to Partner on Your Next Mining or Energy Venture?",
    subtext:
      "Connect with our operational leadership to evaluate how Hilful's integrated capability disciplines can support your project requirements.",
    primaryText: "Request an Operational Proposal",
    secondaryText: "Explore Capabilities",
  },
};

export const showcaseContentAr: ShowcasePageContent = {
  hero: {
    eyebrow: "استعراض القدرات التشغيلية",
    headline: "القدرات في سياقها الميداني",
    subtext:
      "أمثلة بصرية توضح البيئات الصناعية ومجالات العمل التشغيلي المرتبطة بمحفظة قدرات شركة هلفول.",
    disclaimer:
      "توضح المراجع البصرية التالية البيئات التشغيلية، وفئات الآليات، ومجالات البنية التحتية المتوافقة مع نطاق خدمات هلفول. تمثل هذه الصور سياقات صناعية عامة وليست توثيقاً لدراسات حالة أو مشاريع سابقة.",
    primaryCta: "طلب مقترح تشغيلي",
    secondaryCta: "استعرض القدرات",
  },
  categories: [
    { key: "all", label: "كافة المجالات" },
    { key: "exploration", label: "الاستكشاف والتنقيب" },
    { key: "equipment", label: "معدات التعدين" },
    { key: "site-dev", label: "تطوير المواقع" },
    { key: "processing", label: "المعالجة والبنية التحتية" },
    { key: "commodities", label: "السلع واللوجستيات" },
    { key: "energy", label: "عمليات الطاقة والهيدروكربونات" },
  ],
  items: [
    {
      id: "sc-exploration",
      category: "الاستكشاف والتنقيب",
      categoryKey: "exploration",
      title: "المسح الجيولوجي والاستكشاف الجيوفيزيائي",
      description:
        "الاستطلاع الميداني، والمسح الطبقي للسطح، وتطبيق المسوح الجيوفيزيائية عبر التضاريس الوعرة لبناء البيانات الجيولوجية الأولية المعتمدة.",
      capabilityName: "استكشاف وتنقيب المعادن والنفط",
      capabilityLink: "/services/exploration-prospecting",
      imageUrl:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
      altText: "تقييم التضاريس الجيولوجية وأعمال المسح الميداني الهيكلي",
    },
    {
      id: "sc-equipment",
      category: "معدات التعدين",
      categoryKey: "equipment",
      title: "عمليات الحفر الثقيل والنقل عالي السعة",
      description:
        "تشغيل حفارات هيدروليكية ثقيلة وشاحنات نقل صلبة في بيئات المناجم المفتوحة وفق أطر صيانة مجدولة لتقليل التوقفات.",
      capabilityName: "تأجير معدات التعدين واللوجستيات",
      capabilityLink: "/services/equipment-leasing",
      imageUrl:
        "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=85",
      altText: "آليات استخراج ثقيلة تعمل في واجهة منجم سطحي",
    },
    {
      id: "sc-site-dev",
      category: "تطوير المواقع",
      categoryKey: "site-dev",
      title: "مداخل المناجم والمصاطب والأعمال المدنية",
      description:
        "أعمال الهندسة المدنية الشاملة بما في ذلك إنشاء طرق النقل المجهزة، وقنوات تصريف المياه، وتسوية المصاطب وتثبيت القواعد.",
      capabilityName: "إدارة مشاريع التعدين المتكاملة",
      capabilityLink: "/services/mining-project-management",
      imageUrl:
        "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=85",
      altText: "طرق نقل تعدينية مجهزة وأعمال تطوير المصاطب المدنية",
    },
    {
      id: "sc-processing",
      category: "المعالجة والبنية التحتية",
      categoryKey: "processing",
      title: "تركيب وحدات التكسير والغربلة المتنقلة",
      description:
        "تجميع وتركيب وتشغيل وحدات التكسير الأولي والغربلة متعددة الطوابق المخصصة لتصنيف الخامات وإعداد التغذية المباشرة بالموقع.",
      capabilityName: "إدارة مشاريع التعدين المتكاملة",
      capabilityLink: "/services/mining-project-management",
      imageUrl:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85",
      altText: "بنية تحتية لمحطة تكسير وتصنيف المعادن بالموقع",
    },
    {
      id: "sc-commodities",
      category: "السلع واللوجستيات",
      categoryKey: "commodities",
      title: "نقل المواد السائبة والشحن متعدد الوسائط",
      description:
        "نقل الخامات مع الالتزام بسلسلة العهدة، ومناولة محطات التصدير، ولوجستيات الشحن البحري الخاضعة لقواعد Incoterms الدولية.",
      capabilityName: "تداول السلع المعدنية والهيدروكربونية",
      capabilityLink: "/services/commodities-trading",
      imageUrl:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
      altText: "محطة تصدير لوجستية لمناولة الخامات ونقل البضائع السائبة",
    },
    {
      id: "sc-energy",
      category: "عمليات الطاقة والهيدروكربونات",
      categoryKey: "energy",
      title: "مناولة المشتقات النفطية الصناعية المتخصصة",
      description:
        "ترتيب معالجة وتسويق المشتقات الهيدروكربونية—بما في ذلك زيت الوقود، وزيت الأفران، وHFO، وMHO—بالتعاون مع منشآت معتمدة.",
      capabilityName: "تداول السلع المعدنية والهيدروكربونية",
      capabilityLink: "/services/commodities-trading",
      imageUrl:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
      altText: "منشآت معالجة وتخزين المشتقات الهيدروكربونية الصناعية",
    },
  ],
  cta: {
    headline: "هل أنت مستعد للشراكة في مشروعك التعديني أو الطاقوي القادم؟",
    subtext:
      "تواصل مع القيادة التشغيلية لبحث سبل توظيف قدرات هلفول المتكاملة لتلبية متطلبات مشروعك.",
    primaryText: "طلب مقترح تشغيلي",
    secondaryText: "استكشف القدرات",
  },
};
