"use client";

import React, { useState } from "react";
import {
  MoreHorizontal,
  TrendingUp,
  ShoppingCart,
  GraduationCap,
  Wifi,
  Settings,
  ArrowRight,
} from "lucide-react";
import { TOP_OPPORTUNITIES } from "../../lib/data/iraq-real-data";

interface TopOpportunitiesPanelProps {
  lang: "en" | "ar";
}

export const TopOpportunitiesPanel: React.FC<TopOpportunitiesPanelProps> = ({ lang }) => {
  const isAr = lang === "ar";
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "trending-up":
        return <TrendingUp className="w-3.5 h-3.5 text-purple-400" />;
      case "shopping-cart":
        return <ShoppingCart className="w-3.5 h-3.5 text-purple-400" />;
      case "graduation-cap":
        return <GraduationCap className="w-3.5 h-3.5 text-purple-400" />;
      case "wifi":
        return <Wifi className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <Settings className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#111625] border border-white/10 p-5 shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-white/5 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">
            {isAr ? "أهم مجالات الفرص (AI)" : "Top Opportunity Areas"}
          </h3>
          <p className="text-[11px] text-slate-400">
            {isAr ? "فرص النمو المدفوعة بتحليل الذكاء الاصطناعي" : "AI-driven opportunities for growth"}
          </p>
        </div>
        <button className="text-slate-500 hover:text-slate-300 p-1">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Ranked List */}
      <div className="mt-3 space-y-3">
        {TOP_OPPORTUNITIES.map((item) => (
          <div
            key={item.id}
            className="group cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-all"
            onMouseEnter={() => setActiveItem(item.id)}
            onMouseLeave={() => setActiveItem(null)}
          >
            <div className="flex items-center justify-between gap-3">
              {/* Number and Icon */}
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-md bg-white/5 text-slate-400 font-bold text-[11px] flex items-center justify-center font-mono">
                  {item.id}
                </span>
                <div className="w-6 h-6 rounded-lg bg-purple-950/60 border border-purple-500/20 flex items-center justify-center">
                  {getIcon(item.icon)}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex-1 mx-2">
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all duration-500 group-hover:bg-purple-400 group-hover:shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>

              {/* Arrow */}
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </div>

            {/* Title and contextual insight */}
            <div className="mt-1 pl-8 flex items-baseline justify-between text-[11px]">
              <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                {isAr ? item.titleAr : item.titleEn}
              </span>
              <span className="text-[10px] text-purple-400/80 font-mono">
                {item.score}/100
              </span>
            </div>

            {/* Expanded Insight on hover or default for first */}
            {activeItem === item.id && (
              <p className="mt-1 pl-8 text-[10px] text-slate-400 leading-tight animate-fadeIn">
                {isAr ? item.descAr : item.descEn}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
