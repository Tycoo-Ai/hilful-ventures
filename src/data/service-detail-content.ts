export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ConnectedCapability {
  slug: string;
  number: string;
  title: string;
  summary: string;
}

export interface ServiceDetailConfig {
  slug: string;
  number: string;
  eyebrow: string;
  title: string;
  heroDescription: string;
  overviewHeading: string;
  overviewText: string[];
  scopeHeading: string;
  scopeSubtext: string;
  scopeItems: {
    title: string;
    description: string;
  }[];
  methodologyHeading: string;
  methodologySubtext: string;
  methodologySteps: ServiceProcessStep[];
  deliverablesHeading: string;
  deliverablesSubtext: string;
  deliverables: string[];
  operationalParametersHeading: string;
  operationalParameters: {
    label: string;
    value: string;
  }[];
  byproductNote?: string;
  connectedCapabilities: ConnectedCapability[];
  cta: {
    headline: string;
    subtext: string;
    primaryText: string;
    secondaryText: string;
  };
}

export interface ServiceDetailContentMap {
  [slug: string]: ServiceDetailConfig;
}

export const serviceDetailsEn: ServiceDetailContentMap = {
  "exploration-prospecting": {
    slug: "exploration-prospecting",
    number: "01",
    eyebrow: "01 / EXPLORATION & PROSPECTING",
    title: "MINERALS & OIL EXPLORATION & PROSPECTING",
    heroDescription:
      "Structured surface and subsurface investigations evaluating mineral occurrences, geological structures, and hydrocarbon potential under recognized international reporting frameworks.",
    overviewHeading:
      "Systematic Geological Assessment & Target Evaluation.",
    overviewText: [
      "Hilful Ventures delivers technical exploration and prospecting capabilities designed to evaluate geological formations and establish commercial resource potential. Our technical evaluation framework applies systematic surface reconnaissance, subsurface geophysical interpretation, and exploratory target drilling to develop verified geological models.",
      "By integrating fieldwork data with recognized reporting standards, we provide project owners and investors with disciplined technical clarification across early-stage resource evaluations.",
    ],
    scopeHeading: "Scope of Work",
    scopeSubtext: "Source-supported technical disciplines applied across exploratory campaigns:",
    scopeItems: [
      {
        title: "GEOLOGICAL MAPPING",
        description: "Surface mapping of lithological units, structural faults, and stratigraphic formations to establish regional geological context.",
      },
      {
        title: "GEOCHEMICAL SAMPLING",
        description: "Systematic collection and geochemical analysis of surface and trench samples to delineate mineral anomaly footprints.",
      },
      {
        title: "GEOPHYSICAL SURVEYS",
        description: "Application of surface geophysical methodologies to map subsurface resistivity, magnetic properties, and structural boundaries.",
      },
      {
        title: "EXPLORATORY CORE DRILLING",
        description: "Targeted diamond core drilling to obtain continuous subsurface lithological samples, stratigraphic intervals, and intercept data.",
      },
      {
        title: "MINERAL RESERVE ESTIMATION",
        description: "Technical calculation of resource volumes, deposit geometry, and preliminary reserve potential based on verified drill data.",
      },
      {
        title: "JORC / NI 43-101 FRAMEWORKS",
        description: "Data collection and technical documentation aligned with the guidelines of JORC Code and National Instrument 43-101 standards.",
      },
    ],
    methodologyHeading: "Exploration Methodology",
    methodologySubtext: "A structured representation of the exploratory evaluation sequence:",
    methodologySteps: [
      {
        step: "01",
        title: "Resource Assessment",
        description: "Initial evaluation of regional geological literature, concession records, and surface reconnaissance data.",
      },
      {
        step: "02",
        title: "Geological / Geophysical Investigation",
        description: "Detailed surface geological mapping combined with geophysical surveys to identify subsurface targets.",
      },
      {
        step: "03",
        title: "Field Sampling & Exploration",
        description: "Systematic geochemical sampling and exploratory core drilling to recover physical stratigraphic samples.",
      },
      {
        step: "04",
        title: "Resource Estimation",
        description: "Integration of intercept data, lithological logs, and spatial models to estimate mineral reserve potential.",
      },
    ],
    deliverablesHeading: "Technical Framework & Outputs",
    deliverablesSubtext: "Core information and data structures generated through exploratory evaluation:",
    deliverables: [
      "Geological mapping outputs and stratigraphic field charts",
      "Geochemical sampling outputs and anomaly delineation maps",
      "Geophysical survey outputs and subsurface profile datasets",
      "Exploratory core drilling information, lithological logs, and recovery records",
      "Mineral reserve estimation models and resource volume calculations",
    ],
    operationalParametersHeading: "Operational Parameters",
    operationalParameters: [
      { label: "Investigation Methodologies", value: "Geological, Geochemical & Geophysical" },
      { label: "Drilling Technique", value: "Exploratory Core Drilling" },
      { label: "Reporting Alignment", value: "Aligned with JORC & NI 43-101 Frameworks" },
      { label: "Capability Focus", value: "Subsurface Evaluation & Reserve Estimation" },
    ],
    connectedCapabilities: [
      {
        slug: "equipment-leasing",
        number: "02",
        title: "Mining Equipment Leasing & Fleet Logistics",
        summary: "Mobilization of heavy excavation, haulage, and drilling machinery supporting site transition.",
      },
      {
        slug: "mining-project-management",
        number: "03",
        title: "Turnkey Mining Project Management",
        summary: "End-to-end execution covering mine planning, civil works, processing plant setup, and extraction.",
      },
    ],
    cta: {
      headline: "Ready to Partner on Your Next Mining or Energy Venture?",
      subtext: "Engage our technical team to discuss exploration scoping, core drilling parameters, or reserve evaluation frameworks.",
      primaryText: "Request an Operational Proposal",
      secondaryText: "View All Capabilities",
    },
  },

  "equipment-leasing": {
    slug: "equipment-leasing",
    number: "02",
    eyebrow: "02 / EQUIPMENT & LOGISTICS",
    title: "MINING EQUIPMENT LEASING & FLEET LOGISTICS",
    heroDescription:
      "Deployment of high-capacity earthmoving, excavation, and crushing machinery under structured wet or dry lease agreements, supported by preventative mechanical maintenance.",
    overviewHeading:
      "High-Availability Heavy Fleet Deployment.",
    overviewText: [
      "Hilful Ventures provides structured heavy machinery leasing designed to support continuous extraction operations. Our equipment division pairs capital-grade machinery with structured mobilization logistics and on-site mechanical support.",
      "At the broader fleet capability level, we maintain a focus on high-availability fleet readiness and asset telematics oversight to optimize equipment uptime and project operational continuity.",
    ],
    scopeHeading: "Equipment Categories",
    scopeSubtext: "Primary heavy machinery categories deployed across extraction sites:",
    scopeItems: [
      {
        title: "EXCAVATORS",
        description: "Heavy hydraulic excavators configured for bench extraction, overburden stripping, and high-volume material loading.",
      },
      {
        title: "HAUL TRUCKS",
        description: "Rigid and articulated heavy off-highway haul trucks engineered for bulk payload haulage across mine access roads.",
      },
      {
        title: "WHEEL LOADERS",
        description: "High-capacity wheel loaders for material handling, stockpile management, and primary crusher feed operations.",
      },
      {
        title: "DOZERS",
        description: "Track-type bulldozers for bulk earthmoving, bench grading, haul road maintenance, and overburden clearance.",
      },
      {
        title: "DRILL RIGS",
        description: "Surface rotary and blast-hole drill rigs for pre-split, exploratory coring, and extraction pattern preparation.",
      },
      {
        title: "MOBILE CRUSHING / SCREENING",
        description: "Track-mounted primary crushers and multi-deck screening units for continuous on-site aggregate and ore sizing.",
      },
    ],
    methodologyHeading: "Equipment Leasing Process",
    methodologySubtext: "An editorial representation of our equipment lease structure:",
    methodologySteps: [
      {
        step: "01",
        title: "Equipment Requirement",
        description: "Evaluation of site production targets, material characteristics, and fleet capacity requirements.",
      },
      {
        step: "02",
        title: "Lease Model",
        description: "Structuring of commercial agreement under Wet Lease (equipment with operators) or Dry Lease (equipment only).",
      },
      {
        step: "03",
        title: "Mobilization",
        description: "Logistics coordination, transport to project site, on-site mechanical setup, and equipment commissioning.",
      },
      {
        step: "04",
        title: "Mechanical Support",
        description: "Scheduled preventative servicing, field mechanical assistance, and asset telematics uptime oversight.",
      },
    ],
    deliverablesHeading: "Fleet Support & Documentation",
    deliverablesSubtext: "Standard operational deliverables supporting fleet deployments:",
    deliverables: [
      "Structured commercial lease agreements (wet lease or dry lease terms)",
      "Equipment mobilization and site deployment schedules",
      "Scheduled preventative maintenance routines and on-site mechanical support",
      "Fleet operating logs and telematics-supported utilization records",
    ],
    operationalParametersHeading: "Operating Framework",
    operationalParameters: [
      { label: "Lease Formats", value: "Wet Lease (With Operators) / Dry Lease (Equipment Only)" },
      { label: "Maintenance Protocol", value: "Scheduled Preventative Service & On-Site Support" },
      { label: "Fleet Oversight", value: "Asset Telematics & Fleet Uptime Focus" },
      { label: "Equipment Classes", value: "Earthmoving, Haulage, Drilling & Sizing" },
    ],
    connectedCapabilities: [
      {
        slug: "mining-project-management",
        number: "03",
        title: "Turnkey Mining Project Management",
        summary: "Turnkey project execution integrating equipment deployment into full mine operations.",
      },
      {
        slug: "exploration-prospecting",
        number: "01",
        title: "Minerals & Oil Exploration & Prospecting",
        summary: "Geological mapping and exploratory core drilling establishing deposit parameters.",
      },
    ],
    cta: {
      headline: "Ready to Partner on Your Next Mining or Energy Venture?",
      subtext: "Contact our fleet operations team to discuss machinery availability, lease formats, or site mobilization logistics.",
      primaryText: "Request an Operational Proposal",
      secondaryText: "View All Capabilities",
    },
  },

  "mining-project-management": {
    slug: "mining-project-management",
    number: "03",
    eyebrow: "03 / PROJECT MANAGEMENT",
    title: "TURNKEY MINING PROJECT MANAGEMENT",
    heroDescription:
      "Integrated project execution for surface mining operations—spanning pre-feasibility, mine planning, site civil works, infrastructure development, and production optimization.",
    overviewHeading:
      "Integrated Site Execution & Operational Governance.",
    overviewText: [
      "Hilful Ventures delivers turnkey operational project management designed to manage the complexities of mine development. By bridging technical engineering with on-site infrastructure setup and extraction oversight, we provide single-point accountability.",
      "Our management scope encompasses technical planning, site civil works, processing plant commissioning, and daily extraction optimization to ensure disciplined project delivery.",
    ],
    scopeHeading: "Lifecycle Scope of Work",
    scopeSubtext: "Core operational phases managed across turnkey mining engagements:",
    scopeItems: [
      {
        title: "PRE-FEASIBILITY",
        description: "Preliminary technical and commercial evaluation to assess extraction viability and capital deployment requirements.",
      },
      {
        title: "MINE PLANNING",
        description: "Development of extraction sequencing, bench layouts, pit geometry, and material haulage route designs.",
      },
      {
        title: "PERMITTING",
        description: "Coordination of statutory documentation, environmental baseline submissions, and operating permits.",
      },
      {
        title: "SITE CIVIL WORKS",
        description: "Construction of site access roads, haul roads, drainage channels, bench clearing, and industrial laydown areas.",
      },
      {
        title: "INFRASTRUCTURE",
        description: "Establishment of site power supply interfaces, maintenance workshops, water management, and operational facilities.",
      },
      {
        title: "PROCESSING PLANT SETUP",
        description: "Assembly, installation, and commissioning of primary mobile crushing, screening, and ore sizing installations.",
      },
      {
        title: "EXTRACTION MANAGEMENT",
        description: "Daily operational supervision of drill-and-blast patterns, mechanical excavation, and haulage cycles.",
      },
      {
        title: "PRODUCTION OPTIMIZATION",
        description: "Continuous monitoring of material throughput, recovery efficiency, cycle times, and operational standards.",
      },
    ],
    methodologyHeading: "Project Management Approach",
    methodologySubtext: "The integrated lifecycle architecture for turnkey project execution:",
    methodologySteps: [
      {
        step: "01",
        title: "Pre-Feasibility & Mine Planning",
        description: "Technical assessments, extraction sequence design, and statutory permitting alignment.",
      },
      {
        step: "02",
        title: "Site & Infrastructure Development",
        description: "Execution of civil earthworks, haul roads, drainage systems, and maintenance facilities.",
      },
      {
        step: "03",
        title: "Processing Setup & Commissioning",
        description: "Installation and trial operation of primary crushing, sizing, and material transfer circuits.",
      },
      {
        step: "04",
        title: "Extraction Management & Production",
        description: "Active extraction supervision, workforce coordination, and production throughput optimization.",
      },
    ],
    deliverablesHeading: "Management Deliverables",
    deliverablesSubtext: "Standard technical outputs delivered across project execution:",
    deliverables: [
      "Mine development plans and extraction sequencing schedules",
      "Permitting compliance files and regulatory coordination documentation",
      "Completed site civil infrastructure, haulage roads, and processing foundations",
      "Commissioned crushing and screening plant operations",
      "Production tracking documentation and throughput optimization reports",
    ],
    operationalParametersHeading: "Execution Architecture",
    operationalParameters: [
      { label: "Management Model", value: "Turnkey Single-Point Responsibility" },
      { label: "Operational Breadth", value: "Pre-Feasibility Through Production" },
      { label: "Site Civil Scope", value: "Roads, Benches, Infrastructure & Drainage" },
      { label: "Plant Integration", value: "Crushing, Sizing & Material Handling" },
    ],
    connectedCapabilities: [
      {
        slug: "equipment-leasing",
        number: "02",
        title: "Mining Equipment Leasing & Fleet Logistics",
        summary: "Dedicated machinery fleets providing the physical earthmoving and extraction backbone.",
      },
      {
        slug: "commodities-trading",
        number: "04",
        title: "Mineral & Hydrocarbon Commodities Trading",
        summary: "Physical off-take, commercial contracting, and export logistics for produced resources.",
      },
    ],
    cta: {
      headline: "Ready to Partner on Your Next Mining or Energy Venture?",
      subtext: "Consult with our project management team to discuss turnkey mine execution, infrastructure development, or site operations.",
      primaryText: "Request an Operational Proposal",
      secondaryText: "View All Capabilities",
    },
  },

  "commodities-trading": {
    slug: "commodities-trading",
    number: "04",
    eyebrow: "04 / PHYSICAL COMMODITIES",
    title: "MINERAL & HYDROCARBON COMMODITIES TRADING",
    heroDescription:
      "Physical procurement, quality verification, logistics management, and structured commercial contracting under international Incoterms for mineral commodities and specialized hydrocarbon byproduct streams.",
    overviewHeading:
      "Commercial Off-Take & Disciplined Supply Chain Execution.",
    overviewText: [
      "Hilful Ventures connects resource producers with industrial markets through structured commercial trading. Our physical commodities division manages procurement, quality verification, and logistics execution governed by standard Incoterms.",
      "In addition to bulk mineral commodities, we maintain structured arrangements for the processing and extraction of specialized industrial oil byproducts.",
    ],
    scopeHeading: "Commercial Scope of Work",
    scopeSubtext: "Core trading capabilities governing physical commodities off-take:",
    scopeItems: [
      {
        title: "PROCUREMENT",
        description: "Structured sourcing and off-take contracting directly aligned with producer operational schedules.",
      },
      {
        title: "QUALITY VERIFICATION",
        description: "Batch sampling, technical specification verification, and quality documentation to ensure contractual compliance.",
      },
      {
        title: "LOGISTICS",
        description: "Comprehensive transport management, freight scheduling, customs clearance, and delivery coordination.",
      },
      {
        title: "INCOTERMS",
        description: "Commercial contract execution governed by standard Incoterms rules (FOB, CIF, CFR) ensuring clear risk transfer.",
      },
    ],
    methodologyHeading: "Commercial Workflow",
    methodologySubtext: "The structured execution sequence for physical trade contracts:",
    methodologySteps: [
      {
        step: "01",
        title: "Procurement",
        description: "Commercial negotiation and off-take contract structuring with resource producers.",
      },
      {
        step: "02",
        title: "Quality Verification",
        description: "Independent specification analysis, sampling verification, and quality documentation.",
      },
      {
        step: "03",
        title: "Logistics",
        description: "Freight coordination, route planning, customs documentation, and scheduled transport.",
      },
      {
        step: "04",
        title: "Incoterms / Commercial Execution",
        description: "Contractual delivery, risk transfer, and settlement execution under standard trade terms.",
      },
    ],
    deliverablesHeading: "Trade Documentation & Framework",
    deliverablesSubtext: "Standard commercial documentation delivered across trade transactions:",
    deliverables: [
      "Structured commercial sales contracts and off-take agreements",
      "Quality verification and specification inspection documentation",
      "Bills of Lading, shipping manifests, and customs compliance filings",
      "Scheduled logistics coordination and delivery documentation",
    ],
    operationalParametersHeading: "Trading Parameters",
    operationalParameters: [
      { label: "Commercial Terms", value: "FOB, CIF, CFR Governed by Standard Incoterms" },
      { label: "Quality Protocol", value: "Specification Verification & Batch Sampling" },
      { label: "Execution Scope", value: "Procurement, Quality, Logistics & Contracts" },
      { label: "Commodity Focus", value: "Minerals & Hydrocarbon Byproduct Streams" },
    ],
    byproductNote:
      "Hilful arranges the processing and extraction of oil byproducts, including Fuel Oil (FO), Furnace Oil, Heavy Furnace Oil (HFO), and Mixed Hydrocarbon Oil (MHO), in partnership with established processing facilities.",
    connectedCapabilities: [
      {
        slug: "exploration-prospecting",
        number: "01",
        title: "Minerals & Oil Exploration & Prospecting",
        summary: "Early-stage deposit assessment and reserve evaluation establishing mineral potential.",
      },
      {
        slug: "mining-project-management",
        number: "03",
        title: "Turnkey Mining Project Management",
        summary: "Full mine site execution managing production throughput for commercial off-take.",
      },
    ],
    cta: {
      headline: "Ready to Partner on Your Next Mining or Energy Venture?",
      subtext: "Connect with our commercial trading team to discuss commodity procurement, off-take structures, or oil byproduct processing.",
      primaryText: "Request an Operational Proposal",
      secondaryText: "View All Capabilities",
    },
  },
};

