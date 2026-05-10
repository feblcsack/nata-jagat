import {
  BentangKidang,
  KalenderBaduy,
  BMKGWeatherData,
  SyncAnalysis,
  PlantingRecommendation,
  RecommendationStatus,
} from "@/types";

/**
 * DECISION ENGINE — JANTUNG SISTEM NATA JAGAT
 *
 * Menggabungkan pengetahuan tradisional Baduy dengan data modern BMKG
 * untuk menghasilkan rekomendasi musim tanam yang akurat dan kontekstual.
 *
 * Rule-based system (bukan AI) — lebih stabil, transparan, dan dapat dijelaskan.
 */

interface RuleContext {
  bentang: BentangKidang;
  kalender: KalenderBaduy;
  weather: BMKGWeatherData;
}

// ============================================================
// SCORING FUNCTIONS
// ============================================================

function scoreTraditional(bentang: BentangKidang): number {
  const phaseScores: Record<string, number> = {
    "Kidang Puncak": 95,
    "Kidang Muncul": 80,
    "Kidang Turun": 60,
    "Bintang Waluku": 40,
    "Luhur Langit": 50,
    "Gelap Langit": 10,
  };

  const seasonScores: Record<string, number> = {
    "Mangsa Tandur": 100,
    "Mangsa Tumbuh": 60,
    "Mangsa Panen": 30,
    "Mangsa Ngaso": 10,
  };

  const riskAdjustment: Record<string, number> = {
    Aman: 0,
    Waspada: -15,
    Tunda: -50,
  };

  const phaseScore = phaseScores[bentang.phase] ?? 50;
  const seasonScore = seasonScores[bentang.traditionalSeason] ?? 50;
  const adjustment = riskAdjustment[bentang.riskLevel] ?? 0;

  return Math.max(0, Math.min(100, (phaseScore + seasonScore) / 2 + adjustment));
}

function scoreModern(weather: BMKGWeatherData): number {
  let score = 70; // Base score

  const rainfall = weather.current.rainfall;
  const humidity = weather.current.humidity;
  const temp = weather.current.temperature;

  // Rainfall scoring (optimal: 10-25mm)
  if (rainfall === 0) score -= 20; // Too dry
  else if (rainfall < 5) score -= 5;
  else if (rainfall <= 25) score += 20; // Ideal
  else if (rainfall <= 50) score -= 10; // Getting heavy
  else score -= 30; // Flooding risk

  // Humidity scoring (optimal: 70-85%)
  if (humidity < 60) score -= 15;
  else if (humidity <= 85) score += 10;
  else score -= 5; // Too humid = disease risk

  // Temperature scoring (optimal: 25-32°C for rice)
  if (temp < 20) score -= 20;
  else if (temp < 24) score -= 5;
  else if (temp <= 32) score += 10;
  else score -= 10;

  // Rainfall intensity penalty
  const intensityPenalty: Record<string, number> = {
    "Tidak Hujan": -15,
    Ringan: 10,
    Sedang: 5,
    Lebat: -15,
    "Sangat Lebat": -35,
  };
  score += intensityPenalty[weather.rainfallIntensity] ?? 0;

  return Math.max(0, Math.min(100, score));
}

// ============================================================
// RECOMMENDATION RULES
// ============================================================

