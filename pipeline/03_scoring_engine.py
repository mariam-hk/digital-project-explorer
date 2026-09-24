# -*- coding: utf-8 -*-
"""
Step 4 & 5: Scoring Engine & Location Scores Pipeline
Project: TechLocation AI — Digital Market Explorer

This script:
1. Implements specialized Scoring Algorithms tailored to 4 major tech startup models:
   - 🛒 E-Commerce & Delivery (منصات التجارة والتوصيل)
   - 💳 FinTech & Digital Payments (شركات وبوابات الدفع الإلكتروني)
   - 💻 B2B SaaS & Tech Hubs (شركات البرمجيات والمواهب التقنية)
   - 📱 Consumer Apps & Digital Media (تطبيقات المستهلك العامة)

2. Calculates Market Tiers:
   - Tier 1: Prime Market (سوق ذو أولوية وجاهزية مرتفعة)
   - Tier 2: High Growth Market (سوق نمو سريع وواعد)
   - Tier 3: Emerging Market (سوق ناشئ يحتاج تأسيس سلوك)

3. Identifies Key Strengths (نقاط القوة) and Bottlenecks (التحديات) for each governorate
   to feed directly into the AI Explanation Layer.

Outputs:
- pipeline/data/location_scores.csv
- pipeline/data/location_scores.json
"""

import os
import sys
import json
import pandas as pd
import numpy as np

# Set stdout to UTF-8
sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(__file__)
DATA_DIR = os.path.join(BASE_DIR, "data")

INPUT_FEATURES = os.path.join(DATA_DIR, "governorate_features.csv")
OUTPUT_SCORES_CSV = os.path.join(DATA_DIR, "location_scores.csv")
OUTPUT_SCORES_JSON = os.path.join(DATA_DIR, "location_scores.json")

def calculate_business_scores(df: pd.DataFrame) -> pd.DataFrame:
    print("=" * 65)
    print("🎯 [Step 4 & 5: SCORING ENGINE & LOCATION EVALUATION]")
    print("=" * 65)

    def min_max(series):
        min_v, max_v = series.min(), series.max()
        if max_v == min_v:
            return pd.Series(50.0, index=series.index)
        return ((series - min_v) / (max_v - min_v)) * 100.0

    spending_norm = min_max(df["Telecom_Spending"])
    offices_norm = min_max(df["Smart_Payment_Offices"])
    ftth_norm = min_max(df["FTTH_Subscribers"])

    # Model 1: E-Commerce & Delivery Score (0-100)
    # Focus: Online shopping behavior, smartphone adoption, and household spending
    df["Score_ECommerce"] = (
        0.40 * df["Online_Purchase"] +
        0.30 * df["E_Commerce_Adoption"] +
        0.20 * spending_norm +
        0.10 * df["Smartphone_Ownership"]
    ).round(1)

    # Model 2: FinTech & Digital Payments Score (0-100)
    # Focus: FinTech opportunity gap, financial spending capacity, payment point presence
    df["Score_FinTech"] = (
        0.40 * df["FinTech_Opportunity"] +
        0.30 * spending_norm +
        0.15 * offices_norm +
        0.15 * df["Online_Purchase"]
    ).round(1)

    # Model 3: B2B SaaS & Tech Talent Score (0-100)
    # Focus: Tech talent availability, computer usage, digital skills, fiber connectivity
    df["Score_SaaS_Tech"] = (
        0.40 * df["Digital_Talent"] +
        0.30 * df["Computer_Usage"] +
        0.15 * df["Digital_Skills"] +
        0.15 * ftth_norm
    ).round(1)

    # Model 4: Consumer Apps & Digital Services Score (0-100)
    # Focus: General smartphone and internet penetration, baseline digital readiness
    df["Score_Consumer_Apps"] = (
        0.40 * df["Digital_Readiness"] +
        0.35 * df["Smartphone_Ownership"] +
        0.25 * df["Internet_Usage"]
    ).round(1)

    # Determine Best-Fit Business Model for each governorate
    def get_best_fit(row):
        scores = {
            "E-Commerce & Delivery": row["Score_ECommerce"],
            "FinTech & Payments": row["Score_FinTech"],
            "B2B SaaS & Tech Hub": row["Score_SaaS_Tech"],
            "Consumer Apps": row["Score_Consumer_Apps"]
        }
        return max(scores, key=scores.get)

    df["Best_Fit_Model"] = df.apply(get_best_fit, axis=1)

    # Assign Market Tiers
    def get_tier(score):
        if score >= 60.0:
            return "Tier 1: Prime Market (سوق ذو أولوية قصوى)"
        elif score >= 45.0:
            return "Tier 2: High Growth (سوق نمو سريع)"
        else:
            return "Tier 3: Emerging (سوق ناشئ)"

    df["Market_Tier"] = df["Overall_Digital_Score"].apply(get_tier)

    # Generate Strengths & Bottlenecks per location
    def get_insights(row):
        strengths = []
        bottlenecks = []

        if row["Online_Purchase"] >= 50.0:
            strengths.append("معدل شراء إلكتروني مرتفع (>50%)")
        if row["Telecom_Spending"] >= 280.0:
            strengths.append("قدرة إنفاق شهرية مرتفعة على التكنولوجيا")
        if row["Digital_Skills"] >= 45.0:
            strengths.append("مهارات رقمية متقدمة بين الأفراد")
        if row["Computer_Usage"] >= 30.0:
            strengths.append("انتشار واسع للحواسيب واللابتوبات")
        if row["Smart_Payment_Offices"] >= 20:
            strengths.append("شبكة مكاتب بطاقات ذكية ودفع إلكتروني واسعة")

        if row["Cash_On_Delivery_Pct"] >= 99.5:
            bottlenecks.append("اعتماد كلي شبه تام على الدفع عند الاستلام (كاش)")
        if row["Computer_Usage"] < 15.0:
            bottlenecks.append("انخفاض استخدام الحواسيب والاعتماد شبه الحصري على الهواتف")
        if row["Smart_Payment_Offices"] < 10:
            bottlenecks.append("قلة مكاتب الدفع الإلكتروني ونقاط الشحن")

        return pd.Series([
            " | ".join(strengths) if strengths else "انتشار واسع للهواتف الذكية والإنترنت",
            " | ".join(bottlenecks) if bottlenecks else "تحديات لوجستية معتادة"
        ])

    df[["Key_Strengths", "Key_Bottlenecks"]] = df.apply(get_insights, axis=1)

    # Sorting
    df = df.sort_values(by="Overall_Digital_Score", ascending=False).reset_index(drop=True)
    df["Rank"] = range(1, len(df) + 1)

    return df

