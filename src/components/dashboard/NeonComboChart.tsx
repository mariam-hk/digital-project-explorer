"use client";

import React, { useState } from "react";
import { GovernorateMetric } from "../../lib/data/iraq-dashboard-data";

interface NeonComboChartProps {
  governorates: GovernorateMetric[];
  metricKey: keyof GovernorateMetric;
  unit: string;
  neonColor: string;
  neonGlow: string;
  onSelectGov: (gov: GovernorateMetric) => void;
  lang: "ar" | "en";
  theme?: "dark" | "light";
}

export const NeonComboChart: React.FC<NeonComboChartProps> = ({
  governorates,
  metricKey,
  unit,
  neonColor,
  neonGlow,
  onSelectGov,
  lang,
  theme = "dark",
}) => {
  const isLight = theme === "light";
  const isAr = lang === "ar";
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // SVG Dimension setups
  const width = 1150;
  const height = 340;
  const paddingX = 28;
  const paddingTop = 40;
  const paddingBottom = 60;

  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingTop - paddingBottom;

  const dataValues = governorates.map((g) => Number(g[metricKey]) || 0);
  const maxVal = Math.max(...dataValues, 100);
  const minVal = 0;

  const count = governorates.length;
  const step = chartWidth / count;
  const barWidth = Math.min(36, step * 0.58);

  // Compute (x, y) coordinates for each bar center and line point
  const points = governorates.map((g, i) => {
    const val = Number(g[metricKey]) || 0;
    const x = paddingX + i * step + step / 2;
    const yRatio = (val - minVal) / (maxVal - minVal);
    const y = paddingTop + chartHeight * (1 - yRatio);
    return { x, y, val, gov: g };
  });

  // Calculate smooth Cubic Bezier Spline path (Catmull-Rom to Cubic Bezier conversion)
  const getSplinePath = () => {
    if (points.length < 2) return "";

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = i > 0 ? points[i - 1] : points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = i < points.length - 2 ? points[i + 2] : p2;

      // Tension factor 0.3 for a graceful wave
      const tension = 0.35;
      const cp1x = p1.x + ((p2.x - p0.x) / 6) * (tension * 3);
      const cp1y = p1.y + ((p2.y - p0.y) / 6) * (tension * 3);
      const cp2x = p2.x - ((p3.x - p1.x) / 6) * (tension * 3);
      const cp2y = p2.y - ((p3.x - p1.x) / 6) * (tension * 3);

      path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }

    return path;
  };

  const splinePath = getSplinePath();

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-white dark:bg-[#111827] border border-[#CBD5E1] dark:border-[rgba(148,163,184,0.12)] p-4 sm:p-6 shadow-sm dark:shadow-none transition-colors duration-300">
      {/* Chart Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#CBD5E1] dark:border-[rgba(148,163,184,0.12)]">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-[#F1F5F9] tracking-wide">
            {isAr
              ? "مخطط الأعمدة والمنحنى التوافقي (Combo Bar + Spline Trend)"
              : "Governorate Distribution (Combo Bar + Spline Trend)"}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: neonColor }}></span>
            <span className="text-[#334155] dark:text-[#94A3B8]">{isAr ? "قيمة المؤشر" : "Metric Value"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-0.5 bg-[#0E7490] dark:bg-[#22D3EE]"></span>
            <span className="text-[#0E7490] dark:text-[#22D3EE]">{isAr ? "منحنى السلوك الرقمي" : "Digital Behavior Trend"}</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto min-w-[750px] select-none"
        >
          <defs>
            {/* Gradient for Bars */}
            <linearGradient id="neonBarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={neonColor} stopOpacity="0.95" />
              <stop offset="70%" stopColor={neonColor} stopOpacity="0.65" />
              <stop offset="100%" stopColor={neonColor} stopOpacity="0.2" />
            </linearGradient>

            {/* Gradient for Hovered Bar */}
            <linearGradient id="neonBarGradHover" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="25%" stopColor={neonColor} stopOpacity="1" />
              <stop offset="100%" stopColor={neonColor} stopOpacity="0.4" />
            </linearGradient>

            {/* Filter for Spline Glow */}
            <filter id="neonSplineGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Subtle Horizontal Grid Lines */}
          {[0.25, 0.5, 0.75, 1.0].map((ratio, idx) => {
            const y = paddingTop + chartHeight * (1 - ratio);
            const valLabel = Math.round(minVal + ratio * (maxVal - minVal));
            return (
              <g key={idx}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke={isLight ? "rgba(51, 65, 85, 0.12)" : "rgba(148, 163, 184, 0.10)"}
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 10}
                  y={y + 4}
                  textAnchor="end"
                  fill={isLight ? "#334155" : "#94A3B8"}
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {valLabel}
                </text>
              </g>
            );
          })}

          {/* Baseline X-Axis Line */}
          <line
            x1={paddingX}
            y1={paddingTop + chartHeight}
            x2={width - paddingX}
            y2={paddingTop + chartHeight}
            stroke={isLight ? "#CBD5E1" : "rgba(148, 163, 184, 0.2)"}
            strokeWidth="1.5"
          />

          {/* 1. Neon Vertical Columns (Bars) */}
          {points.map((pt, i) => {
            const isHovered = hoveredIdx === i;
            const barH = paddingTop + chartHeight - pt.y;

            return (
              <g
                key={pt.gov.id}
                className="cursor-pointer transition-transform duration-200"
                onClick={() => onSelectGov(pt.gov)}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Background Hover Column Highlight */}
                {isHovered && (
                  <rect
                    x={pt.x - step / 2 + 2}
                    y={paddingTop}
                    width={step - 4}
                    height={chartHeight}
                    fill={isLight ? "rgba(8, 126, 173, 0.06)" : "rgba(88, 182, 204, 0.06)"}
                    rx="6"
                  />
                )}

                {/* The Vertical Bar */}
                <rect
                  x={pt.x - barWidth / 2}
                  y={pt.y}
                  width={barWidth}
                  height={Math.max(barH, 4)}
                  rx="6"
                  fill={isHovered ? "url(#neonBarGradHover)" : "url(#neonBarGrad)"}
                  stroke={isHovered ? "#FFFFFF" : neonColor}
                  strokeWidth={isHovered ? "1.5" : "0.5"}
                  style={{
                    filter: isHovered
                      ? `drop-shadow(0 0 12px ${neonGlow})`
                      : `drop-shadow(0 0 4px ${neonGlow})`,
                    transition: "all 0.25s ease",
                  }}
                />

                {/* Top Value on Bar */}
                <text
                  x={pt.x}
                  y={pt.y - 8}
                  textAnchor="middle"
                  fill={isHovered ? (isLight ? "#0F172A" : "#FFFFFF") : isLight ? "#0E7490" : "#22D3EE"}
                  fontSize={isHovered ? "12" : "11"}
                  fontWeight="bold"
                  fontFamily="monospace"
                  style={{
                    textShadow: isHovered ? `0 0 8px ${neonGlow}` : "none",
                  }}
                >
                  {pt.val}
                </text>

                {/* Bottom Governorate Label */}
                <text
                  x={pt.x}
                  y={paddingTop + chartHeight + 22}
                  textAnchor="middle"
                  fill={isHovered ? (isLight ? "#0E7490" : "#22D3EE") : isLight ? "#334155" : "#94A3B8"}
                  fontSize={isHovered ? "12" : "11"}
                  fontWeight={isHovered ? "bold" : "medium"}
                  transform={
                    count > 15
                      ? `rotate(-35, ${pt.x}, ${paddingTop + chartHeight + 22})`
                      : undefined
                  }
                >
                  {isAr ? pt.gov.nameAr : pt.gov.nameEn}
                </text>

                {/* Rank Badge Underneath */}
                <text
                  x={pt.x}
                  y={paddingTop + chartHeight + 42}
                  textAnchor="middle"
                  fill={isLight ? "#334155" : "#94A3B8"}
                  fontSize="9"
                  fontFamily="monospace"
                >
                  #{i + 1}
                </text>
              </g>
            );
          })}

          {/* 2. Overlay Smooth Spline Line Curve (like media_1790077594732.png) */}
          <path
            d={splinePath}
            fill="none"
            stroke={isLight ? "#0E7490" : "#22D3EE"}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neonSplineGlow)"
            className="transition-all duration-300 pointer-events-none"
          />

          {/* 3. Glowing Data Points on the Curve */}
          {points.map((pt, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <g key={`pt-${i}`} className="pointer-events-none">
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? "6" : "4"}
                  fill={isLight ? "#FFFFFF" : "#111827"}
                  stroke={isLight ? "#0E7490" : "#22D3EE"}
                  strokeWidth="2.5"
                  style={{
                    filter: isLight ? "drop-shadow(0 0 4px rgba(8, 126, 173, 0.5))" : "drop-shadow(0 0 6px rgba(88, 182, 204, 0.8))",
                  }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Tooltip Card at the bottom of chart */}
      {hoveredIdx !== null && points[hoveredIdx] && (
        <div className="mt-3 p-3 rounded-xl bg-[#E2E8F0] border border-[#CBD5E1] dark:bg-[#1E293B] dark:border-[rgba(148,163,184,0.12)] flex items-center justify-between text-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="font-bold text-cyan-800 dark:text-[#0E7490] dark:text-[#22D3EE] text-sm">
              {isAr ? points[hoveredIdx].gov.nameAr : points[hoveredIdx].gov.nameEn}
            </span>
            <span className="text-[#334155] dark:text-[#94A3B8]">
              ({isAr ? points[hoveredIdx].gov.regionAr : points[hoveredIdx].gov.regionEn})
            </span>
            <span className="px-2 py-0.5 rounded bg-[#CBD5E1] text-[#0E7490] dark:bg-[rgba(148,163,184,0.12)] dark:text-[#22D3EE] font-mono text-[10px]">
              {points[hoveredIdx].gov.marketTier}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#0F172A] dark:text-[#F1F5F9] font-mono font-bold text-sm">
              {points[hoveredIdx].val} {unit}
            </span>
            <span className="text-[11px] text-[#0E7490] dark:text-[#22D3EE] underline cursor-pointer">
              {isAr ? "انقر لعرض الداشبورد التفصيلي للمحافظة ←" : "Click for deep dive →"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
