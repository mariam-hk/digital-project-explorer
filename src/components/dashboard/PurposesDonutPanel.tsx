"use client";

import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { INTERNET_PURPOSES } from "../../lib/data/iraq-real-data";

interface PurposesDonutPanelProps {
  lang: "en" | "ar";
}

export const PurposesDonutPanel: React.FC<PurposesDonutPanelProps> = ({ lang }) => {
  const isAr = lang === "ar";
  const [activePurpose, setActivePurpose] = useState<string | null>(null);

  // Calculate SVG donut paths
  const total = INTERNET_PURPOSES.reduce((acc, cur) => acc + cur.percent, 0);
  let cumulativeAngle = 0;

  const slices = INTERNET_PURPOSES.map((item) => {
    const angle = (item.percent / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle += angle;

    const rOuter = 85;
    const rInner = 52;
    const cx = 110;
    const cy = 110;

    const radStart = (startAngle - 90) * (Math.PI / 180);
    const radEnd = (endAngle - 90) * (Math.PI / 180);

    const x1 = cx + rOuter * Math.cos(radStart);
    const y1 = cy + rOuter * Math.sin(radStart);
    const x2 = cx + rOuter * Math.cos(radEnd);
    const y2 = cy + rOuter * Math.sin(radEnd);

    const x3 = cx + rInner * Math.cos(radEnd);
    const y3 = cy + rInner * Math.sin(radEnd);
    const x4 = cx + rInner * Math.cos(radStart);
    const y4 = cy + rInner * Math.sin(radStart);

    const largeArc = angle > 180 ? 1 : 0;

    const pathD = `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${largeArc} 0 ${x4} ${y4} Z`;

    return {
      ...item,
      pathD,
    };
  });

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#111625] border border-white/10 p-5 shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-white/5 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">
            {isAr ? "أغراض استخدام الإنترنت (2022)" : "Internet Usage Purposes (2022)"}
          </h3>
          <p className="text-[11px] text-slate-400">
            {isAr ? "توزيع الأنشطة الرقمية للمواطنين" : "Distribution of internet activities"}
          </p>
        </div>
        <button className="text-slate-500 hover:text-slate-300 p-1">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Donut & Legend Grid */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Donut SVG */}
        <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 220 220" className="w-full h-full transform hover:scale-105 transition-transform">
            {slices.map((slice) => {
              const isHovered = activePurpose === slice.id;
              return (
                <path
                  key={slice.id}
                  d={slice.pathD}
                  fill={slice.color}
                  stroke="#111625"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-all duration-200"
                  style={{
                    filter: isHovered ? "brightness(1.3) drop-shadow(0 0 8px rgba(167, 139, 250, 0.8))" : "none",
                    transformOrigin: "110px 110px",
                  }}
                  onMouseEnter={() => setActivePurpose(slice.id)}
                  onMouseLeave={() => setActivePurpose(null)}
                />
              );
            })}
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-xs text-slate-400 font-medium leading-none">
              {isAr ? "الأنشطة" : "Total"}
            </span>
            <span className="text-lg font-extrabold text-white leading-tight font-sans">
              100%
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="space-y-2 w-full text-xs">
          {INTERNET_PURPOSES.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-1.5 rounded-lg transition-colors cursor-pointer ${
                activePurpose === item.id ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"
              }`}
              onMouseEnter={() => setActivePurpose(item.id)}
              onMouseLeave={() => setActivePurpose(null)}
            >
              <div className="flex items-center gap-2 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="font-medium truncate">{isAr ? item.nameAr : item.nameEn}</span>
              </div>
              <span className="font-bold text-white font-mono shrink-0 pl-2">
                {item.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