def main():
    if not os.path.exists(INPUT_FEATURES):
        raise FileNotFoundError(f"Missing features file: {INPUT_FEATURES}")

    df = pd.read_csv(INPUT_FEATURES, encoding='utf-8')
    scored_df = calculate_business_scores(df)

    # Save outputs
    scored_df.to_csv(OUTPUT_SCORES_CSV, index=False, encoding='utf-8')
    scored_df.to_json(OUTPUT_SCORES_JSON, orient='records', force_ascii=False, indent=2)

    print("\n✅ Successfully calculated Location Scores across 4 Business Models!")
    print(f"📁 Output CSV:  {OUTPUT_SCORES_CSV}")
    print(f"📁 Output JSON: {OUTPUT_SCORES_JSON}")

    print("\n" + "=" * 65)
    print("🏆 TOP RANKED GOVERNORATES BY STARTUP MODEL:")
    print("=" * 65)
    
    print("\n🛒 [Best for E-Commerce & Delivery]:")
    print(scored_df.sort_values(by="Score_ECommerce", ascending=False)[["Rank", "Governorate_Ar", "Score_ECommerce", "Market_Tier"]].head(3).to_string(index=False))

    print("\n💳 [Best for FinTech & Payments]:")
    print(scored_df.sort_values(by="Score_FinTech", ascending=False)[["Rank", "Governorate_Ar", "Score_FinTech", "Market_Tier"]].head(3).to_string(index=False))

    print("\n💻 [Best for B2B SaaS & Tech Talent]:")
    print(scored_df.sort_values(by="Score_SaaS_Tech", ascending=False)[["Rank", "Governorate_Ar", "Score_SaaS_Tech", "Market_Tier"]].head(3).to_string(index=False))

    print("\n📱 [Best for Consumer Apps]:")
    print(scored_df.sort_values(by="Score_Consumer_Apps", ascending=False)[["Rank", "Governorate_Ar", "Score_Consumer_Apps", "Market_Tier"]].head(3).to_string(index=False))

if __name__ == "__main__":
    main()
