"use client";

import React from "react";
import { TOPICS } from "../lib/data/iraq-digital-data";
import { TopicId } from "../lib/types";

interface TopicSelectorProps {
  selectedTopic: TopicId;
  onSelectTopic: (topic: TopicId) => void;
  lang: "en" | "ar";
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({
  selectedTopic,
  onSelectTopic,
  lang,
}) => {
  const isAr = lang === "ar";
  const currentTopic = TOPICS.find((t) => t.id === selectedTopic) || TOPICS[0];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            {isAr ? "الخطوة 1: ماذا تريد أن تستكشف؟" : "Step 1: What do you want to explore?"}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isAr
              ? "اختر البُعد التكنولوجي أو السلوك الرقمي للمجتمع الذي يهم مشروعك"
              : "Select a digital dimension or citizen behavior relevant to your technology venture"}
          </p>
        </div>

        {/* Current Active Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 self-start sm:self-auto">
          <span>{currentTopic.icon}</span>
          <span className="font-semibold">{isAr ? currentTopic.nameAr : currentTopic.nameEn}</span>
        </div>
      </div>

      {/* Pill Buttons */}
      <div className="flex flex-wrap gap-2 pt-1">
        {TOPICS.map((topic) => {
          const isActive = selectedTopic === topic.id;
          return (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-300 ring-2 ring-indigo-600/30 scale-[1.02]"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/70 hover:border-slate-300"
              }`}
            >
              <span className="text-base">{topic.icon}</span>
              <span>{isAr ? topic.nameAr : topic.nameEn}</span>
            </button>
          );
        })}
      </div>

      {/* Quick context info */}
      <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/70 text-xs text-indigo-900 flex items-center gap-2">
        <span className="text-sm font-bold text-indigo-600">ℹ️</span>
        <span>{isAr ? currentTopic.descriptionAr : currentTopic.descriptionEn}</span>
      </div>
    </div>
  );
};
