"use client";

import React, { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { NATIONAL_STATS } from "../../lib/data/iraq-real-data";

interface TrendsPanelProps {
  lang: "en" | "ar";
}

type TrendMetric = "internet" | "mobile" | "ftth";

export const TrendsPanel: React.FC<TrendsPanelProps> = ({ lang }) => {
  const isAr = lang === "ar";
  const [selectedMetric, setSelectedMetric] = useState<TrendMetric>("internet");
  const [scopeDropdown, setScopeDropdown] = useState(false);
  const [scope, setScope] = useState("All Iraq");

  const trendConfigs = {
    internet: {
      labelEn: "Internet Users",
      labelAr: "مستخدمو الإنترنت",
      val2022: 34.1,
      val2024: 38.5,
      unit: "M",
      color: "#8B5CF6",
      stroke: "#A78BFA",
      y2022: 180,
      y2024: 80,
      diff: "+12.9%",
      diffDirection: "up",
    },
    mobile: {
      labelEn: "Mobile Subscribers",
      labelAr: "مشتركو النقال",
      val2022: 44.1,
      val2024: 40.2,
      unit: "M",
      color: "#FB7185",
      stroke: "#F43F5E",
      y2022: 60,
      y2024: 120,
      diff: "-8.8%",
      diffDirection: "down",
    },
    ftth: {
      labelEn: "FTTH Subscribers",
      labelAr: "مشتركو الكيبل الضوئي",
      val2022: 0.35,
      val2024: 1.11,
      unit: "M",
      color: "#F59E0B",
      stroke: "#FBBF24",
      y2022: 210,
      y2024: 40,
      diff: "+218%",
      diffDirection: "up",
    },
  };

  const current = trendConfigs[selectedMetric];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#111625] border border-white/10 p-6 shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {isAr ? "الاتجاهات عبر الزمن (2022 مقابل 2024)" : "Trends Over Time"}
            </h2>
            <p className="text-xs text-slate-400">
              {isAr
                ? "مقارنة المؤشرات الرئيسية بين تقريري 2022 و2024"
                : "Compare key indicators (2022 vs 2024)"}
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => setScopeDropdown(!scopeDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              <span>{isAr && scope === "All Iraq" ? "عموم العراق" : scope}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {scopeDropdown && (
              <div className="absolute right-0 mt-1 w-36 rounded-xl bg-[#1A2136] border border-white/10 shadow-2xl py-1 z-30 text-xs">
                {["All Iraq", "Baghdad", "Basrah", "Erbil"].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setScope(s);
                      setScopeDropdown(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-indigo-600/30 text-slate-200 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {(["internet", "mobile", "ftth"] as TrendMetric[]).map((key) => {
            const cfg = trendConfigs[key];
            const isActive = selectedMetric === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedMetric(key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-purple-600 text-white shadow-md shadow-purple-900/40 ring-1 ring-purple-400/50"
                    : "bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5"
                }`}
              >
                {isAr ? cfg.labelAr : cfg.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="relative mt-6 h-56 w-full flex items-center justify-center">
        <svg viewBox="0 0 500 240" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="trendAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={current.color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={current.color} stopOpacity="0.0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          <line x1="40" y1="40" x2="480" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <line x1="40" y1="110" x2="480" y2="110" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <line x1="40" y1="180" x2="480" y2="180" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <line x1="40" y1="220" x2="480" y2="220" stroke="rgba(255,255,255,0.15)" />

          {/* Area fill */}
          <path
            d={`M 60 ${current.y2022} L 440 ${current.y2024} L 440 220 L 60 220 Z`}
            fill="url(#trendAreaGrad)"
          />

          {/* Trend line */}
          <line
            x1="60"
            y1={current.y2022}
            x2="440"
            y2={current.y2024}
            stroke={current.stroke}
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* Point 2022 */}
          <circle cx="60" cy={current.y2022} r="6" fill="#FFFFFF" stroke={current.stroke} strokeWidth="3" />
          {/* Label 2022 */}
          <text
            x="60"
            y={current.y2022 - 12}
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="12"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            {current.val2022}{current.unit}
          </text>

          {/* Point 2024 */}
          <circle cx="440" cy={current.y2024} r="6" fill="#FFFFFF" stroke={current.stroke} strokeWidth="3" />
          {/* Label 2024 */}
          <text
            x="440"
            y={current.y2024 - 12}
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="12"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            {current.val2024}{current.unit} ({current.diff})
          </text>

          {/* X Axis Labels */}
          <text x="60" y="238" textAnchor="middle" fill="#94A3B8" fontSize="11" fontWeight="600">
            2022
          </text>
          <text x="440" y="238" textAnchor="middle" fill="#94A3B8" fontSize="11" fontWeight="600">
            2024
          </text>

          {/* Y Axis Label */}
          <text
            x="-120"
            y="20"
            transform="rotate(-90)"
            textAnchor="middle"
            fill="#64748B"
            fontSize="11"
          >
            {isAr ? "القيمة" : "Value"}
          </text>
        </svg>
      </div>

      {/* Footer Link */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-end">
        <button className="flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors">
          <span>{isAr ? "عرض التحليل التفصيلي" : "View detailed analysis"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
