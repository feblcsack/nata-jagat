export interface BMKGLocation {
  id: string; name: string; province: string;
  lat: number; lon: number;
  adm1: string; adm2: string; adm3?: string;
}

export interface Kecamatan {
  id: string; nama: string; kabupaten: string;
  lat: number; lon: number; radiusKm: number;
  elevasiM: number; lahanDominan: "sawah"|"ladang"|"hutan"|"campuran"|"urban"|"pesisir";
  kawasanAdat: boolean;
}

// ─── LEBAK DATA (Akurasi Koordinat & Elevasi) ──────────────
export const kecamatanLebak: Kecamatan[] = [
  { id:"cibeber",        nama:"Cibeber",         kabupaten:"Lebak", lat:-6.7214, lon:106.3152, radiusKm:8, elevasiM:420, lahanDominan:"ladang",   kawasanAdat:false },
  { id:"cijaku",         nama:"Cijaku",          kabupaten:"Lebak", lat:-6.8041, lon:106.1523, radiusKm:7, elevasiM:320, lahanDominan:"ladang",   kawasanAdat:false },
  { id:"cikulur",        nama:"Cikulur",         kabupaten:"Lebak", lat:-6.4672, lon:106.1834, radiusKm:6, elevasiM:140, lahanDominan:"sawah",    kawasanAdat:false },
  { id:"cileles",        nama:"Cileles",         kabupaten:"Lebak", lat:-6.5312, lon:106.1089, radiusKm:7, elevasiM:180, lahanDominan:"sawah",    kawasanAdat:false },
  { id:"cilograng",      nama:"Cilograng",       kabupaten:"Lebak", lat:-6.9381, lon:106.3721, radiusKm:7, elevasiM:210, lahanDominan:"campuran", kawasanAdat:false },
  { id:"cimarga",        nama:"Cimarga",         kabupaten:"Lebak", lat:-6.4851, lon:106.2130, radiusKm:8, elevasiM:150, lahanDominan:"sawah",    kawasanAdat:false },
  { id:"cipanas",        nama:"Cipanas",         kabupaten:"Lebak", lat:-6.5512, lon:106.3981, radiusKm:7, elevasiM:410, lahanDominan:"ladang",   kawasanAdat:false },
  { id:"curugbitung",    nama:"Curugbitung",     kabupaten:"Lebak", lat:-6.4187, lon:106.3652, radiusKm:6, elevasiM:190, lahanDominan:"sawah",    kawasanAdat:false },
  { id:"gunungkencana",  nama:"Gunungkencana",   kabupaten:"Lebak", lat:-6.6853, lon:106.0945, radiusKm:7, elevasiM:280, lahanDominan:"campuran", kawasanAdat:false },
  { id:"kalanganyar",    nama:"Kalanganyar",     kabupaten:"Lebak", lat:-6.3812, lon:106.2415, radiusKm:5, elevasiM:80,  lahanDominan:"sawah",    kawasanAdat:false },
  // Kanekes difokuskan ke titik Cibeo/Cikeusik
  { id:"kanekes",        nama:"Kanekes (Baduy)", kabupaten:"Lebak", lat:-6.6111, lon:106.2625, radiusKm:9, elevasiM:450, lahanDominan:"hutan",    kawasanAdat:true  },
  { id:"leuwidamar",     nama:"Leuwidamar",      kabupaten:"Lebak", lat:-6.5521, lon:106.2341, radiusKm:8, elevasiM:210, lahanDominan:"campuran", kawasanAdat:false },
  { id:"maja",           nama:"Maja",            kabupaten:"Lebak", lat:-6.3312, lon:106.3921, radiusKm:6, elevasiM:140, lahanDominan:"sawah",    kawasanAdat:false },
  { id:"malingping",     nama:"Malingping",      kabupaten:"Lebak", lat:-6.8791, lon:105.9912, radiusKm:8, elevasiM:25,  lahanDominan:"sawah",    kawasanAdat:false },
  { id:"muncang",        nama:"Muncang",         kabupaten:"Lebak", lat:-6.5912, lon:106.3051, radiusKm:7, elevasiM:310, lahanDominan:"ladang",   kawasanAdat:false },
  { id:"panggarangan",   nama:"Panggarangan",    kabupaten:"Lebak", lat:-6.9213, lon:106.2131, radiusKm:7, elevasiM:35,  lahanDominan:"campuran", kawasanAdat:false },
  { id:"rangkasbitung",  nama:"Rangkasbitung",   kabupaten:"Lebak", lat:-6.3545, lon:106.2517, radiusKm:6, elevasiM:55,  lahanDominan:"sawah",    kawasanAdat:false },
  { id:"sajira",         nama:"Sajira",          kabupaten:"Lebak", lat:-6.4712, lon:106.3315, radiusKm:7, elevasiM:170, lahanDominan:"sawah",    kawasanAdat:false },
  { id:"sobang",         nama:"Sobang",          kabupaten:"Lebak", lat:-6.6712, lon:106.3521, radiusKm:8, elevasiM:420, lahanDominan:"campuran", kawasanAdat:false },
  { id:"wanasalam",      nama:"Wanasalam",       kabupaten:"Lebak", lat:-6.8415, lon:105.9412, radiusKm:7, elevasiM:45,  lahanDominan:"sawah",    kawasanAdat:false },
  { id:"warunggunung",   nama:"Warunggunung",    kabupaten:"Lebak", lat:-6.3912, lon:106.1821, radiusKm:5, elevasiM:100, lahanDominan:"sawah",    kawasanAdat:false },
  { id:"bayah",          nama:"Bayah",           kabupaten:"Lebak", lat:-6.9321, lon:106.2512, radiusKm:8, elevasiM:25,  lahanDominan:"campuran", kawasanAdat:false },
];

