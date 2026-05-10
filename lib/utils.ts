import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { RecommendationStatus } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusConfig(status: RecommendationStatus) {
  const config = {
    SANGAT_BAIK: {
      label: "Sangat Baik",
      color: "bg-forest-500 text-white",
      border: "border-forest-400",
      bg: "bg-forest-50",
      text: "text-forest-700",
      dot: "bg-forest-500",
      icon: "🌱",
    },
    BAIK: {
      label: "Baik",
      color: "bg-sage-500 text-white",
      border: "border-sage-400",
      bg: "bg-sage-50",
      text: "text-sage-700",
      dot: "bg-sage-500",
      icon: "✅",
    },
    CUKUP: {
      label: "Cukup",
      color: "bg-earth-400 text-white",
      border: "border-earth-300",
      bg: "bg-earth-50",
      text: "text-earth-700",
      dot: "bg-earth-400",
      icon: "⚠️",
    },
    TUNDA: {
      label: "Tunda",
      color: "bg-yellow-500 text-white",
      border: "border-yellow-400",
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      dot: "bg-yellow-500",
      icon: "⏳",
    },
    DILARANG: {
      label: "Pantang",
      color: "bg-red-600 text-white",
      border: "border-red-400",
      bg: "bg-red-50",
      text: "text-red-700",
      dot: "bg-red-500",
      icon: "🚫",
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
  const map: Record<string, string> = {
    "Tidak Hujan": "#f59e0b",
    "Ringan": "#22c55e",
    "Sedang": "#3b82f6",
    "Lebat": "#6366f1",
    "Sangat Lebat": "#ef4444",
  };
  return map[intensity] ?? "#6b7280";
}
