export interface GalleryImageItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: "EXPLORATION" | "EQUIPMENT" | "MINING" | "INFRASTRUCTURE" | "ENERGY" | "LOGISTICS";
  aspectRatio: "featured" | "landscape" | "portrait" | "wide";
  caption: string;
  technicalMetadata: string;
}

export interface GalleryPageContent {
  hero: {
    eyebrow: string;
    headline: string;
    subtext: string;
    disclaimer: string;
  };
  filters: {
    key: string;
    label: string;
  }[];
  items: GalleryImageItem[];
  cta: {
    headline: string;
    subtext: string;
    primaryText: string;
    secondaryText: string;
  };
}

export const galleryContentEn: GalleryPageContent = {
  hero: {
    eyebrow: "INDUSTRIAL GALLERY",
    headline: "INDUSTRY. EQUIPMENT. OPERATIONS.",
    subtext:
      "A photographic representation of the heavy industrial disciplines, mining environments, capital machinery, and infrastructure projects relevant to Hilful's integrated capability portfolio.",
    disclaimer:
      "All imagery displayed represents generalized industrial reference environments, equipment classes, and infrastructure disciplines. Photographic materials are curated for visual context and do not represent proprietary Hilful mine sites or historical client operations.",
  },
  filters: [
    { key: "ALL", label: "ALL SECTORS" },
    { key: "EXPLORATION", label: "EXPLORATION" },
    { key: "EQUIPMENT", label: "EQUIPMENT" },
    { key: "MINING", label: "MINING" },
    { key: "INFRASTRUCTURE", label: "INFRASTRUCTURE" },
    { key: "ENERGY", label: "ENERGY" },
    { key: "LOGISTICS", label: "LOGISTICS" },
  ],
  items: [
    {
      id: "gal-01",
      src: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=85",
      alt: "Open-pit extraction benches and haulage ramp network",
      title: "Open-Bench Extraction Topography",
      category: "MINING",
      aspectRatio: "featured",
      caption: "Multi-tiered open-pit extraction benches with engineered access haul roads.",
      technicalMetadata: "SURFACE EXTRACTION · BENCH FORMATION",
    },
    {
      id: "gal-02",
      src: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=85",
      alt: "Heavy hydraulic excavator loading fractured ore into haul truck",
      title: "Heavy Hydraulic Face Excavator",
      category: "EQUIPMENT",
      aspectRatio: "landscape",
      caption: "High-capacity production excavator loading blasted rock on active mining bench.",
      technicalMetadata: "CAPITAL MACHINERY · WET/DRY LEASING",
    },
    {
      id: "gal-03",
      src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
      alt: "Geological stratigraphic assessment in rugged mountain terrain",
      title: "Frontier Lithological Mapping",
      category: "EXPLORATION",
      aspectRatio: "portrait",
      caption: "Surface lithological reconnaissance and structural anomaly evaluation.",
      technicalMetadata: "GEOLOGICAL SURVEY · RECONNAISSANCE",
    },
    {
      id: "gal-04",
      src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=85",
      alt: "Off-highway heavy mining haul truck ascending bench ramp",
      title: "Off-Highway Heavy Haulage",
      category: "EQUIPMENT",
      aspectRatio: "portrait",
      caption: "Heavy haulage cycle transporting bulk overburden to designated dump areas.",
      technicalMetadata: "FLEET LOGISTICS · HIGH-AVAILABILITY",
    },
    {
      id: "gal-05",
      src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=85",
      alt: "Primary crushing and screening aggregate processing plant setup",
      title: "Primary Crushing & Screening Circuit",
      category: "INFRASTRUCTURE",
      aspectRatio: "wide",
      caption: "Track-mounted mobile crushing circuit preparing sized feed for processing.",
      technicalMetadata: "CIVIL INFRASTRUCTURE · PLANT ASSEMBLY",
    },
    {
      id: "gal-06",
      src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
      alt: "Surface rotary blast-hole drilling rig positioned on bench",
      title: "Production Blast-Hole Penetration",
      category: "MINING",
      aspectRatio: "landscape",
      caption: "Rotary drill rig establishing pre-split blast patterns in hard-rock strata.",
      technicalMetadata: "DRILL & BLAST · STRATIGRAPHIC CORING",
    },
    {
      id: "gal-07",
      src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85",
      alt: "Bulk commodities marine export terminal and conveyor systems",
      title: "Bulk Marine Export Terminal",
      category: "LOGISTICS",
      aspectRatio: "wide",
      caption: "Multi-modal export logistics infrastructure handling raw mineral commodities.",
      technicalMetadata: "INCOTERMS EXECUTION · FREIGHT MANAGEMENT",
    },
    {
      id: "gal-08",
      src: "https://images.unsplash.com/photo-1579781354186-012d7e850ad7?auto=format&fit=crop&w=1200&q=85",
      alt: "Front-end wheel loader transferring crushed material at stockyard",
      title: "High-Capacity Stockpile Rehandling",
      category: "EQUIPMENT",
      aspectRatio: "landscape",
      caption: "Wheel loader handling bulk aggregates and intermediate plant feed material.",
      technicalMetadata: "MATERIAL HANDLING · YARD LOGISTICS",
    },
    {
      id: "gal-09",
      src: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=85",
      alt: "Track-type bulldozer leveling civil access road on project site",
      title: "Access Road Earthmoving & Grading",
      category: "INFRASTRUCTURE",
      aspectRatio: "portrait",
      caption: "Track bulldozer forming stable haulage roadbed and drainage corridors.",
      technicalMetadata: "SITE CIVIL WORKS · ROADBED PREPARATION",
    },
    {
      id: "gal-10",
      src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
      alt: "Industrial energy infrastructure and hydrocarbon transfer facilities",
      title: "Industrial Hydrocarbon Off-Take Systems",
      category: "ENERGY",
      aspectRatio: "landscape",
      caption: "Specialized oil byproduct logistics and transfer storage arrangements.",
      technicalMetadata: "HYDROCARBON BYPRODUCTS · FACILITY LOGISTICS",
    },
  ],
  cta: {
    headline: "Ready to Partner on Your Next Mining or Energy Venture?",
    subtext:
      "Connect with our technical and commercial team to discuss operational specifications, fleet leasing, or turnkey project execution.",
    primaryText: "Request an Operational Proposal",
    secondaryText: "View Capabilities",
  },
};

