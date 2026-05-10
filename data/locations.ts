/**
 * LOKASI BMKG YANG DIDUKUNG
 * 
 * BMKG menggunakan kode wilayah spesifik untuk API cuaca.
 * Format: adm1 (provinsi) / adm2 (kota) / adm3 (kecamatan) / adm4 (desa)
 * 
 * Ref: https://data.bmkg.go.id/prakiraan-cuaca/
 */

export interface BMKGLocation {
  id: string;
  name: string;
  province: string;
  lat: number;
  lon: number;
  adm1: string; // Province code
  adm2: string; // City code
  adm3?: string; // District code
  adm4?: string; // Village code
}

export const bmkgLocations: BMKGLocation[] = [
  {
    id: "lebak",
    name: "Lebak (Kawasan Baduy)",
    province: "Banten",
    lat: -6.5644,
    lon: 106.2517,
    adm1: "36",
    adm2: "3602",
    adm3: "360224",
  },
  {
    id: "rangkasbitung",
    name: "Rangkasbitung",
    province: "Banten",
    lat: -6.3545,
    lon: 106.2517,
    adm1: "36",
    adm2: "3602",
    adm3: "360209",
  },
  {
    id: "pandeglang",
    name: "Pandeglang",
    province: "Banten",
    lat: -6.3,
    lon: 106.1,
    adm1: "36",
    adm2: "3601",
  },
  {
    id: "serang",
    name: "Serang",
    province: "Banten",
    lat: -6.1104,
    lon: 106.1639,
    adm1: "36",
    adm2: "3604",
  },
  {
    id: "jakarta",
    name: "Jakarta",
    province: "DKI Jakarta",
    lat: -6.2088,
    lon: 106.8456,
    adm1: "31",
    adm2: "3171",
  },
  {
    id: "bogor",
    name: "Bogor",
    province: "Jawa Barat",
    lat: -6.5971,
    lon: 106.806,
    adm1: "32",
    adm2: "3201",
  },
];

export function getLocationById(id: string): BMKGLocation {
  return (
    bmkgLocations.find((l) => l.id === id) ||
    bmkgLocations[0] // Default to Lebak
  );
}

export const DEFAULT_LOCATION = bmkgLocations[0]; // Lebak — Kawasan Baduy
