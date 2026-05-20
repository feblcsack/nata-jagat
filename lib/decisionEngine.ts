import {
  BentangKidang,
  KalenderBaduy,
  BMKGWeatherData,
  SyncAnalysis,
  PlantingRecommendation,
  RecommendationStatus,
} from "@/types";

// ─── EXTENDED ANALYSIS TYPES ───────────────────────────────

export interface RiskFactor {
  factor: string;
  level: "low" | "medium" | "high" | "critical";
  description: string;
  weight: number;
}

export interface ConfidenceInterval {
  lower: number;
  upper: number;
  label: string;
}

export interface EnhancedSyncAnalysis extends SyncAnalysis {
  traditionalScore: number;
  modernScore: number;
  riskFactors: RiskFactor[];
  confidence: ConfidenceInterval;
  weeklyOutlook: WeeklyOutlook[];
  alerts: PlantingAlert[];
  optimalWindow: OptimalWindow | null;
}

export interface WeeklyOutlook {
  week: number;
  label: string;
  score: number;
  status: RecommendationStatus;
  note: string;
}

export interface PlantingAlert {
  type: "warning" | "danger" | "info" | "success";
  title: string;
  message: string;
}

export interface OptimalWindow {
  startWeek: number;
  endWeek: number;
  description: string;
  probability: number;
}

interface RuleContext {
  bentang: BentangKidang;
  kalender: KalenderBaduy;
  weather: BMKGWeatherData;
}

// ─── MULTI-FACTOR TRADITIONAL SCORING ─────────────────────

function scoreTraditional(bentang: BentangKidang): number {
  // Phase score — primary signal
  const phaseScore: Record<string, number> = {
    "Kidang Puncak":  95,
    "Kidang Muncul":  78,
    "Kidang Turun":   58,
    "Bintang Waluku": 38,
    "Luhur Langit":   48,
    "Gelap Langit":   8,
  };

  // Season score — contextual weight
  const seasonScore: Record<string, number> = {
    "Mangsa Tandur": 100,
    "Mangsa Tumbuh": 58,
    "Mangsa Panen":  28,
    "Mangsa Ngaso":  8,
  };

  // Risk modifier
  const riskMod: Record<string, number> = {
    Aman:    0,
    Waspada: -18,
    Tunda:   -55,
  };

  const p = phaseScore[bentang.phase] ?? 50;
  const s = seasonScore[bentang.traditionalSeason] ?? 50;
  const r = riskMod[bentang.riskLevel] ?? 0;

  // Weighted: phase 60%, season 40%
  return Math.max(0, Math.min(100, p * 0.6 + s * 0.4 + r));
}

// ─── MULTI-FACTOR MODERN SCORING ──────────────────────────

function scoreModern(weather: BMKGWeatherData): number {
  const { rainfall, humidity, temperature: temp, windSpeed } = weather.current;

  // ── Rainfall (0-35 pts) ────────────────────────────────
  let rainfallScore = 0;
  if (rainfall === 0)         rainfallScore = 5;   // Kering
  else if (rainfall < 5)     rainfallScore = 15;   // Sangat ringan
  else if (rainfall <= 15)   rainfallScore = 35;   // Ideal ringan
  else if (rainfall <= 25)   rainfallScore = 30;   // Ideal sedang
  else if (rainfall <= 40)   rainfallScore = 18;   // Mulai berat
  else if (rainfall <= 60)   rainfallScore = 8;    // Lebat
  else                        rainfallScore = 2;    // Sangat lebat

  // ── Temperature (0-25 pts) ─────────────────────────────
  let tempScore = 0;
  if (temp < 18)              tempScore = 2;   // Terlalu dingin
  else if (temp < 22)         tempScore = 10;
  else if (temp <= 28)        tempScore = 25;  // Optimal padi
  else if (temp <= 33)        tempScore = 18;
  else if (temp <= 36)        tempScore = 8;
  else                        tempScore = 2;   // Terlalu panas

  // ── Humidity (0-25 pts) ────────────────────────────────
  let humidScore = 0;
  if (humidity < 50)          humidScore = 5;
  else if (humidity < 65)     humidScore = 12;
  else if (humidity <= 80)    humidScore = 25;  // Optimal
  else if (humidity <= 88)    humidScore = 18;
  else                        humidScore = 10;  // Terlalu lembap = jamur

  // ── Wind (0-10 pts) ────────────────────────────────────
  let windScore = 0;
  if (windSpeed < 5)          windScore = 10;
  else if (windSpeed < 20)    windScore = 8;
  else if (windSpeed < 35)    windScore = 4;
  else                        windScore = 1;

  // ── Forecast consistency (0-5 pts) ────────────────────
  let forecastBonus = 0;
  if (weather.forecast.length >= 3) {
    const avgForecastRain = weather.forecast
      .slice(0, 3)
      .reduce((s, f) => s + f.rainfall, 0) / 3;
    if (avgForecastRain > 5 && avgForecastRain < 30) forecastBonus = 5;
    else if (avgForecastRain >= 30)                   forecastBonus = -5;
  }

  const total = rainfallScore + tempScore + humidScore + windScore + forecastBonus;
  return Math.max(0, Math.min(100, total));
}