export const serviceDetailsAr: ServiceDetailContentMap = {
  "exploration-prospecting": {
    slug: "exploration-prospecting",
    number: "01",
    eyebrow: "01 / الاستكشاف والتنقيب",
    title: "استكشاف وتنقيب المعادن والنفط",
    heroDescription:
      "استكشافات سطحية وجوفية مستهدفة لتقييم التواجدات التعدينية، والجيولوجيا الهيكلية، والإمكانات الهيدروكربونية وفق أطر إعداد التقارير الدولية المعتمدة.",
    overviewHeading:
      "تقييم جيولوجي منهجي ودراسة دقيقة للأهداف.",
    overviewText: [
      "توفر هلفول فنتشرز قدرات استكشاف وتنقيب فنية تهدف إلى تقييم التكوينات الجيولوجية وتحديد الإمكانات التجارية للموارد. يطبق إطار التقييم الفني لدينا استطلاعاً سطحياً منهجياً، وتحليلاً جيوفيزيائياً لباطن الأرض، وحفراً استكشافياً لبناء نماذج جيولوجية موثوقة.",
      "ومن خلال دمج البيانات الميدانية مع معايير إعداد التقارير المعترف بها، نوفر لمالكي المشاريع والمستثمرين توضيحاً فنياً منضبطاً عبر كافة مراحل تقييم الموارد الأولية.",
    ],
    scopeHeading: "نطاق العمل الفني",
    scopeSubtext: "التخصصات الفنية المعتمدة والمطبقة عبر الحملات الاستكشافية:",
    scopeItems: [
      {
        title: "المسح الجيولوجي",
        description: "مسح ميداني للوحدات الصخرية والفوالق الهيكلية والطبقات التكوينية لتحديد السياق الجيولوجي الإقليمي.",
      },
      {
        title: "أخذ العينات الجيوكيميائية",
        description: "جمع منهجي وتحليل جيوكيميائي للعينات السطحية وعينات الخنادق لتحديد النطاقات التعدينية الشاذة.",
      },
      {
        title: "المسوح الجيوفيزيائية",
        description: "تطبيق المنهجيات الجيوفيزيائية السطحية لقياس المقاومية والخواص المغناطيسية والحدود التركيبية لباطن الأرض.",
      },
      {
        title: "حفر اللباب الاستكشافي",
        description: "حفر ماسي استكشافي مستهدف للحصول على عينات لبابية مستمرة وتحديد الأعماق والخصائص الصخرية.",
      },
      {
        title: "تقدير الاحتياطيات المعدنية",
        description: "حسابات فنية لحجوم الموارد وشكل المكامن وتقدير الاحتياطيات المحتملة بناءً على بيانات الحفر المؤكدة.",
      },
      {
        title: "أطر JORC / NI 43-101",
        description: "جمع البيانات والتوثيق الفني بما يتوافق مع إرشادات كود JORC ومعيار National Instrument 43-101 المعتمد.",
      },
    ],
    methodologyHeading: "منهجية الاستكشاف",
    methodologySubtext: "تمثيل هيكلي لتسلسل مراحل التقييم الاستكشافي:",
    methodologySteps: [
      {
        step: "01",
        title: "تقييم الموارد",
        description: "دراسة أولية للأدبيات الجيولوجية الإقليمية، وسجلات مناطق الامتياز، وبيانات الاستطلاع الميداني الأولي.",
      },
      {
        step: "02",
        title: "الاستقصاء الجيولوجي والجيوفيزيائي",
        description: "مسح جيولوجي سطحي تفصيلي مقترن بمسوحات جيوفيزيائية لتحديد الأهداف الجوفية المحتملة.",
      },
      {
        step: "03",
        title: "العينات الميدانية والاستكشاف",
        description: "أخذ عينات جيوكيميائية منتظمة وتنفيذ حفر لبابي استكشافي لاستخراج عينات الطبقات الصخرية الفعلية.",
      },
      {
        step: "04",
        title: "تقدير الاحتياطيات",
        description: "دمج بيانات المقاطع الصخرية وسجلات الحفر والنمذجة المكانية لتقدير الاحتياطيات المعدنية المحتملة.",
      },
    ],
    deliverablesHeading: "الإطار الفني والمخرجات",
    deliverablesSubtext: "البيانات والهياكل الفنية الأساسية الناتجة عن التقييم الاستكشافي:",
    deliverables: [
      "مخرجات المسح الجيولوجي والخرائط الميدانية للطبقات التكوينية",
      "مخرجات أخذ العينات الجيوكيميائية وخرائط تحديد مناطق الشذوذ",
      "مخرجات المسوح الجيوفيزيائية وبيانات المقاطع الجوفية",
      "معلومات الحفر اللبابي الاستكشافي، وسجلات الصخور، ونسب الاستخلاص",
      "نماذج تقدير الاحتياطيات المعدنية وحسابات حجوم الموارد المحتملة",
    ],
    operationalParametersHeading: "المحددات التشغيلية",
    operationalParameters: [
      { label: "منهجيات التحقق", value: "مسوحات جيولوجية وجيوكيميائية وجيوفيزيائية" },
      { label: "تقنية الحفر", value: "حفر لبابي ماسي استكشافي" },
      { label: "التوافق التنظيمي", value: "متوافق مع أطر كود JORC ومعيار NI 43-101" },
      { label: "محور القدرة", value: "تقييم باطن الأرض وتقدير الاحتياطيات" },
    ],
    connectedCapabilities: [
      {
        slug: "equipment-leasing",
        number: "02",
        title: "تأجير معدات التعدين واللوجستيات",
        summary: "حشد آليات الحفر والنقل الثقيلة لدعم الانتقال لمرحلة تطوير الموقع.",
      },
      {
        slug: "mining-project-management",
        number: "03",
        title: "إدارة مشاريع التعدين المتكاملة",
        summary: "تنفيذ شامل للمشاريع يغطي تخطيط المناجم والأعمال المدنية ومحطات المعالجة.",
      },
    ],
    cta: {
      headline: "هل أنت مستعد للشراكة في مشروعك التعديني أو الطاقوي القادم؟",
      subtext: "تواصل مع فريقنا الفني لمناقشة نطاق الاستكشاف، أو محددات الحفر اللبابي، أو أطر تقييم الاحتياطيات.",
      primaryText: "تقديم طلب عرض تشغيلي",
      secondaryText: "استكشف كافة القدرات",
    },
  },

  "equipment-leasing": {
    slug: "equipment-leasing",
    number: "02",
    eyebrow: "02 / المعدات واللوجستيات",
    title: "تأجير معدات التعدين واللوجستيات",
    heroDescription:
      "نشر آليات حفر التربة واستخراجها وتكسيرها عالية الجاهزية وفق نماذج تأجير رطبة وجافة مهيكلة، مدعومة بالصيانة الميكانيكية الوقائية.",
    overviewHeading:
      "نشر أساطيل الآليات الثقيلة عالية الجاهزية.",
    overviewText: [
      "توفر هلفول فنتشرز حلول تأجير مهيكلة للآليات الثقيلة لدعم استمرارية عمليات الاستخراج الميداني. يجمع قسم المعدات لدينا بين آليات متطورة ولوجستيات حشد منظمة ودعم ميكانيكي متواصل في مواقع العمل.",
      "وعلى مستوى قدرات الأسطول الأوسع، نحرص على جاهزية الأسطول العالية ومراقبة التيليماتكس لتحسين ساعات التشغيل الفعلي وضمان الاستقرار التشغيلي للمشاريع.",
    ],
    scopeHeading: "فئات المعدات والآليات",
    scopeSubtext: "الفئات الرئيسية للآليات الثقيلة المنشورة عبر مواقع الاستخراج والتعدين:",
    scopeItems: [
      {
        title: "الحفارات",
        description: "حفارات هيدروليكية ثقيلة مجهزة لاستخراج المصاطب، وإزالة الغطاء الصخري، وتحميل كميات هائلة من المواد.",
      },
      {
        title: "شاحنات النقل",
        description: "شاحنات تعدين ثقيلة صلبة ومفصلية مخصصة لنقل الحمولات الضخمة بكفاءة عبر طرق المناجم الوعرة.",
      },
      {
        title: "الجرافات (اللوادر)",
        description: "جرافات بعجلات عالية السعة لمناولة المواد، وإدارة أكوام الخام، وتغذية محطات التكسير الأولية.",
      },
      {
        title: "البلدوزرات",
        description: "بلدوزرات مجنزرة ثقيلة لأعمال حركة التربة، وتسوية المصاطب، وصيانة طرق النقل، وإزالة المخلفات.",
      },
      {
        title: "حفارات الآبار",
        description: "حفارات سطحية دورانية وحفارات تفجير لإعداد أنماط الحفر والتفجير والحفر اللبابي الاستكشافي.",
      },
      {
        title: "معدات التكسير والغربلة المتنقلة",
        description: "كسارات أولية مجنزرة ووحدات غربلة متعددة الطوابق لتكسير وتصنيف الخامات مباشرة داخل الموقع.",
      },
    ],
    methodologyHeading: "إجراءات تأجير المعدات",
    methodologySubtext: "تمثيل هيكلي لنماذج وإجراءات تأجير الأساطيل المتبعة لدينا:",
    methodologySteps: [
      {
        step: "01",
        title: "تحديد متطلبات المعدات",
        description: "تقييم أهداف الإنتاج في الموقع، وخصائص المواد الخام، وقدرات الأسطول اللازمة للعملية.",
      },
      {
        step: "02",
        title: "نموذج التأجير",
        description: "هيكلة الاتفاقية التجارية إما بنظام التأجير الرطب (مع المشغلين) أو التأجير الجاف (المعدات فقط).",
      },
      {
        step: "03",
        title: "التحشيد والتشغيل التجريبي",
        description: "التنسيق اللوجستي، والنقل إلى موقع المشروع، والتجهيز الميكانيكي، والبدء الفعلي بالتشغيل.",
      },
      {
        step: "04",
        title: "الدعم الميكانيكي",
        description: "صيانة وقائية مجدولة، وفنيون ميكانيكيون بالموقع، ومتابعة ساعات الجاهزية عبر التيليماتكس.",
      },
    ],
    deliverablesHeading: "مخرجات ودعم الأسطول",
    deliverablesSubtext: "المخرجات التشغيلية والوثائق الداعمة لعمليات نشر الأساطيل:",
    deliverables: [
      "عقود تأجير تجارية مهيكلة (شروط التأجير الرطب أو التأجير الجاف)",
      "جداول لوجستيات حشد المعدات ونشرها في موقع المشروع",
      "برامج الصيانة الوقائية المنتظمة والدعم الميكانيكي بالموقع",
      "سجلات تشغيل الأسطول وبيانات معدلات الاستخدام المدعومة بالتيليماتكس",
    ],
    operationalParametersHeading: "الإطار التشغيلي",
    operationalParameters: [
      { label: "صيغ التأجير", value: "تأجير رطب (مع المشغلين) / تأجير جاف (المعدات فقط)" },
      { label: "بروتوكول الصيانة", value: "صيانة وقائية مجدولة ودعم ميكانيكي بالموقع" },
      { label: "مراقبة الأسطول", value: "أنظمة التيليماتكس والتركيز على جاهزية الأسطول" },
      { label: "فئات الآليات", value: "حفر، نقل، تسوية، وتكسير وغربلة الخامات" },
    ],
    connectedCapabilities: [
      {
        slug: "mining-project-management",
        number: "03",
        title: "إدارة مشاريع التعدين المتكاملة",
        summary: "تنفيذ متكامل للمشاريع يدمج نشر المعدات ضمن الإدارة الشاملة للمنجم.",
      },
      {
        slug: "exploration-prospecting",
        number: "01",
        title: "استكشاف وتنقيب المعادن والنفط",
        summary: "مسح جيولوجي وحفر لبابي لتحديد خصائص الرواسب قبل مرحلة الاستخراج.",
      },
    ],
    cta: {
      headline: "هل أنت مستعد للشراكة في مشروعك التعديني أو الطاقوي القادم؟",
      subtext: "تواصل مع فريق عمليات الأساطيل لبحث جاهزية الآليات، أو صيغ التأجير، أو لوجستيات الحشد الميداني.",
      primaryText: "تقديم طلب عرض تشغيلي",
      secondaryText: "استكشف كافة القدرات",
    },
  },

  "mining-project-management": {
    slug: "mining-project-management",
    number: "03",
    eyebrow: "03 / إدارة المشاريع",
    title: "إدارة مشاريع التعدين المتكاملة",
    heroDescription:
      "إدارة تنفيذية متكاملة لعمليات التعدين السطحي—تشمل دراسات الجدوى الأولية، وتخطيط المناجم، والأعمال المدنية بالموقع، والبنية التحتية، وتحسين الإنتاج.",
    overviewHeading:
      "تنفيذ ميداني متكامل وحوكمة تشغيلية شاملة.",
    overviewText: [
      "تقدم هلفول فنتشرز إدارة متكاملة لمشاريع التعدين مصممة للتعامل مع التعقيدات الميدانية لتطوير المناجم. ومن خلال الربط بين التخطيط الهندسي وتشييد البنية التحتية والإشراف على الاستخراج، نوفر مسؤولية تشغيلية موحدة.",
      "يغطي نطاق إدارتنا التخطيط الفني، والأعمال المدنية بالموقع، وتشغيل محطات المعالجة الأولية، والتحسين المستمر لمعدلات الاستخراج لضمان إنجاز منضبط للمشروع.",
    ],
    scopeHeading: "نطاق مراحل دورة حياة المشروع",
    scopeSubtext: "المراحل التشغيلية الأساسية المدارة عبر عقود إدارة مشاريع التعدين المتكاملة:",
    scopeItems: [
      {
        title: "دراسات الجدوى الأولية",
        description: "تقييم فني وتجاري أولي للتحقق من جدوى الاستخراج وتحديد متطلبات رأس المال والتشغيل.",
      },
      {
        title: "تخطيط المناجم",
        description: "تصميم تسلسل الاستخراج الميداني، ومصاطب العمل، وهندسة الحفر، ومسارات نقل المواد.",
      },
      {
        title: "مسارات التراخيص",
        description: "تنسيق متطلبات التراخيص النظامية، والبيانات البيئية الأساسية، وتصاريح التشغيل المعتمدة.",
      },
      {
        title: "الأعمال المدنية بالموقع",
        description: "إنشاء طرق وصول وشاحنات النقل، وقنوات تصريف المياه، وتسوية المصاطب، ومناطق التحميل.",
      },
      {
        title: "البنية التحتية",
        description: "تجهيز واجهات إمداد الطاقة بالموقع، وورش الصيانة الميكانيكية، وإدارة المياه، والمرافق التشغيلية.",
      },
      {
        title: "تجهيز محطات المعالجة",
        description: "تركيب وتشغيل تجريبي لمنظومات التكسير والغربلة المتنقلة وتصنيف الخامات الأولية.",
      },
      {
        title: "إدارة الاستخراج",
        description: "إشراف تشغيلي يومي على عمليات الحفر والتفجير، والحفر الهيدروليكي، ودورات النقل والشحن.",
      },
      {
        title: "تحسين الإنتاج",
        description: "مراقبة مستمرة لمعدلات تدفق المواد، وكفاءة استخلاص الخام، وتقليل أوقات الدورات التشغيلية.",
      },
    ],
    methodologyHeading: "نهج إدارة المشاريع",
    methodologySubtext: "الهيكلية المتكاملة لدورة حياة تنفيذ مشاريع التعدين الميدانية:",
    methodologySteps: [
      {
        step: "01",
        title: "الجدوى الأولية وتخطيط المنجم",
        description: "التقييمات الفنية، وتصميم تسلسل الاستخراج، والتوافق مع متطلبات التراخيص النظامية.",
      },
      {
        step: "02",
        title: "تطوير الموقع والبنية التحتية",
        description: "تنفيذ الأعمال الترابية والمدنية، وطرق النقل، وقنوات التصريف، ومرافق الصيانة الميدانية.",
      },
      {
        step: "03",
        title: "تجهيز وتشغيل المعالجة",
        description: "تركيب واختبار تشغيل وحدات التكسير والغربلة ونقل المواد الأولية في الموقع.",
      },
      {
        step: "04",
        title: "إدارة الاستخراج والإنتاج",
        description: "الإشراف المباشر على الاستخراج، وتنسيق فرق العمل، وتحسين معدلات الإنتاج والتدفق اليومي.",
      },
    ],
    deliverablesHeading: "مخرجات إدارة المشروع",
    deliverablesSubtext: "المخرجات والوثائق الفنية المعتمدة المسلمة عبر مسار تنفيذ المشروع:",
    deliverables: [
      "خطط تطوير المنجم وجداول تسلسل الاستخراج الميداني",
      "ملفات الامتثال للتراخيص ووثائق التنسيق النظامي الرسمي",
      "البنية التحتية المدنية المنجزة بالموقع وطرق النقل وقواعد المحطات",
      "منظومات التكسير والغربلة المشغلة تجريبياً داخل الموقع",
      "وثائق تتبع الإنتاج اليومي وتقارير تحسين معدلات التدفق",
    ],
    operationalParametersHeading: "هيكلية التنفيذ",
    operationalParameters: [
      { label: "نموذج الإدارة", value: "مسؤولية تنفيذية متكاملة وموحدة للمشروع" },
      { label: "النطاق التشغيلي", value: "من دراسات الجدوى الأولية حتى الإنتاج الفعلي" },
      { label: "الأعمال المدنية بالموقع", value: "طرق، مصاطب، بنية تحتية، وقنوات تصريف" },
      { label: "منشآت المعالجة", value: "تكسير وغربلة ومناولة الخامات الأولية" },
    ],
    connectedCapabilities: [
      {
        slug: "equipment-leasing",
        number: "02",
        title: "تأجير معدات التعدين واللوجستيات",
        summary: "أساطيل معدات متخصصة تشكل الركيزة المادية لأعمال حركة التربة والاستخراج.",
      },
      {
        slug: "commodities-trading",
        number: "04",
        title: "تداول السلع المعدنية والهيدروكربونية",
        summary: "التسويق التجاري، والتعاقدات البيعية، واللوجستيات لتصدير الخامات المنتجة.",
      },
    ],
    cta: {
      headline: "هل أنت مستعد للشراكة في مشروعك التعديني أو الطاقوي القادم؟",
      subtext: "استشر فريق إدارة المشاريع لدينا لبحث إدارة المناجم، أو تطوير البنية التحتية، أو تشغيل المواقع.",
      primaryText: "تقديم طلب عرض تشغيلي",
      secondaryText: "استكشف كافة القدرات",
    },
  },

  "commodities-trading": {
    slug: "commodities-trading",
    number: "04",
    eyebrow: "04 / السلع المادية",
    title: "تداول السلع المعدنية والهيدروكربونية",
    heroDescription:
      "شراء مادي، والتحقق من الجودة، وإدارة اللوجستيات، وتعاقدات تجارية منظمة تخضع لقواعد Incoterms الدولية للسلع المعدنية ومشتقات الزيوت الصناعية المتخصصة.",
    overviewHeading:
      "تسويق تجاري منضبط وسلاسل إمداد موثوقة.",
    overviewText: [
      "يربط قسم التداول المادي في هلفول فنتشرز منتجي الموارد بالأسواق الصناعية من خلال تعاقدات تجارية مهيكلة. وندير عمليات الشراء، والتحقق من الجودة، وتنفيذ اللوجستيات الخاضعة لقواعد Incoterms المعتمدة.",
      "وبالإضافة إلى السلع المعدنية الخام، نوفر ترتيبات منظمة لمعالجة واستخراج المشتقات النفطية الصناعية المتخصصة.",
    ],
    scopeHeading: "نطاق العمل التجاري",
    scopeSubtext: "القدرات التجارية الأساسية التي تحكم تسويق وتداول السلع المادية:",
    scopeItems: [
      {
        title: "الشراء والتوريد",
        description: "شراء منظم وتعاقدات بيع متوافقة مباشرة مع الجداول التشغيلية لمنتجي الموارد.",
      },
      {
        title: "التحقق من الجودة",
        description: "أخذ عينات من الشحنات، وفحص المواصفات الفنية، وتوثيق الجودة لضمان الالتزام التعاقدي.",
      },
      {
        title: "اللوجستيات",
        description: "إدارة شاملة للنقل، وجدولة الشحن، والتخليص الجمركي، وتنسيق مواعيد التسليم المعتمدة.",
      },
      {
        title: "قواعد INCOTERMS",
        description: "تنفيذ العقود التجارية وفق قواعد Incoterms القياسية (FOB, CIF, CFR) لضمان انتقال واضح للمخاطر.",
      },
    ],
    methodologyHeading: "مسار المعاملات التجارية",
    methodologySubtext: "التسلسل التنفيذي المنظم لإبرام وتنفيذ عقود التداول المادي:",
    methodologySteps: [
      {
        step: "01",
        title: "الشراء والتوريد",
        description: "المفاوضات التجارية وهيكلة عقود الشراء والتسويق مع منتجي الموارد.",
      },
      {
        step: "02",
        title: "التحقق من الجودة",
        description: "تحليل ومطابقة المواصفات الفنية، والتحقق من العينات، والتوثيق المعتمد للجودة.",
      },
      {
        step: "03",
        title: "إدارة اللوجستيات",
        description: "تنسيق الشحن، وتخطيط مسارات النقل، والوثائق الجمركية، والشحن المجدول.",
      },
      {
        step: "04",
        title: "تنفيذ عقود Incoterms",
        description: "التسليم التعاقدي، وانتقال المسؤوليات والمخاطر، وتسوية المعاملات وفق الشروط التجارية المعتمدة.",
      },
    ],
    deliverablesHeading: "الوثائق والأطر التجارية",
    deliverablesSubtext: "المستندات التجارية القياسية المسلمة عبر معاملات التداول المادي:",
    deliverables: [
      "عقود المبيعات التجارية المهيكلة واتفاقيات الشراء والتسويق",
      "وثائق التحقق من الجودة وتقارير فحص المواصفات الفنية المعتمدة",
      "بوالص الشحن، وبيانات الحمولة، والملفات الجمركية الرسمية",
      "جداول التنسيق اللوجستي ووثائق التسليم الرسمية",
    ],
    operationalParametersHeading: "المحددات التجارية",
    operationalParameters: [
      { label: "الشروط التجارية", value: "FOB وCIF وCFR الخاضعة لقواعد Incoterms القياسية" },
      { label: "بروتوكول الجودة", value: "التحقق من المواصفات وأخذ عينات من الشحنات" },
      { label: "نطاق التنفيذ", value: "شراء، جودة، لوجستيات، وتنفيذ تعاقدي" },
      { label: "محور السلع", value: "المعادن ومشتقات الزيوت الصناعية المتخصصة" },
    ],
    byproductNote:
      "تقوم هلفول بترتيب معالجة واستخراج المشتقات النفطية، بما في ذلك زيت الوقود (FO)، وزيت الأفران، وزيت الأفران الثقيل (HFO)، والزيوت الهيدروكربونية المختلطة (MHO)، وذلك بالتعاون والشراكة مع منشآت معالجة معتمدة.",
    connectedCapabilities: [
      {
        slug: "exploration-prospecting",
        number: "01",
        title: "استكشاف وتنقيب المعادن والنفط",
        summary: "تقييم الرواسب المبكر وحساب الاحتياطيات لتحديد الإمكانات التعدينية.",
      },
      {
        slug: "mining-project-management",
        number: "03",
        title: "إدارة مشاريع التعدين المتكاملة",
        summary: "إدارة تنفيذية كاملة للمنجم تضمن معدلات إنتاج مستقرة للتسويق التجاري.",
      },
    ],
    cta: {
      headline: "هل أنت مستعد للشراكة في مشروعك التعديني أو الطاقوي القادم؟",
      subtext: "تواصل مع فريق التداول التجاري لبحث شراء السلع، أو هياكل التسويق، أو معالجة المشتقات النفطية.",
      primaryText: "تقديم طلب عرض تشغيلي",
      secondaryText: "استكشف كافة القدرات",
    },
  },
};
