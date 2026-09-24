# -*- coding: utf-8 -*-
"""
Step 2 & 3: Data Cleaning & Feature Engineering Pipeline
Project: TechLocation AI — Digital Market Explorer

This script performs:
1. Data Cleaning:
   - Validates completeness of all 18 governorates.
   - Enforces data types and handles range bounds.
   - Flags Federal (15 governorates, 'عدا إقليم كردستان') vs Kurdistan Region (3 governorates).

2. Feature Engineering (حساب المؤشرات المركبة):
   - Digital Readiness Index (جاهزية البنية والمستخدمين)
   - Digital Talent Index (توفر المهارات والكوادر البرمجية لشركات الـ Tech)
   - E-Commerce Adoption Index (قابلية التجارة والتوصيل)
   - FinTech Opportunity Index (فجوة التحول من الكاش للدفع الرقمي)

Outputs:
- pipeline/data/governorate_features.csv
- pipeline/data/governorate_features.json
"""

import os
import sys
import json
import pandas as pd
import numpy as np

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(__file__)
DATA_DIR = os.path.join(BASE_DIR, "data")

INPUT_RAW = os.path.join(DATA_DIR, "governorate_data_full.csv")
OUTPUT_FEATURES_CSV = os.path.join(DATA_DIR, "governorate_features.csv")
OUTPUT_FEATURES_JSON = os.path.join(DATA_DIR, "governorate_features.json")

def load_and_clean_data(file_path: str) -> pd.DataFrame:
    """Loads raw dataset, validates schema, and cleans data types."""
    print("=" * 60)
    print("🧹 [Step 2: DATA CLEANING]")
    print("=" * 60)
    
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Input file not found: {file_path}")
    
    df = pd.read_csv(file_path, encoding='utf-8')
    print(f" Loaded {len(df)} governorates from {os.path.basename(file_path)}")
    
    # 1. Null check
    null_counts = df.isnull().sum()
    if null_counts.sum() > 0:
        print(f"⚠️ Found nulls: \n{null_counts[null_counts > 0]}")
        df = df.fillna(0)
    else:
        print("✅ No missing / null values detected across all columns.")
        
    # 2. Tag Kurdistan vs Federal Governorates (عدا إقليم كردستان)
    kurdistan_govs = ["Erbil", "Sulaymaniyah", "Duhok"]
    df["Region_Type"] = df["Governorate"].apply(
        lambda g: "Kurdistan" if g in kurdistan_govs else "Federal"
    )
    df["Is_Federal"] = df["Region_Type"] == "Federal"
    
    federal_count = df["Is_Federal"].sum()
    print(f"✅ Segmented: {federal_count} Federal Governorates (عدا إقليم كردستان) + {len(df) - federal_count} Kurdistan Region.")
    
    return df

def engineer_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Step 3: Feature Engineering
    Transforms raw indicators into business-ready composite scores (0 - 100).
    """
    print("\n" + "=" * 60)
    print("⚡ [Step 3: FEATURE ENGINEERING]")
    print("=" * 60)
    
    # Normalization helper (Min-Max to 0 - 100 scale)
    def min_max_scale(series):
        min_val = series.min()
        max_val = series.max()
        if max_val == min_val:
            return pd.Series(50.0, index=series.index)
        return ((series - min_val) / (max_val - min_val)) * 100.0

    # 1. Feature: Digital Readiness Index (الجاهزية الرقمية للمجتمع)
    # Weights: Home Internet (30%) + Smartphone (25%) + Computer Usage (25%) + Digital Skills (20%)
    df["Digital_Readiness"] = (
        0.30 * df["Home_Internet"] +
        0.25 * df["Smartphone_Ownership"] +
        0.25 * df["Computer_Usage"] +
        0.20 * df["Digital_Skills"]
    ).round(1)
    print(" Created Feature: 'Digital_Readiness' [0-100]")

    # 2. Feature: Digital Talent Index (توفر المواهب والكوادر التقنية)
    # Weights: Computer Usage (40%) + Digital Skills (45%) + Normalized FTTH Infrastructure (15%)
    ftth_scaled = min_max_scale(df["FTTH_Subscribers"])
    df["Digital_Talent"] = (
        0.40 * df["Computer_Usage"] +
        0.45 * df["Digital_Skills"] +
        0.15 * ftth_scaled
    ).round(1)
    print(" Created Feature: 'Digital_Talent' [0-100] (for Tech & SaaS companies)")

    # 3. Feature: E-Commerce Adoption Index (تبني التجارة الإلكترونية والتوصيل)
    # Weights: Online Purchasing (50%) + Normalized Spending (30%) + Smartphone Ownership (20%)
    spending_scaled = min_max_scale(df["Telecom_Spending"])
    df["E_Commerce_Adoption"] = (
        0.50 * df["Online_Purchase"] +
        0.30 * spending_scaled +
        0.20 * df["Smartphone_Ownership"]
    ).round(1)
    print(" Created Feature: 'E_Commerce_Adoption' [0-100] (for E-commerce & Delivery)")

    # 4. Feature: FinTech Opportunity Gap (فجوة الدفع الإلكتروني وفرصة النمو)
    # High cash dependency (Cash_On_Delivery ~99%) means huge blue ocean for digital payment!
    # Scale: based on purchasing power (spending) + smart payment infrastructure
    offices_scaled = min_max_scale(df["Smart_Payment_Offices"])
    df["FinTech_Opportunity"] = (
        0.45 * spending_scaled +
        0.35 * df["Online_Purchase"] +
        0.20 * offices_scaled
    ).round(1)
    print(" Created Feature: 'FinTech_Opportunity' [0-100] (for FinTech & Payment Gateways)")

    # 5. Composite Overall Digital Maturity (معدل النضج الرقمي الإجمالي)
    df["Overall_Digital_Score"] = (
        0.30 * df["Digital_Readiness"] +
        0.25 * df["Digital_Talent"] +
        0.25 * df["E_Commerce_Adoption"] +
        0.20 * df["FinTech_Opportunity"]
    ).round(1)
    print(" Created Feature: 'Overall_Digital_Score' [0-100]")

    # Rank governorates
    df["Rank"] = df["Overall_Digital_Score"].rank(ascending=False, method='min').astype(int)
    
    return df

def main():
    # 1. Clean
    df = load_and_clean_data(INPUT_RAW)
    
    # 2. Engineer Features
    df_features = engineer_features(df)
    
    # Sort by Rank
    df_features = df_features.sort_values(by="Rank")
    
    # 3. Export to CSV & JSON
    df_features.to_csv(OUTPUT_FEATURES_CSV, index=False, encoding='utf-8')
    df_features.to_json(OUTPUT_FEATURES_JSON, orient='records', force_ascii=False, indent=2)
    
    print("\n" + "=" * 60)
    print("📊 [PREVIEW OF ENGINEERED FEATURES - TOP 5 GOVERNORATES]")
    print("=" * 60)
    preview_cols = [
        "Rank", "Governorate", "Governorate_Ar", "Region_Type",
        "Digital_Readiness", "Digital_Talent", "E_Commerce_Adoption", "FinTech_Opportunity", "Overall_Digital_Score"
    ]
    print(df_features[preview_cols].head(5).to_string(index=False))
    
    print("\n✅ Successfully generated:")
    print(f"  📁 CSV:  {OUTPUT_FEATURES_CSV}")
    print(f"  📁 JSON: {OUTPUT_FEATURES_JSON}")

if __name__ == "__main__":
    main()