// ─── RISK FACTORS ─────────────────────────────────────────

function analyzeRiskFactors(ctx: RuleContext): RiskFactor[] {
  const { bentang, weather } = ctx;
  const risks: RiskFactor[] = [];
  const { rainfall, humidity, temperature, windSpeed } = weather.current;

  // Flood risk
  if (rainfall > 50 || weather.rainfallIntensity === "Sangat Lebat") {
    risks.push({
      factor: "Risiko Banjir Lahan",
      level: rainfall > 80 ? "critical" : "high",
      description: `Curah hujan ${rainfall}mm berpotensi menggenangi lahan dan merusak bibit`,
      weight: 0.9,
    });
  } else if (rainfall > 30) {
    risks.push({
      factor: "Curah Hujan Tinggi",
      level: "medium",
      description: `${rainfall}mm — perlu pastikan drainase lahan berfungsi baik`,
      weight: 0.5,
    });
  }

  // Drought risk
  if (rainfall === 0 && humidity < 65) {
    risks.push({
      factor: "Risiko Kekeringan",
      level: humidity < 50 ? "high" : "medium",
      description: "Tidak ada hujan dan kelembapan rendah — lahan butuh irigasi tambahan",
      weight: 0.7,
    });
  }

  // Disease risk (high humidity)
  if (humidity > 88) {
    risks.push({
      factor: "Risiko Penyakit Tanaman",
      level: "medium",
      description: `Kelembapan ${humidity}% terlalu tinggi — rentan blast dan busuk batang`,
      weight: 0.6,
    });
  }

  // Heat stress
  if (temperature > 34) {
    risks.push({
      factor: "Cekaman Panas",
      level: temperature > 37 ? "high" : "medium",
      description: `Suhu ${temperature}°C dapat mengganggu pembungaan dan pengisian gabah`,
      weight: 0.65,
    });
  }

  // Cold stress
  if (temperature < 20) {
    risks.push({
      factor: "Cekaman Dingin",
      level: "medium",
      description: `Suhu ${temperature}°C di bawah optimal — perkecambahan lambat`,
      weight: 0.55,
    });
  }

  // Wind
  if (windSpeed > 35) {
    risks.push({
      factor: "Angin Kencang",
      level: "medium",
      description: `${windSpeed} km/h dapat merobohkan tanaman padi yang sudah tinggi`,
      weight: 0.45,
    });
  }

  // Traditional pantang
  if (bentang.phase === "Gelap Langit") {
    risks.push({
      factor: "Masa Pantang Baduy",
      level: "critical",
      description: "Gelap Langit — pantang keras membuka lahan baru menurut kalender Baduy",
      weight: 1.0,
    });
  } else if (bentang.riskLevel === "Waspada") {
    risks.push({
      factor: "Peringatan Kalender Tradisional",
      level: "medium",
      description: `${bentang.phase} — ${bentang.farmingGuidance}`,
      weight: 0.6,
    });
  }

  return risks.sort((a, b) => b.weight - a.weight);
}

// ─── CONFIDENCE INTERVAL ──────────────────────────────────

