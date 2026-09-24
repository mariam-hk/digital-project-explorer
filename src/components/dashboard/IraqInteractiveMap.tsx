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
}

const KURDISTAN_IDS = ["erbil", "sulaymaniyah", "duhok"];

export const IraqInteractiveMap: React.FC<IraqInteractiveMapProps> = ({
  governorates,
  selectedTopic,
  onSelectGovernorate,
  lang,
  scope,
}) => {
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
    <div className="relative w-full rounded-2xl bg-[#080D1A] border border-cyan-500/30 p-4 sm:p-6 shadow-[0_0_35px_rgba(6,182,212,0.15)] space-y-5 overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ background: selectedTopic.neonColor }}
      />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                {isAr
                  ? `خريطة العراق التفاعلية: ${selectedTopic.titleAr}`
                  : `Iraq Interactive Map: ${selectedTopic.titleEn}`}
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                {scope === "all"
                  ? isAr
                    ? "كل العراق (18 محافظة)"
                    : "All 18 Governorates"
                  : isAr
                  ? "15 محافظة (عدا الإقليم)"
                  : "15 Federal"}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
              <MousePointerClick className="w-3.5 h-3.5 text-cyan-400" />
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
        <div className="lg:col-span-8 relative flex flex-col items-center justify-center rounded-2xl bg-[#060A14]/90 border border-white/10 p-2 sm:p-4 min-h-[500px]">
          {/* Quick-Select Governorate Pills Bar (Top of Map) */}
          <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 scrollbar-none text-[11px]">
            <span className="text-slate-400 font-bold whitespace-nowrap pl-1 text-[10px]">
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
                      ? "bg-cyan-500 text-[#070B14] font-black shadow-[0_0_12px_rgba(6,182,212,0.8)] scale-105"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5"
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
              className="w-full max-w-[620px] h-auto select-none filter drop-shadow-[0_0_25px_rgba(6,182,212,0.12)] cursor-pointer"
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

                let fillColor = "#162238"; // EXACT same color for all governorates
                let strokeColor = "rgba(255, 255, 255, 0.22)";
                let strokeWidth = "1.2";

                if (isHovered) {
                  fillColor = "#22D3EE"; // Vivid luminous cyan highlight
                  strokeColor = "#FFFFFF";
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
                              fill="#060A14"
                              stroke="#22D3EE"
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
                              fill="#060A14"
                              stroke="#22D3EE"
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
                            fill="#FFFFFF"
                            stroke="#060A14"
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
                <div className="bg-[#090E20]/95 backdrop-blur-md border border-cyan-400/80 rounded-xl px-4 py-2.5 shadow-[0_0_25px_rgba(6,182,212,0.6)] text-center min-w-[150px] whitespace-nowrap">
                  {/* Governorate Name */}
                  <span className="text-xs font-black text-white block">
                    {isAr ? `محافظة ${hoveredGov.nameAr}` : hoveredGov.nameEn}
                  </span>

                  {/* Percentage Value */}
                  <div className="flex items-center justify-center gap-1.5 mt-1">
                    <span className="text-lg font-black text-cyan-400 font-mono drop-shadow-[0_0_10px_rgba(6,182,212,0.9)]">
                      {hoveredGov[selectedTopic.metricKey]}
                      <span className="text-xs text-slate-300 font-sans ml-0.5">
                        {selectedTopic.unit}
                      </span>
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/30">
                      #{hoveredGov.rank}
                    </span>
                  </div>

                  {/* Metric Subtitle */}
                  <span className="text-[9px] text-slate-400 block mt-0.5">
                    {selectedTopic.titleAr}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Map Guidance Footer */}
          <div className="w-full flex items-center justify-between text-[11px] text-slate-400 border-t border-white/5 pt-2 mt-2 px-2">
            <span>
              {isAr
                ? "💡 مرّر الماوس فوق أي محافظة لتضيء وتظهر نسبتها فوراً"
                : "💡 Hover over any governorate to view percentage"}
            </span>
            <span className="font-mono text-cyan-400 font-bold">
              {activeGov ? (isAr ? activeGov.nameAr : activeGov.nameEn) : ""}:{" "}
              {activeGov ? activeGov[selectedTopic.metricKey] : ""}{selectedTopic.unit}
            </span>
          </div>
        </div>

        {/* Selected Governorate Full Strategic Intelligence Card (4 Cols) */}
        {activeGov && (
          <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-[#0F172A] via-[#0B1120] to-[#070B14] border-2 border-cyan-500/50 p-5 sm:p-6 shadow-[0_0_30px_rgba(6,182,212,0.25)] space-y-5">
            {/* Header info */}
            <div className="border-b border-white/10 pb-4 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                    #{activeGov.rank} {isAr ? "في عموم العراق" : "Nationwide"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {isAr ? activeGov.regionAr : activeGov.regionEn}
                  </span>
                </div>
                <h4 className="text-2xl font-black text-white flex items-center gap-2 mt-1">
                  <MapPin className="w-6 h-6 text-cyan-400 animate-bounce" />
                  <span>{isAr ? activeGov.nameAr : activeGov.nameEn}</span>
                </h4>
              </div>

              {/* Big Metric Display */}
              <div className="text-left rtl:text-right">
                <span className="text-3xl font-black text-cyan-400 font-mono drop-shadow-[0_0_12px_rgba(6,182,212,0.9)]">
                  {activeGov[selectedTopic.metricKey]}
                  <span className="text-lg text-slate-300 font-sans ml-1">
                    {selectedTopic.unit}
                  </span>
                </span>
                <span className="block text-[10px] text-slate-400">
                  {selectedTopic.titleAr}
                </span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="space-y-2.5 text-xs">
              {/* Metric 1 */}
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
                <span className="text-slate-300 font-medium">{selectedTopic.titleAr}</span>
                <span className="font-black text-cyan-300 font-mono text-sm">
                  {activeGov[selectedTopic.metricKey]} {selectedTopic.unit}
                </span>
              </div>

              {/* Metric 2: Household Telecom Spend */}
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all">
                <span className="text-slate-300 font-medium">
                  {isAr ? "إنفاق الأسرة الشهري على التقنية" : "Monthly Tech Spending"}
                </span>
                <span className="font-black text-emerald-400 font-mono text-sm">
                  {activeGov.telecomSpending} {isAr ? "ألف د.ع" : "K IQD"}
                </span>
              </div>

              {/* Metric 3: Best Fit Model */}
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-amber-500/30 transition-all">
                <span className="text-slate-300 font-medium">
                  {isAr ? "نموذج العمل الأنسب" : "Best Fit Business Model"}
                </span>
                <span className="font-bold text-amber-300 text-xs text-left rtl:text-right">
                  {activeGov.bestFitModel}
                </span>
              </div>

              {/* Metric 4: Market Tier */}
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all">
                <span className="text-slate-300 font-medium">
                  {isAr ? "تصنيف السوق" : "Market Tier"}
                </span>
                <span className="font-bold text-purple-300 text-[11px] truncate max-w-[150px]">
                  {activeGov.marketTier}
                </span>
              </div>
            </div>

            {/* AI Strategic Intelligence Box */}
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-slate-200 leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>{isAr ? "رؤية الذكاء الاصطناعي الاستثمارية:" : "AI Strategic Takeaway:"}</span>
              </div>
              <p className="text-[11px] text-slate-300">
                {activeGov.aiSummary}
              </p>
            </div>

            {/* Action Button: Open Full Dashboard */}
            <button
              onClick={() => onSelectGovernorate(activeGov)}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-[#060A14] font-black text-xs sm:text-sm shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>
                {isAr
                  ? `عرض التحليل الشامل لمحافظة ${activeGov.nameAr}`
                  : `Open Full Deep-Dive for ${activeGov.nameEn}`}
              </span>
              {isAr ? (
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              ) : (
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
