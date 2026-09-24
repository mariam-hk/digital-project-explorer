"use client";

import React, { useState } from "react";
import { Search, Sun, Moon, Sparkles, ChevronDown } from "lucide-react";
import { GOVERNORATES } from "../../lib/data/iraq-real-data";

interface TopHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedYearRange: string;
  onYearRangeChange: (yr: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  lang: "en" | "ar";
  onToggleLang: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedYearRange,
  onYearRangeChange,
  isDarkMode,
  onToggleDarkMode,
  lang,
  onToggleLang,
}) => {
  const isAr = lang === "ar";
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  return (
    <header className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#0C101C] via-[#121626] to-[#171C2F] border border-white/5 p-6 shadow-2xl">
      {/* Decorative Baghdad Sunset Skyline in the background */}
      <div className="absolute right-0 top-0 bottom-0 w-full sm:w-2/3 md:w-1/2 pointer-events-none opacity-20 sm:opacity-30 mix-blend-screen overflow-hidden">
        <svg
          viewBox="0 0 600 160"
          fill="none"
          preserveAspectRatio="xMaxYMid slice"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#7C3AED" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0B0F19" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="monumentGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <rect width="600" height="160" fill="url(#skyGrad)" />
          {/* Baghdad Monument / Zawraa / Palms silhouette */}
          <path
            d="M0 160 L0 140 L30 140 L35 130 L45 130 L50 140 L80 140 L90 120 L100 120 L110 140 L160 140 L170 110 L180 90 L190 90 L200 110 L210 140 L260 140 L270 70 L280 40 L285 40 L295 70 L305 140 L360 140 L380 100 L395 70 L405 70 L420 100 L440 140 L480 140 L490 85 L500 85 L510 140 L560 140 L570 120 L585 120 L600 140 L600 160 Z"
            fill="url(#monumentGrad)"
          />
          {/* Palm silhouettes */}
          <circle cx="230" cy="120" r="14" fill="#0D1527" opacity="0.7" />
          <circle cx="340" cy="115" r="18" fill="#0D1527" opacity="0.8" />
          <circle cx="455" cy="125" r="12" fill="#0D1527" opacity="0.6" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Titles */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-indigo-400">
            {isAr
              ? "رؤى مؤسسة على البيانات لعراق أكثر اتصالاً"
              : "DATA-DRIVEN INSIGHTS FOR A MORE CONNECTED IRAQ"}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight text-white font-bold">
            {isAr ? "ذكاء السوق الرقمي العراقي" : "Iraq Digital Market Intelligence"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-light">
            {isAr
              ? "افهم واقع اليوم، لبناء غدٍ تقني أكثر إشراقاً."
              : "Understand today. Build a brighter tomorrow."}
          </p>
        </div>

        {/* Right: Controls & User Profile */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={isAr ? "ابحث عن محافظة..." : "Search governorate..."}
              className="pl-9 pr-4 py-1.5 text-xs rounded-xl bg-white/5 hover:bg-white/10 focus:bg-[#1A2035] text-white placeholder-slate-400 border border-white/10 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all w-40 sm:w-48"
            />
          </div>

          {/* Year Range Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowYearDropdown(!showYearDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
            >
              <span>{selectedYearRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showYearDropdown && (
              <div className="absolute right-0 mt-1 w-32 rounded-xl bg-[#182035] border border-white/10 shadow-2xl py-1 z-30 text-xs">
                {["2022 & 2024", "2024 Only", "2022 Only"].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => {
                      onYearRangeChange(yr);
                      setShowYearDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-indigo-600/30 text-slate-200 transition-colors ${
                      selectedYearRange === yr ? "font-bold text-indigo-400" : ""
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark / Light toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Night Mode"}
          >
            {isDarkMode ? (
              <Moon className="w-4 h-4 text-indigo-400" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="px-2.5 py-1 text-xs font-semibold rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition-all"
          >
            {isAr ? "EN" : "عربي"}
          </button>

          {/* User Profile avatar */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-white/10">
            <div className="w-9 h-9 rounded-full bg-purple-600/40 border border-purple-400/50 flex items-center justify-center text-purple-200 font-bold text-sm shadow-md">
              A
            </div>
            <div className="hidden sm:block text-right">
              <div className="text-xs font-semibold text-white leading-tight">Angel</div>
              <div className="text-[10px] text-slate-400 leading-tight">Analyst</div>
              <div className="text-[9px] text-indigo-400/90 font-light mt-0.5 tracking-tight">
                {isAr ? "عراق أكثر قوة |" : "A stronger Iraq |"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
