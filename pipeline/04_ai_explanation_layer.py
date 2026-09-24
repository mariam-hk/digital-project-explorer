# -*- coding: utf-8 -*-
"""
Step 6: AI Explanation Layer Pipeline
Project: TechLocation AI — Digital Market Explorer

This script generates contextual, human-readable business intelligence for startups
and investors based on the real official numbers and the calculated location scores.

It answers the core user question:
"What does this mean?" (ماذا تعني هذه البيانات لمشروعي؟)

For each governorate, it produces:
1. Executive Analysis (تحليل تنفيذي واقعي مستند إلى الأرقام)
2. Recommended Business Models (نماذج الأعمال التقنية الأنسب لهذه المحافظة)
3. Actionable Strategic Advice (توجيهات للتغلب على عقبات مثل الاعتماد على الكاش 99.7%)
4. Data Grounding Citations (توثيق أرقام التقرير الرسمي المستخدمة)

Outputs:
- pipeline/data/governorate_ai_explanations.json
"""

import os
import sys
import json
import pandas as pd

# Set stdout to UTF-8
sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(__file__)
DATA_DIR = os.path.join(BASE_DIR, "data")

INPUT_SCORES = os.path.join(DATA_DIR, "location_scores.csv")
OUTPUT_AI_JSON = os.path.join(DATA_DIR, "governorate_ai_explanations.json")

