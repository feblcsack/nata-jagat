import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { RecommendationStatus } from "@/types";
import { Leaf, ThumbsUp, AlertTriangle, Clock, Ban } from "lucide-react";
import React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusConfig(status: RecommendationStatus) {
  const config = {
    SANGAT_BAIK: {
      label: "Sangat Baik",
      color: "bg-[#186534] text-white", // Primary Deep Green
      border: "border-emerald-200",
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
      // Di file .ts, kita pake React.createElement pengganti sintaks <Leaf />
      icon: React.createElement(Leaf, { className: "w-8 h-8 text-white opacity-90" }),
    },
    BAIK: {
      label: "Baik",
      color: "bg-teal-500 text-white",
      border: "border-teal-200",
      bg: "bg-teal-50",
      text: "text-teal-700",
      dot: "bg-teal-400",
      icon: React.createElement(ThumbsUp, { className: "w-8 h-8 text-white opacity-90" }),
    },
    CUKUP: {
      label: "Cukup",
      color: "bg-amber-500 text-white",
      border: "border-amber-200",
      bg: "bg-amber-50",
      text: "text-amber-800",
      dot: "bg-amber-400",
      icon: React.createElement(AlertTriangle, { className: "w-8 h-8 text-white opacity-90" }),
    },
    TUNDA: {
      label: "Tunda",
      color: "bg-orange-500 text-white",
      border: "border-orange-200",
      bg: "bg-orange-50",
      text: "text-orange-700",
      dot: "bg-orange-400",
      icon: React.createElement(Clock, { className: "w-8 h-8 text-white opacity-90" }),
    },
    DILARANG: {
      label: "Pantang",
      color: "bg-rose-500 text-white",
      border: "border-rose-200",
      bg: "bg-rose-50",
      text: "text-rose-700",
      dot: "bg-rose-400",
      icon: React.createElement(Ban, { className: "w-8 h-8 text-white opacity-90" }),
    },
  };
  return config[status] ?? config.CUKUP;
}

export function formatMonth(month: number): string {
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  return months[month - 1] ?? "Januari";
}

export function getRainfallColor(intensity: string): string {
  // Menggunakan palet pastel yang soft
  const map: Record<string, string> = {
    "Tidak Hujan": "#fbbf24",  // amber-400
    "Ringan": "#38bdf8",       // sky-400 
    "Sedang": "#60a5fa",       // blue-400
    "Lebat": "#818cf8",        // indigo-400
    "Sangat Lebat": "#fb7185", // rose-400
  };
  return map[intensity] ?? "#94a3b8"; // slate-400
}