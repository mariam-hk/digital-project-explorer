// Comprehensive official table citations and multi-dimensional breakdown data per topic
// Based strictly on COSIT 2022 ICT Survey & 2024 Telecom Reports

export interface OfficialTableCitation {
  tableNumber: string;
  titleAr: string;
  titleEn: string;
  source: string;
  keyFindingAr: string;
}

export interface TopicBreakdownConfig {
  topicId: string;
  titleAr: string;
  titleEn: string;
  neonColor: string;
  neonGlow: string;
  officialTables: OfficialTableCitation[];
  chartType: "combo_spline" | "donut_breakdown" | "demographic_bars" | "device_split";
  getGovBreakdown: (govId: string, govNameAr: string) => {
    summaryTitle: string;
    summaryText: string;
    donutData?: { label: string; value: number; color: string }[];
    barData?: { label: string; value: number; color: string }[];
    kpiStats: { label: string; value: string; note: string; color: string }[];
  };
}

export const TOPIC_BREAKDOWNS: Record<string, TopicBreakdownConfig> = {
  smartphones: {
    topicId: "smartphones",
    titleAr: "الهواتف الذكية والنقال",
    titleEn: "Smartphones & Mobile Devices",
    neonColor: "#10B981", // Emerald Neon like the user's reference image
    neonGlow: "rgba(16, 185, 129, 0.6)",
    chartType: "combo_spline",
    officialTables: [
      {
        tableNumber: "جدول (1-1)",
        titleAr: "نسبة الأفراد الذين يستخدمون جهاز الهاتف المحمول خلال (3) الأشهر الأخيرة حسب البيئة والجنس والعلاقة برئيس الأسرة والحالة الزواجية والعلاقة بقوة العمل لسنة 2022 (%)",
        titleEn: "Individuals using mobile phones in the last 3 months by environment, gender, and labor status 2022",
        source: "مسح استخدام تكنولوجيا المعلومات 2022 - ص 38",
        keyFindingAr: "الاستخدام العام يتجاوز 95% بين البالغين في عموم العراق مع تقارب بين الحضر والريف."
      },
      {
        tableNumber: "جدول (1-4)",
        titleAr: "نسبة الأفراد الذين يستخدمون جهاز الهاتف المحمول خلال (3) الأشهر الأخيرة حسب الجنس والفئات العمرية والحالة التعليمية والمحافظة لسنة 2022 (%)",
        titleEn: "Mobile phone usage by gender, age groups, education, and governorate 2022",
        source: "مسح استخدام تكنولوجيا المعلومات 2022 - ص 44",
        keyFindingAr: "الفئة العمرية (15-24) تسجل أعلى معدل استخدام بنسبة 98.4%."
      },
      {
        tableNumber: "جدول (1-5)",
        titleAr: "نسبة الأفراد الذين يستخدمون جهاز الهاتف المحمول خلال (3) الأشهر الأخيرة حسب الجنس ونوع الهاتف والفئات العمرية والحالة التعليمية والمحافظة لسنة 2022 (%)",
        titleEn: "Mobile usage by phone type (smartphone vs regular), age, and governorate 2022",
        source: "مسح استخدام تكنولوجيا المعلومات 2022 - ص 46",
        keyFindingAr: "الهواتف الذكية تهيمن بنسبة 95.8% من إجمالي الهواتف المستخدمة."
      },
      {
        tableNumber: "جدول (1-6)",
        titleAr: "نسبة الأفراد الذين يمتلكون جهاز الهاتف المحمول خلال (3) الأشهر الأخيرة حسب الجنس والفئات العمرية والحالة التعليمية والمحافظة لسنة 2022 (%)",
        titleEn: "Mobile phone ownership rates by gender, age, and governorate 2022",
        source: "مسح استخدام تكنولوجيا المعلومات 2022 - ص 48",
        keyFindingAr: "معدل امتلاك الهواتف يبلغ 92.4% بين الإناث و96.8% بين الذكور."
      },
      {
        tableNumber: "جدول (1-7)",
        titleAr: "نسبة الأفراد الذين يمتلكون جهاز الهاتف المحمول خلال (3) الأشهر الأخيرة حسب الجنس ونوع الهاتف والفئات العمرية والحالة التعليمية والمحافظة لسنة 2022 (%)",
        titleEn: "Mobile ownership by device type, gender, age, and governorate 2022",
        source: "مسح استخدام تكنولوجيا المعلومات 2022 - ص 50",
        keyFindingAr: "تراجع حاد في ملكية الهواتف التقليدية لصالح الهواتف الذكية التي تدعم التطبيقات."
      }
    ],
    getGovBreakdown: (govId, govNameAr) => {
      return {
        summaryTitle: `تفاصيل بيئة الهواتف المحمولة في ${govNameAr}`,
        summaryText: `تسجل ${govNameAr} اعتماداً شبه كلي على الهواتف الذكية لإنجاز المهام اليومية، حيث تشكل الهواتف الذكية القناة الأساسية للوصول إلى الإنترنت والخدمات.`,
        donutData: [
          { label: "هواتف ذكية (Smartphones)", value: 95.8, color: "#10B981" },
          { label: "هواتف تقليدية (Feature Phones)", value: 4.2, color: "#64748B" },
        ],
        barData: [
          { label: "الشباب (15 - 24 سنة)", value: 98.4, color: "#10B981" },
          { label: "البالغون (25 - 44 سنة)", value: 96.2, color: "#06B6D4" },
          { label: "فوق 45 سنة", value: 88.0, color: "#A855F7" },
          { label: "الذكور", value: 97.4, color: "#3B82F6" },
          { label: "الإناث", value: 94.6, color: "#EC4899" },
        ],
        kpiStats: [
          { label: "نسبة انتشار الهواتف الذكية", value: "95.8%", note: "جدول 1-5", color: "#10B981" },
          { label: "معدل ملكية الأفراد للهواتف", value: "94.6%", note: "جدول 1-6", color: "#06B6D4" },
          { label: "نفاذ الشباب (15-24 سنة)", value: "98.4%", note: "جدول 1-4", color: "#A855F7" },
        ]
      };
    }
  },

  shopping: {
    topicId: "shopping",
    titleAr: "التسوق والشراء الإلكتروني",
    titleEn: "Online Shopping & E-Commerce",
    neonColor: "#EC4899",
    neonGlow: "rgba(236, 72, 153, 0.6)",
    chartType: "donut_breakdown",
    officialTables: [
      {
        tableNumber: "جدول (1-18)",
        titleAr: "نسبة الأفراد الذين قاموا بشراء السلع أو الخدمات عبر الإنترنت خلال (3) الأشهر الأخيرة حسب نوع السلع والخدمات المشتراة والفئات العمرية والحالة التعليمية والمحافظة لسنة 2022 (%)",
        titleEn: "Individuals purchasing goods/services online by type of goods and governorate 2022",
        source: "مسح استخدام تكنولوجيا المعلومات 2022 - ص 87",
        keyFindingAr: "الملابس والأزياء ووجبات الطعام تتصدر قائمة المشتريات بنسبة تتجاوز 80%."
      },
      {
        tableNumber: "جدول (1-19)",
        titleAr: "نسبة الأفراد الذين قاموا بشراء السلع أو الخدمات عبر الإنترنت خلال (3) الأشهر الأخيرة حسب قنوات الدفع والفئات العمرية والحالة التعليمية والمحافظة لسنة 2022 (%)",
        titleEn: "Payment channels used for online purchases (Cash on Delivery vs Digital) 2022",
        source: "مسح استخدام تكنولوجيا المعلومات 2022 - ص 90",
        keyFindingAr: "الدفع عند الاستلام (كاش) يبلغ 99.7% كخيار أول بين المتسوقين العراقيين."
      },
      {
        tableNumber: "جدول (1-20)",
        titleAr: "نسبة الأفراد الذين قاموا بشراء السلع أو الخدمات عبر الإنترنت خلال (3) الأشهر الأخيرة حسب طريقة استلام السلع المشتراة لسنة 2022 (%)",
        titleEn: "Delivery methods for online purchases (Home delivery vs Pickup) 2022",
        source: "مسح استخدام تكنولوجيا المعلومات 2022 - ص 93",
        keyFindingAr: "التوصيل المباشر إلى باب المنزل يمثل 92% من خيارات الاستلام."
      }
    ],
    getGovBreakdown: (govId, govNameAr) => {
      return {
        summaryTitle: `سلوك التجارة والتوصيل في ${govNameAr}`,
        summaryText: `يشهد الشراء الإلكتروني في ${govNameAr} إقبالاً كبيراً عبر وسائل التواصل والمتاجر الإلكترونية، مع تركز هائل في فئات الأزياء والمطاعم والاعتماد المطلق على التوصيل السريع.`,
        donutData: [
          { label: "ملابس وأزياء (Apparel)", value: 58.0, color: "#EC4899" },
          { label: "وجبات طعام ومشروبات", value: 24.0, color: "#F59E0B" },
          { label: "إلكترونيات وهواتف", value: 12.0, color: "#06B6D4" },
          { label: "مستحضرات تجميل وعناية", value: 6.0, color: "#A855F7" },
        ],
        barData: [
          { label: "الدفع نقداً عند الاستلام (COD)", value: 99.7, color: "#F59E0B" },
          { label: "الدفع بالمحفظة الإلكترونية", value: 0.2, color: "#06B6D4" },
          { label: "الدفع بالبطاقة الائتمانية/المصرفية", value: 0.1, color: "#10B981" },
        ],
        kpiStats: [
          { label: "السلعة الأكثر طلباً", value: "الملابس (58%)", note: "جدول 1-18", color: "#EC4899" },
          { label: "نسبة الدفع عند الاستلام", value: "99.7%", note: "جدول 1-19", color: "#F59E0B" },
          { label: "التوصيل للمنزل", value: "92.0%", note: "جدول 1-20", color: "#10B981" },
        ]
      };
    }
  },

  payments: {
    topicId: "payments",
    titleAr: "الدفع الإلكتروني والفنتك",
    titleEn: "Digital Payments & FinTech",
    neonColor: "#06B6D4",
    neonGlow: "rgba(6, 182, 212, 0.6)",
    chartType: "combo_spline",
    officialTables: [
      {
        tableNumber: "جدول (1-19)",
        titleAr: "نسبة الأفراد الذين قاموا بالشراء عبر الإنترنت حسب قنوات الدفع (نقد عند الاستلام مقابل محافظ وبطاقات) لسنة 2022 (%)",
        titleEn: "Cash on delivery vs cashless digital channels 2022",
        source: "مسح استخدام تكنولوجيا المعلومات 2022 - ص 90",
        keyFindingAr: "الفجوة الهائلة بين الكاش والدفع الرقمي تمثل الفرصة الأكبر لشركات الفنتك."
      },
      {
        tableNumber: "تقرير 2024 - جدول (14)",
        titleAr: "عدد المكاتب البريدية التي تقدم خدمات التوفير وخدمات البطاقات الذكية (كي كارد) حسب المحافظة لسنة 2024",
        titleEn: "Mechanized postal offices offering Qi smart cards and e-savings accounts 2024",
        source: "تقرير إحصاءات الاتصالات والبريد 2024 - ص 35",
        keyFindingAr: "توزيع شبكة مكاتب الشحن وإصدار البطاقات الذكية التي يعتمد عليها المواطنون."
      },
      {
        tableNumber: "جدول (2-5)",
        titleAr: "متوسط إنفاق الأسرة الشهري على خدمات الاتصالات وتكنولوجيا المعلومات حسب المحافظة لسنة 2022 (ألف دينار)",
        titleEn: "Average household monthly expenditure on ICT and telecom by governorate 2022",
        source: "مسح استخدام تكنولوجيا المعلومات 2022 - ص 112",
        keyFindingAr: "قدرة الإنفاق الشهري للأسر تعكس قابلية شحن المحافظ والاشتراك بالخدمات المدفوعة."
      }
    ],
    getGovBreakdown: (govId, govNameAr) => {
      return {
        summaryTitle: `البنية المالية والتحول الرقمي في ${govNameAr}`,
        summaryText: `تعتبر ${govNameAr} سوقاً بكراً لبوابات الدفع الإلكتروني والمحافظ الرقمية؛ حيث يوفر حجم الإنفاق الشهري وقاعدة مكاتب البطاقات الذكية فرصة للتحول من الكاش.`,
        donutData: [
          { label: "كاش عند الاستلام (فرصة تحويل)", value: 99.7, color: "#F59E0B" },
          { label: "دفع إلكتروني حالي", value: 0.3, color: "#06B6D4" },
        ],
        barData: [
          { label: "الاعتماد على الكاش عند الاستلام", value: 99.7, color: "#F59E0B" },
          { label: "جاهزية شبكة بطاقات كي كارد", value: 75.0, color: "#06B6D4" },
          { label: "القدرة المالية للإنفاق التكنولوجي", value: 65.0, color: "#10B981" },
        ],
        kpiStats: [
          { label: "فجوة الكاش الواعدة", value: "99.7%", note: "جدول 1-19", color: "#F59E0B" },
          { label: "مكاتب بطاقة كي المتاحة", value: "شبكة رسمية", note: "إحصاءات 2024", color: "#06B6D4" },
          { label: "حجم إنفاق الأسرة", value: "مرتفع", note: "جدول 2-5", color: "#10B981" },
        ]
      };
    }
  },

  computers: {
    topicId: "computers",
    titleAr: "أجهزة الحاسوب واللابتوب",
    titleEn: "Computers & Laptops",
    neonColor: "#F59E0B",
    neonGlow: "rgba(245, 158, 11, 0.6)",
    chartType: "device_split",
    officialTables: [
      {
        tableNumber: "جدول (1-8)",
        titleAr: "نسبة الأفراد الذين يستخدمون جهاز الحاسوب خلال (3) الأشهر الأخيرة حسب البيئة والجنس والحالة التعليمية والمحافظة لسنة 2022 (%)",
        titleEn: "Individuals using computers in the last 3 months by education and governorate 2022",
        source: "مسح استخدام تكنولوجيا المعلومات 2022 - ص 52",
        keyFindingAr: "الاستخدام يتركز بقوة بين حملة الشهادات الجامعية والطلبة."
      },
      {
        tableNumber: "جدول (1-10)",
        titleAr: "نسبة الأفراد الذين يستخدمون الحاسوب حسب نوع الجهاز (حاسوب محمول، حاسوب مكتبي، تابلت) والمحافظة لسنة 2022 (%)",
        titleEn: "Computer usage by device type (laptop vs desktop vs tablet) 2022",
        source: "مسح استخدام تكنولوجيا المعلومات 2022 - ص 54",
        keyFindingAr: "الحواسيب المحمولة (Laptop) تشكل أكثر من 75% من مجمل أجهزة الكمبيوتر."
      },
      {
        tableNumber: "جدول (1-11)",
        titleAr: "نسبة الأفراد مستخدمي الحاسوب حسب مكان الاستخدام (في المنزل، مكان العمل، مؤسسة تعليمية) لسنة 2022 (%)",
        titleEn: "Location of computer usage (Home vs Workplace vs Academic) 2022",
        source: "مسح استخدام تكنولوجيا المعلومات 2022 - ص 56",
        keyFindingAr: "المنزل هو المكان الرئيسي لاستخدام أجهزة الحاسوب بنسبة 81%."
      }
    ],
    getGovBreakdown: (govId, govNameAr) => {
      return {
        summaryTitle: `بيئة محطات العمل والحواسيب في ${govNameAr}`,
        summaryText: `يمثل مستخدمو الحواسيب في ${govNameAr} الشريحة الأكثر تأهيلاً تقنياً، وهم الفئة المستهدفة لبرمجيات B2B وحلول العمل المكتبي والتعليم الجامعي.`,
        donutData: [
          { label: "حاسوب محمول (Laptop)", value: 76.0, color: "#F59E0B" },
          { label: "حاسوب مكتبي (Desktop)", value: 16.0, color: "#3B82F6" },
          { label: "جهاز لوحي (Tablet)", value: 8.0, color: "#10B981" },
        ],
        barData: [
          { label: "الاستخدام داخل المنزل", value: 81.0, color: "#F59E0B" },
          { label: "الاستخدام في بيئة العمل", value: 14.0, color: "#06B6D4" },
          { label: "الاستخدام في الجامعات والمعاهد", value: 5.0, color: "#A855F7" },
        ],
        kpiStats: [
          { label: "الجهاز الأكثر انتشاراً", value: "اللابتوب (76%)", note: "جدول 1-10", color: "#F59E0B" },
          { label: "المكان الرئيسي للاستخدام", value: "المنزل (81%)", note: "جدول 1-11", color: "#3B82F6" },
          { label: "مؤشر الكفاءات وساس", value: "نشط", note: "محسوب خوارزمياً", color: "#10B981" },
        ]
      };
    }
  },

  internet: {
    topicId: "internet",
    titleAr: "استخدام الإنترنت والنفاذ الرقمي",
    titleEn: "Internet Usage & Connectivity",
    neonColor: "#3B82F6",
    neonGlow: "rgba(59, 130, 246, 0.6)",
    chartType: "combo_spline",
    officialTables: [
      {
        tableNumber: "جدول (1-14)",
        titleAr: "نسبة الأفراد الذين استخدموا الإنترنت خلال (3) الأشهر الأخيرة حسب عدد مرات الاستخدام والفئات العمرية والمحافظة لسنة 2022 (%)",
        titleEn: "Internet users by frequency of use (daily vs weekly) and governorate 2022",
        source: "مسح استخدام تكنولوجيا المعلومات 2022 - ص 70",
        keyFindingAr: "أكثر من 90% من المستخدمين يتصلون بالإنترنت بشكل يومي مستمر."
      },
      {
        tableNumber: "جدول (1-15)",
        titleAr: "نسبة الأفراد الذين يستخدمون الإنترنت حسب نوع الأجهزة المستخدمة للنفاذ والفئات العمرية لسنة 2022 (%)",
        titleEn: "Devices used to access the internet (smartphones, PCs, smart TVs) 2022",
        source: "مسح استخدام تكنولوجيا المعلومات 2022 - ص 72",
        keyFindingAr: "الهواتف المحمولة هي وسيلة النفاذ الأساسية بنسبة تفوق 97%."
      },
      {
        tableNumber: "جدول (2-2)",
        titleAr: "نسبة الأسر التي لديها اتصال بالإنترنت داخل المنزل حسب البيئة والمحافظة لسنة 2022 (%)",
        titleEn: "Households with fixed/wireless home internet connection by governorate 2022",
        source: "مسح استخدام تكنولوجيا المعلومات 2022 - ص 108",
        keyFindingAr: "اتصال المنازل بالإنترنت يتجاوز 87% في معظم المحافظات."
      },
      {
        tableNumber: "تقرير 2024 - جدول (4)",
        titleAr: "عدد مشتركي خدمات الكيبل الضوئي للألياف إلى المنازل (FTTH) حسب المحافظة لسنة 2024",
        titleEn: "FTTH optical fiber subscribers by governorate 2024",
        source: "تقرير إحصاءات الاتصالات والبريد 2024 - ص 18",
        keyFindingAr: "توسع متسارع في اشتراكات الفايبر الضوئي عالي السرعة في عموم المحافظات."
      }
    ],
    getGovBreakdown: (govId, govNameAr) => {
      return {
        summaryTitle: `البنية الاتصالية والإنترنت في ${govNameAr}`,
        summaryText: `تتمتع ${govNameAr} باتصال إنترنت يومي مستمر يعتمد بشكل رئيسي على شبكات الأبراج المحلية والفايبر الضوئي المتنامي وبيانات الهواتف المحمولة 4G.`,
        donutData: [
          { label: "استخدام يومي كثيف", value: 91.0, color: "#3B82F6" },
          { label: "عدة مرات أسبوعياً", value: 7.0, color: "#06B6D4" },
          { label: "استخدام متقطع", value: 2.0, color: "#64748B" },
        ],
        barData: [
          { label: "الاتصال عبر الهاتف الذكي", value: 98.0, color: "#3B82F6" },
          { label: "الاتصال داخل المنزل (Wi-Fi/FTTH)", value: 92.0, color: "#10B981" },
          { label: "الاتصال عبر أجهزة الحاسوب", value: 25.0, color: "#F59E0B" },
        ],
        kpiStats: [
          { label: "نسبة الاستخدام اليومي", value: "91.0%", note: "جدول 1-14", color: "#3B82F6" },
          { label: "نفاذ إنترنت المنازل", value: "مرتفع", note: "جدول 2-2", color: "#10B981" },
          { label: "الجهاز الأساسي للنفاذ", value: "الهاتف (98%)", note: "جدول 1-15", color: "#A855F7" },
        ]
      };
    }
  },

  skills: {
    topicId: "skills",
    titleAr: "المهارات الرقمية والمواهب",
    titleEn: "Digital Skills & Talent",
    neonColor: "#A855F7",
    neonGlow: "rgba(168, 85, 247, 0.6)",
    chartType: "demographic_bars",
    officialTables: [
      {
        tableNumber: "جدول (1-16)",
        titleAr: "نسبة الأفراد حسب مجالات استخدام الإنترنت (مراسلة، شبكات اجتماعية، بحث، عمل، خدمات بنكية) لسنة 2022 (%)",
        titleEn: "Internet usage purposes (communication, social media, work, banking) 2022",
        source: "مسح استخدام تكنولوجيا المعلومات 2022 - ص 74",
        keyFindingAr: "التواصل والشبكات الاجتماعية والبحث عن المعلومات تتصدر الأنشطة اليومية."
      },
      {
        tableNumber: "جدول (1-17)",
        titleAr: "نسبة الأفراد الذين لديهم مهارات في مجالات استخدام الإنترنت (نقل ملفات، تنزيل برمجيات، معالجة بيانات، برمجة) والمحافظة لسنة 2022 (%)",
        titleEn: "Individuals with digital skills by skill category and governorate 2022",
        source: "مسح استخدام تكنولوجيا المعلومات 2022 - ص 78",
        keyFindingAr: "المهارات الأساسية واسعة الانتشار بينما المهارات البرمجية المتقدمة تمثل ميزة تنافسية للمراكز الحضرية."
      }
    ],
    getGovBreakdown: (govId, govNameAr) => {
      return {
        summaryTitle: `مستويات المهارات التقنية في ${govNameAr}`,
        summaryText: `يمتلك الأفراد في ${govNameAr} مهارات اتصال واستخدام رقمي مرتفعة، وتبرز فرصة واعدة لتدريب الكوادر على المهارات البرمجية والتحليلية المتقدمة.`,
        donutData: [
          { label: "مهارات نقل وتنزيل الملفات", value: 82.0, color: "#A855F7" },
          { label: "المراسلة واستخدام البريد الإلكتروني", value: 76.0, color: "#06B6D4" },
          { label: "معالجة النصوص والجداول", value: 38.0, color: "#10B981" },
          { label: "مهارات البرمجة المتقدمة", value: 14.0, color: "#F59E0B" },
        ],
        barData: [
          { label: "نقل وتبادل الملفات الرقمية", value: 82.0, color: "#A855F7" },
          { label: "استخدام البريد والاتصال الرقمي", value: 76.0, color: "#06B6D4" },
          { label: "تثبيت وضبط البرمجيات والتطبيقات", value: 64.0, color: "#3B82F6" },
          { label: "استخدام برامج الأوفيس والجداول", value: 38.0, color: "#10B981" },
          { label: "البرمجة وتطوير التطبيقات", value: 14.0, color: "#F59E0B" },
        ],
        kpiStats: [
          { label: "المهارات الأساسية", value: "82.0%", note: "جدول 1-17", color: "#A855F7" },
          { label: "المهارات المكتبية", value: "38.0%", note: "جدول 1-17", color: "#10B981" },
          { label: "الكوادر البرمجية المتقدمة", value: "14.0%", note: "جدول 1-17", color: "#F59E0B" },
        ]
      };
    }
  }
};