// ─── JAKARTA DATA (Koreksi Elevasi Urban) ─────────────────
export const kecamatanJakarta: Kecamatan[] = [
  { id:"jkt-penjaringan",   nama:"Penjaringan",      kabupaten:"Jakarta Utara",  lat:-6.1241, lon:106.7884, radiusKm:3, elevasiM:1,  lahanDominan:"pesisir", kawasanAdat:false },
  { id:"jkt-koja",          nama:"Koja",             kabupaten:"Jakarta Utara",  lat:-6.1278, lon:106.8914, radiusKm:3, elevasiM:2,  lahanDominan:"urban",   kawasanAdat:false },
  { id:"jkt-cilincing",     nama:"Cilincing",        kabupaten:"Jakarta Utara",  lat:-6.0891, lon:106.9184, radiusKm:4, elevasiM:2,  lahanDominan:"pesisir", kawasanAdat:false },
  { id:"jkt-cengkareng",    nama:"Cengkareng",       kabupaten:"Jakarta Barat",  lat:-6.1481, lon:106.7362, radiusKm:4, elevasiM:4,  lahanDominan:"urban",   kawasanAdat:false },
  { id:"jkt-kalideres",     nama:"Kalideres",        kabupaten:"Jakarta Barat",  lat:-6.1331, lon:106.7021, radiusKm:4, elevasiM:5,  lahanDominan:"campuran",kawasanAdat:false },
  { id:"jkt-gambir",        nama:"Gambir",           kabupaten:"Jakarta Pusat",  lat:-6.1774, lon:106.8188, radiusKm:2, elevasiM:7,  lahanDominan:"urban",   kawasanAdat:false },
  { id:"jkt-menteng",       nama:"Menteng",          kabupaten:"Jakarta Pusat",  lat:-6.1966, lon:106.8352, radiusKm:2, elevasiM:9,  lahanDominan:"urban",   kawasanAdat:false },
  { id:"jkt-jagakarsa",     nama:"Jagakarsa",        kabupaten:"Jakarta Selatan",lat:-6.3309, lon:106.8175, radiusKm:4, elevasiM:45, lahanDominan:"campuran",kawasanAdat:false },
  { id:"jkt-cilandak",      nama:"Cilandak",         kabupaten:"Jakarta Selatan",lat:-6.2897, lon:106.7983, radiusKm:3, elevasiM:35, lahanDominan:"campuran",kawasanAdat:false },
  { id:"jkt-cipayung",      nama:"Cipayung",         kabupaten:"Jakarta Timur",  lat:-6.3131, lon:106.9105, radiusKm:4, elevasiM:40, lahanDominan:"campuran",kawasanAdat:false },
  { id:"jkt-ciracas",       nama:"Ciracas",          kabupaten:"Jakarta Timur",  lat:-6.3021, lon:106.8761, radiusKm:3, elevasiM:38, lahanDominan:"campuran",kawasanAdat:false },
  // Kep. Seribu diperbaiki ke Pulau Kelapa & Pramuka
  { id:"jkt-kepulauan-seribu-utara", nama:"Kep. Seribu Utara", kabupaten:"Kepulauan Seribu", lat:-5.5781, lon:106.5681, radiusKm:5, elevasiM:1, lahanDominan:"pesisir", kawasanAdat:false },
  { id:"jkt-kepulauan-seribu-selatan", nama:"Kep. Seribu Selatan", kabupaten:"Kepulauan Seribu", lat:-5.7481, lon:106.6121, radiusKm:5, elevasiM:1, lahanDominan:"pesisir", kawasanAdat:false },
];

