"use client";

import React from "react";
import { LOCATIONS, NATIONAL_AVERAGE } from "../lib/data/iraq-digital-data";
import { LocationProfile } from "../lib/types";
import { MapPin, Users, Building, ArrowLeftRight } from "lucide-react";

interface LocationSelectorProps {
  selectedLocationId: string;
  onSelectLocation: (locationId: string) => void;
  onOpenCompare: () => void;
  lang: "en" | "ar";
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedLocationId,
  onSelectLocation,
  onOpenCompare,
  lang,
}) => {
  const isAr = lang === "ar";
  const allLocations: LocationProfile[] = [NATIONAL_AVERAGE, ...LOCATIONS];
  const currentLocation =
    allLocations.find((loc) => loc.id === selectedLocationId) || LOCATIONS[0];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            {isAr ? "الخطوة 2: اختر المحافظة أو المدينة" : "Step 2: Select Location"}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isAr
              ? "استعرض البيانات الرقمية الموثقة للمحافظة التي تستهدفها"
              : "Review verified digital indicators for your target geographic market"}
          </p>
        </div>

        {/* Compare button */}
        <button
          onClick={onOpenCompare}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 transition-all self-start sm:self-auto shadow-sm"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>{isAr ? "مقارنة مدينتين جنباً إلى جنب" : "Compare Two Cities"}</span>
        </button>
      </div>

      {/* Location buttons grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 pt-1">
        {allLocations.map((loc) => {
          const isActive = selectedLocationId === loc.id;
          return (
            <button
              key={loc.id}
              onClick={() => onSelectLocation(loc.id)}
              className={`p-3 rounded-xl text-start transition-all border ${
                isActive
                  ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-300 ring-2 ring-slate-900/20"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200/70 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <MapPin
                  className={`w-3.5 h-3.5 ${
                    isActive ? "text-indigo-400" : loc.isNationalAverage ? "text-violet-500" : "text-slate-400"
                  }`}
                />
                <span className="text-xs sm:text-sm font-bold truncate">
                  {isAr ? loc.nameAr : loc.nameEn}
                </span>
              </div>
              <p
                className={`text-[11px] mt-1 truncate ${
                  isActive ? "text-slate-300" : "text-slate-500"
                }`}
              >
                {isAr ? loc.regionAr : loc.regionEn}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected location quick facts bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-900 text-sm">
            📍 {isAr ? currentLocation.nameAr : currentLocation.nameEn}
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-600 font-medium">
            {isAr ? currentLocation.regionAr : currentLocation.regionEn}
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-600">
          <div className="flex items-center gap-1.5" title={isAr ? "عدد السكان التقديري" : "Estimated population"}>
            <Users className="w-3.5 h-3.5 text-indigo-500" />
            <span>
              {isAr ? "السكان: " : "Pop: "}
              <strong>{(currentLocation.population / 1000000).toFixed(1)}M</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5" title={isAr ? "نسبة التحضر" : "Urban population %"}>
            <Building className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              {isAr ? "الحضر: " : "Urban: "}
              <strong>{currentLocation.urbanPct}%</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5" title={isAr ? "نسبة فئة الشباب (15-34)" : "Youth ratio (15-34)"}>
            <span className="text-amber-500 font-bold">⚡</span>
            <span>
              {isAr ? "الشباب (15-34): " : "Youth (15-34): "}
              <strong>{currentLocation.youthDemographicPct}%</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
