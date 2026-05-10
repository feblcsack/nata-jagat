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
    <div className="card-nature rounded-3xl p-8 border-2">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs font-bold text-forest-600 uppercase tracking-widest mb-2">
            Data BMKG
          </p>
          <p className="text-2xl font-bold text-forest-900">{location.name}</p>
          <p className="text-sm text-forest-500 mt-1 font-medium">{location.province}</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <span className={`text-sm px-4 py-2 rounded-full font-bold ${intensityColor[rainfallIntensity] || "text-forest-600 bg-forest-100"}`}>
            {rainfallIntensity}
          </span>
          {isFallback && (
            <span className="text-sm text-amber-700 bg-amber-100 px-4 py-2 rounded-full font-bold">
              Estimasi
            </span>
          )}
        </div>
      </div>

      {/* Main temp - LARGE DISPLAY */}
      <div className="flex items-baseline gap-4 mb-10 bg-gradient-to-br from-forest-50 to-sage-50 p-6 rounded-2xl border-2 border-forest-100">
        <span className="text-8xl font-serif font-bold bg-gradient-to-br from-forest-600 to-forest-800 bg-clip-text text-transparent">
          {current.temperature}°
        </span>
        <div>
          <p className="text-6xl">{current.weatherIcon}</p>
          <p className="text-lg text-forest-700 font-bold mt-2">{current.weatherDesc}</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatChip icon={<Droplets className="w-5 h-5 text-sky-600" />} label="Kelembapan" value={`${current.humidity}%`} />
        <StatChip icon={<Droplets className="w-5 h-5 text-blue-700" />} label="Curah Hujan" value={`${current.rainfall}mm`} />
        <StatChip icon={<Wind className="w-5 h-5 text-sage-600" />} label="Angin" value={`${current.windSpeed} km/h`} />
        <StatChip icon={<Thermometer className="w-5 h-5 text-earth-600" />} label="Suhu" value={`${current.temperature}°C`} />
      </div>

      {/* 5-day forecast */}
      {forecast.length > 0 && (
        <div className="mt-8 pt-8 border-t-2 border-forest-100">
          <p className="text-sm font-bold text-forest-700 uppercase tracking-widest mb-4">Prakiraan 5 Hari</p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {forecast.slice(0, 5).map((day, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col items-center gap-2 bg-gradient-to-br from-white to-forest-50 rounded-xl px-4 py-4 min-w-[80px] border-2 border-forest-100 shadow-md hover:shadow-lg transition-all hover:scale-110"
              >
                <p className="text-sm font-bold text-forest-700">{i === 0 ? "Hari ini" : day.dayName.slice(0, 3)}</p>
                <p className="text-3xl">{getWeatherEmoji(day.weatherCode)}</p>
                <p className="text-sm font-bold text-forest-900">{day.maxTemp}°</p>
                <p className="text-xs text-forest-600 font-medium">{day.minTemp}°</p>
                {day.rainfall > 0 && (
                  <p className="text-xs text-sky-700 font-bold">{day.rainfall}mm</p>
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
    <div className="flex items-center gap-3 bg-gradient-to-br from-white to-forest-50 rounded-xl p-4 border-2 border-forest-100 shadow-md hover:shadow-lg transition-all hover:scale-105">
      <div className="p-2 bg-forest-100 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-xs text-forest-600 font-bold uppercase">{label}</p>
        <p className="text-lg font-bold text-forest-900">{value}</p>
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
