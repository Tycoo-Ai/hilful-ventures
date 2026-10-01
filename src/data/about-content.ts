export interface AboutContent {
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    description: string;
  };
  whoWeAre: {
    sectionTag: string;
    headline: string;
    paragraphs: string[];
    pillars: {
      number: string;
      title: string;
      description: string;
    }[];
  };
  operatingModel: {
    sectionTag: string;
    headline: string;
    subtext: string;
    stages: {
      step: string;
      title: string;
      description: string;
      scope: string[];
    }[];
  };
  advantage: {
    sectionTag: string;
    headline: string;
    subtext: string;
    principles: {
      number: string;
      title: string;
      description: string;
    }[];
  };
  hse: {
    sectionTag: string;
    headline: string;
    subtext: string;
    pillars: {
      title: string;
      description: string;
      points: string[];
    }[];
  };
  closingCta: {
    headline: string;
    subtext: string;
    primaryCta: { text: string; href: string };
    secondaryCta: { text: string; href: string };
  };
  portraitImage?: string;
  directors?: {
    id: string;
    name: string;
    role?: string;
    image: string;
  }[];
}

export const aboutContentEn: AboutContent = {
  portraitImage: "https://res.cloudinary.com/sbjkwjoj/image/upload/v1790858088/hilful/general/WhatsApp_Image_2026-10-01_at_10_58_52_AM_1790858088079.jpg",
  directors: [
    {
      id: "dir-2",
      name: "Ghazi Ali",
      role: "Executive Director",
      image: "https://res.cloudinary.com/sbjkwjoj/image/upload/v1790858088/hilful/general/WhatsApp_Image_2026-10-01_at_10_58_52_AM_1790858088079.jpg",
    },
    {
      id: "dir-1",
      name: "Navas",
      role: "Founder & Managing Director",
      image: "https://res.cloudinary.com/sbjkwjoj/image/upload/v1790858099/hilful/general/WhatsApp_Image_2026-09-19_at_11_47_19_AM_1790858099276.jpg",
    },
    {
      id: "dir-3",
      name: "ISOOOR KHAN",
      role: "Director of Operations",
      image: "https://res.cloudinary.com/sbjkwjoj/image/upload/v1790858105/hilful/general/WhatsApp_Image_2026-10-01_at_10_58_51_AM_1790858105877.jpg",
    },
  ],
  hero: {
    eyebrow: "ABOUT HILFUL",
    headline: "ENGINEERED FOR OPERATIONAL PRECISION. BUILT FOR CAPITAL EFFICIENCY.",
    subheadline: "AN INTEGRATED INDUSTRIAL MODEL FOR MINING AND ENERGY RESOURCES",
    description:
      "Hilful Ventures Pvt Ltd delivers structured technical and commercial capabilities across the extractive lifecycle—unifying exploration, heavy machinery logistics, turnkey project management, and physical commodities trade.",
  },
  whoWeAre: {
    sectionTag: "INSTITUTIONAL FOUNDATION",
    headline: "An Integrated Industrial Partner Across the Extractive Lifecycle.",
    paragraphs: [
      "Hilful Ventures Pvt Ltd is structured to bridge the operational gap between initial mineral and energy exploration and final commercial off-take. By integrating technical evaluation, heavy equipment supply, on-site project management, and physical commodities trading, we provide a unified operational architecture for resource projects.",
      "Our capability model is designed for capital efficiency and disciplined execution. Rather than managing fragmented contractors, Hilful aligns technical methodologies, equipment logistics, and site governance under a single operational standard.",
      "Operating across mineral exploration, hydrocarbon evaluation, specialized fleet leasing, turnkey mine infrastructure, and physical trading, Hilful supports project owners with practical execution capacity and structured commercial frameworks.",
    ],
    pillars: [
      {
        number: "01",
        title: "Subsurface Evaluation & Exploration",
        description:
          "Geological mapping, geochemical sampling, geophysical surveys, and exploratory core drilling evaluated under recognized JORC and NI 43-101 reporting standards.",
      },
      {
        number: "02",
        title: "Heavy Equipment Mobilization",
        description:
          "High-capacity mining fleet availability deployed under flexible wet or dry lease agreements, supported by scheduled preventative maintenance.",
      },
      {
        number: "03",
        title: "Turnkey Project Execution",
        description:
          "Full-lifecycle execution covering mine planning, permitting workflows, civil infrastructure setup, and process plant management.",
      },
      {
        number: "04",
        title: "Physical Commodities Trading",
        description:
          "Structured procurement, quality verification, logistics management, and Incoterms-governed export execution for mineral commodities and specialized hydrocarbon byproduct streams.",
      },
    ],
  },
  operatingModel: {
    sectionTag: "INTEGRATED CAPABILITY MODEL",
    headline: "The Hilful Capability Architecture.",
    subtext:
      "A structured representation of how Hilful connects technical evaluation, equipment deployment, site execution, and commercial off-take.",
    stages: [
      {
        step: "01",
        title: "Exploration",
        description:
          "Early-stage geological assessment, geophysical surveys, and exploratory core drilling to determine deposit characteristics and estimate mineral reserve potential.",
        scope: ["Geological Mapping", "Geochemical Sampling", "Geophysical Surveys", "Exploratory Drilling"],
      },
      {
        step: "02",
        title: "Equipment & Mobilization",
        description:
          "Deployment of high-availability heavy machinery configured for site requirements, backed by on-site mechanical support and telematics monitoring.",
        scope: ["Excavators & Haul Trucks", "Drill Rigs & Dozers", "Crushing & Screening", "Wet / Dry Leasing"],
      },
      {
        step: "03",
        title: "Project Execution",
        description:
          "Turnkey project delivery encompassing site civil works, access infrastructure, processing plant setup, and environmental baseline integration.",
        scope: ["Pre-Feasibility & Planning", "Site Civil Infrastructure", "Processing Setup", "Extraction Workflows"],
      },
      {
        step: "04",
        title: "Production / Supply Chain",
        description:
          "Disciplined extraction management and production optimization to maintain throughput, minimize downtime, and ensure ore recovery efficiency.",
        scope: ["Extraction Management", "Material Haulage", "Crushing & Sizing", "Quality Sampling"],
      },
      {
        step: "05",
        title: "Market Delivery",
        description:
          "Physical commodities procurement, quality verification, Incoterms-governed export logistics, and processing arrangements for industrial hydrocarbon byproducts.",
        scope: ["Procurement", "Quality Verification", "Logistics", "Incoterms"],
      },
    ],
  },
  advantage: {
    sectionTag: "INSTITUTIONAL PRINCIPLES",
    headline: "The Hilful Operational Advantage.",
    subtext:
      "Four core operating principles that guide our technical execution, commercial integrity, and resource management.",
    principles: [
      {
        number: "01",
        title: "Integrated Accountability",
        description:
          "Unifying technical evaluation, machinery deployment, and site execution under a single operational standard reduces contractor fragmentation, alignment delays, and interface friction across project stages.",
      },
      {
        number: "02",
        title: "HSE & Environmental Compliance",
        description:
          "Operational adherence to host-jurisdiction statutory requirements, site baseline standards, and strict workforce safety protocols embedded across every operational phase.",
      },
      {
        number: "03",
        title: "Asset Telematics & Fleet Uptime",
        description:
          "Continuous telematics oversight, scheduled preventative maintenance protocols, and dedicated on-site mechanical support maximize heavy equipment availability in remote environments.",
      },
      {
        number: "04",
        title: "Regulatory & Commercial Integrity",
        description:
          "Transparent commercial contracting, standardized Incoterms shipping protocols, structured quality verification, and adherence to legal frameworks ensure reliable partner relationships.",
      },
    ],
  },
  hse: {
    sectionTag: "SAFETY & REGULATORY GOVERNANCE",
    headline: "Workforce Safety & Site Standards.",
    subtext:
      "Structured adherence to occupational health and safety requirements, regulatory compliance, and operational standards across all project activities.",
    pillars: [
      {
        title: "Workforce Safety & Operational Protocol",
        description:
          "Maintaining structured operational protocols and site safety awareness to safeguard personnel and maintain disciplined operating conditions.",
        points: [
          "Implementation of verified site safety procedures and operational guidelines",
          "Operational safety awareness and equipment handling standards",
          "Site safety coordination aligned with applicable statutory requirements",
          "Continuous focus on workforce safety and disciplined operational routines",
        ],
      },
      {
        title: "Regulatory Compliance & Site Standards",
        description:
          "Conducting field exploration, extraction activities, equipment mobilization, and logistics in accordance with applicable regulatory and statutory frameworks.",
        points: [
          "Compliance with statutory mining and operational permit terms",
          "Adherence to established regional regulatory and environmental requirements",
          "Implementation of site operational standards across project areas",
          "Alignment with regulatory reporting and governance requirements",
        ],
      },
    ],
  },
  closingCta: {
    headline: "Ready to Partner on Your Next Mining or Energy Venture?",
    subtext:
      "Engage our technical and commercial teams to discuss exploration requirements, fleet leasing terms, or turnkey project execution.",
    primaryCta: { text: "Request an Operational Proposal", href: "/contact" },
    secondaryCta: { text: "Explore Our Capabilities", href: "/services" },
  },
};

