"use client";

import { KalenderBaduy } from "@/types";
import { Sprout, XCircle, BookOpen } from "lucide-react";

interface KalenderBaduyCardProps {
  data: KalenderBaduy;
}

export default function KalenderBaduyCard({ data }: KalenderBaduyCardProps) {
  return (
    <div className="card-nature rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-forest-500 uppercase tracking-wider mb-1">
            Kalender Baduy
          </p>
          <h3 className="font-serif text-xl font-semibold text-forest-900">
            {data.monthName}
          </h3>
        </div>
        <div className="text-2xl">🌱</div>
      </div>

      {/* Primary activity */}
      <div className="bg-forest-600 text-white rounded-xl px-4 py-3 mb-4">
        <p className="text-xs text-forest-200 mb-0.5">Aktivitas Utama Bulan Ini</p>
        <p className="font-semibold">{data.primaryActivity}</p>
      </div>

      {/* Activities */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 mb-2">
          <Sprout className="w-3.5 h-3.5 text-forest-500" />
          <p className="text-xs font-semibold text-forest-700 uppercase tracking-wider">Aktivitas</p>
        </div>
        <ul className="space-y-1">
          {data.activities.map((act, i) => (
            <li key={i} className="flex gap-2 text-xs text-forest-600">
              <span className="text-forest-400 mt-0.5">▸</span>
              {act}
            </li>
          ))}
        </ul>
      </div>

      {/* Rituals */}
      {data.rituals.length > 0 && (
        <div className="mb-4 bg-earth-50 rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <BookOpen className="w-3.5 h-3.5 text-earth-600" />
            <p className="text-xs font-semibold text-earth-700">Ritual Tradisional</p>
          </div>
          {data.rituals.map((r, i) => (
            <p key={i} className="text-xs text-earth-600 ml-5">{r}</p>
          ))}
        </div>
      )}

      {/* Prohibited */}
      {data.prohibited.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-2">
            <XCircle className="w-3.5 h-3.5 text-red-500" />
            <p className="text-xs font-semibold text-red-600 uppercase tracking-wider">Pantangan</p>
          </div>
          {data.prohibited.map((p, i) => (
            <p key={i} className="text-xs text-red-500 ml-5 mb-0.5">{p}</p>
          ))}
        </div>
      )}

      {/* Recommendation */}
      <div className="border-t border-forest-100 pt-3">
        <p className="text-xs font-semibold text-forest-700 mb-1">Saran Sesepuh</p>
        <p className="text-xs text-forest-600 leading-relaxed italic">
          "{data.recommendation}"
        </p>
      </div>
    </div>
  );
}
