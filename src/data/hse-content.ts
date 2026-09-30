/**
 * Hilful Ventures Pvt Ltd — HSE & Operational Standards Content
 *
 * Source of Truth: Hilful corporate mandate & approved operational documents.
 * Strict Constraint: Zero unsupported claims. No ISO/OSHA claims, no zero-harm claims,
 * no fabricated statistics or certifications. Institutional, measured tone.
 */

export interface HsePillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
}

export interface HseContent {
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    description: string;
  };
  principlesIntro: {
    sectionTag: string;
    headline: string;
    leadParagraph: string;
    supportingParagraph: string;
  };
  pillars: HsePillar[];
  operationalGovernance: {
    sectionTag: string;
    headline: string;
    description: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  disclosure: {
    tag: string;
    title: string;
    text: string;
  };
  closingCta: {
    headline: string;
    subtext: string;
    primaryCta: { text: string; href: string };
    secondaryCta: { text: string; href: string };
  };
}

export const hseContentEn: HseContent = {
  hero: {
    eyebrow: "HSE & OPERATIONAL STANDARDS",
    headline: "Workforce Safety & Site Operational Standards.",
    subheadline: "Institutional discipline across active extraction, fleet handling, and exploration sites.",
    description:
      "Hilful Ventures maintains structured operational protocols, equipment handling standards, and rigorous regulatory alignment across all mineral exploration, extraction, and logistics operations.",
  },
  principlesIntro: {
    sectionTag: "OPERATIONAL INTEGRITY",
    headline: "Systematic Safety & Host-Jurisdiction Regulatory Alignment.",
    leadParagraph:
      "In heavy industrial extraction and remote mineral prospecting, operational discipline is the bedrock of viable resource execution. We operate with a clear framework prioritizing workforce safety awareness, equipment integrity, and statutory compliance across every project site.",
    supportingParagraph:
      "Our operational standards are structured to align directly with host-jurisdiction mining laws, operational permit terms, and established site handling protocols.",
  },
  pillars: [
    {
      number: "01",
      title: "Workforce Safety & Operational Protocol",
      subtitle: "Disciplined Site Procedures",
      description:
        "Protecting personnel on active mining benches, drilling locations, and processing facilities through verified operational routines and clear lines of responsibility.",
      points: [
        "Implementation of verified site safety procedures and operational guidelines across all operational phases",
        "Operational safety awareness routines and equipment handling standards for heavy machinery operators",
        "Site safety coordination aligned with applicable statutory mining frameworks and host-country regulations",
        "Continuous focus on operational routines, hazard recognition, and team communication in remote environments",
      ],
    },
    {
      number: "02",
      title: "Regulatory Compliance & Site Standards",
      subtitle: "Permit Integrity & Governance",
      description:
        "Conducting field exploration, equipment deployment, and extraction activities in disciplined adherence to legal frameworks and statutory permit stipulations.",
      points: [
        "Rigorous adherence to statutory mining concessions and operational permit terms governing each active site",
        "Compliance with applicable regional regulatory standards and environmental baseline requirements",
        "Structured documentation and reporting in alignment with relevant resource ministry guidelines",
        "Standardized site operational standards enforced across all contractor and joint-venture working areas",
      ],
    },
  ],
  operationalGovernance: {
    sectionTag: "SITE EXECUTION FRAMEWORK",
    headline: "Operational Standards in Practice",
    description:
      "Structured focus areas that govern day-to-day activities on industrial project sites.",
    items: [
      {
        title: "Heavy Equipment Handling",
        description:
          "Enforcing operational checklists and scheduled maintenance routines to ensure safe mechanical operation and minimize equipment failure risks.",
      },
      {
        title: "Site Access & Movement Control",
        description:
          "Structuring active extraction benches, haulage roads, and processing zones with designated traffic flows and restricted-access protocols.",
      },
      {
        title: "Permit & Statutory Compliance",
        description:
          "Maintaining active oversight of statutory requirements, mineral concessions, and host-authority inspection standards throughout the project lifecycle.",
      },
      {
        title: "Operational Coordination",
        description:
          "Ensuring clear communication and unified safety protocols among geological teams, equipment operators, and site project managers.",
      },
    ],
  },
  disclosure: {
    tag: "STATUTORY GOVERNANCE DISCLOSURE",
    title: "Institutional Compliance Notice",
    text: "Operational policies, site safety guidelines, and permit terms are implemented in accordance with host-jurisdiction statutory requirements. Formal documentation and site-specific operational plans are administered in coordination with relevant authorities and project partners.",
  },
  closingCta: {
    headline: "Discuss Site Requirements or Project Execution",
    subtext:
      "Our technical and operational management teams are available to discuss site standards, equipment deployment, or project management requirements.",
    primaryCta: { text: "Request an Operational Proposal", href: "/contact" },
    secondaryCta: { text: "View Operational Capabilities", href: "/services" },
  },
};

