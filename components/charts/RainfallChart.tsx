"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { BMKGForecastDay, BentangKidang } from "@/types";

interface RainfallChartProps {
  forecast: BMKGForecastDay[];
  bentang: BentangKidang;
}

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-forest-100 rounded-xl shadow-lg p-3">
        <p className="text-xs font-semibold text-forest-700 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-xs text-forest-600">
            <span className="font-medium">{p.name}:</span> {p.value}
            {p.name === "Curah Hujan" ? "mm" : "%"}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function RainfallChart({ forecast, bentang }: RainfallChartProps) {
  // Optimal rainfall range for rice planting
  const OPTIMAL_MIN = 5;
  const OPTIMAL_MAX = 25;

  const chartData = forecast.map((day) => ({
    name: day.dayName.slice(0, 3),
    "Curah Hujan": day.rainfall,
    "Kelembapan": day.humidity,
    date: day.date,
  }));

  return (
    <div className="card-nature rounded-2xl p-6">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-xs font-medium text-forest-500 uppercase tracking-wider mb-1">
            Visualisasi Data BMKG
          </p>
          <h3 className="font-serif text-lg font-semibold text-forest-900">
            Curah Hujan & Kelembapan — 7 Hari
          </h3>
        </div>
        <div className="flex gap-2">
          <span className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-full">Curah Hujan</span>
          <span className="text-xs bg-sage-100 text-sage-700 px-2 py-1 rounded-full">Kelembapan</span>
        </div>
      </div>

      {/* Current bentang indicator */}
      <div className="flex items-center gap-2 mb-4 bg-forest-950/5 rounded-lg px-3 py-2">
        <span className="text-sm">🌌</span>
        <p className="text-xs text-forest-600">
          <span className="font-semibold">{bentang.phase}</span> — Optimal tanam: {OPTIMAL_MIN}–{OPTIMAL_MAX}mm curah hujan
        </p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00acf0" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00acf0" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="humidGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4da65a" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#4da65a" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,51,23,0.06)" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#4a7a52" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#4a7a52" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />

          {/* Optimal range reference lines */}
          <ReferenceLine
            y={OPTIMAL_MAX}
            stroke="#e87c3e"
            strokeDasharray="4 4"
            label={{ value: "Batas atas optimal", position: "right", fontSize: 9, fill: "#e87c3e" }}
          />
          <ReferenceLine
            y={OPTIMAL_MIN}
            stroke="#4da65a"
            strokeDasharray="4 4"
            label={{ value: "Batas bawah optimal", position: "right", fontSize: 9, fill: "#4da65a" }}
          />

          <Area
            type="monotone"
            dataKey="Curah Hujan"
            stroke="#00acf0"
            strokeWidth={2.5}
            fill="url(#rainGradient)"
            dot={{ fill: "#00acf0", r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
          <Area
            type="monotone"
            dataKey="Kelembapan"
            stroke="#4da65a"
            strokeWidth={2}
            fill="url(#humidGradient)"
            dot={{ fill: "#4da65a", r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <p className="text-xs text-forest-400 mt-2 text-center">
        Zona kuning = rentang optimal curah hujan untuk tanam padi (5–25mm)
      </p>
    </div>
  );
}