export const kecamatanPandeglang: Kecamatan[] = [
  { id:"pdg-pandeglang",    nama:"Pandeglang",       kabupaten:"Pandeglang", lat:-6.3044, lon:106.1065, radiusKm:6, elevasiM:150, lahanDominan:"sawah",    kawasanAdat:false },
  { id:"pdg-labuan",        nama:"Labuan",           kabupaten:"Pandeglang", lat:-6.3812, lon:105.8291, radiusKm:5, elevasiM:10,  lahanDominan:"campuran", kawasanAdat:false },
  { id:"pdg-carita",        nama:"Carita",           kabupaten:"Pandeglang", lat:-6.3012, lon:105.8421, radiusKm:5, elevasiM:15,  lahanDominan:"campuran", kawasanAdat:false },
  { id:"pdg-menes",         nama:"Menes",            kabupaten:"Pandeglang", lat:-6.3815, lon:105.9231, radiusKm:6, elevasiM:85,  lahanDominan:"sawah",    kawasanAdat:false },
  { id:"pdg-mandalawangi",  nama:"Mandalawangi",     kabupaten:"Pandeglang", lat:-6.3215, lon:106.0121, radiusKm:7, elevasiM:320, lahanDominan:"sawah",    kawasanAdat:false },
  { id:"pdg-sumur",         nama:"Sumur",            kabupaten:"Pandeglang", lat:-6.6612, lon:105.5612, radiusKm:7, elevasiM:20,  lahanDominan:"pesisir",  kawasanAdat:false },
  { id:"pdg-cibaliung",     nama:"Cibaliung",        kabupaten:"Pandeglang", lat:-6.8123, lon:105.8821, radiusKm:7, elevasiM:65,  lahanDominan:"campuran", kawasanAdat:false },
];

export const kecamatanSerang: Kecamatan[] = [
  { id:"srg-serang",        nama:"Serang",           kabupaten:"Serang",  lat:-6.1104, lon:106.1639, radiusKm:6, elevasiM:40,  lahanDominan:"sawah",    kawasanAdat:false },
  { id:"srg-kramatwatu",    nama:"Kramatwatu",       kabupaten:"Serang",  lat:-6.0581, lon:106.1121, radiusKm:6, elevasiM:20,  lahanDominan:"sawah",    kawasanAdat:false },
  { id:"srg-ciruas",        nama:"Ciruas",           kabupaten:"Serang",  lat:-6.1201, lon:106.2401, radiusKm:6, elevasiM:25,  lahanDominan:"sawah",    kawasanAdat:false },
  { id:"srg-pontang",       nama:"Pontang",          kabupaten:"Serang",  lat:-5.9881, lon:106.2412, radiusKm:6, elevasiM:8,   lahanDominan:"pesisir",  kawasanAdat:false },
  { id:"srg-pamarayan",     nama:"Pamarayan",        kabupaten:"Serang",  lat:-6.2812, lon:106.2812, radiusKm:6, elevasiM:45,  lahanDominan:"sawah",    kawasanAdat:false },
];

export const kecamatanBogor: Kecamatan[] = [
  { id:"bgr-bogor-utara",   nama:"Bogor Utara",      kabupaten:"Bogor",   lat:-6.5631, lon:106.8071, radiusKm:5, elevasiM:220, lahanDominan:"sawah",    kawasanAdat:false },
  { id:"bgr-bogor-selatan", nama:"Bogor Selatan",    kabupaten:"Bogor",   lat:-6.6281, lon:106.7971, radiusKm:5, elevasiM:280, lahanDominan:"campuran", kawasanAdat:false },
  { id:"bgr-jonggol",       nama:"Jonggol",          kabupaten:"Bogor",   lat:-6.4812, lon:107.0312, radiusKm:7, elevasiM:195, lahanDominan:"sawah",    kawasanAdat:false },
  { id:"bgr-leuwiliang",    nama:"Leuwiliang",       kabupaten:"Bogor",   lat:-6.5891, lon:106.6121, radiusKm:6, elevasiM:160, lahanDominan:"sawah",    kawasanAdat:false },
  { id:"bgr-cisarua",       nama:"Cisarua",          kabupaten:"Bogor",   lat:-6.6912, lon:106.9421, radiusKm:6, elevasiM:890, lahanDominan:"ladang",   kawasanAdat:false },
];

