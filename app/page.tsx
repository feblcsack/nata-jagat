import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Star, Leaf, CloudRain, Brain, ChevronDown } from "lucide-react";

const MONTHS_ID = [
  "Januari","Februari","Maret","April","Mei","Juni",
  "Juli","Agustus","September","Oktober","November","Desember"
];

export default function HomePage() {
  const currentMonth = new Date().getMonth();

  return (
    <main className="min-h-screen bg-cream bg-organic">
      <Navbar />

      {/* ====== HERO ====== */}
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-forest-100/60 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-earth-100/40 rounded-full translate-y-1/3 -translate-x-1/3 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-forest-100 text-forest-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6 border border-forest-200/60">
              <span className="w-2 h-2 bg-forest-500 rounded-full animate-pulse" />
              Integrasi Kearifan Lokal × Data BMKG
            </div>

            {/* Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl font-bold text-forest-900 leading-tight mb-6">
              Membaca Alam{" "}
              <span className="text-gradient-forest">Lewat Bintang</span>{" "}
              dan Sains
            </h1>

            <p className="text-lg text-forest-600 leading-relaxed mb-8 max-w-2xl">
              Nata Jagat menggabungkan pengetahuan tradisional Baduy tentang{" "}
              <strong className="text-forest-800">Bentang Kidang</strong> dengan data
              cuaca real-time <strong className="text-forest-800">BMKG</strong> untuk
              menghasilkan rekomendasi musim tanam yang akurat dan berwawasan budaya.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/prediksi"
                className="inline-flex items-center gap-2 px-6 py-3 bg-forest-600 text-white font-medium rounded-xl hover:bg-forest-500 transition-all shadow-lg shadow-forest-200 hover:shadow-forest-300 hover:-translate-y-0.5"
              >
                Lihat Prediksi Tanam
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/edukasi"
                className="inline-flex items-center gap-2 px-6 py-3 border border-forest-200 text-forest-700 font-medium rounded-xl hover:bg-forest-50 transition-all"
              >
                Pelajari Bentang Kidang
                <Star className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Hero stats */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
            {[
              { value: "12", label: "Bulan Kalender", icon: "🌙" },
              { value: "6", label: "Fase Bintang Kidang", icon: "⭐" },
              { value: "4", label: "Musim Tradisional", icon: "🌾" },
              { value: "Real-time", label: "Data BMKG", icon: "📡" },
            ].map((stat) => (
              <div key={stat.label} className="card-nature rounded-xl p-4">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="font-serif font-bold text-xl text-forest-900">{stat.value}</div>
                <div className="text-xs text-forest-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-forest-400 animate-bounce">
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* ====== PROBLEM SECTION ====== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-forest-950 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <p className="text-forest-400 text-sm font-medium uppercase tracking-wider mb-3">Tantangan</p>
            <h2 className="font-serif text-3xl font-bold text-white mb-4">
              Dua Dunia yang Harus Berdialog
            </h2>
            <p className="text-forest-300 text-sm leading-relaxed">
              Perubahan iklim semakin tidak dapat diprediksi, sementara pengetahuan tradisional lokal perlahan terlupakan. 
              Nata Jagat hadir sebagai jembatan.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-forest-900 rounded-xl p-5 border border-forest-800">
              <div className="text-2xl mb-3">🌡️</div>
              <h3 className="font-semibold text-forest-100 mb-2">Perubahan Iklim</h3>
              <p className="text-sm text-forest-400">
                Pola cuaca yang berubah membuat kalender tanam konvensional menjadi tidak akurat. 
                Petani butuh data real-time yang reliable.
              </p>
            </div>
            <div className="bg-forest-900 rounded-xl p-5 border border-forest-800">
              <div className="text-2xl mb-3">📚</div>
              <h3 className="font-semibold text-forest-100 mb-2">Pengetahuan Lokal Terancam</h3>
              <p className="text-sm text-forest-400">
                Kearifan Baduy tentang Bentang Kidang dan kalender pertanian tradisional 
                berisiko hilang jika tidak didokumentasikan dan dipopulerkan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-forest-500 text-sm font-medium uppercase tracking-wider mb-3">Cara Kerja</p>
            <h2 className="font-serif text-3xl font-bold text-forest-900">
              Tiga Pilar, Satu Rekomendasi
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: <Star className="w-6 h-6" />,
                color: "bg-earth-100 text-earth-600",
                title: "Bentang Kidang",
                subtitle: "Pengetahuan Bintang Baduy",
                desc: "Sistem pembacaan posisi konstelasi Orion (Kidang) yang digunakan masyarakat Baduy sejak berabad-abad untuk menentukan musim tanam.",
                badge: "Tradisional",
                badgeColor: "bg-earth-100 text-earth-700",
              },
              {
                icon: <Leaf className="w-6 h-6" />,
                color: "bg-forest-100 text-forest-600",
                title: "Kalender Baduy",
                subtitle: "Siklus Pertanian Kanekes",
                desc: "Panduan aktivitas pertanian bulanan berdasarkan tradisi Baduy: waktu semai, tanam, rawat, hingga panen — beserta ritual dan pantangannya.",
                badge: "Tradisional",
                badgeColor: "bg-forest-100 text-forest-700",
              },
              {
                icon: <CloudRain className="w-6 h-6" />,
                color: "bg-sky-100 text-sky-600",
                title: "Data BMKG",
                subtitle: "Cuaca Real-time",
                desc: "Prakiraan curah hujan, suhu, dan kelembapan dari BMKG Open Data API — diambil real-time, di-cache, dan dinormalisasi untuk akurasi optimal.",
                badge: "Modern",
                badgeColor: "bg-sky-100 text-sky-700",
              },
            ].map((item, i) => (
              <div key={i} className="card-nature rounded-2xl p-6">
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <div className={`inline-block text-xs px-2 py-0.5 rounded-full mb-2 font-medium ${item.badgeColor}`}>
                  {item.badge}
                </div>
                <h3 className="font-serif text-lg font-semibold text-forest-900 mb-1">{item.title}</h3>
                <p className="text-xs text-forest-500 mb-2">{item.subtitle}</p>
                <p className="text-sm text-forest-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Pipeline visual */}
          <div className="card-nature rounded-2xl p-6 max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <div className="bg-earth-100 text-earth-700 text-sm font-medium px-4 py-2 rounded-full">
                🌌 Bentang Kidang
              </div>
              <span className="text-forest-400 font-bold">+</span>
              <div className="bg-forest-100 text-forest-700 text-sm font-medium px-4 py-2 rounded-full">
                🌱 Kalender Baduy
              </div>
              <span className="text-forest-400 font-bold">+</span>
              <div className="bg-sky-100 text-sky-700 text-sm font-medium px-4 py-2 rounded-full">
                🛰️ BMKG
              </div>
            </div>
            <div className="flex items-center justify-center my-3">
              <div className="w-px h-6 bg-forest-200" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <Brain className="w-5 h-5 text-forest-500" />
              <span className="text-sm text-forest-600 font-medium">Decision Engine (Rule-based)</span>
            </div>
            <div className="flex items-center justify-center my-3">
              <div className="w-px h-6 bg-forest-200" />
            </div>
            <div className="bg-forest-600 text-white text-sm font-semibold px-6 py-2 rounded-full inline-block">
              🌾 Rekomendasi Tanam
            </div>
          </div>
        </div>
      </section>

      {/* ====== QUICK PREVIEW ====== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-forest-950">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-3">
            Bulan {MONTHS_ID[currentMonth]} — Apa kata bintang?
          </h2>
          <p className="text-forest-300 mb-8 max-w-lg mx-auto text-sm">
            Cek kondisi sinkronisasi tradisional dan modern untuk bulan ini secara langsung.
          </p>
          <Link
            href={`/prediksi?month=${currentMonth + 1}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-forest-500 text-white font-semibold rounded-xl hover:bg-forest-400 transition-all text-sm"
          >
            Buka Dashboard Prediksi
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ====== EDUCATIONAL TEASER ====== */}
      <section id="tentang" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-forest-500 text-sm font-medium uppercase tracking-wider mb-3">Edukasi</p>
              <h2 className="font-serif text-3xl font-bold text-forest-900 mb-4">
                Mengenal Filosofi Bentang Kidang
              </h2>
              <p className="text-forest-600 leading-relaxed mb-6 text-sm">
                Bentang Kidang adalah sistem pengetahuan langit masyarakat Baduy yang telah 
                diwariskan selama berabad-abad. Melalui pengamatan posisi konstelasi Orion 
                (yang mereka sebut "Kidang"), sesepuh Baduy mampu menentukan waktu tanam, 
                panen, dan masa istirahat lahan dengan presisi tinggi.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  { icon: "🌌", text: "6 fase bintang yang memetakan siklus pertanian" },
                  { icon: "🌙", text: "Sistem kalender lunar yang terintegrasi" },
                  { icon: "🌾", text: "4 mangsa (musim) pertanian tradisional" },
                  { icon: "📿", text: "Ritual dan filosofi yang menyertai setiap fase" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-lg">{item.icon}</span>
                    <p className="text-sm text-forest-600">{item.text}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/edukasi"
                className="inline-flex items-center gap-2 text-forest-600 font-medium text-sm hover:text-forest-800 transition-colors"
              >
                Pelajari selengkapnya
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Visual card */}
            <div className="card-nature rounded-2xl p-6 space-y-3">
              <p className="text-xs font-medium text-forest-500 uppercase tracking-wider">6 Fase Bentang Kidang</p>
              {[
                { phase: "Kidang Puncak", season: "Mangsa Tandur", months: "Sep–Okt", color: "bg-forest-500" },
                { phase: "Kidang Muncul", season: "Mangsa Tandur", months: "Jun–Agt", color: "bg-forest-400" },
                { phase: "Kidang Turun", season: "Mangsa Tumbuh", months: "Nov", color: "bg-sage-500" },
                { phase: "Bintang Waluku", season: "Mangsa Panen", months: "Jan–Feb", color: "bg-earth-400" },
                { phase: "Luhur Langit", season: "Mangsa Tumbuh", months: "Mar & Des", color: "bg-sky-500" },
                { phase: "Gelap Langit", season: "Mangsa Ngaso", months: "Apr–Mei", color: "bg-gray-500" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`} />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-forest-800">{item.phase}</span>
                    <span className="text-xs text-forest-400 ml-2">— {item.season}</span>
                  </div>
                  <span className="text-xs text-forest-400 bg-forest-50 px-2 py-0.5 rounded-full">
                    {item.months}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
