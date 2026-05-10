"use client";

import { bmkgLocations } from "@/data/locations";
import { MapPin } from "lucide-react";

interface LocationSelectorProps {
  selectedId: string;
  onChange: (id: string) => void;
}

export default function LocationSelector({ selectedId, onChange }: LocationSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <MapPin className="w-4 h-4 text-forest-500 flex-shrink-0" />
      <select
        value={selectedId}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm text-forest-700 bg-transparent border-0 outline-none cursor-pointer font-medium"
      >
        {bmkgLocations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name}, {loc.province}
          </option>
        ))}
      </select>
    </div>
  );
}