export const kecamatanByLocation: Record<string, Kecamatan[]> = {
  "lebak":         kecamatanLebak,
  "rangkasbitung": kecamatanLebak,
  "pandeglang":    kecamatanPandeglang,
  "serang":        kecamatanSerang,
  "jakarta":       kecamatanJakarta,
  "bogor":         kecamatanBogor,
};

export const mapCenterByLocation: Record<string, { lat: number; lon: number; zoom: number }> = {
  "lebak":         { lat: -6.65, lon: 106.22, zoom: 10 }, // Diperdekat sedikit biar detail Lebak terlihat
  "rangkasbitung": { lat: -6.35, lon: 106.25, zoom: 11 },
  "pandeglang":    { lat: -6.45, lon: 105.95, zoom: 10 },
  "serang":        { lat: -6.11, lon: 106.16, zoom: 11 },
  "jakarta":       { lat: -6.21, lon: 106.82, zoom: 11 },
  "bogor":         { lat: -6.60, lon: 106.80, zoom: 11 },
};

export const bmkgLocations: BMKGLocation[] = [
  { id:"lebak",         name:"Lebak (Kawasan Baduy)", province:"Banten",      lat:-6.5644, lon:106.2517, adm1:"36", adm2:"3602", adm3:"360224" },
  { id:"rangkasbitung", name:"Rangkasbitung",         province:"Banten",      lat:-6.3545, lon:106.2517, adm1:"36", adm2:"3602", adm3:"360209" },
  { id:"pandeglang",    name:"Pandeglang",            province:"Banten",      lat:-6.3000, lon:106.1000, adm1:"36", adm2:"3601" },
  { id:"serang",        name:"Serang",                province:"Banten",      lat:-6.1104, lon:106.1639, adm1:"36", adm2:"3604" },
  { id:"jakarta",       name:"Jakarta",               province:"DKI Jakarta", lat:-6.2088, lon:106.8456, adm1:"31", adm2:"3171" },
  { id:"bogor",         name:"Bogor",                 province:"Jawa Barat",  lat:-6.5971, lon:106.8060, adm1:"32", adm2:"3201" },
];

export function getLocationById(id: string): BMKGLocation {
  return bmkgLocations.find(l => l.id === id) ?? bmkgLocations[0];
}
export const DEFAULT_LOCATION = bmkgLocations[0];

export type RisikoTanam = "aman" | "waspada" | "bahaya" | "pantang";

export interface ZonaRisiko {
  kecamatanId: string; nama: string; lat: number; lon: number; radiusKm: number;
  risiko: RisikoTanam; skor: number; alasan: string;
  kawasanAdat: boolean; lahanDominan: string; elevasiM: number;
  kabupaten: string;
}

