"use client";

import React from "react";
import { Users, Wifi, Smartphone, Home, MoreHorizontal } from "lucide-react";
import { NATIONAL_STATS } from "../../lib/data/iraq-real-data";

interface KpiCardsRowProps {
  lang: "en" | "ar";
}

export const KpiCardsRow: React.FC<KpiCardsRowProps> = ({ lang }) => {
  const isAr = lang === "ar";
  const { year2024 } = NATIONAL_STATS;

  const cards = [
    {
      id: "pop",
      titleEn: "Population",
      titleAr: "إجمالي السكان",
      subEn: "Total population (Iraq, latest available)",
      subAr: "إجمالي عدد السكان (أحدث تقدير رسمي 2024)",
      value: "44.4M",
      exact: "44,414,794",
      icon: Users,
      iconBg: "bg-indigo-950/80 text-indigo-400 border border-indigo-500/30",
      cardBorder: "border-indigo-500/20 hover:border-indigo-500/40",
      sparkColor: "#818CF8",
      sparkGradient: "from-indigo-500/20 to-transparent",
      waveD: "M0,35 C30,30 50,42 80,32 C110,22 140,38 170,25 C200,12 230,28 260,18 C290,8 310,20 340,10 L340,50 L0,50 Z",
      lineD: "M0,35 C30,30 50,42 80,32 C110,22 140,38 170,25 C200,12 230,28 260,18 C290,8 310,20 340,10",
    },
    {
      id: "net",
      titleEn: "Internet Users",
      titleAr: "مستخدمو الإنترنت",
      subEn: "Total number of users",
      subAr: "إجمالي مستخدمي الإنترنت النشطين",
      value: "38.5M",
      exact: "86.7% National Penetration",
      icon: Wifi,
      iconBg: "bg-emerald-950/80 text-emerald-400 border border-emerald-500/30",
      cardBorder: "border-emerald-500/20 hover:border-emerald-500/40",
      sparkColor: "#34D399",
      sparkGradient: "from-emerald-500/20 to-transparent",
      waveD: "M0,40 C40,38 70,22 110,30 C150,38 180,18 220,24 C260,30 290,12 340,8 L340,50 L0,50 Z",
      lineD: "M0,40 C40,38 70,22 110,30 C150,38 180,18 220,24 C260,30 290,12 340,8",
    },
    {
      id: "mob",
      titleEn: "Mobile Subscribers",
      titleAr: "مشتركو الهاتف النقال",
      subEn: "Total subscriptions",
      subAr: "خطوط الهاتف النقال النشطة (زين، آسيا، كورك)",
      value: "40.2M",
      exact: "40,181,329",
      icon: Smartphone,
      iconBg: "bg-rose-950/80 text-rose-400 border border-rose-500/30",
      cardBorder: "border-rose-500/20 hover:border-rose-500/40",
      sparkColor: "#FB7185",
      sparkGradient: "from-rose-500/20 to-transparent",
      waveD: "M0,32 C40,28 80,42 120,35 C160,28 200,40 240,22 C280,10 310,25 340,15 L340,50 L0,50 Z",
      lineD: "M0,32 C40,28 80,42 120,35 C160,28 200,40 240,22 C280,10 310,25 340,15",
    },
    {
      id: "ftth",
      titleEn: "FTTH Subscribers",
      titleAr: "مشتركو الكيبل الضوئي FTTH",
      subEn: "Total subscriptions",
      subAr: "مشتركو مشروع النفاذ الضوئي الوطني",
      value: "1.11M",
      exact: "1,114,221 (+218% growth)",
      icon: Home,
      iconBg: "bg-amber-950/80 text-amber-400 border border-amber-500/30",
      cardBorder: "border-amber-500/20 hover:border-amber-500/40",
      sparkColor: "#FBBF24",
      sparkGradient: "from-amber-500/20 to-transparent",
      waveD: "M0,45 C40,42 80,38 120,34 C160,28 200,22 240,16 C280,10 310,8 340,4 L340,50 L0,50 Z",
      lineD: "M0,45 C40,42 80,38 120,34 C160,28 200,22 240,16 C280,10 310,8 340,4",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`relative overflow-hidden rounded-2xl bg-[#111625] border ${card.cardBorder} p-5 shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between`}
          >
            {/* Top row: Icon, title, more */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.iconBg}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    {isAr ? card.titleAr : card.titleEn}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {isAr ? card.subAr : card.subEn}
                  </p>
                </div>
              </div>

              <button
                className="text-slate-500 hover:text-slate-300 p-1"
                title={card.exact}
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Value & growth badge */}
            <div className="mt-4 flex items-baseline justify-between z-10">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
                {card.value}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {card.exact}
              </span>
            </div>

            {/* Bottom smooth SVG wave graph */}
            <div className="mt-3 -mx-5 -mb-5 h-12 overflow-hidden relative pointer-events-none opacity-80">
              <svg
                viewBox="0 0 340 50"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <defs>
                  <linearGradient id={`grad-${card.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={card.sparkColor} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={card.sparkColor} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={card.waveD} fill={`url(#grad-${card.id})`} />
                <path
                  d={card.lineD}
                  fill="none"
                  stroke={card.sparkColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
};
