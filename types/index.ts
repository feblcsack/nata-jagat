// ─── TRADITIONAL KNOWLEDGE ────────────────────────────────

export type BentangKidangPhase =
  | "Kidang Muncul" | "Kidang Puncak" | "Kidang Turun"
  | "Bintang Waluku" | "Luhur Langit" | "Gelap Langit";

export type TraditionalSeason =
  | "Mangsa Tandur" | "Mangsa Tumbuh"
  | "Mangsa Panen"  | "Mangsa Ngaso";

export interface BentangKidang {
  month: number;
  monthName: string;
  phase: BentangKidangPhase;
  meaning: string;
  traditionalSeason: TraditionalSeason;
  lunarCycle: string;
  starPosition: string;
  farmingGuidance: string;
  riskLevel: "Aman" | "Waspada" | "Tunda";
  description: string;
}

export interface KalenderBaduy {
  month: number;
  monthName: string;
  activities: string[];
  primaryActivity: string;
  rituals: string[];
  prohibited: string[];
  recommendation: string;
}

// ─── BMKG WEATHER ─────────────────────────────────────────

export interface BMKGWeatherData {
  location: {
    name: string; lat: number; lon: number; province: string;
  };
  current: {
    temperature: number; humidity: number; rainfall: number;
    windSpeed: number; weatherCode: string; weatherDesc: string;
    weatherIcon: string; timestamp: string;
  };
  forecast: BMKGForecastDay[];
  rainfallIntensity: "Ringan" | "Sedang" | "Lebat" | "Sangat Lebat" | "Tidak Hujan";
  climaticCondition: "Normal" | "Di Bawah Normal" | "Di Atas Normal";
}

export interface BMKGForecastDay {
  date: string; dayName: string;
  maxTemp: number; minTemp: number;
  rainfall: number; humidity: number;
  weatherCode: string; weatherDesc: string;
}

// ─── DECISION ENGINE ──────────────────────────────────────

export type RecommendationStatus =
  | "SANGAT_BAIK" | "BAIK" | "CUKUP" | "TUNDA" | "DILARANG";

export interface PlantingRecommendation {
  status: RecommendationStatus;
  title: string;
  message: string;
  details: string[];
  traditionalBasis: string;
  modernBasis: string;
  confidence: number;
  nextReviewDate: string;
  actions: string[];
}

export interface SyncAnalysis {
  isSynced: boolean;
  syncScore: number;
  traditionalSays: string;
  modernSays: string;
  conflictNote?: string;
  recommendation: PlantingRecommendation;
}

// ─── API ──────────────────────────────────────────────────

export interface WeatherAPIResponse {
  success: boolean;
  data?: BMKGWeatherData;
  error?: string;
  source: "bmkg" | "fallback";
  fetchedAt: string;
}

// PredictionResponse uses SyncAnalysis as base;
// EnhancedSyncAnalysis from decisionEngine extends it
export interface PredictionResponse {
  bentangKidang: BentangKidang;
  kalenderBaduy: KalenderBaduy;
  weather: BMKGWeatherData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  analysis: any; // EnhancedSyncAnalysis at runtime
  generatedAt: string;
}