export const galleryContentAr: GalleryPageContent = {
  hero: {
    eyebrow: "المعرض الصناعي",
    headline: "الصناعة. المعدات. العمليات.",
    subtext:
      "توثيق بصري للقطاعات الصناعية الثقيلة، وبيئات التعدين الميدانية، والآليات الرأسمالية، ومشاريع البنية التحتية المتوافقة مع محفظة قدرات شركة هلفول.",
    disclaimer:
      "تمثل كافة الصور المعروضة بيئات وسياقات صناعية عامة وفئات معدات وبنى تحتية نموذجية. وقد تم اختيار هذه المواد البصرية لتوضيح طبيعة العمليات ولا تمثل مواقع تعدينية مملوكة لهلفول أو عمليات سابقة لعملاء بعينهم.",
  },
  filters: [
    { key: "ALL", label: "كافة القطاعات" },
    { key: "EXPLORATION", label: "الاستكشاف" },
    { key: "EQUIPMENT", label: "المعدات" },
    { key: "MINING", label: "التعدين" },
    { key: "INFRASTRUCTURE", label: "البنية التحتية" },
    { key: "ENERGY", label: "الطاقة" },
    { key: "LOGISTICS", label: "اللوجستيات" },
  ],
  items: [
    {
      id: "gal-01",
      src: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=85",
      alt: "مصاطب استخراج مفتوحة وشبكة طرق نقل مجهزة",
      title: "طبوغرافيا الاستخراج السطحي بالمناجم",
      category: "MINING",
      aspectRatio: "featured",
      caption: "مصاطب استخراج متعددة المستويات في منجم مفتوح مع طرق نقل مهندسة.",
      technicalMetadata: "الاستخراج السطحي · إعداد المصاطب",
    },
    {
      id: "gal-02",
      src: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=85",
      alt: "حفارة هيدروليكية ثقيلة تحمل الصخور المكسورة في شاحنة نقل",
      title: "حفارة هيدروليكية ثقيلة لواجهات العمل",
      category: "EQUIPMENT",
      aspectRatio: "landscape",
      caption: "حفارة إنتاجية عالية السعة تقوم بتحميل الصخور المستخرجة على مصطبة العمل.",
      technicalMetadata: "آليات رأسمالية · تأجير رطب وجاف",
    },
    {
      id: "gal-03",
      src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
      alt: "تقييم الطبقات الجيولوجية في تضاريس جبلية وعرة",
      title: "المسح الجيولوجي الميداني للطبقات",
      category: "EXPLORATION",
      aspectRatio: "portrait",
      caption: "استطلاع صخري سطحي وتقييم المؤشرات الهيكلية في بيئات العمل الحدودية.",
      technicalMetadata: "مسح جيولوجي · استطلاع استكشافي",
    },
    {
      id: "gal-04",
      src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=85",
      alt: "شاحنة نقل تعدينية ثقيلة تصعد منحدر المصطبة",
      title: "شاحنات النقل الثقيل للمسارات الوعرة",
      category: "EQUIPMENT",
      aspectRatio: "portrait",
      caption: "دورات نقل متواصلة لنقل الصخور السطحية إلى مناطق التفريغ المحددة.",
      technicalMetadata: "لوجستيات الأسطول · جاهزية تشغيلية",
    },
    {
      id: "gal-05",
      src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=85",
      alt: "محطة تكسير وغربلة أولية لمعالجة الركام المعدني",
      title: "منظومة التكسير والتصنيف الأولية",
      category: "INFRASTRUCTURE",
      aspectRatio: "wide",
      caption: "وحدة تكسير متنقلة على مسارات مجنزرة لتجهيز التغذية الحجمية المباشرة.",
      technicalMetadata: "بنية تحتية مدنية · تركيب المحطات",
    },
    {
      id: "gal-06",
      src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
      alt: "حفارة آبار دورانية سطحية متمركزة على مصطبة الحفر",
      title: "حفر الآبار والأنماط التفجيرية الإنتاجية",
      category: "MINING",
      aspectRatio: "landscape",
      caption: "حفارة دورانية لإعداد أنماط التفجير المسبق في الطبقات الصخرية الصلبة.",
      technicalMetadata: "الحفر والتفجير · أخذ العينات اللبابية",
    },
    {
      id: "gal-07",
      src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85",
      alt: "محطة تصدير بحري لمناولة الخامات السائبة وأنظمة السيور",
      title: "محطات التصدير البحري للسلع السائبة",
      category: "LOGISTICS",
      aspectRatio: "wide",
      caption: "بنية تحتية لوجستية متعددة الوسائط لمناولة وتصدير الخامات المعدنية الخام.",
      technicalMetadata: "تنفيذ عقود INCOTERMS · إدارة الشحن",
    },
    {
      id: "gal-08",
      src: "https://images.unsplash.com/photo-1579781354186-012d7e850ad7?auto=format&fit=crop&w=1200&q=85",
      alt: "لودر ذو عجلات ينقل المواد المكسورة في ساحة التخزين",
      title: "مناولة المواد السائبة بساحات التجميع",
      category: "EQUIPMENT",
      aspectRatio: "landscape",
      caption: "لودر ذو عجلات لنقل الركام وتغذية قواديس محطات المعالجة بالموقع.",
      technicalMetadata: "مناولة المواد · لوجستيات الساحات",
    },
    {
      id: "gal-09",
      src: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=85",
      alt: "بلدوزر مجنزر يقوم بتسوية طريق وصول مدني بموقع المشروع",
      title: "تسوية وتمهيد طرق الوصول التعدينية",
      category: "INFRASTRUCTURE",
      aspectRatio: "portrait",
      caption: "بلدوزر مجنزر يمهد طبقات الأساس لطرق النقل ويشكل قنوات تصريف المياه.",
      technicalMetadata: "أعمال مدنية بالموقع · تجهيز المسارات",
    },
    {
      id: "gal-10",
      src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
      alt: "منشآت بنية تحتية ومستودعات لتداول المشتقات الهيدروكربونية",
      title: "أنظمة تسويق وتداول المشتقات النفطية",
      category: "ENERGY",
      aspectRatio: "landscape",
      caption: "ترتيبات لوجستية وتخزينية لمعالجة وتداول مشتقات الزيوت الصناعية المتخصصة.",
      technicalMetadata: "المشتقات الهيدروكربونية · لوجستيات المنشآت",
    },
  ],
  cta: {
    headline: "هل أنت مستعد للشراكة في مشروعك التعديني أو الطاقوي القادم؟",
    subtext:
      "تواصل مع فريقنا الفني والتجاري لبحث المواصفات التشغيلية، أو تأجير الأسطول، أو تنفيذ المشاريع المتكاملة.",
    primaryText: "طلب مقترح تشغيلي",
    secondaryText: "استعرض كافة القدرات",
  },
};
