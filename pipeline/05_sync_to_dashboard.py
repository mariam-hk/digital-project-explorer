# -*- coding: utf-8 -*-
"""
Step 7: Sync Pipeline Outputs to Frontend Dashboard Data
Project: TechLocation AI — Digital Market Explorer

Generates src/lib/data/iraq-dashboard-data.ts directly from:
- pipeline/data/location_scores.json
- pipeline/data/governorate_ai_explanations.json
"""

import os
import sys
import json

# Set stdout to UTF-8
sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(__file__)
DATA_DIR = os.path.join(BASE_DIR, "data")
TS_OUTPUT = os.path.join(os.path.dirname(BASE_DIR), "src", "lib", "data", "iraq-dashboard-data.ts")

with open(os.path.join(DATA_DIR, "location_scores.json"), "r", encoding="utf-8") as f:
    scores = json.load(f)

with open(os.path.join(DATA_DIR, "governorate_ai_explanations.json"), "r", encoding="utf-8") as f:
    ai_list = json.load(f)

ai_dict = {item["Governorate"]: item["AI_Explanation"] for item in ai_list}

gov_items = []
for s in scores:
    gov_en = s["Governorate"]
    ai = ai_dict.get(gov_en, {})
    
    # Regions map
    regions_map = {
        "Baghdad": ("المنطقة الوسطى", "Central Region"),
        "Basrah": ("المنطقة الجنوبية", "Southern Region"),
        "Nineveh": ("المنطقة الشمالية", "Northern Region"),
        "Babylon": ("الفرات الأوسط", "Middle Euphrates"),
        "Thi-Qar": ("المنطقة الجنوبية", "Southern Region"),
        "Al-Anbar": ("المنطقة الغربية", "Western Region"),
        "Diyala": ("المنطقة الشرقية", "Eastern Region"),
        "Kirkuk": ("المنطقة الشمالية", "Northern Region"),
        "Salah Al-Deen": ("المنطقة الوسطى الشمالية", "North Central"),
        "Najaf": ("الفرات الأوسط", "Middle Euphrates"),
        "Wasit": ("المنطقة الوسطى الشرقية", "East Central"),
        "Al-Qadisiya": ("الفرات الأوسط", "Middle Euphrates"),
        "Kerbela": ("الفرات الأوسط", "Middle Euphrates"),
        "Missan": ("المنطقة الجنوبية", "Southern Region"),
        "Al-Muthanna": ("المنطقة الجنوبية", "Southern Region"),
        "Erbil": ("إقليم كردستان", "Kurdistan Region"),
        "Sulaymaniyah": ("إقليم كردستان", "Kurdistan Region"),
        "Duhok": ("إقليم كردستان", "Kurdistan Region")
    }
    
    reg_ar, reg_en = regions_map.get(gov_en, ("العراق", "Iraq"))
    
    item = {
        "id": gov_en.lower().replace("-", "_").replace(" ", "_"),
        "nameAr": s["Governorate_Ar"],
        "nameEn": gov_en,
        "regionAr": reg_ar,
        "regionEn": reg_en,
        "regionType": s["Region_Type"],
        "isFederal": s["Is_Federal"],
        
        # Real Government Raw Telemetry (100% Unaltered)
        "smartphoneUsagePct": s["Smartphone_Ownership"],
        "internetPenetrationPct": s["Internet_Usage"],
        "homeInternetPct": s["Home_Internet"],
        "computerUsagePct": s["Computer_Usage"],
        "digitalSkillsPct": s["Digital_Skills"],
        "onlineShoppingPct": s["Online_Purchase"],
        "telecomSpending": s["Telecom_Spending"],
        "cashOnDeliveryPct": s["Cash_On_Delivery_Pct"],
        "smartCardOffices": s["Smart_Payment_Offices"],
        "ftthSubscribers": s["FTTH_Subscribers"],
        
        # Engineered Opportunity Scores (MCDA Model)
        "digitalReadinessScore": s["Digital_Readiness"],
        "digitalTalentScore": s["Digital_Talent"],
        "eCommerceScore": s["Score_ECommerce"],
        "fintechScore": s["Score_FinTech"],
        "saasScore": s["Score_SaaS_Tech"],
        "consumerAppsScore": s["Score_Consumer_Apps"],
        "overallScore": s["Overall_Digital_Score"],
        "rank": s["Rank"],
        "marketTier": s["Market_Tier"],
        "bestFitModel": s["Best_Fit_Model"],
        "keyStrengths": s["Key_Strengths"],
        "keyBottlenecks": s["Key_Bottlenecks"],
        
        # AI Explanation Layer
        "aiTitle": ai.get("Title", f"ماذا تعني هذه البيانات لمشروعك في {s['Governorate_Ar']}؟"),
        "aiSummary": ai.get("Executive_Summary", ""),
        "recommendedModels": ai.get("Recommended_Business_Models", []),
        "strategicAdvice": ai.get("Strategic_Bottleneck_Advice", ""),
        "groundTruth": ai.get("Ground_Truth_Telemetry", {})
    }
    gov_items.append(item)

