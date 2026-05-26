import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ArrowRight, 
  Star, 
  Leaf, 
  Brain, 
  BookOpen, 
  Moon, 
  Sparkles, 
  Sprout, 
  Satellite, 
  ThermometerSun, 
  Landmark 
} from "lucide-react";

// 1. PASTIKAN LU IMPORT KOMPONEN ROTATING TEXT & PIXEL BLAST DI SINI BROW!
import RotatingText from "@/components/RotatingText"; 
import PixelBlast from "@/components/PixelBlast";

const MONTHS_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

export default function HomePage() {
  const currentMonth = new Date().getMonth();

  return (
    <main className="min-h-screen bg-[#FDFBF7] selection:bg-[#186534] selection:text-white">
      <Navbar />

      {/* ====== HERO SECTION ====== */}
      <section className="relative pt-32 pb-32 lg:pt-40 lg:pb-40 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FDFBF7]">
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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left: Copy */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#186534]/10 text-[#186534] text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8 border border-[#186534]/10">
                <span className="w-1.5 h-1.5 bg-[#186534] rounded-full animate-pulse" />
                Integrasi Kearifan Lokal × Data BMKG
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-[#092c16] leading-[1.1] mb-8 flex flex-wrap items-baseline gap-x-3 gap-y-2">
                <span>Membaca Alam</span>
                <span>Lewat</span>
                <RotatingText
                  texts={['Bintang', 'Sains']}
                  mainClassName="text-[#186534] overflow-hidden border-b-[4px] border-[#186534] pb-1"
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

              <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-xl font-medium">
                Nata Jagat menggabungkan pengetahuan tradisional Baduy tentang{" "}
                <strong className="text-[#92400E] font-bold">Bentang Kidang</strong> dengan data
                cuaca real-time <strong className="text-[#186534] font-bold">BMKG</strong> untuk
                rekomendasi musim tanam yang presisi.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-16">
                <Link
                  href="/prediksi"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#186534] text-white text-sm font-bold uppercase tracking-wide hover:bg-[#092c16] transition-colors duration-300 shadow-xl shadow-[#186534]/20 rounded-sm"
                >
                  Lihat Prediksi Tanam
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/edukasii"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-[#186534]/20 text-[#186534] text-sm font-bold uppercase tracking-wide hover:bg-[#186534]/5 transition-colors duration-300 rounded-sm"
                >
                  Pelajari Bentang Kidang
                  <Star className="w-4 h-4" />
                </Link>
              </div>

              {/* Hero Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { value: "12", label: "Bulan Kalender" },
                  { value: "6", label: "Fase Bintang" },
                  { value: "4", label: "Musim Tradisi" },
                  { value: "Live", label: "BMKG API" },
                ].map((stat) => (
                  <div key={stat.label} className="border-l-2 border-[#186534]/20 pl-4 py-1">
                    <div className="font-serif font-black text-3xl text-slate-900 mb-1">{stat.value}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image Panel */}
            <div className="hidden lg:block relative w-full">
              <div className="relative h-[600px] w-full overflow-hidden rounded-sm shadow-2xl">
                {/* Main image - Sawah Tradisional */}
                <img
                  src="https://images.unsplash.com/photo-1559628233-eb1b1a45564b?auto=format&fit=crop&q=80&w=1200"
                  alt="Sawah tradisional Indonesia"
                  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#092c16]/80 via-[#092c16]/20 to-transparent" />
                
                {/* Floating card bottom-left */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#FDFBF7]/95 backdrop-blur-md p-6 border-l-4 border-[#186534] shadow-lg">
                  <p className="font-sans text-[10px] font-bold text-[#92400E] uppercase tracking-widest mb-1">Fase Aktif Saat Ini</p>
                  <p className="font-serif font-black text-slate-900 text-2xl leading-tight mb-1">Bintang Waluku</p>
                  <p className="font-sans text-xs text-slate-600 font-medium flex items-center gap-2">
                    <Moon className="w-3 h-3 text-[#186534]" /> Mangsa Panen — Jan–Feb
                  </p>
                </div>

                {/* Top-right label */}
                <div className="absolute top-6 right-6 bg-[#186534]/90 backdrop-blur-sm text-white px-4 py-2 rounded-sm">
                  <p className="font-sans text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <Leaf className="w-3 h-3" /> Kanekes, Banten
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====== PROBLEM SECTION ====== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#092c16] text-white relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-[#4ade80] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Tantangan Kita</p>
            <h2 className="font-serif text-4xl font-black text-white mb-6 leading-tight">
              Dua Dunia yang <span className="text-[#4ade80]">Harus Berdialog</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Perubahan iklim membuat cuaca semakin tidak dapat diprediksi, sementara pengetahuan tradisional lokal perlahan terlupakan. Nata Jagat hadir sebagai jembatan.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white/5 border border-white/10 rounded-sm p-8 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
              <div className="bg-[#4ade80]/10 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <ThermometerSun className="w-7 h-7 text-[#4ade80]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">Anomali Iklim</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Pola cuaca yang berubah ekstrem membuat kalender tanam konvensional seringkali meleset. Petani masa kini membutuhkan data real-time yang dapat diandalkan.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white/5 border border-white/10 rounded-sm p-8 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
              <div className="bg-[#fbbf24]/10 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Landmark className="w-7 h-7 text-[#fbbf24]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">Erosi Pengetahuan Lokal</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Kearifan leluhur Baduy tentang Bentang Kidang berisiko hilang ditelan zaman jika tidak didokumentasikan dan diintegrasikan dengan teknologi modern.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="font-sans text-[10px] font-bold text-[#92400E] uppercase tracking-[0.2em] mb-4">Arsitektur Sistem</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-black text-slate-900">
              Tiga Pilar, <span className="text-[#186534]">Satu Keputusan.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Bentang Kidang",
                subtitle: "Observasi Astronomi",
                desc: "Sistem pembacaan konstelasi Orion (Kidang) yang dijaga turun-temurun oleh masyarakat Baduy untuk membaca kehendak alam.",
                badge: "Kearifan Lokal",
                color: "text-amber-600",
                bgColor: "bg-amber-50"
              },
              {
                icon: <Leaf className="w-6 h-6" />,
                title: "Siklus Baduy",
                subtitle: "Fase Pertanian",
                desc: "Panduan aktivitas bulanan: waktu semai, tanam, hingga larangan keras (pantang) membuka lahan untuk menjaga keseimbangan ekosistem.",
                badge: "Hukum Adat",
                color: "text-emerald-600",
                bgColor: "bg-emerald-50"
              },
              {
                icon: <Satellite className="w-6 h-6" />,
                title: "Data BMKG",
                subtitle: "Telemetri Modern",
                desc: "Prakiraan curah hujan, suhu, dan kelembapan ditarik secara real-time melalui Open Data API resmi dari BMKG.",
                badge: "Sains Modern",
                color: "text-sky-600",
                bgColor: "bg-sky-50"
              },
            ].map((item, i) => (
              <div key={i} className="group border border-slate-200 bg-white p-8 hover:shadow-2xl hover:shadow-[#186534]/5 transition-all duration-300 rounded-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className={`${item.bgColor} ${item.color} p-3 rounded-sm`}>
                    {item.icon}
                  </div>
                  <span className="font-sans text-[9px] font-bold text-slate-500 uppercase tracking-widest border border-slate-200 px-2 py-1 rounded-sm bg-slate-50">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="font-sans text-[10px] font-bold text-[#186534] uppercase tracking-wider mb-4">{item.subtitle}</p>
                <p className="font-sans text-sm text-slate-600 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Clean Pipeline Visual */}
          <div className="max-w-4xl mx-auto border border-slate-200 bg-white p-10 md:p-14 text-center rounded-sm shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-emerald-500 to-sky-500" />
            
            <p className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-10">Alur Pemrosesan Decision Engine</p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-10">
              <div className="font-sans text-sm font-bold text-slate-700 bg-slate-50 border border-slate-200 px-8 py-4 rounded-sm flex items-center gap-3 shadow-sm">
                <Sparkles className="w-5 h-5 text-amber-500" /> Bintang
              </div>
              <span className="text-slate-300 font-serif italic text-2xl">+</span>
              <div className="font-sans text-sm font-bold text-slate-700 bg-slate-50 border border-slate-200 px-8 py-4 rounded-sm flex items-center gap-3 shadow-sm">
                <Leaf className="w-5 h-5 text-emerald-500" /> Adat
              </div>
              <span className="text-slate-300 font-serif italic text-2xl">+</span>
              <div className="font-sans text-sm font-bold text-slate-700 bg-slate-50 border border-slate-200 px-8 py-4 rounded-sm flex items-center gap-3 shadow-sm">
                <Satellite className="w-5 h-5 text-sky-500" /> BMKG
              </div>
            </div>

            <div className="flex flex-col items-center justify-center relative">
              <div className="w-px h-10 bg-slate-200 mb-4" />
              <div className="bg-[#186534] text-white p-5 rounded-full shadow-lg z-10 ring-4 ring-[#186534]/10">
                <Brain className="w-7 h-7" />
              </div>
              <div className="w-px h-10 bg-slate-200 mt-4" />
            </div>

            <div className="inline-flex items-center gap-3 font-serif text-2xl md:text-3xl font-black text-[#092c16] mt-6">
              <Sprout className="w-8 h-8 text-[#186534]" />
              Rekomendasi Penanaman Final
            </div>
          </div>
        </div>
      </section>

      {/* ====== QUICK PREVIEW ====== */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&q=80&w=1200" 
            alt="Langit Malam" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#092c16]/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#092c16] to-transparent opacity-90" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="font-serif text-4xl lg:text-5xl font-black text-white mb-6">
            Bulan {MONTHS_ID[currentMonth]} — <br />
            <span className="text-[#4ade80]">Apa kata bintang?</span>
          </h2>
          <p className="text-slate-300 mb-10 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Cek kondisi sinkronisasi kalender tradisional Baduy dan proyeksi data iklim modern untuk bulan ini secara langsung.
          </p>
          <Link
            href={`/prediksi?month=${currentMonth + 1}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#4ade80] text-[#092c16] font-black uppercase tracking-wide rounded-sm hover:bg-white transition-colors duration-300 text-sm shadow-xl shadow-[#4ade80]/20"
          >
            Buka Dashboard Prediksi
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ====== EDUCATIONAL TEASER (EDITORIAL STYLE) ====== */}
      <section id="tentang" className="py-32 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] relative border-t border-slate-200 overflow-hidden">
        {/* Subtle grid lines background to match magazine aesthetic */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #186534 1px, transparent 1px)', backgroundSize: '120px 100%' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
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
                Bentang Kidang adalah sistem pengetahuan astronomi masyarakat Baduy. Melalui pengamatan presisi posisi konstelasi Orion, sesepuh Baduy menentukan waktu tanam, panen, dan masa istirahat lahan dengan akurasi yang melampaui zaman.
              </p>
              
              <div className="space-y-5 mb-12 border-l-2 border-[#186534]/20 pl-6">
                {[
                  { icon: <Sparkles className="w-5 h-5" />, text: "6 fase bintang yang memetakan siklus pertanian." },
                  { icon: <Moon className="w-5 h-5" />, text: "Sistem kalender lunar yang terintegrasi murni dengan alam." },
                  { icon: <Leaf className="w-5 h-5" />, text: "4 mangsa (musim) pertanian tradisional yang sangat presisi." },
                  { icon: <BookOpen className="w-5 h-5" />, text: "Filosofi keseimbangan: mengambil secukupnya, merawat sepenuhnya." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <span className="text-[#186534] bg-[#186534]/5 p-2 rounded-sm">{item.icon}</span>
                    <p className="font-sans text-sm font-bold text-slate-700">{item.text}</p>
                  </div>
                ))}
              </div>
              
              <Link
                href="/edukasii"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#186534] text-white font-bold rounded-sm hover:bg-[#092c16] transition-colors duration-300 text-sm tracking-widest uppercase shadow-lg shadow-[#186534]/20"
              >
                Pelajari Filosofinya
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right Side: Image Editorial Style */}
            <div className="lg:col-span-5 relative w-full h-full min-h-[500px]">
              <div className="absolute inset-0 rounded-sm overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&q=80&w=1200"
                  alt="Langit bintang malam, Konstelasi Orion"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#092c16]/90 via-[#092c16]/20 to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-sm">
                    <p className="font-serif font-black text-white text-3xl mb-2">Bentang Kidang</p>
                    <p className="font-sans text-xs text-white/80 uppercase tracking-widest font-bold flex items-center gap-2">
                      <Star className="w-3 h-3 text-amber-400" /> Konstelasi Orion — Kalender Baduy
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decorative Accent */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#186534] rounded-full blur-3xl opacity-20" />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}