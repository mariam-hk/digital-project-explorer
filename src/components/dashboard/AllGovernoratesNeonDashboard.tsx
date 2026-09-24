"use client";

import React, { useState, useMemo } from "react";
import {
  FEDERAL_GOVERNORATES,
  ALL_GOVERNORATES,
  GovernorateMetric,
  TopicConfig,
} from "../../lib/data/iraq-dashboard-data";
import { TOPIC_BREAKDOWNS } from "../../lib/data/topic-detailed-breakdowns";
import { NeonComboChart } from "./NeonComboChart";
import { IraqInteractiveMap } from "./IraqInteractiveMap";
import { OfficialTablesNeonList } from "./OfficialTablesNeonList";
import {
  Trophy,
  TrendingUp,
  ExternalLink,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Filter,
  Map as MapIcon,
  BarChart3,
  Layers,
} from "lucide-react";

interface AllGovernoratesNeonDashboardProps {
  selectedTopic: TopicConfig;
  onSelectGovernorate: (gov: GovernorateMetric) => void;
  lang: "en" | "ar";
}

export const AllGovernoratesNeonDashboard: React.FC<AllGovernoratesNeonDashboardProps> = ({
  selectedTopic,
  onSelectGovernorate,
  lang,
}) => {
  const isAr = lang === "ar";
  const [scope, setScope] = useState<"federal" | "all">("all"); // Default to all 18 so map is complete
  const [viewType, setViewType] = useState<"map" | "chart" | "both">("map"); // Default to Interactive Map
  const [sortBy, setSortBy] = useState<"value" | "spending" | "overall">("value");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  // Filtered dataset according to scope
  const targetDataset = scope === "federal" ? FEDERAL_GOVERNORATES : ALL_GOVERNORATES;

  // Sorted list of governorates
  const sortedGovs = useMemo(() => {
    const list = [...targetDataset];
    list.sort((a, b) => {
      let valA: number = (a[selectedTopic.metricKey] as number) || 0;
      let valB: number = (b[selectedTopic.metricKey] as number) || 0;

      if (sortBy === "spending") {
        valA = a.telecomSpending;
        valB = b.telecomSpending;
      } else if (sortBy === "overall") {
        valA = a.overallScore;
        valB = b.overallScore;
      }

      return sortOrder === "desc" ? valB - valA : valA - valB;
    });
    return list;
  }, [targetDataset, selectedTopic, sortBy, sortOrder]);

  const topGov = sortedGovs[0];
  const avgValue = useMemo(() => {
    const sum = targetDataset.reduce(
      (acc, g) => acc + ((g[selectedTopic.metricKey] as number) || 0),
      0
    );
    return (sum / targetDataset.length).toFixed(1);
  }, [targetDataset, selectedTopic]);

  const avgSpending = useMemo(() => {
    const sum = targetDataset.reduce((acc, g) => acc + g.telecomSpending, 0);
    return (sum / targetDataset.length).toFixed(0);
  }, [targetDataset]);

  // Retrieve official table list for the selected topic
  const currentBreakdown = TOPIC_BREAKDOWNS[selectedTopic.id] || TOPIC_BREAKDOWNS["smartphones"];

  return (
    <div className="space-y-6">
      {/* Top Banner & Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Leading Governorate Card */}
        <div className="relative overflow-hidden rounded-2xl bg-[#0E1424] border border-cyan-500/30 p-5 shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              {isAr ? "المحافظة المتصدرة في هذا المؤشر" : "Leading Governorate"}
            </span>
            <Trophy className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">
              {isAr ? topGov.nameAr : topGov.nameEn}
            </span>
            <span className="text-2xl font-extrabold text-cyan-400 font-mono drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
              {topGov[selectedTopic.metricKey]}
              {selectedTopic.unit}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {isAr
              ? `إنفاق التكنولوجيا: ${topGov.telecomSpending} ألف د.ع • الأنسب لـ: ${topGov.bestFitModel}`
              : `Telecom Spending: ${topGov.telecomSpending}K IQD • Best Fit: ${topGov.bestFitModel}`}
          </p>
        </div>

        {/* Average Card */}
        <div className="relative overflow-hidden rounded-2xl bg-[#0E1424] border border-purple-500/30 p-5 shadow-[0_0_20px_rgba(168,85,247,0.15)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
              {isAr
                ? scope === "federal"
                  ? "معدل الـ 15 محافظة (عدا الإقليم)"
                  : "معدل عموم العراق (18 محافظة)"
                : scope === "federal"
                ? "15 Governorates Average"
                : "National Benchmark"}
            </span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">
              {isAr ? "المعدل العام" : "Baseline Mean"}
            </span>
            <span className="text-2xl font-extrabold text-purple-400 font-mono drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
              {avgValue}
              {selectedTopic.unit}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {isAr
              ? `متوسط إنفاق الأسرة الشهري: ${avgSpending} ألف دينار • اعتماد الكاش: 99.7%`
              : `Avg Household Spend: ${avgSpending}K IQD • Cash Dependency: 99.7%`}
          </p>
        </div>

        {/* Scope Selector Card */}
        <div className="relative overflow-hidden rounded-2xl bg-[#0E1424] border border-amber-500/30 p-5 shadow-[0_0_20px_rgba(245,158,11,0.15)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              {isAr ? "نطاق المحافظات المعروضة" : "Dataset Scope"}
            </span>
            <Filter className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={() => setScope("all")}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                scope === "all"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {isAr ? "كل العراق (18)" : "All 18 Govs"}
            </button>
            <button
              onClick={() => setScope("federal")}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                scope === "federal"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {isAr ? "15 محافظة (عدا الإقليم)" : "15 Federal"}
            </button>
          </div>
          <p className="text-[10px] text-slate-400 mt-2">
            {isAr
              ? "بيانات حقيقية من مسح تكنولوجيا المعلومات 2022 وإحصاءات الاتصالات 2024"
              : "Directly grounded in official COSIT 2022 & 2024 Survey reports"}
          </p>
        </div>
      </div>

      {/* View Switcher: Interactive Map vs Combo Chart vs Both */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-[#090E1D] border border-white/10 shadow-lg">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-400 font-bold px-2">
            {isAr ? "طريقة العرض:" : "View Mode:"}
          </span>
          <button
            onClick={() => setViewType("map")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              viewType === "map"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-[#070B14] shadow-[0_0_15px_rgba(6,182,212,0.6)] font-black scale-[1.02]"
                : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span>{isAr ? "🗺️ خريطة العراق التفاعلية (18 محافظة)" : "🗺️ Interactive Iraq Map"}</span>
          </button>
          <button
            onClick={() => setViewType("chart")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              viewType === "chart"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-[#070B14] shadow-[0_0_15px_rgba(6,182,212,0.6)] font-black scale-[1.02]"
                : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{isAr ? "📊 مخطط الأعمدة والمنحنى التوافقي" : "📊 Combo Chart"}</span>
          </button>
          <button
            onClick={() => setViewType("both")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              viewType === "both"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-[#070B14] shadow-[0_0_15px_rgba(6,182,212,0.6)] font-black scale-[1.02]"
                : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{isAr ? "⚡ كلاهما معاً" : "⚡ View Both"}</span>
          </button>
        </div>

        <div className="text-[11px] text-cyan-400 font-mono hidden md:block px-2">
          {isAr
            ? `المؤشر الفعّال: ${selectedTopic.titleAr}`
            : `Active Indicator: ${selectedTopic.titleEn}`}
        </div>
      </div>

      {/* 1. Interactive Map View */}
      {(viewType === "map" || viewType === "both") && (
        <IraqInteractiveMap
          governorates={targetDataset}
          selectedTopic={selectedTopic}
          onSelectGovernorate={onSelectGovernorate}
          lang={lang}
          scope={scope}
        />
      )}

      {/* 2. Main Visual: Neon Combination Bar + Spline Trend Chart */}
      {(viewType === "chart" || viewType === "both") && (
        <NeonComboChart
          governorates={sortedGovs}
          metricKey={selectedTopic.metricKey}
          unit={selectedTopic.unit}
          neonColor={currentBreakdown.neonColor}
          neonGlow={currentBreakdown.neonGlow}
          onSelectGov={onSelectGovernorate}
          lang={lang}
        />
      )}

      {/* 3. Official Census & Survey Tables (Displayed explicitly under the Governorates in Neon Colors) */}
      <OfficialTablesNeonList
        tables={currentBreakdown.officialTables}
        topicTitle={isAr ? selectedTopic.titleAr : selectedTopic.titleEn}
        neonColor={currentBreakdown.neonColor}
        neonGlow={currentBreakdown.neonGlow}
        lang={lang}
      />

      {/* 4. AI Strategic Interpretation for this Sector */}
      <div className="rounded-2xl bg-gradient-to-br from-[#10182D] via-[#0D1220] to-[#0A0E18] border border-cyan-500/30 p-6 shadow-[0_0_25px_rgba(6,182,212,0.1)] space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h3 className="text-base font-bold text-white">
              {isAr
                ? `تحليل الذكاء الاصطناعي لقطاع: (${selectedTopic.titleAr})`
                : `AI Strategic Intelligence: (${selectedTopic.titleEn})`}
            </h3>
          </div>
          <span className="text-[11px] text-cyan-400 font-mono">
            {isAr ? "مبني على أرقام المسح الرسمي" : "Grounded in Official COSIT Findings"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-300">
          <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>{isAr ? "الفرص التجارية والاستثمارية:" : "Commercial & Founder Opportunities:"}</span>
            </div>
            <p>
              {isAr
                ? `تتصدر محافظة ${topGov.nameAr} في مؤشر ${selectedTopic.titleAr} بنسبة ${topGov[selectedTopic.metricKey]}${selectedTopic.unit}، مما يجعلها السوق الأول للمشاريع المرتبطة بهذا السلوك وبإنفاق تكنولوجي يبلغ ${topGov.telecomSpending} ألف دينار شهرياً.`
                : `Leading hub ${topGov.nameEn} commands ${topGov[selectedTopic.metricKey]}${selectedTopic.unit} in ${selectedTopic.titleEn}, making it the prime launchpad with ${topGov.telecomSpending}K IQD monthly tech spend.`}
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <AlertCircle className="w-4 h-4" />
              <span>{isAr ? "التحديات والفجوات الميدانية:" : "Market Friction & Strategic Advice:"}</span>
            </div>
            <p>
              {isAr
                ? `تظهر البيانات تبايناً بين المحافظات الكبرى والأطراف؛ يتطلب التوسع الناجح توفير تجربة استخدام خفيفة وسريعة تدعم الهواتف المحمولة وخيارات دفع هجينة.`
                : `Founders scaling beyond top hubs must support mobile-first lightweight interfaces and hybrid payment gateways.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
