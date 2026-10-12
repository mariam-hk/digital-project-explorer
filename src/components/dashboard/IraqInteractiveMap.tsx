"use client";

import React, { useState, useEffect } from "react";
import { GovernorateMetric, TopicConfig } from "../../lib/data/iraq-dashboard-data";
import { IRAQ_GOV_SVG_PATHS } from "../../lib/data/iraq-svg-paths";
import {
  MapPin,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  MousePointerClick,
} from "lucide-react";

interface IraqInteractiveMapProps {
  governorates: GovernorateMetric[];
  selectedTopic: TopicConfig;
  onSelectGovernorate: (gov: GovernorateMetric) => void;
  lang: "ar" | "en";
  scope: "federal" | "all";
  theme?: "dark" | "light";
}

const KURDISTAN_IDS = ["erbil", "sulaymaniyah", "duhok"];

export const IraqInteractiveMap: React.FC<IraqInteractiveMapProps> = ({
  governorates,
  selectedTopic,
  onSelectGovernorate,
  lang,
  scope,
  theme = "dark",
}) => {
  const isLight = theme === "light";
  const isAr = lang === "ar";
  const [hoveredGovId, setHoveredGovId] = useState<string | null>(null);
  const [selectedGovId, setSelectedGovId] = useState<string>(governorates[0]?.id || "baghdad");
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // If scope switches to federal and selected was in Kurdistan, reset selection to Baghdad
  useEffect(() => {
    if (scope === "federal" && selectedGovId && KURDISTAN_IDS.includes(selectedGovId)) {
      setSelectedGovId("baghdad");
    }
  }, [scope, selectedGovId]);

  // Hovered gov data for floating tooltip
  const hoveredGov = hoveredGovId
    ? governorates.find((g) => g.id === hoveredGovId)
    : null;

  // Active gov data for the side card (preserves last selected/hovered gov)
  const activeGov =
    governorates.find((g) => g.id === (hoveredGovId || selectedGovId)) ||
    governorates.find((g) => g.id === selectedGovId) ||
    governorates.find((g) => g.id === "baghdad") ||
    governorates[0];

  // Handle SVG mouse move to position tooltip relative to SVG container
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="relative w-full rounded-2xl bg-white dark:bg-[#192436] border border-[#D5DFEB] dark:border-[#344258] p-4 sm:p-6 shadow-sm dark:shadow-none space-y-5 overflow-hidden transition-colors duration-300">
      {/* Ambient background glow */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ background: selectedTopic.neonColor }}
      />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D5DFEB] dark:border-[#344258] pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#EAF0F7] border border-[#087EAD]/30 text-[#087EAD] dark:bg-[#223047] dark:border-[#58B6CC]/30 dark:text-[#58B6CC] shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-[#17243A] dark:text-[#E8EEF7] tracking-wide">
                {isAr
                  ? `خريطة العراق التفاعلية: ${selectedTopic.titleAr}`
                  : `Iraq Interactive Map: ${selectedTopic.titleEn}`}
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#EAF0F7] text-[#087EAD] border border-[#087EAD]/40 dark:bg-[#223047] dark:text-[#58B6CC] dark:border-[#58B6CC]/40">
                {scope === "all"
                  ? isAr
                    ? "كل العراق (18 محافظة)"
                    : "All 18 Governorates"
                  : isAr
                  ? "15 محافظة (عدا الإقليم)"
                  : "15 Federal"}
              </span>
            </div>
            <p className="text-xs text-[#52647B] dark:text-[#A9B8CB] mt-0.5 flex items-center gap-1.5">
              <MousePointerClick className="w-3.5 h-3.5 text-[#087EAD] dark:text-[#58B6CC]" />
              <span>
                {isAr
                  ? "مرّر الماوس فوق أي محافظة لتضيء وتظهر نسبتها فوراً"
                  : "Hover over any governorate to highlight and view its percentage"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Map Body: Interactive SVG Map (8 Cols) + Details Card (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10">
        {/* SVG Interactive Map Area (8 Cols) */}
        <div className="lg:col-span-8 relative flex flex-col items-center justify-center rounded-2xl bg-[#F4F7FB] dark:bg-[#101827] border border-[#D5DFEB] dark:border-[#344258] p-2 sm:p-4 min-h-[500px] transition-colors duration-300">
          {/* Quick-Select Governorate Pills Bar (Top of Map) */}
          <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 scrollbar-none text-[11px]">
            <span className="text-[#52647B] dark:text-[#A9B8CB] font-bold whitespace-nowrap pl-1 text-[10px]">
              {isAr ? "المحافظات:" : "Governorates:"}
            </span>
            {governorates.map((g) => {
              const isHovered = g.id === hoveredGovId;
              const isSelected = g.id === selectedGovId;
              return (
                <button
                  key={g.id}
                  onClick={() => setSelectedGovId(g.id)}
                  onMouseEnter={() => setHoveredGovId(g.id)}
                  onMouseLeave={() => setHoveredGovId(null)}
                  className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                    isHovered || isSelected
                      ? "bg-[#087EAD] text-white dark:bg-[#58B6CC] dark:text-[#101827] font-black shadow-md scale-105"
                      : "bg-white text-[#52647B] hover:bg-[#EAF0F7] hover:text-[#17243A] border border-[#D5DFEB] dark:bg-[#223047] dark:text-[#A9B8CB] dark:hover:bg-[#344258] dark:hover:text-[#E8EEF7] dark:border-[#344258]"
                  }`}
                >
                  <span>{isAr ? g.nameAr : g.nameEn}</span>
                </button>
              );
            })}
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full flex items-center justify-center">
            <svg
              viewBox="0 0 800 820"
              className="w-full max-w-[780px] h-auto select-none filter drop-shadow-[0_0_25px_rgba(6,182,212,0.12)] cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                setHoveredGovId(null);
                setMousePos(null);
              }}
            >
              <defs>
                <filter id="hoverGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Render 18 Governorate Official Polygons */}
              {IRAQ_GOV_SVG_PATHS.map((region) => {
                const isKurdistan = KURDISTAN_IDS.includes(region.id);
                const isExcluded = scope === "federal" && isKurdistan;
                const gov = governorates.find((g) => g.id === region.id);
                const val = gov ? Number(gov[selectedTopic.metricKey]) || 0 : 0;

                // STRICT USER RULES:
                // 1. ALL governorates (including Kurdistan, Baghdad, Basra) share the EXACT SAME base color!
                // 2. Kurdistan has NO names when in federal mode (scope === "federal").
                // 3. ONLY the governorate being hovered over changes color to cyan and shows the percentage!
                const isHovered = hoveredGovId === region.id && !isExcluded;

                let fillColor = isLight ? "#CBD9E8" : "#2B4057";
                let strokeColor = isLight ? "#D5DFEB" : "#344258";
                let strokeWidth = "1.2";

                if (isHovered) {
                  fillColor = isLight ? "#087EAD" : "#58B6CC";
                  strokeColor = isLight ? "#065E82" : "#E8EEF7";
                  strokeWidth = "2.5";
                }

                const isSmallGov = ["baghdad", "babylon", "kerbela"].includes(region.id);

                return (
                  <g
                    key={region.id}
                    className={`transition-all duration-150 ${
                      isExcluded ? "cursor-default" : "cursor-pointer"
                    }`}
                    onClick={() => {
                      if (!isExcluded && gov) {
                        setSelectedGovId(region.id);
                      }
                    }}
                    onMouseEnter={() => {
                      if (!isExcluded) {
                        setHoveredGovId(region.id);
                        setSelectedGovId(region.id);
                      }
                    }}
                    onMouseLeave={() => {
                      if (!isExcluded) {
                        setHoveredGovId(null);
                      }
                    }}
                  >
                    {/* Official Governorate Boundary Path */}
                    <path
                      d={region.path}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      className="transition-colors duration-150"
                      style={{
                        filter: isHovered ? "url(#hoverGlow)" : "none",
                      }}
                    />

                    {/* Governorate Name Text: OMITTED for Kurdistan when in federal mode */}
                    {!isExcluded && (
                      <g pointerEvents="none" className="select-none">
                        {/* If Hovered: Name moves slightly up, and the Percentage appears below it! */}
                        {isHovered ? (
                          <>
                            {/* Governorate Name */}
                            <text
                              x={region.cx}
                              y={region.cy - 7}
                              textAnchor="middle"
                              dominantBaseline="central"
                              fill={isLight ? "#FFFFFF" : "#101827"}
                              stroke={isLight ? "#087EAD" : "#58B6CC"}
                              strokeWidth="0.8"
                              paintOrder="stroke fill"
                              fontSize={isSmallGov ? "10" : "11"}
                              fontWeight="900"
                              fontFamily="sans-serif"
                            >
                              {isAr ? region.nameAr : region.nameEn}
                            </text>

                            {/* Percentage appears right on the map when hovered! */}
                            <text
                              x={region.cx}
                              y={region.cy + 8}
                              textAnchor="middle"
                              dominantBaseline="central"
                              fill={isLight ? "#FFFFFF" : "#101827"}
                              stroke={isLight ? "#087EAD" : "#58B6CC"}
                              strokeWidth="0.8"
                              paintOrder="stroke fill"
                              fontSize={isSmallGov ? "11" : "12"}
                              fontWeight="900"
                              fontFamily="monospace"
                            >
                              {val}{selectedTopic.unit}
                            </text>
                          </>
                        ) : (
                          /* When NOT hovered: ONLY the governorate name is displayed */
                          <text
                            x={region.cx}
                            y={region.cy}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill={isLight ? "#17243A" : "#E8EEF7"}
                            stroke={isLight ? "#CBD9E8" : "#101827"}
                            strokeWidth="3.5"
                            paintOrder="stroke fill"
                            fontSize={isSmallGov ? "11" : "12"}
                            fontWeight="900"
                            fontFamily="sans-serif"
                          >
                            {isAr ? region.nameAr : region.nameEn}
                          </text>
                        )}
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Dynamic Floating Tooltip on Mouse Hover: Displays the Percentage and Name */}
            {hoveredGov && mousePos && (
              <div
                className="absolute pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full mb-3 transition-transform duration-75 ease-out"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y - 12}px`,
                }}
              >
                <div className="bg-white/95 text-slate-900 dark:bg-[#090E20]/95 dark:text-white backdrop-blur-md border border-slate-300 dark:border-cyan-400/80 rounded-xl px-4 py-2.5 shadow-xl dark:shadow-[0_0_25px_rgba(6,182,212,0.6)] text-center min-w-[150px] whitespace-nowrap">
                  {/* Governorate Name */}
                  <span className="text-xs font-black text-slate-900 dark:text-white block">
                    {isAr ? `محافظة ${hoveredGov.nameAr}` : hoveredGov.nameEn}
                  </span>

                  {/* Percentage Value */}
                  <div className="flex items-center justify-center gap-1.5 mt-1">
                    <span className="text-lg font-black text-cyan-600 dark:text-[#087EAD] dark:text-[#58B6CC] font-mono drop-shadow-[0_0_10px_rgba(6,182,212,0.9)]">
                      {hoveredGov[selectedTopic.metricKey]}
                      <span className="text-xs text-[#52647B] dark:text-[#A9B8CB] font-sans ml-0.5">
                        {selectedTopic.unit}
                      </span>
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#EAF0F7] text-[#087EAD] dark:bg-[#223047] dark:text-[#58B6CC] font-bold border border-[#087EAD]/30 dark:border-[#58B6CC]/30 whitespace-nowrap">
                      #{hoveredGov.rank}
                    </span>
                  </div>

                  {/* Metric Subtitle */}
                  <span className="text-[9px] text-[#52647B] dark:text-[#A9B8CB] block mt-0.5 whitespace-nowrap">
                    {isAr ? selectedTopic.titleAr : selectedTopic.titleEn}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Map Guidance Footer */}
          <div className="w-full flex items-center justify-between text-[11px] text-[#52647B] dark:text-[#A9B8CB] border-t border-[#D5DFEB] dark:border-[#344258] pt-2 mt-2 px-2">
            <span>
              {isAr
                ? "💡 مرّر الماوس فوق أي محافظة لتضيء وتظهر نسبتها فوراً"
                : "💡 Hover over any governorate to view percentage"}
            </span>
            <span className="font-mono text-[#087EAD] dark:text-[#58B6CC] font-bold">
              {activeGov ? (isAr ? activeGov.nameAr : activeGov.nameEn) : ""}:{" "}
              {activeGov ? activeGov[selectedTopic.metricKey] : ""}{selectedTopic.unit}
            </span>
          </div>
        </div>

        {/* Selected Governorate Full Strategic Intelligence Card (4 Cols) */}
        {activeGov && (
          <div className="lg:col-span-4 rounded-2xl bg-white dark:bg-[#192436] border-2 border-[#087EAD]/40 dark:border-[#58B6CC]/50 p-5 shadow-sm dark:shadow-none space-y-4 transition-colors duration-300">
            {/* Header info */}
            <div className="border-b border-[#D5DFEB] dark:border-[#344258] pb-3 flex items-start justify-between gap-2 sm:gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#EAF0F7] text-[#087EAD] dark:bg-[#223047] dark:text-[#58B6CC] border border-[#087EAD]/40 dark:border-[#58B6CC]/40 whitespace-nowrap inline-flex items-center">
                    #{activeGov.rank} {isAr ? "في عموم العراق" : "Nationwide"}
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-[#17243A] dark:text-[#E8EEF7] flex items-center gap-1.5 sm:gap-2 mt-1 truncate">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#087EAD] dark:text-[#58B6CC] animate-bounce shrink-0" />
                  <span className="truncate">{isAr ? activeGov.nameAr : activeGov.nameEn}</span>
                </h4>
              </div>

              {/* Big Metric Display */}
              <div className="text-left rtl:text-right shrink-0">
                <span className="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-[#087EAD] dark:text-[#58B6CC] font-mono drop-shadow-[0_0_12px_rgba(6,182,212,0.9)] whitespace-nowrap block">
                  {activeGov[selectedTopic.metricKey]}
                  <span className="text-base sm:text-lg text-[#52647B] dark:text-[#A9B8CB] font-sans ml-1">
                    {selectedTopic.unit}
                  </span>
                </span>
                <span className="block text-[10px] text-[#52647B] dark:text-[#A9B8CB] font-medium mt-0.5 whitespace-nowrap">
                  {isAr ? selectedTopic.titleAr : selectedTopic.titleEn}
                </span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="space-y-2.5 text-xs sm:text-[13px]">
              {/* Metric 1 */}
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-[#EAF0F7] border border-[#D5DFEB] hover:border-[#087EAD]/40 dark:bg-[#223047] dark:border-[#344258] dark:hover:border-[#58B6CC]/40 transition-all">
                <span className="text-[#52647B] dark:text-[#A9B8CB] font-medium">{selectedTopic.titleAr}</span>
                <span className="font-black text-[#087EAD] dark:text-[#58B6CC] font-mono text-[15px]">
                  {activeGov[selectedTopic.metricKey]} {selectedTopic.unit}
                </span>
              </div>

              {/* Metric 2: Household Telecom Spend */}
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-[#EAF0F7] border border-[#D5DFEB] hover:border-[#16876E]/40 dark:bg-[#223047] dark:border-[#344258] dark:hover:border-[#53B69B]/40 transition-all">
                <span className="text-[#52647B] dark:text-[#A9B8CB] font-medium">
                  {isAr ? "إنفاق الأسرة الشهري على التقنية" : "Monthly Tech Spending"}
                </span>
                <span className="font-black text-[#16876E] dark:text-[#53B69B] font-mono text-[15px]">
                  {activeGov.telecomSpending} {isAr ? "ألف د.ع" : "K IQD"}
                </span>
              </div>

              {/* Metric 3: Best Fit Model */}
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-[#EAF0F7] border border-[#D5DFEB] hover:border-[#AC6816]/40 dark:bg-[#223047] dark:border-[#344258] dark:hover:border-[#D7AC68]/40 transition-all">
                <span className="text-[#52647B] dark:text-[#A9B8CB] font-medium">
                  {isAr ? "نموذج العمل الأنسب" : "Best Fit Business Model"}
                </span>
                <span className="font-bold text-[#AC6816] dark:text-[#D7AC68] text-xs sm:text-[13px] text-left rtl:text-right">
                  {activeGov.bestFitModel}
                </span>
              </div>

              {/* Metric 4: Market Tier */}
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-[#EAF0F7] border border-[#D5DFEB] hover:border-[#8050BB]/40 dark:bg-[#223047] dark:border-[#344258] dark:hover:border-[#AE91D9]/40 transition-all">
                <span className="text-[#52647B] dark:text-[#A9B8CB] font-medium">
                  {isAr ? "تصنيف السوق" : "Market Tier"}
                </span>
                <span className="font-bold text-[#8050BB] dark:text-[#AE91D9] text-xs sm:text-[13px]">
                  {activeGov.marketTier}
                </span>
              </div>
            </div>

            {/* Strategic Intelligence Box */}
            <div className="p-3.5 rounded-xl bg-[#EAF0F7] border border-[#D5DFEB] dark:bg-[#223047] dark:border-[#344258] text-[#17243A] dark:text-[#E8EEF7] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#087EAD] dark:text-[#58B6CC] font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>{isAr ? "الرؤية والتحليل الاستثماري:" : "Strategic Investment Analysis:"}</span>
              </div>
              <p className="text-xs text-[#52647B] dark:text-[#A9B8CB] leading-relaxed">
                {activeGov.aiSummary}
              </p>
            </div>

            {/* Action Button: Open Full Dashboard */}
            <button
              onClick={() => onSelectGovernorate(activeGov)}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#087EAD] to-[#346BC1] hover:from-[#076C94] hover:to-[#2B5AA3] dark:from-[#58B6CC] dark:to-[#7A9FE0] dark:hover:from-[#4AA3B8] dark:hover:to-[#6B8ECC] text-white dark:text-[#101827] font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>
                {isAr
                  ? `عرض التحليل الشامل لمحافظة ${activeGov.nameAr}`
                  : `Open Full Deep-Dive for ${activeGov.nameEn}`}
              </span>
              {isAr ? (
                <ArrowLeft className="w-4.5 h-4.5 transition-transform group-hover:-translate-x-1" />
              ) : (
                <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
