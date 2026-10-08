"use client";

import React, { useState } from "react";
import { AIInterpretation, LocationProfile, TopicId } from "../lib/types";
import { Sparkles, CheckCircle2, AlertTriangle, Lightbulb, Copy, Check } from "lucide-react";

interface AIInsightBoxProps {
  interpretation: AIInterpretation;
  location: LocationProfile;
  topic: TopicId;
  lang: "en" | "ar";
}

export const AIInsightBox: React.FC<AIInsightBoxProps> = ({
  interpretation,
  location,
  topic,
  lang,
}) => {
  const isAr = lang === "ar";
  const [copied, setCopied] = useState(false);

  const headline = isAr ? interpretation.headlineAr : interpretation.headlineEn;
  const summary = isAr ? interpretation.summaryAr : interpretation.summaryEn;
  const opportunities = isAr ? interpretation.opportunitiesAr : interpretation.opportunitiesEn;
  const risks = isAr ? interpretation.risksAr : interpretation.risksEn;
  const techModels = isAr ? interpretation.recommendedTechAr : interpretation.recommendedTechEn;

  const handleCopy = () => {
    const fullText = `${headline}\n\n${summary}\n\n${
      isAr ? "الفرص التجارية:" : "Commercial Opportunities:"
    }\n${opportunities.map((o) => `• ${o}`).join("\n")}\n\n${
      isAr ? "التحديات والمخاطر:" : "Risks & Bottlenecks:"
    }\n${risks.map((r) => `• ${r}`).join("\n")}`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-2xl p-6 sm:p-7 text-white shadow-xl border border-indigo-500/20 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shadow-inner">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {isAr ? "ماذا يعني هذا التحليل؟" : "What does this mean?"}
                </h2>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/20">
                  {isAr ? "تحليل ذكي مؤسس على الأرقام" : "Grounded AI Analysis"}
                </span>
              </div>
              <p className="text-xs text-indigo-200/70 mt-0.5">
                {isAr
                  ? `قراءة تحليلية استراتيجية لسلوك مجتمع ${location.nameAr} وفرص رواد الأعمال`
                  : `Strategic market interpretation of citizen digital behavior in ${location.nameEn}`}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-indigo-100 transition-colors self-start sm:self-auto border border-white/10"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isAr ? "تم النسخ!" : "Copied!"}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-indigo-300" />
                <span>{isAr ? "نسخ التحليل" : "Copy Insights"}</span>
              </>
            )}
          </button>
        </div>

        {/* Headline & Summary */}
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-extrabold text-indigo-100 leading-snug">
            {headline}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">{summary}</p>
        </div>

        {/* Opportunities vs Risks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Opportunities */}
          <div className="bg-white/5 rounded-xl p-4 border border-emerald-500/20 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>{isAr ? "الفرص التجارية المتاحة:" : "Key Commercial Opportunities:"}</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-200">
              {opportunities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-emerald-400 font-bold mt-0.5">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Risks & Bottlenecks */}
          <div className="bg-white/5 rounded-xl p-4 border border-amber-500/20 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>{isAr ? "التحديات والمخاطر الميدانية:" : "Risks & Market Friction:"}</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-200">
              {risks.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-amber-400 font-bold mt-0.5">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Tech Models */}
        <div className="pt-2 border-t border-indigo-500/20 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>{isAr ? "النماذج التقنية الأكثر ملاءمة:" : "Best-fit Technology Models:"}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {techModels.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs font-medium px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-200 border border-indigo-400/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
