export interface GovernorateData {
  id: string;
  nameEn: string;
  nameAr: string;
  population: number;
  mobileSubscribers: number;
  mobileInternetSubscribers: number;
  ftthSubscribers: number;
  internetPenetration: number;
  smartphoneUsage: number;
  computerUsage: number;
  insightEn: string;
  insightAr: string;
  svgPathId: string;
}

export interface NationalData {
  year2022: {
    population: number;
    internetUsers: number;
    mobileSubscribers: number;
    ftthSubscribers: number;
  };
  year2024: {
    population: number;
    internetUsers: number;
    mobileSubscribers: number;
    ftthSubscribers: number;
  };
}

export const NATIONAL_STATS: NationalData = {
  year2022: {
    population: 42248883,
    internetUsers: 34144000, // 78.7% - 84.7% penetration
    mobileSubscribers: 44146973, // 104.5% density
    ftthSubscribers: 350000,
  },
  year2024: {
    population: 44414794,
    internetUsers: 38500000, // ~86.7% penetration
    mobileSubscribers: 40181329, // 90.5% density
    ftthSubscribers: 1114221, // Over 1.11M optical access lines (COSIT Table 4)
  },
};

export const GOVERNORATES: GovernorateData[] = [
  {
    id: "baghdad",
    nameEn: "Baghdad",
    nameAr: "بغداد",
    population: 9498480,
    mobileSubscribers: 8317666,
    mobileInternetSubscribers: 5251251,
    ftthSubscribers: 26260,
    internetPenetration: 98.0,
    smartphoneUsage: 98.0,
    computerUsage: 29.1,
    insightEn: "Largest digital market in Iraq with 8.3M mobile lines and highest social media and mobile commerce density.",
    insightAr: "أكبر سوق رقمي في العراق بأكثر من 8.3 مليون اشتراك نقال وأعلى كثافة للتجارة والتطبيقات.",
    svgPathId: "IQ-BG",
  },
  {
    id: "nineveh",
    nameEn: "Nineveh",
    nameAr: "نينوى",
    population: 4345445,
    mobileSubscribers: 2802838,
    mobileInternetSubscribers: 1440607,
    ftthSubscribers: 45000,
    internetPenetration: 91.3,
    smartphoneUsage: 91.3,
    computerUsage: 10.3,
    insightEn: "Second largest population center undergoing rapid digital reconstruction and youth education adoption.",
    insightAr: "ثاني أكبر مركز سكاني في العراق يشهد إعادة إعمار رقمي وتوسعاً في استخدام التعليم الإلكتروني.",
    svgPathId: "IQ-NI",
  },
  {
    id: "basrah",
    nameEn: "Basrah",
    nameAr: "البصرة",
    population: 3388399,
    mobileSubscribers: 2780000,
    mobileInternetSubscribers: 1747609,
    ftthSubscribers: 23000,
    internetPenetration: 96.1,
    smartphoneUsage: 96.1,
    computerUsage: 12.6,
    insightEn: "Economic powerhouse of the south with high commerce and expanding logistics and supply-chain tech.",
    insightAr: "العاصمة الاقتصادية الجنوبية ذات نشاط تجاري عالي وفرص واعدة للوجستيات والتجارة الإلكترونية.",
    svgPathId: "IQ-BA",
  },
  {
    id: "erbil",
    nameEn: "Erbil",
    nameAr: "أربيل",
    population: 2250000,
    mobileSubscribers: 2100000,
    mobileInternetSubscribers: 1250000,
    ftthSubscribers: 180000,
    internetPenetration: 91.2,
    smartphoneUsage: 91.2,
    computerUsage: 48.0,
    insightEn: "Highest FTTH fiber density and IT corporate headquarters concentration in northern Iraq.",
    insightAr: "أعلى كثافة لشبكات الألياف الضوئية FTTH ومركز رئيسي لشركات تكنولوجيا المعلومات في الإقليم.",
    svgPathId: "IQ-AR",
  },
  {
    id: "sulaymaniyah",
    nameEn: "Sulaymaniyah",
    nameAr: "السليمانية",
    population: 2150000,
    mobileSubscribers: 1950000,
    mobileInternetSubscribers: 1064718,
    ftthSubscribers: 140000,
    internetPenetration: 85.0,
    smartphoneUsage: 85.0,
    computerUsage: 20.6,
    insightEn: "Vibrant university ecosystem with strong software development talent and digital services adoption.",
    insightAr: "بيئة جامعية نشطة تتمتع بكوادر برمجية متميزة وإقبال متزايد على الخدمات الرقمية.",
    svgPathId: "IQ-SU",
  },
  {
    id: "duhok",
    nameEn: "Duhok",
    nameAr: "دهوك",
    population: 1700000,
    mobileSubscribers: 1400000,
    mobileInternetSubscribers: 720000,
    ftthSubscribers: 65000,
    internetPenetration: 94.3,
    smartphoneUsage: 94.3,
    computerUsage: 37.4,
    insightEn: "Strategic trade border location with reliable infrastructure and growing mobile app adoption.",
    insightAr: "موقع حدودي تجاري استراتيجي ببنية تحتية رقمية مستقرة ونمو ملحوظ في تطبيقات الهواتف.",
    svgPathId: "IQ-DA",
  },
  {
    id: "kirkuk",
    nameEn: "Kirkuk",
    nameAr: "كركوك",
    population: 1861546,
    mobileSubscribers: 1631246,
    mobileInternetSubscribers: 1157937,
    ftthSubscribers: 21000,
    internetPenetration: 89.4,
    smartphoneUsage: 89.4,
    computerUsage: 21.6,
    insightEn: "Multilingual demographic bridge with balanced mobile usage across diverse community segments.",
    insightAr: "جسر ديموغرافي متعدد الثقافات بتوازن ملحوظ في استخدام منصات التواصل والتجارة الرقمية.",
    svgPathId: "IQ-KI",
  },
  {
    id: "diyala",
    nameEn: "Diyala",
    nameAr: "ديالى",
    population: 1876581,
    mobileSubscribers: 1392337,
    mobileInternetSubscribers: 966898,
    ftthSubscribers: 40000,
    internetPenetration: 85.8,
    smartphoneUsage: 85.8,
    computerUsage: 12.1,
    insightEn: "High proximity to Baghdad accelerating agricultural tech and regional delivery networks.",
    insightAr: "قرب جغرافي مباشر من العاصمة يعزز تطبيقات التجارة الزراعية وشبكات التوصيل السريع.",
    svgPathId: "IQ-DI",
  },
  {
    id: "anbar",
    nameEn: "Al-Anbar",
    nameAr: "الأنبار",
    population: 2064003,
    mobileSubscribers: 2171956,
    mobileInternetSubscribers: 1201423,
    ftthSubscribers: 30000,
    internetPenetration: 87.1,
    smartphoneUsage: 87.1,
    computerUsage: 14.0,
    insightEn: "Expansive geographic region with high wireless reliance and rapidly expanding young digital demographic.",
    insightAr: "أكبر المحافظات مساحة، تعتمد بكثافة على الاتصال اللاسلكي وتشهد نمواً شبابياً كبيراً.",
    svgPathId: "IQ-AN",
  },
  {
    id: "babylon",
    nameEn: "Babylon",
    nameAr: "بابل",
    population: 2405773,
    mobileSubscribers: 2174385,
    mobileInternetSubscribers: 1188906,
    ftthSubscribers: 30355,
    internetPenetration: 89.9,
    smartphoneUsage: 89.9,
    computerUsage: 7.2,
    insightEn: "Central transit artery connecting Baghdad to the south, prime corridor for logistics and e-commerce.",
    insightAr: "شريان العبور الأوسط الرابط بين بغداد والجنوب، محور رئيسي لخدمات التجارة والنقل اللوجستي.",
    svgPathId: "IQ-BB",
  },
  {
    id: "kerbela",
    nameEn: "Kerbela",
    nameAr: "كربلاء",
    population: 1419817,
    mobileSubscribers: 1710384,
    mobileInternetSubscribers: 1071486,
    ftthSubscribers: 35496,
    internetPenetration: 91.9,
    smartphoneUsage: 91.9,
    computerUsage: 13.4,
    insightEn: "Massive seasonal tourism driving demand for smart hospitality, e-payments, and digital maps.",
    insightAr: "حركة سياحية وزيارية مليونية تخلق طلباً هائلاً على حلول الضيافة الذكية والدفع الإلكتروني.",
    svgPathId: "IQ-KA",
  },
  {
    id: "najaf",
    nameEn: "Najaf",
    nameAr: "النجف",
    population: 1714415,
    mobileSubscribers: 1650000,
    mobileInternetSubscribers: 1160174,
    ftthSubscribers: 30000,
    internetPenetration: 90.9,
    smartphoneUsage: 90.9,
    computerUsage: 17.6,
    insightEn: "Major commercial and cultural crossroads with high mobile internet usage and e-payment growth.",
    insightAr: "ملتقى تجاري وثقافي عالي النشاط يسجل نمواً لافتاً في استخدام محافظ الدفع والتسوق الإلكتروني.",
    svgPathId: "IQ-NA",
  },
  {
    id: "wasit",
    nameEn: "Wasit",
    nameAr: "واسط",
    population: 1606225,
    mobileSubscribers: 997503,
    mobileInternetSubscribers: 613804,
    ftthSubscribers: 20000,
    internetPenetration: 91.4,
    smartphoneUsage: 91.4,
    computerUsage: 46.5,
    insightEn: "Solid academic base with notable computer literacy rates supporting regional remote work.",
    insightAr: "قاعدة تعليمية متينة بنسب لافتة في استخدام الحواسيب تؤهلها للعمل التقني عن بعد.",
    svgPathId: "IQ-WA",
  },
  {
    id: "salah_al_deen",
    nameEn: "Salah Al-Deen",
    nameAr: "صلاح الدين",
    population: 1858447,
    mobileSubscribers: 1483282,
    mobileInternetSubscribers: 1052811,
    ftthSubscribers: 25000,
    internetPenetration: 89.1,
    smartphoneUsage: 89.1,
    computerUsage: 36.7,
    insightEn: "Growing regional student population with expanding mobile broadband coverage.",
    insightAr: "شريحة طلابية متنامية مع تغطية إنترنت خلوية تتوسع بشكل ملحوظ.",
    svgPathId: "IQ-SD",
  },
  {
    id: "qadisiya",
    nameEn: "Al-Qadisiya",
    nameAr: "القادسية (الديوانية)",
    population: 1504063,
    mobileSubscribers: 1200000,
    mobileInternetSubscribers: 740256,
    ftthSubscribers: 25000,
    internetPenetration: 88.9,
    smartphoneUsage: 88.9,
    computerUsage: 27.1,
    insightEn: "Emerging digital market with high youth engagement in social platforms and delivery services.",
    insightAr: "سوق رقمي صاعد بنشاط شبابي واضح في استخدام منصات التواصل وتطبيقات التوصيل.",
    svgPathId: "IQ-QA",
  },
  {
    id: "muthanna",
    nameEn: "Al-Muthanna",
    nameAr: "المثنى (السماوة)",
    population: 948749,
    mobileSubscribers: 820000,
    mobileInternetSubscribers: 469047,
    ftthSubscribers: 20000,
    internetPenetration: 84.4,
    smartphoneUsage: 84.4,
    computerUsage: 14.2,
    insightEn: "Untapped market with high mobile adoption and growth potential for mobile micro-finance.",
    insightAr: "سوق واعدة لم تستغل بالكامل بعد، توفر فرصاً لخدمات التمويل والمحافظ الرقمية.",
    svgPathId: "IQ-MU",
  },
  {
    id: "thi_qar",
    nameEn: "Thi-Qar",
    nameAr: "ذي قار (الناصرية)",
    population: 2440887,
    mobileSubscribers: 1850000,
    mobileInternetSubscribers: 1081091,
    ftthSubscribers: 20000,
    internetPenetration: 90.1,
    smartphoneUsage: 90.1,
    computerUsage: 3.1,
    insightEn: "High youth demographic and smartphone usage contrasted with mobile-first app preferences.",
    insightAr: "كثافة سكانية شبابية عالية مع تركيز شبه كامل على تطبيقات الهواتف الذكية.",
    svgPathId: "IQ-DQ",
  },
  {
    id: "missan",
    nameEn: "Missan",
    nameAr: "ميسان (العمارة)",
    population: 1296276,
    mobileSubscribers: 1050000,
    mobileInternetSubscribers: 564940,
    ftthSubscribers: 20000,
    internetPenetration: 92.6,
    smartphoneUsage: 92.6,
    computerUsage: 29.4,
    insightEn: "Strong trade ties with regional markets and consistent growth in mobile internet lines.",
    insightAr: "نشاط تجاري متزايد ونمو مستمر في خطوط إنترنت الهاتف النقال.",
    svgPathId: "IQ-MA",
  },
];

