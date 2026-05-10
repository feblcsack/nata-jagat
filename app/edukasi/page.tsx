import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { bentangKidangData } from "@/data/bentangKidang";
import { kalenderBaduyData } from "@/data/kalenderBaduy";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const phaseColors: Record<string, string> = {
  "Kidang Puncak": "border-forest-500 bg-forest-50",
  "Kidang Muncul": "border-forest-400 bg-forest-50",
  "Kidang Turun": "border-sage-500 bg-sage-50",
  "Bintang Waluku": "border-earth-400 bg-earth-50",
  "Luhur Langit": "border-sky-500 bg-sky-50",
  "Gelap Langit": "border-gray-400 bg-gray-50",
};

const dotColors: Record<string, string> = {
  "Kidang Puncak": "bg-forest-500",
  "Kidang Muncul": "bg-forest-400",
  "Kidang Turun": "bg-sage-500",
  "Bintang Waluku": "bg-earth-400",
  "Luhur Langit": "bg-sky-500",
  "Gelap Langit": "bg-gray-400",
};

export default function EdukasiPage() {
  return (
    <main className="min-h-screen bg-cream bg-organic">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-forest-500 text-sm font-medium uppercase tracking-wider mb-3">Edukasi</p>
          <h1 className="font-serif text-4xl font-bold text-forest-900 mb-4">
            Memahami Bentang Kidang
          </h1>
          <p className="text-forest-600 leading-relaxed">
            Bentang Kidang adalah sistem astronomi tradisional masyarakat Baduy di Kanekes, 
            Lebak, Banten. Melalui pengamatan posisi konstelasi Orion yang mereka sebut 
            "Kidang" (Kijang), sesepuh Baduy telah membaca musim dengan presisi tinggi 
            selama berabad-abad — jauh sebelum ada satelit dan BMKG.
          </p>
        </div>

        {/* Philosophy section */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="card-nature rounded-2xl p-6">
            <h2 className="font-serif text-xl font-semibold text-forest-900 mb-3">
              🌌 Apa itu Bentang Kidang?
            </h2>
            <p className="text-sm text-forest-600 leading-relaxed mb-4">
              "Bentang" berarti hamparan atau bentang (seperti bentang langit), 
              sementara "Kidang" adalah nama mereka untuk konstelasi Orion — 
              yang bagi masyarakat Baduy berbentuk seperti kijang berlari.
            </p>
            <p className="text-sm text-forest-600 leading-relaxed mb-4">
              Posisi Kidang di langit berubah setiap bulan sesuai revolusi Bumi. 
              Perubahan inilah yang dibaca sebagai "kalender alam" — menandai kapan 
              harus menanam, merawat, dan memanen.
            </p>
            <p className="text-sm text-forest-600 leading-relaxed">
              Sistem ini tidak hanya tentang bintang — ia mencakup pengamatan fase bulan, 
              pola angin, perilaku hewan, dan kondisi tanah; semua terintegrasi dalam 
              satu panduan hidup yang holistik.
            </p>
          </div>

          <div className="card-nature rounded-2xl p-6">
            <h2 className="font-serif text-xl font-semibold text-forest-900 mb-3">
              🌾 4 Mangsa (Musim) Tradisional
            </h2>
            <div className="space-y-3">
              {[
                {
                  name: "Mangsa Tandur",
                  meaning: "Musim Tanam",
                  desc: "Saat Kidang muncul dan mencapai puncak. Seluruh komunitas bergotong-royong menanam padi.",
                  color: "bg-forest-500",
                  months: "Jun–Okt",
                },
                {
                  name: "Mangsa Tumbuh",
                  meaning: "Musim Pertumbuhan",
                  desc: "Tanaman dirawat intensif. Hujan lebat berpotensi mengancam. Pengawasan ketat.",
                  color: "bg-sage-500",
                  months: "Okt–Des",
                },
                {
                  name: "Mangsa Panen",
                  meaning: "Musim Panen",
                  desc: "Waluku (Orion) bersinar. Ritual Seba dilaksanakan sebagai syukur atas hasil bumi.",
                  color: "bg-earth-400",
                  months: "Jan–Feb",
                },
                {
                  name: "Mangsa Ngaso",
                  meaning: "Musim Istirahat",
                  desc: "Tanah diistirahatkan. Pantang membuka lahan baru. Waktunya memperbaiki alat dan leuit.",
                  color: "bg-gray-400",
                  months: "Mar–Mei",
                },
              ].map((item) => (
                <div key={item.name} className="flex gap-3 items-start">
                  <div className={`w-2 h-2 rounded-full ${item.color} mt-1.5 flex-shrink-0`} />
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold text-forest-800">{item.name}</span>
                      <span className="text-xs text-forest-400">({item.meaning})</span>
                      <span className="text-xs text-forest-400 ml-auto">{item.months}</span>
                    </div>
                    <p className="text-xs text-forest-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Bentang Kidang calendar */}
        <div className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-forest-900 mb-6">
            Kalender Bentang Kidang — 12 Bulan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bentangKidangData.map((item) => (
              <div
                key={item.month}
                className={`rounded-xl border-l-4 p-4 ${phaseColors[item.phase] || "border-gray-300 bg-gray-50"}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-xs text-forest-500 font-medium">{item.monthName}</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${dotColors[item.phase] || "bg-gray-400"}`} />
                      <span className="text-sm font-semibold text-forest-800">{item.phase}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    item.riskLevel === "Aman" ? "bg-forest-100 text-forest-700" :
                    item.riskLevel === "Waspada" ? "bg-amber-100 text-amber-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {item.riskLevel}
                  </span>
                </div>
                <p className="text-xs text-forest-500 leading-relaxed mb-2">{item.meaning}</p>
                <p className="text-xs text-forest-600 leading-relaxed">{item.farmingGuidance}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Kalender Baduy quick view */}
        <div className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-forest-900 mb-6">
            Aktivitas Pertanian Tradisional per Bulan
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-forest-100">
                  <th className="text-left pb-3 pr-4 text-xs font-semibold text-forest-500 uppercase tracking-wider">Bulan</th>
                  <th className="text-left pb-3 pr-4 text-xs font-semibold text-forest-500 uppercase tracking-wider">Aktivitas Utama</th>
                  <th className="text-left pb-3 pr-4 text-xs font-semibold text-forest-500 uppercase tracking-wider">Musim</th>
                  <th className="text-left pb-3 text-xs font-semibold text-forest-500 uppercase tracking-wider">Pantangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest-50">
                {kalenderBaduyData.map((item) => {
                  const bentang = bentangKidangData.find(b => b.month === item.month);
                  return (
                    <tr key={item.month} className="hover:bg-forest-50/50 transition-colors">
                      <td className="py-3 pr-4 font-medium text-forest-800">{item.monthName}</td>
                      <td className="py-3 pr-4 text-forest-600">{item.primaryActivity}</td>
                      <td className="py-3 pr-4">
                        <span className="text-xs bg-forest-100 text-forest-700 px-2 py-0.5 rounded-full">
                          {bentang?.traditionalSeason || "—"}
                        </span>
                      </td>
                      <td className="py-3 text-xs text-red-500">{item.prohibited[0] || "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-forest-950 text-white rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold mb-3">
            Lihat Kondisi Bulan Ini
          </h2>
          <p className="text-forest-300 text-sm mb-6 max-w-md mx-auto">
            Cek sinkronisasi Bentang Kidang dengan data BMKG untuk rekomendasi tanam aktual saat ini.
          </p>
          <Link
            href="/prediksi"
            className="inline-flex items-center gap-2 px-6 py-3 bg-forest-500 text-white font-medium rounded-xl hover:bg-forest-400 transition-colors"
          >
            Buka Dashboard Prediksi
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