export const hseContentAr: HseContent = {
  hero: {
    eyebrow: "الصحة والسلامة والمعايير التشغيلية",
    headline: "سلامة الكوادر والمعايير التشغيلية في المواقع.",
    subheadline: "انضباط مؤسسي عبر مواقع الاستكشاف، واستخراج الموارد، وإدارة الأساطيل التعدينية.",
    description:
      "تلتزم شركة هلفول فنتشرز المحدودة بتطبيق بروتوكولات تشغيلية منظمة، ومعايير للتعامل مع الآليات الثقيلة، والامتثال التنظيمي الصارم في كافة عمليات استكشاف المعادن والتعدين واللوجستيات.",
  },
  principlesIntro: {
    sectionTag: "النزاهة التشغيلية",
    headline: "سلامة منهجية وامتثال تنظيمي كامل مع الجهات المختصة.",
    leadParagraph:
      "في مشاريع الاستخراج التعديني الثقيل والاستكشاف الميداني في المناطق النائية، يشكل الانضباط التشغيلي الأساس الحقيقي لنجاح العمليات. نعتمد إطار عمل واضحاً يضع سلامة الكوادر الميدانية والتعامل السليم مع المعدات والالتزام بالأنظمة على رأس الأولويات.",
    supportingParagraph:
      "صُممت معاييرنا التشغيلية لتتوافق بصورة مباشرة مع قوانين التعدين المعمول بها في الدول المستضيفة، وشروط تصاريح التشغيل، ومعايير إدارة المواقع المعتمدة.",
  },
  pillars: [
    {
      number: "01",
      title: "سلامة الكوادر والبروتوكول التشغيلي",
      subtitle: "إجراءات ميدانية منضبطة",
      description:
        "حماية الكوادر العاملة في منصات التعدين ومواقع الحفر ومرافق المعالجة من خلال مسارات تشغيلية واضحة ومسؤوليات محددة.",
      points: [
        "تطبيق إجراءات سلامة الموقع وإرشادات التشغيل المعتمدة عبر كافة مراحل المشروع",
        "تعزيز الوعي بالسلامة التشغيلية ومعايير التعامل مع الآليات والمعدات الثقيلة",
        "تنسيق سلامة المواقع بما يتماشى مع الأنظمة التعدينية والقوانين المعمول بها",
        "التركيز المستمر على الانضباط الميداني وإدارة المخاطر والتواصل الفعال بين الفرق",
      ],
    },
    {
      number: "02",
      title: "الامتثال التنظيمي ومعايير المواقع",
      subtitle: "نزاهة التراخيص والحوكمة",
      description:
        "إجراء أعمال الاستكشاف، وتأجير الآليات، والأنشطة التعدينية بانضباط كامل وفق الأطر القانونية واشتراطات التراخيص النظامية.",
      points: [
        "الالتزام الصارم ببنود تصاريح التشغيل والامتيازات التعدينية في كل موقع نشط",
        "مواءمة العمليات مع المتطلبات التنظيمية والمعايير البيئية المعتمدة محلياً",
        "إعداد وتوثيق التقارير الدورية بالتوافق مع إرشادات الجهات المنظمة لقطاع الموارد",
        "تطبيق معايير تشغيلية موحدة في المواقع الميدانية لضمان جودة الأداء والانضباط",
      ],
    },
  ],
  operationalGovernance: {
    sectionTag: "إطار التنفيذ الميداني",
    headline: "المعايير التشغيلية قيد التطبيق",
    description:
      "محاور تركيز أساسية تحكم الأنشطة اليومية في مواقع المشاريع الصناعية والتعدينية.",
    items: [
      {
        title: "التعامل مع المعدات الثقيلة",
        description:
          "تطبيق قوائم الفحص التشغيلي والصيانة الوقائية الدورية لضمان كفاءة الآليات والحد من المخاطر الميكانيكية.",
      },
      {
        title: "تنظيم الحركة وإدارة المواقع",
        description:
          "تخطيط مسارات النقل ومناطق الاستخراج ومراكز المعالجة ببروتوكولات حركة واضحة ومحددة.",
      },
      {
        title: "الامتثال للتصاريح والأنظمة",
        description:
          "المتابعة المستمرة للمتطلبات القانونية والامتيازات التعدينية ومعايير التفتيش الصادرة عن الجهات المختصة.",
      },
      {
        title: "التنسيق التشغيلي الموحد",
        description:
          "ضمان التواصل المباشر وتوحيد بروتوكولات العمل بين الجيولوجيين ومشغلي الآليات وفرق إدارة المشاريع.",
      },
    ],
  },
  disclosure: {
    tag: "إشعار الامتثال التنظيمي",
    title: "ملاحظة الحوكمة والأنظمة",
    text: "يتم تطبيق السياسات التشغيلية وإرشادات السلامة وشروط التراخيص وفقاً للأنظمة واللوائح الصادرة عن الجهات الحكومية في مناطق العمل. وتدار الوثائق الرسمية وخطط التشغيل بالتنسيق مع الجهات المعنية وشركاء المشاريع.",
  },
  closingCta: {
    headline: "جاهز لبحث متطلبات موقعك أو مشروعك التعديني؟",
    subtext:
      "فرقنا الفنية والإدارية مستعدة لمناقشة معايير المواقع، أو نشر الأساطيل، أو متطلبات الإدارة المتكاملة للمشاريع.",
    primaryCta: { text: "طلب مقترح تشغيلي", href: "/contact" },
    secondaryCta: { text: "استعراض القدرات التشغيلية", href: "/services" },
  },
};
