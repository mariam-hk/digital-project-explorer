"use client";

import React, { useState } from "react";

interface DonutItem {
  label: string;
  value: number;
  color: string;
}

interface NeonDonutChartProps {
  data: DonutItem[];
  title: string;
  subtitle?: string;
  centerLabel?: string;
  centerValue?: string;
  lang: "ar" | "en";
  theme?: "dark" | "light";
  className?: string;
}

export const NeonDonutChart: React.FC<NeonDonutChartProps> = ({
  data,
  title,
  subtitle,
  centerLabel,
  centerValue,
  lang,
  theme = "dark",
  className = "",
}) => {
  const isAr = lang === "ar";
  const isLight = theme === "light";
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const total = data.reduce((acc, item) => acc + item.value, 0);

  // SVG Geometry
  const size = 260;
  const strokeWidth = 32;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;
  const slices = data.map((item, idx) => {
    const fraction = item.value / (total || 1);
    const strokeDasharray = `${fraction * circumference} ${circumference}`;
    const strokeDashoffset = -currentOffset;
    currentOffset += fraction * circumference;
    return { ...item, strokeDasharray, strokeDashoffset, idx, fraction };
  });

  return (
    <div className={`rounded-2xl bg-white dark:bg-[#090E1D] border border-slate-200 dark:border-white/10 p-5 shadow-sm dark:shadow-2xl flex flex-col justify-between h-full transition-colors duration-300 ${className}`}>
      <div className="border-b border-slate-200 dark:border-white/5 pb-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse"></span>
          <span>{title}</span>
        </h3>
        {subtitle && <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
      </div>

      <div className="my-auto py-3 flex flex-col sm:flex-row items-center justify-around gap-6 flex-1">
        {/* SVG Donut */}
        <div className="relative w-48 h-48 flex-shrink-0">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
            {/* Background track circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={isLight ? "rgba(0, 0, 0, 0.07)" : "rgba(255, 255, 255, 0.05)"}
              strokeWidth={strokeWidth}
            />

            {/* Glowing Slices */}
            {slices.map((slice) => {
              const isHovered = hoveredIdx === slice.idx;
              return (
                <circle
                  key={slice.idx}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="transparent"
                  stroke={slice.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={slice.strokeDasharray}
                  strokeDashoffset={slice.strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(slice.idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    filter: isHovered
                      ? `drop-shadow(0 0 10px ${slice.color})`
                      : `drop-shadow(0 0 4px ${slice.color}66)`,
                  }}
                />
              );
            })}
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
              {hoveredIdx !== null
                ? `${data[hoveredIdx].value}%`
                : centerValue || `${data[0]?.value || 0}%`}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium max-w-[90px] truncate">
              {hoveredIdx !== null ? data[hoveredIdx].label : centerLabel || data[0]?.label}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2 text-xs w-full">
          {data.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isHovered
                    ? isLight
                      ? "bg-cyan-50 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                      : "bg-white/10 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                    : isLight
                    ? "bg-slate-50 border-slate-200 hover:border-slate-300"
                    : "bg-white/5 border-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
                  ></span>
                  <span className="text-slate-700 dark:text-slate-200 font-medium">{item.label}</span>
                </div>
                <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                  {item.value}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Summary Bar for visual alignment with adjacent demographic card */}
      <div className="pt-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-auto">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 dark:text-slate-400">{isAr ? "القطاع المتصدر:" : "Leading Segment:"}</span>
          <span className="font-bold text-cyan-600 dark:text-cyan-400 font-mono">{data[0]?.label}</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono">
          <span className="text-slate-500 dark:text-slate-400">{isAr ? "الحصة:" : "Share:"}</span>
          <span className="font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded-md text-xs">{data[0]?.value}%</span>
        </div>
      </div>
    </div>
  );
};
