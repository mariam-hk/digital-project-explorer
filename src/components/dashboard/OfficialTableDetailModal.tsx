"use client";

import React, { useState, useMemo, useEffect } from "react";
import { OfficialTableData } from "../../lib/data/official-tables-data";
import {
  X,
  Database,
  Search,
  ArrowUpDown,
  Download,
  FileSpreadsheet,
  Check,
  Building,
  Info,
} from "lucide-react";

interface OfficialTableDetailModalProps {
  tableData: OfficialTableData;
  selectedGovAr?: string;
  onClose: () => void;
  lang: "ar" | "en";
}

export const OfficialTableDetailModal: React.FC<OfficialTableDetailModalProps> = ({
  tableData,
  selectedGovAr,
  onClose,
  lang,
}) => {
  const isAr = lang === "ar";
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<string>(tableData.columns[1]?.key || "");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Filter and Sort rows
  const filteredRows = useMemo(() => {
    let list = [...tableData.rows];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((row) =>
        Object.values(row).some((val) => String(val).toLowerCase().includes(q))
      );
    }

    if (sortKey) {
      list.sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];

        if (typeof valA === "number" && typeof valB === "number") {
          return sortOrder === "desc" ? valB - valA : valA - valB;
        }
        return sortOrder === "desc"
          ? String(valB).localeCompare(String(valA))
          : String(valA).localeCompare(String(valB));
      });
    }

    return list;
  }, [tableData.rows, searchQuery, sortKey, sortOrder]);

  // Copy CSV to clipboard
  const handleExportCSV = () => {
    const headers = tableData.columns.map((c) => (isAr ? c.labelAr : c.labelEn)).join(",");
    const rowsText = tableData.rows
      .map((r) => tableData.columns.map((c) => r[c.key] ?? "").join(","))
      .join("\n");
    const csvContent = `${headers}\n${rowsText}`;

    navigator.clipboard.writeText(csvContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Backdrop click */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-5xl max-h-[92vh] rounded-3xl bg-[#090E1D] border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col z-10 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 bg-[#0E1529] flex items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-xl text-xs sm:text-sm font-black font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.4)]">
                {tableData.tableNumber}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {tableData.reportName} • {tableData.pageNumber}
              </span>
            </div>

            <h2 className="text-base sm:text-xl font-bold text-white leading-relaxed">
              {isAr ? tableData.titleAr : tableData.titleEn}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white border border-white/10 transition-all"
            title={isAr ? "إغلاق (Esc)" : "Close"}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls & Search Bar */}
        <div className="px-5 sm:px-6 py-3 border-b border-white/5 bg-[#0A1022] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? "بحث عن محافظة أو رقم..." : "Filter governorates..."}
              className="w-full ps-9 pe-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none text-xs text-white placeholder:text-slate-500"
            />
          </div>

          {/* Export / Copy Button */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              {filteredRows.length} {isAr ? "محافظة مسجلة" : "rows"}
            </span>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#162038] hover:bg-[#1E2B4A] text-cyan-300 text-xs font-bold border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">{isAr ? "تم النسخ بنجاح!" : "Copied!"}</span>
                </>
              ) : (
                <>
                  <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
                  <span>{isAr ? "نسخ الجدول (CSV)" : "Copy CSV"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Informative Note Box */}
        {tableData.notesAr && (
          <div className="px-5 sm:px-6 py-2.5 bg-cyan-950/30 border-b border-cyan-500/20 flex items-center gap-2 text-xs text-cyan-300">
            <Info className="w-4 h-4 flex-shrink-0 text-cyan-400" />
            <span className="text-slate-300">{tableData.notesAr}</span>
          </div>
        )}

        {/* Data Table Scroll Container */}
        <div className="flex-1 overflow-y-auto overflow-x-auto p-4 sm:p-6">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono uppercase text-[11px]">
                <th className="p-3 text-center w-12">#</th>
                {tableData.columns.map((col) => {
                  const isSorted = sortKey === col.key;
                  return (
                    <th
                      key={col.key}
                      onClick={() => {
                        if (isSorted) setSortOrder(sortOrder === "desc" ? "asc" : "desc");
                        else {
                          setSortKey(col.key);
                          setSortOrder("desc");
                        }
                      }}
                      className="p-3 cursor-pointer hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-1.5 justify-start">
                        <span>{isAr ? col.labelAr : col.labelEn}</span>
                        <ArrowUpDown
                          className={`w-3.5 h-3.5 ${
                            isSorted ? "text-cyan-400" : "text-slate-600"
                          }`}
                        />
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filteredRows.map((row, idx) => {
                const isHighlighted = selectedGovAr && row.govAr === selectedGovAr;
                return (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isHighlighted
                        ? "bg-cyan-500/15 border-l-4 border-cyan-400 font-bold shadow-[inset_0_0_15px_rgba(6,182,212,0.15)]"
                        : idx % 2 === 0
                        ? "bg-white/[0.01] hover:bg-white/[0.05]"
                        : "bg-white/[0.03] hover:bg-white/[0.06]"
                    }`}
                  >
                    <td className="p-3 text-center text-slate-500 font-mono text-[11px]">
                      {idx + 1}
                    </td>
                    {tableData.columns.map((col) => {
                      const val = row[col.key];
                      const isGovCol = col.key === "govAr";
                      return (
                        <td
                          key={col.key}
                          className={`p-3 ${
                            isGovCol
                              ? "font-bold text-white text-sm"
                              : col.isNumeric
                              ? "font-mono text-slate-200 text-xs"
                              : "text-slate-300"
                          }`}
                        >
                          {val !== undefined && val !== null ? (
                            col.isNumeric && typeof val === "number" ? (
                              <span className={val > 50 ? "text-cyan-300 font-bold" : ""}>
                                {val.toLocaleString()}
                              </span>
                            ) : (
                              String(val)
                            )
                          ) : (
                            <span className="text-slate-600">-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredRows.length === 0 && (
            <div className="py-12 text-center text-slate-500 text-xs">
              {isAr ? "لا توجد نتائج مطابقة لبحثك" : "No matching records found"}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0A1022] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>
              {isAr
                ? "بيانات رسمية موثقة ومعتمدة في قرارات التخطيط والاستثمار"
                : "Official published government telemetry"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all"
          >
            {isAr ? "إغلاق" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};