ts_content = f"""// Generated automatically by pipeline/05_sync_to_dashboard.py
// Data strictly synchronized with official COSIT & Ministry Reports and analytical scoring engine.

export interface GovernorateMetric {{
  id: string;
  nameAr: string;
  nameEn: string;
  regionAr: string;
  regionEn: string;
  regionType: "Federal" | "Kurdistan";
  isFederal: boolean;
  
  // Real Official Survey Telemetry
  smartphoneUsagePct: number;    // Table 1-4
  internetPenetrationPct: number;// Table 1-5
  homeInternetPct: number;       // Table 2-2
  computerUsagePct: number;      // Table 1-10
  digitalSkillsPct: number;      // Table 1-17
  onlineShoppingPct: number;     // Table 1-18
  telecomSpending: number;       // Table 2-5 (in thousand IQD)
  cashOnDeliveryPct: number;     // Table 1-19
  smartCardOffices: number;      // Table 14
  ftthSubscribers: number;       // Table 4
  
  // Engineered Scores
  digitalReadinessScore: number;
  digitalTalentScore: number;
  eCommerceScore: number;
  fintechScore: number;
  saasScore: number;
  consumerAppsScore: number;
  overallScore: number;
  rank: number;
  marketTier: string;
  bestFitModel: string;
  keyStrengths: string;
  keyBottlenecks: string;
  
  // AI Explanation Layer
  aiTitle: string;
  aiSummary: string;
  recommendedModels: string[];
  strategicAdvice: string;
  groundTruth: Record<string, string>;
}}

export interface TopicConfig {{
  id: string;
  titleAr: string;
  titleEn: string;
  icon: string;
  metricKey: keyof Pick<
    GovernorateMetric,
    | "fintechScore"
    | "smartphoneUsagePct"
    | "internetPenetrationPct"
    | "computerUsagePct"
    | "onlineShoppingPct"
    | "digitalSkillsPct"
    | "telecomSpending"
    | "digitalReadinessScore"
    | "digitalTalentScore"
  >;
  unit: string;
  neonColor: string;
  neonGlow: string;
  descriptionAr: string;
  descriptionEn: string;
  sourceAr: string;
  sourceEn: string;
}}

export const TOPICS: TopicConfig[] = [
  {{
    id: "payments",
    titleAr: "الدفع الإلكتروني والفنتك",
    titleEn: "Digital Payments & FinTech",
    icon: "💳",
    metricKey: "fintechScore",
    unit: "%",
    neonColor: "#06B6D4",
    neonGlow: "rgba(6, 182, 212, 0.5)",
    descriptionAr: "مؤشر فرصة التحول من الكاش (99.7%) نحو المحافظ وبوابات الدفع الإلكتروني.",
    descriptionEn: "Opportunity index for cash-to-digital payments and wallet adoption.",
    sourceAr: "إحصاءات الاتصالات 2024 (جدول 14) + مسح تكنولوجيا المعلومات 2022 (جدول 1-19)",
    sourceEn: "COSIT Telecom 2024 (Table 14) & ICT Survey 2022 (Table 1-19)"
  }},
  {{
    id: "smartphones",
    titleAr: "اعتماد الهواتف الذكية",
    titleEn: "Smartphone Adoption",
    icon: "📱",
    metricKey: "smartphoneUsagePct",
    unit: "%",
    neonColor: "#A855F7",
    neonGlow: "rgba(168, 85, 247, 0.5)",
    descriptionAr: "نسبة الأفراد الذين يمتلكون ويستخدمون الهواتف الذكية للتواصل والمعاملات.",
    descriptionEn: "Percentage of individuals owning and utilizing smartphones.",
    sourceAr: "مسح استخدام تكنولوجيا المعلومات 2022 (جدول 1-4)",
    sourceEn: "COSIT ICT Household Survey 2022 (Table 1-4)"
  }},
  {{
    id: "internet",
    titleAr: "استخدام الإنترنت النشط",
    titleEn: "Internet Usage",
    icon: "🌐",
    metricKey: "internetPenetrationPct",
    unit: "%",
    neonColor: "#10B981",
    neonGlow: "rgba(16, 185, 129, 0.5)",
    descriptionAr: "نسبة الأفراد الذين استخدموا الإنترنت بانتظام خلال الأشهر الثلاثة الأخيرة.",
    descriptionEn: "Percentage of individuals actively using the internet in the last 3 months.",
    sourceAr: "مسح استخدام تكنولوجيا المعلومات 2022 (جدول 1-5)",
    sourceEn: "COSIT ICT Household Survey 2022 (Table 1-5)"
  }},
  {{
    id: "computers",
    titleAr: "استخدام الحواسيب واللابتوب",
    titleEn: "Computer & Laptop Usage",
    icon: "💻",
    metricKey: "computerUsagePct",
    unit: "%",
    neonColor: "#F59E0B",
    neonGlow: "rgba(245, 158, 11, 0.5)",
    descriptionAr: "نسبة استخدام أجهزة الكمبيوتر المحمولة والمكتبية (مؤشر حرج لشركات البرمجيات).",
    descriptionEn: "Proportion of individuals using laptops and desktop PCs.",
    sourceAr: "مسح استخدام تكنولوجيا المعلومات 2022 (جدول 1-10)",
    sourceEn: "COSIT ICT Household Survey 2022 (Table 1-10)"
  }},
  {{
    id: "shopping",
    titleAr: "الشراء عبر الإنترنت والتجارة",
    titleEn: "Online Purchasing",
    icon: "🛒",
    metricKey: "onlineShoppingPct",
    unit: "%",
    neonColor: "#EC4899",
    neonGlow: "rgba(236, 72, 153, 0.5)",
    descriptionAr: "نسبة الأفراد الذين قاموا بشراء سلع أو طلب خدمات عبر الإنترنت والتطبيقات.",
    descriptionEn: "Frequency of e-commerce purchases and online delivery orders.",
    sourceAr: "مسح استخدام تكنولوجيا المعلومات 2022 (جدول 1-18)",
    sourceEn: "COSIT ICT Household Survey 2022 (Table 1-18)"
  }},
  {{
    id: "spending",
    titleAr: "إنفاق الأسرة على التكنولوجيا",
    titleEn: "Tech & Telecom Spending",
    icon: "💰",
    metricKey: "telecomSpending",
    unit: " ألف د.ع",
    neonColor: "#3B82F6",
    neonGlow: "rgba(59, 130, 246, 0.5)",
    descriptionAr: "متوسط إنفاق الأسرة الشهري على خدمات الاتصالات والإنترنت والأجهزة.",
    descriptionEn: "Average household monthly expenditure on telecom and digital services.",
    sourceAr: "مسح استخدام تكنولوجيا المعلومات 2022 (جدول 2-5)",
    sourceEn: "COSIT ICT Household Survey 2022 (Table 2-5)"
  }},
  {{
    id: "skills",
    titleAr: "المهارات الرقمية",
    titleEn: "Digital Skills",
    icon: "🎓",
    metricKey: "digitalSkillsPct",
    unit: "%",
    neonColor: "#6366F1",
    neonGlow: "rgba(99, 102, 241, 0.5)",
    descriptionAr: "نسبة الأفراد الذين يمتلكون مهارات تقنية متقدمة ونقل ومعالجة البيانات.",
    descriptionEn: "Software literacy, data management, and technical talent density.",
    sourceAr: "مسح استخدام تكنولوجيا المعلومات 2022 (جدول 1-17)",
    sourceEn: "COSIT ICT Household Survey 2022 (Table 1-17)"
  }},
  {{
    id: "readiness",
    titleAr: "مؤشر الجاهزية الرقمية",
    titleEn: "Digital Readiness Index",
    icon: "⚡",
    metricKey: "digitalReadinessScore",
    unit: "%",
    neonColor: "#14B8A6",
    neonGlow: "rgba(20, 184, 166, 0.5)",
    descriptionAr: "مؤشر مركب يقيس بنية الأجهزة (حواسيب + هواتف + إنترنت منزلي) والمهارات.",
    descriptionEn: "Composite index combining device penetration, home internet, and skills.",
    sourceAr: "محسوب خوارزمياً وفق مصفوفة الجاهزية الرقمية لمشروع TechLocation",
    sourceEn: "Engineered Readiness Score"
  }},
  {{
    id: "talent",
    titleAr: "مؤشر المواهب وساس",
    titleEn: "Tech Talent & SaaS Index",
    icon: "🚀",
    metricKey: "digitalTalentScore",
    unit: "%",
    neonColor: "#8B5CF6",
    neonGlow: "rgba(139, 92, 246, 0.5)",
    descriptionAr: "جاهزية المحافظة لتأسيس فرق برمجية وشركات SaaS بناءً على الحواسيب والمهارات.",
    descriptionEn: "Readiness for software engineering teams and B2B SaaS hubs.",
    sourceAr: "محسوب خوارزمياً وفق مصفوفة المهارات البرمجية والألياف الضوئية",
    sourceEn: "Engineered Talent Score"
  }}
];

export const ALL_GOVERNORATES: GovernorateMetric[] = {json.dumps(gov_items, ensure_ascii=False, indent=2)};

// The 15 Federal Governorates (عدا إقليم كردستان) as officially grouped in COSIT Reports
export const FEDERAL_GOVERNORATES: GovernorateMetric[] = ALL_GOVERNORATES.filter(g => g.isFederal);

// National Average Benchmark
export const NATIONAL_AVERAGE_METRICS = {{
  smartphoneUsagePct: 91.5,
  internetPenetrationPct: 90.8,
  homeInternetPct: 87.2,
  computerUsagePct: 20.8,
  digitalSkillsPct: 42.6,
  onlineShoppingPct: 44.8,
  telecomSpending: 245.0,
  cashOnDeliveryPct: 99.7,
  digitalReadinessScore: 63.8,
  digitalTalentScore: 31.5,
  overallScore: 46.2
}};
"""

with open(TS_OUTPUT, "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"✅ Generated {TS_OUTPUT} with {len(gov_items)} governorates successfully!")
