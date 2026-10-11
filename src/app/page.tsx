"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  TOPICS,
  FEDERAL_GOVERNORATES,
  ALL_GOVERNORATES,
  GovernorateMetric,
  TopicConfig,
} from "../lib/data/iraq-dashboard-data";
import { IraqInteractiveMap } from "../components/dashboard/IraqInteractiveMap";
import { NeonComboChart } from "../components/dashboard/NeonComboChart";
import { SingleGovernorateNeonDashboard } from "../components/dashboard/SingleGovernorateNeonDashboard";
import {
  ArrowRight,
  Database,
  Layers,
  MapPin,
  BarChart3,
  Building2,
  Trophy,
  TrendingUp,
  Filter,
  Map as MapIcon,
  CheckCircle,
} from "lucide-react";

export default function App() {
  const [currentMode, setCurrentMode] = useState<"all_governorates" | "single_governorate">("all_governorates");
  const [viewMode, setViewMode] = useState<"map" | "charts">("map");
  const [selectedTopic, setSelectedTopic] = useState<TopicConfig>(TOPICS[0]); // Default to FinTech & Payments
  const [selectedGov, setSelectedGov] = useState<GovernorateMetric>(ALL_GOVERNORATES[0]); // Default to Baghdad
  const [scope, setScope] = useState<"all" | "federal">("all");
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [activeNav, setActiveNav] = useState<"home" | "map" | "charts" | "insights" | "sources">("home");

  const isAr = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.classList.add("dark");
  }, [lang, isAr]);

  const targetDataset = scope === "federal" ? FEDERAL_GOVERNORATES : ALL_GOVERNORATES;

  const sortedGovs = useMemo(() => {
    const list = [...targetDataset];
    list.sort((a, b) => {
      const valA = Number(a[selectedTopic.metricKey]) || 0;
      const valB = Number(b[selectedTopic.metricKey]) || 0;
      return valB - valA;
    });
    return list;
  }, [targetDataset, selectedTopic]);

  const topGov = sortedGovs[0] || targetDataset[0];

  const avgValue = useMemo(() => {
    const sum = targetDataset.reduce((acc, g) => acc + (Number(g[selectedTopic.metricKey]) || 0), 0);
    return (sum / targetDataset.length).toFixed(1);
  }, [targetDataset, selectedTopic]);

  const avgSpending = useMemo(() => {
    const sum = targetDataset.reduce((acc, g) => acc + g.telecomSpending, 0);
    return (sum / targetDataset.length).toFixed(0);
  }, [targetDataset]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-[#070A12] text-slate-100 selection:bg-cyan-500 selection:text-black font-sans pb-16">
      
      {/* ======================================================== */}
      {/* 1. TOP NAVIGATION BAR                                     */}
      {/* ======================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#070A12]/90 border-b border-white/10 transition-all duration-300">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-20 flex items-center justify-between">
          
          {/* Official Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center p-0.5 border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.35)] bg-[#070A12]">
              <img
                src="/techlocation_logo.jpg"
                alt="TechLocation Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white">
                  Tech<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">Location</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-500/30 font-mono">
                  IRAQ
                </span>
              </div>
              <span className="text-[9px] font-semibold tracking-wider text-slate-400 uppercase">
                Digital Market Explorer
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => {
                setActiveNav("home");
                scrollToSection("home");
              }}
              className={`transition-colors py-1 relative font-medium cursor-pointer ${
                activeNav === "home" ? "text-cyan-400 font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              <span>{isAr ? "الرئيسية" : "Home"}</span>
              {activeNav === "home" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveNav("map");
                setCurrentMode("all_governorates");
                setViewMode("map");
                scrollToSection("dashboard");
              }}
              className={`transition-colors py-1 relative font-medium cursor-pointer ${
                activeNav === "map" && currentMode === "all_governorates" && viewMode === "map"
                  ? "text-cyan-400 font-bold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <span>{isAr ? "الخريطة" : "Map"}</span>
              {activeNav === "map" && currentMode === "all_governorates" && viewMode === "map" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveNav("charts");
                setCurrentMode("all_governorates");
                setViewMode("charts");
                scrollToSection("dashboard");
              }}
              className={`transition-colors py-1 relative font-medium cursor-pointer ${
                activeNav === "charts" && currentMode === "all_governorates" && viewMode === "charts"
                  ? "text-cyan-400 font-bold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <span>{isAr ? "المخططات" : "Charts"}</span>
              {activeNav === "charts" && currentMode === "all_governorates" && viewMode === "charts" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveNav("insights");
                setCurrentMode("single_governorate");
                scrollToSection("dashboard");
              }}
              className={`transition-colors py-1 relative font-medium cursor-pointer ${
                activeNav === "insights" && currentMode === "single_governorate"
                  ? "text-cyan-400 font-bold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <span>{isAr ? "الرؤى والتحليلات" : "Insights"}</span>
              {activeNav === "insights" && currentMode === "single_governorate" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveNav("sources");
                scrollToSection("sources");
              }}
              className={`transition-colors py-1 relative font-medium cursor-pointer ${
                activeNav === "sources" ? "text-cyan-400 font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              <span>{isAr ? "مصادر البيانات" : "Sources"}</span>
              {activeNav === "sources" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
              )}
            </button>
          </nav>

          {/* Right Action: Language Switcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(isAr ? "en" : "ar")}
              className="px-3.5 py-1.5 rounded-lg border border-white/15 hover:border-cyan-400/50 text-xs font-bold font-mono transition-colors text-slate-300 bg-white/5 cursor-pointer shadow-sm"
            >
              {isAr ? "EN" : "عربي"}
            </button>
          </div>

        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. HERO BANNER CARD (Exact Match to Screenshot 1)         */}
      {/* ======================================================== */}
      <section id="home" className="pt-28 pb-6 px-4 sm:px-6 lg:px-8 xl:px-10 max-w-[1720px] mx-auto">
        <div className="relative rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10 bg-[#090E1D]/90 shadow-[0_0_50px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden min-h-[320px] flex items-center">
          {/* Background 3D Iraq Map */}
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            <img
              src="/hero_iraq_banner_bg.jpg"
              alt="خارطة شبكة العراق الرقمية"
              className="w-full h-full object-cover object-center lg:object-[80%_35%] rtl:lg:object-[20%_35%] opacity-65"
            />
            {/* Directional & Vignette Gradients for maximum contrast on text side and clear visibility on map side */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#090E1D]/95 via-[#090E1D]/70 to-transparent rtl:bg-gradient-to-l rtl:from-[#090E1D]/95 rtl:via-[#090E1D]/70 rtl:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090E1D]/80 via-transparent to-[#090E1D]/40" />
          </div>

          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl lg:max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-cyan-400 text-[11px] font-bold tracking-wider uppercase backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>{isAr ? "• بيانات رسمية • رؤى حقيقية" : "• OFFICIAL DATA • REAL INSIGHTS"}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                {isAr ? "دليل السوق " : "Digital Market "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                  {isAr ? "الرقمي " : "Intelligence "}
                </span>
                {isAr ? "لمحافظات العراق" : "for Iraq"}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed">
                {isAr
                  ? "بيانات ورؤى مكانية موثقة تُمكّن رواد الأعمال وصنّاع القرار من اتخاذ قرارات توسع مبنية على أرقام واقعية."
                  : "Location intelligence and official metrics empowering entrepreneurs to make data-driven expansion decisions."}
              </p>

              {/* Scope Mode Switcher Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setCurrentMode("all_governorates");
                    setActiveNav("map");
                    scrollToSection("dashboard");
                  }}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentMode === "all_governorates"
                      ? "bg-cyan-400 text-slate-950 font-black shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-[1.02]"
                      : "bg-[#0E1528] text-slate-300 border border-white/10 hover:border-white/20"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>{isAr ? "كافة المحافظات" : "All Governorates"}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 ml-1" />
                </button>

                <button
                  onClick={() => {
                    setCurrentMode("single_governorate");
                    setActiveNav("insights");
                    scrollToSection("dashboard");
                  }}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentMode === "single_governorate"
                      ? "bg-purple-600 text-white font-black shadow-[0_0_20px_rgba(168,85,247,0.5)] scale-[1.02]"
                      : "bg-[#0E1528] text-slate-300 border border-white/10 hover:border-white/20"
                  }`}
                >
                  <Building2 className="w-4 h-4 text-purple-400" />
                  <span>{isAr ? "تحليل محافظة منفردة" : "Single Governorate"}</span>
                </button>
              </div>
            </div>

            {/* Right 2x2 Floating Stat Grid - Hidden upon user request */}
            {/*
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-[#0D1426]/80 border border-white/10 hover:border-cyan-500/30 transition-all">
                <div className="flex items-center gap-2 text-cyan-400 mb-1.5">
                  <Database className="w-4 h-4" />
                  <span className="text-xl sm:text-2xl font-black font-mono text-white">2</span>
                </div>
                <div className="text-xs font-bold text-slate-200">
                  {isAr ? "مصادر رسمية" : "Official Sources"}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  COSIT 2022 · 2024
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0D1426]/80 border border-white/10 hover:border-cyan-500/30 transition-all">
                <div className="flex items-center gap-2 text-cyan-400 mb-1.5">
                  <Layers className="w-4 h-4" />
                  <span className="text-xl sm:text-2xl font-black font-mono text-white">50+</span>
                </div>
                <div className="text-xs font-bold text-slate-200">
                  {isAr ? "مؤشرات تفصيلية" : "Indicators"}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {isAr ? "عبر مختلف القطاعات" : "Across sectors"}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0D1426]/80 border border-white/10 hover:border-purple-500/30 transition-all">
                <div className="flex items-center gap-2 text-purple-400 mb-1.5">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xl sm:text-2xl font-black font-mono text-white">18</span>
                </div>
                <div className="text-xs font-bold text-slate-200">
                  {isAr ? "محافظة عراقية" : "Governorates"}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {isAr ? "تغطية وطنية شاملة" : "Full coverage"}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0D1426]/80 border border-white/10 hover:border-purple-500/30 transition-all">
                <div className="flex items-center gap-2 text-purple-400 mb-1.5">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-xl sm:text-2xl font-black font-mono text-white">100%</span>
                </div>
                <div className="text-xs font-bold text-slate-200">
                  {isAr ? "رؤى استثمارية" : "Real Insights"}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {isAr ? "لعراق أكثر اتصالاً" : "For a connected Iraq"}
                </div>
              </div>
            </div>

            */}
        </div>
      </section>


      {/* ======================================================== */}
      {/* 3. MAIN DASHBOARD: 2-COLUMN ARCHITECTURE (SIDEBAR + MAIN)  */}
      {/* ======================================================== */}
      <main id="dashboard" className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ------------------------------------------------------ */}
          {/* LEFT SIDEBAR: VIEW MODE + ANALYSIS SCOPE + INDICATORS   */}
          {/* ------------------------------------------------------ */}
          <aside className="lg:col-span-3 xl:col-span-3 space-y-4 lg:sticky lg:top-24">
            
            {/* CARD 1: VIEW MODE (Map vs Charts) */}
            <div className="p-4 rounded-2xl bg-[#090E1D] border border-white/10 shadow-lg space-y-3">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {isAr ? "نمط العرض" : "VIEW MODE"}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setViewMode("map");
                    setCurrentMode("all_governorates");
                    setActiveNav("map");
                  }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentMode === "all_governorates" && viewMode === "map"
                      ? "bg-cyan-400 text-slate-950 font-black shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                      : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  <span>{isAr ? "الخريطة" : "Map"}</span>
                </button>

                <button
                  onClick={() => {
                    setViewMode("charts");
                    setCurrentMode("all_governorates");
                    setActiveNav("charts");
                  }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentMode === "all_governorates" && viewMode === "charts"
                      ? "bg-cyan-400 text-slate-950 font-black shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                      : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>{isAr ? "المخططات" : "Charts"}</span>
                </button>
              </div>
            </div>

            {/* CARD 2: ANALYSIS SCOPE (Hidden upon user request as it is already present in hero)
            <div className="p-4 rounded-2xl bg-[#090E1D] border border-white/10 shadow-lg space-y-3">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {isAr ? "نطاق التحليل" : "ANALYSIS SCOPE"}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setCurrentMode("all_governorates");
                    setActiveNav(viewMode === "map" ? "map" : "charts");
                  }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentMode === "all_governorates"
                      ? "bg-cyan-400 text-slate-950 font-black shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                      : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{isAr ? "كل المحافظات" : "All Govs"}</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentMode("single_governorate");
                    setActiveNav("insights");
                  }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentMode === "single_governorate"
                      ? "bg-purple-600 text-white font-black shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                      : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{isAr ? "محافظة منفردة" : "Single Gov"}</span>
                </button>
              </div>
            </div>
            */}

            {/* CARD 3: SELECT INDICATOR (Vertical Topic List with Glow) */}
            <div className="p-4 rounded-2xl bg-[#090E1D] border border-white/10 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {isAr ? "اختيار المؤشر" : "SELECT INDICATOR"}
                </div>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                  {TOPICS.length}
                </span>
              </div>

              <div className="space-y-2">
                {TOPICS.map((topic) => {
                  const isSelected = selectedTopic.id === topic.id;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic)}
                      className={`w-full text-start p-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#0C152B] border border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.25)] font-bold"
                          : "bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span className="text-base">{topic.icon}</span>
                      <span className="truncate">{isAr ? topic.titleAr : topic.titleEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </aside>


          {/* ------------------------------------------------------ */}
          {/* RIGHT MAIN PANEL (MAP / CHARTS / SINGLE GOV DEEP DIVE) */}
          {/* ------------------------------------------------------ */}
          <section className="lg:col-span-9 xl:col-span-9 space-y-6 min-w-0">

            {/* CASE A: ALL GOVERNORATES MODE */}
            {currentMode === "all_governorates" ? (
              <div className="space-y-6">
                
                {/* 3 TOP KPI CARDS (Hidden upon user request)
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  // Card 1: Leading Governorate
                  <div className="rounded-2xl bg-[#090E1D] border border-cyan-500/30 p-5 shadow-lg flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs font-bold text-cyan-400 uppercase tracking-wider">
                      <span>{isAr ? "المحافظة المتصدرة" : "LEADING GOVERNORATE"}</span>
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
                        ? `الإنفاق: ${topGov.telecomSpending} ألف د.ع • الأنسب: ${topGov.bestFitModel}`
                        : `Spend: ${topGov.telecomSpending}K IQD · Best: ${topGov.bestFitModel}`}
                    </p>
                  </div>

                  // Card 2: National Average
                  <div className="rounded-2xl bg-[#090E1D] border border-purple-500/30 p-5 shadow-lg flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs font-bold text-purple-400 uppercase tracking-wider">
                      <span>{isAr ? "المعدل الوطني" : "NATIONAL AVG"}</span>
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="mt-2 flex items-baseline justify-between">
                      <span className="text-2xl font-black text-white">
                        {isAr ? "المعدل العام" : "Baseline"}
                      </span>
                      <span className="text-2xl font-extrabold text-purple-400 font-mono drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
                        {avgValue}
                        {selectedTopic.unit}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {isAr
                        ? `متوسط إنفاق الأسرة: ${avgSpending} ألف د.ع • الكاش: 99.7%`
                        : `Avg Spend: ${avgSpending}K IQD · Cash: 99.7%`}
                    </p>
                  </div>

                  // Card 3: Dataset Scope
                  <div className="rounded-2xl bg-[#090E1D] border border-amber-500/30 p-5 shadow-lg flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs font-bold text-amber-400 uppercase tracking-wider">
                      <span>{isAr ? "نطاق البيانات" : "DATASET SCOPE"}</span>
                      <Filter className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => setScope("all")}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          scope === "all"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                            : "bg-white/5 text-slate-400 hover:text-white"
                        }`}
                      >
                        {isAr ? "كل الـ 18" : "All 18"}
                      </button>
                      <button
                        onClick={() => setScope("federal")}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          scope === "federal"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                            : "bg-white/5 text-slate-400 hover:text-white"
                        }`}
                      >
                        {isAr ? "15 اتحادية" : "15 Federal"}
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      COSIT 2022 + 2024 telemetry
                    </p>
                  </div>

                </div>
                */}

                {/* VIEW DISPLAY: Interactive Map vs Combo Chart */}
                {viewMode === "map" ? (
                  <IraqInteractiveMap
                    governorates={targetDataset}
                    selectedTopic={selectedTopic}
                    onSelectGovernorate={(gov) => {
                      setSelectedGov(gov);
                      setCurrentMode("single_governorate");
                      setActiveNav("insights");
                    }}
                    lang={lang}
                    scope={scope}
                  />
                ) : (
                  <NeonComboChart
                    governorates={targetDataset}
                    metricKey={selectedTopic.metricKey}
                    unit={selectedTopic.unit}
                    neonColor={selectedTopic.neonColor}
                    neonGlow={selectedTopic.neonGlow}
                    onSelectGov={(gov) => {
                      setSelectedGov(gov);
                      setCurrentMode("single_governorate");
                      setActiveNav("insights");
                    }}
                    lang={lang}
                  />
                )}

              </div>
            ) : (
              /* CASE B: SINGLE GOVERNORATE DEEP DIVE */
              <SingleGovernorateNeonDashboard
                selectedGov={selectedGov}
                selectedTopic={selectedTopic}
                onSelectTopic={setSelectedTopic}
                onSelectGov={setSelectedGov}
                onBackToAll={() => setCurrentMode("all_governorates")}
                lang={lang}
                sidebarMode={true}
              />
            )}

          </section>

        </div>

        {/* ======================================================== */}
        {/* 4. FOOTER                                                */}
        {/* ======================================================== */}
        <footer id="sources" className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <div>
            <span>
              {isAr
                ? "المصدر: هيئة الإحصاء ونظم المعلومات الجغرافية (COSIT) — إحصاءات الاتصالات والبريد 2024 ومسح تكنولوجيا المعلومات 2022"
                : "Source: COSIT Telecom & Postal 2024 & ICT Household Survey 2022 Reports"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>{isAr ? "بيانات حقيقية موثقة لـ 18 محافظة" : "Verified Telemetry for 18 Governorates"}</span>
          </div>
        </footer>

      </main>

    </div>
  );
}