function applyRules(ctx: RuleContext): PlantingRecommendation {
  const { bentang, kalender, weather } = ctx;
  const traditionalScore = scoreTraditional(bentang);
  const modernScore = scoreModern(weather);
  const combinedScore = Math.round(traditionalScore * 0.45 + modernScore * 0.55);

  // RULE 1: Pantang Gelap Langit — OVERRIDE semua kondisi modern
  if (bentang.phase === "Gelap Langit" || bentang.riskLevel === "Tunda") {
    return buildRecommendation({
      status: "DILARANG",
      title: "Masa Pantang — Tunda Semua Aktivitas Tanam",
      message:
        "Tradisi Baduy melarang keras pembukaan lahan baru di masa Gelap Langit. Bintang penanda tanam belum muncul — tanah masih perlu beristirahat.",
      details: [
        "Fase Gelap Langit adalah masa pantang dalam kalender Baduy",
        "Membuka lahan baru di masa ini diyakini membawa gagal panen",
        "Fokus pada perawatan lahan dan persiapan benih",
        `Curah hujan saat ini: ${weather.current.rainfall}mm — kondisi cuaca: ${weather.current.weatherDesc}`,
      ],
      traditionalBasis: bentang.farmingGuidance,
      modernBasis: `Data BMKG menunjukkan curah hujan ${weather.rainfallIntensity.toLowerCase()} (${weather.current.rainfall}mm)`,
      confidence: 90,
      actions: kalender.prohibited,
      kalender,
      combinedScore,
    });
  }

  // RULE 2: Puncak Musim Tanam + Cuaca Mendukung
  if (
    bentang.phase === "Kidang Puncak" &&
    bentang.traditionalSeason === "Mangsa Tandur" &&
    weather.current.rainfall >= 5 &&
    weather.current.rainfall <= 30
  ) {
    return buildRecommendation({
      status: "SANGAT_BAIK",
      title: "Waktu Tanam Terbaik — Segera Tanam!",
      message:
        "Bintang Kidang berada di puncak langit dan cuaca mendukung. Ini adalah momen paling ideal untuk menanam padi sesuai kalender tradisional Baduy.",
      details: [
        `Bintang Kidang di posisi puncak (${bentang.phase}) — tanda tanam paling kuat`,
        `Curah hujan ideal: ${weather.current.rainfall}mm — optimal untuk pembenihan`,
        `Suhu ${weather.current.temperature}°C dan kelembapan ${weather.current.humidity}% — kondisi ideal padi`,
        `Kalender Baduy: ${kalender.primaryActivity}`,
      ],
      traditionalBasis: bentang.farmingGuidance,
      modernBasis: `Prakiraan BMKG: ${weather.current.weatherDesc}, curah hujan ${weather.rainfallIntensity.toLowerCase()}`,
      confidence: 92,
      actions: kalender.activities,
      kalender,
      combinedScore,
    });
  }

  // RULE 3: Musim Tanam + Curah Hujan Sangat Lebat
  if (
    bentang.traditionalSeason === "Mangsa Tandur" &&
    weather.rainfallIntensity === "Sangat Lebat"
  ) {
    return buildRecommendation({
      status: "TUNDA",
      title: "Tunda Tanam — Curah Hujan Terlalu Tinggi",
      message:
        "Meski kalender tradisional menunjukkan waktu tanam, curah hujan sangat lebat berpotensi menyebabkan genangan dan merusak bibit. Tunggu 3-5 hari.",
      details: [
        `Bintang Kidang: ${bentang.phase} — waktu tanam secara tradisional`,
        `PERINGATAN: Curah hujan ${weather.current.rainfall}mm — Sangat Lebat, risiko banjir lahan`,
        "Bibit yang baru ditanam rentan terhadap genangan",
        "Tunggu hujan mereda, lalu tanam segera",
      ],
      traditionalBasis: bentang.farmingGuidance,
      modernBasis: `BMKG: ${weather.rainfallIntensity} — ${weather.current.rainfall}mm. Risiko kerusakan bibit tinggi.`,
      confidence: 78,
      actions: [
        "Tunda penanaman 3-5 hari",
        "Perkuat saluran drainase lahan",
        "Siapkan bibit cadangan",
        "Monitor prakiraan BMKG harian",
      ],
      kalender,
      combinedScore,
    });
  }

  // RULE 4: Masa Panen + Curah Hujan Lebat
  if (
    bentang.traditionalSeason === "Mangsa Panen" &&
    (weather.rainfallIntensity === "Lebat" || weather.rainfallIntensity === "Sangat Lebat")
  ) {
    return buildRecommendation({
      status: "TUNDA",
      title: "Percepat Panen — Hujan Lebat Mengancam",
      message:
        "Masa panen tiba bersamaan dengan curah hujan tinggi. Segera panen sebelum hujan merusak gabah.",
      details: [
        `Bintang Waluku menandakan waktu panen telah tiba`,
        `Curah hujan ${weather.current.rainfall}mm — berisiko merusak padi yang sudah menguning`,
        "Padi yang terlalu lama di sawah saat hujan lebat bisa rusak",
        "Kerahkan seluruh anggota keluarga untuk panen segera",
      ],
      traditionalBasis: "Waluku di langit = segera panen sebelum bintang turun",
      modernBasis: `BMKG mendeteksi ${weather.rainfallIntensity} — ancaman nyata untuk gabah`,
      confidence: 85,
      actions: [
        "Panen segera dalam 1-2 hari",
        "Siapkan tempat penjemuran yang terlindung",
        "Minta bantuan tetangga untuk gotong royong panen",
        "Simpan gabah di tempat yang tidak bocor",
      ],
      kalender,
      combinedScore,
    });
  }

  // RULE 5: Masa Persiapan + Kemarau Panjang
  if (
    (bentang.phase === "Kidang Muncul" || bentang.phase === "Luhur Langit") &&
    weather.rainfallIntensity === "Tidak Hujan" &&
    weather.current.humidity < 65
  ) {
    return buildRecommendation({
      status: "CUKUP",
      title: "Persiapan Baik — Nantikan Hujan untuk Tanam",
      message:
        "Bintang Kidang mulai muncul — tanda persiapan tanam dimulai. Namun kemarau masih berlangsung. Manfaatkan untuk persiapan lahan dan benih.",
      details: [
        `${bentang.phase} — kalender tradisional: mulai persiapan lahan`,
        `Belum ada hujan (kelembapan ${weather.current.humidity}%) — lahan masih kering`,
        "Manfaatkan musim kering untuk olah tanah dan perbaikan irigasi",
        "Siapkan sistem tadah hujan untuk mendeteksi awal musim hujan",
      ],
      traditionalBasis: bentang.farmingGuidance,
      modernBasis: `Musim kemarau aktif. Perkiraan hujan berdasarkan data klimatologi akan turun dalam beberapa minggu.`,
      confidence: 65,
      actions: [
        "Olah tanah dan buat bedengan",
        "Perbaiki saluran irigasi",
        "Siapkan benih — seleksi benih berkualitas",
        "Buat kompos dari sisa tanaman",
        "Monitor prakiraan BMKG untuk tanda hujan",
      ],
      kalender,
      combinedScore,
    });
  }

  // RULE 6: General — berbasis skor gabungan
  if (combinedScore >= 75) {
    return buildRecommendation({
      status: "BAIK",
      title: "Kondisi Baik untuk Bertani",
      message: `Kombinasi antara ${bentang.phase} dan kondisi cuaca BMKG menunjukkan kondisi yang baik. Ikuti panduan kalender Baduy.`,
      details: [
        `Fase tradisional: ${bentang.phase} (${bentang.traditionalSeason})`,
        `Kondisi cuaca: ${weather.current.weatherDesc}`,
        `Skor sinkronisasi: ${combinedScore}/100`,
        bentang.farmingGuidance,
      ],
      traditionalBasis: bentang.farmingGuidance,
      modernBasis: `BMKG: ${weather.current.weatherDesc}, suhu ${weather.current.temperature}°C`,
      confidence: 70,
      actions: kalender.activities.slice(0, 4),
      kalender,
      combinedScore,
    });
  }

  if (combinedScore >= 50) {
    return buildRecommendation({
      status: "CUKUP",
      title: "Kondisi Cukup — Lanjutkan dengan Hati-hati",
      message:
        "Ada beberapa ketidakcocokan antara kalender tradisional dan kondisi modern. Lanjutkan aktivitas pertanian dengan waspada.",
      details: [
        `Fase tradisional: ${bentang.phase}`,
        `Perhatian cuaca: ${weather.current.weatherDesc}`,
        `Curah hujan: ${weather.current.rainfall}mm (${weather.rainfallIntensity})`,
        "Pantau kondisi lapangan secara langsung",
      ],
      traditionalBasis: bentang.farmingGuidance,
      modernBasis: `Data BMKG menunjukkan kondisi ${weather.rainfallIntensity.toLowerCase()}`,
      confidence: 55,
      actions: [
        ...kalender.activities.slice(0, 2),
        "Monitor cuaca setiap hari",
        "Siapkan rencana cadangan",
      ],
      kalender,
      combinedScore,
    });
  }

  // Default: Tunda
  return buildRecommendation({
    status: "TUNDA",
    title: "Tunda Aktivitas Tanam",
    message:
      "Kondisi tradisional dan modern tidak mendukung aktivitas tanam saat ini. Tunggu kondisi yang lebih baik.",
    details: [
      `Fase tradisional: ${bentang.phase} — ${bentang.riskLevel}`,
      `Kondisi cuaca: ${weather.rainfallIntensity}`,
      "Skor sinkronisasi terlalu rendah untuk tanam",
    ],
    traditionalBasis: bentang.farmingGuidance,
    modernBasis: `BMKG: ${weather.current.weatherDesc}`,
    confidence: 60,
    actions: ["Tunggu kondisi membaik", "Lakukan pemeliharaan lahan ringan"],
    kalender,
    combinedScore,
  });
}

