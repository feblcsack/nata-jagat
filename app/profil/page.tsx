"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { bmkgLocations } from "@/data/locations";
import {
  User, Camera, Save, Lock, Mail, MapPin,
  Sprout, AlertCircle, CheckCircle, Loader2
} from "lucide-react";

type Tab = "profil" | "keamanan";

export default function ProfilPage() {
  return (
    <AuthGuard>
      <ProfilContent />
    </AuthGuard>
  );
}

function ProfilContent() {
  const { user, profile, refreshProfile, updateUserProfile, uploadProfilePhoto, changePassword } = useAuth();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [tab, setTab] = useState<Tab>("profil");
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // Profil fields
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [lokasiFavorit, setLokasiFavorit] = useState("lebak");
  const [luasLahan, setLuasLahan] = useState("");
  const [varietasFavorit, setVarietasFavorit] = useState("");

  // Password fields
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName ?? "");
      setBio(profile.bio ?? "");
      setLokasiFavorit(profile.lokasiFavorit ?? "lebak");
      setLuasLahan(profile.luasLahan ?? "");
      setVarietasFavorit(profile.varietasFavorit ?? "");
    }
  }, [profile]);

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploadingPhoto(true);
    try {
      await uploadProfilePhoto(user.uid, file);
      await refreshProfile();
      setMsg({ type: "ok", text: "Foto profil berhasil diperbarui." });
    } catch {
      setMsg({ type: "err", text: "Gagal upload foto." });
    } finally {
      setUploadingPhoto(false);
    }
  }

  async function handleSaveProfil(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setMsg(null);
    try {
      const lokasiObj = bmkgLocations.find((l) => l.id === lokasiFavorit);
      await updateUserProfile(user.uid, {
        displayName,
        bio,
        lokasiFavorit,
        lokasiNama: lokasiObj ? `${lokasiObj.name}, ${lokasiObj.province}` : "",
        luasLahan,
        varietasFavorit,
      });
      await refreshProfile();
      setMsg({ type: "ok", text: "Profil berhasil disimpan." });
    } catch {
      setMsg({ type: "err", text: "Gagal menyimpan profil." });
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (newPw !== confirmPw) { setMsg({ type: "err", text: "Password baru tidak cocok." }); return; }
    if (newPw.length < 6) { setMsg({ type: "err", text: "Password minimal 6 karakter." }); return; }
    setSaving(true);
    try {
      await changePassword(currentPw, newPw);
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
      setMsg({ type: "ok", text: "Password berhasil diubah." });
    } catch {
      setMsg({ type: "err", text: "Password lama salah atau sesi habis. Coba login ulang." });
    } finally {
      setSaving(false);
    }
  }

  const avatar = profile?.photoURL ?? user?.photoURL;
  const initials = (profile?.displayName ?? user?.displayName ?? "U").charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-cream bg-organic">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

        {/* Header */}
        <div className="mb-8">
          <p className="text-forest-500 text-sm font-medium uppercase tracking-wider mb-2">Akun</p>
          <h1 className="font-serif text-3xl font-bold text-forest-900">Pengaturan Profil</h1>
        </div>

        {/* Avatar section */}
        <div className="card-nature rounded-2xl p-6 mb-6 flex items-center gap-5">
          <div className="relative flex-shrink-0">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="w-18 h-18 rounded-2xl object-cover w-[72px] h-[72px]" />
            ) : (
              <div className="w-[72px] h-[72px] rounded-2xl bg-forest-600 flex items-center justify-center text-white font-serif text-2xl font-bold">
                {initials}
              </div>
            )}
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploadingPhoto}
              className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-forest-600 text-white rounded-lg flex items-center justify-center hover:bg-forest-500 transition-colors"
            >
              {uploadingPhoto ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
          </div>
          <div>
            <p className="font-semibold text-forest-900">{profile?.displayName ?? user?.displayName ?? "Petani"}</p>
            <p className="text-sm text-forest-500">{user?.email}</p>
            <p className="text-xs text-forest-400 mt-0.5">
              {user?.providerData[0]?.providerId === "google.com" ? "Akun Google" : "Akun Email"}
            </p>
          </div>
        </div>

        {/* Feedback */}
        {msg && (
          <div className={`flex gap-2 items-center rounded-xl px-4 py-3 mb-5 text-sm ${
            msg.type === "ok"
              ? "bg-forest-50 border border-forest-200 text-forest-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}>
            {msg.type === "ok" ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
            {msg.text}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-forest-100/60 p-1 rounded-xl mb-6">
          {(["profil", "keamanan"] as Tab[]).map((t) => (
            <button key={t} onClick={() => { setTab(t); setMsg(null); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                tab === t ? "bg-white text-forest-800 shadow-sm" : "text-forest-500 hover:text-forest-700"
              }`}>
              {t === "profil" ? "Data Profil" : "Keamanan"}
            </button>
          ))}
        </div>

        {/* Tab: Profil */}
        {tab === "profil" && (
          <form onSubmit={handleSaveProfil} className="card-nature rounded-2xl p-6 space-y-5">
            <Field label="Nama Lengkap" icon={<User className="w-4 h-4" />}>
              <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required
                placeholder="Nama yang ditampilkan"
                className="input-style" />
            </Field>

            <Field label="Email" icon={<Mail className="w-4 h-4" />}>
              <input type="email" value={user?.email ?? ""} disabled
                className="input-style opacity-50 cursor-not-allowed" />
              <p className="text-xs text-forest-400 mt-1">Email tidak dapat diubah langsung.</p>
            </Field>

            <Field label="Bio" icon={<User className="w-4 h-4" />}>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3}
                placeholder="Ceritakan sedikit tentang dirimu sebagai petani..."
                className="input-style resize-none" />
            </Field>

            <div className="border-t border-forest-100 pt-5">
              <p className="text-sm font-semibold text-forest-700 mb-4">Pengaturan Pertanian</p>
              <div className="space-y-4">
                <Field label="Lokasi Favorit" icon={<MapPin className="w-4 h-4" />}>
                  <select value={lokasiFavorit} onChange={(e) => setLokasiFavorit(e.target.value)}
                    className="input-style">
                    {bmkgLocations.map((l) => (
                      <option key={l.id} value={l.id}>{l.name}, {l.province}</option>
                    ))}
                  </select>
                  <p className="text-xs text-forest-400 mt-1">Digunakan sebagai lokasi default di dashboard prediksi.</p>
                </Field>

                <Field label="Luas Lahan" icon={<Sprout className="w-4 h-4" />}>
                  <input type="text" value={luasLahan} onChange={(e) => setLuasLahan(e.target.value)}
                    placeholder="e.g. 0.5 hektar"
                    className="input-style" />
                </Field>

                <Field label="Varietas Padi Favorit" icon={<Sprout className="w-4 h-4" />}>
                  <input type="text" value={varietasFavorit} onChange={(e) => setVarietasFavorit(e.target.value)}
                    placeholder="e.g. Ciherang, IR64, Inpari 32"
                    className="input-style" />
                </Field>
              </div>
            </div>

            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-forest-600 text-white rounded-xl hover:bg-forest-500 transition-colors text-sm font-medium disabled:opacity-50">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </form>
        )}

        {/* Tab: Keamanan */}
        {tab === "keamanan" && (
          <div className="card-nature rounded-2xl p-6">
            {user?.providerData[0]?.providerId === "google.com" ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6 text-sky-600" />
                </div>
                <p className="font-semibold text-forest-800 mb-1">Akun Google</p>
                <p className="text-sm text-forest-500 max-w-xs mx-auto">
                  Kamu login menggunakan Google. Password dikelola langsung oleh Google Account-mu.
                </p>
              </div>
            ) : (
              <form onSubmit={handleChangePassword} className="space-y-4">
                <p className="text-sm font-semibold text-forest-700 mb-2">Ganti Password</p>
                {[
                  { label: "Password Saat Ini", val: currentPw, set: setCurrentPw, placeholder: "••••••••" },
                  { label: "Password Baru", val: newPw, set: setNewPw, placeholder: "Min. 6 karakter" },
                  { label: "Konfirmasi Password Baru", val: confirmPw, set: setConfirmPw, placeholder: "Ulangi password baru" },
                ].map(({ label, val, set, placeholder }) => (
                  <Field key={label} label={label} icon={<Lock className="w-4 h-4" />}>
                    <input type="password" value={val} onChange={(e) => set(e.target.value)}
                      placeholder={placeholder} required className="input-style" />
                  </Field>
                ))}
                <button type="submit" disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-forest-600 text-white rounded-xl hover:bg-forest-500 transition-colors text-sm font-medium disabled:opacity-50">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                  {saving ? "Menyimpan..." : "Ganti Password"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
      <Footer />

      <style jsx>{`
        .input-style {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #cae0b9;
          border-radius: 10px;
          font-size: 14px;
          color: #0f3317;
          background: white;
          outline: none;
          transition: border-color 0.15s;
        }
        .input-style:focus { border-color: #2d8a3b; }
        .input-style::placeholder { color: #82c48a; }
      `}</style>
    </main>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-medium text-forest-700 mb-1.5">
        <span className="text-forest-400">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}
