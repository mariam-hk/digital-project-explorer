"use client";

import React, { useState } from "react";
import { LOCATIONS, NATIONAL_AVERAGE } from "../lib/data/iraq-digital-data";
import { LocationProfile } from "../lib/types";
import { X, ArrowRight, ArrowLeftRight, Check, Trophy } from "lucide-react";

interface CityComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCityAId: string;
  lang: "en" | "ar";
}

export const CityComparisonModal: React.FC<CityComparisonModalProps> = ({
  isOpen,
  onClose,
  initialCityAId,
  lang,
}) => {
  const isAr = lang === "ar";
  const allLocations: LocationProfile[] = [NATIONAL_AVERAGE, ...LOCATIONS];

  const [cityAId, setCityAId] = useState(initialCityAId || "baghdad");
  const [cityBId, setCityBId] = useState(
    initialCityAId === "erbil" ? "baghdad" : "erbil"
  );

  if (!isOpen) return null;

  const cityA = allLocations.find((l) => l.id === cityAId) || LOCATIONS[0];
  const cityB = allLocations.find((l) => l.id === cityBId) || LOCATIONS[1];

  const metrics = [
    {
      key: "smartphones" as const,
      nameEn: "Smartphone Adoption",
      nameAr: "اعتماد الهواتف الذكية",
      icon: "📱",
    },
    {
      key: "internet" as const,
      nameEn: "Internet Usage",
      nameAr: "استخدام الإنترنت",
      icon: "🌐",
    },
    {
      key: "computers" as const,
      nameEn: "Computer Usage",
      nameAr: "استخدام أجهزة الحاسوب",
      icon: "💻",
    },
    {
      key: "skills" as const,
      nameEn: "Digital Skills Index",
      nameAr: "المهارات الرقمية",
      icon: "🎓",
    },
    {
      key: "shopping" as const,
      nameEn: "Online Shopping",
      nameAr: "التسوق الإلكتروني",
      icon: "🛒",
    },
    {
      key: "payments" as const,
      nameEn: "Digital Payments",
      nameAr: "المدفوعات الرقمية",
      icon: "💳",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center text-violet-700">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {isAr ? "مقارنة مباشرة بين مدينتين" : "Head-to-Head City Comparison"}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? "تحليل الفروقات الرقمية وسلوك المجتمع بين سوقين محليين"
                  : "Compare digital behaviors and market readiness between two locations"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* City Selectors */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* City A Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 block">
              {isAr ? "المدينة الأولى (أ):" : "First Location (A):"}
            </label>
            <select
              value={cityAId}
              onChange={(e) => setCityAId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {allLocations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {isAr ? loc.nameAr : loc.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* City B Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 block">
              {isAr ? "المدينة الثانية (ب):" : "Second Location (B):"}
            </label>
            <select
              value={cityBId}
              onChange={(e) => setCityBId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {allLocations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {isAr ? loc.nameAr : loc.nameEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="p-5 space-y-4">
          <div className="space-y-3">
            {metrics.map((m) => {
              const valA = cityA.indicators[m.key];
              const valB = cityB.indicators[m.key];
              const diff = valA - valB;

              return (
                <div
                  key={m.key}
                  className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50/50 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-800">
                    <span className="flex items-center gap-2">
                      <span>{m.icon}</span>
                      <span>{isAr ? m.nameAr : m.nameEn}</span>
                    </span>

                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        diff > 0
                          ? "bg-indigo-50 text-indigo-700"
                          : diff < 0
                          ? "bg-violet-50 text-violet-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {diff > 0
                        ? `${isAr ? cityA.nameAr : cityA.nameEn} +${diff}%`
                        : diff < 0
                        ? `${isAr ? cityB.nameAr : cityB.nameEn} +${Math.abs(diff)}%`
                        : isAr
                        ? "متطابقان"
                        : "Identical"}
                    </span>
                  </div>

                  {/* Visual Comparison Bars */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    {/* Bar A */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-slate-600 truncate">
                          {isAr ? cityA.nameAr : cityA.nameEn}
                        </span>
                        <span className="font-bold text-slate-900">{valA}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                          style={{ width: `${valA}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Bar B */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-slate-600 truncate">
                          {isAr ? cityB.nameAr : cityB.nameEn}
                        </span>
                        <span className="font-bold text-slate-900">{valB}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-violet-600 h-full rounded-full transition-all duration-300"
                          style={{ width: `${valB}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            {isAr ? "إغلاق المقارنة" : "Close Comparison"}
          </button>
        </div>
      </div>
    </div>
  );
};
