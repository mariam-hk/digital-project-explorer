import { LocationProfile, TopicId, AIInterpretation } from "../types";
import { NATIONAL_AVERAGE } from "../data/iraq-digital-data";

export function generateInterpretation(
  location: LocationProfile,
  topic: TopicId = "all"
): AIInterpretation {
  const { smartphones, internet, computers, skills, shopping, payments } = location.indicators;
  const isAboveAvgPayment = payments > NATIONAL_AVERAGE.indicators.payments;
  const isAboveAvgShopping = shopping > NATIONAL_AVERAGE.indicators.shopping;
  const isHighSmartphone = smartphones >= 80;
  const isHighSkills = skills >= 50;

  // Tailored interpretation based on location and metrics
  if (topic === "smartphones") {
    return {
      headlineEn: `High Mobile Penetration (${smartphones}%): A Mobile-First Consumer Base`,
      headlineAr: `انتشار مرتفع للهواتف الذكية (${smartphones}%): مجتمع موجه كلياً للموبايل`,
      summaryEn: `In ${location.nameEn}, ${smartphones}% of the population actively relies on smartphones. Consumers access services, social commerce, and entertainment primarily via hand-held devices rather than PCs.`,
      summaryAr: `في ${location.nameAr}، يعتمد ${smartphones}% من السكان بشكل يومي على الهواتف الذكية. يتفاعل الجمهور مع الخدمات والتجارة عبر تطبيقات الموبايل بشكل شبه كامل مقارنة بالحواسيب.`,
      opportunitiesEn: [
        "Consumer mobile apps (food delivery, ride-hailing, retail ordering) have minimal friction for user adoption.",
        "Social commerce (Instagram/TikTok/WhatsApp shopping) reaches the vast majority of digitally active households.",
        "Micro-learning and mobile gaming represent high engagement categories.",
      ],
      opportunitiesAr: [
        "تطبيقات المستهلكين (التوصيل، النقل، التسوق السريع) تمتلك بيئة جاهزة جداً للانتشار السريع.",
        "التجارة عبر المنصات الاجتماعية (انستغرام، واتساب، تيك توك) تصل لغالبية العائلات النشطة رقمياً.",
        "الألعاب والتطبيقات الترفيهية والتعليم المصغر تحظى بمعدلات تفاعل قياسية.",
      ],
      risksEn: [
        "Desktop-only SaaS or websites with poor mobile responsiveness will face extreme bounce rates.",
        "Data consumption costs and intermittent mobile network congestion require lightweight app bundles.",
      ],
      risksAr: [
        "المنصات أو المواقع التي لا تعمل بسلاسة فائقة على الموبايل ستعاني من عزوف كامل للمستخدمين.",
        "تكاليف باقات الإنترنت تتطلب تطبيقات خفيفة الحجم وتستهلك بيانات قليلة.",
      ],
      recommendedTechEn: ["Consumer Apps", "Mobile Delivery Platforms", "Social Commerce Tools"],
      recommendedTechAr: ["تطبيقات الموبايل الموجهة للأفراد", "منصات التوصيل", "أدوات التجارة الاجتماعية"],
    };
  }

  if (topic === "payments") {
    return {
      headlineEn: `Digital Payments at ${payments}%: The Transition Phase from Cash to Wallets`,
      headlineAr: `المدفوعات الرقمية عند ${payments}%: مرحلة التحول التدريجي من الكاش إلى المحافظ`,
      summaryEn: `With digital payment adoption at ${payments}%, ${location.nameEn} shows ${
        isAboveAvgPayment ? "above-average progress" : "developing stages"
      } in cashless adoption. While e-wallets (ZainCash, Qi, FastPay) are accelerating, Cash-on-Delivery (COD) remains a key consumer habit.`,
      summaryAr: `بنسبة اعتماد تبلغ ${payments}%، تسجل ${location.nameAr} ${
        isAboveAvgPayment ? "مستوى متقدماً عن المعدل الوطني" : "مرحلة نمو واعدة"
      }. ومع انتشار المحافظ الإلكترونية وبطاقات الدفع، لا يزال الدفع عند الاستلام (COD) هو السلوك السائد لدى شريحة واسعة.`,
      opportunitiesEn: [
        "Integration of local e-wallets (ZainCash, Qi, FIB, FastPay) gives tech startups an immediate competitive edge over cash.",
        "Incentivized cashback or discount campaigns can convert hybrid cash shoppers into recurring digital payers.",
        "FinTech services bridging merchants with automated micro-pos and invoice links.",
      ],
      opportunitiesAr: [
        "ربط بوابات الدفع المحلية (زين كاش، كي كارد، FIB، فاست باي) يمنح المشاريع ميزة تنافسية كبيرة.",
        "حملات الخصم الفوري والمكافآت (Cashback) تسرع تحول المستخدمين من الكاش إلى الدفع الرقمي.",
        "حلول الفوترة السريعة وروابط الدفع لأصحاب المتاجر والمشاريع الصغيرة.",
      ],
      risksEn: [
        "Relying exclusively on digital pre-payments without Cash-on-Delivery (COD) can alienate up to 50-60% of potential buyers.",
        "Consumer trust and security perceptions require explicit guarantees and transparent refund policies.",
      ],
      risksAr: [
        "الاعتماد الحصري على الدفع المسبق دون توفير خيار الدفع عند الاستلام قد يفقد المشروع أكثر من 50% من الطلبات.",
        "حاجز الثقة والأمان يتطلب سياسات استرجاع واضحة وضمانات ملموسة للزبائن.",
      ],
      recommendedTechEn: ["FinTech Wallets & Gateways", "Payment Link Automation", "Hybrid COD+E-Pay Platforms"],
      recommendedTechAr: ["بوابات الدفع والحلول المالية", "أنظمة الدفع للمتاجر", "منصات الدفع الهجين (كاش + إلكتروني)"],
    };
  }

  if (topic === "shopping") {
    return {
      headlineEn: `Online Purchasing at ${shopping}%: High Consumer Demand with Logistical Nuances`,
      headlineAr: `التسوق الإلكتروني عند ${shopping}%: طلب استهلاكي متسارع مع تحديات لوجستية`,
      summaryEn: `In ${location.nameEn}, ${shopping}% of surveyed citizens make regular purchases or orders online. E-commerce is transitioning from informal social pages into structured platforms.`,
      summaryAr: `في ${location.nameAr}، يقوم ${shopping}% من المواطنين بالطلب والشراء عبر الإنترنت بانتظام. تشهد السوق تحولاً ملحوظاً من الطلب عبر الرسائل غير المنظمة إلى المنصات المخصصة.`,
      opportunitiesEn: [
        "Hyper-local quick commerce (groceries, medicine, daily essentials) has proven consumer appetite.",
        "Vertical e-commerce (electronics, beauty, fashion) with reliable 24-48h fulfillment.",
        "B2B ordering apps linking wholesalers with neighborhood retail kiosks.",
      ],
      opportunitiesAr: [
        "التجارة السريعة (توصيل الأغذية، الصيدليات، المستلزمات اليومية) تحظى بإقبال ممتاز.",
        "المتاجر المتخصصة (إلكترونيات، عناية، أزياء) مع ضمان توصيل سريع وموثوق.",
        "تطبيقات ربط تجار الجملة مع أصحاب المحال والميني ماركت (B2B Marketplace).",
      ],
      risksEn: [
        "Order cancellation / return rates during delivery require active phone confirmation systems.",
        "Last-mile address mapping requires flexible location pinning rather than traditional postal codes.",
      ],
      risksAr: [
        "نسبة إلغاء أو استرجاع الطلبات تتطلب تأكيداً هاتفياً أو عبر واتساب قبل الإرسال.",
        "تحديات العناوين الدقيقة تتطلب الاعتماد على مشاركة اللوكيشن وتطبيقات الملاحة.",
      ],
      recommendedTechEn: ["E-Commerce Marketplaces", "Quick Delivery Logistics", "B2B Supply Apps"],
      recommendedTechAr: ["منصات المتاجر الرقمية", "لوجستيات التوصيل السريع", "تطبيقات توريد الجملة B2B"],
    };
  }

  if (topic === "computers" || topic === "skills") {
    return {
      headlineEn: `Digital Talent & Workstation Readiness (${skills}% Skills, ${computers}% PC Usage)`,
      headlineAr: `جاهزية المواهب وبيئة العمل الرقمية (${skills}% مهارات، ${computers}% حواسيب)`,
      summaryEn: `Desktop computer usage stands at ${computers}%, paired with a ${skills}% digital skills rating. This ratio indicates a clear distinction between casual mobile consumers and specialized workstation power-users.`,
      summaryAr: `يبلغ استخدام الحواسيب ${computers}% مع مؤشر مهارات يبلغ ${skills}%. هذا يعكس وجود قاعدة قوية ومتنامية من الكفاءات وخريجي الجامعات المؤهلين لبناء البرمجيات والعمل التقني.`,
      opportunitiesEn: [
        "Strong potential for software development agencies, outsourcing hubs, and tech training academies.",
        "Availability of university graduates eager for remote or hybrid tech employment.",
        "B2B SaaS tools tailored for local enterprise and corporate office management.",
      ],
      opportunitiesAr: [
        "فرص واعدة لشركات تطوير البرمجيات، مراكز التعهيد (Outsourcing)، وأكاديميات التدريب التقني.",
        "توفر كوادر شابة من خريجي كليات علوم الحاسوب والهندسة مستعدين للعمل المكتبي والحر.",
        "برمجيات إدارة الأعمال السحابية (B2B SaaS) للمؤسسات والشركات المحلية.",
      ],
      risksEn: [
        "Competition from regional outsourcing firms for top-tier senior software talent.",
        "Need for continuous practical upskilling in modern full-stack and cloud architectures.",
      ],
      risksAr: [
        "تنافس الشركات الإقليمية على استقطاب كبار المطورين ذوي الخبرة.",
        "الحاجة لتدريب عملي مستمر على أحدث تقنيات السحابة وتطوير النظم الحديثة.",
      ],
      recommendedTechEn: ["Software Development Hubs", "EdTech / Tech Bootcamps", "B2B Cloud SaaS"],
      recommendedTechAr: ["مراكز تطوير البرمجيات", "منصات التعليم التقني والتدريب", "أنظمة إدارة الأعمال السحابية"],
    };
  }

  // Topic is "all" or general snapshot
  return {
    headlineEn: `${location.nameEn} Digital Profile: ${
      location.indicators.smartphones >= 85 ? "High-Density Digital Economy" : "Fast-Emerging Digital Frontier"
    }`,
    headlineAr: `الملف الرقمي لمحافظة ${location.nameAr}: ${
      location.indicators.smartphones >= 85 ? "سوق رقمي كثيف ومتقدم" : "سوق واعدة سريعة النمو"
    }`,
    summaryEn: `Based on verified indicators, ${location.nameEn} demonstrates a robust mobile foundation with ${smartphones}% smartphone adoption and ${internet}% internet usage. Online commerce (${shopping}%) and digital payments (${payments}%) are on a steep upward trajectory, positioning this city as a prime testbed for consumer technology.`,
    summaryAr: `استناداً إلى المؤشرات المسجلة، تتمتع ${location.nameAr} بقاعدة رقمية صلبة مع انتشار للهواتف بنسبة ${smartphones}% واستخدام للإنترنت بنسبة ${internet}%. كما يشهد التسوق الإلكتروني (${shopping}%) والدفع الرقمي (${payments}%) نمواً متسارعاً يجعلها بيئة ممتازة لإطلاق وتوسيع المشاريع التكنولوجية.`,
    opportunitiesEn: [
      `Consumer Mobile Apps: ${smartphones}% smartphone adoption ensures broad addressable reach for food, transport, and delivery.`,
      `E-Commerce Growth: ${shopping}% of citizens are already buying online, creating space for specialized local brands.`,
      `FinTech Transition: Payment adoption (${payments}%) is accelerating, creating opportunities for wallet and checkout automation.`,
      isHighSkills
        ? `Talent Hub: High concentration of STEM graduates (${skills}% skills index) supports tech teams and engineering hubs.`
        : `Talent Development: Growing youth population (${location.youthDemographicPct}%) creates an active user base ready for digital services.`,
    ],
    opportunitiesAr: [
      `تطبيقات الهواتف الموجهة للأفراد: وصول فوري وسهل للجمهور بفضل انتشار الهواتف بنسبة ${smartphones}%.`,
      `نمو التجارة الإلكترونية: ${shopping}% من المواطنين يتسوقون إلكترونياً، مما يفتح المجال لعلامات تجارية متخصصة.`,
      `التحول للمدفوعات الرقمية: نسبة الدفع (${payments}%) تتصاعد وتهيئ السوق لحلول المحافظ ونقاط البيع السريعة.`,
      isHighSkills
        ? `مركز للمواهب: تركيز عالٍ للكفاءات وخريجي التقنية (مؤشر ${skills}%) يدعم تأسيس فرق هندسية محلية.`
        : `قاعدة شبابية ضخمة: فئة الشباب تمثل ${location.youthDemographicPct}% من المجتمع وهي المحرك الرئيسي للتبني الرقمي.`,
    ],
    risksEn: [
      `Cash Dependency: At ${payments}% digital payments, offering Cash-on-Delivery (COD) remains mandatory for consumer trust.`,
      `Device Disparity: Mobile usage (${smartphones}%) vastly outperforms desktop PC usage (${computers}%), requiring mobile-first architectures.`,
    ],
    risksAr: [
      `الاعتماد المستمر على الكاش: نسبة الدفع الإلكتروني (${payments}%) تعني أن خيار الدفع عند الاستلام ضروري للنجاح التجاري.`,
      `الفجوة بين الموبايل والحاسوب: استخدام الموبايل (${smartphones}%) يتفوق كثيراً على الحواسيب (${computers}%)، مما يفرض تصميم تطبيقات مخصصة للهواتف.`,
    ],
    recommendedTechEn: [
      "Consumer Mobile Applications",
      "E-Commerce & Quick Delivery Platforms",
      "Local FinTech & Wallet Integration Tools",
      "B2B Wholesale & Logistics Apps",
    ],
    recommendedTechAr: [
      "تطبيقات الموبايل الموجهة للأفراد",
      "منصات التجارة الإلكترونية والتوصيل السريع",
      "أدوات الدفع الإلكتروني والربط مع المحافظ",
      "تطبيقات التوريد واللوجستيات بين الشركات (B2B)",
    ],
  };
}
