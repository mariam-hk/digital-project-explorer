"use client";

import React, { useState } from "react";
import { GOVERNORATES, GovernorateData } from "../../lib/data/iraq-real-data";
import { ChevronDown, MousePointer2 } from "lucide-react";

interface GovernorateMapPanelProps {
  selectedGovernorate: GovernorateData;
  onSelectGovernorate: (gov: GovernorateData) => void;
  lang: "en" | "ar";
}

export const GovernorateMapPanel: React.FC<GovernorateMapPanelProps> = ({
  selectedGovernorate,
  onSelectGovernorate,
  lang,
}) => {
  const isAr = lang === "ar";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredGov, setHoveredGov] = useState<GovernorateData | null>(null);

  const activeGov = hoveredGov || selectedGovernorate;

  // Geographic SVG coordinates for Iraq's 18 governorates
  // Creates a clean polygon/mesh representation of Iraq map in shades of purple
  const mapPolygons = [
    { id: "duhok", name: "Duhok", fill: "#9333EA", d: "M 130 35 L 180 25 L 210 40 L 195 70 L 140 65 Z" },
    { id: "nineveh", name: "Nineveh", fill: "#7E22CE", d: "M 80 65 L 140 65 L 195 70 L 180 130 L 130 150 L 90 120 Z" },
    { id: "erbil", name: "Erbil", fill: "#A855F7", d: "M 195 40 L 250 50 L 265 90 L 215 100 L 195 70 Z" },
    { id: "sulaymaniyah", name: "Sulaymaniyah", fill: "#8B5CF6", d: "M 250 50 L 305 85 L 300 140 L 250 130 L 265 90 Z" },
    { id: "kirkuk", name: "Kirkuk", fill: "#7C3AED", d: "M 215 100 L 265 90 L 250 130 L 205 135 Z" },
    { id: "salah_al_deen", name: "Salah Al-Deen", fill: "#6D28D9", d: "M 130 150 L 205 135 L 250 160 L 210 205 L 150 190 Z" },
    { id: "diyala", name: "Diyala", fill: "#581C87", d: "M 250 130 L 300 140 L 310 210 L 260 220 L 250 160 Z" },
    { id: "anbar", name: "Al-Anbar", fill: "#4C1D95", d: "M 20 130 L 90 120 L 130 150 L 150 190 L 210 205 L 190 270 L 120 290 L 30 230 Z" },
    { id: "baghdad", name: "Baghdad", fill: "#C084FC", d: "M 210 205 L 250 200 L 260 220 L 245 240 L 215 235 Z" },
    { id: "babylon", name: "Babylon", fill: "#7E22CE", d: "M 215 235 L 245 240 L 255 270 L 225 275 L 205 255 Z" },
    { id: "kerbela", name: "Kerbela", fill: "#9333EA", d: "M 190 270 L 215 235 L 205 255 L 195 295 Z" },
    { id: "wasit", name: "Wasit", fill: "#6B21A8", d: "M 260 220 L 310 210 L 335 270 L 275 285 L 255 270 Z" },
    { id: "najaf", name: "Najaf", fill: "#581C87", d: "M 120 290 L 195 295 L 225 275 L 240 330 L 170 380 Z" },
    { id: "qadisiya", name: "Al-Qadisiya", fill: "#7C3AED", d: "M 225 275 L 255 270 L 275 310 L 240 330 Z" },
    { id: "muthanna", name: "Al-Muthanna", fill: "#4C1D95", d: "M 170 380 L 240 330 L 290 355 L 280 430 L 200 440 Z" },
    { id: "thi_qar", name: "Thi-Qar", fill: "#6D28D9", d: "M 275 310 L 335 300 L 340 360 L 290 355 Z" },
    { id: "missan", name: "Missan", fill: "#7E22CE", d: "M 310 210 L 365 245 L 375 325 L 335 300 L 335 270 Z" },
    { id: "basrah", name: "Basrah", fill: "#A855F7", d: "M 340 360 L 375 325 L 400 380 L 350 430 L 280 430 L 290 355 Z" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#111625] border border-white/10 p-6 shadow-xl flex flex-col justify-between">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {isAr ? "السلوك الرقمي حسب المحافظة (2022)" : "Digital Behavior by Governorate (2022)"}
          </h2>
          <p className="text-xs text-slate-400">
            {isAr ? "استكشف المؤشرات الرئيسية في جميع أنحاء العراق" : "Explore key indicators across Iraq"}
          </p>
        </div>

        {/* Governorate selector dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors"
          >
            <span>{isAr ? selectedGovernorate.nameAr : selectedGovernorate.nameEn}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-48 max-h-60 overflow-y-auto rounded-xl bg-[#1A2136] border border-white/10 shadow-2xl py-1 z-30 text-xs">
              {GOVERNORATES.map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    onSelectGovernorate(g);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-purple-600/30 text-slate-200 transition-colors flex justify-between items-center ${
                    selectedGovernorate.id === g.id ? "font-bold text-purple-400 bg-purple-600/20" : ""
                  }`}
                >
                  <span>{isAr ? g.nameAr : g.nameEn}</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {(g.population / 1000000).toFixed(1)}M
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Map & Info Card Area */}
      <div className="relative mt-6 min-h-[360px] flex items-center justify-center">
        {/* Left Side: Color scale legend */}
        <div className="absolute left-0 top-6 bottom-6 flex flex-col justify-between items-start text-[10px] text-slate-400 z-10">
          <span className="font-semibold text-slate-300">
            {isAr ? "قيمة أعلى" : "Higher value"}
          </span>
          <div className="w-3.5 h-36 rounded-full bg-gradient-to-t from-[#4C1D95] via-[#8B5CF6] to-[#C084FC] my-2 shadow-inner border border-white/10"></div>
          <span className="font-semibold text-slate-400">
            {isAr ? "قيمة أقل" : "Lower value"}
          </span>
        </div>

        {/* Center: Interactive SVG Map of Iraq */}
        <div className="w-full max-w-[420px] aspect-[4/4.2] relative flex items-center justify-center">
          <svg viewBox="0 0 420 450" className="w-full h-full filter drop-shadow-2xl">
            {mapPolygons.map((poly) => {
              const govData = GOVERNORATES.find((g) => g.id === poly.id);
              const isSelected = selectedGovernorate.id === poly.id;
              const isHovered = hoveredGov?.id === poly.id;

              return (
                <path
                  key={poly.id}
                  d={poly.d}
                  fill={isSelected ? "#E9D5FF" : poly.fill}
                  stroke={isSelected ? "#FFFFFF" : "rgba(255,255,255,0.25)"}
                  strokeWidth={isSelected ? "2.5" : "1.2"}
                  className="transition-all duration-200 cursor-pointer hover:brightness-125"
                  style={{
                    filter: isSelected ? "drop-shadow(0 0 10px rgba(192, 132, 252, 0.8))" : "none",
                  }}
                  onMouseEnter={() => govData && setHoveredGov(govData)}
                  onMouseLeave={() => setHoveredGov(null)}
                  onClick={() => govData && onSelectGovernorate(govData)}
                />
              );
            })}

            {/* Selected Governor Marker Pin */}
            <circle
              cx={selectedGovernorate.id === "baghdad" ? 232 : 240}
              cy={selectedGovernorate.id === "baghdad" ? 220 : 250}
              r="4"
              fill="#FFFFFF"
              className="animate-ping"
            />
          </svg>
        </div>

        {/* Right Side: Floating details card */}
        <div className="absolute right-0 top-2 bottom-2 w-52 sm:w-60 bg-[#171D30]/90 backdrop-blur-md rounded-xl p-4 border border-white/10 shadow-2xl flex flex-col justify-between text-xs z-10">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-bold text-sm text-white">
                {isAr ? activeGov.nameAr : activeGov.nameEn}
              </span>
              <span className="text-[10px] text-purple-300 font-mono">
                {activeGov.internetPenetration}%
              </span>
            </div>

            <div className="mt-3 space-y-2 text-slate-300 text-[11px]">
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400">{isAr ? "عدد السكان" : "Population"}</span>
                <span className="font-semibold text-white font-mono">
                  {activeGov.population.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-slate-400">{isAr ? "مستخدمو الإنترنت" : "Internet Users"}</span>
                <span className="font-semibold text-emerald-400 font-mono">
                  {activeGov.mobileInternetSubscribers.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-slate-400">{isAr ? "مشتركو النقال" : "Mobile Subscribers"}</span>
                <span className="font-semibold text-rose-400 font-mono">
                  {activeGov.mobileSubscribers.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-slate-400">{isAr ? "خطوط الضوئي" : "FTTH Subscribers"}</span>
                <span className="font-semibold text-amber-400 font-mono">
                  {activeGov.ftthSubscribers.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-white/10">
            <span className="text-[10px] font-semibold text-indigo-300 block mb-1">
              {isAr ? "الرؤى التحليلية:" : "Key Insights"}
            </span>
            <p className="text-[10px] text-slate-300 leading-tight">
              {isAr ? activeGov.insightAr : activeGov.insightEn}
            </p>
          </div>
        </div>
      </div>

      {/* Footer hint with mouse pointer */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-end gap-2 text-[11px] text-slate-400">
        <MousePointer2 className="w-3.5 h-3.5 text-purple-400 animate-bounce" />
        <span>
          {isAr
            ? "انقر على أي محافظة لعرض التفاصيل والأرقام الموثقة"
            : "Click on a governorate to view detailed insights"}
        </span>
      </div>
    </div>
  );
};