function calcConfidence(
  traditionalScore: number,
  modernScore: number,
  riskFactors: RiskFactor[]
): ConfidenceInterval {
  const gap = Math.abs(traditionalScore - modernScore);
  const criticalRisks = riskFactors.filter((r) => r.level === "critical").length;
  const highRisks = riskFactors.filter((r) => r.level === "high").length;

  // Base uncertainty from gap between systems
  let uncertainty = gap * 0.3;
  uncertainty += criticalRisks * 12;
  uncertainty += highRisks * 6;
  uncertainty = Math.min(uncertainty, 30);

  const combined = Math.round(traditionalScore * 0.45 + modernScore * 0.55);
  const lower = Math.max(0, Math.round(combined - uncertainty));
  const upper = Math.min(100, Math.round(combined + uncertainty * 0.5));

  let label: string;
  if (uncertainty < 8)        label = "Sangat Yakin";
  else if (uncertainty < 15)  label = "Cukup Yakin";
  else if (uncertainty < 22)  label = "Perlu Dikonfirmasi";
  else                         label = "Ketidakpastian Tinggi";

  return { lower, upper, label };
}

// ─── WEEKLY OUTLOOK ────────────────────────────────────────

function buildWeeklyOutlook(
  ctx: RuleContext,
  baseScore: number
): WeeklyOutlook[] {
  const { weather } = ctx;

  return Array.from({ length: 4 }, (_, i) => {
    const week = i + 1;
    // Simulate forecast degradation / recovery
    const forecastRain = weather.forecast[Math.min(i * 2, weather.forecast.length - 1)]?.rainfall ?? 10;
    let weekScore = baseScore;

    if (forecastRain > 40) weekScore -= 15;
    else if (forecastRain > 25) weekScore -= 8;
    else if (forecastRain >= 8 && forecastRain <= 20) weekScore += 5;
    else if (forecastRain < 3) weekScore -= 10;

    weekScore = Math.max(0, Math.min(100, Math.round(weekScore + (Math.random() - 0.5) * 6)));

    const status: RecommendationStatus =
      weekScore >= 80 ? "SANGAT_BAIK" :
      weekScore >= 65 ? "BAIK" :
      weekScore >= 45 ? "CUKUP" :
      weekScore >= 25 ? "TUNDA" : "DILARANG";

    const notes = [
      "Fokus tanam",
      "Lanjutkan perawatan",
      "Pantau kondisi lapangan",
      "Siapkan tindakan antisipasi",
    ];

    return {
      week,
      label: `Minggu ${week}`,
      score: weekScore,
      status,
      note: forecastRain > 30
        ? `Prakiraan hujan ${Math.round(forecastRain)}mm — waspadai genangan`
        : notes[i],
    };
  });
}

// ─── ALERTS ───────────────────────────────────────────────

function generateAlerts(
  ctx: RuleContext,
  riskFactors: RiskFactor[],
  syncScore: number
): PlantingAlert[] {
  const { bentang, weather } = ctx;
  const alerts: PlantingAlert[] = [];

  // Critical risk alerts
  const critical = riskFactors.filter((r) => r.level === "critical");
  critical.forEach((r) => {
    alerts.push({ type: "danger", title: r.factor, message: r.description });
  });

  // Optimal window alert
  if (bentang.phase === "Kidang Puncak" && syncScore >= 75) {
    alerts.push({
      type: "success",
      title: "Window Tanam Optimal Aktif",
      message: "Bintang Kidang di puncak + cuaca mendukung. Ini waktu terbaik — manfaatkan 2 minggu ke depan.",
    });
  }

  // Forecast flood warning
  const maxForecastRain = Math.max(...weather.forecast.slice(0, 5).map((f) => f.rainfall));
  if (maxForecastRain > 60) {
    alerts.push({
      type: "warning",
      title: "Prakiraan Hujan Lebat 5 Hari",
      message: `BMKG memperkirakan hujan hingga ${maxForecastRain}mm dalam 5 hari ke depan. Pastikan drainase lahan siap.`,
    });
  }

  // Low sync warning
  if (Math.abs(ctx.bentang.riskLevel === "Aman" ? 80 : 40) - syncScore > 25) {
    alerts.push({
      type: "info",
      title: "Tradisi & Data Modern Berbeda",
      message: "Kalender Baduy dan data BMKG menunjukkan sinyal berbeda. Konsultasikan dengan sesepuh setempat.",
    });
  }

  return alerts;
}

