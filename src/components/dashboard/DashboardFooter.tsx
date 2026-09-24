"use client";

import React from "react";

interface DashboardFooterProps {
  lang: "en" | "ar";
}

export const DashboardFooter: React.FC<DashboardFooterProps> = ({ lang }) => {
  const isAr = lang === "ar";

  return (
    <footer className="mt-8 border-t border-white/5 py-5 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 font-medium">
      {/* Left: Sources & Attribution */}
      <div className="flex items-center gap-2 text-center sm:text-left">
        <span>
          {isAr
            ? "المصدر: هيئة الإحصاء ونظم المعلومات الجغرافية - COSIT (2022، 2024)"
            : "Source: COSIT (2022, 2024)"}
        </span>
        <span className="text-slate-700">|</span>
        <span>
          {isAr
            ? "التحليل: منصة ذكاء السوق الرقمي العراقي"
            : "Analysis: Iraq Digital Market Intelligence"}
        </span>
        <span className="text-slate-700">|</span>
        <span className="text-slate-400">
          {isAr ? "آخر تحديث: 2026" : "Last updated: 2026"}
        </span>
      </div>

      {/* Right: Slogan */}
      <div className="flex items-center gap-2 text-slate-400 text-[11px]">
        <span>{isAr ? "بيانات موثوقة" : "Reliable Data"}</span>
        <span className="text-slate-700">•</span>
        <span>{isAr ? "رؤى عملية" : "Actionable Insights"}</span>
        <span className="text-slate-700">•</span>
        <span className="text-purple-400 font-semibold">
          {isAr ? "عراق أكثر اتصالاً" : "A More Connected Iraq"}
        </span>
      </div>
    </footer>
  );
};
