"use client";

import React from "react";
import { TOPICS, TopicConfig } from "../../lib/data/iraq-dashboard-data";
import { Sparkles, Globe, MapPin, BarChart2, ShieldCheck } from "lucide-react";

interface NeonHeaderProps {
  currentMode: "all_governorates" | "single_governorate";
  onModeChange: (mode: "all_governorates" | "single_governorate") => void;
  selectedTopic: TopicConfig;
  onTopicChange: (topic: TopicConfig) => void;
  lang: "en" | "ar";
  onToggleLang: () => void;
}

export const NeonHeader: React.FC<NeonHeaderProps> = ({
  currentMode,
  onModeChange,
  selectedTopic,
  onTopicChange,
  lang,
  onToggleLang,
}) => {
  const isAr = lang === "ar";

  return (
    <header className="relative w-full overflow-hidden rounded-2xl bg-[#0B0F19] border border-cyan-500/20 p-6 shadow-[0_0_30px_rgba(6,182,212,0.15)] space-y-6">
      {/* Background Ambient Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Brand & Mode Switchers */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)] mb-2">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>
              {isAr
                ? "بيانات رسمية موثقة: مسح 2022 + إحصاءات الاتصالات 2024"
                : "Official COSIT Survey 2022 & Telecom 2024 Reports"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>TechLocation <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">AI</span></span>
            <span className="text-xs font-normal text-slate-400 border-l border-white/20 pl-3">
              {isAr ? "ذكاء السوق وسلوك المجتمع الرقمي" : "Digital Behavior Intelligence"}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            {isAr
              ? "استكشف مؤشرات السلوك الرقمي للمحافظات العراقية (عدا إقليم كردستان) لمساعدة رواد الأعمال في تحديد الموقع ونموذج العمل الأنسب."
              : "Interactive location intelligence across Iraqi governorates (excl. Kurdistan) to guide technology entrepreneurs."}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* View Mode Toggle: All Governorates vs Single Governorate */}
          <div className="flex items-center bg-[#131B2E] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => onModeChange("all_governorates")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentMode === "all_governorates"
                  ? "bg-cyan-500 text-[#090D1A] shadow-[0_0_15px_rgba(6,182,212,0.6)] font-bold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>{isAr ? "مقارنة كل المحافظات" : "All Governorates"}</span>
            </button>

            <button
              onClick={() => onModeChange("single_governorate")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentMode === "single_governorate"
                  ? "bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)] font-bold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{isAr ? "تحليل محافظة محددة" : "Single Governorate"}</span>
            </button>
          </div>

          {/* Language switch */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isAr ? "English" : "العربية"}</span>
          </button>
        </div>
      </div>

      {/* Topics / Indicators Navigation Row with Neon Glow */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
            <span>⚡</span>
            {isAr ? "اختر المؤشر أو القطاع التقني:" : "Select Technology Indicator:"}
          </span>
          <span className="text-[11px] text-cyan-400 font-mono">
            {isAr ? selectedTopic.sourceAr : selectedTopic.sourceEn}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-1">
          {TOPICS.map((topic) => {
            const isActive = selectedTopic.id === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => onTopicChange(topic)}
                className={`relative group p-3 rounded-xl text-start transition-all duration-200 border ${
                  isActive
                    ? "bg-[#162035] border-cyan-400 text-white shadow-[0_0_18px_rgba(6,182,212,0.4)] scale-[1.02]"
                    : "bg-[#111726] border-white/5 hover:border-white/20 text-slate-300 hover:bg-[#151D30]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {topic.icon}
                  </span>
                  <span className="text-xs font-bold leading-tight">
                    {isAr ? topic.titleAr : topic.titleEn}
                  </span>
                </div>
                <div className="mt-1.5 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      backgroundColor: topic.neonColor,
                      width: isActive ? "100%" : "30%",
                      boxShadow: isActive ? `0 0 8px ${topic.neonColor}` : "none",
                    }}
                  ></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
