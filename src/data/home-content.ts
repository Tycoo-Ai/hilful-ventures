/**
 * Hilful Ventures Pvt Ltd — Homepage Content Model
 *
 * Source of truth: Hilful Appended File.docx
 * Strictly follows client-supplied copy with zero invented statistics,
 * zero fabricated certifications, and neutral presentation labels.
 */

export interface CredibilityItem {
  number: string;
  title: string;
  detail: string;
}

export interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  overview: string;
  activities: string[];
  href: string;
  ctaText: string;
}

export interface AdvantageItem {
  number: string;
  title: string;
  description: string;
  note?: string;
}

export interface EngagementStep {
  step: string;
  title: string;
  description: string;
}

export interface HomeContent {
  hero: {
    categoryPill: string;
    headline: {
      line1: string;
      line2: string;
    };
    description: string;
    primaryCta: {
      text: string;
      href: string;
    };
    secondaryCta: {
      text: string;
      href: string;
    };
    telemetryLabels: string[];
    heroImage?: string;
    heroImageAlt?: string;
  };
  credibilityStrip: CredibilityItem[];
  about: {
    sectionTag: string;
    headline: string;
    leadStatement: string;
    paragraph1: string;
    paragraph2: string;
    visualCaption: string;
  };
  capabilities: {
    sectionTag: string;
    headline: string;
    items: CapabilityItem[];
  };
  advantage: {
    sectionTag: string;
    headline: string;
    items: AdvantageItem[];
  };
  hse: {
    sectionTag: string;
    headline: string;
    paragraph1: string;
    paragraph2: string;
    ctaText: string;
    ctaHref: string;
  };
  engagement: {
    sectionTag: string;
    headline: string;
    steps: EngagementStep[];
  };
  finalCta: {
    headline: string;
    subtext: string;
    primaryCta: {
      text: string;
      href: string;
    };
    secondaryCta: {
      text: string;
      href: string;
    };
  };
}

