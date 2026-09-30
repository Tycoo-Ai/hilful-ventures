export interface CapabilityDetail {
  id: string;
  number: string;
  title: string;
  slug: string;
  tagline: string;
  overview: string;
  scopeList: string[];
  operationalParameters: {
    label: string;
    value: string;
  }[];
  deliverables: string[];
  byproductNote?: string;
}

export interface ServicesContent {
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    description: string;
  };
  overview: {
    sectionTag: string;
    headline: string;
    subtext: string;
    capabilities: {
      number: string;
      title: string;
      summary: string;
      slug: string;
      keyFocus: string;
    }[];
  };
  capabilities: CapabilityDetail[];
  cta: {
    headline: string;
    subtext: string;
    primaryCta: { text: string; href: string };
    secondaryCta: { text: string; href: string };
  };
}

export const servicesContentEn: ServicesContent = {
  hero: {
    eyebrow: "CORE CAPABILITIES",
    headline: "INTEGRATED MINING & ENERGY SOLUTIONS",
    subheadline: "FOUR SPECIALIZED DIVISIONS. ONE UNIFIED OPERATIONAL STANDARD.",
    description:
      "Hilful Ventures Pvt Ltd delivers disciplined industrial solutions across the extractive lifecycle—from early geological exploration and heavy machinery leasing to turnkey project management and physical commodities trading.",
  },
  overview: {
    sectionTag: "OPERATIONAL ARCHITECTURE",
    headline: "Four Pillars of Industrial Delivery.",
    subtext:
      "Our capability model unifies technical subsurface evaluation, capital equipment mobilization, site construction, and commercial export logistics.",
    capabilities: [
      {
        number: "01",
        title: "Minerals & Oil Exploration & Prospecting",
        summary:
          "Targeted surface and subsurface investigations to evaluate mineral occurrences, structural geology, and hydrocarbon potential under recognized international reporting frameworks.",
        slug: "/services/exploration-prospecting",
        keyFocus: "Geological Mapping & Subsurface Evaluation",
      },
      {
        number: "02",
        title: "Mining Equipment Leasing & Fleet Logistics",
        summary:
          "High-capacity mining machinery deployment under structured wet or dry lease models, backed by telematics monitoring and preventative mechanical support.",
        slug: "/services/equipment-leasing",
        keyFocus: "Heavy Earthmoving & Extraction Fleet",
      },
      {
        number: "03",
        title: "Turnkey Mining Project Management",
        summary:
          "Full-lifecycle execution covering pre-feasibility analysis, mine planning, site infrastructure setup, processing plant installation, and extraction management.",
        slug: "/services/mining-project-management",
        keyFocus: "Infrastructure & Operational Oversight",
      },
      {
        number: "04",
        title: "Mineral & Hydrocarbon Commodities Trading",
        summary:
          "Structured procurement, quality verification, and logistics execution under Incoterms for raw minerals and industrial hydrocarbon byproduct streams.",
        slug: "/services/commodities-trading",
        keyFocus: "Physical Supply Chain & Incoterms Execution",
      },
    ],
  },
  capabilities: [
    {
      id: "exploration",
      number: "01",
      title: "Minerals & Oil Exploration & Prospecting",
      slug: "/services/exploration-prospecting",
      tagline: "Subsurface Reconnaissance & Deposit Characterization",
      overview:
        "Hilful Ventures provides disciplined exploration and prospecting capabilities designed to assess geological formations and identify commercial resource potential. Our technical evaluation framework applies systematic surface reconnaissance, subsurface geophysical interpretation, and target drilling to build verified deposit models.",
      scopeList: [
        "Geological mapping",
        "Geochemical sampling",
        "Geophysical surveys",
        "Exploratory core drilling",
        "Mineral reserve estimation",
        "JORC / NI 43-101 frameworks",
      ],
      operationalParameters: [
        { label: "Investigation Methodologies", value: "Geological, Geochemical & Geophysical" },
        { label: "Sampling Standard", value: "Exploratory Diamond Core & Channel Sampling" },
        { label: "Reporting Frameworks", value: "Aligned with JORC Code & NI 43-101 Guidelines" },
        { label: "Evaluation Scope", value: "Pre-Feasibility & Reserve Potential Modeling" },
      ],
      deliverables: [
        "Stratigraphic and structural geological field maps",
        "Geochemical assay grids and anomaly delineations",
        "Subsurface geophysical profile datasets",
        "Core drill logs, recovery records, and lithological sections",
        "Resource volume calculations and reserve potential estimates",
      ],
    },
    {
      id: "equipment",
      number: "02",
      title: "Mining Equipment Leasing & Fleet Logistics",
      slug: "/services/equipment-leasing",
      tagline: "High-Availability Machinery & Fleet Maintenance",
      overview:
        "We provide structured heavy machinery leasing designed to ensure high operational uptime in demanding extraction environments. Our deployment model pairs high-capacity earthmoving, drilling, and processing units with structured maintenance protocols and rapid logistics support.",
      scopeList: [
        "Excavators",
        "Haul trucks",
        "Wheel loaders",
        "Dozers",
        "Drill rigs",
        "Mobile crushing / screening",
      ],
      operationalParameters: [
        { label: "Contractual Models", value: "Wet Lease (With Operators) / Dry Lease (Equipment Only)" },
        { label: "Maintenance Framework", value: "Scheduled Preventative Service & OEM Protocols" },
        { label: "Technical Support", value: "On-Site Mechanical Support & Field Mechanics" },
        { label: "Fleet Oversight", value: "Asset Telematics & Utilization Tracking" },
      ],
      deliverables: [
        "Customized fleet lease agreements (short-term, seasonal, multi-year)",
        "Equipment mobilization and site commissioning logistics",
        "Scheduled servicing regimens and genuine wear-parts supply",
        "Equipment operating logs, fuel telemetry, and uptime documentation",
      ],
    },
    {
      id: "project-management",
      number: "03",
      title: "Turnkey Mining Project Management",
      slug: "/services/mining-project-management",
      tagline: "Integrated Mine Development & Production Oversight",
      overview:
        "Hilful Ventures delivers end-to-end operational project management for surface mining and extraction developments. By integrating planning, permitting, civil engineering, and daily extraction oversight, we provide project owners with single-point operational accountability.",
      scopeList: [
        "Pre-feasibility",
        "Mine planning",
        "Permitting",
        "Site civil works",
        "Infrastructure",
        "Processing plant setup",
        "Extraction management",
        "Production optimization",
      ],
      operationalParameters: [
        { label: "Development Stages", value: "Pre-Feasibility Through Active Production" },
        { label: "Civil Infrastructure", value: "Haul Roads, Drainage, Bench Preparation & Yards" },
        { label: "Plant Integration", value: "Primary Sizing, Crushing & Screening Plant Setup" },
        { label: "Operational Model", value: "Comprehensive Turnkey Site Management" },
      ],
      deliverables: [
        "Mine development schedules and extraction sequence plans",
        "Regulatory permit coordination and statutory compliance documentation",
        "Completed site earthworks, drainage channels, and access infrastructure",
        "Assembled and commissioned mobile crushing and screening units",
        "Daily extraction monitoring, shift logs, and production optimization reports",
      ],
    },
    {
      id: "commodities",
      number: "04",
      title: "Mineral & Hydrocarbon Commodities Trading",
      slug: "/services/commodities-trading",
      tagline: "Physical Supply Chain & Byproduct Off-Take Execution",
      overview:
        "Our physical trading division connects resource producers with regional and international industrial markets. We execute disciplined procurement, quality verification, logistics management, and structured commercial contracting governed by standard Incoterms.",
      scopeList: [
        "Procurement",
        "Quality verification",
        "Logistics",
        "Incoterms",
      ],
      operationalParameters: [
        { label: "Trading Disciplines", value: "Procurement, Quality Verification & Logistics" },
        { label: "Commercial Terms", value: "FOB, CIF, CFR Governed by Standard Incoterms" },
        { label: "Quality Standards", value: "Quality Verification & Batch Inspection Protocols" },
        { label: "Delivery Framework", value: "Incoterms-Governed Shipping & Logistics" },
      ],
      deliverables: [
        "Commercial off-take agreements and supply contracts",
        "Quality verification and specification inspection documentation",
        "Bills of Lading, export documentation, and customs compliance filings",
        "Scheduled logistics coordination and delivery documentation",
      ],
      byproductNote:
        "Hilful arranges the processing and extraction of oil byproducts, including Fuel Oil (FO), Furnace Oil, Heavy Furnace Oil (HFO), and Mixed Hydrocarbon Oil (MHO), in partnership with established processing facilities.",
    },
  ],
  cta: {
    headline: "Ready to Partner on Your Next Mining or Energy Venture?",
    subtext:
      "Consult with our engineering and commercial teams to discuss technical exploration, machinery leasing terms, or turnkey project execution.",
    primaryCta: { text: "Request an Operational Proposal", href: "/contact" },
    secondaryCta: { text: "Contact Hilful", href: "/contact" },
  },
};

