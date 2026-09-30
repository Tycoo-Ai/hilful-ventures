export interface EquipmentCategoryItem {
  id: string;
  name: string;
  category: string;
  number: string;
  description: string;
  operationalRole: string;
  imageUrl: string;
  altText: string;
}

export interface EquipmentLeaseModel {
  title: string;
  badge: string;
  summary: string;
  details: string[];
}

export interface EquipmentFleetPillar {
  title: string;
  description: string;
}

export interface EquipmentPageContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  overview: {
    heading: string;
    description: string[];
  };
  categoriesSection: {
    eyebrow: string;
    heading: string;
    subtext: string;
    items: EquipmentCategoryItem[];
  };
  leaseModelsSection: {
    eyebrow: string;
    heading: string;
    subtext: string;
    models: EquipmentLeaseModel[];
  };
  fleetCapabilitySection: {
    eyebrow: string;
    heading: string;
    subtext: string;
    pillars: EquipmentFleetPillar[];
  };
  cta: {
    headline: string;
    subtext: string;
    primaryText: string;
    secondaryText: string;
  };
}

export const equipmentContentEn: EquipmentPageContent = {
  hero: {
    eyebrow: "02 / EQUIPMENT & FLEET",
    title: "EQUIPMENT BUILT AROUND OPERATIONAL REQUIREMENTS",
    description:
      "Heavy mining and extraction machinery deployed under structured operating agreements to support site preparation, drilling, material handling, and ore extraction.",
    primaryCta: "Request an Operational Proposal",
    secondaryCta: "Explore Capabilities",
  },
  overview: {
    heading: "Tailored Fleet Deployment for Demanding Extraction Benches.",
    description: [
      "Hilful Ventures arranges capital mining machinery aligned with the specific terrain, material density, and extraction requirements of each project site.",
      "By pairing high-capacity machinery with disciplined operating models and preventative mechanical oversight, we ensure equipment is positioned to support continuous extraction cycles.",
    ],
  },
  categoriesSection: {
    eyebrow: "EQUIPMENT CATEGORIES",
    heading: "Source-Supported Fleet Classifications.",
    subtext: "Machinery classifications available for structured operational deployment:",
    items: [
      {
        id: "excavators",
        number: "01",
        name: "Excavators",
        category: "EXCAVATORS",
        description:
          "Earthmoving and excavation equipment supporting mining and site development requirements.",
        operationalRole:
          "High-capacity bench excavation, overburden removal, trenching, and haul truck loading.",
        imageUrl:
          "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=900&q=80",
        altText: "Heavy hydraulic excavator operating at extraction face",
      },
      {
        id: "haul-trucks",
        number: "02",
        name: "Haul Trucks",
        category: "HAUL TRUCKS",
        description:
          "Heavy-duty off-highway haulage units engineered for material transport across severe terrain and steep gradients.",
        operationalRole:
          "Continuous haulage cycles connecting active extraction faces with stockpiles, crushing plants, or waste dumps.",
        imageUrl:
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80",
        altText: "Off-highway heavy mining haul truck transporting bulk ore",
      },
      {
        id: "wheel-loaders",
        number: "03",
        name: "Wheel Loaders",
        category: "WHEEL LOADERS",
        description:
          "High-capacity front-end wheel loaders for bulk material handling, stockpile transfer, and plant feed.",
        operationalRole:
          "Rapid bucket loading for primary crusher hoppers, railhead transfers, and stockpile yard management.",
        imageUrl:
          "https://images.unsplash.com/photo-1579781354186-012d7e850ad7?auto=format&fit=crop&w=900&q=80",
        altText: "Industrial wheel loader at material handling yard",
      },
      {
        id: "dozers",
        number: "04",
        name: "Dozers",
        category: "DOZERS",
        description:
          "Heavy track-type tractors providing bench preparation, earthmoving, and haul road maintenance.",
        operationalRole:
          "Bench formation, site civil leveling, overburden push, and continuous haul road maintenance.",
        imageUrl:
          "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
        altText: "Heavy track bulldozer on mining haul road preparation",
      },
      {
        id: "drill-rigs",
        number: "05",
        name: "Drill Rigs",
        category: "DRILL RIGS",
        description:
          "Rotary and blast-hole drill rigs providing precision penetration across varying geological strata.",
        operationalRole:
          "Exploratory core sampling, pre-split drilling, and production blast-hole pattern development.",
        imageUrl:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
        altText: "Surface rotary blast-hole drilling rig on bench",
      },
      {
        id: "mobile-crushing",
        number: "06",
        name: "Mobile Crushing / Screening",
        category: "MOBILE CRUSHING / SCREENING",
        description:
          "Rapidly deployable track-mounted primary crushers and multi-deck screening units for on-site material sizing.",
        operationalRole:
          "Direct on-bench primary sizing, aggregate classification, and intermediate feed preparation.",
        imageUrl:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
        altText: "Mobile track crushing and aggregate screening plant",
      },
    ],
  },
  leaseModelsSection: {
    eyebrow: "OPERATING MODELS",
    heading: "Structured Equipment Lease Structures.",
    subtext:
      "Flexible engagement frameworks designed to accommodate distinct project operating requirements:",
    models: [
      {
        title: "WET LEASE",
        badge: "OPERATOR INCLUDED",
        summary: "Equipment with operators.",
        details: [
          "Machinery paired with trained operating personnel",
          "Operational adherence to site safety protocols",
          "Routine shift logs and daily pre-start inspections",
        ],
      },
      {
        title: "DRY LEASE",
        badge: "EQUIPMENT ONLY",
        summary: "Equipment only.",
        details: [
          "Direct machinery lease for integration with client operating crews",
          "Structured handover inspection and operating parameter baseline",
          "Flexible lease durations adapted to seasonal or project-based demands",
        ],
      },
      {
        title: "MECHANICAL SUPPORT",
        badge: "MAINTENANCE CONCEPT",
        summary: "Support concept from the source.",
        details: [
          "Scheduled servicing protocols and preventative maintenance",
          "On-site mechanical support and field mechanic deployment",
          "Management of essential wear parts and replacement consumables",
        ],
      },
    ],
  },
  fleetCapabilitySection: {
    eyebrow: "FLEET CAPABILITY",
    heading: "Broad Fleet Governance & Reliability Principles.",
    subtext:
      "Core operational concepts applied across Hilful's broader equipment deployment model:",
    pillars: [
      {
        title: "High-Availability Fleet",
        description:
          "Fleet maintenance frameworks prioritize machine readiness through structured preventative servicing regimens and regular mechanical condition checks.",
      },
      {
        title: "Asset Telematics",
        description:
          "Application of monitoring technologies to track machinery operating hours, fuel consumption trends, and equipment utilization across active shifts.",
      },
      {
        title: "Fleet Uptime",
        description:
          "Structured scheduling and maintenance support designed to reduce unscheduled mechanical downtime during demanding extraction campaigns.",
      },
    ],
  },
  cta: {
    headline: "Ready to Partner on Your Next Mining or Energy Venture?",
    subtext:
      "Consult with our equipment logistics team to specify fleet requirements, operating lease structures, or site mobilization schedules.",
    primaryText: "Request an Operational Proposal",
    secondaryText: "Explore Capabilities",
  },
};

