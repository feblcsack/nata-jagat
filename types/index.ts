// ============================================================
// TRADITIONAL KNOWLEDGE TYPES
// ============================================================

export type BentangKidangPhase =
  | "Kidang Muncul"
  | "Kidang Puncak"
  | "Kidang Turun"
  | "Bintang Waluku"
  | "Luhur Langit"
  | "Gelap Langit";

export type TraditionalSeason =
  | "Mangsa Tandur" // Planting season
  | "Mangsa Tumbuh" // Growing season
  | "Mangsa Panen" // Harvest season
  | "Mangsa Ngaso"; // Rest season

export interface BentangKidang {
  month: number; // 1-12
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

// ============================================================
// BMKG WEATHER TYPES
// ============================================================

export interface BMKGWeatherData {
  location: {
    name: string;
    lat: number;
    lon: number;
    province: string;
  };
  current: {
    temperature: number;
    humidity: number;
    rainfall: number;
    windSpeed: number;
    weatherCode: string;
    weatherDesc: string;
    weatherIcon: string;
    timestamp: string;
  };
  forecast: BMKGForecastDay[];
  rainfallIntensity: "Ringan" | "Sedang" | "Lebat" | "Sangat Lebat" | "Tidak Hujan";
  climaticCondition: "Normal" | "Di Bawah Normal" | "Di Atas Normal";
}

export interface BMKGForecastDay {
  date: string;
  dayName: string;
  maxTemp: number;
  minTemp: number;
  rainfall: number;
  humidity: number;
  weatherCode: string;
  weatherDesc: string;
}

// ============================================================
// DECISION ENGINE TYPES
// ============================================================

export type RecommendationStatus =
  | "SANGAT_BAIK"
  | "BAIK"
  | "CUKUP"
  | "TUNDA"
  | "DILARANG";

export interface PlantingRecommendation {
  status: RecommendationStatus;
  title: string;
  message: string;
  details: string[];
  traditionalBasis: string;
  modernBasis: string;
  confidence: number; // 0-100
  nextReviewDate: string;
  actions: string[];
}

export interface SyncAnalysis {
  isSynced: boolean;
  syncScore: number; // 0-100
  traditionalSays: string;
  modernSays: string;
  conflictNote?: string;
  recommendation: PlantingRecommendation;
}

// ============================================================
// API RESPONSE TYPES
// ============================================================

export interface WeatherAPIResponse {
  success: boolean;
  data?: BMKGWeatherData;
  error?: string;
  source: "bmkg" | "fallback";
  fetchedAt: string;
}

export interface PredictionRequest {
  month?: number;
  locationId?: string;
  lat?: number;
  lon?: number;
}

export interface PredictionResponse {
  bentangKidang: BentangKidang;
  kalenderBaduy: KalenderBaduy;
  weather: BMKGWeatherData;
  analysis: SyncAnalysis;
  generatedAt: string;
}