// ============================================================
// BUILDER HELPER
// ============================================================

interface BuildParams {
  status: RecommendationStatus;
  title: string;
  message: string;
  details: string[];
  traditionalBasis: string;
  modernBasis: string;
  confidence: number;
  actions: string[];
  kalender: KalenderBaduy;
  combinedScore: number;
}

function buildRecommendation(params: BuildParams): PlantingRecommendation {
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + 7);

  return {
    status: params.status,
    title: params.title,
    message: params.message,
    details: params.details,
    traditionalBasis: params.traditionalBasis,
    modernBasis: params.modernBasis,
    confidence: params.confidence,
    nextReviewDate: nextReview.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    actions: params.actions,
  };
}

// ============================================================
// MAIN EXPORT
// ============================================================

export function runDecisionEngine(
  bentang: BentangKidang,
  kalender: KalenderBaduy,
  weather: BMKGWeatherData
): SyncAnalysis {
  const ctx: RuleContext = { bentang, kalender, weather };

  const traditionalScore = scoreTraditional(bentang);
  const modernScore = scoreModern(weather);
  const syncScore = Math.round(traditionalScore * 0.45 + modernScore * 0.55);

  const recommendation = applyRules(ctx);

  // Determine if traditional and modern are aligned
  const isSynced = Math.abs(traditionalScore - modernScore) < 30;

  let conflictNote: string | undefined;
  if (!isSynced) {
    if (traditionalScore > modernScore) {
      conflictNote =
        "Kalender tradisional mendukung tanam, namun kondisi cuaca modern perlu diwaspadai.";
    } else {
      conflictNote =
        "Cuaca modern mendukung, namun kalender tradisional menyarankan kehati-hatian.";
    }
  }

  return {
    isSynced,
    syncScore,
    traditionalSays: `${bentang.phase} — ${bentang.traditionalSeason}`,
    modernSays: `${weather.current.weatherDesc}, Curah Hujan ${weather.rainfallIntensity}`,
    conflictNote,
    recommendation,
  };
}