export const homeContent: Record<"en" | "ar", HomeContent> = {
  en: {
    hero: {
      categoryPill: "INTEGRATED MINING & ENERGY SOLUTIONS",
      headline: {
        line1: "Unlocking Geological Potential.",
        line2: "Powering Industrial Scale.",
      },
      description:
        "From frontier mineral and hydrocarbon exploration to heavy equipment leasing, turnkey project management, and cross-border commodities trade—Hilful Ventures Pvt Ltd delivers end-to-end technical precision and operational reliability across the resource lifecycle.",
      primaryCta: {
        text: "Explore Capabilities",
        href: "/services",
      },
      secondaryCta: {
        text: "Request an Operational Proposal",
        href: "/contact",
      },
      telemetryLabels: [
        "RESOURCE DEVELOPMENT",
        "FIELD OPERATIONS",
        "INDUSTRIAL DELIVERY",
        "EXPLORATION & LOGISTICS",
      ],
    },
    credibilityStrip: [
      {
        number: "01",
        title: "Multi-Sector Capabilities",
        detail: "Mineral Exploration & Hydrocarbon Plays",
      },
      {
        number: "02",
        title: "High-Availability Fleet",
        detail: "Earthmoving, Drilling & Processing Machinery",
      },
      {
        number: "03",
        title: "Workforce Safety & Protocol",
        detail: "Site Standards & Regulatory Compliance",
      },
      {
        number: "04",
        title: "End-to-End Delivery",
        detail: "Prospecting to Market Supply Chain",
      },
    ],
    about: {
      sectionTag: "ABOUT HILFUL VENTURES",
      headline: "Engineered for Operational Precision. Built for Capital Efficiency.",
      leadStatement:
        "Bridging the gap between subsurface geological potential and marketable commercial output.",
      paragraph1:
        "The modern extractive sector demands technical mastery, uncompromising regulatory compliance, and seamless execution. At Hilful Ventures Pvt Ltd, we bridge the gap between subsurface potential and marketable commercial output.",
      paragraph2:
        "Our multidisciplinary approach brings together geoscientific field expertise, project engineering discipline, a modern fleet of specialized machinery, and established trading networks. Whether partnering with concession owners to de-risk greenfield discoveries or supplying critical heavy assets to active extraction sites, we deliver dependable solutions built around performance, safety, and long-term asset value.",
      visualCaption: "Subsurface geoscientific modeling and resource evaluation framework",
    },
    capabilities: {
      sectionTag: "OUR OPERATIONAL CAPABILITIES",
      headline: "Integrated Solutions Across the Resource Value Chain",
      items: [
        {
          id: "exploration",
          number: "01",
          title: "Minerals & Oil Exploration & Prospecting",
          overview:
            "De-risking greenfield and brownfield reserves through data-driven geoscientific analysis.",
          activities: [
            "Geological mapping",
            "Geochemical sampling",
            "Geophysical surveys",
            "Exploratory core drilling",
            "Mineral reserve estimation",
            "JORC / NI 43-101 frameworks",
          ],
          href: "/services/exploration-prospecting",
          ctaText: "Learn More About Exploration",
        },
        {
          id: "equipment",
          number: "02",
          title: "Mining Equipment Leasing & Fleet Logistics",
          overview:
            "High-availability earthmoving, drilling, and processing equipment backed by rigorous maintenance.",
          activities: [
            "Heavy excavators",
            "Haul trucks",
            "Wheel loaders",
            "Dozers",
            "Drill rigs",
            "Mobile crushing/screening",
            "Wet/dry lease models",
            "Mechanical support",
          ],
          href: "/services/equipment-leasing",
          ctaText: "View Equipment Fleet",
        },
        {
          id: "project-management",
          number: "03",
          title: "Turnkey Mining Project Management",
          overview:
            "End-to-end operational execution from initial site clearance to active extraction and haulage.",
          activities: [
            "Pre-feasibility reviews",
            "Mine planning",
            "Statutory permitting",
            "Site civil works",
            "Access infrastructure",
            "Processing plant setup",
            "Extraction management",
            "Production optimization",
          ],
          href: "/services/mining-project-management",
          ctaText: "Discover Project Management Services",
        },
        {
          id: "commodities",
          number: "04",
          title: "Mineral & Hydrocarbon Commodities Trading",
          overview:
            "Reliable procurement, quality verification, and logistics for industrial raw materials and energy products.",
          activities: [
            "Procurement",
            "Quality verification",
            "Logistics",
            "Incoterms",
          ],
          href: "/services/commodities-trading",
          ctaText: "Explore Commodities & Trading",
        },
      ],
    },
    advantage: {
      sectionTag: "THE HILFUL ADVANTAGE",
      headline: "De-Risking Resource Development at Every Stage",
      items: [
        {
          number: "01",
          title: "Single-Source Integrated Accountability",
          description:
            "Eliminate fragmented contracting. We manage the pipeline from geological discovery and equipment deployment to active extraction and off-take delivery under one roof.",
          note: "Further we also arrange to process and extract oil byproducts such as Fuel oil (FO), Furnace oil, Heavy Furnace oil (HFO) and Mixed Hydro carbon Oil (MHO) with our partners.",
        },
        {
          number: "02",
          title: "HSE & Regulatory Compliance",
          description:
            "Operational adherence to host-jurisdiction statutory requirements, site baseline standards, and strict workforce safety protocols embedded across every operational phase.",
        },
        {
          number: "03",
          title: "Asset Telematics & Fleet Uptime Focus",
          description:
            "Our equipment fleet is monitored through preventative diagnostics, ensuring minimal site downtime and predictable project cycles.",
        },
        {
          number: "04",
          title: "Regulatory & Commercial Integrity",
          description:
            "Every operation and commodity trade is executed with verifiable chain-of-custody documentation, transparent financial controls, and complete legal compliance.",
        },
      ],
    },
    hse: {
      sectionTag: "HSE & CORPORATE GOVERNANCE",
      headline: "Committed to Responsible Extraction and Ethical Growth",
      paragraph1:
        "At Hilful Ventures Pvt Ltd, sustainable resource extraction is an operational discipline. We operate under strict corporate governance principles that protect local ecosystems, prioritize workforce well-being, and respect regional community stakeholders.",
      paragraph2:
        "Our corporate commitment to environmental responsibility, operational safety, and regulatory compliance guarantees certainty, mutual respect, and long-term value for our partners and institutional stakeholders.",
      ctaText: "Read Our Governance Framework",
      ctaHref: "/hse",
    },
    engagement: {
      sectionTag: "ENGAGEMENT PROCESS",
      headline: "Structured Operational Deployment",
      steps: [
        {
          step: "01",
          title: "Scoping & Resource Assessment",
          description:
            "Detailed analysis of concession data, site logistics, machinery requirements, and regulatory conditions.",
        },
        {
          step: "02",
          title: "Technical & Commercial Proposal",
          description:
            "Tailored operational roadmap with clear SLAs, lease terms, safety plans, and production timelines.",
        },
        {
          step: "03",
          title: "Mobilization & Deployment",
          description:
            "Rapid deployment of specialized equipment, geoscientific survey teams, and on-site engineering leadership.",
        },
        {
          step: "04",
          title: "Execution & Value Delivery",
          description:
            "Continuous project monitoring, telematics-tracked performance, and reliable commodity off-take logistics.",
        },
      ],
    },
    finalCta: {
      headline: "Ready to Partner on Your Next Mining or Energy Venture?",
      subtext:
        "Speak with our technical and commercial team to discuss equipment leasing, exploration partnerships, or trading opportunities.",
      primaryCta: {
        text: "Submit a Tender / RFP",
        href: "/contact",
      },
      secondaryCta: {
        text: "Request an Operational Proposal",
        href: "/contact",
      },
    },
  },
  ar: {
    hero: {
      categoryPill: "حلول التعدين والطاقة المتكاملة",
      headline: {
        line1: "إطلاق الإمكانات الجيولوجية.",
        line2: "تمكين النطاق الصناعي.",
      },
      description:
        "من استكشاف المعادن والهيدروكربونات إلى تأجير المعدات الثقيلة، وإدارة المشاريع المتكاملة، وتجارة السلع عبر الحدود — تقدم شركة هلفول فنتشرز المحدودة دقة فنية وموثوقية تشغيلية شاملة عبر دورة حياة الموارد.",
      primaryCta: {
        text: "استكشف القدرات",
        href: "/services",
      },
      secondaryCta: {
        text: "طلب مقترح تشغيلي",
        href: "/contact",
      },
      telemetryLabels: [
        "تطوير الموارد",
        "العمليات الميدانية",
        "التسليم الصناعي",
        "الاستكشاف والخدمات اللوجستية",
      ],
    },
    credibilityStrip: [
      {
        number: "٠١",
        title: "قدرات متعددة القطاعات",
        detail: "استكشاف المعادن والمساعي الهيدروكربونية",
      },
      {
        number: "٠٢",
        title: "أسطول عالي الجاهزية",
        detail: "آليات تحريك التربة والحفر والمعالجة",
      },
      {
        number: "٠٣",
        title: "سلامة الكوادر والبروتوكول",
        detail: "معايير المواقع والامتثال للأنظمة",
      },
      {
        number: "٠٤",
        title: "تسليم متكامل شامل",
        detail: "من التنقيب إلى سلسلة التوريد في الأسواق",
      },
    ],
    about: {
      sectionTag: "عن هلفول فنتشرز",
      headline: "هندسة للأداء الدقيق. بناء لكفاءة رأس المال.",
      leadStatement:
        "جسر الهوة بين الإمكانات الجيولوجية الباطنية والمخرجات التجارية القابلة للتسويق.",
      paragraph1:
        "يتطلب قطاع الاستخراج الحديث إتقاناً فنياً والتزاماً تنظيمياً صارماً وتنفيذاً سلساً. في شركة هلفول فنتشرز المحدودة، نربط بين الإمكانات الباطنية والإنتاج التجاري القابل للتسويق.",
      paragraph2:
        "يجمع نهجنا المتعدد التخصصات بين الخبرة الميدانية الجيوعلمية، وانضباط الهندسة الإنشائية للمشاريع، وأسطول حديث من المعدات المتخصصة، وشبكات تجارية راسخة. سواء كان ذلك بالشراكة مع أصحاب الامتيازات لتقليل مخاطر الاكتشافات الجديدة أو توريد المعدات الحيوية لمواقع الاستخراج النشطة، فإننا نقدم حلولاً موثوقة ترتكز على الأداء والسلامة وقيمة الأصول طويلة الأجل.",
      visualCaption: "نمذجة جيوعلمية باطنية وإطار تقييم الموارد",
    },
    capabilities: {
      sectionTag: "قدراتنا التشغيلية",
      headline: "حلول متكاملة عبر سلسلة القيمة للموارد",
      items: [
        {
          id: "exploration",
          number: "٠١",
          title: "استكشاف المعادن والنفط والتنقيب",
          overview:
            "تقليل مخاطر الاحتياطيات في الحقول الجديدة والقائمة من خلال التحليل الجيوعلمي المستند إلى البيانات.",
          activities: [
            "تخطيط جيولوجي",
            "أخذ عينات جيوكيميائية",
            "مسوح جيوفيزيائية",
            "حفر لبي استكشافي",
            "تقدير احتياطيات المعادن",
            "أطر عمل JORC / NI 43-101",
          ],
          href: "/services/exploration-prospecting",
          ctaText: "اعرف المزيد عن الاستكشاف",
        },
        {
          id: "equipment",
          number: "٠٢",
          title: "تأجير معدات التعدين واللوجستيات",
          overview:
            "معدات تحريك التربة والحفر والمعالجة عالية الجاهزية المدعومة ببرامج صيانة منضبطة.",
          activities: [
            "حفارات ثقيلة",
            "شاحنات نقل ثقيلة",
            "لوادر ذات عجلات",
            "جرافات (بلدوزرات)",
            "حفارات آبار",
            "محطات سحق وغربلة متنقلة",
            "نماذج تأجير شاملة وجافة",
            "دعم فني ميكانيكي",
          ],
          href: "/services/equipment-leasing",
          ctaText: "عرض أسطول المعدات",
        },
        {
          id: "project-management",
          number: "٠٣",
          title: "إدارة مشاريع التعدين المتكاملة (تسليم مفتاح)",
          overview:
            "تنفيذ تشغيلي شامل من الإعداد الأولي للموقع إلى الاستخراج الفعلي والنقل.",
          activities: [
            "مراجعات دراسات الجدوى",
            "تخطيط المناجم",
            "التراخيص والموافقات النظامية",
            "الأعمال المدنية للموقع",
            "البنية التحتية والمداخل",
            "إنشاء محطات المعالجة",
            "إدارة الاستخراج",
            "تحسين الإنتاج",
          ],
          href: "/services/mining-project-management",
          ctaText: "اكتشف خدمات إدارة المشاريع",
        },
        {
          id: "commodities",
          number: "٠٤",
          title: "تداول السلع المعدنية والهيدروكربونية",
          overview:
            "شراء موثوق وتحقق من الجودة ولوجستيات للمواد الخام الصناعية ومنتجات الطاقة.",
          activities: [
            "الشراء والتوريد",
            "التحقق من الجودة",
            "اللوجستيات والنقل",
            "قواعد التجارة الدولية (Incoterms)",
          ],
          href: "/services/commodities-trading",
          ctaText: "استكشف تجارة السلع",
        },
      ],
    },
    advantage: {
      sectionTag: "ميزة هلفول",
      headline: "تقليل مخاطر تطوير الموارد في كل مرحلة",
      items: [
        {
          number: "٠١",
          title: "المسؤولية المتكاملة من مصدر واحد",
          description:
            "القضاء على التعاقدات المجزأة. نحن ندير كامل السلسلة من الاستكشاف الجيولوجي ونشر المعدات إلى الاستخراج الفعلي وتوريد المخرجات تحت مظلة واحدة.",
          note: "بالإضافة إلى ذلك، نرتب معالجة واستخراج مشتقات النفط مثل زيت الوقود (FO)، وزيت الأفران، وزيت الأفران الثقيل (HFO)، وزيت الهيدروكربون المختلط (MHO) مع شركائنا.",
        },
        {
          number: "٠٢",
          title: "الامتثال للسلامة واللوائح التنظيمية",
          description:
            "الالتزام الصارم ببروتوكولات سلامة الكوادر الميدانية، ومعايير تشغيل المعدات، والامتثال الكامل للأطر واللوائح التنظيمية المعمول بها.",
        },
        {
          number: "٠٣",
          title: "متابعة الأصول عن بُعد والتركيز على جاهزية الأسطول",
          description:
            "تتم مراقبة أسطول معداتنا من خلال التشخيصات الوقائية، مما يضمن تقليل وقت التوقف في الموقع والتنبؤ بدورات المشاريع بدقة.",
        },
        {
          number: "٠٤",
          title: "النزاهة التنظيمية والتجارية",
          description:
            "يتم تنفيذ كل عملية وتجارة سلع بوثائق سلسلة حيازة يمكن التحقق منها، وضوابط مالية شفافة، وامتثال قانوني كامل.",
        },
      ],
    },
    hse: {
      sectionTag: "الصحة والسلامة والحوكمة المؤسسية",
      headline: "ملتزمون بالاستخراج المسؤول والنمو الأخلاقي",
      paragraph1:
        "في شركة هلفول فنتشرز المحدودة، يعد الاستخراج المستدام للموارد انضباطاً تشغيلياً. نعمل بموجب مبادئ حوكمة مؤسسية صارمة تحمي النظم البيئية المحلية، وتعطي الأولوية لسلامة القوى العاملة، وتحترم المجتمعات الإقليمية.",
      paragraph2:
        "يضمن التزامنا المؤسسي بالمسؤولية البيئية والسلامة التشغيلية والامتثال التنظيمي اليقين والاحترام المتبادل والقيمة طويلة الأجل لشركائنا والجهات المعنية.",
      ctaText: "اطّلع على إطار الحوكمة المؤسسية",
      ctaHref: "/hse",
    },
    engagement: {
      sectionTag: "آلية العمل والتعاقد",
      headline: "الانتشار التشغيلي الممنهج",
      steps: [
        {
          step: "٠١",
          title: "تحديد النطاق وتقييم الموارد",
          description:
            "تحليل تفصيلي لبيانات الامتياز، ولوجستيات الموقع، ومتطلبات الآليات، والشروط التنظيمية.",
        },
        {
          step: "٠٢",
          title: "المقترح الفني والتجاري",
          description:
            "خارطة طريق تشغيلية مخصصة مع شروط تأجير واضحة، وخطط سلامة، وجداول زمنية للإنتاج.",
        },
        {
          step: "٠٣",
          title: "التعبئة والانتشار الميداني",
          description:
            "نشر سريع للمعدات المتخصصة، وفرق المسح الجيوعلمي، والقيادة الهندسية في الموقع.",
        },
        {
          step: "٠٤",
          title: "التنفيذ وتحقيق القيمة",
          description:
            "مراقبة مستمرة للمشروع، وأداء متتبع تقنياً، ولوجستيات تسليم موثوقة للسلع.",
        },
      ],
    },
    finalCta: {
      headline: "هل أنت مستعد للشراكة في مشروعك التعديني أو الطاقي القادم؟",
      subtext:
        "تحدث مع فريقنا الفني والتجاري لمناقشة تأجير المعدات، أو شراكات الاستكشاف، أو الفرص التجارية.",
      primaryCta: {
        text: "تقديم مناقصة / طلب عروض (RFP)",
        href: "/contact",
      },
      secondaryCta: {
        text: "طلب مقترح تشغيلي",
        href: "/contact",
      },
    },
  },
};
