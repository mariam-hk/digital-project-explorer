"use client";

import React from "react";
import { X, Database, ShieldCheck, FileSpreadsheet, ExternalLink } from "lucide-react";

interface DataSourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "en" | "ar";
}

export const DataSourcesModal: React.FC<DataSourcesModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const isAr = lang === "ar";

  if (!isOpen) return null;

  const dataSourcesList = [
    {
      indicatorEn: "Smartphone Adoption (%)",
      indicatorAr: "اعتماد الهواتف الذكية (%)",
      sourceEn: "ICT Household Survey (CSO & MOC Iraq)",
      sourceAr: "المسح الميداني لتكنولوجيا المعلومات والاتصالات (الجهاز المركزي للإحصاء)",
      year: 2026,
      unit: "Percentage (%)",
      definitionEn: "Proportion of individuals aged 12+ who regularly use a personal smartphone.",
      definitionAr: "نسبة الأفراد (12 سنة فأكثر) الذين يمتلكون أو يستخدمون هاتفاً ذكياً بانتظام.",
    },
    {
      indicatorEn: "Internet Usage (%)",
      indicatorAr: "استخدام الإنترنت (%)",
      sourceEn: "Communications and Media Commission (CMC) & Telco Telemetry",
      sourceAr: "هيئة الإعلام والاتصالات (CMC) وبيانات شركات الاتصالات",
      year: 2026,
      unit: "Percentage (%)",
      definitionEn: "Individuals connecting to the internet at least once daily via mobile or home Wi-Fi.",
      definitionAr: "نسبة الأفراد المتصلين بالإنترنت يومياً عبر بيانات الهاتف أو شبكة الواي فاي المنزلية.",
    },
    {
      indicatorEn: "Computer Usage (%)",
      indicatorAr: "استخدام الحواسيب (%)",
      sourceEn: "Household Digital Device Census",
      sourceAr: "إحصاء الأجهزة الرقمية والعمل المكتبي",
      year: 2026,
      unit: "Percentage (%)",
      definitionEn: "Individuals with access to a laptop or desktop computer used for work, study, or creation.",
      definitionAr: "نسبة الأفراد الذين يتاح لهم حاسوب محمول أو مكتبي لأغراض العمل أو الدراسة.",
    },
    {
      indicatorEn: "Digital Skills Index (%)",
      indicatorAr: "مؤشر المهارات الرقمية (%)",
      sourceEn: "Higher Education & Tech Workforce Metrics",
      sourceAr: "مؤشرات التعليم العالي وخريجي التكنولوجيا",
      year: 2026,
      unit: "Index (0-100)",
      definitionEn: "Composite metric evaluating basic software literacy, coding aptitude, and STEM talent volume.",
      definitionAr: "مؤشر مركب يقيس المهارات البرمجية، مهارات الحاسوب، ومخرجات كليات تكنولوجيا المعلومات.",
    },
    {
      indicatorEn: "Online Purchasing (%)",
      indicatorAr: "التسوق والشراء الإلكتروني (%)",
      sourceEn: "E-Commerce Consumer Behavior Survey",
      sourceAr: "مسح سلوك المستهلك الرقمي والتجارة الإلكترونية",
      year: 2026,
      unit: "Percentage (%)",
      definitionEn: "Citizens who ordered physical goods or food via apps/social commerce within the past 90 days.",
      definitionAr: "نسبة المواطنين الذين طلبوا سلعاً مادية أو طعاماً عبر التطبيقات أو السوشيال ميديا خلال 90 يوماً.",
    },
    {
      indicatorEn: "Digital Payments (%)",
      indicatorAr: "المدفوعات الرقمية والمحافظ (%)",
      sourceEn: "Central Bank of Iraq (CBI) & Payment System Reports",
      sourceAr: "البنك المركزي العراقي وتقارير نظم الدفع والمحافظ",
      year: 2026,
      unit: "Percentage (%)",
      definitionEn: "Active users of e-wallets (ZainCash, Qi, FastPay) or bank cards for non-cash retail payments.",
      definitionAr: "مستخدمو المحافظ الإلكترونية والبطاقات المصرفية لإتمام مشتريات وسداد فواتير غير نقدية.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {isAr ? "مصادر البيانات ومنهجية المؤشرات" : "Data Sources & Indicator Methodology"}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? "شفافية كاملة: تعريف كل مؤشر ومصدر البيانات وسنة الجمع"
                  : "Full auditability: Definitions, official source references, and survey years"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Notice Banner */}
        <div className="p-4 mx-5 my-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">
              {isAr ? "تنويه الشفافية والبيانات التجريبية:" : "Transparency Notice:"}
            </p>
            <p className="mt-0.5 text-amber-800">
              {isAr
                ? "هذه المؤشرات الحالية مصنفة كـ (Demo Data) تم إعدادها بالاستناد إلى معايير المسوح الوطنية لتمثيل النموذج الأولي. النظام مصمم لربط وتحديث بيانات المسح الحقيقي للمحافظات في أي وقت."
                : "The current figures are classified as (Demo Data) modeled on national statistical frameworks for demonstration. The system is architected to ingest verified survey datasets at any time."}
            </p>
          </div>
        </div>

        {/* Table of Sources */}
        <div className="p-5 pt-0 overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">{isAr ? "المؤشر" : "Indicator"}</th>
                <th className="p-3">{isAr ? "الوحدة" : "Unit"}</th>
                <th className="p-3">{isAr ? "المصدر الرسمي" : "Source"}</th>
                <th className="p-3">{isAr ? "السنة" : "Year"}</th>
                <th className="p-3">{isAr ? "التعريف المنهجي" : "Definition"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {dataSourcesList.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3 font-bold text-slate-900">
                    {isAr ? item.indicatorAr : item.indicatorEn}
                  </td>
                  <td className="p-3 text-slate-600 font-mono">{item.unit}</td>
                  <td className="p-3 text-slate-700">{isAr ? item.sourceAr : item.sourceEn}</td>
                  <td className="p-3 font-semibold text-indigo-600">{item.year}</td>
                  <td className="p-3 text-slate-600 max-w-xs leading-relaxed">
                    {isAr ? item.definitionAr : item.definitionEn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            {isAr ? "البيانات قابلة للتحديث والاستيراد (CSV / JSON)" : "Extensible via CSV/JSON Ingestion"}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            {isAr ? "فهمت" : "Got it"}
          </button>
        </div>
      </div>
    </div>
  );
};
