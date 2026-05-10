import { BentangKidang } from "@/types";

/**
 * BENTANG KIDANG — DATA PENGETAHUAN TRADISIONAL BADUY
 *
 * Bentang Kidang (Rasi Bintang Kidang / Orion) adalah konstelasi utama
 * yang digunakan masyarakat Baduy untuk menentukan musim tanam.
 *
 * Parameter yang ditetapkan:
 * - Bulan 1-3   : Bintang Waluku (Orion) terlihat jelas → tanda pasca-panen
 * - Bulan 4-5   : Gelap Langit → masa istirahat tanah
 * - Bulan 6-8   : Kidang Muncul di timur → tanda akan masuk musim tanam
 * - Bulan 9-10  : Kidang Puncak → puncak musim tanam (PRIORITAS TINGGI)
 * - Bulan 11    : Kidang Turun → akhir masa tanam, mulai tumbuh
 * - Bulan 12    : Luhur Langit → masa pertumbuhan dan perawatan
 */

export const bentangKidangData: BentangKidang[] = [
  {
    month: 1,
    monthName: "Januari",
    phase: "Bintang Waluku",
    meaning: "Waluku (Orion) bersinar di tengah malam — masa panen padi",
    traditionalSeason: "Mangsa Panen",
    lunarCycle: "Bulan mulai mengecil, langit cerah di malam hari",
    starPosition:
      "Bintang Waluku (Orion) berada di posisi zenith sekitar pukul 21:00",
    farmingGuidance:
      "Selesaikan panen sebelum hujan besar. Simpan benih terbaik untuk musim berikutnya.",
    riskLevel: "Aman",
    description:
      "Dalam tradisi Baduy, kemunculan Waluku di puncak langit malam adalah sinyal untuk segera menyelesaikan panen. Masyarakat melakukan ritual Seba sebagai ungkapan syukur atas hasil bumi.",
  },
  {
    month: 2,
    monthName: "Februari",
    phase: "Bintang Waluku",
    meaning: "Waluku mulai bergerak ke barat — transisi panen ke istirahat",
    traditionalSeason: "Mangsa Panen",
    lunarCycle: "Bulan baru, curah hujan mulai berkurang",
    starPosition: "Waluku bergeser ke barat daya sekitar pukul 22:00",
    farmingGuidance:
      "Selesaikan panen. Mulai olah lahan ringan. Simpan pupuk organik.",
    riskLevel: "Aman",
    description:
      "Masa transisi panen ke persiapan. Tanah mulai diistirahatkan. Keluarga Baduy berkumpul untuk berbagi hasil panen dan mendiskusikan rencana tanam berikutnya.",
  },
  {
    month: 3,
    monthName: "Maret",
    phase: "Luhur Langit",
    meaning: "Langit kosong dari bintang tanam — masa jeda dan refleksi",
    traditionalSeason: "Mangsa Ngaso",
    lunarCycle: "Peralihan musim, langit sering tertutup awan",
    starPosition: "Tidak ada bintang penanda tanam yang dominan",
    farmingGuidance:
      "Istirahatkan lahan. Perbaiki saluran air. Siapkan kompos untuk musim depan.",
    riskLevel: "Aman",
    description:
      "Ngaso berarti istirahat. Tanah dibiarkan memulihkan diri. Orang Baduy percaya bahwa tanah juga membutuhkan waktu untuk bernapas. Tidak ada aktivitas membajak di masa ini.",
  },
  {
    month: 4,
    monthName: "April",
    phase: "Gelap Langit",
    meaning: "Gelap Langit — pantang membuka lahan baru",
    traditionalSeason: "Mangsa Ngaso",
    lunarCycle: "Bulan purnama sering terjadi di awal April",
    starPosition:
      "Langit relatif kosong dari konstelasi pertanian, bintang tanam tidak terlihat",
    farmingGuidance:
      "JANGAN membuka lahan baru. Fokus pada perawatan kebun pekarangan. Simpan benih.",
    riskLevel: "Tunda",
    description:
      "Gelap Langit adalah periode pantang dalam kalender Baduy. Membuka lahan baru di masa ini diyakini akan membawa gagal panen. Aktivitas pertanian dibatasi hanya untuk pemeliharaan.",
  },
  {
    month: 5,
    monthName: "Mei",
    phase: "Gelap Langit",
    meaning: "Masa peralihan — langit mulai mempersiapkan Kidang",
    traditionalSeason: "Mangsa Ngaso",
    lunarCycle: "Musim kemarau mulai, curah hujan menurun",
    starPosition: "Konstelasi Kidang mulai terlihat di ufuk timur menjelang subuh",
    farmingGuidance:
      "Mulai persiapan benih. Perbaiki pematang sawah. Pembersihan lahan ringan boleh dilakukan.",
    riskLevel: "Waspada",
    description:
      "Masa peralihan kritis. Mulai terlihat tanda-tanda kemunculan Kidang di ufuk timur sebelum fajar. Petani Baduy mulai mengamati langit lebih intens dan berdiskusi dengan sesepuh.",
  },
  {
    month: 6,
    monthName: "Juni",
    phase: "Kidang Muncul",
    meaning: "Kidang (rasi tanam) mulai muncul — sinyal persiapan tanam",
    traditionalSeason: "Mangsa Tandur",
    lunarCycle: "Bulan sabit, awal perhitungan kalender tanam Baduy",
    starPosition:
      "Bintang Kidang (Orion) terlihat jelas di timur saat dini hari sekitar pukul 03:00-04:00",
    farmingGuidance:
      "Mulai persiapan lahan serius. Buka lahan, bajak tanah. Siapkan benih pilihan.",
    riskLevel: "Aman",
    description:
      "Kemunculan Kidang adalah momen yang ditunggu-tunggu! Para sesepuh Baduy mengumumkan dimulainya perhitungan hari tanam. Seluruh keluarga mulai bergotong royong membuka dan mengolah lahan.",
  },
  {
    month: 7,
    monthName: "Juli",
    phase: "Kidang Muncul",
    meaning: "Kidang semakin jelas — persiapan pembibitan",
    traditionalSeason: "Mangsa Tandur",
    lunarCycle: "Musim kemarau puncak, langit malam sangat jernih",
    starPosition: "Kidang terlihat pukul 02:00-05:00, sangat jelas di musim kemarau",
    farmingGuidance:
      "Semai benih padi. Persiapkan persemaian. Pastikan sumber air tersedia untuk musim hujan.",
    riskLevel: "Aman",
    description:
      "Masa penyemaian benih. Langit kemarau yang jernih memudahkan pembacaan bintang. Sesepuh mengajarkan anak-anak cara membaca posisi Kidang sebagai warisan pengetahuan.",
  },
  {
    month: 8,
    monthName: "Agustus",
    phase: "Kidang Muncul",
    meaning: "Kidang di posisi strategis — puncak persiapan tanam",
    traditionalSeason: "Mangsa Tandur",
    lunarCycle: "Bulan purnama memberi cahaya untuk kerja malam di sawah",
    starPosition: "Kidang terlihat sepanjang malam, posisi optimal untuk navigasi",
    farmingGuidance:
      "Bibit siap dipindah. Lahan harus sudah siap. Mulai tanam awal bulan jika hujan mulai.",
    riskLevel: "Aman",
    description:
      "Puncak persiapan tanam. Bibit sudah cukup umur untuk dipindahkan. Masyarakat Baduy mengadakan musyawarah desa untuk menentukan hari baik tanam berdasarkan posisi Kidang dan kondisi lahan.",
  },
  {
    month: 9,
    monthName: "September",
    phase: "Kidang Puncak",
    meaning: "Kidang di puncak langit — WAKTU TANAM TERBAIK",
    traditionalSeason: "Mangsa Tandur",
    lunarCycle: "Awal musim hujan, bulan mulai penuh",
    starPosition: "Kidang berada di zenith sekitar tengah malam — posisi terbaik",
    farmingGuidance:
      "INI SAAT TERBAIK TANAM! Segera tanam padi. Aktifkan seluruh anggota keluarga. Jangan ditunda.",
    riskLevel: "Aman",
    description:
      "MANGSA TANDUR UTAMA. Kidang di puncak adalah tanda paling suci dalam kalender tanam Baduy. Semua aktivitas lain dihentikan untuk fokus menanam. Ini adalah momen paling sakral dalam siklus pertanian Baduy.",
  },
  {
    month: 10,
    monthName: "Oktober",
    phase: "Kidang Puncak",
    meaning: "Kidang masih di puncak — lanjutkan tanam dan perawatan awal",
    traditionalSeason: "Mangsa Tumbuh",
    lunarCycle: "Musim hujan tiba, curah hujan meningkat",
    starPosition: "Kidang bergeser sedikit ke barat tapi masih dominan",
    farmingGuidance:
      "Selesaikan penanaman. Mulai perawatan tanaman muda. Jaga dari hama dan genangan.",
    riskLevel: "Aman",
    description:
      "Masa tanam lanjutan dan perawatan awal. Tanaman padi mulai tumbuh. Petani Baduy melakukan ritual kecil untuk melindungi tanaman muda dari hama dan gangguan cuaca.",
  },
  {
    month: 11,
    monthName: "November",
    phase: "Kidang Turun",
    meaning: "Kidang mulai turun ke barat — fokus perawatan tanaman",
    traditionalSeason: "Mangsa Tumbuh",
    lunarCycle: "Puncak musim hujan, curah hujan tertinggi",
    starPosition: "Kidang bergeser ke barat daya, terbenam lebih cepat",
    farmingGuidance:
      "Fokus perawatan intensif. Atasi genangan air. Waspadai penyakit tanaman di musim basah.",
    riskLevel: "Waspada",
    description:
      "Masa kritis pertumbuhan. Kidang yang mulai turun menandakan tantangan alam akan datang. Hujan lebat berpotensi mengancam tanaman. Sesepuh Baduy mengajarkan cara tradisional mengelola air sawah.",
  },
  {
    month: 12,
    monthName: "Desember",
    phase: "Luhur Langit",
    meaning: "Luhur Langit — masa tumbuh dan menunggu panen",
    traditionalSeason: "Mangsa Tumbuh",
    lunarCycle: "Akhir tahun, musim hujan berlanjut",
    starPosition: "Waluku mulai muncul kembali — siklus akan berulang",
    farmingGuidance:
      "Perawatan rutin. Amati tanda-tanda panen. Siapkan peralatan panen untuk Januari.",
    riskLevel: "Waspada",
    description:
      "Masa menunggu panen dengan penuh kesabaran. Langit malam kembali menampilkan Waluku di ufuk timur — menandakan siklus akan segera berulang. Generasi tua mulai mengajarkan tanda-tanda kesiapan panen kepada yang muda.",
  },
];

export function getBentangKidang(month: number): BentangKidang {
  const data = bentangKidangData.find((b) => b.month === month);
  if (!data) {
    return bentangKidangData[new Date().getMonth()];
  }
  return data;
}

export function getCurrentBentangKidang(): BentangKidang {
  const currentMonth = new Date().getMonth() + 1;
  return getBentangKidang(currentMonth);
}
