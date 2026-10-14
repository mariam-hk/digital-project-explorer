"use client";

import React, { useState, useMemo } from "react";
import { GovernorateMetric } from "../../lib/data/iraq-dashboard-data";
import { ArrowUpDown, LineChart } from "lucide-react";

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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showTrendLine, setShowTrendLine] = useState<boolean>(false); // Disabled by default per user request

  // Sorted governorates by metricKey (Ascending by default to match screenshot: lowest to highest)
  const sortedGovernorates = useMemo(() => {
    return [...governorates].sort((a, b) => {
      const valA = Number(a[metricKey]) || 0;
      const valB = Number(b[metricKey]) || 0;
      return sortOrder === "asc" ? valA - valB : valB - valA;
    });
  }, [governorates, metricKey, sortOrder]);

  // SVG Dimension setups
  const width = 1200;
  const height = 360;
  const paddingLeft = 140;
  const paddingRight = 45;
  const paddingTop = 50;
  const paddingBottom = 75;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const count = sortedGovernorates.length;
  const dataValues = sortedGovernorates.map((g) => Number(g[metricKey]) || 0);
  const maxVal = Math.max(...dataValues, 100);
  const minVal = 0;

  const step = chartWidth / count;
  const barWidth = Math.min(34, step * 0.55);

  // Compute (x, y) coordinates for each bar center and line point
  const points = sortedGovernorates.map((g, i) => {
    const val = Number(g[metricKey]) || 0;
    const x = paddingLeft + i * step + step / 2;
    const yRatio = (val - minVal) / (maxVal - minVal);
    const y = paddingTop + chartHeight * (1 - yRatio);
    return { x, y, val, gov: g };
  });

  // Calculate National / Dataset Average for the dashed line
  const avgVal = points.length > 0
    ? (points.reduce((acc, p) => acc + p.val, 0) / points.length).toFixed(1)
    : "0.0";
  const avgYRatio = (Number(avgVal) - minVal) / (maxVal - minVal);
  const avgY = paddingTop + chartHeight * (1 - avgYRatio);

  // Calculate smooth Monotonic Bezier path (Prevents arches and dips between bars)
  const getSplinePath = () => {
    if (points.length < 2) return "";

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];

      // Monotonic horizontal tangents: strictly preserves ascending/descending order without dips
      const dx = (p2.x - p1.x) * 0.45;
      const cp1x = p1.x + dx;
      const cp1y = p1.y;
      const cp2x = p2.x - dx;
      const cp2y = p2.y;

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
              ? (showTrendLine ? "مخطط الأعمدة والمنحنى التوافقي (Combo Bar + Spline Trend)" : "توزيع المحافظات التنازلي / التصاعدي")
              : (showTrendLine ? "Governorate Distribution (Combo Bar + Spline Trend)" : "Governorate Distribution")}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Trendline Toggle */}
          <button
            type="button"
            onClick={() => setShowTrendLine((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-sm ${
              showTrendLine
                ? "bg-[#0E7490]/15 dark:bg-[#06B6D4]/15 border-[#0E7490] dark:border-[#22D3EE] text-[#0E7490] dark:text-[#22D3EE]"
                : "bg-slate-100 dark:bg-[#1E293B] border-[#CBD5E1] dark:border-[rgba(148,163,184,0.2)] text-slate-600 dark:text-slate-400 hover:border-[#0E7490] dark:hover:border-[#22D3EE]"
            }`}
            title={isAr ? "إظهار/إخفاء المنحنى الواصل بين الأعمدة" : "Toggle trendline"}
          >
            <LineChart className="w-3.5 h-3.5" />
            <span>{isAr ? "منحنى السلوك" : "Trendline"}</span>
          </button>

          {/* Sort Order Toggle */}
          <button
            type="button"
            onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-[#CBD5E1] dark:border-[rgba(148,163,184,0.2)] bg-slate-100 dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 hover:border-[#0E7490] dark:hover:border-[#22D3EE] transition-all cursor-pointer shadow-sm"
            title={isAr ? "عكس اتجاه الترتيب" : "Toggle sort direction"}
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-[#0E7490] dark:text-[#22D3EE]" />
            <span>
              {sortOrder === "asc"
                ? isAr
                  ? "الترتيب: من الأدنى للأعلى"
                  : "Sort: Low to High"
                : isAr
                ? "الترتيب: من الأعلى للأدنى"
                : "Sort: High to Low"}
            </span>
          </button>

          <div className="hidden md:flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: neonColor }}></span>
              <span className="text-[#334155] dark:text-[#94A3B8]">{isAr ? "قيمة المؤشر" : "Metric Value"}</span>
            </div>
            {showTrendLine && (
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-0.5 bg-[#0E7490] dark:bg-[#22D3EE]"></span>
                <span className="text-[#0E7490] dark:text-[#22D3EE]">{isAr ? "منحنى السلوك" : "Trend"}</span>
              </div>
            )}
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

          {/* Subtle Horizontal Grid Lines & Y-Axis Labels on the Right */}
          {[0.25, 0.5, 0.75, 1.0].map((ratio, idx) => {
            const y = paddingTop + chartHeight * (1 - ratio);
            const valLabel = Math.round(minVal + ratio * (maxVal - minVal));
            return (
              <g key={idx}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke={isLight ? "rgba(51, 65, 85, 0.12)" : "rgba(148, 163, 184, 0.10)"}
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                {/* Y-Axis Label on the RIGHT side (Matching Image) */}
                <text
                  x={width - paddingRight + 12}
                  y={y + 4}
                  textAnchor="start"
                  fill={isLight ? "#334155" : "#94A3B8"}
                  fontSize="11"
                  fontFamily="monospace"
                >
                  {valLabel}
                </text>
              </g>
            );
          })}

          {/* Baseline X-Axis Line */}
          <line
            x1={paddingLeft}
            y1={paddingTop + chartHeight}
            x2={width - paddingRight}
            y2={paddingTop + chartHeight}
            stroke={isLight ? "#CBD5E1" : "rgba(148, 163, 184, 0.2)"}
            strokeWidth="1.5"
          />

          {/* Prominent Dashed Horizontal Average Line (Starts at Average Badge, runs to right edge) */}
          <line
            x1={12}
            y1={avgY}
            x2={width - paddingRight}
            y2={avgY}
            stroke={isLight ? "#0E7490" : "rgba(255, 255, 255, 0.85)"}
            strokeDasharray="6 6"
            strokeWidth="1.8"
          />

          {/* Average Label Badge on the Left (Dedicated space from x=12 to x=134 - NEVER touches bars) */}
          <g transform={`translate(12, ${avgY - 12})`}>
            <rect
              x="0"
              y="0"
              width={isAr ? 122 : 126}
              height="24"
              rx="12"
              fill={isLight ? "#F1F5F9" : "#090E1D"}
              stroke={isLight ? "#0E7490" : "rgba(148, 163, 184, 0.4)"}
              strokeWidth="1.2"
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
            />
            <text
              x={isAr ? 61 : 63}
              y="16"
              textAnchor="middle"
              fill={isLight ? "#0E7490" : "#FFFFFF"}
              fontSize="10"
              fontWeight="800"
              fontFamily="sans-serif"
              direction={isAr ? "rtl" : "ltr"}
            >
              {isAr ? `متوسط المحافظات: ${avgVal}` : `Govs Avg: ${avgVal}`}
            </text>
          </g>

          {/* Overlay Smooth Trendline Curve (Rendered before bar chips so it never covers numbers) */}
          {showTrendLine && (
            <>
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

              {/* Glowing Data Points on the Curve */}
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
                        filter: isLight
                          ? "drop-shadow(0 0 4px rgba(8, 126, 173, 0.5))"
                          : "drop-shadow(0 0 6px rgba(88, 182, 204, 0.8))",
                      }}
                    />
                  </g>
                );
              })}
            </>
          )}

          {/* Vertical Neon Columns (Bars) & Value Badges */}
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
                    fill={isLight ? "rgba(8, 126, 173, 0.08)" : "rgba(88, 182, 204, 0.08)"}
                    rx="8"
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
                      ? `drop-shadow(0 0 14px ${neonGlow})`
                      : `drop-shadow(0 0 6px ${neonGlow})`,
                    transition: "all 0.25s ease",
                  }}
                />

                {/* Solid Background Chip Behind Every Bar Value - Prevents any dashed line from cutting through digits */}
                <rect
                  x={pt.x - 19}
                  y={pt.y - 23}
                  width="38"
                  height="17"
                  rx="4"
                  fill={isHovered ? (isLight ? "#F8FAFC" : "#1E293B") : (isLight ? "#FFFFFF" : "#111827")}
                  stroke={isHovered ? neonColor : (isLight ? "#CBD5E1" : "rgba(148, 163, 184, 0.35)")}
                  strokeWidth={isHovered ? "1.4" : "0.75"}
                  style={{
                    filter: isHovered ? `drop-shadow(0 0 6px ${neonGlow})` : "none",
                  }}
                />

                {/* Top Value on Bar */}
                <text
                  x={pt.x}
                  y={pt.y - 11}
                  textAnchor="middle"
                  fill={isHovered ? (isLight ? "#0F172A" : "#FFFFFF") : (isLight ? "#0E7490" : "#F8FAFC")}
                  fontSize="10"
                  fontWeight="800"
                  fontFamily="monospace"
                >
                  {pt.val}
                </text>

                {/* Bottom Governorate Label Rotated (Matching Image) */}
                <text
                  x={pt.x - 4}
                  y={paddingTop + chartHeight + 14}
                  textAnchor="end"
                  fill={isHovered ? (isLight ? "#0E7490" : "#22D3EE") : (isLight ? "#334155" : "#CBD5E1")}
                  fontSize="11"
                  fontWeight={isHovered ? "bold" : "600"}
                  fontFamily="sans-serif"
                  transform={`rotate(-42, ${pt.x - 4}, ${paddingTop + chartHeight + 14})`}
                >
                  {isAr ? pt.gov.nameAr : pt.gov.nameEn}
                </text>
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
