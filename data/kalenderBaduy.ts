import { KalenderBaduy } from "@/types";

/**
 * KALENDER BADUY — SIKLUS AKTIVITAS PERTANIAN TRADISIONAL
 *
 * Berdasarkan tradisi masyarakat Baduy Dalam dan Baduy Luar
 * di kawasan Kanekes, Lebak, Banten.
 */

export const kalenderBaduyData: KalenderBaduy[] = [
  {
    month: 1,
    monthName: "Januari",
    activities: [
      "Panen padi utama",
      "Ritual Seba (menghadap kepala desa)",
      "Pembersihan dan penjemuran gabah",
      "Seleksi benih untuk musim depan",
    ],
    primaryActivity: "Panen Padi",
    rituals: [
      "Seba — upacara syukur hasil panen ke sesepuh",
      "Doa tolak bala di sawah",
    ],
    prohibited: [
      "Membuka lahan baru",
      "Membakar hutan",
      "Membuang sisa panen sembarangan",
    ],
    recommendation:
      "Selesaikan panen dan lakukan ritual Seba. Simpan 20% hasil terbaik sebagai benih.",
  },
  {
    month: 2,
    monthName: "Februari",
    activities: [
      "Penyelesaian panen",
      "Pengolahan gabah menjadi beras",
      "Perbaikan lumbung padi (leuit)",
      "Istirahat sawah tahap pertama",
    ],
    primaryActivity: "Pasca Panen & Perawatan Leuit",
    rituals: ["Doa selamatan leuit (lumbung padi)", "Tabur bunga di lahan panen"],
    prohibited: ["Menjual seluruh benih padi", "Merusak pematang sawah"],
    recommendation:
      "Perbaiki leuit dan pastikan gabah tersimpan kering. Jangan jual semua beras — sisakan untuk konsumsi dan benih.",
  },
  {
    month: 3,
    monthName: "Maret",
    activities: [
      "Istirahat lahan (ngaso)",
      "Pembuatan kompos dari sisa panen",
      "Perbaikan saluran irigasi tradisional",
      "Pengumpulan kayu bakar",
    ],
    primaryActivity: "Ngaso — Istirahat Lahan",
    rituals: ["Doa bumi — memohon kesuburan tanah"],
    prohibited: [
      "Membajak tanah sawah utama",
      "Menanam tanaman baru di sawah",
      "Memotong pohon besar di hutan larangan",
    ],
    recommendation:
      "Biarkan tanah bernafas. Fokus pada pembuatan pupuk organik dari sisa tanaman dan kotoran hewan.",
  },
  {
    month: 4,
    monthName: "April",
    activities: [
      "Masa pantang pertanian utama",
      "Perawatan kebun pekarangan",
      "Menanam sayuran di sekitar rumah",
      "Kerajinan tangan dan tenun",
    ],
    primaryActivity: "Masa Pantang — Kebun Pekarangan",
    rituals: [
      "Ritual pantang pembukaan lahan",
      "Doa perlindungan benih yang disimpan",
    ],
    prohibited: [
      "DILARANG membuka lahan baru di sawah",
      "DILARANG membajak tanah",
      "Kegiatan pertanian besar di ladang",
    ],
    recommendation:
      "TUNDA semua rencana tanam di sawah. Fokus berkebun kecil di pekarangan untuk kebutuhan dapur sehari-hari.",
  },
  {
    month: 5,
    monthName: "Mei",
    activities: [
      "Akhir masa pantang",
      "Persiapan pembibitan padi",
      "Seleksi dan perlakuan benih",
      "Perbaikan alat pertanian",
    ],
    primaryActivity: "Persiapan Benih & Alat",
    rituals: ["Ritual perendaman benih — doa keberhasilan bibit"],
    prohibited: ["Menanam langsung di sawah (belum waktunya)", "Membakar lahan"],
    recommendation:
      "Mulai seleksi benih terbaik. Rendam benih dalam air bersih selama 2 malam. Perbaiki cangkul, parang, dan alat tanam.",
  },
  {
    month: 6,
    monthName: "Juni",
    activities: [
      "Pembukaan lahan resmi",
      "Pembajakan sawah pertama",
      "Penyemaian benih di persemaian",
      "Gotong royong bersihkan irigasi",
    ],
    primaryActivity: "Pembukaan Lahan & Semai",
    rituals: [
      "Ritual ngaseuk — penanaman simbolis pertama oleh sesepuh",
      "Doa pembuka musim tanam",
    ],
    prohibited: ["Bertengkar di area sawah", "Berkata kotor di lahan pertanian"],
    recommendation:
      "Buka lahan dengan gotong royong. Semai benih di persemaian kecil. Upacara ngaseuk harus dilakukan sebelum tanam massal.",
  },
  {
    month: 7,
    monthName: "Juli",
    activities: [
      "Perawatan persemaian",
      "Pemupukan lahan utama",
      "Pembajakan kedua",
      "Persiapan sistem irigasi",
    ],
    primaryActivity: "Perawatan Persemaian",
    rituals: ["Pengamatan bintang Kidang oleh sesepuh untuk konfirmasi musim"],
    prohibited: ["Membuang air irigasi secara boros", "Menebang pohon dekat sumber air"],
    recommendation:
      "Bibit di persemaian butuh perawatan hati-hati. Pastikan irigasi mengalir lancar. Perkuat pematang sawah sebelum musim hujan.",
  },
  {
    month: 8,
    monthName: "Agustus",
    activities: [
      "Bibit siap pindah tanam",
      "Persiapan akhir lahan",
      "Musyawarah penentuan hari tanam",
      "Mulai tanam awal (jika hujan sudah turun)",
    ],
    primaryActivity: "Bibit Siap — Persiapan Tanam",
    rituals: [
      "Musyawarah sesepuh — penetapan hari baik tanam",
      "Doa bersama sebelum tanam massal",
    ],
    prohibited: [
      "Tanam tanpa restu sesepuh",
      "Menggunakan pupuk kimia di lahan Baduy Dalam",
    ],
    recommendation:
      "Tunggu keputusan sesepuh untuk hari tanam. Bibit usia 25-30 hari sudah siap dipindahkan. Lahan harus tergenang tipis air bersih.",
  },
  {
    month: 9,
    monthName: "September",
    activities: [
      "TANAM MASSAL — prioritas utama",
      "Gotong royong antar keluarga",
      "Penanaman padi serempak",
      "Pengamatan curah hujan",
    ],
    primaryActivity: "TANDUR — Tanam Massal",
    rituals: [
      "Ngaseuk massal — tanam simbolis bersama seluruh kampung",
      "Doa perlindungan tanaman dari hama",
      "Pemberian sesajen di sudut-sudut sawah",
    ],
    prohibited: [
      "Mengabaikan lahan setelah tanam",
      "Pergi jauh dari kampung saat musim tanam",
      "Berkelahi atau berselisih selama musim tanam",
    ],
    recommendation:
      "INI PUNCAK MUSIM TANAM! Kerahkan seluruh tenaga keluarga. Tanam padi dalam 2 minggu pertama September untuk hasil optimal sesuai kalender Kidang.",
  },
  {
    month: 10,
    monthName: "Oktober",
    activities: [
      "Selesaikan tanam yang belum beres",
      "Perawatan tanaman muda",
      "Pengendalian gulma",
      "Pengawasan hama burung dan tikus",
    ],
    primaryActivity: "Perawatan Tanaman Muda",
    rituals: ["Ritual pengusir hama secara tradisional", "Doa pertumbuhan tanaman"],
    prohibited: [
      "Menginjak tanaman padi yang baru tumbuh",
      "Membakar sampah dekat sawah",
    ],
    recommendation:
      "Selesaikan tanam paling lambat minggu pertama Oktober. Mulai perawatan intensif — siangi gulma dan awasi hama tikus.",
  },
  {
    month: 11,
    monthName: "November",
    activities: [
      "Perawatan intensif",
      "Pemupukan susulan organik",
      "Pengelolaan genangan hujan lebat",
      "Pemantauan penyakit tanaman",
    ],
    primaryActivity: "Perawatan Intensif Musim Hujan",
    rituals: ["Doa tolak banjir dan penyakit tanaman"],
    prohibited: ["Mengalirkan air berlebih yang merusak akar", "Aplikasi pestisida kimia"],
    recommendation:
      "Waspada curah hujan tinggi. Pastikan saluran drainase tidak tersumbat. Gunakan abu kayu dan rempah tradisional untuk mencegah jamur pada tanaman.",
  },
  {
    month: 12,
    monthName: "Desember",
    activities: [
      "Perawatan lanjutan",
      "Pengamatan tanda-tanda panen",
      "Persiapan alat panen",
      "Perbaikan leuit untuk panen mendatang",
    ],
    primaryActivity: "Menunggu Panen & Persiapan",
    rituals: [
      "Pengamatan bintang Waluku — tanda panen akan tiba",
      "Syukuran kecil keluarga",
    ],
    prohibited: ["Memanen sebelum waktunya", "Menjual hasil panen sebelum upacara"],
    recommendation:
      "Sabar menunggu panen. Padi butuh sekitar 3 bulan dari tanam. Persiapkan ani-ani (alat panen tradisional) dan pastikan leuit sudah bersih dan kering.",
  },
];

export function getKalenderBaduy(month: number): KalenderBaduy {
  const data = kalenderBaduyData.find((k) => k.month === month);
  if (!data) {
    return kalenderBaduyData[new Date().getMonth()];
  }
  return data;
}

export function getCurrentKalenderBaduy(): KalenderBaduy {
  const currentMonth = new Date().getMonth() + 1;
  return getKalenderBaduy(currentMonth);
}
