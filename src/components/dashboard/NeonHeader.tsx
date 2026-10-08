"use client";

import React from "react";
import { TOPICS, TopicConfig } from "../../lib/data/iraq-dashboard-data";
import { MapPin, BarChart2, Map, BarChart3 } from "lucide-react";

interface NeonHeaderProps {
  currentMode: "all_governorates" | "single_governorate";
  onModeChange: (mode: "all_governorates" | "single_governorate") => void;
  selectedTopic: TopicConfig;
  onTopicChange: (topic: TopicConfig) => void;
  lang: "en" | "ar";
  onToggleLang?: () => void;
  viewType?: "map" | "chart";
  onViewTypeChange?: (view: "map" | "chart") => void;
}

export const NeonHeader: React.FC<NeonHeaderProps> = ({
  currentMode,
  onModeChange,
  selectedTopic,
  onTopicChange,
  lang,
  onToggleLang,
  viewType = "map",
  onViewTypeChange,
}) => {
  const isAr = lang === "ar";

  return (
    <header className="relative w-full overflow-hidden rounded-2xl bg-[#0B0F19] border border-cyan-500/20 p-6 shadow-[0_0_30px_rgba(6,182,212,0.15)] space-y-6">
      {/* Background Ambient Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Topics / Indicators Navigation Row */}
      <div className="relative z-10 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
            <span>⚡</span>
            {isAr ? "اختر المؤشر أو القطاع التقني:" : "Select Technology Indicator:"}
          </span>

          <div className="flex items-center gap-3">
            {/* View Switcher: Map vs Chart (when in all_governorates mode) */}
            {currentMode === "all_governorates" && onViewTypeChange && (
              <div className="flex items-center bg-[#131B2E] p-1 rounded-xl border border-cyan-500/30 shadow-inner">
                <button
                  onClick={() => onViewTypeChange("map")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    viewType === "map"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-[#070B14] shadow-[0_0_12px_rgba(6,182,212,0.6)] font-bold"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Map className="w-3.5 h-3.5" />
                  <span>{isAr ? "الخريطة" : "Map"}</span>
                </button>

                <button
                  onClick={() => onViewTypeChange("chart")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    viewType === "chart"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-[#070B14] shadow-[0_0_12px_rgba(6,182,212,0.6)] font-bold"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>{isAr ? "الرسوم البيانية" : "Charts"}</span>
                </button>
              </div>
            )}

            {/* Mode Switcher */}
            <div className="flex items-center bg-[#131B2E] p-1 rounded-xl border border-white/10 shadow-inner">
              <button
                onClick={() => onModeChange("all_governorates")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  currentMode === "all_governorates"
                    ? "bg-cyan-500 text-[#090D1A] shadow-[0_0_15px_rgba(6,182,212,0.6)] font-bold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>{isAr ? "كافة المحافظات" : "All Governorates"}</span>
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
                <span>{isAr ? "محافظة منفردة" : "Single Governorate"}</span>
              </button>
            </div>

            {/* Source citation text commented out upon user request
            <span className="text-[11px] text-cyan-400 font-mono hidden md:inline-block">
              {isAr ? selectedTopic.sourceAr : selectedTopic.sourceEn}
            </span>
            */}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-2.5 pt-1">
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
