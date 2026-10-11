"use client";

import React, { useState } from "react";
import {
  ALL_GOVERNORATES,
  GovernorateMetric,
  NATIONAL_AVERAGE_METRICS,
  TOPICS,
  TopicConfig,
} from "../../lib/data/iraq-dashboard-data";
import { TOPIC_BREAKDOWNS } from "../../lib/data/topic-detailed-breakdowns";
import { NeonDonutChart } from "./NeonDonutChart";
import { OfficialTablesNeonList } from "./OfficialTablesNeonList";
import {
  MapPin,
  Smartphone,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  ChevronDown,
  Sparkles,
  ShoppingBag,
  DollarSign,
  Layers,
  ArrowRight,
  ArrowLeft,
  PieChart,
  BarChart3,
  Scale,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface SingleGovernorateNeonDashboardProps {
  selectedGov: GovernorateMetric;
  selectedTopic: TopicConfig;
  onSelectTopic: (topic: TopicConfig) => void;
  onSelectGov: (gov: GovernorateMetric) => void;
  onBackToAll: () => void;
  lang: "en" | "ar";
  sidebarMode?: boolean;
  theme?: "dark" | "light";
}

export const SingleGovernorateNeonDashboard: React.FC<SingleGovernorateNeonDashboardProps> = ({
  selectedGov,
  selectedTopic,
  onSelectTopic,
  onSelectGov,
  onBackToAll,
  lang,
  sidebarMode = false,
  theme = "dark",
}) => {
  const isAr = lang === "ar";
  const isLight = theme === "light";
  const [govDropdownOpen, setGovDropdownOpen] = useState(false);

  // Retrieve topic breakdown configuration and governorate data
  const breakdownConfig =
    TOPIC_BREAKDOWNS[selectedTopic.id] || TOPIC_BREAKDOWNS["smartphones"];
const govDetails = breakdownConfig.getGovBreakdown(
    selectedGov.id,
    selectedGov.nameAr,
    lang
  );

  // 6 Indicators for this governorate (Overview)
  const indicatorsList = [
    {
      key: "payments",
      nameAr: "الدفع الإلكتروني والفنتك",
      nameEn: "FinTech & Payments",
      val: selectedGov.fintechScore,
      natAvg: NATIONAL_AVERAGE_METRICS.overallScore,
      color: "#06B6D4",
      icon: "💳",
      source: "جدول 14 + جدول 1-19",
    },
    {
      key: "smartphones",
      nameAr: "استخدام الهاتف المحمول",
      nameEn: "Mobile Phone Usage",
      val: selectedGov.smartphoneUsagePct,
      natAvg: NATIONAL_AVERAGE_METRICS.smartphoneUsagePct,
      color: "#10B981",
      icon: "📱",
      source: "مسح تكنولوجيا المعلومات (جدول 1-4، ص 44)",
    },
    {
      key: "internet",
      nameAr: "الهواتف الذكية (Smartphones)",
      nameEn: "Smartphone Share",
      val: selectedGov.internetPenetrationPct,
      natAvg: NATIONAL_AVERAGE_METRICS.internetPenetrationPct,
      color: "#3B82F6",
      icon: "🌐",
      source: "مسح تكنولوجيا المعلومات (جدول 1-5، ص 46)",
    },
    {
      key: "computers",
      nameAr: "استخدام الحواسيب واللابتوب",
      nameEn: "Computer & Laptop Usage",
      val: selectedGov.computerUsagePct,
      natAvg: NATIONAL_AVERAGE_METRICS.computerUsagePct,
      color: "#F59E0B",
      icon: "💻",
      source: "مسح تكنولوجيا المعلومات (جدول 1-10، ص 54)",
    },
    {
      key: "shopping",
      nameAr: "التسوق والشراء الإلكتروني",
      nameEn: "Online Purchasing",
      val: selectedGov.onlineShoppingPct,
      natAvg: NATIONAL_AVERAGE_METRICS.onlineShoppingPct,
      color: "#EC4899",
      icon: "🛒",
      source: "مسح تكنولوجيا المعلومات (جدول 1-18، ص 87)",
    },
    {
      key: "skills",
      nameAr: "المهارات الرقمية",
      nameEn: "Digital Skills",
      val: selectedGov.digitalSkillsPct,
      natAvg: NATIONAL_AVERAGE_METRICS.digitalSkillsPct,
      color: "#A855F7",
      icon: "🎓",
      source: "مسح تكنولوجيا المعلومات (جدول 1-17، ص 78)",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Top Governorate Banner & Dual Switcher (Only if NOT in sidebar mode) */}
      {!sidebarMode && (
        <div className="relative rounded-2xl bg-gradient-to-r from-purple-50/80 via-slate-50 to-white dark:from-[#10172B] dark:via-[#0E1527] dark:to-[#0A0F1D] border border-purple-200 dark:border-purple-500/30 p-6 shadow-sm dark:shadow-[0_0_25px_rgba(168,85,247,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-30 transition-colors duration-300">
          <div>
            <div className="flex items-center gap-2">
              <button
                onClick={onBackToAll}
                className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {isAr ? "← العودة لمقارنة كل المحافظات" : "← Back to all governorates"}
              </button>
              <span className="text-slate-400 dark:text-slate-600">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? selectedGov.regionAr : selectedGov.regionEn}
              </span>
              {selectedGov.regionType === "Kurdistan" && (
                <span className="px-2 py-0.5 rounded text-[10px] bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30">
                  {isAr ? "إقليم كردستان" : "Kurdistan Region"}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 flex items-center gap-2.5">
              <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
              <span>{isAr ? selectedGov.nameAr : selectedGov.nameEn}</span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 dark:bg-cyan-500/20 dark:text-cyan-300 dark:border-cyan-400/30 font-bold">
                {isAr ? `الترتيب الوطني: #${selectedGov.rank}` : `Rank: #${selectedGov.rank}`}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl font-light">
              {selectedGov.marketTier} • {isAr ? `النموذج الأنسب: ${selectedGov.bestFitModel}` : `Best Fit: ${selectedGov.bestFitModel}`}
            </p>
          </div>

          {/* Quick Switcher for Governorate with Dropdown & Full List */}
          <div className="relative self-start sm:self-center">
            <button
              onClick={() => setGovDropdownOpen(!govDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 dark:bg-[#162038] dark:hover:bg-[#1E2B4A] dark:text-white text-xs font-bold border border-slate-200 dark:border-purple-500/40 shadow-sm dark:shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-colors cursor-pointer"
            >
              <span>{isAr ? "تغيير المحافظة" : "Switch Governorate"}</span>
              <ChevronDown className={`w-4 h-4 text-purple-500 dark:text-purple-400 transition-transform duration-200 ${govDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {govDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                  onClick={() => setGovDropdownOpen(false)}
                ></div>

                <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-72 max-h-96 overflow-y-auto rounded-2xl bg-white dark:bg-[#0E1528] border border-slate-200 dark:border-purple-500/60 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.95)] py-2 z-50 text-xs divide-y divide-slate-100 dark:divide-white/5">
                  <div className="px-3.5 py-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span className="text-purple-600 dark:text-purple-300 font-bold">{isAr ? "اختر من المحافظات الـ 18:" : "Select Governorate (18):"}</span>
                    <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono">
                      {ALL_GOVERNORATES.length} {isAr ? "محافظة" : "govs"}
                    </span>
                  </div>
                  <div className="py-1">
                    {ALL_GOVERNORATES.map((g) => {
                      const isSelected = selectedGov.id === g.id;
                      return (
                        <button
                          key={g.id}
                          onClick={() => {
                            onSelectGov(g);
                            setGovDropdownOpen(false);
                          }}
                          className={`w-full text-right px-3.5 py-2.5 hover:bg-purple-50 dark:hover:bg-purple-600/30 text-slate-700 dark:text-slate-200 transition-colors flex justify-between items-center cursor-pointer ${
                            isSelected
                              ? "font-bold text-cyan-700 dark:text-cyan-300 bg-purple-50 dark:bg-purple-600/25 border-r-4 border-cyan-500 dark:border-cyan-400"
                              : ""
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {isAr ? g.nameAr : g.nameEn}
                            </span>
                            {g.regionType === "Kurdistan" && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] bg-purple-100 dark:bg-purple-500/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/40">
                                {isAr ? "إقليم" : "KRG"}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-mono font-bold">
                            #{g.rank} ({g.overallScore}%)
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 2. Interactive Sector / Topic Navigation Pills (Only if NOT in sidebar mode) */}
      {!sidebarMode && (
        <div className="rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-white/10 p-3 shadow-sm dark:shadow-xl flex items-center gap-2 overflow-x-auto transition-colors duration-300">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold px-2 flex-shrink-0">
            {isAr ? "القطاع المعروض:" : "Active Sector:"}
          </span>
          {TOPICS.map((topic) => {
            const isActive = selectedTopic.id === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => onSelectTopic(topic)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                  isActive
                    ? "border shadow-md"
                    : "bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:bg-white/5 dark:border-white/5 dark:text-slate-400 dark:hover:text-white dark:hover:border-white/20"
                }`}
                style={{
                  backgroundColor: isActive ? `${topic.neonColor}22` : undefined,
                  borderColor: isActive ? topic.neonColor : undefined,
                  color: isActive ? topic.neonColor : undefined,
                  boxShadow: isActive ? `0 0 15px ${topic.neonGlow}` : undefined,
                }}
              >
                <span className="text-sm">{topic.icon}</span>
                <span>{isAr ? topic.titleAr : topic.titleEn}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* 3. Deep Dive Section for THIS Specific Topic in THIS Governorate */}
      <div id="charts" className="space-y-4 scroll-mt-24">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-3">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-xl">{selectedTopic.icon}</span>
              <span>
                {isAr
                  ? `تفاصيل قطاع (${selectedTopic.titleAr}) في ${selectedGov.nameAr}`
                  : `Detailed Breakdown: ${selectedTopic.titleEn} in ${selectedGov.nameEn}`}
              </span>
            </h3>
            {/* Subtitle hidden upon user request
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr ? "تحليل فرعي وتفصيلي مبني على البيانات الرسمية الموثقة" : "Specialized analysis based on official data"}
            </p>
            */}
          </div>
          <div className="flex items-center gap-2.5">
            {sidebarMode && (
              <div className="relative">
                <button
                  onClick={() => setGovDropdownOpen(!govDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 dark:bg-[#162038] dark:hover:bg-[#1E2B4A] dark:text-white text-xs font-bold border border-slate-200 dark:border-purple-500/40 shadow-sm dark:shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>{isAr ? selectedGov.nameAr : selectedGov.nameEn}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-purple-600 dark:text-purple-400 transition-transform duration-200 ${govDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {govDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                      onClick={() => setGovDropdownOpen(false)}
                    ></div>
                    <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-64 max-h-80 overflow-y-auto rounded-2xl bg-white dark:bg-[#0E1528] border border-slate-200 dark:border-purple-500/60 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.95)] py-2 z-50 text-xs divide-y divide-slate-100 dark:divide-white/5">
                      <div className="px-3.5 py-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                        <span className="text-purple-600 dark:text-purple-300 font-bold">{isAr ? "اختر المحافظة:" : "Select Governorate:"}</span>
                        <span className="text-cyan-600 dark:text-cyan-400 font-mono">18</span>
                      </div>
                      <div className="py-1">
                        {ALL_GOVERNORATES.map((g) => (
                          <button
                            key={g.id}
                            onClick={() => {
                              onSelectGov(g);
                              setGovDropdownOpen(false);
                            }}
                            className={`w-full text-start px-3.5 py-2 hover:bg-purple-50 dark:hover:bg-purple-600/30 text-slate-700 dark:text-slate-200 transition-colors flex justify-between items-center cursor-pointer ${
                              selectedGov.id === g.id ? "font-bold text-cyan-700 dark:text-cyan-300 bg-purple-50 dark:bg-purple-600/25 border-l-4 rtl:border-l-0 rtl:border-r-4 border-cyan-500 dark:border-cyan-400" : ""
                            }`}
                          >
                            <span>{isAr ? g.nameAr : g.nameEn}</span>
                            <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono font-bold">#{g.rank}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Badge pill hidden upon user request
            <span
              className="px-3 py-1 rounded-full text-xs font-mono font-bold"
              style={{
                backgroundColor: `${breakdownConfig.neonColor}22`,
                color: breakdownConfig.neonColor,
                border: `1px solid ${breakdownConfig.neonColor}66`,
              }}
            >
              {isAr ? "تحليل فرعي مخصص" : "Domain Telemetry"}
            </span>
            */}
          </div>
        </div>

        {/* Specialized Visual Charts for this Topic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Chart 1: National Benchmark Comparison Card OR Donut / Pie Breakdown */}
          {govDetails.benchmarkData ? (
            <div className={`${govDetails.barData ? "lg:col-span-6" : "lg:col-span-12"} rounded-2xl bg-white dark:bg-[#090E1D] border border-slate-200 dark:border-white/10 p-5 sm:p-6 shadow-sm dark:shadow-2xl flex flex-col justify-between h-full transition-colors duration-300`}>
              {(() => {
                const pillars = govDetails.benchmarkData.filter((i) => !i.isOverallResult);
                const overallResult = govDetails.benchmarkData.find((i) => i.isOverallResult);

                return (
                  <>
                    {/* Header */}
                    <div className="border-b border-slate-200 dark:border-white/5 pb-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                          <Scale className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>
                            {isAr
                              ? `المقارنة المعيارية: ${selectedGov.nameAr} مقابل عموم العراق`
                              : `Benchmark: ${selectedGov.nameEn} vs. Iraq National Average`}
                          </span>
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {isAr
                            ? "فارق النقاط المئوية مقارنة بالمجموع العام لجمهورية العراق (مسح 2022)"
                            : "Percentage-point delta against official COSIT 2022 Iraq baseline"}
                        </p>
                      </div>
                      {/* Legend */}
                      <div className="flex items-center gap-3 text-[10px] font-mono shrink-0 pt-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500 dark:bg-cyan-400"></span>
                          <span className="text-slate-700 dark:text-slate-200">{selectedGov.nameAr}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-sm bg-slate-400 dark:bg-slate-500"></span>
                          <span className="text-slate-500 dark:text-slate-400">{isAr ? "العراق" : "Iraq"}</span>
                        </div>
                      </div>
                    </div>

                    {/* 4 Foundational Pillars (rendered in 2 columns on wide screens) */}
                    <div className={`grid grid-cols-1 ${govDetails.barData ? "" : "md:grid-cols-2"} gap-3.5 my-4`}>
                      {pillars.map((item, idx) => {
                        return (
                          <div key={idx} className="bg-slate-50 dark:bg-[#0D1424] p-3 rounded-xl border border-slate-200 dark:border-white/5 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-1.5">
                                <span className="text-slate-800 dark:text-slate-200 font-semibold">{item.metricLabel}</span>
                              </div>
                            </div>

                            {/* Parallel Bars */}
                            <div className="space-y-1.5 pt-0.5">
                              <div className="flex items-center gap-2 text-[11px]">
                                <span className="w-12 text-slate-500 dark:text-slate-400 text-[10px] truncate">{selectedGov.nameAr}</span>
                                <div className="flex-1 bg-slate-200 dark:bg-[#162035] h-2 rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{
                                      width: `${Math.min(100, item.govValue)}%`,
                                      backgroundColor: item.color,
                                      boxShadow: `0 0 6px ${item.color}88`,
                                    }}
                                  ></div>
                                </div>
                                <span className="w-12 text-right font-mono font-bold text-slate-900 dark:text-white text-[11px]">
                                  {item.govValue}%
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-[11px]">
                                <span className="w-12 text-slate-400 dark:text-slate-500 text-[10px] truncate">{isAr ? "العراق" : "Iraq"}</span>
                                <div className="flex-1 bg-slate-200 dark:bg-[#162035] h-1.5 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-slate-400 dark:bg-slate-500 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min(100, item.nationalValue)}%` }}
                                  ></div>
                                </div>
                                <span className="w-12 text-right font-mono text-slate-500 dark:text-slate-400 text-[10px]">
                                  {item.nationalValue}%
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Overall Composite Result (Bottom Highlighted Section) */}
                    {overallResult && (
                      <div className="my-2 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-cyan-50/80 via-blue-50/80 to-cyan-50/80 dark:from-[#0B1728] dark:via-[#0E2038] dark:to-[#0B1728] border border-cyan-200 dark:border-cyan-500/40 shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.12)] space-y-2.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="p-1.5 rounded-lg bg-cyan-100 text-cyan-700 border border-cyan-200 dark:bg-cyan-500/20 dark:text-cyan-400 dark:border-cyan-500/30">
                              <Sparkles className="w-4 h-4" />
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-slate-900 dark:text-white font-bold text-sm tracking-wide">
                                  {overallResult.metricLabel}
                                </span>
                                <span className="text-[10px] text-cyan-800 dark:text-cyan-300 font-mono bg-cyan-100 dark:bg-cyan-950/90 px-2 py-0.5 rounded-full border border-cyan-300 dark:border-cyan-700/60 font-semibold">
                                  {isAr ? "النتيجة المركبة الإجمالية" : "Overall Composite Outcome"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Parallel Bars for Overall Result */}
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center gap-3 text-xs">
                            <span className="w-16 text-cyan-700 dark:text-cyan-300 font-bold text-xs truncate">{selectedGov.nameAr}</span>
                            <div className="flex-1 bg-slate-200 dark:bg-[#162035] h-3 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 dark:from-teal-400 dark:via-cyan-400 dark:to-blue-400"
                                style={{
                                  width: `${Math.min(100, overallResult.govValue)}%`,
                                  boxShadow: "0 0 12px rgba(6, 182, 212, 0.6)",
                                }}
                              ></div>
                            </div>
                            <span className="w-16 text-right font-mono font-bold text-cyan-700 dark:text-cyan-300 text-sm">
                              {overallResult.govValue}%
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-xs">
                            <span className="w-16 text-slate-500 dark:text-slate-400 text-xs truncate">{isAr ? "عموم العراق" : "Iraq"}</span>
                            <div className="flex-1 bg-slate-200 dark:bg-[#162035] h-2 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-slate-400 dark:bg-slate-500 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(100, overallResult.nationalValue)}%` }}
                              ></div>
                            </div>
                            <span className="w-16 text-right font-mono text-slate-500 dark:text-slate-400 text-xs">
                              {overallResult.nationalValue}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="pt-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                      <span>{isAr ? "المصدر: إجمالي جمهورية العراق الرسمي (مسح تكنولوجيا المعلومات 2022)" : "Source: Official COSIT Grand Total Baseline 2022"}</span>
                      <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">COSIT 2022</span>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : govDetails.donutData ? (
            <div className="lg:col-span-6 h-full flex flex-col">
              <NeonDonutChart
                data={govDetails.donutData}
                title={
                  selectedTopic.id === "smartphones"
                    ? (isAr ? "توزيع حصص الأجهزة الذكية والحواسيب" : "Smart Devices Ecosystem Distribution")
                    : selectedTopic.id === "internet"
                    ? (isAr ? "نوع اتصال المنازل بالإنترنت (جدول 2-2)" : "Home Internet Connection Type (Table 2-2)")
                    : selectedTopic.id === "skills"
                    ? (isAr ? "مجالات استخدام الإنترنت اليومية (جدول 1-16)" : "Daily Internet Usage Domains (Table 1-16)")
                    : selectedTopic.id === "spending"
                    ? (isAr ? "توزيع بنود إنفاق الأسرة على التكنولوجيا (جدول 2-5)" : "Household ICT Spend Distribution (Table 2-5)")
                    : (isAr ? `توزيع فئات (${selectedTopic.titleAr})` : "Category Distribution")
                }
                lang={lang}
                theme={theme}
                className="h-full"
              />
            </div>
          ) : null}

          {/* Chart 2: Demographic / Sub-Channel Bars (6 cols) */}
          {govDetails.barData && (
            <div className="lg:col-span-6 rounded-2xl bg-white dark:bg-[#090E1D] border border-slate-200 dark:border-white/10 p-5 shadow-sm dark:shadow-2xl flex flex-col justify-between h-full transition-colors duration-300">
              <div className="border-b border-slate-200 dark:border-white/5 pb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>
                    {selectedTopic.id === "smartphones"
                      ? (isAr ? "التوزيع الديمغرافي لمستخدمي الأجهزة (جدول 1-4)" : "Demographic Breakdown of Users (Table 1-4)")
                      : selectedTopic.id === "internet"
                      ? (isAr ? "قنوات الإنفاق التكنولوجي للأسرة (جدول 2-5)" : "Household Tech Spending Channels (Table 2-5)")
                      : selectedTopic.id === "skills"
                      ? (isAr ? "مصفوفة المهارات التقنية للأفراد (جدول 1-17)" : "Digital Skills Matrix (Table 1-17)")
                      : selectedTopic.id === "spending"
                      ? (isAr ? "تفاصيل بنود الإنفاق الشهري للأسرة (جدول 2-5)" : "Monthly Spend Breakdown (Table 2-5)")
                      : selectedTopic.id === "readiness"
                      ? (isAr ? `ركائز ومؤشرات الجاهزية الميدانية في ${selectedGov.nameAr}` : `Readiness Survey Pillars in ${selectedGov.nameEn}`)
                      : (isAr ? "التوزيع الديمغرافي وقنوات الاستخدام" : "Demographics & Channel Adoption")}
                  </span>
                </h3>
              </div>

              <div className="space-y-3.5 my-4">
                {govDetails.barData.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{item.label}</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        {item.displayValue ?? `${item.value}%`}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-[#161F33] h-2.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${item.value}%`,
                          backgroundColor: item.color,
                          boxShadow: `0 0 8px ${item.color}`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stat Badges Row */}
              <div className="pt-3 border-t border-slate-200 dark:border-white/5 grid grid-cols-3 gap-2 text-center">
                {govDetails.kpiStats.map((kpi, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">{kpi.label}</span>
                    <span className="text-xs sm:text-sm font-black font-mono block mt-0.5" style={{ color: kpi.color }}>
                      {kpi.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. General Benchmark: 6 Core Behavioral Indicators vs National Mean */}
      <div id="behavioral-benchmark" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-white/10 p-6 shadow-sm dark:shadow-2xl space-y-4 flex flex-col justify-between h-full transition-colors duration-300">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                {isAr ? `المؤشرات السلوكية الستة في ${selectedGov.nameAr}` : `Overall Behavioral Indices`}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {isAr
                  ? "مقارنة المحافظة مع المعدل الوطني العام (خط الأساس)"
                  : "Benchmark against the national baseline"}
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 dark:bg-cyan-400"></span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">{isAr ? selectedGov.nameAr : selectedGov.nameEn}</span>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-600 ml-2"></span>
              <span className="text-slate-500 dark:text-slate-400">{isAr ? "المعدل العام" : "Baseline"}</span>
            </div>
          </div>

          <div className="space-y-3.5 pt-1">
            {indicatorsList.map((ind) => {
              return (
                <div key={ind.key} className="space-y-1">
                  <div className="flex items-center justify-between text-xs py-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{ind.icon}</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {isAr ? ind.nameAr : ind.nameEn}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-bold text-sm" style={{ color: ind.color }}>
                        {ind.val}%
                      </span>
                    </div>
                  </div>

                  <div className="relative w-full bg-slate-200 dark:bg-[#161F33] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full relative z-10 transition-all duration-500"
                      style={{
                        width: `${Math.min(100, Math.max(3, ind.val))}%`,
                        backgroundColor: ind.color,
                        boxShadow: `0 0 10px ${ind.color}`,
                      }}
                    ></div>
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-slate-600 dark:bg-white z-20"
                      style={{ left: `${ind.natAvg}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Telemetry: Economic & Readiness */}
        <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-white/10 p-6 shadow-sm dark:shadow-2xl flex flex-col justify-between h-full transition-colors duration-300">
          <div className="border-b border-slate-200 dark:border-white/5 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{isAr ? "المؤشرات الاقتصادية والجاهزية" : "Economic & Readiness Telemetry"}</span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
            </p>
          </div>

          <div className="mt-3 space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">{isAr ? "متوسط إنفاق الاتصالات والتقنية" : "Telecom Spending"}</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-sm">
                {selectedGov.telecomSpending} {isAr ? "ألف د.ع/شهر" : "K IQD/mo"}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">{isAr ? "الدفع عند الاستلام (كاش)" : "Cash-On-Delivery"}</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 font-mono text-sm">
                {selectedGov.cashOnDeliveryPct}%
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">{isAr ? "إنترنت المنازل الثابت" : "Home Internet"}</span>
              <span className="font-bold text-purple-600 dark:text-purple-400 font-mono text-sm">
                {selectedGov.homeInternetPct}%
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">{isAr ? "مؤشر الجاهزية الرقمية للمجتمع" : "Digital Readiness Index"}</span>
              <span className="font-bold text-cyan-600 dark:text-cyan-400 font-mono text-sm">
                {selectedGov.digitalReadinessScore}%
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-violet-500/30 transition-all">
              <span className="text-slate-600 dark:text-slate-400">{isAr ? "مكاتب البطاقات والدفع الذكي" : "Smart Payment Offices"}</span>
              <span className="font-bold text-violet-600 dark:text-violet-400 font-mono text-sm">
                {selectedGov.smartCardOffices} {isAr ? "مكتب" : "offices"}
              </span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/5 text-[10px] text-slate-500 text-center font-mono">
          </div>
        </div>
      </div>

      {/* 5. Strategic Deep Insights for this Governorate: "What does this mean?" */}
      <div id="insights" className="scroll-mt-24 rounded-2xl bg-gradient-to-br from-purple-50/80 via-slate-50 to-white dark:from-[#10182D] dark:via-[#0D1220] dark:to-[#0A0E18] border border-purple-200 dark:border-purple-500/30 p-6 shadow-sm dark:shadow-[0_0_25px_rgba(168,85,247,0.15)] space-y-4 transition-colors duration-300">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-pulse" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {selectedGov.aiTitle || (isAr ? `ماذا تعني هذه البيانات لمشروعك في ${selectedGov.nameAr}؟` : `Market Strategic Analysis`)}
            </h3>
          </div>
          <span className="text-[11px] text-purple-700 dark:text-purple-300 font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 font-bold">
            {isAr ? "التحليل الاستراتيجي للمشروع" : "Strategic Synthesis"}
          </span>
        </div>

        {/* Executive Summary Paragraph */}
        <div className="p-4 rounded-xl bg-purple-100/60 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-xs leading-relaxed text-slate-800 dark:text-slate-300">
          <p>{selectedGov.aiSummary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300 items-stretch">
          {/* Box 1: Recommended Business Models */}
          <div className="bg-white dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/5 space-y-2 flex flex-col justify-between h-full shadow-sm dark:shadow-none">
            <div className="flex items-center gap-1.5 font-bold text-cyan-700 dark:text-cyan-400">
              <Lightbulb className="w-4 h-4" />
              <span>{isAr ? "أبرز نماذج المشاريع التقنية الموصى بها:" : "Recommended Startup Models:"}</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300">
              {selectedGov.recommendedModels && selectedGov.recommendedModels.length > 0 ? (
                selectedGov.recommendedModels.map((m, i) => (
                  <li key={i} className="text-slate-800 dark:text-slate-200 font-medium">
                    {m}
                  </li>
                ))
              ) : (
                <li>تطبيقات التوصيل والخدمات الاستهلاكية المباشرة عبر الموبايل</li>
              )}
            </ul>
          </div>

          {/* Box 2: Bottlenecks & Strategic Advice */}
          <div className="bg-white dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/5 space-y-2 flex flex-col justify-between h-full shadow-sm dark:shadow-none">
            <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              <span>{isAr ? "التحدي التشغيلي وكيفية التغلب عليه:" : "Friction & Founder Strategy:"}</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              {selectedGov.strategicAdvice ||
                (isAr
                  ? "الاعتماد العالي على الكاش يتطلب توفير الدفع عند الاستلام مع تقديم حوافز للتحول نحو الدفع الإلكتروني."
                  : "High cash dependency necessitates Cash-on-Delivery with discounts for digital wallet transactions.")}
            </p>
          </div>
        </div>
      </div>

      {/* 6. Official Census & Survey Tables Supporting this Section (Sources section at the very end) */}
      <div id="sources" className="scroll-mt-24">
        <OfficialTablesNeonList
          tables={breakdownConfig.officialTables}
          topicTitle={isAr ? selectedTopic.titleAr : selectedTopic.titleEn}
          neonColor={breakdownConfig.neonColor}
          neonGlow={breakdownConfig.neonGlow}
          selectedGovAr={selectedGov.nameAr}
          lang={lang}
          theme={theme}
        />
      </div>
    </div>
  );
};
