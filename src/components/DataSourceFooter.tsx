"use client";

import React from "react";
import { Database, ShieldAlert, Sparkles, ExternalLink } from "lucide-react";

interface DataSourceFooterProps {
  onOpenSources: () => void;
  lang: "en" | "ar";
}

export const DataSourceFooter: React.FC<DataSourceFooterProps> = ({
  onOpenSources,
  lang,
}) => {
  const isAr = lang === "ar";

  return (
    <footer className="mt-12 border-t border-slate-200 bg-white/70 py-8 px-4 sm:px-6 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Branding & Core Principles */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-start">
          <span className="font-bold text-slate-800">
            TechLocation <span className="text-indigo-600">AI</span>
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span>
            {isAr
              ? "منصة ذكاء المواقع: البيانات أولاً ← التفسير التحليلي ← دعم قرارات رواد الأعمال"
              : "Location Intelligence: Evidence First → Analytical Interpretation → Founder Support"}
          </span>
        </div>

        {/* Right: Demo Notice & Modal trigger */}
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-medium">
            {isAr ? "بيانات تجريبية موثقة — Demo Data" : "Demo Data Mode"}
          </span>

          <button
            onClick={onOpenSources}
            className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-semibold hover:underline"
          >
            <Database className="w-3.5 h-3.5" />
            <span>{isAr ? "مراجعة مصادر البيانات والمنهجية" : "View Sources & Methodology"}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
