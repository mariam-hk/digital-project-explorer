export type TopicId =
  | "all"
  | "internet"
  | "smartphones"
  | "computers"
  | "skills"
  | "shopping"
  | "payments";

export interface TopicInfo {
  id: TopicId;
  nameEn: string;
  nameAr: string;
  icon: string;
  descriptionEn: string;
  descriptionAr: string;
}

export interface IndicatorData {
  id: string;
  topicId: TopicId;
  nameEn: string;
  nameAr: string;
  icon: string;
  value: number; // Percentage 0-100
  nationalAverage: number;
  unit: string;
  sourceEn: string;
  sourceAr: string;
  year: number;
  isDemo: boolean;
  benchmarkDelta: number; // value - nationalAverage
  tier: "very_high" | "high" | "moderate" | "developing";
}

export interface LocationProfile {
  id: string;
  nameEn: string;
  nameAr: string;
  regionEn: string;
  regionAr: string;
  population: number;
  urbanPct: number;
  youthDemographicPct: number; // 15-34 years
  isNationalAverage?: boolean;
  indicators: {
    smartphones: number;
    internet: number;
    computers: number;
    skills: number;
    shopping: number;
    payments: number;
  };
}

export interface AIInterpretation {
  headlineEn: string;
  headlineAr: string;
  summaryEn: string;
  summaryAr: string;
  opportunitiesEn: string[];
  opportunitiesAr: string[];
  risksEn: string[];
  risksAr: string[];
  recommendedTechEn: string[];
  recommendedTechAr: string[];
}
