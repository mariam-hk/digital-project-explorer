"use client";

import React from "react";
import { Sparkles, Globe, BarChart3, Database } from "lucide-react";

interface HeaderProps {
  lang: "en" | "ar";
  setLang: (lang: "en" | "ar") => void;
  onOpenDataSources: () => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, setLang, onOpenDataSources }) => {
  const isAr = lang === "ar";

  return (
    <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-slate-900 tracking-tight">
                TechLocation <span className="text-indigo-600">AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                <Sparkles className="w-3 h-3 text-indigo-500" />
                {isAr ? "مستكشف السوق الرقمي" : "Market Explorer"}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {isAr
                ? "استكشاف السلوك الرقمي للمجتمع والمحافظات لدعم رواد الأعمال"
                : "Explore citizens' digital behaviors across locations to guide tech ventures"}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Data Sources Button */}
          <button
            onClick={onOpenDataSources}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors"
            title={isAr ? "مصادر البيانات والمنهجية" : "Data sources and methodology"}
          >
            <Database className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden md:inline">{isAr ? "مصادر البيانات" : "Data Sources"}</span>
          </button>

          {/* Demo Data Tag */}
          <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            {isAr ? "بيانات تجريبية موثقة" : "Demo Data"}
          </span>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(isAr ? "en" : "ar")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-all shadow-sm"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isAr ? "English" : "العربية"}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