// Internet Usage Purposes (2022 Report Table 1-17)
export const INTERNET_PURPOSES = [
  { id: "social", nameEn: "Social Media", nameAr: "التواصل الاجتماعي", percent: 31, color: "#8B5CF6" },
  { id: "communication", nameEn: "Communication", nameAr: "الاتصالات والرسائل", percent: 23, color: "#A78BFA" },
  { id: "entertainment", nameEn: "Entertainment", nameAr: "الترفيه والألعاب", percent: 14, color: "#C4B5FD" },
  { id: "education", nameEn: "Education", nameAr: "التعليم والبحث", percent: 11, color: "#DDD6FE" },
  { id: "ecommerce", nameEn: "E-commerce", nameAr: "التجارة والتسوق", percent: 13, color: "#EDE9FE" },
  { id: "other", nameEn: "Other", nameAr: "خدمات أخرى", percent: 8, color: "#7C3AED" },
];

// Market Segmentation AI Clusters
export const MARKET_SEGMENTS = [
  {
    id: "segment1",
    nameEn: "Segment 1",
    labelEn: "Mobile-First Social Consumers",
    nameAr: "الشريحة 1",
    labelAr: "مستهلكو الموبايل والتواصل",
    color: "#8B5CF6",
    borderColor: "rgba(139, 92, 246, 0.4)",
    cx: 48,
    cy: 62,
    rx: 40,
    ry: 26,
    rotation: -25,
    points: [
      { x: 35, y: 55 }, { x: 42, y: 70 }, { x: 48, y: 58 }, { x: 55, y: 66 },
      { x: 40, y: 62 }, { x: 52, y: 75 }, { x: 46, y: 50 }, { x: 58, y: 56 }
    ],
  },
  {
    id: "segment2",
    nameEn: "Segment 2",
    labelEn: "Digital Natives & Tech Hubs",
    nameAr: "الشريحة 2",
    labelAr: "المجتمع الرقمي ومراكز التقنية",
    color: "#10B981",
    borderColor: "rgba(16, 185, 129, 0.4)",
    cx: 72,
    cy: 78,
    rx: 34,
    ry: 22,
    rotation: 15,
    points: [
      { x: 65, y: 75 }, { x: 70, y: 84 }, { x: 76, y: 72 }, { x: 80, y: 80 }, { x: 74, y: 77 }
    ],
  },
  {
    id: "segment3",
    nameEn: "Segment 3",
    labelEn: "Emerging Traditional Adopters",
    nameAr: "الشريحة 3",
    labelAr: "المستخدمون الجدد والتقليديون",
    color: "#F59E0B",
    borderColor: "rgba(245, 158, 11, 0.4)",
    cx: 70,
    cy: 35,
    rx: 38,
    ry: 24,
    rotation: -10,
    points: [
      { x: 62, y: 32 }, { x: 68, y: 40 }, { x: 74, y: 28 }, { x: 78, y: 38 }, { x: 66, y: 36 }
    ],
  },
];

