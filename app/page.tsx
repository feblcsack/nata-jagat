import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Star, Leaf, CloudRain, Brain, ChevronDown, BookOpen, Moon, Sparkles, Sprout, Satellite } from "lucide-react";

// 1. PASTIKAN LU IMPORT KOMPONEN ROTATING TEXT-NYA DI SINI BROW!
// Sesuaikan path-nya ya kalau file RotatingText-nya ada di folder lain.
import RotatingText from "@/components/RotatingText"; 
import PixelBlast from "@/components/PixelBlast";

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
     {/* ====== HERO SECTION ====== */}
<section className="relative pt-32 pb-40 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FDFBF7]">
  
  {/* PixelBlast Background Layer */}
  <div className="absolute inset-0 z-0 opacity-[0.15]">
    <PixelBlast
      variant="square"
      pixelSize={6}
      color="#186534" 
      patternScale={2}
      patternDensity={1}
      pixelSizeJitter={0}
      enableRipples
      rippleSpeed={0.3}
      rippleThickness={0.1}
      rippleIntensityScale={1.2}
      speed={0.3}
      edgeFade={0.5}
      transparent
    />
  </div>

  {/* Content Layer (z-10) */}
  <div className="max-w-7xl mx-auto relative z-10">
    <div className="max-w-3xl">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-[#186534]/10 text-[#186534] text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8 border border-[#186534]/10">
        <span className="w-1.5 h-1.5 bg-[#186534] rounded-full animate-pulse" />
        Integrasi Kearifan Lokal × Data BMKG
      </div>

      <h1 className="font-serif text-5xl sm:text-6xl font-black text-[#092c16] leading-[1.05] mb-8 flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <span>Membaca Alam Lewat</span>
        <RotatingText
          texts={['Bintang', 'Dan Sains']}
          mainClassName="bg-[#186534] text-[#FDFBF7] px-5 py-1 md:py-2 rounded-xl overflow-hidden shadow-xl"
          staggerFrom="last"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2400}
          splitBy="characters"
          auto
          loop
        />
      </h1>

      <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-2xl font-medium">
        Nata Jagat menggabungkan pengetahuan tradisional Baduy tentang{" "}
        <strong className="text-[#723b18] font-bold">Bentang Kidang</strong> dengan data
        cuaca real-time <strong className="text-[#124d27] font-bold">BMKG</strong> untuk
        rekomendasi musim tanam yang presisi.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap gap-4">
        <Link
          href="/prediksi"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#186534] text-white text-sm font-bold uppercase tracking-wide hover:bg-[#14532D] transition-all shadow-lg"
        >
          Lihat Prediksi Tanam
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/edukasii"
          className="inline-flex items-center gap-2 px-8 py-4 border border-[#186534]/20 text-[#186534] text-sm font-bold uppercase tracking-wide hover:bg-[#186534]/5 transition-all"
        >
          Pelajari Bentang Kidang
          <Star className="w-4 h-4" />
        </Link>
      </div>
    </div>

    {/* Hero Stats */}
    <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl">
      {[
        { value: "12", label: "Bulan Kalender" },
        { value: "6", label: "Fase Bintang" },
        { value: "4", label: "Musim Tradisi" },
        { value: "Live", label: "BMKG API" },
      ].map((stat) => (
        <div key={stat.label} className="border-l border-[#186534]/20 pl-4 py-1">
          <div className="font-serif font-black text-2xl text-slate-900 mb-0.5">{stat.value}</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
        </div>
      ))}
    </div>
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
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-sans text-[10px] font-bold text-[#92400E] uppercase tracking-[0.2em] mb-4">Arsitektur Sistem</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-black text-slate-900">
              Tiga Pilar, Satu Keputusan.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Bentang Kidang",
                subtitle: "Observasi Astronomi Tradisional",
                desc: "Sistem pembacaan konstelasi Orion (Kidang) yang dijaga turun-temurun oleh masyarakat Baduy untuk membaca kehendak alam.",
                badge: "Kearifan Lokal",
              },
              {
                icon: <Leaf className="w-6 h-6" />,
                title: "Siklus Baduy",
                subtitle: "Fase Pertanian Kanekes",
                desc: "Panduan aktivitas bulanan: waktu semai, tanam, hingga larangan keras (pantang) membuka lahan untuk menjaga keseimbangan ekosistem.",
                badge: "Hukum Adat",
              },
              {
                icon: <Satellite className="w-6 h-6" />,
                title: "Data BMKG",
                subtitle: "Telemetri Cuaca Modern",
                desc: "Prakiraan curah hujan, suhu, dan kelembapan ditarik secara real-time melalui Open Data API resmi dari BMKG.",
                badge: "Sains Modern",
              },
            ].map((item, i) => (
              <div key={i} className="border border-slate-200 bg-white p-8 hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-[#186534]">{item.icon}</div>
                  <span className="font-sans text-[9px] font-bold text-slate-500 uppercase tracking-widest border border-slate-200 px-2 py-1">{item.badge}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="font-sans text-[11px] font-bold text-[#92400E] uppercase tracking-wider mb-4">{item.subtitle}</p>
                <p className="font-sans text-sm text-slate-600 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Clean Pipeline Visual */}
          <div className="max-w-3xl mx-auto border border-slate-200 bg-white p-8 md:p-12 text-center">
            <p className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Alur Pemrosesan Decision Engine</p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-8">
              <div className="font-sans text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 px-6 py-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" /> Bintang
              </div>
              <span className="text-slate-300 font-serif italic text-xl">+</span>
              <div className="font-sans text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 px-6 py-3 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-500" /> Adat
              </div>
              <span className="text-slate-300 font-serif italic text-xl">+</span>
              <div className="font-sans text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 px-6 py-3 flex items-center gap-2">
                <Satellite className="w-4 h-4 text-sky-500" /> BMKG
              </div>
            </div>

            <div className="flex flex-col items-center justify-center relative">
              <div className="w-px h-8 bg-slate-200 mb-4" />
              <div className="bg-[#186534] text-white p-4 z-10">
                <Brain className="w-6 h-6" />
              </div>
              <div className="w-px h-8 bg-slate-200 mt-4" />
            </div>

            <div className="inline-flex items-center gap-3 font-serif text-2xl font-black text-slate-900 mt-4">
              <Sprout className="w-6 h-6 text-[#186534]" />
              Rekomendasi Penanaman Final
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
      {/* ====== EDUCATIONAL TEASER (EDITORIAL STYLE) ====== */}
      <section id="tentang" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] relative border-t border-slate-200 overflow-hidden">
        
        {/* Subtle grid lines background to match the reference image's magazine aesthetic */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #186534 1px, transparent 1px)', backgroundSize: '120px 100%' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-12 items-center">
            
            {/* Left Side: Typography & Copy */}
            <div className="lg:col-span-7">
              <p className="font-sans text-[11px] font-bold text-[#92400E] uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-[#92400E]/40" /> Edukasi Baduy
              </p>
              
              <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-black text-[#186534] leading-[1.05] tracking-tight mb-8">
                Leluhur Membaca Langit.<br />
                <span className="text-slate-900">Kita Mewarisinya.</span>
              </h2>
              
              <p className="font-sans text-lg text-slate-600 leading-relaxed mb-10 max-w-xl font-medium">
                Bentang Kidang adalah sistem pengetahuan langit masyarakat Baduy. Melalui pengamatan presisi posisi konstelasi Orion, sesepuh Baduy menentukan waktu tanam, panen, dan masa istirahat lahan dengan akurasi yang melampaui zaman.
              </p>
              
              <div className="space-y-4 mb-10 border-l-2 border-[#186534]/20 pl-5">
                {[
                  { icon: <Sparkles className="w-5 h-5" />, text: "6 fase bintang yang memetakan siklus pertanian." },
                  { icon: <Moon className="w-5 h-5" />, text: "Sistem kalender lunar yang terintegrasi alam." },
                  { icon: <Leaf className="w-5 h-5" />, text: "4 mangsa (musim) pertanian tradisional presisi." },
                  { icon: <BookOpen className="w-5 h-5" />, text: "Filosofi keseimbangan: mengambil secukupnya, merawat sepenuhnya." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <span className="text-[#186534]">{item.icon}</span>
                    <p className="font-sans text-sm font-semibold text-slate-700">{item.text}</p>
                  </div>
                ))}
              </div>
              
              <Link
                href="/edukasii"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#186534] text-[#FDFBF7] font-bold rounded-none hover:bg-[#14532D] transition-all text-sm tracking-wide uppercase shadow-lg shadow-[#186534]/20"
              >
                Pelajari Filosofinya
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right Side: Clean List Card (Mimicking the reference's feature list) */}
            <div className="lg:col-span-5">
              <div className="bg-white p-8 lg:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                  <p className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-widest">Siklus 6 Fase Bintang</p>
                  <Star className="w-4 h-4 text-slate-300" />
                </div>
                
                <div className="space-y-5">
                  {[
                    { phase: "Kidang Puncak", season: "Mangsa Tandur", months: "Sep–Okt" },
                    { phase: "Kidang Muncul", season: "Mangsa Tandur", months: "Jun–Agt" },
                    { phase: "Kidang Turun", season: "Mangsa Tumbuh", months: "Nov" },
                    { phase: "Bintang Waluku", season: "Mangsa Panen", months: "Jan–Feb" },
                    { phase: "Luhur Langit", season: "Mangsa Tumbuh", months: "Mar & Des" },
                    { phase: "Gelap Langit", season: "Mangsa Ngaso", months: "Apr–Mei" },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-50 last:border-0 last:pb-0 group">
                      <div>
                        <p className="font-serif font-bold text-slate-900 text-lg group-hover:text-[#186534] transition-colors">{item.phase}</p>
                        <p className="font-sans text-xs text-slate-500 font-medium tracking-wide mt-0.5">{item.season}</p>
                      </div>
                      <span className="font-sans text-[10px] font-bold text-[#92400E] bg-[#92400E]/5 px-3 py-1.5 border border-[#92400E]/10 self-start sm:self-auto">
                        {item.months}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}