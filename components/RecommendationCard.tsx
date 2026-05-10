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
    <div className={`rounded-2xl border overflow-hidden ${config.light}`}>
      {/* Status header */}
      <div className={`${config.bg} px-6 py-5`}>
        <div className="flex items-center gap-3">
          <div className="text-white">{config.icon}</div>
          <div className="flex-1">
            <p className="text-white/90 text-xs font-medium uppercase tracking-wider">
              Rekomendasi Tanam
            </p>
            <h3 className="text-white font-serif text-2xl font-semibold mt-1">
              {recommendation.title}
            </h3>
          </div>
          <div className="text-3xl">{config.emoji}</div>
        </div>
      </div>

      <div className="p-6">
        {/* Main message */}
        <p className="text-sm text-forest-800 leading-relaxed mb-6 font-medium">
          {recommendation.message}
        </p>

        {/* Sync score */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-forest-700 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              Sinkronisasi Tradisional ↔ Modern
            </span>
            <span className={`text-sm font-bold ${config.text}`}>{syncScore}/100</span>
          </div>
          <div className="w-full bg-forest-100/50 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-700 ${config.bg}`}
              style={{ width: `${syncScore}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-forest-600 font-medium">
              {isSynced ? "✓ Tersinkronisasi" : "⚡ Ada perbedaan"}
            </span>
            <span className="text-xs text-forest-600 font-medium">
              Kepercayaan: {recommendation.confidence}%
            </span>
          </div>
        </div>

        {/* Conflict note */}
        {conflictNote && (
          <div className="flex gap-2.5 bg-amber-50/80 border border-amber-200/50 rounded-lg p-4 mb-6">
            <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5 font-semibold" />
            <p className="text-xs text-amber-800 leading-relaxed">{conflictNote}</p>
          </div>
        )}

        {/* Traditional vs Modern */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/60 rounded-lg p-4 border border-forest-100/30">
            <p className="text-xs font-semibold text-forest-800 mb-2">🌌 Tradisional</p>
            <p className="text-xs text-forest-700 font-medium mb-2">{traditionalSays}</p>
            <p className="text-xs text-forest-600 leading-relaxed">
              {recommendation.traditionalBasis}
            </p>
          </div>
          <div className="bg-white/60 rounded-lg p-4 border border-sky-100/30">
            <p className="text-xs font-semibold text-sky-800 mb-2">🛰️ Modern</p>
            <p className="text-xs text-sky-700 font-medium mb-2">{modernSays}</p>
            <p className="text-xs text-sky-600 leading-relaxed">
              {recommendation.modernBasis}
            </p>
          </div>
        </div>

        {/* Details */}
        {recommendation.details.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-forest-800 mb-3">Analisis Detail</p>
            <ul className="space-y-2">
              {recommendation.details.map((detail, i) => (
                <li key={i} className="flex gap-2.5 text-xs text-forest-700">
                  <span className="text-forest-500 font-bold mt-0.5">·</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        {recommendation.actions.length > 0 && (
          <div className="border-t border-forest-100/40 pt-5">
            <p className="text-xs font-semibold text-forest-800 mb-3">
              Yang Harus Dilakukan
            </p>
            <div className="space-y-2">
              {recommendation.actions.slice(0, 5).map((action, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className={`w-6 h-6 rounded-lg ${config.bg} text-white text-xs flex items-center justify-center flex-shrink-0 font-semibold`}>
                    {i + 1}
                  </span>
                  <p className="text-xs text-forest-700 mt-0.5">{action}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next review */}
        <div className="mt-5 text-xs text-forest-600 font-medium">
          📅 Tinjau kembali: {recommendation.nextReviewDate}
        </div>
      </div>
    </div>
  );
}
