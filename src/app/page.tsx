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

export default function App() {
  const [currentMode, setCurrentMode] = useState<"all_governorates" | "single_governorate">("all_governorates");
  const [selectedTopic, setSelectedTopic] = useState<TopicConfig>(TOPICS[0]); // Default to "الدفع الإلكتروني والتحول المالي"
  const [selectedGov, setSelectedGov] = useState<GovernorateMetric>(FEDERAL_GOVERNORATES[0]); // Default to Baghdad
  const [lang, setLang] = useState<"ar" | "en">("ar"); // Arabic by default

  const isAr = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.classList.add("dark");
  }, [lang, isAr]);

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 selection:bg-cyan-500 selection:text-black font-sans pb-12">
      <div className="max-w-[1440px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <NeonHeader
          currentMode={currentMode}
          onModeChange={setCurrentMode}
          selectedTopic={selectedTopic}
          onTopicChange={setSelectedTopic}
          lang={lang}
          onToggleLang={() => setLang(isAr ? "en" : "ar")}
        />

        {/* Dynamic Mode Display */}
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

        {/* Footer */}
        <footer className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
          <div>
            <span>
              {isAr
                ? "المصدر: هيئة الإحصاء ونظم المعلومات الجغرافية (COSIT) — إحصاءات الاتصالات والبريد 2024 ومسح تكنولوجيا المعلومات 2022"
                : "Source: COSIT Telecom & Postal 2024 & ICT Household Survey 2022 Reports"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>{isAr ? "بيانات حقيقية موثقة لـ 15 محافظة" : "Verified Telemetry for 15 Governorates"}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
