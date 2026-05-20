"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import {
  getRiwayatUser, tambahRiwayat, hapusRiwayat, getStatistikUser,
  RiwayatPanen, HasilPanen, StatusTanam
} from "@/services/historyService";
import { bmkgLocations } from "@/data/locations";
import { bentangKidangData } from "@/data/bentangKidang";
import {
  Plus, Trash2, Leaf, TrendingUp, BarChart3, Loader2,
  X, AlertCircle, ChevronDown, ChevronUp
} from "lucide-react";
import { formatMonth } from "@/lib/utils";

const KENDALA_OPTIONS = ["Hama", "Banjir", "Kekeringan", "Penyakit", "Cuaca Ekstrem", "Lainnya"];
const HASIL_OPTIONS: HasilPanen[] = ["Baik", "Sedang", "Buruk"];
const STATUS_OPTIONS: StatusTanam[] = ["Semai", "Tanam", "Tumbuh", "Panen", "Selesai"];
const MONTHS = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: formatMonth(i + 1) }));

const hasilColor: Record<HasilPanen, string> = {
  Baik: "bg-forest-100 text-forest-700",
  Sedang: "bg-amber-100 text-amber-700",
  Buruk: "bg-red-100 text-red-700",
};

const statusColor: Record<StatusTanam, string> = {
  Semai: "bg-sky-100 text-sky-700",
  Tanam: "bg-forest-100 text-forest-700",
  Tumbuh: "bg-sage-100 text-sage-700",
  Panen: "bg-earth-100 text-earth-700",
  Selesai: "bg-gray-100 text-gray-600",
};

export default function RiwayatPage() {
  return <AuthGuard><RiwayatContent /></AuthGuard>;
}

