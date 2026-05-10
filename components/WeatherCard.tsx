"use client";

import { BMKGWeatherData } from "@/types";
import { Droplets, Wind, Thermometer, Eye } from "lucide-react";

interface WeatherCardProps {
  weather: BMKGWeatherData;
  isLoading?: boolean;
  isFallback?: boolean;
}

export default function WeatherCard({ weather, isLoading, isFallback }: WeatherCardProps) {
  if (isLoading) {
    return (
      <div className="card-nature rounded-2xl p-6 animate-pulse">
        <div className="h-4 bg-forest-100 rounded w-1/3 mb-4" />
        <div className="h-12 bg-forest-100 rounded w-1/2 mb-6" />
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-forest-100 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const { current, location, rainfallIntensity, forecast } = weather;

  const intensityColor: Record<string, string> = {
    "Tidak Hujan": "text-amber-600 bg-amber-50",
    Ringan: "text-sky-600 bg-sky-50",
    Sedang: "text-sky-700 bg-sky-100",
    Lebat: "text-blue-800 bg-blue-100",
    "Sangat Lebat": "text-red-700 bg-red-100",
  };

  return (
    <div className="card-nature rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-forest-500 uppercase tracking-wider mb-1">
            Data BMKG — {location.name}
          </p>
          <p className="text-xs text-forest-400">{location.province}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${intensityColor[rainfallIntensity] || "text-forest-600 bg-forest-50"}`}>
            {rainfallIntensity}
          </span>
          {isFallback && (
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              Data Estimasi
            </span>
          )}
        </div>
      </div>

      {/* Main temp */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-5xl font-serif font-bold text-forest-900">
          {current.temperature}°
        </span>
        <div>
          <p className="text-2xl">{current.weatherIcon}</p>
          <p className="text-sm text-forest-600">{current.weatherDesc}</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <StatChip icon={<Droplets className="w-4 h-4 text-sky-500" />} label="Kelembapan" value={`${current.humidity}%`} />
        <StatChip icon={<Droplets className="w-4 h-4 text-blue-600" />} label="Curah Hujan" value={`${current.rainfall}mm`} />
        <StatChip icon={<Wind className="w-4 h-4 text-sage-500" />} label="Angin" value={`${current.windSpeed} km/h`} />
        <StatChip icon={<Thermometer className="w-4 h-4 text-earth-500" />} label="Suhu" value={`${current.temperature}°C`} />
      </div>

      {/* 5-day forecast */}
      {forecast.length > 0 && (
        <div>
          <p className="text-xs font-medium text-forest-500 uppercase tracking-wider mb-2">Prakiraan 5 Hari</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {forecast.slice(0, 5).map((day, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col items-center gap-1 bg-white/60 rounded-xl px-3 py-2 min-w-[64px]"
              >
                <p className="text-xs text-forest-500 font-medium">{i === 0 ? "Hari ini" : day.dayName.slice(0, 3)}</p>
                <p className="text-base">{getWeatherEmoji(day.weatherCode)}</p>
                <p className="text-xs font-semibold text-forest-800">{day.maxTemp}°</p>
                <p className="text-xs text-forest-400">{day.minTemp}°</p>
                {day.rainfall > 0 && (
                  <p className="text-xs text-sky-600">{day.rainfall}mm</p>
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
    <div className="flex items-center gap-2 bg-white/60 rounded-xl p-3">
      {icon}
      <div>
        <p className="text-xs text-forest-500">{label}</p>
        <p className="text-sm font-semibold text-forest-800">{value}</p>
      </div>
    </div>
  );
}

function getWeatherEmoji(code: string): string {
  const map: Record<string, string> = {
    "0": "☀️", "1": "🌤️", "2": "🌤️", "3": "⛅", "4": "☁️",
    "60": "🌦️", "61": "🌧️", "63": "🌧️", "80": "🌦️", "95": "⛈️", "97": "⛈️",
  };
  return map[code] || "🌡️";
}
