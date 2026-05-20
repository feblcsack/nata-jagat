"use client";

import { BMKGWeatherData } from "@/types";
import { 
  Droplets, Wind, Thermometer, 
  Sun, CloudSun, Cloud, CloudRain, CloudLightning, CloudFog 
} from "lucide-react";

interface WeatherCardProps {
  weather: BMKGWeatherData;
  isLoading?: boolean;
  isFallback?: boolean;
}

// Komponen Helper untuk memetakan kode BMKG ke Icon Lucide Pastel
function WeatherIcon({ code, className = "w-6 h-6" }: { code: string, className?: string }) {
  const props = { className };
  switch (code) {
    case "0": return <Sun {...props} className={`${className} text-amber-500`} />;
    case "1": 
    case "2": return <CloudSun {...props} className={`${className} text-amber-500/80`} />;
    case "3": 
    case "4": return <Cloud {...props} className={`${className} text-slate-400`} />;
    case "5": 
    case "10": 
    case "45": return <CloudFog {...props} className={`${className} text-slate-500`} />;
    case "60": 
    case "80": return <CloudRain {...props} className={`${className} text-sky-400`} />;
    case "61": 
    case "63": return <CloudRain {...props} className={`${className} text-blue-500`} />;
    case "95": 
    case "97": return <CloudLightning {...props} className={`${className} text-indigo-500`} />;
    default: return <CloudSun {...props} className={`${className} text-slate-400`} />;
  }
}

export default function WeatherCard({ weather, isLoading, isFallback }: WeatherCardProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl p-6 animate-pulse bg-white/50 border border-slate-100 shadow-sm">
        <div className="h-4 bg-slate-200 rounded w-1/3 mb-4" />
        <div className="h-12 bg-slate-200 rounded w-1/2 mb-6" />
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-slate-100 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const { current, location, rainfallIntensity, forecast } = weather;

  const intensityColor: Record<string, string> = {
    "Tidak Hujan": "text-amber-600 bg-amber-50 border-amber-100",
    Ringan: "text-sky-600 bg-sky-50 border-sky-100",
    Sedang: "text-blue-700 bg-blue-50 border-blue-100",
    Lebat: "text-indigo-700 bg-indigo-50 border-indigo-100",
    "Sangat Lebat": "text-rose-700 bg-rose-50 border-rose-100",
  };

  return (
    <div className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Data BMKG — {location.name}
          </p>
          <p className="text-xs font-medium text-slate-500">{location.province}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className={`text-[10px] px-2.5 py-1 rounded-md font-bold border ${intensityColor[rainfallIntensity] || "text-slate-600 bg-slate-50 border-slate-200"}`}>
            {rainfallIntensity.toUpperCase()}
          </span>
          {isFallback && (
            <span className="text-[10px] text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md font-semibold">
              Data Estimasi
            </span>
          )}
        </div>
      </div>

      {/* Main temp */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-5xl font-serif font-black text-slate-800 tracking-tighter">
          {current.temperature}°
        </span>
        <div className="flex flex-col gap-1">
          <WeatherIcon code={current.weatherCode} className="w-8 h-8" />
          <p className="text-sm font-semibold text-slate-600">{current.weatherDesc}</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <StatChip icon={<Droplets className="w-4 h-4 text-sky-400" />} label="Kelembapan" value={`${current.humidity}%`} />
        <StatChip icon={<Droplets className="w-4 h-4 text-blue-500" />} label="Curah Hujan" value={`${current.rainfall}mm`} />
        <StatChip icon={<Wind className="w-4 h-4 text-teal-400" />} label="Angin" value={`${current.windSpeed} km/h`} />
        <StatChip icon={<Thermometer className="w-4 h-4 text-rose-400" />} label="Suhu" value={`${current.temperature}°C`} />
      </div>

      {/* 5-day forecast */}
      {forecast.length > 0 && (
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Prakiraan 5 Hari</p>
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {forecast.slice(0, 5).map((day, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 min-w-[68px]"
              >
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{i === 0 ? "HARI INI" : day.dayName.slice(0, 3)}</p>
                <WeatherIcon code={day.weatherCode} className="w-5 h-5" />
                <div className="flex items-center gap-1.5 mt-0.5">
                  <p className="text-xs font-black text-slate-700">{day.maxTemp}°</p>
                  <p className="text-[10px] font-semibold text-slate-400">{day.minTemp}°</p>
                </div>
                {day.rainfall > 0 && (
                  <p className="text-[10px] font-bold text-sky-500 bg-sky-50 px-1.5 py-0.5 rounded-md w-full text-center mt-1">
                    {day.rainfall}mm
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 rounded-xl p-3">
      <div className="bg-white p-1.5 rounded-lg shadow-sm border border-slate-100">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
        <p className="text-sm font-black text-slate-700 leading-none">{value}</p>
      </div>
    </div>
  );
}