export const servicesContentAr: ServicesContent = {
  hero: {
    eyebrow: "القدرات الأساسية",
    headline: "حلول متكاملة لقطاعي التعدين والطاقة",
    subheadline: "أربعة قطاعات متخصصة. معيار تشغيلي موحد.",
    description:
      "تقدم شركة هلفول فنتشرز المحدودة حلولاً صناعية منضبطة عبر دورة حياة الموارد—من الاستكشاف الجيولوجي المبكر وتأجير الآليات الثقيلة، إلى إدارة المشاريع المتكاملة وتداول السلع المادية.",
  },
  overview: {
    sectionTag: "الهيكلية التشغيلية",
    headline: "أربعة ركائز للتنفيذ الصناعي.",
    subtext:
      "يوحد نموذج قدراتنا التقييم الفني لباطن الأرض، وحشد المعدات الرأسمالية، وأعمال التشييد الميداني، ولوجستيات التصدير التجاري.",
    capabilities: [
      {
        number: "01",
        title: "استكشاف وتنقيب المعادن والنفط",
        summary:
          "استكشافات سطحية وجوفية مستهدفة لتقييم التواجدات التعدينية، والجيولوجيا الهيكلية، والإمكانات الهيدروكربونية وفق أطر إعداد التقارير الدولية المعتمدة.",
        slug: "/services/exploration-prospecting",
        keyFocus: "المسح الجيولوجي وتقييم باطن الأرض",
      },
      {
        number: "02",
        title: "تأجير معدات التعدين واللوجستيات",
        summary:
          "نشر آليات التعدين الثقيلة عالية الجاهزية وفق نماذج تأجير رطبة وجافة منظمة، مدعومة بمراقبة التيليماتكس والصيانة الميكانيكية الوقائية.",
        slug: "/services/equipment-leasing",
        keyFocus: "أسطول الحفر وحركة التربة الثقيلة",
      },
      {
        number: "03",
        title: "إدارة مشاريع التعدين المتكاملة",
        summary:
          "تنفيذ شامل لدورة حياة المشروع يغطي دراسات الجدوى الأولية، وتخطيط المناجم، وتجهيز البنية التحتية للمواقع، وتركيب محطات المعالجة، وإدارة الاستخراج.",
        slug: "/services/mining-project-management",
        keyFocus: "البنية التحتية والإشراف الميداني",
      },
      {
        number: "04",
        title: "تداول السلع المعدنية والهيدروكربونية",
        summary:
          "شراء منظم، وتحقق دقيق من الجودة، وإدارة اللوجستيات وتصدير المعادن الخام ومشتقات الزيوت الصناعية وفق قواعد Incoterms.",
        slug: "/services/commodities-trading",
        keyFocus: "سلاسل الإمداد المادية وعقود Incoterms",
      },
    ],
  },
  capabilities: [
    {
      id: "exploration",
      number: "01",
      title: "استكشاف وتنقيب المعادن والنفط",
      slug: "/services/exploration-prospecting",
      tagline: "الاستطلاع الجيولوجي وتوصيف الرواسب",
      overview:
        "توفر هلفول فنتشرز قدرات استكشاف وتنقيب منضبطة تهدف إلى تقييم التكوينات الجيولوجية وتحديد الإمكانات التجارية للموارد. يطبق إطار التقييم الفني لدينا استطلاعاً سطحياً منهجياً، وتحليلاً جيوفيزيائياً لباطن الأرض، وحفراً استكشافياً لبناء نماذج رواسب موثوقة.",
      scopeList: [
        "المسح الجيولوجي",
        "أخذ العينات الجيوكيميائية",
        "المسوح الجيوفيزيائية",
        "حفر اللباب الاستكشافي",
        "تقدير الاحتياطيات المعدنية",
        "أطر JORC / NI 43-101",
      ],
      operationalParameters: [
        { label: "منهجيات التحقق", value: "مسوحات جيولوجية وجيوكيميائية وجيوفيزيائية" },
        { label: "معايير العينات", value: "حفر لبابي ماسي استكشافي وأخذ عينات القنوات" },
        { label: "أطر التقارير", value: "متوافقة مع إرشادات كود JORC ومعيار NI 43-101" },
        { label: "نطاق التقييم", value: "دراسات الجدوى الأولية ونمذجة الاحتياطيات المحتملة" },
      ],
      deliverables: [
        "خرائط ميدانية للطبقات الجيولوجية والتركيبات الهيكلية",
        "شبكات التحليل الجيوكيميائي وتحديد مناطق الشذوذ",
        "بيانات المسوحات والملفات الجيوفيزيائية لباطن الأرض",
        "سجلات الحفر اللبابي وبيانات الاستخلاص والمقاطع الصخرية",
        "حسابات حجوم الموارد وتقديرات الاحتياطيات المحتملة",
      ],
    },
    {
      id: "equipment",
      number: "02",
      title: "تأجير معدات التعدين واللوجستيات",
      slug: "/services/equipment-leasing",
      tagline: "آليات عالية الجاهزية وصيانة دورية للأسطول",
      overview:
        "نوفر حلول تأجير مهيكلة للآليات الثقيلة تضمن أعلى درجات الاستمرارية التشغيلية في بيئات الاستخراج الصعبة. يجمع نموذج النشر لدينا بين وحدات حفر ونقل ومعالجة متطورة وبرامج صيانة وقائية منتظمة ودعم لوجستي سريع.",
      scopeList: [
        "الحفارات",
        "شاحنات النقل",
        "الجرافات (اللوادر)",
        "البلدوزرات",
        "حفارات الآبار",
        "معدات التكسير / الغربلة المتنقلة",
      ],
      operationalParameters: [
        { label: "نماذج التعاقد", value: "تأجير رطب (مع المشغلين) / تأجير جاف (المعدات فقط)" },
        { label: "إطار الصيانة", value: "صيانة وقائية مجدولة وبروتوكولات الشركات المصنعة" },
        { label: "الدعم الفني", value: "دعم ميكانيكي ميداني وفنيون متخصصون بالموقع" },
        { label: "مراقبة الأسطول", value: "أنظمة التيليماتكس وتتبع معدلات الاستخدام" },
      ],
      deliverables: [
        "عقود تأجير أساطيل مخصصة (قصيرة الأجل، موسمية، متعددة السنوات)",
        "لوجستيات حشد المعدات والتشغيل التجريبي بالموقع",
        "جداول صيانة دورية وتوريد قطع الغيار الاستهلاكية الأصلية",
        "سجلات تشغيل المعدات، قياسات الوقود، وتوثيق ساعات الجاهزية",
      ],
    },
    {
      id: "project-management",
      number: "03",
      title: "إدارة مشاريع التعدين المتكاملة",
      slug: "/services/mining-project-management",
      tagline: "تطوير شامل للمناجم وإشراف تشغيلي على الإنتاج",
      overview:
        "تقدم هلفول فنتشرز إدارة متكاملة لمشاريع التعدين السطحي والاستخراج. ومن خلال دمج التخطيط وإجراءات التراخيص والأعمال الهندسية المدنية والإشراف اليومي على عمليات الاستخراج، نوفر لمالكي المشاريع مسؤولية تشغيلية موحدة.",
      scopeList: [
        "دراسات الجدوى الأولية",
        "تخطيط المناجم",
        "مسارات التراخيص",
        "الأعمال المدنية بالموقع",
        "البنية التحتية",
        "تجهيز محطات المعالجة",
        "إدارة الاستخراج",
        "تحسين الإنتاج",
      ],
      operationalParameters: [
        { label: "مراحل التطوير", value: "من دراسات الجدوى الأولية حتى الإنتاج الفعلي" },
        { label: "البنية التحتية المدنية", value: "طرق النقل، قنوات التصريف، وإعداد مصاطب العمل" },
        { label: "منشآت المعالجة", value: "تجهيز وحدات التكسير والتصنيف الأولية" },
        { label: "النموذج التشغيلي", value: "إدارة متكاملة وشاملة للموقع" },
      ],
      deliverables: [
        "جداول تطوير المناجم وخطط تسلسل الاستخراج الميداني",
        "تنسيق تراخيص العمل وتوثيق الامتثال للاشتراطات الرسمية",
        "إنجاز الأعمال الترابية بالموقع وشبكات التصريف وطرق الوصول",
        "تركيب وتشغيل وحدات التكسير والغربلة المتنقلة",
        "مراقبة يومية للاستخراج، وسجلات ورديات العمل، وتقارير تحسين الإنتاج",
      ],
    },
    {
      id: "commodities",
      number: "04",
      title: "تداول السلع المعدنية والهيدروكربونية",
      slug: "/services/commodities-trading",
      tagline: "سلاسل التوريد المادية وتنفيذ عقود المشتقات النفطية",
      overview:
        "يربط قسم التداول المادي لدينا منتجي الموارد بالأسواق الصناعية الإقليمية والدولية. وننفذ عمليات شراء منضبطة، وتحققاً دقيقاً من الجودة، وإدارة لوجستية، وتعاقدات تجارية منظمة تخضع لقواعد Incoterms الدولية.",
      scopeList: [
        "الشراء والتوريد",
        "التحقق من الجودة",
        "اللوجستيات",
        "قواعد Incoterms",
      ],
      operationalParameters: [
        { label: "أنشطة التداول", value: "الشراء، التحقق من الجودة، وإدارة اللوجستيات" },
        { label: "الشروط التجارية", value: "FOB وCIF وCFR الخاضعة لمعايير Incoterms" },
        { label: "معايير الجودة", value: "التحقق من المواصفات وفحص الشحنات المعتمد" },
        { label: "إطار التسليم", value: "شحن ولوجستيات تخضع لقواعد Incoterms" },
      ],
      deliverables: [
        "اتفاقيات شراء وعقود توريد تجارية مهيكلة",
        "وثائق التحقق من الجودة والمواصفات الفنية المعتمدة",
        "بوالص الشحن ووثائق التصدير والمعاملات الجمركية",
        "جداول التنسيق اللوجستي ووثائق التسليم المعتمدة",
      ],
      byproductNote:
        "تقوم هلفول بترتيب معالجة واستخراج المشتقات النفطية، بما في ذلك زيت الوقود (FO)، وزيت الأفران، وزيت الأفران الثقيل (HFO)، والزيوت الهيدروكربونية المختلطة (MHO)، وذلك بالتعاون والشراكة مع منشآت معالجة معتمدة.",
    },
  ],
  cta: {
    headline: "هل أنت مستعد للشراكة في مشروعك التعديني أو الطاقوي القادم؟",
    subtext:
      "استشر فرقنا الهندسية والتجارية لمناقشة الاستكشاف الفني، أو شروط تأجير الآليات، أو التنفيذ الميداني للمشاريع.",
    primaryCta: { text: "تقديم طلب عرض تشغيلي", href: "/contact" },
    secondaryCta: { text: "اتصل بهلفول", href: "/contact" },
  },
};