// Top Opportunity Areas
export const TOP_OPPORTUNITIES = [
  {
    id: 1,
    titleEn: "FinTech & Digital Wallets",
    titleAr: "التقنيات المالية والمحافظ الرقمية",
    icon: "trending-up",
    score: 94,
    color: "#8B5CF6",
    descEn: "99.7% Cash-on-Delivery in 2022 shifting rapidly toward e-wallets (ZainCash, FIB, Qi).",
    descAr: "تحول تاريخي سريع من الكاش إلى المحافظ الإلكترونية والدفع الرقمي.",
  },
  {
    id: 2,
    titleEn: "E-Commerce & Quick Delivery",
    titleAr: "التجارة الإلكترونية والتوصيل السريع",
    icon: "shopping-cart",
    score: 88,
    color: "#8B5CF6",
    descEn: "Shift from unorganized social commerce to structured delivery marketplaces.",
    descAr: "انتقال الطلب من صفحات التواصل إلى تطبيقات ومتاجر التوصيل المنظمة.",
  },
  {
    id: 3,
    titleEn: "EdTech & STEM Upskilling",
    titleAr: "التعليم التكنولوجي وتطوير المهارات",
    icon: "graduation-cap",
    score: 79,
    color: "#8B5CF6",
    descEn: "Youngest demographic in the region seeking high-demand software engineering skills.",
    descAr: "أكبر فئة شبابية في المنطقة تبحث عن مهارات البرمجة والتقنيات الحديثة.",
  },
  {
    id: 4,
    titleEn: "FTTH & High-Speed Cloud Services",
    titleAr: "النفاذ الضوئي FTTH والخدمات السحابية",
    icon: "wifi",
    score: 75,
    color: "#8B5CF6",
    descEn: "+218% FTTH growth from 2022 to 2024 driving demand for home streaming and SaaS.",
    descAr: "نمو الكيبل الضوئي بنسبة +218% يفتح الباب لخدمات السحابة والمحتوى فائق السرعة.",
  },
  {
    id: 5,
    titleEn: "B2B Supply Chain & GovTech",
    titleAr: "أتمتة سلاسل التوريد والحلول المؤسسية",
    icon: "settings",
    score: 68,
    color: "#8B5CF6",
    descEn: "Modernizing corporate invoicing, merchant POS, and logistics dispatching.",
    descAr: "أتمتة الفوترة، ونقاط البيع للتجار، والربط اللوجستي بين الشركات.",
  },
];
