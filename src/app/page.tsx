"use client";

import React, { useState, useEffect } from "react";
import { NeonHeader } from "../components/dashboard/NeonHeader";
import { AllGovernoratesNeonDashboard } from "../components/dashboard/AllGovernoratesNeonDashboard";
import { SingleGovernorateNeonDashboard } from "../components/dashboard/SingleGovernorateNeonDashboard";
import {
  TOPICS,
  FEDERAL_GOVERNORATES,
  GovernorateMetric,
  TopicConfig,
} from "../lib/data/iraq-dashboard-data";
import {
  ArrowRight,
  Database,
  Layers,
  MapPin,
  ChevronDown,
  BarChart3,
  Building2,
} from "lucide-react";

export default function App() {
  const [currentMode, setCurrentMode] = useState<"all_governorates" | "single_governorate">("all_governorates");
  const [allGovViewType, setAllGovViewType] = useState<"map" | "chart">("map");
  const [activeSection, setActiveSection] = useState<"hero" | "map" | "chart" | "insights" | "sources">("hero");
  const [selectedTopic, setSelectedTopic] = useState<TopicConfig>(TOPICS[0]); // Default to "الدفع الإلكتروني والتحول المالي"
  const [selectedGov, setSelectedGov] = useState<GovernorateMetric>(FEDERAL_GOVERNORATES[0]); // Default to Baghdad
  const [lang, setLang] = useState<"ar" | "en">("ar"); // Arabic by default

  const isAr = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.classList.add("dark");
  }, [lang, isAr]);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#charts") {
        setAllGovViewType("chart");
        setActiveSection("chart");
        setCurrentMode("all_governorates");
      } else if (window.location.hash === "#map" || window.location.hash === "#dashboard") {
        setAllGovViewType("map");
        setActiveSection("map");
      } else if (window.location.hash === "#insights") {
        setActiveSection("insights");
      } else if (window.location.hash === "#sources") {
        setActiveSection("sources");
      } else if (window.location.hash === "#hero") {
        setActiveSection("hero");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const dashEl = document.getElementById("dashboard");
      const insightsEl = document.getElementById("insights");
      const sourcesEl = document.getElementById("sources");

      const dashTop = dashEl ? dashEl.offsetTop - 150 : 800;
      const insightsTop = insightsEl ? insightsEl.offsetTop - 150 : 2000;
      const sourcesTop = sourcesEl ? sourcesEl.offsetTop - 150 : 3000;

      if (scrollY >= sourcesTop) {
        setActiveSection("sources");
      } else if (scrollY >= insightsTop) {
        setActiveSection("insights");
      } else if (scrollY >= dashTop) {
        setActiveSection(allGovViewType === "chart" ? "chart" : "map");
      } else {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allGovViewType]);

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

  const handleSelectViewAndScroll = (view: "map" | "chart") => {
    setAllGovViewType(view);
    setActiveSection(view);
    setCurrentMode("all_governorates");
    scrollToSection("dashboard");
  };

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-[#070A12] text-slate-100 selection:bg-cyan-500 selection:text-black font-sans pb-16">
      
      {/* ======================================================== */}
      {/* 1. TOP NAVIGATION BAR (With user's official logo)         */}
      {/* ======================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#070A12]/90 border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Left: Official Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center p-0.5 border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.35)] bg-[#070A12]">
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

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {/* 1. Home */}
            <button
              onClick={() => {
                setActiveSection("hero");
                scrollToSection("hero");
              }}
              className={`transition-colors py-1 cursor-pointer relative font-medium ${
                activeSection === "hero"
                  ? "text-cyan-400 font-bold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <span>{isAr ? "الرئيسية" : "Home"}</span>
              {activeSection === "hero" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
              )}
            </button>
            
            {/* 2. Map View */}
            <button
              onClick={() => handleSelectViewAndScroll("map")}
              className={`transition-colors py-1 cursor-pointer font-medium relative ${
                activeSection === "map"
                  ? "text-cyan-400 font-bold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <span>{isAr ? "الخريطة" : "Map"}</span>
              {activeSection === "map" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
              )}
            </button>

            {/* 3. Charts -> Combo Bar Chart */}
            <button
              onClick={() => handleSelectViewAndScroll("chart")}
              className={`transition-colors py-1 cursor-pointer font-medium relative ${
                activeSection === "chart"
                  ? "text-cyan-400 font-bold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <span>{isAr ? "الرسوم البيانية" : "Charts"}</span>
              {activeSection === "chart" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
              )}
            </button>

            {/* 4. Strategic Insights -> Market Interpretation */}
            <button
              onClick={() => {
                setActiveSection("insights");
                scrollToSection("insights");
              }}
              className={`transition-colors py-1 cursor-pointer font-medium relative ${
                activeSection === "insights"
                  ? "text-cyan-400 font-bold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <span>{isAr ? "التحليل الاستراتيجي" : "Strategic Insights"}</span>
              {activeSection === "insights" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
              )}
            </button>

            {/* 5. Data Sources */}
            <button
              onClick={() => {
                setActiveSection("sources");
                scrollToSection("sources");
              }}
              className={`transition-colors py-1 cursor-pointer relative font-medium ${
                activeSection === "sources"
                  ? "text-cyan-400 font-bold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <span>{isAr ? "مصادر البيانات" : "Data Sources"}</span>
              {activeSection === "sources" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
              )}
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(isAr ? "en" : "ar")}
              className="px-3 py-1.5 rounded-lg border border-white/15 hover:border-cyan-400/50 text-xs font-bold font-mono transition-colors text-slate-300 bg-white/5 cursor-pointer"
            >
              {isAr ? "EN" : "عربي"}
            </button>
          </div>

        </div>
      </header>


      {/* ======================================================== */}
      {/* 2. WELCOMING HERO SECTION (Full-Bleed Iraq Map Background)*/}
      {/* ======================================================== */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 overflow-hidden bg-[#070A12]">
        
        {/* Full-Bleed 3D Map Background */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <img
            src="/hero_iraq_bg.jpg"
            alt="Iraq Digital Network Map"
            className={`w-full h-full object-cover opacity-90 scale-110 transition-all duration-700 ${
              isAr ? "-translate-x-6 lg:-translate-x-24" : "translate-x-6 lg:translate-x-24"
            }`}
          />

          {/* Seamless Vignette and Readability Gradient Overlays */}
          {/* 1. Dynamic text readability gradient: dark behind text, transparent over 3D map */}
          <div
            className={`absolute inset-0 transition-all duration-700 ${
              isAr
                ? "bg-gradient-to-l from-[#070A12] via-[#070A12]/85 to-transparent"
                : "bg-gradient-to-r from-[#070A12] via-[#070A12]/85 to-transparent"
            }`}
          ></div>
          
          {/* 2. Top and Bottom blend gradients into header and dashboard */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070A12]/90 via-transparent to-[#070A12]"></div>
          <div className="absolute inset-0 bg-[#070A12]/30 backdrop-blur-[1px]"></div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Text Column (Takes 6 cols): Right on Arabic, Left on English */}
            <div className="lg:col-span-6 space-y-6 text-start">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-cyan-400 text-[11px] font-bold tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>
                  {isAr ? "بيانات رسمية • رؤى حقيقية • عراق أكثر اتصالاً" : "OFFICIAL DATA • REAL INSIGHTS • A MORE CONNECTED IRAQ"}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white">
                {isAr ? "دليل السوق " : "Digital Market "} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                  {isAr ? "الرقمي " : "Intelligence "}
                </span> <br />
                {isAr ? "لمحافظات العراق" : "for Iraq"}
              </h1>

              <p className="text-base sm:text-lg leading-relaxed font-normal max-w-xl text-slate-300">
                {isAr
                  ? "بيانات ورؤى مكانية موثقة تُمكّن رواد الأعمال وصنّاع القرار من اختيار الموقع ونموذج العمل الأنسب لمشاريعهم"
                  : "Location intelligence and official metrics empowering entrepreneurs to make data-driven expansion decisions."}
              </p>

              {/* The 2 CTA Buttons Requested by User */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                
                {/* Button 1: All Governorates */}
                <button
                  onClick={() => {
                    setAllGovViewType("map");
                    setActiveSection("map");
                    handleSelectModeAndScroll("all_governorates");
                  }}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-[0_0_25px_rgba(79,70,229,0.5)] hover:shadow-[0_0_35px_rgba(79,70,229,0.7)] hover:brightness-110 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-cyan-300" />
                  <span>{isAr ? "كافة المحافظات" : "All Governorates"}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>

                {/* Button 2: Single Governorate */}
                <button
                  onClick={() => handleSelectModeAndScroll("single_governorate")}
                  className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all cursor-pointer shadow-lg"
                >
                  <Building2 className="w-4 h-4 text-purple-400" />
                  <span>{isAr ? "تحليل محافظة منفردة" : "Single Governorate"}</span>
                </button>

              </div>

            </div>

            {/* Empty right area so the 3D illuminated map in background is 100% visible and unobstructed */}
            <div className="hidden lg:block lg:col-span-6 h-[480px] pointer-events-none"></div>

          </div>
        </div>

        {/* Bottom Floating Stats Bar */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8">
          <div className="rounded-2xl p-4 sm:p-5 border border-white/15 shadow-[0_0_40px_rgba(0,0,0,0.6)] grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-white/10 bg-[#0B1024]/85 backdrop-blur-2xl">
            
            {/* Stat 1: 2 Official Sources */}
            <button
              onClick={() => {
                setActiveSection("sources");
                scrollToSection("sources");
              }}
              className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-xl transition-colors group cursor-pointer text-start"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-xl group-hover:scale-105 transition-transform border border-blue-500/30">
                <Database className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black font-mono text-white">2</div>
                <div className="text-xs font-bold text-slate-200">
                  {isAr ? "مصادر رسمية معتمدة" : "Official Sources"}
                </div>
                <div className="text-[10px] text-slate-400">COSIT 2022 & Telecom 2024</div>
              </div>
            </button>

            {/* Stat 2: 50+ Indicators */}
            <button
              onClick={() => handleSelectViewAndScroll("chart")}
              className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-xl transition-colors group cursor-pointer text-start"
            >
              <div className="w-11 h-11 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl group-hover:scale-105 transition-transform border border-cyan-500/30">
                <Layers className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black font-mono text-white">50+</div>
                <div className="text-xs font-bold text-slate-200">
                  {isAr ? "مؤشرات وجداول تفصيلية" : "Indicators & Tables"}
                </div>
                <div className="text-[10px] text-slate-400">Across Digital Sectors</div>
              </div>
            </button>

            {/* Stat 3: 18 Governorates */}
            <button
              onClick={() => handleSelectViewAndScroll("map")}
              className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-xl transition-colors group cursor-pointer text-start"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl group-hover:scale-105 transition-transform border border-indigo-500/30">
                <MapPin className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black font-mono text-white">18</div>
                <div className="text-xs font-bold text-slate-200">
                  {isAr ? "محافظة عراقية" : "Governorates"}
                </div>
                <div className="text-[10px] text-slate-400">Full National Coverage</div>
              </div>
            </button>

            {/* Stat 4: Real Insights */}
            <button
              onClick={() => {
                setActiveSection("insights");
                scrollToSection("insights");
              }}
              className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-xl transition-colors group cursor-pointer text-start"
            >
              <div className="w-11 h-11 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-xl group-hover:scale-105 transition-transform border border-purple-500/30">
                <BarChart3 className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black font-mono text-white">100%</div>
                <div className="text-xs font-bold text-slate-200">
                  {isAr ? "رؤى استثمارية موثقة" : "Real Insights"}
                </div>
                <div className="text-[10px] text-slate-400">For a Connected Iraq</div>
              </div>
            </button>

          </div>

          {/* Mouse Scroll Indicator (Commented out upon user request)
          <div className="flex flex-col items-center justify-center mt-6 text-slate-400 text-xs font-bold tracking-widest gap-2">
            <span className="uppercase tracking-widest text-[10px] text-slate-400 font-mono">
              {isAr ? "انزل لاستكشاف المنصة" : "SCROLL TO EXPLORE"}
            </span>
            <a href="#dashboard" className="animate-bounce p-1 rounded-full text-slate-400 hover:text-cyan-400">
              <ChevronDown className="w-5 h-5" />
            </a>
          </div>
          */}
        </div>

      </section>


      {/* ======================================================== */}
      {/* 3. THE COMPLETE ORIGINAL PROJECT DASHBOARD (100% Intact) */}
      {/* ======================================================== */}
      <main id="dashboard" dir={isAr ? "rtl" : "ltr"} className="max-w-[1440px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6 pt-12 scroll-mt-20">
        
        {/* Original NeonHeader */}
        <NeonHeader
          currentMode={currentMode}
          onModeChange={setCurrentMode}
          selectedTopic={selectedTopic}
          onTopicChange={setSelectedTopic}
          lang={lang}
          onToggleLang={() => setLang(isAr ? "en" : "ar")}
          viewType={allGovViewType}
          onViewTypeChange={(view) => {
            setAllGovViewType(view);
            setActiveSection(view);
          }}
        />

        {/* Dynamic Mode Display: Exact Original Components */}
        {currentMode === "all_governorates" ? (
          <AllGovernoratesNeonDashboard
            selectedTopic={selectedTopic}
            onSelectGovernorate={(gov) => {
              setSelectedGov(gov);
              setCurrentMode("single_governorate");
            }}
            lang={lang}
            viewType={allGovViewType}
            onViewTypeChange={(view) => {
              setAllGovViewType(view);
              setActiveSection(view);
            }}
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

        {/* Original Footer */}
        <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-medium">
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