export const aboutContentAr: AboutContent = {
  portraitImage: "https://res.cloudinary.com/sbjkwjoj/image/upload/v1790765148/hilful/general/458241330865178129_1790765146572.jpg",
  directors: [
    {
      id: "dir-1",
      name: "نافاس",
      role: "المؤسس والعضو المنتدب",
      image: "https://res.cloudinary.com/sbjkwjoj/image/upload/v1790765148/hilful/general/458241330865178129_1790765146572.jpg",
    },
    {
      id: "dir-2",
      name: "غازي علي",
      role: "المدير التنفيذي",
      image: "https://res.cloudinary.com/sbjkwjoj/image/upload/v1790765148/hilful/general/458241330865178129_1790765146572.jpg",
    },
    {
      id: "dir-3",
      name: "نور",
      role: "مدير العمليات",
      image: "https://res.cloudinary.com/sbjkwjoj/image/upload/v1790765148/hilful/general/458241330865178129_1790765146572.jpg",
    },
  ],
  hero: {
    eyebrow: "عن هلفول فنتشرز",
    headline: "مصممة للدقة التشغيلية. مبنية لكفاءة رأس المال.",
    subheadline: "نموذج صناعي متكامل لقطاعي التعدين وموارد الطاقة",
    description:
      "تقدم شركة هلفول فنتشرز المحدودة قدرات فنية وتجارية متكاملة عبر دورة حياة الموارد—جامعة بين الاستكشاف الجيولوجي، وتأجير الآليات الثقيلة، وإدارة المشاريع المتكاملة، وتداول السلع التعدينية.",
  },
  whoWeAre: {
    sectionTag: "الأسس المؤسسية",
    headline: "شريك صناعي متكامل عبر سلسلة القيمة التعدينية والطاقوية.",
    paragraphs: [
      "تم تأسيس شركة هلفول فنتشرز المحدودة لسد الفجوة التشغيلية بين مراحل الاستكشاف الجيولوجي الأولى ومراحل التسويق التجاري النهائي للموارد. ومن خلال دمج التقييم الفني، وتوريد الآليات الثقيلة، والإدارة الميدانية المتكاملة، وتداول السلع، نوفر هيكلية تشغيلية موحدة لمشاريع الموارد.",
      "صُمم نموذج قدراتنا لتحقيق كفاءة رأس المال والتنفيذ المنضبط. فبدلاً من التعامل مع مقاولين متفرقين، تعمل هلفول على مواءمة المنهجيات الفنية واللوجستيات وحوكمة المواقع تحت مظلة تشغيلية واحدة.",
      "تغطي قدرات هلفول استكشاف المعادن والهيدروكربونات، وتأجير الأساطيل التعدينية، وبناء البنية التحتية للمناجم، وتداول السلع، مما يمنح مالكي المشاريع قدرة تنفيذية واقعية وأطراً تجارية منظمة.",
    ],
    pillars: [
      {
        number: "01",
        title: "الاستكشاف وتقييم باطن الأرض",
        description:
          "المسح الجيولوجي وأخذ العينات الجيوكيميائية والمسوح الجيوفيزيائية وحفر اللباب الاستكشافي وفق أطر JORC وNI 43-101 المعترف بها.",
      },
      {
        number: "02",
        title: "حشد وتأجير الآليات الثقيلة",
        description:
          "توفير أسطول تعديني عالي الجاهزية بنظامي التأجير الرطب والجاف، مدعوماً ببرامج الصيانة الوقائية المجدولة والدعم الفني الميداني.",
      },
      {
        number: "03",
        title: "إدارة المشاريع المتكاملة",
        description:
          "إدارة كاملة لدورة حياة المشروع تشمل تخطيط المناجم، ومسارات التراخيص النظامية، وتشييد البنية التحتية، وإدارة وحدات المعالجة.",
      },
      {
        number: "04",
        title: "تداول السلع المادية",
        description:
          "شراء منظم، والتحقق من الجودة، وإدارة اللوجستيات، وتصدير السلع المعدنية ومشتقات الزيوت الصناعية المتخصصة وفق قواعد Incoterms.",
      },
    ],
  },
  operatingModel: {
    sectionTag: "نموذج القدرات المتكامل",
    headline: "هيكلية القدرات التشغيلية لهلفول.",
    subtext:
      "تمثيل هيكلي لكيفية ربط هلفول بين التقييم الفني ونشر المعدات والتنفيذ الميداني والتسويق التجاري.",
    stages: [
      {
        step: "01",
        title: "الاستكشاف الجيولوجي",
        description:
          "تقييم جيولوجي مبكر ومسوح جيوفيزيائية وحفر لباب استكشافي لتحديد خصائص الرواسب وتقدير الاحتياطيات المعدنية المحتملة.",
        scope: ["المسح الجيولوجي", "العينات الجيوكيميائية", "المسوح الجيوفيزيائية", "الحفر اللبابي الاستكشافي"],
      },
      {
        step: "02",
        title: "المعدات والتحشيد الميداني",
        description:
          "نشر الآليات والمعدات الثقيلة عالية الجاهزية بما يتلاءم مع متطلبات الموقع، مدعومة بالدعم الميكانيكي الميداني وأنظمة التتبع عن بعد.",
        scope: ["الحفارات وشاحنات النقل", "حفارات الآبار والبلدوزرات", "معدات التكسير والغربلة", "التأجير الرطب والجاف"],
      },
      {
        step: "03",
        title: "تنفيذ المشاريع الميدانية",
        description:
          "تسليم متكامل للمشاريع يشمل الأعمال المدنية بالموقع، وطرق الوصول، وتجهيز منشآت المعالجة الأولية، ودمج متطلبات السلامة.",
        scope: ["دراسات الجدوى الأولية", "البنية التحتية المدنية", "تجهيز وحدات المعالجة", "مسارات الاستخراج الميداني"],
      },
      {
        step: "04",
        title: "الإنتاج وسلاسل الإمداد",
        description:
          "إدارة استخراج منضبطة وتحسين عمليات الإنتاج للحفاظ على معدلات التشغيل وتقليل التوقفات وضمان كفاءة استخلاص الخام.",
        scope: ["إدارة الاستخراج", "نقل المواد الخام", "التكسير والتصنيف", "أخذ عينات الجودة"],
      },
      {
        step: "05",
        title: "التسليم للأسواق التجارية",
        description:
          "شراء السلع المادية، والتحقق من الجودة، ولوجستيات التصدير الخاضعة لقواعد Incoterms، وترتيبات معالجة المشتقات الهيدروكربونية الصناعية.",
        scope: ["الشراء والتوريد", "التحقق من الجودة", "اللوجستيات", "قواعد Incoterms"],
      },
    ],
  },
  advantage: {
    sectionTag: "المبادئ المؤسسية",
    headline: "الميزة التشغيلية لشركة هلفول.",
    subtext:
      "أربعة مبادئ تشغيلية توجه تنفيذنا الفني ونزاهتنا التجارية وإدارتنا المسؤولة للموارد.",
    principles: [
      {
        number: "01",
        title: "المسؤولية المتكاملة",
        description:
          "توحيد التقييم الفني ونشر المعدات والتنفيذ الميداني تحت معيار تشغيلي واحد يحد من تشتت المقاولين ويمنع التأخيرات التشغيلية.",
      },
      {
        number: "02",
        title: "الامتثال للسلامة والأنظمة البيئية",
        description:
          "التزام تشغيلي دقيق بالمتطلبات النظامية للجهات المختصة ومعايير الموقع وبروتوكولات سلامة القوى العاملة المدمجة في كافة المراحل.",
      },
      {
        number: "03",
        title: "جاهزية الأسطول والتتبع عن بعد",
        description:
          "مراقبة فنية مستمرة عبر التيليماتكس، وجداول صيانة وقائية منتظمة، ودعم ميكانيكي ميداني لضمان استمرارية تشغيل الآليات الثقيلة.",
      },
      {
        number: "04",
        title: "النزاهة النظامية والتجارية",
        description:
          "تعاقدات تجارية واضحة، وإجراءات شحن قياسية تخضع لقواعد Incoterms، وتحقق فني دقيق من الجودة لبناء شراكات موثوقة ومستدامة.",
      },
    ],
  },
  hse: {
    sectionTag: "السلامة والحوكمة التنظيمية",
    headline: "سلامة القوى العاملة ومعايير المواقع.",
    subtext:
      "التزام منظم باشتراطات الصحة والسلامة المهنية، والامتثال التنظيمي، والمعايير التشغيلية المعتمدة عبر كافة أنشطة المشاريع.",
    pillars: [
      {
        title: "سلامة القوى العاملة والبروتوكول التشغيلي",
        description:
          "تطبيق بروتوكولات تشغيلية منظمة والتوعية المستمرة بسلامة المواقع لحماية الكوادر البشرية وضمان بيئة عمل منضبطة.",
        points: [
          "تطبيق إجراءات السلامة الميدانية والإرشادات التشغيلية المعتمدة",
          "معايير السلامة التشغيلية والتعامل الآمن مع المعدات",
          "تنسيق إجراءات السلامة بالموقع وفقاً للمتطلبات النظامية المعمول بها",
          "التركيز المستمر على سلامة العاملين والممارسات التشغيلية المنضبطة",
        ],
      },
      {
        title: "الامتثال التنظيمي ومعايير المواقع",
        description:
          "تنفيذ أعمال الاستكشاف والاستخراج وحشد المعدات واللوجستيات بما يتوافق مع الأطر التنظيمية والنظامية السارية.",
        points: [
          "الامتثال لشروط تراخيص التعدين والاشتراطات التشغيلية النظامية",
          "الالتزام بالمتطلبات البيئية والتنظيمية الإقليمية المعتمدة",
          "تطبيق معايير التشغيل الميداني في كافة مناطق العمل",
          "التوافق مع متطلبات التقارير التنظيمية والحوكمة المعتمدة",
        ],
      },
    ],
  },
  closingCta: {
    headline: "هل أنت مستعد للشراكة في مشروعك التعديني أو الطاقوي القادم؟",
    subtext:
      "تواصل مع فرقنا الفنية والتجارية لبحث متطلبات الاستكشاف، أو شروط تأجير الأساطيل، أو التنفيذ الميداني للمشاريع.",
    primaryCta: { text: "تقديم طلب عرض تشغيلي", href: "/contact" },
    secondaryCta: { text: "استكشف قدراتنا المتكاملة", href: "/services" },
  },
};
