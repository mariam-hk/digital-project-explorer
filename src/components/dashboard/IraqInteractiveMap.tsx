"use client";

import React, { useState, useEffect, useMemo } from "react";
import { GovernorateMetric, TopicConfig } from "../../lib/data/iraq-dashboard-data";
import { IRAQ_GOV_SVG_PATHS } from "../../lib/data/iraq-svg-paths";
import {
  MapPin,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  MousePointerClick,
  Palette,
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
  const [colorByValue, setColorByValue] = useState<boolean>(true);

  // Min, max, and avg metric values across current active governorates
  const { minVal, maxVal, avgVal } = useMemo(() => {
    const activeGovs = scope === "federal"
      ? governorates.filter((g) => !KURDISTAN_IDS.includes(g.id))
      : governorates;
    const vals = activeGovs
      .map((g) => Number(g[selectedTopic.metricKey]))
      .filter((v) => !isNaN(v));
    if (vals.length === 0) return { minVal: 0, maxVal: 100, avgVal: 50 };
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const avg = Number((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1));
    return {
      minVal: min,
      maxVal: max,
      avgVal: avg,
    };
  }, [governorates, scope, selectedTopic.metricKey]);

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
    <div className="relative w-full rounded-2xl bg-white dark:bg-[#111827] border border-[#CBD5E1] dark:border-[rgba(148,163,184,0.12)] p-4 sm:p-6 shadow-sm dark:shadow-none space-y-5 overflow-hidden transition-colors duration-300">
      {/* Ambient background glow */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ background: selectedTopic.neonColor }}
      />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#CBD5E1] dark:border-[rgba(148,163,184,0.12)] pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#E2E8F0] border border-[#0E7490]/30 text-[#0E7490] dark:bg-[#1E293B] dark:border-[#22D3EE]/30 dark:text-[#22D3EE] shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-[#0F172A] dark:text-[#F1F5F9] tracking-wide">
                {isAr
                  ? `خريطة العراق التفاعلية: ${selectedTopic.titleAr}`
                  : `Iraq Interactive Map: ${selectedTopic.titleEn}`}
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E2E8F0] text-[#0E7490] border border-[#0E7490]/40 dark:bg-[#1E293B] dark:text-[#22D3EE] dark:border-[#22D3EE]/40">
                {scope === "all"
                  ? isAr
                    ? "كل العراق (18 محافظة)"
                    : "All 18 Governorates"
                  : isAr
                  ? "15 محافظة (عدا الإقليم)"
                  : "15 Federal"}
              </span>
            </div>
            <p className="text-xs text-[#334155] dark:text-[#94A3B8] mt-0.5 flex items-center gap-1.5">
              <MousePointerClick className="w-3.5 h-3.5 text-[#0E7490] dark:text-[#22D3EE]" />
              <span>
                {isAr
                  ? "مرّر الماوس فوق أي محافظة لتضيء وتظهر نسبتها فوراً"
                  : "Hover over any governorate to highlight and view its percentage"}
              </span>
            </p>
          </div>
        </div>

        {/* Color by Value Toggle Button (Matching Image 1) */}
        <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setColorByValue((prev) => !prev)}
            className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
              colorByValue
                ? "bg-[#0E7490]/15 dark:bg-[#06B6D4]/15 border-[#0E7490] dark:border-[#22D3EE] text-[#0E7490] dark:text-[#22D3EE] shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                : "bg-white dark:bg-[#1E293B] border-[#CBD5E1] dark:border-[rgba(148,163,184,0.2)] text-slate-600 dark:text-slate-400 hover:border-[#0E7490]/40 dark:hover:border-[#22D3EE]/40"
            }`}
            title={isAr ? "تفعيل/تعطيل التلوين التدرجي حسب القيمة" : "Toggle color by value"}
          >
            {/* Switch Capsule */}
            <div
              dir="ltr"
              className={`w-9 h-5 rounded-full transition-colors duration-200 p-0.5 flex items-center ${
                colorByValue
                  ? "bg-[#0E7490] dark:bg-[#06B6D4] justify-start"
                  : "bg-slate-300 dark:bg-slate-700 justify-end"
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-all duration-200" />
            </div>

            {/* Label */}
            <span className="text-xs font-bold whitespace-nowrap">
              {isAr ? "تلوين حسب القيمة" : "Color by Value"}
            </span>

            {/* Palette Icon */}
            <Palette className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>

      {/* Main Map Body: Interactive SVG Map (8 Cols) + Details Card (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10">
        {/* SVG Interactive Map Area (8 Cols) */}
        <div className="lg:col-span-8 relative flex flex-col items-center justify-center rounded-2xl bg-[#F1F5F9] dark:bg-[#0B0F19] bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:22px_22px] border border-[#CBD5E1] dark:border-[rgba(148,163,184,0.12)] p-2 sm:p-4 min-h-[500px] transition-colors duration-300">
          {/* Quick-Select Governorate Pills Bar (Top of Map) */}
          <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 scrollbar-none text-[11px]">
            <span className="text-[#334155] dark:text-[#94A3B8] font-bold whitespace-nowrap pl-1 text-[10px]">
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
                      ? "bg-[#0E7490] text-white dark:bg-[#22D3EE] dark:text-[#0B0F19] font-black shadow-md scale-105"
                      : "bg-white text-[#334155] hover:bg-[#E2E8F0] hover:text-[#0F172A] border border-[#CBD5E1] dark:bg-[#1E293B] dark:text-[#94A3B8] dark:hover:bg-[rgba(148,163,184,0.12)] dark:hover:text-[#F1F5F9] dark:border-[rgba(148,163,184,0.12)]"
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
                const isHovered = hoveredGovId === region.id && !isExcluded;

                const range = maxVal - minVal;
                const ratio = range > 0 ? Math.max(0, Math.min(1, (val - minVal) / range)) : 0.5;

                let fillColor = isLight ? "#E2E8F0" : "#1E293B";
                let strokeColor = isLight ? "rgba(148, 163, 184, 0.45)" : "rgba(148, 163, 184, 0.22)";
                let strokeWidth = "0.75";

                if (isExcluded) {
                  fillColor = isLight ? "#F1F5F9" : "#0F172A";
                  strokeColor = isLight ? "#E2E8F0" : "rgba(148, 163, 184, 0.08)";
                } else if (isHovered) {
                  fillColor = isLight ? "#0284C7" : "#38BDF8";
                  strokeColor = isLight ? "#0284C7" : "#FFFFFF";
                  strokeWidth = "2";
                } else if (colorByValue) {
                  // Color gradient from lowest to highest matching Image
                  if (isLight) {
                    // Soft sky blue (#E0F2FE) to deep vibrant ocean cyan (#0E7490)
                    const r = Math.round(224 + (14 - 224) * ratio);
                    const g = Math.round(242 + (116 - 242) * ratio);
                    const b = Math.round(254 + (144 - 254) * ratio);
                    fillColor = `rgb(${r}, ${g}, ${b})`;
                    strokeColor = "rgba(148, 163, 184, 0.45)";
                    strokeWidth = "0.75";
                  } else {
                    // Dark navy (30, 55, 78) to radiant neon cyan (103, 232, 249)
                    const r = Math.round(30 + (103 - 30) * ratio);
                    const g = Math.round(55 + (232 - 55) * ratio);
                    const b = Math.round(78 + (249 - 78) * ratio);
                    fillColor = `rgb(${r}, ${g}, ${b})`;
                    strokeColor = "rgba(90, 120, 150, 0.35)";
                    strokeWidth = "0.75";
                  }
                }

                const isSmallGov = ["baghdad", "babylon", "kerbela"].includes(region.id);
                // When colorByValue is active and background is very bright (e.g. Baghdad), use dark text
                const isBrightBg = colorByValue && ratio > 0.75 && !isHovered && !isLight;

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

                    {/* Governorate Name & Value Text: OMITTED for Kurdistan when in federal mode */}
                    {!isExcluded && (
                      <g pointerEvents="none" className="select-none">
                        {colorByValue ? (
                          /* When colorByValue is ON: Every governorate displays Name + Value (Matching Image 2) */
                          <>
                            {/* Governorate Name */}
                            <text
                              x={region.cx}
                              y={region.cy - 7}
                              textAnchor="middle"
                              dominantBaseline="central"
                              fill={isBrightBg ? "#060A14" : (isLight ? (ratio > 0.6 ? "#FFFFFF" : "#0F172A") : "#FFFFFF")}
                              stroke={isBrightBg ? "none" : (isLight ? (ratio > 0.6 ? "#0E7490" : "#FFFFFF") : "#090E1D")}
                              strokeWidth={isBrightBg ? "0" : "2"}
                              paintOrder="stroke fill"
                              fontSize={region.id === "baghdad" ? "8.5" : isSmallGov ? "9.5" : "11"}
                              fontWeight="900"
                              fontFamily="sans-serif"
                            >
                              {isAr ? region.nameAr : region.nameEn}
                            </text>

                            {/* Governorate Value Number */}
                            <text
                              x={region.cx}
                              y={region.cy + 8}
                              textAnchor="middle"
                              dominantBaseline="central"
                              fill={isBrightBg ? "#060A14" : (isLight ? (ratio > 0.6 ? "#FFFFFF" : "#0F172A") : "#FFFFFF")}
                              stroke={isBrightBg ? "none" : (isLight ? (ratio > 0.6 ? "#0E7490" : "#FFFFFF") : "#090E1D")}
                              strokeWidth={isBrightBg ? "0" : "2"}
                              paintOrder="stroke fill"
                              fontSize={region.id === "baghdad" ? "9" : isSmallGov ? "10" : "11.5"}
                              fontWeight="900"
                              fontFamily="monospace"
                            >
                              {val}
                            </text>
                          </>
                        ) : isHovered ? (
                          /* When colorByValue is OFF and hovered: Show Name + Value with unit */
                          <>
                            {/* Governorate Name */}
                            <text
                              x={region.cx}
                              y={region.cy - 7}
                              textAnchor="middle"
                              dominantBaseline="central"
                              fill={isLight ? "#FFFFFF" : "#0B0F19"}
                              stroke={isLight ? "#0E7490" : "#22D3EE"}
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
                              fill={isLight ? "#FFFFFF" : "#0B0F19"}
                              stroke={isLight ? "#0E7490" : "#22D3EE"}
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
                          /* When NOT hovered and colorByValue is OFF: ONLY the governorate name is displayed */
                          <text
                            x={region.cx}
                            y={region.cy}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill={isLight ? "#0F172A" : "#F1F5F9"}
                            stroke={isLight ? "#E2E8F0" : "#0B0F19"}
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
                <div className="bg-white/95 text-[#0F172A] dark:bg-[#111827]/95 dark:text-[#F1F5F9] backdrop-blur-md border border-[#CBD5E1] dark:border-[rgba(148,163,184,0.25)] rounded-xl px-4 py-2.5 shadow-xl text-center min-w-[150px] whitespace-nowrap">
                  {/* Governorate Name */}
                  <span className="text-xs font-black text-[#0F172A] dark:text-[#F1F5F9] block">
                    {isAr ? `محافظة ${hoveredGov.nameAr}` : hoveredGov.nameEn}
                  </span>

                  {/* Percentage Value */}
                  <div className="flex items-center justify-center gap-1.5 mt-1" dir="ltr">
                    <span className="text-lg font-black text-[#0E7490] dark:text-[#22D3EE] font-mono">
                      {hoveredGov[selectedTopic.metricKey]}
                      <span className="text-xs text-[#334155] dark:text-[#94A3B8] font-sans ml-0.5">
                        {selectedTopic.unit}
                      </span>
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#E2E8F0] text-[#0E7490] dark:bg-[#1E293B] dark:text-[#22D3EE] font-bold border border-[#0E7490]/30 dark:border-[#22D3EE]/30 whitespace-nowrap">
                      #{hoveredGov.rank}
                    </span>
                  </div>

                  {/* Metric Subtitle */}
                  <span className="text-[9px] text-[#334155] dark:text-[#94A3B8] block mt-0.5 whitespace-nowrap">
                    {isAr ? selectedTopic.titleAr : selectedTopic.titleEn}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Map Guidance Footer */}
          <div className="w-full flex items-center justify-between text-[11px] text-[#334155] dark:text-[#94A3B8] border-t border-[#CBD5E1] dark:border-[rgba(148,163,184,0.12)] pt-2 mt-2 px-2">
            <span>
              {isAr
                ? "💡 مرّر الماوس فوق أي محافظة لتضيء وتظهر نسبتها فوراً"
                : "💡 Hover over any governorate to view percentage"}
            </span>
            <span className="font-mono text-[#0E7490] dark:text-[#22D3EE] font-bold" dir="ltr">
              {activeGov ? (isAr ? activeGov.nameAr : activeGov.nameEn) : ""}:{" "}
              {activeGov ? activeGov[selectedTopic.metricKey] : ""}{selectedTopic.unit}
            </span>
          </div>
        </div>

        {/* Selected Governorate Full Strategic Intelligence Card (4 Cols) */}
        {activeGov && (
          <div className="lg:col-span-4 rounded-2xl bg-white dark:bg-[#111827] border-2 border-[#0E7490]/40 dark:border-[#22D3EE]/50 p-5 shadow-sm dark:shadow-none space-y-4 transition-colors duration-300">
            {/* Header info: Governorate Name & Big Metric with clean separation */}
            <div className="border-b border-[#CBD5E1] dark:border-[rgba(148,163,184,0.12)] pb-4 flex items-start justify-between gap-3">
              {/* Right Side in RTL: Governorate Name & Nationwide Rank Badge */}
              <div className="min-w-0 flex-1 space-y-1">
                <h4 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-1.5 truncate">
                  <MapPin className="w-5 h-5 text-[#0E7490] dark:text-[#22D3EE] shrink-0" />
                  <span className="truncate">{isAr ? activeGov.nameAr : activeGov.nameEn}</span>
                </h4>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#E2E8F0] text-[#0E7490] dark:bg-[#1E293B] dark:text-[#22D3EE] border border-[#0E7490]/30 dark:border-[#22D3EE]/30 whitespace-nowrap inline-flex items-center gap-1">
                    <span className="font-mono font-bold">#{activeGov.rank}</span>
                    <span>{isAr ? "في عموم العراق" : "Nationwide"}</span>
                  </span>
                </div>
              </div>

              {/* Left Side in RTL: Big Metric Display */}
              <div className="shrink-0 flex flex-col items-end rtl:items-start text-right rtl:text-left">
                <div className="flex items-baseline gap-0.5 font-mono leading-none" dir="ltr">
                  <span className="text-2xl sm:text-3xl font-black text-[#0E7490] dark:text-[#22D3EE]">
                    {activeGov[selectedTopic.metricKey]}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#334155] dark:text-[#94A3B8]">
                    {selectedTopic.unit}
                  </span>
                </div>
                <span className="block text-[10px] text-[#334155] dark:text-[#94A3B8] font-medium mt-1 whitespace-nowrap">
                  {isAr ? selectedTopic.titleAr : selectedTopic.titleEn}
                </span>
              </div>
            </div>

            {/* POSITION ACROSS GOVERNORATES GAUGE (Matching media_1792001036152_cd3aa635.png) */}
            {(() => {
              const currentVal = Number(activeGov[selectedTopic.metricKey]) || 0;
              const diffFromAvg = Number((currentVal - avgVal).toFixed(1));
              const valRange = maxVal - minVal;
              const currentRatio = valRange > 0 ? Math.max(0, Math.min(1, (currentVal - minVal) / valRange)) : 0.5;
              const avgRatio = valRange > 0 ? Math.max(0, Math.min(1, (avgVal - minVal) / valRange)) : 0.5;

              return (
                <div className="p-3.5 rounded-xl bg-[#E2E8F0] dark:bg-[#1E293B]/60 border border-[#CBD5E1] dark:border-[rgba(148,163,184,0.12)] space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-700 dark:text-slate-300">
                      {isAr ? "الموقع بين المحافظات" : "Position Across Governorates"}
                    </span>
                    <span
                      className={`flex items-center gap-1 font-mono text-xs font-black ${
                        diffFromAvg >= 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      <span className="text-sm">{diffFromAvg >= 0 ? "↗" : "↘"}</span>
                      <span>{diffFromAvg >= 0 ? `+${diffFromAvg}` : diffFromAvg}</span>
                      <span className="font-sans font-medium text-[10px] text-slate-500 dark:text-slate-400">
                        {isAr ? "عن متوسط المحافظات" : "vs govs avg"}
                      </span>
                    </span>
                  </div>

                  {/* Slider / Gauge Track */}
                  <div className="relative h-2 w-full rounded-full bg-slate-300/70 dark:bg-[#0E2838] border border-slate-300 dark:border-[rgba(148,163,184,0.15)] my-2">
                    {/* White Tick for Average */}
                    <div
                      className="absolute top-1/2 w-0.5 h-3.5 bg-slate-900 dark:bg-white rounded-full z-10 shadow-sm"
                      style={{
                        [isAr ? "right" : "left"]: `${avgRatio * 100}%`,
                        transform: isAr ? "translate(50%, -50%)" : "translate(-50%, -50%)",
                      }}
                      title={isAr ? `متوسط المحافظات: ${avgVal}` : `Average: ${avgVal}`}
                    />

                    {/* Circular Knob for Active Governorate */}
                    <div
                      className="absolute top-1/2 w-3.5 h-3.5 rounded-full bg-[#0E7490] dark:bg-[#22D3EE] border-2 border-white dark:border-[#090E1D] shadow-[0_0_8px_#22D3EE] z-20 transition-all duration-200"
                      style={{
                        [isAr ? "right" : "left"]: `${currentRatio * 100}%`,
                        transform: isAr ? "translate(50%, -50%)" : "translate(-50%, -50%)",
                      }}
                    />
                  </div>

                  {/* Min, Average, Max Labels (In RTL: Right=Min, Center=Avg, Left=Max) */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 pt-0.5">
                    <span>{minVal}</span>
                    <span className="font-semibold text-slate-600 dark:text-slate-300 font-sans">
                      {isAr ? `متوسط المحافظات: ${avgVal}` : `Govs Avg: ${avgVal}`}
                    </span>
                    <span>{maxVal}</span>
                  </div>
                </div>
              );
            })()}

            {/* Metrics Grid */}
            <div className="space-y-2.5 text-xs sm:text-[13px]">
              {/* Metric 1 */}
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-[#E2E8F0] border border-[#CBD5E1] hover:border-[#0E7490]/40 dark:bg-[#1E293B] dark:border-[rgba(148,163,184,0.12)] dark:hover:border-[#22D3EE]/40 transition-all">
                <span className="text-[#334155] dark:text-[#94A3B8] font-medium">{selectedTopic.titleAr}</span>
                <span className="font-black text-[#0E7490] dark:text-[#22D3EE] font-mono text-[15px]">
                  {activeGov[selectedTopic.metricKey]} {selectedTopic.unit}
                </span>
              </div>

              {/* Metric 2: Household Telecom Spend */}
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-[#E2E8F0] border border-[#CBD5E1] hover:border-[#047857]/40 dark:bg-[#1E293B] dark:border-[rgba(148,163,184,0.12)] dark:hover:border-[#34D399]/40 transition-all">
                <span className="text-[#334155] dark:text-[#94A3B8] font-medium">
                  {isAr ? "إنفاق الأسرة الشهري على التقنية" : "Monthly Tech Spending"}
                </span>
                <span className="font-black text-[#047857] dark:text-[#34D399] font-mono text-[15px]">
                  {activeGov.telecomSpending} {isAr ? "ألف د.ع" : "K IQD"}
                </span>
              </div>

              {/* Metric 3: Best Fit Model */}
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-[#E2E8F0] border border-[#CBD5E1] hover:border-[#B45309]/40 dark:bg-[#1E293B] dark:border-[rgba(148,163,184,0.12)] dark:hover:border-[#FBBF24]/40 transition-all">
                <span className="text-[#334155] dark:text-[#94A3B8] font-medium">
                  {isAr ? "نموذج العمل الأنسب" : "Best Fit Business Model"}
                </span>
                <span className="font-bold text-[#B45309] dark:text-[#FBBF24] text-xs sm:text-[13px] text-left rtl:text-right">
                  {activeGov.bestFitModel}
                </span>
              </div>

              {/* Metric 4: Market Tier */}
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-[#E2E8F0] border border-[#CBD5E1] hover:border-[#6B21A8]/40 dark:bg-[#1E293B] dark:border-[rgba(148,163,184,0.12)] dark:hover:border-[#C084FC]/40 transition-all">
                <span className="text-[#334155] dark:text-[#94A3B8] font-medium">
                  {isAr ? "تصنيف السوق" : "Market Tier"}
                </span>
                <span className="font-bold text-[#6B21A8] dark:text-[#C084FC] text-xs sm:text-[13px]">
                  {activeGov.marketTier}
                </span>
              </div>
            </div>

            {/* Strategic Intelligence Box */}
            <div className="p-3.5 rounded-xl bg-[#E2E8F0] border border-[#CBD5E1] dark:bg-[#1E293B] dark:border-[rgba(148,163,184,0.12)] text-[#0F172A] dark:text-[#F1F5F9] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#0E7490] dark:text-[#22D3EE] font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>{isAr ? "الرؤية والتحليل الاستثماري:" : "Strategic Investment Analysis:"}</span>
              </div>
              <p className="text-xs text-[#334155] dark:text-[#94A3B8] leading-relaxed">
                {activeGov.aiSummary}
              </p>
            </div>

            {/* Action Button: Open Full Dashboard */}
            <button
              onClick={() => onSelectGovernorate(activeGov)}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0E7490] to-[#1D4ED8] hover:from-[#085C73] hover:to-[#173EAB] dark:from-[#22D3EE] dark:to-[#60A5FA] dark:hover:from-[#1FB2C9] dark:hover:to-[#4F8DE0] text-white dark:text-[#0B0F19] font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
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