function RiwayatContent() {
  const { user, profile } = useAuth();
  const [riwayat, setRiwayat] = useState<RiwayatPanen[]>([]);
  const [statistik, setStatistik] = useState<Awaited<ReturnType<typeof getStatistikUser>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [r, s] = await Promise.all([getRiwayatUser(user.uid), getStatistikUser(user.uid)]);
      setRiwayat(r);
      setStatistik(s);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleDelete(id: string) {
    setDeleting(id);
    try { await hapusRiwayat(id); await fetchData(); }
    finally { setDeleting(null); }
  }

  return (
    <main className="min-h-screen bg-cream bg-organic">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-forest-500 text-sm font-medium uppercase tracking-wider mb-2">Catatan Tani</p>
            <h1 className="font-serif text-3xl font-bold text-forest-900">Riwayat Panen</h1>
            <p className="text-forest-500 text-sm mt-1">Catat setiap musim tanam untuk belajar dari pengalaman.</p>
          </div>
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-forest-600 text-white rounded-xl hover:bg-forest-500 transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" /> Tambah Catatan
          </button>
        </div>

        {/* Statistik */}
        {statistik && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Musim", value: statistik.totalMusim, icon: "🌾" },
              { label: "Hasil Baik", value: statistik.hasilBaik, icon: "✅" },
              { label: "Avg Sync Score", value: `${statistik.rataRataSyncScore}/100`, icon: "📊" },
              { label: "Varietas Favorit", value: statistik.variastasTerbanyak, icon: "🌱" },
            ].map((s) => (
              <div key={s.label} className="card-nature rounded-xl p-4">
                <div className="text-xl mb-1">{s.icon}</div>
                <p className="font-serif font-bold text-xl text-forest-900">{s.value}</p>
                <p className="text-xs text-forest-500">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* List */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 text-forest-500 animate-spin" />
          </div>
        ) : riwayat.length === 0 ? (
          <div className="card-nature rounded-2xl p-12 text-center">
            <Leaf className="w-10 h-10 text-forest-300 mx-auto mb-3" />
            <p className="font-semibold text-forest-700 mb-1">Belum ada catatan</p>
            <p className="text-sm text-forest-400 mb-5">Mulai catat musim tanam pertamamu!</p>
            <button onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-5 py-2 bg-forest-600 text-white rounded-xl text-sm font-medium hover:bg-forest-500 transition-colors">
              <Plus className="w-4 h-4" /> Tambah Sekarang
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {riwayat.map((r) => (
              <div key={r.id} className="card-nature rounded-2xl overflow-hidden">
                {/* Row header */}
                <div className="flex items-center gap-4 p-4 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}>
                  <div className="w-10 h-10 rounded-xl bg-forest-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-serif font-bold text-forest-700 text-sm">{r.bulanTanam}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-forest-900 text-sm">{formatMonth(r.bulanTanam)} {r.tahun}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[r.status]}`}>{r.status}</span>
                      {r.hasilPanen && <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${hasilColor[r.hasilPanen]}`}>{r.hasilPanen}</span>}
                    </div>
                    <p className="text-xs text-forest-500 mt-0.5">{r.varietas} · {r.lokasiNama} · {r.luasLahan}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-forest-400">Sync: {r.syncScore}</span>
                    {expandedId === r.id ? <ChevronUp className="w-4 h-4 text-forest-400" /> : <ChevronDown className="w-4 h-4 text-forest-400" />}
                  </div>
                </div>

                {/* Expanded detail */}
                {expandedId === r.id && (
                  <div className="border-t border-forest-100 p-4 space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <InfoItem label="Fase Kidang" value={r.bentangPhase} />
                      <InfoItem label="Musim Tradisional" value={r.traditionalSeason} />
                      <InfoItem label="Rekomendasi Saat Itu" value={r.statusRekomendasi} />
                      <InfoItem label="Curah Hujan" value={`${r.rainfallSaatTanam}mm`} />
                      <InfoItem label="Suhu" value={`${r.suhuSaatTanam}°C`} />
                      {r.bulanPanen && <InfoItem label="Bulan Panen" value={formatMonth(r.bulanPanen)} />}
                      {r.beratPanen && <InfoItem label="Berat Panen" value={r.beratPanen} />}
                    </div>
                    {r.kendalaDihadapi.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-forest-600 mb-1">Kendala</p>
                        <div className="flex flex-wrap gap-1.5">
                          {r.kendalaDihadapi.map((k) => (
                            <span key={k} className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">{k}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {r.catatanPetani && (
                      <div>
                        <p className="text-xs font-medium text-forest-600 mb-1">Catatan</p>
                        <p className="text-xs text-forest-600 leading-relaxed bg-white/60 rounded-lg p-3">{r.catatanPetani}</p>
                      </div>
                    )}
                    <div className="flex justify-end">
                      <button onClick={() => handleDelete(r.id)} disabled={deleting === r.id}
                        className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors">
                        {deleting === r.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                        Hapus catatan ini
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />

      {/* Modal form */}
      {showForm && (
        <TambahRiwayatModal
          userId={user!.uid}
          defaultLokasi={profile?.lokasiFavorit ?? "lebak"}
          defaultVarietas={profile?.varietasFavorit ?? ""}
          onClose={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); fetchData(); }}
        />
      )}
    </main>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-forest-400">{label}</p>
      <p className="text-sm font-medium text-forest-800">{value}</p>
    </div>
  );
}

// ─── MODAL FORM ────────────────────────────────────────────

function TambahRiwayatModal({
  userId, defaultLokasi, defaultVarietas, onClose, onSaved
}: {
  userId: string; defaultLokasi: string; defaultVarietas: string;
  onClose: () => void; onSaved: () => void;
}) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;

  const [bulanTanam, setBulanTanam] = useState(currentMonth);
  const [tahun, setTahun] = useState(now.getFullYear());
  const [lokasiId, setLokasiId] = useState(defaultLokasi);
  const [luasLahan, setLuasLahan] = useState("");
  const [varietas, setVarietas] = useState(defaultVarietas);
  const [status, setStatus] = useState<StatusTanam>("Tanam");
  const [hasilPanen, setHasilPanen] = useState<HasilPanen | "">("");
  const [bulanPanen, setBulanPanen] = useState<number | "">("");
  const [beratPanen, setBeratPanen] = useState("");
  const [catatan, setCatatan] = useState("");
  const [kendala, setKendala] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const bentang = bentangKidangData.find((b) => b.month === bulanTanam)!;
  const lokasiObj = bmkgLocations.find((l) => l.id === lokasiId)!;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError("");
    try {
      await tambahRiwayat({
        userId,
        musimKe: 0, // akan dihitung dari total
        tahun,
        bulanTanam,
        bulanPanen: bulanPanen === "" ? null : bulanPanen,
        lokasiId,
        lokasiNama: `${lokasiObj.name}, ${lokasiObj.province}`,
        luasLahan,
        varietas,
        bentangPhase: bentang.phase,
        traditionalSeason: bentang.traditionalSeason,
        syncScore: 70,                           // snapshot — akan diganti jika dari dashboard
        statusRekomendasi: bentang.riskLevel,
        rainfallSaatTanam: 0,                    // tidak wajib diisi manual
        suhuSaatTanam: 0,
        status,
        hasilPanen: hasilPanen === "" ? null : hasilPanen,
        beratPanen,
        catatanPetani: catatan,
        kendalaDihadapi: kendala,
        fotoUrl: null,
      });
      onSaved();
    } catch {
      setError("Gagal menyimpan. Coba lagi.");
    } finally {
      setSaving(false);
    }
  }

  function toggleKendala(k: string) {
    setKendala((prev) => prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-cream rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between p-5 border-b border-forest-100">
          <h2 className="font-serif text-lg font-semibold text-forest-900">Tambah Catatan Panen</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-forest-100 transition-colors">
            <X className="w-4 h-4 text-forest-500" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-5 space-y-4">
          {error && (
            <div className="flex gap-2 items-center bg-red-50 border border-red-200 text-red-700 rounded-xl px-3 py-2.5 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
            </div>
          )}

          {/* Bulan + Tahun */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-forest-600 mb-1">Bulan Tanam</label>
              <select value={bulanTanam} onChange={(e) => setBulanTanam(+e.target.value)} className="modal-input">
                {MONTHS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-forest-600 mb-1">Tahun</label>
              <input type="number" value={tahun} onChange={(e) => setTahun(+e.target.value)}
                min={2020} max={2030} className="modal-input" />
            </div>
          </div>

          {/* Kidang info otomatis */}
          <div className="bg-forest-50 rounded-xl px-4 py-3 text-xs text-forest-600">
            <span className="font-semibold">Fase Bintang:</span> {bentang.phase} — {bentang.traditionalSeason}
          </div>

          {/* Lokasi + varietas */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-forest-600 mb-1">Lokasi</label>
              <select value={lokasiId} onChange={(e) => setLokasiId(e.target.value)} className="modal-input">
                {bmkgLocations.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-forest-600 mb-1">Varietas</label>
              <input type="text" value={varietas} onChange={(e) => setVarietas(e.target.value)}
                placeholder="e.g. Ciherang" className="modal-input" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-forest-600 mb-1">Luas Lahan</label>
            <input type="text" value={luasLahan} onChange={(e) => setLuasLahan(e.target.value)}
              placeholder="e.g. 0.5 hektar" className="modal-input" />
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-medium text-forest-600 mb-1.5">Status Saat Ini</label>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((s) => (
                <button key={s} type="button" onClick={() => setStatus(s)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    status === s ? "bg-forest-600 text-white border-forest-600" : "border-forest-200 text-forest-600 hover:border-forest-400"
                  }`}>{s}</button>
              ))}
            </div>
          </div>

          {/* Hasil panen — tampil jika status Panen atau Selesai */}
          {(status === "Panen" || status === "Selesai") && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-forest-600 mb-1.5">Hasil Panen</label>
                  <div className="flex gap-2">
                    {HASIL_OPTIONS.map((h) => (
                      <button key={h} type="button" onClick={() => setHasilPanen(h)}
                        className={`flex-1 text-xs py-1.5 rounded-lg border transition-all ${
                          hasilPanen === h ? "bg-forest-600 text-white border-forest-600" : "border-forest-200 text-forest-600 hover:border-forest-400"
                        }`}>{h}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-forest-600 mb-1">Berat Panen</label>
                  <input type="text" value={beratPanen} onChange={(e) => setBeratPanen(e.target.value)}
                    placeholder="e.g. 1.2 ton" className="modal-input" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-forest-600 mb-1">Bulan Panen</label>
                <select value={bulanPanen} onChange={(e) => setBulanPanen(e.target.value === "" ? "" : +e.target.value)} className="modal-input">
                  <option value="">— Pilih bulan —</option>
                  {MONTHS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
              </div>
            </>
          )}

          {/* Kendala */}
          <div>
            <label className="block text-xs font-medium text-forest-600 mb-1.5">Kendala yang Dihadapi</label>
            <div className="flex flex-wrap gap-2">
              {KENDALA_OPTIONS.map((k) => (
                <button key={k} type="button" onClick={() => toggleKendala(k)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all ${
                    kendala.includes(k) ? "bg-red-100 text-red-700 border-red-300" : "border-forest-200 text-forest-500 hover:border-forest-400"
                  }`}>{k}</button>
              ))}
            </div>
          </div>

          {/* Catatan bebas */}
          <div>
            <label className="block text-xs font-medium text-forest-600 mb-1">Catatan Petani</label>
            <textarea value={catatan} onChange={(e) => setCatatan(e.target.value)} rows={3}
              placeholder="Tulis pengalaman, observasi lapangan, atau hal lain yang ingin dicatat..."
              className="modal-input resize-none" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-forest-200 text-forest-600 rounded-xl text-sm hover:bg-forest-50 transition-colors">
              Batal
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 py-2.5 bg-forest-600 text-white rounded-xl text-sm font-medium hover:bg-forest-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {saving ? "Menyimpan..." : "Simpan Catatan"}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .modal-input {
          width: 100%;
          padding: 9px 12px;
          border: 1px solid #cae0b9;
          border-radius: 10px;
          font-size: 13px;
          color: #0f3317;
          background: white;
          outline: none;
        }
        .modal-input:focus { border-color: #2d8a3b; }
        .modal-input::placeholder { color: #82c48a; }
      `}</style>
    </div>
  );
}
