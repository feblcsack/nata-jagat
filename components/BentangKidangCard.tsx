"use client";

import { BentangKidang } from "@/types";
import { Star, Moon, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface BentangKidangCardProps {
  bentang: BentangKidang;
}

const phaseColors: Record<string, string> = {
  "Kidang Puncak": "bg-forest-600 text-white",
  "Kidang Muncul": "bg-forest-400 text-white",
  "Kidang Turun": "bg-sage-500 text-white",
  "Bintang Waluku": "bg-earth-400 text-white",
  "Luhur Langit": "bg-sky-600 text-white",
  "Gelap Langit": "bg-gray-600 text-white",
};

const seasonColors: Record<string, { bg: string; text: string; dot: string }> = {
  "Mangsa Tandur": { bg: "bg-forest-50", text: "text-forest-800", dot: "bg-forest-500" },
  "Mangsa Tumbuh": { bg: "bg-sage-50", text: "text-sage-800", dot: "bg-sage-500" },
  "Mangsa Panen": { bg: "bg-earth-50", text: "text-earth-800", dot: "bg-earth-500" },
  "Mangsa Ngaso": { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-400" },
};

const riskIcons: Record<string, React.ReactNode> = {
  Aman: <CheckCircle className="w-4 h-4 text-forest-500" />,
  Waspada: <Clock className="w-4 h-4 text-amber-500" />,
  Tunda: <AlertTriangle className="w-4 h-4 text-red-500" />,
};

export default function BentangKidangCard({ bentang: data }: BentangKidangCardProps) {
  const season = seasonColors[data.traditionalSeason] || seasonColors["Mangsa Ngaso"];
  const phaseColor = phaseColors[data.phase] || "bg-forest-500 text-white";

  return (
    <div className="card-nature rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-forest-500 uppercase tracking-wider mb-1">
            Pengetahuan Tradisional Baduy
          </p>
          <h3 className="font-serif text-xl font-semibold text-forest-900">
            Bentang Kidang
          </h3>
        </div>
        <div className="text-2xl">🌌</div>
      </div>

      {/* Phase badge */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${phaseColor}`}>
          {data.phase}
        </span>
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${season.bg} ${season.text}`}>
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${season.dot} mr-1.5 align-middle`} />
          {data.traditionalSeason}
        </span>
      </div>

      {/* Meaning */}
      <div className="bg-forest-950/5 rounded-xl p-4 mb-4">
        <div className="flex gap-2 mb-2">
          <Star className="w-4 h-4 text-earth-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-forest-800">{data.meaning}</p>
        </div>
        <p className="text-xs text-forest-600 leading-relaxed">{data.description}</p>
      </div>

      {/* Star position */}
      <div className="flex gap-2 mb-3">
        <Moon className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-medium text-forest-700">Posisi Bintang</p>
          <p className="text-xs text-forest-500">{data.starPosition}</p>
        </div>
      </div>

      {/* Lunar cycle */}
      <div className="text-xs text-forest-500 mb-4 pl-6">{data.lunarCycle}</div>

      {/* Farming guidance */}
      <div className="border-t border-forest-100 pt-4">
        <div className="flex items-start gap-2">
          {riskIcons[data.riskLevel]}
          <div>
            <p className="text-xs font-semibold text-forest-700 mb-1">
              Panduan Baduy — {data.riskLevel}
            </p>
            <p className="text-xs text-forest-600 leading-relaxed">
              {data.farmingGuidance}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