// ─── OPTIMAL WINDOW ────────────────────────────────────────

function findOptimalWindow(
  weeklyOutlook: WeeklyOutlook[]
): OptimalWindow | null {
  const goodWeeks = weeklyOutlook.filter(
    (w) => w.status === "SANGAT_BAIK" || w.status === "BAIK"
  );
  if (goodWeeks.length === 0) return null;

  const startWeek = goodWeeks[0].week;
  const endWeek = goodWeeks[goodWeeks.length - 1].week;
  const avgScore = goodWeeks.reduce((s, w) => s + w.score, 0) / goodWeeks.length;

  return {
    startWeek,
    endWeek,
    description:
      goodWeeks.length === 1
        ? `Minggu ${startWeek} adalah window terbaik`
        : `Minggu ${startWeek}–${endWeek} adalah periode optimal tanam`,
    probability: Math.round(avgScore),
  };
}

// ─── RULE APPLICATION ─────────────────────────────────────

function applyRules(ctx: RuleContext): PlantingRecommendation {
  const { bentang, kalender, weather } = ctx;
  const tScore = scoreTraditional(bentang);
  const mScore = scoreModern(weather);
  const combined = Math.round(tScore * 0.45 + mScore * 0.55);

  // RULE 1: Pantang absolut
  if (bentang.phase === "Gelap Langit" || bentang.riskLevel === "Tunda") {
    return build({
      status: "DILARANG",
      title: "Masa Pantang — Hentikan Aktivitas Buka Lahan",
      message: "Gelap Langit adalah masa sakral dalam kalender Baduy. Bintang tanam belum muncul — tanah harus diistirahatkan.",
      details: [
        "Fase Gelap Langit: pantang keras membuka lahan baru",
        "Membuka lahan di masa ini diyakini membawa kegagalan panen",
        `Kondisi cuaca BMKG: ${weather.current.weatherDesc} (${weather.current.rainfall}mm)`,
        "Manfaatkan waktu untuk membuat kompos dan memperbaiki irigasi",
      ],
      traditionalBasis: bentang.farmingGuidance,
      modernBasis: `BMKG: ${weather.current.weatherDesc}, curah hujan ${weather.rainfallIntensity}`,
      confidence: 92,
      actions: kalender.prohibited.slice(0, 3),
      combined,
    });
  }

  // RULE 2: Window emas — Kidang Puncak + cuaca ideal
  if (bentang.phase === "Kidang Puncak" && weather.current.rainfall >= 5 && weather.current.rainfall <= 25
      && weather.current.temperature >= 24 && weather.current.temperature <= 32) {
    return build({
      status: "SANGAT_BAIK",
      title: "Window Emas — Waktu Tanam Terbaik!",
      message: "Kidang di zenith + cuaca optimal = momen langka. Segera tanam dalam 7–10 hari ke depan untuk hasil maksimal.",
      details: [
        `Kidang Puncak di zenith tengah malam — sinyal tanam paling kuat`,
        `Curah hujan ${weather.current.rainfall}mm — ideal untuk perkecambahan`,
        `Suhu ${weather.current.temperature}°C & kelembapan ${weather.current.humidity}% — optimal untuk padi`,
        "Aktifkan seluruh tenaga keluarga dan gotong royong",
      ],
      traditionalBasis: bentang.farmingGuidance,
      modernBasis: `BMKG: ${weather.current.weatherDesc}, ${weather.rainfallIntensity}, prakiraan stabil`,
      confidence: 93,
      actions: kalender.activities.slice(0, 4),
      combined,
    });
  }

  // RULE 3: Tandur + hujan sangat lebat
  if (bentang.traditionalSeason === "Mangsa Tandur" && weather.rainfallIntensity === "Sangat Lebat") {
    return build({
      status: "TUNDA",
      title: "Tunda 3–5 Hari — Hujan Sangat Lebat",
      message: "Kalender Baduy sudah mengijinkan tanam, tapi BMKG mendeteksi hujan sangat lebat. Bibit baru rentan tergenang.",
      details: [
        `${bentang.phase} — kalender tradisional: boleh tanam`,
        `PERINGATAN BMKG: ${weather.current.rainfall}mm — Sangat Lebat, risiko genangan`,
        "Bibit usia muda (<7 hari) sangat rentan terhadap banjir",
        "Tunda 3–5 hari, pantau prakiraan harian",
      ],
      traditionalBasis: bentang.farmingGuidance,
      modernBasis: `${weather.rainfallIntensity} (${weather.current.rainfall}mm) — risiko tinggi`,
      confidence: 80,
      actions: ["Tunda penanaman 3–5 hari", "Perkuat saluran drainase", "Siapkan bibit cadangan", "Monitor prakiraan BMKG"],
      combined,
    });
  }

  // RULE 4: Masa panen + hujan lebat
  if (bentang.traditionalSeason === "Mangsa Panen"
      && (weather.rainfallIntensity === "Lebat" || weather.rainfallIntensity === "Sangat Lebat")) {
    return build({
      status: "TUNDA",
      title: "Percepat Panen — Hujan Lebat Mengancam Gabah",
      message: "Waktu panen tiba bersamaan hujan lebat. Padi yang menguning rentan rontok dan busuk jika dibiarkan.",
      details: [
        "Bintang Waluku — sinyal panen telah tiba",
        `Hujan ${weather.current.rainfall}mm (${weather.rainfallIntensity}) mengancam kualitas gabah`,
        "Segera panen dalam 1–2 hari sebelum kondisi memburuk",
        "Siapkan terpal dan area penjemuran yang terlindung",
      ],
      traditionalBasis: "Waluku di langit = segera panen, jangan tunda",
      modernBasis: `BMKG: ${weather.rainfallIntensity} — ancaman nyata untuk gabah di lapangan`,
      confidence: 87,
      actions: ["Panen segera 1–2 hari", "Siapkan penjemuran terlindung", "Minta bantuan gotong royong", "Simpan gabah di tempat kering"],
      combined,
    });
  }

  // RULE 5: Kemarau + persiapan
  if ((bentang.phase === "Kidang Muncul" || bentang.phase === "Luhur Langit")
      && weather.rainfallIntensity === "Tidak Hujan" && weather.current.humidity < 65) {
    return build({
      status: "CUKUP",
      title: "Persiapan Lahan — Nantikan Musim Hujan",
      message: "Kidang mulai muncul — tanda persiapan dimulai. Kemarau masih berlangsung, optimal untuk olah tanah.",
      details: [
        `${bentang.phase} — fase persiapan menurut kalender Baduy`,
        `Kelembapan ${weather.current.humidity}% — kemarau aktif, lahan kering`,
        "Kondisi ideal untuk membajak dan mengolah tanah",
        "Siapkan bibit dan sistem irigasi sebelum hujan tiba",
      ],
      traditionalBasis: bentang.farmingGuidance,
      modernBasis: "Kemarau aktif — optimal untuk persiapan lahan tanpa gangguan hujan",
      confidence: 68,
      actions: ["Bajak dan olah tanah", "Perbaiki saluran irigasi", "Seleksi benih berkualitas", "Buat kompos", "Monitor prakiraan awal hujan"],
      combined,
    });
  }

  // RULE 6: Skor tinggi
  if (combined >= 72) {
    return build({
      status: "BAIK",
      title: "Kondisi Baik — Lanjutkan Rencana Tanam",
      message: `${bentang.phase} dan kondisi cuaca mendukung. Ikuti panduan kalender Baduy dengan tetap memantau BMKG.`,
      details: [
        `Fase: ${bentang.phase} (${bentang.traditionalSeason})`,
        `Cuaca: ${weather.current.weatherDesc}, ${weather.rainfallIntensity}`,
        `Skor sinkronisasi: ${combined}/100`,
        bentang.farmingGuidance,
      ],
      traditionalBasis: bentang.farmingGuidance,
      modernBasis: `BMKG: ${weather.current.weatherDesc}, suhu ${weather.current.temperature}°C`,
      confidence: 72,
      actions: kalender.activities.slice(0, 4),
      combined,
    });
  }

  if (combined >= 48) {
    return build({
      status: "CUKUP",
      title: "Kondisi Cukup — Pantau Lebih Ketat",
      message: "Ada ketidaksesuaian antara kalender tradisional dan kondisi cuaca. Lanjutkan dengan kehati-hatian.",
      details: [
        `Fase tradisional: ${bentang.phase}`,
        `Peringatan cuaca: ${weather.current.weatherDesc}`,
        `Curah hujan: ${weather.current.rainfall}mm (${weather.rainfallIntensity})`,
        "Pantau kondisi lapangan secara langsung tiap hari",
      ],
      traditionalBasis: bentang.farmingGuidance,
      modernBasis: `Kondisi ${weather.rainfallIntensity.toLowerCase()} — perlu pemantauan`,
      confidence: 58,
      actions: [...kalender.activities.slice(0, 2), "Monitor cuaca setiap hari", "Siapkan rencana cadangan"],
      combined,
    });
  }

  return build({
    status: "TUNDA",
    title: "Kondisi Kurang Mendukung — Tunda",
    message: "Sinkronisasi antara kalender Baduy dan data BMKG rendah. Tunggu kondisi lebih kondusif.",
    details: [
      `Fase: ${bentang.phase} — ${bentang.riskLevel}`,
      `Cuaca: ${weather.rainfallIntensity}`,
      `Skor rendah: ${combined}/100`,
    ],
    traditionalBasis: bentang.farmingGuidance,
    modernBasis: `BMKG: ${weather.current.weatherDesc}`,
    confidence: 62,
    actions: ["Tunggu kondisi membaik", "Lakukan pemeliharaan ringan"],
    combined,
  });
}

