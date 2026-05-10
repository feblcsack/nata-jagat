"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WeatherCard from "@/components/WeatherCard";
import BentangKidangCard from "@/components/BentangKidangCard";
import KalenderBaduyCard from "@/components/KalenderBaduyCard";
import RecommendationCard from "@/components/RecommendationCard";
import RainfallChart from "@/components/charts/RainfallChart";
import LocationSelector from "@/components/LocationSelector";
import { PredictionResponse } from "@/types";
import { RefreshCw, Calendar, AlertCircle } from "lucide-react";

const MONTHS_ID = [
  { value: 1, label: "Januari" }, { value: 2, label: "Februari" },
  { value: 3, label: "Maret" }, { value: 4, label: "April" },
  { value: 5, label: "Mei" }, { value: 6, label: "Juni" },
  { value: 7, label: "Juli" }, { value: 8, label: "Agustus" },
  { value: 9, label: "September" }, { value: 10, label: "Oktober" },
  { value: 11, label: "November" }, { value: 12, label: "Desember" },
];

export default function PrediksiPage() {
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedLocation, setSelectedLocation] = useState("lebak");
  const [data, setData] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchPrediction = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/prediction?month=${selectedMonth}&location=${selectedLocation}`
      );
      if (!res.ok) throw new Error("Gagal mengambil data prediksi");
      const json: PredictionResponse = await res.json();
      setData(json);

      // Check if weather is from fallback
      const weatherRes = await fetch(`/api/weather?location=${selectedLocation}`);
      const weatherJson = await weatherRes.json();
      setIsFallback(weatherJson.source === "fallback");
      setLastUpdated(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
    } catch (err) {
      setError("Tidak dapat memuat data. Periksa koneksi internet Anda.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedMonth, selectedLocation]);

  useEffect(() => {
    fetchPrediction();
  }, [fetchPrediction]);

  return (
    <main className="min-h-screen bg-cream bg-organic">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Page header */}
        <div className="mb-8">
          <p className="text-forest-500 text-sm font-medium uppercase tracking-wider mb-2">
            Dashboard
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 mb-2">
            Prediksi Musim Tanam
          </h1>
          <p className="text-forest-600 text-sm max-w-xl">
            Sinkronisasi pengetahuan tradisional Baduy dengan data cuaca BMKG 
            untuk rekomendasi tanam yang akurat.
          </p>
        </div>

        {/* Controls */}
        <div className="card-nature rounded-2xl p-4 mb-6 flex flex-wrap items-center gap-4 justify-between">
          <div className="flex flex-wrap items-center gap-4">
            {/* Month selector */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-forest-500" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="text-sm text-forest-700 bg-transparent border-0 outline-none cursor-pointer font-medium"
              >
                {MONTHS_ID.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label} {m.value === currentMonth ? "(Bulan Ini)" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-px h-5 bg-forest-200" />

            {/* Location selector */}
            <LocationSelector
              selectedId={selectedLocation}
              onChange={setSelectedLocation}
            />
          </div>

          <div className="flex items-center gap-3">
            {lastUpdated && (
              <p className="text-xs text-forest-400">
                Update: {lastUpdated}
                {isFallback && " · ⚠️ Estimasi"}
              </p>
            )}
            <button
              onClick={fetchPrediction}
              disabled={isLoading}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-forest-600 text-white rounded-lg hover:bg-forest-500 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Fallback warning */}
        {isFallback && !isLoading && (
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl px-4 py-3 mb-6 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            Data cuaca menggunakan estimasi klimatologi. API BMKG mungkin sedang tidak tersedia.
          </div>
        )}

        {/* MAIN CONTENT GRID */}
        {isLoading ? (
          <LoadingGrid />
        ) : data ? (
          <div className="space-y-6">
            {/* Top row: Recommendation (full width) */}
            <RecommendationCard analysis={data.analysis} />

            {/* Second row: 3 cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <WeatherCard
                weather={data.weather}
                isFallback={isFallback}
              />
              <BentangKidangCard data={data.bentangKidang} />
              <KalenderBaduyCard data={data.kalenderBaduy} />
            </div>

            {/* Third row: Chart */}
            {data.weather.forecast.length > 0 && (
              <RainfallChart
                forecast={data.weather.forecast}
                bentang={data.bentangKidang}
              />
            )}

            {/* Bottom info */}
            <div className="card-nature rounded-2xl p-5">
              <p className="text-xs font-semibold text-forest-700 mb-2 uppercase tracking-wider">
                Tentang Rekomendasi Ini
              </p>
              <p className="text-xs text-forest-500 leading-relaxed">
                Rekomendasi dihasilkan oleh <strong>Decision Engine rule-based</strong> yang 
                menggabungkan fase Bentang Kidang (bobot 45%) dan kondisi cuaca BMKG (bobot 55%). 
                Sistem ini bukan AI — setiap keputusan dapat dijelaskan secara transparan. 
                Data diperbarui setiap jam dari BMKG Open Data. Selalu konsultasikan dengan 
                sesepuh dan kondisi lapangan setempat sebelum memulai aktivitas pertanian.
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <Footer />
    </main>
  );
}

function LoadingGrid() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-48 bg-forest-100 rounded-2xl" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-80 bg-forest-100 rounded-2xl" />
        ))}
      </div>
      <div className="h-64 bg-forest-100 rounded-2xl" />
    </div>
  );
}
