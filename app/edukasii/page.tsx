import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { bentangKidangData } from "@/data/bentangKidang";
import { kalenderBaduyData } from "@/data/kalenderBaduy";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Sprout,
  Sun,
  CloudRain,
  MoonStar,
  Star,
  Telescope,
  Leaf,
} from "lucide-react";
import Grainient from "@/components/Grainient";
import LightRays from "@/components/LightRays";

// ── Colour tokens ──────────────────────────────────────────
const phaseConfig: Record<
  string,
  { dot: string; badge: string; icon: string; accent: string }
> = {
  "Kidang Puncak": {
    dot: "bg-forest-500",
    badge: "bg-forest-100 text-forest-700 border-forest-200",
    icon: "⭐",
    accent: "border-l-forest-500",
  },
  "Kidang Muncul": {
    dot: "bg-forest-400",
    badge: "bg-forest-50 text-forest-600 border-forest-100",
    icon: "🌟",
    accent: "border-l-forest-400",
  },
  "Kidang Turun": {
    dot: "bg-sage-500",
    badge: "bg-sage-50 text-sage-700 border-sage-100",
    icon: "✨",
    accent: "border-l-sage-500",
  },
  "Bintang Waluku": {
    dot: "bg-earth-400",
    badge: "bg-earth-50 text-earth-700 border-earth-100",
    icon: "🌾",
    accent: "border-l-earth-400",
  },
  "Luhur Langit": {
    dot: "bg-sky-500",
    badge: "bg-sky-50 text-sky-700 border-sky-100",
    icon: "🌙",
    accent: "border-l-sky-400",
  },
  "Gelap Langit": {
    dot: "bg-gray-400",
    badge: "bg-gray-100 text-gray-600 border-gray-200",
    icon: "🌑",
    accent: "border-l-gray-400",
  },
};

const riskConfig = {
  Aman: "bg-forest-100 text-forest-700 border-forest-200",
  Waspada: "bg-amber-100 text-amber-700 border-amber-200",
  Tunda: "bg-red-100 text-red-700 border-red-200",
} as const;

const riskIcon = {
  Aman: "✓",
  Waspada: "△",
  Tunda: "✕",
} as const;

// Group months by Mangsa
const mangsaGroups = [
  {
    name: "Mangsa Tandur",
    subtitle: "Musim Tanam",
    months: [6, 7, 8, 9, 10],
    icon: <Sprout className="w-5 h-5" />,
    color: "bg-forest-600",
    lightColor: "bg-forest-50",
    borderColor: "border-forest-200",
    textColor: "text-forest-700",
    progressColor: "bg-forest-400",
  },
  {
    name: "Mangsa Tumbuh",
    subtitle: "Musim Pertumbuhan",
    months: [11, 12],
    icon: <CloudRain className="w-5 h-5" />,
    color: "bg-sky-600",
    lightColor: "bg-sky-50",
    borderColor: "border-sky-200",
    textColor: "text-sky-700",
    progressColor: "bg-sky-400",
  },
  {
    name: "Mangsa Panen",
    subtitle: "Musim Panen",
    months: [1, 2],
    icon: <Sun className="w-5 h-5" />,
    color: "bg-amber-500",
    lightColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
    progressColor: "bg-amber-400",
  },
  {
    name: "Mangsa Ngaso",
    subtitle: "Musim Istirahat",
    months: [3, 4, 5],
    icon: <MoonStar className="w-5 h-5" />,
    color: "bg-gray-500",
    lightColor: "bg-gray-50",
    borderColor: "border-gray-200",
    textColor: "text-gray-600",
    progressColor: "bg-gray-400",
  },
];

