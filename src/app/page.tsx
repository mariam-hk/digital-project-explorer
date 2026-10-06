"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  TOPICS,
  FEDERAL_GOVERNORATES,
  ALL_GOVERNORATES,
  NATIONAL_AVERAGE_METRICS,
  GovernorateMetric,
  TopicConfig,
} from "../lib/data/iraq-dashboard-data";
import { AllGovernoratesNeonDashboard } from "../components/dashboard/AllGovernoratesNeonDashboard";
import { SingleGovernorateNeonDashboard } from "../components/dashboard/SingleGovernorateNeonDashboard";
import { NeonComboChart } from "../components/dashboard/NeonComboChart";
import {
  Search,
  Moon,
  Sun,
  ArrowRight,
  Database,
  Layers,
  MapPin,
  ChevronDown,
  BarChart3,
  Sparkles,
  TrendingUp,
  CreditCard,
  Smartphone,
  Laptop,
  ShoppingBag,
  Building2,
  CheckCircle,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

export default function App() {
  const [currentMode, setCurrentMode] = useState<"all_governorates" | "single_governorate">("all_governorates");
  const [selectedTopic, setSelectedTopic] = useState<TopicConfig>(
    TOPICS.find((t) => t.id === "spending") || TOPICS[0]
  );
  const [selectedGov, setSelectedGov] = useState<GovernorateMetric>(FEDERAL_GOVERNORATES[0]); // Default: Baghdad
  const [lang, setLang] = useState<"en" | "ar">("ar"); // Arabic default as requested in screenshot, switchable to EN
  const [isDark, setIsDark] = useState<boolean>(true); // Dark mode default

  const isAr = lang === "ar";

  // Sorted list of governorates for ranked combo chart (descending order)
  const sortedGovs = useMemo(() => {
    return [...ALL_GOVERNORATES].sort((a, b) => {
      const valA = Number(a[selectedTopic.metricKey]) || 0;
      const valB = Number(b[selectedTopic.metricKey]) || 0;
      return valB - valA;
    });
  }, [selectedTopic]);

  // Top performing governorate for current topic
  const topGov = useMemo(() => {
    return sortedGovs[0] || ALL_GOVERNORATES[0];
  }, [sortedGovs]);

  useEffect(() => {
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [lang, isAr, isDark]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectModeAndScroll = (mode: "all_governorates" | "single_governorate") => {
    setCurrentMode(mode);
    scrollToSection("dashboard");
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${isDark ? "bg-[#050814] text-slate-100" : "bg-[#F8FAFC] text-slate-900"}`}>
      
      {/* ======================================================== */}
      {/* 1. TOP NAVIGATION BAR                                    */}
      {/* ======================================================== */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl border-b ${
        isDark ? "bg-[#060913]/90 border-white/10" : "bg-white/90 border-slate-200 shadow-sm"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Left: Official Logo (Image 1) */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center p-0.5 border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.35)] bg-black">
              <img
                src="/techlocation_logo.jpg"
                alt="TechLocation Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className={`text-lg font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                  Tech<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">Location</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-400 border border-blue-500/30 font-mono">
                  IRAQ
                </span>
              </div>
              <span className="text-[9px] font-semibold tracking-wider text-slate-400 uppercase">
                Digital Market Explorer
              </span>
            </div>
          </a>

          {/* Center Navigation Links (Exact names specified by user) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a
              href="#home"
              className={`transition-colors py-1 relative font-semibold ${
                isDark ? "text-white hover:text-cyan-400" : "text-slate-900 hover:text-blue-600"
              }`}
            >
              <span>{isAr ? "الرئيسية" : "Home"}</span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></span>
            </a>
            
            {/* 1. Data Sources (formerly About) */}
            <a
              href="#sources"
              className={`transition-colors py-1 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
            >
              {isAr ? "مصادر البيانات" : "Data Sources"}
            </a>

            {/* 2. Dashboard (formerly Data Sources) -> Map & Governorates */}
            <a
              href="#dashboard"
              className={`transition-colors py-1 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
            >
              {isAr ? "لوحة الخارطة" : "Dashboard"}
            </a>

            {/* 3. Charts (formerly Insights) -> Bar Charts */}
            <a
              href="#charts"
              className={`transition-colors py-1 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
            >
              {isAr ? "الرسوم البيانية" : "Charts"}
            </a>

            {/* 4. Strategic Insights (formerly Methodology) -> Strategic Analysis */}
            <a
              href="#insights"
              className={`transition-colors py-1 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
            >
              {isAr ? "التحليل الاستراتيجي" : "Strategic Insights"}
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Quick Search */}
            <a
              href="#dashboard"
              className={`p-2.5 rounded-xl transition-colors ${
                isDark ? "text-slate-400 hover:text-white hover:bg-white/5" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
              title="Search Governorates"
            >
              <Search className="w-4 h-4" />
            </a>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(isAr ? "en" : "ar")}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold font-mono transition-colors ${
                isDark
                  ? "border-white/10 hover:border-white/20 text-slate-300 bg-white/5"
                  : "border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50"
              }`}
            >
              {isAr ? "EN" : "عربي"}
            </button>

            {/* Theme Toggle (Light / Dark) */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg border transition-colors ${
                isDark
                  ? "border-white/10 hover:border-white/20 text-yellow-400 bg-white/5"
                  : "border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50"
              }`}
              title="Toggle Light / Dark Mode"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Direct Platform Jump Button */}
            <button
              onClick={() => scrollToSection("dashboard")}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] transition-all transform active:scale-95 cursor-pointer"
            >
              <span>{isAr ? "دخول المنصة" : "Enter Platform"}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>

        </div>
      </header>


      {/* ======================================================== */}
      {/* 2. HERO WELCOMING SECTION (Matching Image 2 background)  */}
      {/* ======================================================== */}
      <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-screen flex flex-col justify-between">
        
        {/* Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] -z-10"></div>
          <div className="absolute top-1/3 left-1/10 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[130px] -z-10"></div>
          <div className="absolute bottom-10 right-1/3 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[120px] -z-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-5 space-y-6 text-left rtl:text-right">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-[11px] font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>
                  {isAr ? "بيانات رسمية • رؤى حقيقية • عراق أكثر اتصالاً" : "OFFICIAL DATA • REAL INSIGHTS • A MORE CONNECTED IRAQ"}
                </span>
              </div>

              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                {isAr ? "مستقبل العراق" : "Iraq’s"} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                  {isAr ? "الرقمي" : "Digital Future"}
                </span> <br />
                {isAr ? "تحت المجهر" : "in Focus"}
              </h1>

              <p className={`text-base sm:text-lg leading-relaxed font-normal max-w-xl ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}>
                {isAr
                  ? "استكشف التحول الرقمي في العراق عبر البيانات الرسمية. رؤى تفاعلية حول الوصول للإنترنت، استخدام الأجهزة، المهارات الرقمية، والبنية التحتية عبر محافظات العراق الـ 18."
                  : "Explore Iraq’s digital transformation through official data. Interactive insights on internet access, device usage, digital skills and ICT infrastructure across all 18 governorates."}
              </p>

              {/* The 2 CTA Buttons Requested by User */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                
                {/* Button 1: All Governorates */}
                <button
                  onClick={() => handleSelectModeAndScroll("all_governorates")}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-[0_0_25px_rgba(79,70,229,0.45)] hover:shadow-[0_0_35px_rgba(79,70,229,0.65)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-cyan-300" />
                  <span>{isAr ? "كافة المحافظات (All Governorates)" : "All Governorates"}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>

                {/* Button 2: Single Governorate */}
                <button
                  onClick={() => handleSelectModeAndScroll("single_governorate")}
                  className={`inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all border cursor-pointer ${
                    isDark
                      ? "text-slate-200 bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20"
                      : "text-slate-700 bg-white hover:bg-slate-50 border-slate-200 shadow-sm"
                  }`}
                >
                  <Building2 className="w-4 h-4 text-purple-400" />
                  <span>{isAr ? "تحليل محافظة منفردة (Single Governorate)" : "Single Governorate"}</span>
                </button>

              </div>

            </div>

            {/* Hero Right Visual (Clean Image 2 Illuminated 3D Map) */}
            <div className="lg:col-span-7 relative flex items-center justify-center">
              <div className={`relative w-full max-w-[650px] aspect-[16/11] rounded-3xl overflow-hidden p-3 shadow-2xl border transition-all ${
                isDark
                  ? "bg-[#0A0E1F]/70 border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.2)] backdrop-blur-xl"
                  : "bg-white border-slate-200 shadow-xl"
              }`}>
                
                {/* Exact Clean 3D Iraq Map Asset from Image 2 */}
                <img
                  src="/hero_iraq_bg.jpg"
                  alt="Iraq Digital Connectivity Network Map"
                  className="w-full h-full object-cover rounded-2xl"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#050814]/70 via-transparent to-transparent pointer-events-none"></div>

                {/* Floating Telemetric Glass Badges */}
                <div className="absolute top-[48%] left-[54%] transform -translate-x-1/2 -translate-y-1/2 px-3 py-2 rounded-xl flex items-center gap-2.5 bg-[#0D152A]/90 backdrop-blur-md border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.4)] animate-pulse">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                  <div>
                    <div className="text-[10px] font-bold text-cyan-300">Baghdad (العاصمة)</div>
                    <div className="text-xs font-black text-white font-mono">FinTech: 89.7% • 500k IQD</div>
                  </div>
                </div>

                <div className="absolute top-[16%] right-[22%] px-2.5 py-1.5 rounded-lg bg-[#0D152A]/85 backdrop-blur-md border border-indigo-400/40 text-right">
                  <div className="text-[9px] text-slate-300 font-medium">Tech Talent (أربيل)</div>
                  <div className="text-[11px] font-extrabold text-indigo-300 font-mono">48.0% Computers</div>
                </div>

                <div className="absolute bottom-[20%] right-[14%] px-2.5 py-1.5 rounded-lg bg-[#0D152A]/85 backdrop-blur-md border border-emerald-400/40">
                  <div className="text-[9px] text-slate-300 font-medium">Home Net (البصرة)</div>
                  <div className="text-[11px] font-extrabold text-emerald-300 font-mono">98.1% Connected</div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Bottom Stats Floating Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12">
          <div className={`rounded-2xl p-4 sm:p-6 border shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse ${
            isDark
              ? "bg-[#0B1024]/80 border-white/10 divide-white/5 backdrop-blur-xl"
              : "bg-white border-slate-200 divide-slate-100 shadow-md"
          }`}>
            
            {/* Stat 1: 2 Official Sources -> Links to #sources */}
            <a href="#sources" className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-xl transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                <Database className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className={`text-xl sm:text-2xl font-black font-mono ${isDark ? "text-white" : "text-slate-900"}`}>2</div>
                <div className={`text-xs font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                  {isAr ? "مصادر رسمية معتمدة" : "Official Sources"}
                </div>
                <div className="text-[10px] text-slate-400">COSIT 2022 & Telecom 2024</div>
              </div>
            </a>

            {/* Stat 2: 50+ Indicators -> Links to #charts */}
            <a href="#charts" className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-xl transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <div className={`text-xl sm:text-2xl font-black font-mono ${isDark ? "text-white" : "text-slate-900"}`}>50+</div>
                <div className={`text-xs font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                  {isAr ? "مؤشرات وجداول تفصيلية" : "Indicators & Tables"}
                </div>
                <div className="text-[10px] text-slate-400">Across 6 Digital Sectors</div>
              </div>
            </a>

            {/* Stat 3: 18 Governorates -> Links to #dashboard */}
            <a href="#dashboard" className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-xl transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <div className={`text-xl sm:text-2xl font-black font-mono ${isDark ? "text-white" : "text-slate-900"}`}>18</div>
                <div className={`text-xs font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                  {isAr ? "محافظة عراقية" : "Governorates"}
                </div>
                <div className="text-[10px] text-slate-400">Full National Coverage</div>
              </div>
            </a>

            {/* Stat 4: Strategic Insights -> Links to #insights */}
            <a href="#insights" className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-xl transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className={`text-xl sm:text-2xl font-black font-mono ${isDark ? "text-white" : "text-slate-900"}`}>100%</div>
                <div className={`text-xs font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                  {isAr ? "رؤى استثمارية موثقة" : "Strategic Insights"}
                </div>
                <div className="text-[10px] text-slate-400">For a More Connected Iraq</div>
              </div>
            </a>

          </div>

          <div className="flex flex-col items-center justify-center mt-8 text-slate-400 text-xs font-bold tracking-widest gap-2">
            <span className="uppercase tracking-widest text-[10px] text-slate-500">
              {isAr ? "انزل لاستكشاف المنصة" : "SCROLL TO EXPLORE"}
            </span>
            <a href="#dashboard" className="animate-bounce p-1 rounded-full text-slate-400 hover:text-cyan-400">
              <ChevronDown className="w-5 h-5" />
            </a>
          </div>
        </div>

      </section>


      {/* ======================================================== */}
      {/* 3. DASHBOARD SECTION (#dashboard Anchor)                 */}
      {/* ======================================================== */}
      <section id="dashboard" className={`py-20 border-t transition-colors ${
        isDark ? "border-white/5 bg-[#060914]" : "border-slate-200 bg-white"
      }`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-cyan-400 uppercase tracking-wider mb-1">
                <span>📍 {isAr ? "واجهة خارطة العراق والمحافظات" : "Iraq Interactive Map & Governorates"}</span>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                {isAr ? "مستكشف السوق الرقمي والمحافظات العراقية" : "Iraq Digital Market Explorer"}
              </h2>
            </div>

            {/* Mode Switcher Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentMode("all_governorates")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentMode === "all_governorates"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                    : isDark ? "bg-white/5 text-slate-400 hover:text-white" : "bg-slate-100 text-slate-600 hover:text-slate-900"
                }`}
              >
                {isAr ? "مقارنة كافة المحافظات (All Governorates)" : "All Governorates"}
              </button>
              <button
                onClick={() => setCurrentMode("single_governorate")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentMode === "single_governorate"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                    : isDark ? "bg-white/5 text-slate-400 hover:text-white" : "bg-slate-100 text-slate-600 hover:text-slate-900"
                }`}
              >
                {isAr ? `تحليل: ${selectedGov.nameAr} (Single)` : `Focus: ${selectedGov.nameEn}`}
              </button>
            </div>
          </div>

          {/* Sector Topics Navigation Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {TOPICS.map((topic) => {
              const isSelected = selectedTopic.id === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border cursor-pointer ${
                    isSelected
                      ? "border-blue-500/60 bg-blue-500/20 text-cyan-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                      : isDark
                      ? "border-white/5 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
                      : "border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-900"
                  }`}
                >
                  <span>{topic.icon}</span>
                  <span>{isAr ? topic.titleAr : topic.titleEn}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Display: All Governorates vs Single Governorate */}
          {currentMode === "all_governorates" ? (
            <AllGovernoratesNeonDashboard
              selectedTopic={selectedTopic}
              onSelectGovernorate={(gov) => {
                setSelectedGov(gov);
                setCurrentMode("single_governorate");
              }}
              lang={lang}
            />
          ) : (
            <SingleGovernorateNeonDashboard
              selectedGov={selectedGov}
              selectedTopic={selectedTopic}
              onSelectTopic={setSelectedTopic}
              onSelectGov={setSelectedGov}
              onBackToAll={() => setCurrentMode("all_governorates")}
              lang={lang}
            />
          )}

        </div>
      </section>


      {/* ======================================================== */}
      {/* 4. CHARTS SECTION (#charts Anchor)                       */}
      {/* ======================================================== */}
      <section id="charts" className={`py-20 border-t ${
        isDark ? "border-white/5 bg-[#050814]" : "border-slate-200 bg-slate-50"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                {isAr ? "مقارنات القطاعات والأعمدة" : "Comparative Analysis"}
              </span>
              <h2 className={`text-3xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                {isAr ? `الرسوم البيانية لمؤشر: (${selectedTopic.titleAr})` : `Governorates Comparison: (${selectedTopic.titleEn})`}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                {isAr
                  ? "مقارنة نسب وتوزيع المحافظات الـ 18 وفق الترتيب التنازلي والمعدل العام"
                  : "Ranked distribution across all 18 governorates with spline trend benchmark"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">
                {isAr ? "المعدل العام للعراق:" : "National Benchmark:"}
              </span>
              <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-cyan-300 font-mono font-bold text-xs border border-blue-500/30">
                {NATIONAL_AVERAGE_METRICS[selectedTopic.metricKey as keyof typeof NATIONAL_AVERAGE_METRICS] || 28.9}
                {selectedTopic.unit}
              </span>
            </div>
          </div>

          {/* Indicator Topic Switcher Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {TOPICS.map((topic) => {
              const isSelected = selectedTopic.id === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border cursor-pointer ${
                    isSelected
                      ? "border-blue-500/60 bg-blue-500/20 text-cyan-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                      : isDark
                      ? "border-white/5 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
                      : "border-slate-200 bg-white text-slate-700 hover:text-slate-900 shadow-sm"
                  }`}
                >
                  <span>{topic.icon}</span>
                  <span>{isAr ? topic.titleAr : topic.titleEn}</span>
                </button>
              );
            })}
          </div>

          {/* EXACT COMBO BAR + SPLINE TREND CHART (User Uploaded Mockup) */}
          <div className="w-full">
            <NeonComboChart
              governorates={sortedGovs}
              metricKey={selectedTopic.metricKey}
              unit={selectedTopic.unit}
              neonColor={selectedTopic.neonColor}
              neonGlow={selectedTopic.neonGlow}
              onSelectGov={(gov) => {
                setSelectedGov(gov);
                setCurrentMode("single_governorate");
                scrollToSection("dashboard");
              }}
              lang={lang}
            />
          </div>

          {/* Detailed Indicator Ranking Cards (18 Governorates) */}
          <div className="pt-4">
            <h3 className={`text-sm font-bold mb-4 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              {isAr ? "تفاصيل ترتيب المحافظات الـ 18 ومقارنتها بالمعدل الوطني:" : "Detailed Governorates Ranking Breakdown:"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedGovs.map((gov, idx) => {
                const val = gov[selectedTopic.metricKey] as number;
                const natAvg = (NATIONAL_AVERAGE_METRICS[selectedTopic.metricKey as keyof typeof NATIONAL_AVERAGE_METRICS] as number) || 28.9;
                const isAbove = val >= natAvg;

                return (
                  <div
                    key={gov.id}
                    onClick={() => {
                      setSelectedGov(gov);
                      setCurrentMode("single_governorate");
                      scrollToSection("dashboard");
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer hover:-translate-y-1 ${
                      isDark
                        ? "bg-[#0B1024]/80 border-white/10 hover:border-cyan-500/50"
                        : "bg-white border-slate-200 shadow-sm hover:border-blue-400"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-500/20 text-cyan-300 flex items-center justify-center font-bold text-[10px]">
                          {idx + 1}
                        </span>
                        <span className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                          {isAr ? gov.nameAr : gov.nameEn}
                        </span>
                      </div>
                      <span className="font-mono font-black text-cyan-400 text-sm">
                        {val}{selectedTopic.unit}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/5 h-2 rounded-full mt-2.5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                        style={{ width: `${Math.min(100, (val / (selectedTopic.unit === "%" ? 100 : 500)) * 100)}%` }}
                      ></div>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
                      <span className={isAbove ? "text-emerald-400" : "text-amber-400"}>
                        {isAbove ? "▲ أعلى من المعدل" : "▼ أقل من المعدل"}
                      </span>
                      <span className="text-cyan-400 hover:underline">
                        {isAr ? "تحليل المحافظة ←" : "Deep Dive →"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>


      {/* ======================================================== */}
      {/* 5. STRATEGIC INSIGHTS (#insights Anchor)                 */}
      {/* ======================================================== */}
      <section id="insights" className={`py-20 border-t ${
        isDark ? "border-white/5 bg-[#060914]" : "border-slate-200 bg-white"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                {isAr ? "التحليل الاستراتيجي المعتمد" : "Grounded Strategic Intelligence"}
              </span>
              <h2 className={`text-3xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                {isAr ? "التحليل الاستراتيجي للقطاعات والمحافظات" : "Strategic Market Interpretation"}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                {isAr
                  ? "قراءة تحليلية استراتيجية لسلوك السوق العراقي وفرص وتحديات رواد الأعمال"
                  : "Comprehensive market interpretation, commercial opportunities and operational hurdles"}
              </p>
            </div>

            {/* Quick Sector Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-xl scrollbar-none">
              {TOPICS.map((topic) => {
                const isSelected = selectedTopic.id === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border cursor-pointer ${
                      isSelected
                        ? "border-cyan-500/60 bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                        : isDark
                        ? "border-white/5 bg-white/5 text-slate-300 hover:text-white"
                        : "border-slate-200 bg-slate-100 text-slate-700"
                    }`}
                  >
                    <span>{topic.icon}</span>
                    <span>{isAr ? topic.titleAr : topic.titleEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 1. EXACT OLD STRATEGIC ANALYSIS DISPLAY FOR THE SECTOR (Matching User Screenshot media_1791273205055.png) */}
          <div className="rounded-2xl bg-gradient-to-br from-[#10182D] via-[#0D1220] to-[#0A0E18] border border-cyan-500/30 p-6 shadow-[0_0_25px_rgba(6,182,212,0.15)] space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                <h3 className="text-base font-bold text-white tracking-wide">
                  {isAr
                    ? `التحليل الاستراتيجي لقطاع: (${selectedTopic.titleAr})`
                    : `Strategic Market Analysis: (${selectedTopic.titleEn})`}
                </h3>
              </div>
              <span className="text-[11px] text-cyan-400 font-mono">
                {isAr ? "مبني على أرقام المسح الرسمي" : "Grounded in Official COSIT Findings"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-300">
              {/* Box 1: Commercial & Investment Opportunities */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-emerald-400 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isAr ? "الفرص التجارية والاستثمارية:" : "Commercial & Investment Opportunities:"}</span>
                </div>
                <p className="leading-relaxed">
                  {isAr
                    ? `تتصدر محافظة ${topGov.nameAr} في مؤشر ${selectedTopic.titleAr} بنسبة ${topGov[selectedTopic.metricKey]}${selectedTopic.unit}، مما يجعلها السوق الأول للمشاريع المرتبطة بهذا السلوك وبإنفاق تكنولوجي يبلغ ${topGov.telecomSpending} ألف دينار شهرياً.`
                    : `Leading hub ${topGov.nameEn} commands ${topGov[selectedTopic.metricKey]}${selectedTopic.unit} in ${selectedTopic.titleEn}, making it the prime launchpad with ${topGov.telecomSpending}K IQD monthly tech spend.`}
                </p>
              </div>

              {/* Box 2: Field Bottlenecks & Operational Advice */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-amber-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{isAr ? "التحديات والفجوات الميدانية:" : "Field Bottlenecks & Operational Advice:"}</span>
                </div>
                <p className="leading-relaxed">
                  {isAr
                    ? `تظهر البيانات تبايناً بين المحافظات الكبرى والأطراف؛ يتطلب التوسع الناجح توفير تجربة استخدام خفيفة وسريعة تدعم الهواتف المحمولة وخيارات دفع هجينة.`
                    : `Founders scaling beyond top hubs must support mobile-first lightweight interfaces and hybrid payment gateways.`}
                </p>
              </div>
            </div>
          </div>

          {/* 2. GOVERNORATE-LEVEL STRATEGIC ANALYSIS CARD (Same Classic Layout) */}
          <div className="rounded-2xl bg-gradient-to-br from-[#10182D] via-[#0D1220] to-[#0A0E18] border border-purple-500/30 p-6 shadow-[0_0_25px_rgba(168,85,247,0.15)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                <h3 className="text-base font-bold text-white">
                  {selectedGov.aiTitle || (isAr ? `ماذا تعني هذه البيانات لمشروعك في ${selectedGov.nameAr}؟` : `Strategic Synthesis: ${selectedGov.nameEn}`)}
                </h3>
              </div>
              
              {/* Quick Governorates Selector */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-xl scrollbar-none">
                {ALL_GOVERNORATES.map((g) => {
                  const isCur = selectedGov.id === g.id;
                  return (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGov(g)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        isCur
                          ? "bg-purple-600 text-white shadow-md shadow-purple-500/30 font-bold"
                          : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {isAr ? g.nameAr : g.nameEn}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Executive Summary Paragraph */}
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs sm:text-sm leading-relaxed text-slate-200">
              <p>{selectedGov.aiSummary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-300">
              {/* Box 1: Recommended Business Models */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-cyan-400 text-sm">
                  <Lightbulb className="w-4 h-4" />
                  <span>{isAr ? "أبرز نماذج المشاريع التقنية الموصى بها:" : "Recommended Startup Models:"}</span>
                </div>
                <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                  {selectedGov.recommendedModels && selectedGov.recommendedModels.length > 0 ? (
                    selectedGov.recommendedModels.map((m, i) => (
                      <li key={i} className="text-slate-200 font-medium">
                        {m}
                      </li>
                    ))
                  ) : (
                    <li>تطبيقات التوصيل والخدمات الاستهلاكية المباشرة عبر الموبايل</li>
                  )}
                </ul>
              </div>

              {/* Box 2: Bottlenecks & Operational Strategy */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-amber-400 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{isAr ? "التحدي التشغيلي وكيفية التغلب عليه:" : "Operational Friction & Strategy:"}</span>
                </div>
                <p className="leading-relaxed text-slate-300">
                  {selectedGov.strategicAdvice ||
                    (isAr
                      ? "الاعتماد العالي على الكاش يتطلب توفير الدفع عند الاستلام مع تقديم حوافز للتحول نحو الدفع الإلكتروني."
                      : "High cash dependency necessitates Cash-on-Delivery with discounts for digital wallet transactions.")}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ======================================================== */}
      {/* 6. DATA SOURCES SECTION (#sources Anchor)                */}
      {/* ======================================================== */}
      <section id="sources" className={`py-20 border-t ${
        isDark ? "border-white/5 bg-[#070B18]" : "border-slate-200 bg-slate-50"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">
              {isAr ? "الشفافية والمصادر الرسمية" : "Ground Truth Transparency"}
            </span>
            <h2 className={`text-3xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
              {isAr ? "مصادر البيانات المعتمدة في المنصة" : "Official Data Publications"}
            </h2>
            <p className="text-sm text-slate-400">
              {isAr
                ? "كافة الأرقام مستخرجة وموثقة صفحة بصفحة من المسوح الإحصائية الحكومية بدون أي تزييف أو تخمين"
                : "All metrics are extracted page-by-page from verified Iraqi government census publications"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Source 1: COSIT 2022 */}
            <div className={`p-6 rounded-2xl border ${
              isDark ? "bg-[#0D152A]/80 border-white/10" : "bg-white border-slate-200 shadow-sm"
            } space-y-4`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-2xl">
                  📄
                </div>
                <div>
                  <h3 className={`font-black text-lg ${isDark ? "text-white" : "text-slate-900"}`}>
                    {isAr ? "مسح استخدام تكنولوجيا المعلومات للأسرة 2022" : "COSIT Household ICT Survey 2022"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isAr ? "الجهاز المركزي للإحصاء (COSIT) • 134 صفحة معتمدة" : "Central Statistical Organization • 134 Pages"}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isAr
                  ? "المسح الوطني الأكبر في العراق، يغطي 18 محافظة بنسب استخدام الهواتف المحمولة والذكية (جدول 1-4، 1-5)، الحواسيب (جدول 1-10)، الشراء الإلكتروني (جدول 1-18)، والدفع عند الاستلام (جدول 1-19)."
                  : "National representative survey covering all governorates for mobile usage (Table 1-4), smartphones (Table 1-5), PCs (Table 1-10), online shopping (Table 1-18), and cash on delivery (Table 1-19)."}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-blue-500/10 text-cyan-300 border border-blue-500/20">جدول 1-4 (ص 44)</span>
                <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-blue-500/10 text-cyan-300 border border-blue-500/20">جدول 1-5 (ص 46)</span>
                <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-blue-500/10 text-cyan-300 border border-blue-500/20">جدول 1-10 (ص 54)</span>
                <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-blue-500/10 text-cyan-300 border border-blue-500/20">جدول 2-5 (ص 112)</span>
              </div>
            </div>

            {/* Source 2: Telecom 2024 */}
            <div className={`p-6 rounded-2xl border ${
              isDark ? "bg-[#0D152A]/80 border-white/10" : "bg-white border-slate-200 shadow-sm"
            } space-y-4`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl">
                  📡
                </div>
                <div>
                  <h3 className={`font-black text-lg ${isDark ? "text-white" : "text-slate-900"}`}>
                    {isAr ? "التقرير السنوي لإحصاءات الاتصالات والبريد 2024" : "Ministry of Communications Telecom 2024"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isAr ? "وزارة الاتصالات وهيئة الإحصاء • 33 صفحة" : "Ministry of Communications • 33 Pages"}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isAr
                  ? "أحدث إحصاءات البنية التحتية البريدية والاتصالية في المحافظات، بما في ذلك عدد مكاتب الدفع الذكي والكي كارد (جدول 14 ص 24)، ومشتركي إنترنت الهواتف النقالة (جدول 8 ص 17)."
                  : "Provides latest infrastructure data: smart card post offices (Table 14), mobile broadband users (Table 8), and optical fiber FTTH subscriptions."}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">جدول 14 (ص 24)</span>
                <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">جدول 8 (ص 17)</span>
                <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">جدول 16 (ص 26)</span>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ======================================================== */}
      {/* 7. FOOTER                                                */}
      {/* ======================================================== */}
      <footer className={`py-10 border-t ${
        isDark ? "border-white/10 bg-[#060913]" : "border-slate-200 bg-white"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <img src="/techlocation_logo.jpg" className="w-8 h-8 rounded-lg object-cover" />
            <span>© 2026 TechLocation — Iraq Digital Market Explorer. All rights reserved.</span>
          </div>
          <div>
            <span>
              {isAr
                ? "مستند رسمياً لبيانات هيئة الإحصاء (COSIT) والتقرير السنوي للاتصالات 2024"
                : "Officially grounded in COSIT Census & Ministry of Communications 2024 Telemetry"}
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
