"use client";

import { useState, useEffect, useCallback, lazy, Suspense, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import WeatherCard from "@/components/WeatherCard";
import BentangKidangCard from "@/components/BentangKidangCard";
import KalenderBaduyCard from "@/components/KalenderBaduyCard";
import RecommendationCard from "@/components/RecommendationCard";
import RainfallChart from "@/components/charts/RainfallChart";
import LocationSelector from "@/components/LocationSelector";
import { PredictionResponse } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { savePrediction } from "@/services/predictionService";
import {
  bmkgLocations,
  hitungZonaRisiko,
  ZonaRisiko,
  mapCenterByLocation,
} from "@/data/locations";
import {
  RefreshCw, Calendar, AlertCircle, Save, CheckCircle,
  MapPin, BarChart3, X, LayoutDashboard,
  Thermometer, Droplets, Wind, TrendingUp,
  CheckCircle2, ThumbsUp, AlertTriangle, Clock, Ban, ShieldAlert
} from "lucide-react";

const LeafletMap = lazy(() => import("@/components/LeafletMap"));

const MONTHS = [
  {v:1,l:"Januari"},{v:2,l:"Februari"},{v:3,l:"Maret"},{v:4,l:"April"},
  {v:5,l:"Mei"},{v:6,l:"Juni"},{v:7,l:"Juli"},{v:8,l:"Agustus"},
  {v:9,l:"September"},{v:10,l:"Oktober"},{v:11,l:"November"},{v:12,l:"Desember"},
];

type Tab = "dashboard" | "peta" | "grafik";

const TAB_CONFIG = [
  { key: "dashboard" as Tab, label: "Prediksi",   Icon: LayoutDashboard },
  { key: "peta"      as Tab, label: "Peta Risiko", Icon: MapPin },
  { key: "grafik"    as Tab, label: "Grafik",      Icon: BarChart3 },
];

// Refaktor STATUS_CFG menggunakan Icon dan warna pastel
const STATUS_CFG: Record<string, { bg: string; text: string; label: string; border: string; Icon: React.ElementType }> = {
  SANGAT_BAIK: { bg:"bg-emerald-50", text:"text-emerald-700", label:"Sangat Baik", border:"border-emerald-200", Icon: CheckCircle2 },
  BAIK:        { bg:"bg-teal-50",   text:"text-teal-700",   label:"Baik",        border:"border-teal-200", Icon: ThumbsUp },
  CUKUP:       { bg:"bg-amber-50",  text:"text-amber-700",  label:"Cukup",       border:"border-amber-200", Icon: AlertTriangle },
  TUNDA:       { bg:"bg-orange-50", text:"text-orange-700", label:"Tunda",       border:"border-orange-200", Icon: Clock },
  DILARANG:    { bg:"bg-rose-50",   text:"text-rose-700",   label:"Pantang",     border:"border-rose-200", Icon: Ban },
};

export default function PrediksiPage() {
  return <AuthGuard><PrediksiContent /></AuthGuard>;
}

function PrediksiContent() {
  const { user, profile } = useAuth();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [locationId, setLocationId] = useState("lebak");
  const [data, setData] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [updatedAt, setUpdatedAt] = useState("");
  const [saveState, setSaveState] = useState<"idle"|"saving"|"saved">("idle");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveNotes, setSaveNotes] = useState("");
  const [zonaRisiko, setZonaRisiko] = useState<ZonaRisiko[]>([]);
  const [selectedZona, setSelectedZona] = useState<ZonaRisiko | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const mapConfig = mapCenterByLocation[locationId] ?? mapCenterByLocation["lebak"];
  const mapCenter: [number, number] = [mapConfig.lat, mapConfig.lon];
  const mapZoom = mapConfig.zoom;

  useEffect(() => {
    if (profile?.lokasiFavorit) setLocationId(profile.lokasiFavorit);
  }, [profile?.lokasiFavorit]);

  useEffect(() => {
    setSelectedZona(null);
  }, [locationId]);

  const fetchData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true); 
    setError(false); 
    setSaveState("idle");

    try {
      const res = await fetch(`/api/prediction?month=${month}&location=${locationId}`, {
        signal: abortController.signal
      });
      if (!res.ok) throw new Error();
      const json: PredictionResponse = await res.json();
      
      setData(json);
      setUpdatedAt(new Date().toLocaleTimeString("id-ID", { hour:"2-digit", minute:"2-digit" }));
      
      const zona = hitungZonaRisiko(
        json.weather.current.rainfall,
        month,
        json.bentangKidang.phase,
        locationId,
      );
      setZonaRisiko(zona);
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(true);
      }
    } finally {
      if (abortControllerRef.current === abortController) {
        setLoading(false);
      }
    }
  }, [month, locationId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function confirmSave() {
    if (!user || !data) return;
    setSaveState("saving");
    try {
      await savePrediction({
        userId: user.uid,
        month,
        monthName: MONTHS.find(m => m.v === month)?.l ?? "",
        locationId,
        locationName: bmkgLocations.find(l => l.id === locationId)?.name ?? locationId,
        status: data.analysis.recommendation.status,
        syncScore: data.analysis.syncScore,
        notes: saveNotes,
        bentangPhase: data.bentangKidang.phase,
        traditionalSeason: data.bentangKidang.traditionalSeason,
        rainfall: data.weather.current.rainfall,
        temperature: data.weather.current.temperature,
      });
      setSaveState("saved"); setShowSaveModal(false); setSaveNotes("");
    } catch {
      setSaveState("idle");
    }
  }

  const sCfg = data ? STATUS_CFG[data.analysis.recommendation.status] : null;

  const zonaStats = {
    aman:    zonaRisiko.filter(z => z.risiko === "aman").length,
    waspada: zonaRisiko.filter(z => z.risiko === "waspada").length,
    bahaya:  zonaRisiko.filter(z => z.risiko === "bahaya").length,
    pantang: zonaRisiko.filter(z => z.risiko === "pantang").length,
    total:   zonaRisiko.length,
  };

  return (
    <main className="min-h-screen bg-cream bg-organic">
      <Navbar />

      {/* ── Hero strip ────────────────────────────────── */}
      <div className="pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">
                Prediksi Musim Tanam 
              </h1>
              {updatedAt && (
                <p className="text-xs text-forest-400 mt-0.5">
                  Data BMKG diperbarui: {updatedAt}
                </p>
              )}
            </div>
            {sCfg && !loading && (
              <div className={`flex items-center gap-1.5 px-4 py-2 rounded-full border ${sCfg.bg} ${sCfg.border}`}>
                <sCfg.Icon className={`w-4 h-4 ${sCfg.text}`} />
                <span className={`text-sm font-bold ${sCfg.text}`}>
                  {sCfg.label}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* ── Controls ──────────────────────────────────── */}
       {/* ── Controls (Fixed Mobile Layout) ────────────────────── */}
<div className="card-nature rounded-2xl p-4 mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-center">
  
  {/* Dropdown Bulan & Lokasi */}
  <div className="flex gap-3 lg:col-span-3">
    <div className="flex items-center gap-2 bg-white border border-forest-200 rounded-xl px-3 py-2.5 flex-1 w-1/2">
      <Calendar className="w-4 h-4 text-forest-500 flex-shrink-0" />
      <select
        value={month}
        onChange={e => setMonth(+e.target.value)}
        className="text-sm font-medium text-forest-700 bg-transparent border-0 outline-none w-full cursor-pointer"
      >
        {MONTHS.map(m => <option key={m.v} value={m.v}>{m.l}</option>)}
      </select>
    </div>

    <div className="flex items-center gap-2 bg-white border border-forest-200 rounded-xl px-3 py-2.5 flex-1 w-1/2">
      <LocationSelector selectedId={locationId} onChange={setLocationId} />
    </div>
  </div>

  {/* Tombol Aksi */}
  <div className="flex gap-2 lg:col-span-3">
    <button
      onClick={fetchData}
      disabled={loading}
      className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-forest-600 text-white rounded-xl text-sm font-semibold hover:bg-forest-500 transition-all disabled:opacity-60"
    >
      <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
      {loading ? "..." : "Cek Data"}
    </button>

    {data && saveState !== "saved" && (
      <button
        onClick={() => setShowSaveModal(true)}
        disabled={saveState !== "idle"}
        className="flex items-center justify-center px-4 py-2.5 border-2 border-forest-300 text-forest-700 rounded-xl text-sm font-semibold hover:bg-forest-50 transition-all"
      >
        <Save className="w-4 h-4 sm:mr-2" />
        <span className="hidden sm:inline">Simpan</span>
      </button>
    )}
  </div>
</div>

        {error && (
          <div className="flex gap-2 items-center bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 mb-5 text-sm font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            Koneksi gagal — menampilkan data estimasi
          </div>
        )}

        {/* ── Tabs ──────────────────────────────────────── */}
        <div className="flex bg-forest-100/50 p-1 rounded-xl mb-5 gap-1">
          {TAB_CONFIG.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                tab === key
                  ? "bg-white text-forest-800 shadow-sm"
                  : "text-forest-500 hover:text-forest-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{label.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* ── Loading skeleton ──────────────────────────── */}
        {loading && (
          <div className="space-y-4 animate-pulse">
            <div className="h-48 bg-forest-100/60 rounded-2xl" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="h-40 bg-forest-100/60 rounded-2xl" />
              <div className="h-40 bg-forest-100/60 rounded-2xl" />
              <div className="h-40 bg-forest-100/60 rounded-2xl" />
            </div>
          </div>
        )}

        {/* ── TAB: PREDIKSI ─────────────────────────────── */}
        {!loading && data && tab === "dashboard" && (
          <div className="space-y-4">
            <RecommendationCard
              analysis={data.analysis}
              onSave={() => setShowSaveModal(true)}
              isSaved={saveState === "saved"}
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <WeatherCard weather={data.weather} />
              <BentangKidangCard bentang={data.bentangKidang} />
              <KalenderBaduyCard kalender={data.kalenderBaduy} />
            </div>
          </div>
        )}

        {/* ── TAB: PETA ─────────────────────────────────── */}
        {!loading && tab === "peta" && (
          <div className="space-y-4">

            {/* Summary card — sync score + cuaca ringkas */}
            {data && (
              <div className="card-nature rounded-2xl p-4 sm:p-5">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex-1 min-w-[180px]">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-forest-500" />
                      <span className="text-xs font-bold text-forest-500 uppercase tracking-wider">
                        {bmkgLocations.find(l => l.id === locationId)?.name ?? locationId}
                      </span>
                    </div>
                    <p className="font-bold text-forest-900 text-lg leading-tight">
                      {data.analysis.recommendation.title}
                    </p>
                    <p className="text-xs text-forest-500 mt-0.5">{data.bentangKidang.phase} · {data.bentangKidang.traditionalSeason}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="relative w-16 h-16">
                        <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e7f0e7" strokeWidth="3" />
                          <circle
                            cx="18" cy="18" r="15.9" fill="none"
                            stroke={data.analysis.syncScore >= 70 ? "#10b981" : data.analysis.syncScore >= 45 ? "#f59e0b" : "#f43f5e"}
                            strokeWidth="3"
                            strokeDasharray={`${data.analysis.syncScore} 100`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-black text-sm text-forest-900">{data.analysis.syncScore}</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-forest-400 mt-0.5 font-medium">Sinkronisasi</p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <Thermometer className="w-3.5 h-3.5 text-orange-400" />
                        <span className="text-sm font-semibold text-forest-800">{data.weather.current.temperature}°C</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Droplets className="w-3.5 h-3.5 text-sky-400" />
                        <span className="text-sm font-semibold text-forest-800">{data.weather.current.humidity}%</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Droplets className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-sm font-semibold text-forest-800">{data.weather.current.rainfall}mm</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Wind className="w-3.5 h-3.5 text-forest-400" />
                        <span className="text-sm font-semibold text-forest-800">{data.weather.current.windSpeed}km/h</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {[
                      { key:"aman",    color:"text-emerald-700", bg:"bg-emerald-50", Icon: CheckCircle2, count:zonaStats.aman    },
                      { key:"waspada", color:"text-amber-700", bg:"bg-amber-50", Icon: AlertTriangle, count:zonaStats.waspada },
                      { key:"bahaya",  color:"text-rose-700", bg:"bg-rose-50", Icon: ShieldAlert, count:zonaStats.bahaya  },
                      { key:"pantang", color:"text-purple-700", bg:"bg-purple-50", Icon: Ban, count:zonaStats.pantang },
                    ].map(({ key, color, bg, Icon, count }) => count > 0 && (
                      <div key={key} className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-md ${bg}`}>
                        <Icon className={`w-3.5 h-3.5 ${color}`} />
                        <span className={`font-bold ${color}`}>{count}</span>
                      </div>
                    ))}
                    <span className="text-xs text-forest-400 self-center ml-1">/ {zonaStats.total} kec.</span>
                  </div>
                </div>

                {data.analysis.conflictNote && (
                  <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
                    <TrendingUp className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 font-medium">{data.analysis.conflictNote}</p>
                  </div>
                )}
              </div>
            )}

            {/* Map */}
            <div className="card-nature rounded-2xl p-4 sm:p-5">
              <div className="mb-3">
                <p className="text-xs font-bold text-forest-500 uppercase tracking-wider mb-1">Peta Zona Risiko</p>
                <h2 className="text-lg font-bold text-forest-900">
                  {bmkgLocations.find(l => l.id === locationId)?.name ?? "Lokasi Terpilih"}
                </h2>
                <p className="text-sm text-forest-500 mt-0.5">
                  Klik zona untuk detail · Toggle filter untuk fokus kategori tertentu.
                </p>
              </div>
              <Suspense fallback={
                <div className="h-[460px] bg-forest-50 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-forest-200 border-t-forest-600 rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-sm text-forest-500">Memuat peta...</p>
                  </div>
                </div>
              }>
                {/* Fix Type Error: locationId dihapus karena ngga didefinisikan di interface Props LeafletMap */}
                <LeafletMap
                  zonaRisiko={zonaRisiko}
                  onKecamatanClick={z => setSelectedZona(z)}
                  center={mapCenter}
                  zoom={mapZoom}
                />
              </Suspense>
            </div>

            {/* Selected zona detail */}
            {selectedZona && (
              <div
                className="card-nature rounded-2xl p-4 border-l-4 transition-all"
                style={{
                  borderLeftColor: {
                    aman: "#10b981", waspada: "#f59e0b",
                    bahaya: "#f43f5e", pantang: "#a855f7",
                  }[selectedZona.risiko],
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-xs font-bold text-forest-500 uppercase tracking-wider mb-1">
                      Detail Zona Terpilih
                    </p>
                    <p className="font-bold text-forest-900 text-lg">{selectedZona.nama}</p>
                    <p className="text-sm text-forest-500">{selectedZona.kabupaten}</p>
                    <p className="text-sm text-forest-600 mt-1.5">{selectedZona.alasan}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <span className="text-xs bg-forest-100 text-forest-700 px-2 py-0.5 rounded-full font-medium">
                        {selectedZona.lahanDominan}
                      </span>
                      <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-medium">
                        {selectedZona.elevasiM}m dpl
                      </span>
                      {selectedZona.kawasanAdat && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                          Kawasan Adat
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-black text-4xl text-forest-900 leading-none">{selectedZona.skor}</p>
                    <p className="text-xs text-forest-400 mt-0.5">skor tanam</p>
                    
                    {/* Render Icon Pastel State */}
                    {(() => {
                      const zonaColors = {
                        aman: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Aman", Icon: CheckCircle2 },
                        waspada: { bg: "bg-amber-50", text: "text-amber-700", label: "Waspada", Icon: AlertTriangle },
                        bahaya: { bg: "bg-rose-50", text: "text-rose-700", label: "Bahaya", Icon: ShieldAlert },
                        pantang: { bg: "bg-purple-50", text: "text-purple-700", label: "Pantang", Icon: Ban },
                      };
                      const activeStyle = zonaColors[selectedZona.risiko];
                      
                      return (
                        <div className={`mt-2 px-3 py-1.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 ${activeStyle.bg} ${activeStyle.text}`}>
                          <activeStyle.Icon className="w-3.5 h-3.5" />
                          <span>{activeStyle.label}</span>
                        </div>
                      );
                    })()}

                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB: GRAFIK ───────────────────────────────── */}
        {!loading && data && tab === "grafik" && (
          <RainfallChart
            forecast={data.weather.forecast}
            currentRainfall={data.weather.current.rainfall}
          />
        )}
      </div>

      <Footer />

      {/* ── Save modal ────────────────────────────────── */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-cream rounded-2xl w-full max-w-sm shadow-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-bold text-forest-900">Simpan Prediksi Ini</h3>
              <button onClick={() => setShowSaveModal(false)} className="p-1.5 rounded-lg hover:bg-forest-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={saveNotes}
              onChange={e => setSaveNotes(e.target.value)}
              rows={3}
              placeholder="Catatan tambahan (opsional)..."
              className="w-full border border-forest-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-forest-500 resize-none mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 py-3 border border-forest-200 text-forest-600 rounded-xl text-sm font-semibold"
              >
                Batal
              </button>
              <button
                onClick={confirmSave}
                className="flex-1 py-3 bg-forest-600 text-white rounded-xl text-sm font-semibold hover:bg-forest-500"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}