export default function EdukasiPage() {
  return (
    <main className="min-h-screen bg-cream selection:bg-forest-200 selection:text-forest-900">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      {/* ── HERO DENGAN LIGHT RAYS ─────────────────────────── */}
<section className="relative overflow-hidden min-h-[600px] flex items-center justify-center pt-20 pb-20 bg-[#0d160e]">
  
  {/* Layer Background Rays (Z-0) */}
  <div className="absolute inset-0 z-0">
    <LightRays
       raysOrigin="top-center"
       raysColor="#ffffff"
       raysSpeed={0.7}
       lightSpread={0.5}
       rayLength={3}
       followMouse={true}
       mouseInfluence={0.1}
       noiseAmount={0}
       distortion={0}
       className="custom-rays, opacity-90"
       pulsating={false}
       fadeDistance={1}
       saturation={1}
    />
  </div>

  {/* Content Layer (Z-10) */}
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
    
    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 text-xs font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-md">
      <Telescope className="w-3.5 h-3.5" />
      Pusat Edukasi Astronomi Tradisional
    </div>

    <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
      Bentang
      <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-emerald-200">
        Kidang
      </span>
    </h1>

    <p className="text-emerald-50/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
      Kalender astronomi tradisional masyarakat Baduy di Kanekes yang telah memandu siklus tanam selama berabad-abad — jauh sebelum era satelit dan data BMKG.
    </p>

    {/* CTA Button yang kontras sama background gelap */}
    <Link
      href="/prediksi"
      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0d160e] font-black tracking-widest uppercase hover:bg-emerald-50 transition-all text-sm shadow-2xl"
    >
      Mulai Membaca Langit
      <ArrowRight className="w-4 h-4" />
    </Link>
  </div>
</section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

        {/* ── WHAT IS BENTANG KIDANG ───────────────────────── */}
        <section className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 text-forest-600 text-xs font-bold uppercase tracking-widest mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              Pengertian
            </div>
            <h2 className="font-serif text-4xl font-bold text-forest-900 mb-6 leading-snug">
              Apa itu{" "}
              <span className="text-forest-600">Bentang Kidang?</span>
            </h2>
            <div className="space-y-4 text-forest-700 leading-relaxed">
              <p>
                <strong className="text-forest-900">"Bentang"</strong> berarti
                hamparan langit malam, sementara{" "}
                <strong className="text-forest-900">"Kidang"</strong> adalah
                nama lokal untuk konstelasi Orion — yang siluetnya bagi
                masyarakat Baduy menyerupai kijang berlari.
              </p>
              <p>
                Posisi Kidang di langit berubah setiap bulan mengikuti rotasi
                dan revolusi Bumi. Pergeseran inilah yang dibaca sebagai
                "kalender alam" utama — menentukan waktu persiapan lahan,
                menanam, merawat, hingga memanen padi.
              </p>
              <p>
                Sistem ini bersifat holistik: mengintegrasikan pengamatan fase
                bulan, arah angin, dan perilaku satwa lokal sebagai indikator
                pendukung.
              </p>
            </div>

            {/* 6 phases quick view */}
            <div className="mt-8 grid grid-cols-2 gap-2">
              {Object.entries(phaseConfig).map(([phase, cfg]) => (
                <div
                  key={phase}
                  className="flex items-center gap-2.5 bg-white/70 border border-forest-100 rounded-xl px-3 py-2"
                >
                  <span className="text-base">{cfg.icon}</span>
                  <span className="text-xs font-semibold text-forest-800">
                    {phase}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual: star map card */}
          <div className="relative">
            <div className="bg-forest-950 rounded-3xl overflow-hidden aspect-square max-w-md mx-auto relative shadow-2xl">
              {/* Grid lines */}
              <div className="absolute inset-0 opacity-10">
                {[20, 40, 60, 80].map((p) => (
                  <div key={p}>
                    <div
                      className="absolute left-0 right-0 h-px bg-forest-400"
                      style={{ top: `${p}%` }}
                    />
                    <div
                      className="absolute top-0 bottom-0 w-px bg-forest-400"
                      style={{ left: `${p}%` }}
                    />
                  </div>
                ))}
              </div>

              {/* Orion constellation dots */}
              {[
                { x: 45, y: 20, size: 4, bright: true },   // Betelgeuse
                { x: 60, y: 22, size: 3, bright: true },   // Bellatrix
                { x: 40, y: 42, size: 5, bright: true },   // Alnilam belt
                { x: 50, y: 44, size: 5, bright: true },   // belt center
                { x: 60, y: 46, size: 5, bright: true },   // belt right
                { x: 42, y: 62, size: 3.5, bright: true }, // Saiph
                { x: 62, y: 60, size: 4, bright: true },   // Rigel
                { x: 52, y: 32, size: 2, bright: false },
                { x: 35, y: 50, size: 2, bright: false },
                { x: 68, y: 38, size: 2, bright: false },
              ].map((star, i) => (
                <div
                  key={i}
                  className={`absolute rounded-full ${star.bright ? "bg-forest-300" : "bg-forest-500/60"}`}
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    width: star.size,
                    height: star.size,
                    transform: "translate(-50%, -50%)",
                    boxShadow: star.bright
                      ? "0 0 6px 2px rgba(130,196,138,0.5)"
                      : "none",
                  }}
                />
              ))}

              {/* Belt line */}
              <svg
                className="absolute inset-0 w-full h-full opacity-30"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <line
                  x1="40" y1="44" x2="60" y2="46"
                  stroke="#82c48a" strokeWidth="0.4"
                />
                <line
                  x1="45" y1="20" x2="40" y2="42"
                  stroke="#82c48a" strokeWidth="0.3"
                />
                <line
                  x1="60" y1="22" x2="60" y2="44"
                  stroke="#82c48a" strokeWidth="0.3"
                />
                <line
                  x1="40" y1="44" x2="42" y2="62"
                  stroke="#82c48a" strokeWidth="0.3"
                />
                <line
                  x1="60" y1="46" x2="62" y2="60"
                  stroke="#82c48a" strokeWidth="0.3"
                />
              </svg>

              {/* Label */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-forest-800/80 backdrop-blur-sm border border-forest-700 rounded-xl px-4 py-3">
                  <p className="text-forest-300 text-xs font-bold uppercase tracking-wider mb-0.5">
                    Konstelasi Kidang (Orion)
                  </p>
                  <p className="text-forest-400 text-xs">
                    Posisi bintang berubah tiap bulan
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute top-4 right-4 bg-forest-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                Tradisional
              </div>
            </div>
          </div>
        </section>

        {/* ── 4 MANGSA ────────────────────────────────────── */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-earth-600 text-xs font-bold uppercase tracking-widest mb-3">
              <Leaf className="w-3.5 h-3.5" />
              Siklus Musim
            </div>
            <h2 className="font-serif text-4xl font-bold text-forest-900 mb-3">
              4 Mangsa Utama
            </h2>
            <p className="text-forest-500 max-w-xl mx-auto">
              Satu tahun pertanian Baduy dibagi menjadi empat musim yang
              masing-masing memiliki karakter dan panduan unik.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: "Mangsa Tandur",
                meaning: "Musim Tanam",
                months: "Jun – Okt",
                icon: <Sprout className="w-6 h-6" />,
                bg: "bg-forest-600",
                light: "bg-forest-50",
                border: "border-forest-200",
                text: "text-forest-700",
                desc: "Kidang muncul di langit timur. Saatnya mengolah lahan dan menanam padi.",
              },
              {
                name: "Mangsa Tumbuh",
                meaning: "Musim Pertumbuhan",
                months: "Okt – Des",
                icon: <CloudRain className="w-6 h-6" />,
                bg: "bg-sky-500",
                light: "bg-sky-50",
                border: "border-sky-200",
                text: "text-sky-700",
                desc: "Kidang di puncak. Padi tumbuh dan membutuhkan perawatan intensif.",
              },
              {
                name: "Mangsa Panen",
                meaning: "Musim Panen",
                months: "Jan – Feb",
                icon: <Sun className="w-6 h-6" />,
                bg: "bg-amber-500",
                light: "bg-amber-50",
                border: "border-amber-200",
                text: "text-amber-700",
                desc: "Waluku bersinar terang. Tanda alam untuk segera memanen.",
              },
              {
                name: "Mangsa Ngaso",
                meaning: "Musim Istirahat",
                months: "Mar – Mei",
                icon: <MoonStar className="w-6 h-6" />,
                bg: "bg-slate-600",
                light: "bg-slate-50",
                border: "border-slate-200",
                text: "text-slate-600",
                desc: "Gelap Langit. Tanah diistirahatkan, tidak boleh membuka lahan baru.",
              },
            ].map((m) => (
              <div
                key={m.name}
                className={`group ${m.light} ${m.border} border rounded-2xl p-6 hover:shadow-md transition-all hover:-translate-y-0.5`}
              >
                <div
                  className={`w-12 h-12 ${m.bg} rounded-2xl flex items-center justify-center text-white mb-4 shadow-sm`}
                >
                  {m.icon}
                </div>
                <div
                  className={`text-xs font-bold uppercase tracking-wider ${m.text} mb-1`}
                >
                  {m.months}
                </div>
                <h3 className="font-serif text-lg font-bold text-forest-900 mb-1">
                  {m.name}
                </h3>
                <p className={`text-xs font-medium ${m.text} mb-3`}>
                  {m.meaning}
                </p>
                <p className="text-sm text-forest-600 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 12-MONTH CALENDAR — grouped by Mangsa ──────── */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-baseline gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-forest-600 text-xs font-bold uppercase tracking-widest mb-2">
                <Star className="w-3.5 h-3.5" />
                Kalender Lengkap
              </div>
              <h2 className="font-serif text-4xl font-bold text-forest-900">
                Siklus 12 Bulan Bentang Kidang
              </h2>
            </div>
            <p className="text-sm text-forest-400 shrink-0">
              Panduan spesifik per bulan
            </p>
          </div>

          <div className="space-y-14">
            {mangsaGroups.map((group) => {
              const months = group.months
                .map((m) => bentangKidangData.find((b) => b.month === m))
                .filter(Boolean) as typeof bentangKidangData;
              const kalenders = group.months
                .map((m) => kalenderBaduyData.find((k) => k.month === m))
                .filter(Boolean) as typeof kalenderBaduyData;

              return (
                <div key={group.name}>
                  {/* Mangsa header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`flex items-center gap-3 ${group.color} text-white px-5 py-2.5 rounded-2xl shadow-sm`}
                    >
                      {group.icon}
                      <div>
                        <p className="font-bold text-sm leading-tight">
                          {group.name}
                        </p>
                        <p className="text-white/70 text-xs">{group.subtitle}</p>
                      </div>
                    </div>

                    {/* Timeline dots — desktop */}
                    <div className="hidden sm:flex items-center gap-0 flex-1">
                      <div className="h-px flex-1 bg-forest-200" />
                      {months.map((item, i) => {
                        const cfg =
                          phaseConfig[item.phase] ?? phaseConfig["Gelap Langit"];
                        return (
                          <div key={i} className="flex items-center">
                            <div
                              className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${cfg.dot}`}
                            />
                            {i < months.length - 1 && (
                              <div className="h-px w-8 bg-forest-200" />
                            )}
                          </div>
                        );
                      })}
                      <div className="h-px flex-1 bg-forest-200" />
                    </div>
                  </div>

                  {/* Month cards — horizontal scroll on mobile, grid on desktop */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {months.map((item) => {
                      const kalender = kalenders.find(
                        (k) => k.month === item.month
                      );
                      const pCfg =
                        phaseConfig[item.phase] ??
                        phaseConfig["Gelap Langit"];
                      const rCfg =
                        riskConfig[item.riskLevel] ?? riskConfig["Aman"];
                      const rIcon =
                        riskIcon[item.riskLevel] ?? riskIcon["Aman"];

                      return (
                        <div
                          key={item.month}
                          className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl border-l-4 ${pCfg.accent} border border-forest-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200`}
                        >
                          {/* Risk badge */}
                          <span
                            className={`absolute top-4 right-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${rCfg}`}
                          >
                            <span className="text-[9px]">{rIcon}</span>
                            {item.riskLevel}
                          </span>

                          {/* Month number + name */}
                          <div className="mb-3">
                            <span className="text-xs font-bold text-forest-400 tracking-wider uppercase block mb-0.5">
                              Bulan {item.month}
                            </span>
                            <h3 className="font-serif text-lg font-bold text-forest-900 leading-tight">
                              {item.monthName}
                            </h3>
                          </div>

                          {/* Phase pill */}
                          <div
                            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border mb-4 ${pCfg.badge}`}
                          >
                            <span className="text-sm">{pCfg.icon}</span>
                            {item.phase}
                          </div>

                          {/* Icon row from phase */}
                          <div className="flex items-center gap-1.5 mb-3">
                            <div
                              className={`w-2 h-2 rounded-full ${pCfg.dot}`}
                            />
                            <p className="text-xs text-forest-500 leading-relaxed line-clamp-2">
                              {item.meaning}
                            </p>
                          </div>

                          <div className="border-t border-forest-100/60 pt-3 space-y-2">
                            {/* Farming guidance */}
                            <div>
                              <span className="text-[9px] font-bold text-forest-400 uppercase tracking-wider block mb-1">
                                Panduan Tani
                              </span>
                              <p className="text-xs font-medium text-forest-800 leading-relaxed line-clamp-3">
                                {item.farmingGuidance}
                              </p>
                            </div>

                            {/* Primary activity */}
                            {kalender?.primaryActivity && (
                              <div className="bg-forest-50/80 rounded-lg px-2.5 py-2">
                                <span className="text-[9px] font-bold text-forest-400 uppercase tracking-wider block mb-0.5">
                                  Aktivitas Utama
                                </span>
                                <p className="text-xs text-forest-700 font-medium leading-snug">
                                  {kalender.primaryActivity}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── DETAIL TABLE ─────────────────────────────────── */}
        <section>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 text-forest-600 text-xs font-bold uppercase tracking-widest mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              Referensi Lengkap
            </div>
            <h2 className="font-serif text-3xl font-bold text-forest-900 mb-1">
              Kalender Aktivitas Kanekes
            </h2>
            <p className="text-sm text-forest-500">
              Pemetaan detail aktivitas dan pantangan adat per bulan.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-forest-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-forest-900 text-forest-200 text-xs uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-5 py-4 whitespace-nowrap">Bulan</th>
                    <th className="px-5 py-4 whitespace-nowrap">Fase Bintang</th>
                    <th className="px-5 py-4">Aktivitas Utama</th>
                    <th className="px-5 py-4 whitespace-nowrap">Mangsa</th>
                    <th className="px-5 py-4 whitespace-nowrap">Status</th>
                    <th className="px-5 py-4">Pantangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest-50">
                  {bentangKidangData.map((item) => {
                    const kalender = kalenderBaduyData.find(
                      (k) => k.month === item.month
                    );
                    const pCfg =
                      phaseConfig[item.phase] ?? phaseConfig["Gelap Langit"];
                    const rCfg =
                      riskConfig[item.riskLevel] ?? riskConfig["Aman"];
                    return (
                      <tr
                        key={item.month}
                        className="hover:bg-forest-50/40 transition-colors group"
                      >
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-7 h-7 rounded-lg ${pCfg.dot} bg-opacity-20 flex items-center justify-center text-sm`}
                            >
                              <span>{pCfg.icon}</span>
                            </div>
                            <div>
                              <p className="font-bold text-forest-900 text-sm">
                                {item.monthName}
                              </p>
                              <p className="text-xs text-forest-400">
                                Bln {item.month}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border ${pCfg.badge}`}
                          >
                            {item.phase}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-forest-700 font-medium text-sm max-w-xs">
                          {kalender?.primaryActivity}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span className="text-xs text-forest-600 font-medium bg-forest-50 px-2.5 py-1 rounded-md border border-forest-100">
                            {item.traditionalSeason}
                          </span>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${rCfg}`}
                          >
                            {riskIcon[item.riskLevel]} {item.riskLevel}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-xs text-red-500/80 font-medium max-w-xs">
                          {kalender?.prohibited[0] && (
                            <div className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                              {kalender.prohibited[0]}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-forest-950 text-white rounded-3xl p-10 sm:p-16 text-center border border-forest-800 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-forest-500/15 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-10 w-48 h-48 bg-earth-500/10 blur-[60px] rounded-full pointer-events-none" />

          {/* Stars */}
          {[[8,25],[25,70],[50,15],[75,60],[92,30]].map(([x,y],i)=>(
            <div key={i} className="absolute w-1 h-1 bg-forest-400/50 rounded-full" style={{left:`${x}%`,top:`${y}%`}} />
          ))}

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-forest-800/60 border border-forest-700 text-forest-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">
              <Star className="w-3.5 h-3.5" />
              Coba Sekarang
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Sinkronkan dengan
              <br />
              <span className="text-forest-400">Alam Hari Ini</span>
            </h2>
            <p className="text-forest-400 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
              Lihat bagaimana prediksi Bentang Kidang selaras dengan data cuaca
              real-time BMKG untuk bulan ini.
            </p>
            <Link
              href="/prediksi"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-forest-500 text-white font-bold rounded-2xl hover:bg-forest-400 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-forest-500/20 text-sm"
            >
              Buka Dashboard Prediksi
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}