export const equipmentContentAr: EquipmentPageContent = {
  hero: {
    eyebrow: "٠٢ / الأسطول والمعدات",
    title: "معدات مهيكلة وفق المتطلبات التشغيلية الميدانية",
    description:
      "آليات تعدين واستخراج ثقيلة يتم نشرها وفق عقود تشغيلية منظمة لدعم إعداد المواقع والحفر ومناولة المواد واستخراج الخامات.",
    primaryCta: "طلب مقترح تشغيلي",
    secondaryCta: "استكشف القدرات",
  },
  overview: {
    heading: "نشر مهيكل لأسطول الآليات في بيئات الاستخراج الصعبة.",
    description: [
      "ترتب شركة هلفول فنتشرز معدات التعدين الرأسمالية بما يتوافق مع طبيعة التضاريس، وكثافة المواد، والاحتياجات التشغيلية الخاصة بكل موقع مشروع.",
      "ومن خلال الجمع بين المعدات عالية السعة ونماذج التشغيل المنضبطة والإشراف الميكانيكي الوقائي، نضمن جاهزية المعدات لدعم دورات الاستخراج المستمرة.",
    ],
  },
  categoriesSection: {
    eyebrow: "تصنيفات المعدات",
    heading: "فئات الأسطول المعتمدة في وثائق العمل.",
    subtext: "تصنيفات الآليات المتوفرة للنشر التشغيلي المنظم:",
    items: [
      {
        id: "excavators",
        number: "٠١",
        name: "الحفارات الهيدروليكية",
        category: "EXCAVATORS",
        description:
          "معدات تحريك التربة والحفر الهيدروليكي التي تدعم متطلبات التعدين وتطوير المواقع.",
        operationalRole:
          "حفر المصاطب التعدينية، إزالة الصخور السطحية، حفر القنوات، وتحميل شاحنات النقل.",
        imageUrl:
          "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=900&q=80",
        altText: "حفارة هيدروليكية ثقيلة تعمل في واجهة الاستخراج التعديني",
      },
      {
        id: "haul-trucks",
        number: "٠٢",
        name: "شاحنات النقل الثقيلة",
        category: "HAUL TRUCKS",
        description:
          "وحدات نقل ثقيلة مخصصة للمسارات الوعرة والتضاريس القاسية والمنحدرات الشديدة.",
        operationalRole:
          "دورات نقل مستمرة تربط واجهات الاستخراج بالمخازن أو وحدات التكسير أو مناطق الردم.",
        imageUrl:
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80",
        altText: "شاحنة تعدين ثقيلة تنقل الخامات الصخرية في موقع التعدين",
      },
      {
        id: "wheel-loaders",
        number: "٠٣",
        name: "الجرافات (اللوادر)",
        category: "WHEEL LOADERS",
        description:
          "لوادر أمامية عالية السعة لمناولة المواد السائبة ونقل المخزون وتغذية منشآت المعالجة.",
        operationalRole:
          "تعبئة سريعة لقواديس الكسارات الأولية، ومناولة الخامات، وإدارة ساحات التجميع.",
        imageUrl:
          "https://images.unsplash.com/photo-1579781354186-012d7e850ad7?auto=format&fit=crop&w=900&q=80",
        altText: "لودر ذو عجلات في ساحة مناولة المواد التعدينية",
      },
      {
        id: "dozers",
        number: "٠٤",
        name: "البلدوزرات المجنزرة",
        category: "DOZERS",
        description:
          "جرارات مجنزرة ثقيلة لتجهيز مصاطب العمل وتحريك التربة وصيانة طرق النقل.",
        operationalRole:
          "إعداد المصاطب، تسوية الأراضي، دفع التربة الصخرية، والصيانة الدورية لطرق الوصول.",
        imageUrl:
          "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
        altText: "بلدوزر مجنزر ثقيل يجهز طرق النقل في منجم مفتوح",
      },
      {
        id: "drill-rigs",
        number: "٠٥",
        name: "حفارات الآبار واللباب",
        category: "DRILL RIGS",
        description:
          "حفارات دورانية وتفجيرية دقيقة للاختراق الصخري عبر مختلف الطبقات الجيولوجية.",
        operationalRole:
          "أخذ عينات اللباب الاستكشافي، حفر التفجير المسبق، وإعداد أنماط تفجير الإنتاج.",
        imageUrl:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
        altText: "حفارة آبار دورانية سطحية على مصطبة العمل",
      },
      {
        id: "mobile-crushing",
        number: "٠٦",
        name: "معدات التكسير والغربلة المتنقلة",
        category: "MOBILE CRUSHING / SCREENING",
        description:
          "وحدات تكسير أولية وغربلة متعددة الطوابق مجنزرة وقابلة للنشر السريع لتصنيف المواد بالموقع.",
        operationalRole:
          "التكسير الأولي المباشر بالمصطبة، وتصنيف الركام، وإعداد التغذية الوسيطة لمحطات المعالجة.",
        imageUrl:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
        altText: "محطة تكسير وغربلة متنقلة على مسارات مجنزرة بالموقع",
      },
    ],
  },
  leaseModelsSection: {
    eyebrow: "نماذج التعاقد",
    heading: "هياكل تأجير الآليات والمعدات.",
    subtext:
      "أطر تعاقدية مرنة مصممة لتلبية متطلبات التشغيل المتنوعة للمشاريع:",
    models: [
      {
        title: "تأجير رطب (WET LEASE)",
        badge: "شامل المشغلين",
        summary: "المعدات مع المشغلين.",
        details: [
          "توفير الآليات مصحوبة بمشغلين مؤهلين ومعتمدين",
          "الالتزام الصارم ببروتوكولات السلامة الميدانية للموقع",
          "سجلات ورديات دورية وفحوصات تشغيل يومية قبل بدء العمل",
        ],
      },
      {
        title: "تأجير جاف (DRY LEASE)",
        badge: "المعدات فقط",
        summary: "المعدات فقط دون مشغلين.",
        details: [
          "تأجير مباشر للآليات لدمجها مع أطقم التشغيل التابعة للعميل",
          "محاضر تسليم وفحص فني لتحديد الحالة التشغيلية الأولية",
          "مدد تأجير مرنة تتناسب مع المواسم أو مراحل المشروع",
        ],
      },
      {
        title: "الدعم الميكانيكي (MECHANICAL SUPPORT)",
        badge: "مفهوم الدعم الفني",
        summary: "مفهوم الدعم الميكانيكي المعتمد في الوثائق.",
        details: [
          "بروتوكولات صيانة وقائية منتظمة وفحوصات دورية مجدولة",
          "دعم ميكانيكي ميداني وفنيون متخصصون لمعالجة الأعطال",
          "إدارة قطع الغيار الاستهلاكية ومستلزمات الصيانة الأساسية",
        ],
      },
    ],
  },
  fleetCapabilitySection: {
    eyebrow: "جاهزية الأسطول",
    heading: "مبادئ إدارة وموثوقية الأسطول.",
    subtext:
      "المفاهيم التشغيلية المطبقة عبر نموذج نشر المعدات التابع لشركة هلفول:",
    pillars: [
      {
        title: "أسطول عالي الجاهزية",
        description:
          "تركز أطر صيانة الأسطول على تعظيم الاستعداد الميداني من خلال برامج صيانة وقائية منظمة وفحوصات دورية للحالة الميكانيكية.",
      },
      {
        title: "تيليماتكس الأصول",
        description:
          "تطبيق تقنيات المراقبة لتتبع ساعات تشغيل الآليات، ومعدلات استهلاك الوقود، وقياس كفاءة الاستخدام خلال ورديات العمل.",
      },
      {
        title: "استمرارية تشغيل الأسطول",
        description:
          "جداول صيانة ودعم فني منظمة تهدف إلى تقليل فترات التوقف الميكانيكي غير المجدولة في مواسم الاستخراج المكثف.",
      },
    ],
  },
  cta: {
    headline: "هل أنت مستعد للشراكة في مشروعك التعديني أو الطاقوي القادم؟",
    subtext:
      "تواصل مع فريق لوجستيات المعدات لدينا لتحديد مواصفات الأسطول، أو نماذج عقود التأجير، أو جداول الحشد الميداني.",
    primaryText: "طلب مقترح تشغيلي",
    secondaryText: "استكشف القدرات",
  },
};