interface BuildParams {
  status: RecommendationStatus;
  title: string;
  message: string;
  details: string[];
  traditionalBasis: string;
  modernBasis: string;
  confidence: number;
  actions: string[];
  combined: number;
}

function build(p: BuildParams): PlantingRecommendation {
  const next = new Date();
  next.setDate(next.getDate() + 7);
  return {
    status: p.status,
    title: p.title,
    message: p.message,
    details: p.details,
    traditionalBasis: p.traditionalBasis,
    modernBasis: p.modernBasis,
    confidence: p.confidence,
    nextReviewDate: next.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
    actions: p.actions,
  };
}

// ─── MAIN EXPORT ───────────────────────────────────────────

export function runDecisionEngine(
  bentang: BentangKidang,
  kalender: KalenderBaduy,
  weather: BMKGWeatherData
): EnhancedSyncAnalysis {
  const ctx: RuleContext = { bentang, kalender, weather };

  const traditionalScore = Math.round(scoreTraditional(bentang));
  const modernScore = Math.round(scoreModern(weather));
  const syncScore = Math.round(traditionalScore * 0.45 + modernScore * 0.55);

  const riskFactors = analyzeRiskFactors(ctx);
  const confidence = calcConfidence(traditionalScore, modernScore, riskFactors);
  const recommendation = applyRules(ctx);
  const weeklyOutlook = buildWeeklyOutlook(ctx, syncScore);
  const alerts = generateAlerts(ctx, riskFactors, syncScore);
  const optimalWindow = findOptimalWindow(weeklyOutlook);

  const isSynced = Math.abs(traditionalScore - modernScore) < 28;
  let conflictNote: string | undefined;
  if (!isSynced) {
    conflictNote = traditionalScore > modernScore
      ? "Kalender Baduy lebih optimis — waspadai kondisi cuaca."
      : "Cuaca mendukung — namun hormati panduan kalender tradisional.";
  }

  return {
    isSynced,
    syncScore,
    traditionalScore,
    modernScore,
    traditionalSays: `${bentang.phase} — ${bentang.traditionalSeason}`,
    modernSays: `${weather.current.weatherDesc}, ${weather.rainfallIntensity}`,
    conflictNote,
    recommendation,
    riskFactors,
    confidence,
    weeklyOutlook,
    alerts,
    optimalWindow,
  };
}
