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
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-xs font-medium text-forest-600 uppercase tracking-wider mb-1">
            Kalender Baduy
          </p>
          <h3 className="font-serif text-xl font-semibold text-forest-900">
            {data.monthName}
          </h3>
        </div>
        <div className="text-2xl">🌱</div>
      </div>

      {/* Primary activity */}
      <div className="bg-forest-600 text-white rounded-lg px-4 py-3 mb-5">
        <p className="text-xs text-forest-100 mb-1 font-medium">Aktivitas Utama</p>
        <p className="font-semibold text-sm">{data.primaryActivity}</p>
      </div>

      {/* Activities */}
      <div className="mb-5">
        <div className="flex items-center gap-1.5 mb-3">
          <Sprout className="w-4 h-4 text-forest-600" />
          <p className="text-xs font-semibold text-forest-700 uppercase tracking-wider">Aktivitas</p>
        </div>
        <ul className="space-y-1.5">
          {data.activities.map((act, i) => (
            <li key={i} className="flex gap-2 text-xs text-forest-600">
              <span className="text-forest-400 font-bold mt-0.5">·</span>
              {act}
            </li>
          ))}
        </ul>
      </div>

      {/* Rituals */}
      {data.rituals.length > 0 && (
        <div className="mb-5 bg-earth-50/60 rounded-lg p-3.5 border border-earth-100/30">
          <div className="flex items-center gap-1.5 mb-2">
            <BookOpen className="w-4 h-4 text-earth-600" />
            <p className="text-xs font-semibold text-earth-800">Ritual Tradisional</p>
          </div>
          {data.rituals.map((r, i) => (
            <p key={i} className="text-xs text-earth-700 ml-5 leading-relaxed">{r}</p>
          ))}
        </div>
      )}

      {/* Prohibited */}
      {data.prohibited.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-1.5 mb-2.5">
            <XCircle className="w-4 h-4 text-red-600" />
            <p className="text-xs font-semibold text-red-700 uppercase tracking-wider">Pantangan</p>
          </div>
          {data.prohibited.map((p, i) => (
            <p key={i} className="text-xs text-red-600 ml-5 mb-1.5 leading-relaxed font-medium">{p}</p>
          ))}
        </div>
      )}

      {/* Recommendation */}
      <div className="border-t border-forest-100/40 pt-4">
        <p className="text-xs font-semibold text-forest-800 mb-2">Saran Sesepuh</p>
        <p className="text-xs text-forest-600 leading-relaxed italic">
          "{data.recommendation}"
        </p>
      </div>
    </div>
  );
}
