"use client";

import React, { useState, useEffect } from "react";
import {
  TOPICS,
  FEDERAL_GOVERNORATES,
  GovernorateMetric,
  TopicConfig,
} from "../../lib/data/iraq-dashboard-data";
import { AllGovernoratesNeonDashboard } from "../../components/dashboard/AllGovernoratesNeonDashboard";
import { SingleGovernorateNeonDashboard } from "../../components/dashboard/SingleGovernorateNeonDashboard";
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
} from "lucide-react";

export default function PreviewPage() {
  const [currentMode, setCurrentMode] = useState<"all_governorates" | "single_governorate">("all_governorates");
  const [selectedTopic, setSelectedTopic] = useState<TopicConfig>(TOPICS[0]);
  const [selectedGov, setSelectedGov] = useState<GovernorateMetric>(FEDERAL_GOVERNORATES[0]);
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [isDark, setIsDark] = useState<boolean>(true);

  const isAr = lang === "ar";

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

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${isDark ? "bg-[#050814] text-slate-100" : "bg-[#F8FAFC] text-slate-900"}`}>
      
      {/* 1. TOP NAVIGATION BAR */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl border-b ${
        isDark ? "bg-[#060913]/85 border-white/10" : "bg-white/85 border-slate-200 shadow-sm"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Left: Official TechLocation Logo */}
          <a href="#home" className="flex items-center group">
            <img
              src="/techlocation_header_logo.png"
              alt="TechLocation Iraq - Digital Market Explorer"
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </a>

          {/* Center Navigation Links */}
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
            <a
              href="#about"
              className={`transition-colors py-1 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
            >
              {isAr ? "عن المشروع" : "About"}
            </a>
            <a
              href="#sources"
              className={`transition-colors py-1 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
            >
              {isAr ? "مصادر البيانات" : "Data Sources"}
            </a>
            <a
              href="#insights"
              className={`transition-colors py-1 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
            >
              {isAr ? "الرؤى والتحليلات" : "Insights"}
            </a>
            <a
              href="#methodology"
              className={`transition-colors py-1 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
            >
              {isAr ? "المنهجية" : "Methodology"}
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <a
              href="#platform"
              className={`p-2.5 rounded-xl transition-colors ${
                isDark ? "text-slate-400 hover:text-white hover:bg-white/5" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
              title="Search"
            >
              <Search className="w-4 h-4" />
            </a>

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

            <a
              href="#platform"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] transition-all transform active:scale-95"
            >
              <span>{isAr ? "دخول المنصة" : "Enter Platform"}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </a>
          </div>

        </div>
      </header>


      {/* 2. HERO SECTION */}
      <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-screen flex flex-col justify-between">
        
        {/* Glows */}
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

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#platform"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-[0_0_25px_rgba(79,70,229,0.45)] hover:shadow-[0_0_35px_rgba(79,70,229,0.65)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>{isAr ? "استكشف المنصة" : "Explore the Platform"}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </a>

                <a
                  href="#about"
                  className={`inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all border ${
                    isDark
                      ? "text-slate-200 bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20"
                      : "text-slate-700 bg-white hover:bg-slate-50 border-slate-200 shadow-sm"
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">
                    ▶
                  </span>
                  <span>{isAr ? "نبذة عن المشروع" : "Watch Overview"}</span>
                </a>
              </div>

            </div>

            {/* Hero Right Visual */}
            <div className="lg:col-span-7 relative flex items-center justify-center">
              <div className={`relative w-full max-w-[640px] aspect-[16/11] rounded-3xl overflow-hidden p-3 shadow-2xl border transition-all ${
                isDark
                  ? "bg-[#0A0E1F]/70 border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.15)] backdrop-blur-xl"
                  : "bg-white border-slate-200 shadow-xl"
              }`}>
                
                <img
                  src="/hero_iraq_map.jpg"
                  alt="Iraq Digital Connectivity Map"
                  className="w-full h-full object-cover rounded-2xl"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#050814]/70 via-transparent to-transparent pointer-events-none"></div>

                {/* Telemetric Badges */}
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

            <a href="#platform" className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-xl transition-colors group">
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

            <a href="#insights" className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-xl transition-colors group">
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

            <a href="#methodology" className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-xl transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className={`text-xl sm:text-2xl font-black font-mono ${isDark ? "text-white" : "text-slate-900"}`}>100%</div>
                <div className={`text-xs font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                  {isAr ? "رؤى استثمارية موثقة" : "Real Insights"}
                </div>
                <div className="text-[10px] text-slate-400">For a More Connected Iraq</div>
              </div>
            </a>

          </div>

          <div className="flex flex-col items-center justify-center mt-8 text-slate-400 text-xs font-bold tracking-widest gap-2">
            <span className="uppercase tracking-widest text-[10px] text-slate-500">
              {isAr ? "انزل لاستكشاف المنصة" : "SCROLL TO EXPLORE"}
            </span>
            <a href="#platform" className="animate-bounce p-1 rounded-full text-slate-400 hover:text-cyan-400">
              <ChevronDown className="w-5 h-5" />
            </a>
          </div>
        </div>

      </section>


      {/* 3. PLATFORM EXPLORER */}
      <section id="platform" className={`py-20 border-t transition-colors ${
        isDark ? "border-white/5 bg-[#060914]" : "border-slate-200 bg-white"
      }`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-cyan-400 uppercase tracking-wider mb-1">
                <span>📍 {isAr ? "لوحة الاستكشاف التفاعلية" : "Interactive Platform Engine"}</span>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                {isAr ? "مستكشف السوق الرقمي والمحافظات العراقية" : "Iraq Digital Market Explorer"}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentMode("all_governorates")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentMode === "all_governorates"
                    ? "bg-blue-600 text-white shadow-md"
                    : isDark ? "bg-white/5 text-slate-400 hover:text-white" : "bg-slate-100 text-slate-600 hover:text-slate-900"
                }`}
              >
                {isAr ? "مقارنة كافة المحافظات" : "All Governorates"}
              </button>
              <button
                onClick={() => setCurrentMode("single_governorate")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentMode === "single_governorate"
                    ? "bg-blue-600 text-white shadow-md"
                    : isDark ? "bg-white/5 text-slate-400 hover:text-white" : "bg-slate-100 text-slate-600 hover:text-slate-900"
                }`}
              >
                {isAr ? `تحليل: ${selectedGov.nameAr}` : `Focus: ${selectedGov.nameEn}`}
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
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
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

          {/* Dynamic Mode: All Governorates vs Single Governorate */}
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


      {/* 4. DATA SOURCES SECTION */}
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
                    {isAr ? "الجهاز المركزي للإحصاء (COSIT) • 134 صفحة" : "Central Statistical Organization • 134 Pages"}
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


      {/* 5. METHODOLOGY SECTION */}
      <section id="methodology" className={`py-20 border-t ${
        isDark ? "border-white/5 bg-[#050814]" : "border-slate-200 bg-white"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              {isAr ? "المنهجية العلمية والتحليلية" : "Scientific Scoring Engine"}
            </span>
            <h2 className={`text-3xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
              {isAr ? "معادلات حساب المؤشرات التقييمية" : "How Indicators Are Calculated"}
            </h2>
            <p className="text-sm text-slate-400">
              {isAr
                ? "كيف نحول الأرقام الحكومية الصماء إلى مؤشرات جاهزية وفرص استثمارية واضحة"
                : "Transparent mathematical weighting connecting official statistics to business viability"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className={`p-6 rounded-2xl border ${
              isDark ? "bg-[#0D152A]/80 border-white/10" : "bg-slate-50 border-slate-200"
            } space-y-3`}>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-cyan-400">
                  {isAr ? "مؤشر فرصة الدفع الإلكتروني والفنتك" : "FinTech & Payments Score"}
                </h3>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                  0 - 100
                </span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 font-mono text-xs text-slate-300 border border-white/5">
                FinTech Score = (40% × فرصة النمو) + (30% × الإنفاق) + (15% × مكاتب الدفع) + (15% × الشراء أونلاين)
              </div>
              <p className="text-xs text-slate-400">
                {isAr
                  ? "تزن المعادلة السيولة النقدية للأسر، وشبكة مكاتب الكي كارد والبريد، وسلوك الشراء عبر الإنترنت لتقييم أي محافظة تحقق أسرع عائد استثماري لشركات المحافظ والدفع."
                  : "Weighs purchasing power, smart card cash-in points, and e-commerce penetration to score payment gateway viability."}
              </p>
            </div>

            <div className={`p-6 rounded-2xl border ${
              isDark ? "bg-[#0D152A]/80 border-white/10" : "bg-slate-50 border-slate-200"
            } space-y-3`}>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-emerald-400">
                  {isAr ? "مؤشر الجاهزية الرقمية للمجتمع" : "Digital Readiness Index"}
                </h3>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  0 - 100
                </span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 font-mono text-xs text-slate-300 border border-white/5">
                Readiness = (30% × إنترنت المنازل) + (25% × الهواتف الذكية) + (25% × الحواسيب) + (20% × المهارات)
              </div>
              <p className="text-xs text-slate-400">
                {isAr
                  ? "تقيس الجاهزية الشاملة للمجتمع في كل محافظة لاستيعاب الخدمات والتطبيقات الرقمية الحديثة."
                  : "Evaluates infrastructure connectivity and human device literacy across governorates."}
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* 6. ABOUT SECTION */}
      <section id="about" className={`py-20 border-t ${
        isDark ? "border-white/5 bg-[#070B18]" : "border-slate-200 bg-slate-50"
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto p-1 border border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.3)] bg-black">
            <img src="/techlocation_logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h2 className={`text-3xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
            {isAr ? "عن مشروع TechLocation" : "About TechLocation"}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {isAr
              ? "منصة استخبارات سوقية وجغرافية تم بناؤها لسد فجوة اتخاذ القرارات في قطاع التكنولوجيا العراقي. نحول أكثر من 167 صفحة من الإحصاءات الرسمية لوزارة الاتصالات والجهاز المركزي للإحصاء إلى دليل عملي يرشد رواد الأعمال والمستثمرين لأفضل محافظة لكل فكرة مشروع."
              : "TechLocation is a location-intelligence platform bridging the decision-making gap for Iraq’s tech ecosystem. It transforms over 167 pages of official government census telemetry into an actionable strategic guide for founders, investors, and policymakers."}
          </p>
          <div className="pt-2">
            <a
              href="#platform"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
            >
              <span>{isAr ? "استكشف بيانات محافظتك الآن" : "Explore Governorate Data Now"}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </a>
          </div>
        </div>
      </section>


      {/* 7. FOOTER */}
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
