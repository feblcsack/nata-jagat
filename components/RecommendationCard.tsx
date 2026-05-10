"use client";

import { SyncAnalysis } from "@/types";
import { CheckCircle, AlertTriangle, XCircle, Clock, TrendingUp, Info } from "lucide-react";

interface RecommendationCardProps {
  analysis: SyncAnalysis;
}

const statusConfig = {
  SANGAT_BAIK: {
    icon: <CheckCircle className="w-6 h-6" />,
    bg: "bg-forest-600",
    light: "bg-forest-50 border-forest-200",
    text: "text-forest-700",
    label: "Sangat Baik",
    emoji: "🌾",
  },
  BAIK: {
    icon: <CheckCircle className="w-6 h-6" />,
    bg: "bg-sage-500",
    light: "bg-sage-50 border-sage-200",
    text: "text-sage-700",
    label: "Baik",
    emoji: "✅",
  },
  CUKUP: {
    icon: <Clock className="w-6 h-6" />,
    bg: "bg-amber-500",
    light: "bg-amber-50 border-amber-200",
    text: "text-amber-700",
    label: "Cukup",
    emoji: "⚠️",
  },
  TUNDA: {
    icon: <AlertTriangle className="w-6 h-6" />,
    bg: "bg-orange-500",
    light: "bg-orange-50 border-orange-200",
    text: "text-orange-700",
    label: "Tunda",
    emoji: "⏳",
  },
  DILARANG: {
    icon: <XCircle className="w-6 h-6" />,
    bg: "bg-red-600",
    light: "bg-red-50 border-red-200",
    text: "text-red-700",
    label: "Dilarang",
    emoji: "🚫",
  },
};

export default function RecommendationCard({ analysis }: RecommendationCardProps) {
  const { recommendation, isSynced, syncScore, traditionalSays, modernSays, conflictNote } = analysis;
  const config = statusConfig[recommendation.status];

  return (
    <div className={`rounded-2xl border-2 overflow-hidden ${config.light}`}>
      {/* Status header */}
      <div className={`${config.bg} px-6 py-4`}>
        <div className="flex items-center gap-3">
          <div className="text-white">{config.icon}</div>
          <div>
            <p className="text-white/80 text-xs font-medium uppercase tracking-wider">
              Rekomendasi Nata Jagat
            </p>
            <h3 className="text-white font-serif text-xl font-semibold">
              {recommendation.title}
            </h3>
          </div>
          <div className="ml-auto text-3xl">{config.emoji}</div>
        </div>
      </div>

      <div className="p-6">
        {/* Main message */}
        <p className="text-sm text-forest-700 leading-relaxed mb-5">
          {recommendation.message}
        </p>

        {/* Sync score */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-forest-600">
              <TrendingUp className="w-3.5 h-3.5 inline mr-1" />
              Tingkat Sinkronisasi Tradisional ↔ Modern
            </span>
            <span className={`text-sm font-bold ${config.text}`}>{syncScore}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-700 ${config.bg}`}
              style={{ width: `${syncScore}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-forest-400">
              {isSynced ? "✓ Tersinkronisasi" : "⚡ Ada perbedaan"}
            </span>
            <span className="text-xs text-forest-400">
              Kepercayaan: {recommendation.confidence}%
            </span>
          </div>
        </div>

        {/* Conflict note */}
        {conflictNote && (
          <div className="flex gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">{conflictNote}</p>
          </div>
        )}

        {/* Traditional vs Modern */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white/70 rounded-xl p-3">
            <p className="text-xs font-semibold text-forest-600 mb-1">🌌 Tradisional (Baduy)</p>
            <p className="text-xs text-forest-700">{traditionalSays}</p>
            <p className="text-xs text-forest-500 mt-1 leading-relaxed">
              {recommendation.traditionalBasis}
            </p>
          </div>
          <div className="bg-white/70 rounded-xl p-3">
            <p className="text-xs font-semibold text-sky-600 mb-1">🛰️ Modern (BMKG)</p>
            <p className="text-xs text-sky-700">{modernSays}</p>
            <p className="text-xs text-sky-500 mt-1 leading-relaxed">
              {recommendation.modernBasis}
            </p>
          </div>
        </div>

        {/* Details */}
        {recommendation.details.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-semibold text-forest-700 mb-2">Analisis Detail</p>
            <ul className="space-y-1.5">
              {recommendation.details.map((detail, i) => (
                <li key={i} className="flex gap-2 text-xs text-forest-600">
                  <span className="text-forest-400 mt-0.5">•</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        {recommendation.actions.length > 0 && (
          <div className="border-t border-forest-100 pt-4">
            <p className="text-xs font-semibold text-forest-700 mb-2">
              Yang Harus Dilakukan Sekarang
            </p>
            <div className="space-y-1.5">
              {recommendation.actions.slice(0, 5).map((action, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <span className={`w-5 h-5 rounded-full ${config.bg} text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-medium`}>
                    {i + 1}
                  </span>
                  <p className="text-xs text-forest-600">{action}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next review */}
        <div className="mt-4 text-xs text-forest-400">
          Tinjau kembali: {recommendation.nextReviewDate}
        </div>
      </div>
    </div>
  );
}