def generate_ai_insights(df: pd.DataFrame) -> list:
    print("=" * 65)
    print("🤖 [Step 6: AI EXPLANATION LAYER]")
    print("=" * 65)

    explanations = []

    for _, row in df.iterrows():
        gov_en = row["Governorate"]
        gov_ar = row["Governorate_Ar"]
        score_overall = row["Overall_Digital_Score"]
        tier = row["Market_Tier"]
        best_fit = row["Best_Fit_Model"]
        
        internet = row["Internet_Usage"]
        pc = row["Computer_Usage"]
        purchase = row["Online_Purchase"]
        spending = row["Telecom_Spending"]
        skills = row["Digital_Skills"]
        cod_pct = row["Cash_On_Delivery_Pct"]
        offices = row["Smart_Payment_Offices"]

        # 1. Contextual Executive Summary
        if gov_en == "Baghdad":
            summary = (
                f"تعتبر {gov_ar} السوق الرقمي الأكبر والأكثر نضجاً في العراق بنتيجة {score_overall}%. "
                f"تسجل المحافظة أعلى معدل شراء إلكتروني ({purchase}%) وأعلى إنفاق شهري للأسر على التكنولوجيا ({spending:,.1f} ألف دينار)، "
                f"مع توافر شبكة متماسكة من {offices} مكتباً لبطاقات الدفع الذكي (كي كارد)، مما يجعلها السوق الأساسي لأي توسع رقمي فوري."
            )
            recommendations = [
                "منصات التجارة السريعة (Quick-Commerce) والتوصيل فائق السرعة",
                "بوابات الدفع الإلكتروني والمحافظ الرقمية لدعم التجارة",
                "حلول إدارة المتاجر ونقاط البيع السحابية (Cloud POS) للشركات وتجار التجزئة"
            ]
            bottleneck_advice = (
                f"رغم الشراء المرتفع، فإن {cod_pct}% من الدفع يتم نقداً عند الاستلام. "
                "التوصية: وفر الدفع عند الاستلام كخيار أساسي، مع تقديم خصم تحفيزي (3-5%) أو نقاط مكافآت لمن يدفع إلكترونياً لكسر حاجز الخوف."
            )

        elif gov_en == "Basrah":
            summary = (
                f"تعد {gov_ar} ثاني أكبر سوق اقتصادي ورقمي في العراق بنتيجة {score_overall}%. "
                f"تتميز بجاهزية عالية لإنترنت المنازل ({row['Home_Internet']}%) ومعدل شراء إلكتروني قوي ({purchase}%) "
                f"وإنفاق شهري للأسر قدره ({spending:,.1f} ألف دينار)، ما يجعلها وجهة مثالية للتجارة والخدمات اللوجستية."
            )
            recommendations = [
                "تطبيقات التوصيل والخدمات اللوجستية المتخصصة في الموانئ ونقل البضائع",
                "منصات التجارة الإلكترونية الاستهلاكية للأزياء والإلكترونيات",
                "خدمات الحجز وطلب السيارات داخل المحافظة والمناطق الصناعية"
            ]
            bottleneck_advice = (
                f"انخفاض استخدام الحواسيب إلى ({pc}%) والاعتماد الكلي على الهواتف ({row['Smartphone_Ownership']}%). "
                "التوصية: صمم منتجك التقني ليكون (Mobile-First / App-First) حصراً بدون اشتراط استخدام متصفحات سطح المكتب."
            )

        elif gov_en == "Erbil":
            summary = (
                f"تتصدر {gov_ar} محافظات العراق في مؤشر الكفاءات والمواهب التقنية بنتيجة {row['Score_SaaS_Tech']}%. "
                f"يسجل الأفراد أعلى استخدام للحواسيب واللابتوبات في البلاد ({pc}%) ومهارات رقمية بنسبة ({skills}%) "
                f"مع أوسع انتشار لشبكات الألياف الضوئية (FTTH)، مما يجعلها العاصمة البرمجية والمركز الأفضل لتأسيس فرق التطوير."
            )
            recommendations = [
                "تأسيس مقار الشركات البرمجية وحاضنات التقنية (Tech & Engineering Hubs)",
                "حلول البرمجيات كخدمة (B2B SaaS) للمؤسسات والشركات التجارية",
                "منصات التكنولوجيا التعليمية (EdTech) وتدريب المهارات الرقمية المتقدمة"
            ]
            bottleneck_advice = (
                "معدل الشراء الإلكتروني الاستهلاكي (46.2%) أقل من بغداد. "
                "التوصية: ركز في أربيل على خدمات الـ B2B وبناء الفرق التقنية بدلاً من الاعتماد الحصري على التجارة الاستهلاكية البسيطة."
            )

        elif gov_en in ["Najaf", "Kerbela"]:
            summary = (
                f"تتمتع {gov_ar} بسوق استهلاكي وزيارات موسمية نشطة للغاية بنتيجة {score_overall}%. "
                f"معدل الشراء عبر الإنترنت يبلغ ({purchase}%) وإنفاق الأسر على الاتصالات يسجل ({spending:,.1f} ألف دينار)، "
                f"مع اعتماد شبه حصري على التجارة عبر تطبيقات التواصل الاجتماعي."
            )
            recommendations = [
                "تطبيقات الضيافة والخدمات اللوجستية للزائرين وتوصيل الأطعمة",
                "منصات أتمتة الطلبات لمتاجر السوشيال ميديا والتجارة التفاعلية",
                "حلول تحويل الأموال وتسهيل الدفع المحلي في الأسواق التراثية"
            ]
            bottleneck_advice = (
                "مكاتب البطاقات الذكية محدودة مقارنة بحجم الطلب. "
                "التوصية: الاعتماد على شراكات مع شركات المحافظ المحلية ونقاط التوزيع الميدانية."
            )

        else:
            summary = (
                f"محافظة {gov_ar} تقع ضمن تصنيف ({tier}) بمعدل جاهزية رقمية عام {score_overall}%. "
                f"يسجل استخدام الإنترنت ({internet}%) والهواتف الذكية ({row['Smartphone_Ownership']}%)، "
                f"مع معدل شراء إلكتروني يبلغ ({purchase}%) وإنفاق اتصالات يقارب ({spending:,.1f} ألف دينار)."
            )
            recommendations = [
                "تطبيقات الخدمات المحلية وتوصيل الطلبات الأساسية عبر الهواتف",
                "منصات التوزيع الزراعي أو التجاري المحلي حسب طبيعة المحافظة",
                "تطبيقات التعليم والخدمات الحكومية الرقمية للمواطنين"
            ]
            bottleneck_advice = (
                f"الاعتماد على الحواسيب يبلغ ({pc}%) بينما الهواتف تغطي ({row['Smartphone_Ownership']}%). "
                "التوصية: البناء بالكامل على تطبيقات الموبايل خفيفة الحجم والمجهزة للعمل في سرعات إنترنت متقلبة."
            )

        insights_item = {
            "Governorate": gov_en,
            "Governorate_Ar": gov_ar,
            "Region_Type": row["Region_Type"],
            "Overall_Score": score_overall,
            "Market_Tier": tier,
            "Best_Fit_Model": best_fit,
            "AI_Explanation": {
                "Title": f"ماذا تعني هذه البيانات لمشروعك في {gov_ar}؟",
                "Executive_Summary": summary,
                "Recommended_Business_Models": recommendations,
                "Strategic_Bottleneck_Advice": bottleneck_advice,
                "Ground_Truth_Telemetry": {
                    "Internet_Usage": f"{internet}% (جدول 1-5)",
                    "Smartphone_Ownership": f"{row['Smartphone_Ownership']}% (جدول 1-4)",
                    "Computer_Usage": f"{pc}% (جدول 1-10)",
                    "Digital_Skills": f"{skills}% (جدول 1-17)",
                    "Online_Purchase": f"{purchase}% (جدول 1-18)",
                    "Telecom_Spending": f"{spending:,.1f} ألف دينار (جدول 2-5)",
                    "Cash_On_Delivery": f"{cod_pct}% (جدول 1-19)",
                    "Smart_Card_Offices": f"{offices} مكتب (إحصاءات 2024)"
                }
            }
        }
        explanations.append(insights_item)

    print(f" Generated comprehensive AI Insights for all {len(explanations)} Governorates.")
    return explanations

def main():
    if not os.path.exists(INPUT_SCORES):
        raise FileNotFoundError(f"Scores file not found: {INPUT_SCORES}")

    df = pd.read_csv(INPUT_SCORES, encoding='utf-8')
    insights = generate_ai_insights(df)

    with open(OUTPUT_AI_JSON, 'w', encoding='utf-8') as f:
        json.dump(insights, f, ensure_ascii=False, indent=2)

    print(f"\n✅ AI Explanation Layer Completed successfully!")
    print(f"📁 Output JSON: {OUTPUT_AI_JSON}")

    # Preview Baghdad & Basrah
    print("\n" + "=" * 65)
    print("📝 SAMPLE AI EXPLANATION [Baghdad]:")
    print("=" * 65)
    bg = next(item for item in insights if item["Governorate"] == "Baghdad")
    print(f"العنوان: {bg['AI_Explanation']['Title']}")
    print(f"الملخص: {bg['AI_Explanation']['Executive_Summary']}")
    print(f"النماذج المقترحة: {', '.join(bg['AI_Explanation']['Recommended_Business_Models'])}")
    print(f"عقبة الكاش والحل: {bg['AI_Explanation']['Strategic_Bottleneck_Advice']}")

if __name__ == "__main__":
    main()
