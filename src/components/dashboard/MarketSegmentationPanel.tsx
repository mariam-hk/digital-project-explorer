"use client";

import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { MARKET_SEGMENTS } from "../../lib/data/iraq-real-data";

interface MarketSegmentationPanelProps {
  lang: "en" | "ar";
}

export const MarketSegmentationPanel: React.FC<MarketSegmentationPanelProps> = ({ lang }) => {
  const isAr = lang === "ar";
  const [activeSegment, setActiveSegment] = useState<string | null>(null);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#111625] border border-white/10 p-5 shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-white/5 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">
            {isAr ? "تقسيم السوق بالذكاء الاصطناعي (AI)" : "Market Segmentation (AI)"}
          </h3>
          <p className="text-[11px] text-slate-400">
            {isAr ? "شرائح المستهلكين بحسب السلوك الرقمي" : "Customer segments based on digital behavior"}
          </p>
        </div>
        <button className="text-slate-500 hover:text-slate-300 p-1">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Scatter / Cluster Plot & Legend */}
      <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* SVG Plot */}
        <div className="relative w-full sm:w-56 h-48 flex items-center justify-center">
          <svg viewBox="0 0 240 180" className="w-full h-full overflow-visible">
            {/* Grid and Axes */}
            <line x1="30" y1="150" x2="230" y2="150" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <line x1="30" y1="20" x2="30" y2="150" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

            {/* Y Axis Label */}
            <text
              x="-85"
              y="16"
              transform="rotate(-90)"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="9"
              fontFamily="sans-serif"
            >
              {isAr ? "التفاعل الرقمي" : "Digital Engagement"}
            </text>

            {/* X Axis Label */}
            <text
              x="130"
              y="168"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="9"
              fontFamily="sans-serif"
            >
              {isAr ? "الوصول للبنية التحتية" : "Infrastructure Access"}
            </text>

            {/* 3 Clusters with dotted borders */}
            {/* Cluster 1: Segment 1 (Purple - Mobile First) */}
            <g
              className="cursor-pointer transition-opacity"
              opacity={activeSegment === null || activeSegment === "segment1" ? 1 : 0.3}
              onMouseEnter={() => setActiveSegment("segment1")}
              onMouseLeave={() => setActiveSegment(null)}
            >
              <ellipse
                cx="90"
                cy="70"
                rx="42"
                ry="30"
                transform="rotate(-15 90 70)"
                fill="rgba(139, 92, 246, 0.12)"
                stroke="#8B5CF6"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              {/* Dots inside */}
              {[[75, 60], [85, 75], [95, 62], [105, 72], [82, 80], [98, 85]].map(([x, y], idx) => (
                <circle key={idx} cx={x} cy={y} r="2.5" fill="#C084FC" />
              ))}
            </g>

            {/* Cluster 2: Segment 2 (Green - Digital Natives / FTTH) */}
            <g
              className="cursor-pointer transition-opacity"
              opacity={activeSegment === null || activeSegment === "segment2" ? 1 : 0.3}
              onMouseEnter={() => setActiveSegment("segment2")}
              onMouseLeave={() => setActiveSegment(null)}
            >
              <ellipse
                cx="170"
                cy="50"
                rx="36"
                ry="24"
                transform="rotate(10 170 50)"
                fill="rgba(16, 185, 129, 0.12)"
                stroke="#10B981"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              {/* Dots inside */}
              {[[155, 45], [168, 55], [178, 42], [182, 58], [162, 52]].map(([x, y], idx) => (
                <circle key={idx} cx={x} cy={y} r="2.5" fill="#34D399" />
              ))}
            </g>

            {/* Cluster 3: Segment 3 (Amber - Emerging Traditional) */}
            <g
              className="cursor-pointer transition-opacity"
              opacity={activeSegment === null || activeSegment === "segment3" ? 1 : 0.3}
              onMouseEnter={() => setActiveSegment("segment3")}
              onMouseLeave={() => setActiveSegment(null)}
            >
              <ellipse
                cx="160"
                cy="115"
                rx="40"
                ry="22"
                transform="rotate(-5 160 115)"
                fill="rgba(245, 158, 11, 0.12)"
                stroke="#F59E0B"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              {/* Dots inside */}
              {[[145, 112], [158, 122], [168, 108], [175, 118], [152, 116]].map(([x, y], idx) => (
                <circle key={idx} cx={x} cy={y} r="2.5" fill="#FBBF24" />
              ))}
            </g>
          </svg>
        </div>

        {/* Legend pills */}
        <div className="space-y-2.5 w-full sm:w-auto text-xs shrink-0">
          {MARKET_SEGMENTS.map((seg) => (
            <div
              key={seg.id}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                activeSegment === seg.id
                  ? "bg-white/10 border-white/20 shadow-md"
                  : "bg-white/5 border-white/5 hover:bg-white/10"
              }`}
              onMouseEnter={() => setActiveSegment(seg.id)}
              onMouseLeave={() => setActiveSegment(null)}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: seg.color }}
                ></span>
                <span className="font-bold text-white">
                  {isAr ? seg.nameAr : seg.nameEn}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {isAr ? seg.labelAr : seg.labelEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
