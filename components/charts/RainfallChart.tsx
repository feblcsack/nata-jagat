"use client";

import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Area, ReferenceLine,
} from "recharts";
import { BMKGForecastDay } from "@/types";

interface Props { forecast: BMKGForecastDay[]; currentRainfall?: number; title?: string; }

const MONTH_CLIMATE = [35,30,25,20,12,8,5,6,10,18,28,38];
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/95 border border-forest-200 rounded-xl shadow-md px-3 py-2.5 text-xs">
      <p className="font-semibold text-forest-800 mb-2">{label}</p>
      {payload.map((p: {name: string; value: number; color: string}) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
          <span className="text-forest-600">{p.name}:</span>
          <span className="font-semibold text-forest-900">{Math.round(p.value)}{p.name.includes("Suhu") ? "°C" : "mm"}</span>
        </div>
      ))}
    </div>
  );
};

export default function RainfallChart({ forecast, currentRainfall, title }: Props) {
  const forecastData = forecast.slice(0, 7).map((f, i) => ({
    label: i === 0 ? "Hari ini" : f.dayName,
    "Curah Hujan": f.rainfall,
    "Suhu Maks": f.maxTemp,
  }));

  const climateData = MONTH_NAMES.map((name, i) => ({
    label: name,
    historis: MONTH_CLIMATE[i],
    aktual: i === new Date().getMonth() ? (currentRainfall ?? MONTH_CLIMATE[i]) : null,
  }));

  return (
    <div className="space-y-5">
      <div className="card-nature rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold text-forest-500 uppercase tracking-wider mb-0.5">Data BMKG</p>
            <h3 className="text-base font-semibold text-forest-900">{title ?? "Prakiraan Curah Hujan 7 Hari"}</h3>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-forest-500">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-sky-400" />Hujan</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-1 bg-earth-400" />Suhu</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={forecastData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,138,59,0.08)" />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#599343" }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="rain" tick={{ fontSize: 10, fill: "#599343" }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="temp" orientation="right" tick={{ fontSize: 10, fill: "#b56d35" }} axisLine={false} tickLine={false} domain={[15, 42]} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine yAxisId="rain" y={15} stroke="#4da65a" strokeDasharray="4 2" strokeWidth={1.5} />
            <ReferenceLine yAxisId="rain" y={40} stroke="#ef4444" strokeDasharray="4 2" strokeWidth={1} />
            <Bar yAxisId="rain" dataKey="Curah Hujan" fill="#7dd3fc" radius={[4,4,0,0]} />
            <Line yAxisId="temp" type="monotone" dataKey="Suhu Maks" stroke="#c4874a" strokeWidth={2} dot={{ r: 3, fill: "#c4874a", strokeWidth: 0 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="card-nature rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold text-forest-500 uppercase tracking-wider mb-0.5">Klimatologi Kawasan Baduy</p>
            <h3 className="text-base font-semibold text-forest-900">Rata-rata Curah Hujan Bulanan</h3>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <ComposedChart data={climateData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,138,59,0.07)" />
            <XAxis dataKey="label" tick={{ fontSize: 9, fill: "#599343" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 9, fill: "#599343" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="historis" name="Historis" fill="rgba(130,196,138,0.25)" stroke="#82c48a" strokeWidth={1.5} />
            <Bar dataKey="aktual" name="Bulan Ini" fill="#1e6e2c" radius={[4,4,0,0]} />
          </ComposedChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-forest-400 mt-2 text-center">Rata-rata klimatologi 30 tahun · Lebak, Banten</p>
      </div>
    </div>
  );
}