// ─── RISK CALCULATOR (Improved Agronomy Logic) ────────────
export function hitungZonaRisiko(
  rainfall: number,
  month: number,
  bentangPhase: string,
  locationId: string = "lebak"
): ZonaRisiko[] {
  const kecamatanList = kecamatanByLocation[locationId] ?? kecamatanLebak;

  return kecamatanList.map(kec => {
    // 1. Kawasan adat — pantang mutlak
    if (kec.kawasanAdat) return {
      kecamatanId:kec.id, nama:kec.nama, lat:kec.lat, lon:kec.lon, radiusKm:kec.radiusKm,
      risiko:"pantang" as RisikoTanam, skor:0, alasan:"Kawasan adat — dihormati mutlak, dilarang eksploitasi",
      kawasanAdat:true, lahanDominan:kec.lahanDominan, elevasiM:kec.elevasiM,
      kabupaten: kec.kabupaten,
    };

    const isUrban = kec.lahanDominan === "urban";
    const isPesisir = kec.lahanDominan === "pesisir";
    const isLadang = kec.lahanDominan === "ladang" || kec.lahanDominan === "campuran";
    
    // Base score menyesuaikan tipe tanah
    let skor = isUrban ? 40 : isPesisir ? 35 : 65;

    // 2. Curah Hujan Efektif (re)
    // Di elevasi tinggi, suhu lebih dingin, penguapan (evapotranspirasi) rendah, tanah lebih cepat jenuh
    const re = rainfall * (1 + (kec.elevasiM / 1500));
    
    if (re < 5)          skor -= 25; // Kekeringan
    else if (re <= 20)   skor += 20; // Hujan rintik ideal
    else if (re <= 35)   skor += 10; // Hujan sedang
    else if (re <= 60)   skor -= 15; // Hujan lebat
    else                 skor -= 35; // Hujan ekstrem (rawan banjir/longsor)

    // 3. Logika Agronomi: Sawah (Padi Air) vs Ladang (Padi Huma Baduy)
    if (kec.lahanDominan === "sawah") {
      // Sawah suka dataran rendah, tapi rawan banjir kalau hujan ekstrem
      skor += 15;
      if (kec.elevasiM > 500) skor -= 15; // Sawah terasering susah manajemen airnya
      if (kec.elevasiM < 15 && re > 40) skor -= 25; // Rawan kerendam banjir
    } 
    else if (isLadang) {
      // Ladang/Padi Huma (Sistem Baduy) justru butuh drainase (elevasi menengah-tinggi)
      if (kec.elevasiM > 100 && kec.elevasiM < 800) skor += 15; 
      else if (kec.elevasiM >= 800) skor += 5; // Sayuran dataran tinggi
      // Huma sangat sensitif kekeringan karena gak ada irigasi
      if (re < 5) skor -= 15; 
    }
    else if (kec.lahanDominan === "hutan") {
      skor -= 25; // Lahan konservasi
    }

    // Penalti Urban & Pesisir
    if (isUrban) skor -= 10; // Space terbatas untuk pertanian skala masif
    if (isPesisir) skor -= 20; // Salinitas tanah tinggi merusak akar padi

    // 4. Sinkronisasi Fase Bintang (Pengetahuan Tradisional)
    if (bentangPhase === "Kidang Puncak")      skor += 20; // Masa emas tanam
    else if (bentangPhase === "Kidang Muncul") skor += 10; // Persiapan tanam
    else if (bentangPhase === "Gelap Langit")  skor -= 50; // Pantangan keras alam
    else if (bentangPhase === "Bintang Waluku") skor -= 10; // Masa transisi

    // 5. Ekstra Risiko Banjir Rob & Monsun (Bulan Ber-Ber-An)
    const isMusimHujan = [10,11,12,1,2,3].includes(month);
    if (isMusimHujan && kec.elevasiM < 10) skor -= 15;
    if (isMusimHujan && kec.elevasiM > 600 && re > 50) skor -= 15; // Risiko longsor

    // Finalisasi Skor & Klasifikasi
    skor = Math.max(0, Math.min(100, Math.round(skor)));
    const risiko: RisikoTanam = skor >= 75 ? "aman" : skor >= 50 ? "waspada" : "bahaya";

    // Dynamic Reasoning
    let alasan = "";
    if (risiko === "aman") {
      alasan = isLadang ? `Ideal untuk padi huma/palawija, elevasi ${kec.elevasiM}m optimal.` 
                        : `Kondisi air irigasi & curah hujan sangat mendukung.`;
    } else if (risiko === "waspada") {
      if (isUrban) alasan = "Lahan urban padat — maksimalkan metode hidroponik / rooftop.";
      else if (isPesisir) alasan = "Area pesisir — waspada salinitas dan intrusi air laut.";
      else if (re > 35) alasan = "Hujan cukup intens, perhatikan sistem drainase.";
      else alasan = "Peralihan musim, pantau cadangan air tanah.";
    } else {
      if (bentangPhase === "Gelap Langit") alasan = "Masa pantang alam (Gelap Langit). Tanah wajib istirahat.";
      else if (re > 60) alasan = kec.elevasiM > 400 ? "Curah hujan ekstrem — risiko longsor tinggi." : "Curah hujan ekstrem — risiko banjir rendaman.";
      else if (re < 5) alasan = "Krisis air / kemarau — tidak direkomendasikan tanam baru.";
      else alasan = "Kondisi lahan dan cuaca sangat tidak ideal saat ini.";
    }

    return {
      kecamatanId:kec.id, nama:kec.nama, lat:kec.lat, lon:kec.lon, radiusKm:kec.radiusKm,
      risiko, skor, alasan, kawasanAdat:false, lahanDominan:kec.lahanDominan,
      elevasiM:kec.elevasiM, kabupaten: kec.kabupaten,
    };
  });
}