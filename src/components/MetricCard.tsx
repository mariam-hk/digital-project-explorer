"use client";

import React from "react";
import { IndicatorData } from "../lib/types";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  indicator: IndicatorData;
  lang: "en" | "ar";
}

export const MetricCard: React.FC<MetricCardProps> = ({ indicator, lang }) => {
  const isAr = lang === "ar";
  const { value, nationalAverage, benchmarkDelta, tier } = indicator;

  // Tier color styling
  const tierConfig = {
    very_high: {
      labelEn: "Very High",
      labelAr: "مرتفع جداً",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      bar: "bg-emerald-500",
    },
    high: {
      labelEn: "Strong",
      labelAr: "قوي ونشط",
      badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
      bar: "bg-indigo-600",
    },
    moderate: {
      labelEn: "Moderate",
      labelAr: "متوسط",
      badge: "bg-amber-50 text-amber-700 border-amber-200",
      bar: "bg-amber-500",
    },
    developing: {
      labelEn: "Developing",
      labelAr: "مرحلة نمو",
      badge: "bg-slate-100 text-slate-700 border-slate-200",
      bar: "bg-slate-400",
    },
  }[tier];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              {indicator.icon}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                {isAr ? indicator.nameAr : indicator.nameEn}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {isAr ? indicator.sourceAr : indicator.sourceEn} ({indicator.year})
              </p>
            </div>
          </div>

          {/* Tier Badge */}
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${tierConfig.badge}`}
          >
            {isAr ? tierConfig.labelAr : tierConfig.labelEn}
          </span>
        </div>

        {/* Value Display */}
        <div className="mt-4 flex items-baseline justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {value}
            </span>
            <span className="text-lg font-semibold text-slate-500">{indicator.unit}</span>
          </div>

          {/* Benchmark comparison badge */}
          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg ${
              benchmarkDelta > 0
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                : benchmarkDelta < 0
                ? "bg-rose-50 text-rose-700 border border-rose-200/60"
                : "bg-slate-100 text-slate-600 border border-slate-200"
            }`}
          >
            {benchmarkDelta > 0 ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : benchmarkDelta < 0 ? (
              <TrendingDown className="w-3.5 h-3.5" />
            ) : (
              <Minus className="w-3.5 h-3.5" />
            )}
            <span>
              {benchmarkDelta > 0 ? `+${benchmarkDelta}%` : `${benchmarkDelta}%`}
            </span>
            <span className="text-[10px] font-normal opacity-80">
              {isAr ? "عن المعدل الوطني" : "vs Avg"}
            </span>
          </div>
        </div>

        {/* Progress Bar with National Average Marker */}
        <div className="mt-3.5 space-y-1.5">
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden relative">
            <div
              className={`h-full rounded-full transition-all duration-500 ${tierConfig.bar}`}
              style={{ width: `${value}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>0%</span>
            <span>
              {isAr ? "المعدل الوطني: " : "National Avg: "}
              <strong className="text-slate-600">{nationalAverage}%</strong>
            </span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Demo tag at bottom */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span className="inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          {isAr ? "بيانات تجريبية موثقة" : "Demo Survey Data"}
        </span>
        <span className="text-slate-500 font-mono text-[10px]">{indicator.id.toUpperCase()}</span>
      </div>
    </div>
  );
};
