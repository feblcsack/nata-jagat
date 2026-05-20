"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Leaf, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft, User } from "lucide-react";

type Mode = "login" | "register" | "forgot";

export default function LoginPage() {
  const {
    user, loading,
    loginWithGoogle, loginWithEmail, registerWithEmail, sendResetEmail,
  } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/prediksi";

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect if already logged in — only after loading resolves
  useEffect(() => {
    if (!loading && user) {
      router.replace(redirectTo);
    }
  }, [user, loading, router, redirectTo]);

  function resetForm() {
    setError(""); setSuccess(""); setEmail(""); setPassword("");
    setConfirmPassword(""); setDisplayName("");
  }

  function switchMode(m: Mode) { resetForm(); setMode(m); }

  function friendlyError(code: string): string {
    const map: Record<string, string> = {
      "auth/user-not-found":        "Email tidak terdaftar.",
      "auth/wrong-password":        "Password salah.",
      "auth/invalid-credential":    "Email atau password salah.",
      "auth/email-already-in-use":  "Email sudah digunakan.",
      "auth/weak-password":         "Password minimal 6 karakter.",
      "auth/invalid-email":         "Format email tidak valid.",
      "auth/popup-closed-by-user":  "Login Google dibatalkan.",
      "auth/too-many-requests":     "Terlalu banyak percobaan. Tunggu beberapa menit.",
      "auth/network-request-failed":"Tidak ada koneksi internet.",
    };
    return map[code] ?? `Terjadi kesalahan (${code || "unknown"}). Coba lagi.`;
  }

  async function handleGoogle() {
    setSubmitting(true); setError("");
    try {
      await loginWithGoogle();
      router.replace(redirectTo);
    } catch (e: unknown) {
      setError(friendlyError((e as { code?: string }).code ?? ""));
    } finally { setSubmitting(false); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSuccess(""); setSubmitting(true);
    try {
      if (mode === "login") {
        await loginWithEmail(email, password);
        router.replace(redirectTo);
      } else if (mode === "register") {
        if (password !== confirmPassword) { setError("Password tidak cocok."); return; }
        if (!displayName.trim())          { setError("Nama harus diisi."); return; }
        await registerWithEmail(email, password, displayName.trim());
        router.replace(redirectTo);
      } else {
        await sendResetEmail(email);
        setSuccess("Link reset sudah dikirim ke email kamu. Cek inbox / spam.");
      }
    } catch (e: unknown) {
      setError(friendlyError((e as { code?: string }).code ?? ""));
    } finally { setSubmitting(false); }
  }

  // While Firebase is checking auth state, show minimal spinner
  // (loading is true only briefly on first visit)
  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-10 h-10 rounded-xl bg-forest-600 animate-pulse flex items-center justify-center">
          <Leaf className="w-5 h-5 text-white" />
        </div>
      </div>
    );
  }

  const titles = {
    login:    "Masuk ke Nata Jagat",
    register: "Buat Akun Baru",
    forgot:   "Reset Password",
  };
  const subs = {
    login:    "Pantau musim tanam dengan kearifan Baduy & BMKG",
    register: "Mulai perjalanan bertanimu bersama Nata Jagat",
    forgot:   "Masukkan email kamu, kami kirimkan link reset",
  };

  return (
    <div className="min-h-screen bg-cream bg-organic flex">

      {/* ── Left branding panel (desktop only) ── */}
      <div className="hidden lg:flex w-1/2 bg-forest-950 flex-col justify-between p-10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-forest-500 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-serif font-bold text-white text-lg block leading-none">Nata Jagat</span>
            <span className="text-forest-400 text-[10px] uppercase tracking-widest">Kearifan × Sains</span>
          </div>
        </Link>

        <div>
          <p className="font-serif text-3xl font-bold text-white leading-snug mb-4">
            Bintang Kidang<br />
            <span className="text-forest-400">memandu musim tanam</span><br />
            sejak berabad-abad.
          </p>
          <p className="text-forest-400 text-sm leading-relaxed max-w-sm">
            Nata Jagat menggabungkan pengetahuan tradisional Baduy dengan data cuaca BMKG
            untuk membantu petani membuat keputusan tanam yang lebih cerdas.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Fase Kidang", value: "6" },
            { label: "Mangsa",      value: "4" },
            { label: "Data BMKG",   value: "Live" },
          ].map((s) => (
            <div key={s.label} className="bg-forest-900 rounded-xl p-4">
              <p className="font-serif text-xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-forest-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">

          <Link href="/" className="inline-flex items-center gap-1.5 text-forest-500 text-sm mb-6 hover:text-forest-700 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />Kembali ke beranda
          </Link>

          <h1 className="font-serif text-2xl font-bold text-forest-900 mb-1">{titles[mode]}</h1>
          <p className="text-sm text-forest-500 mb-7">{subs[mode]}</p>

          {/* Error / success */}
          {error && (
            <div className="flex gap-2 items-center bg-red-50 border border-red-200 text-red-700 rounded-xl px-3 py-2.5 mb-4 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
            </div>
          )}
          {success && (
            <div className="bg-forest-50 border border-forest-200 text-forest-700 rounded-xl px-3 py-2.5 mb-4 text-sm">
              {success}
            </div>
          )}

          {/* Google button */}
          {mode !== "forgot" && (
            <>
              <button
                onClick={handleGoogle}
                disabled={submitting}
                className="w-full flex items-center justify-center gap-3 border border-forest-200 bg-white rounded-xl py-3 text-sm font-medium text-forest-800 hover:bg-forest-50 active:scale-[0.98] transition-all mb-4 disabled:opacity-50"
              >
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
                  <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
                </svg>
                Lanjutkan dengan Google
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-forest-100" />
                <span className="text-xs text-forest-400">atau</span>
                <div className="flex-1 h-px bg-forest-100" />
              </div>
            </>
          )}

          {/* Email form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "register" && (
              <InputField type="text" placeholder="Nama lengkap" value={displayName}
                onChange={setDisplayName} icon={<User className="w-4 h-4" />} />
            )}

            <InputField type="email" placeholder="Email" value={email}
              onChange={setEmail} icon={<Mail className="w-4 h-4" />} />

            {mode !== "forgot" && (
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-10 py-3 border border-forest-200 rounded-xl text-sm text-forest-800 placeholder-forest-300 focus:outline-none focus:border-forest-500 bg-white"
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            )}

            {mode === "register" && (
              <InputField type={showPw ? "text" : "password"} placeholder="Konfirmasi password"
                value={confirmPassword} onChange={setConfirmPassword} icon={<Lock className="w-4 h-4" />} />
            )}

            {mode === "login" && (
              <div className="text-right -mt-1">
                <button type="button" onClick={() => switchMode("forgot")}
                  className="text-xs text-forest-500 hover:text-forest-700">
                  Lupa password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-forest-600 text-white font-semibold rounded-xl hover:bg-forest-500 active:scale-[0.98] transition-all text-sm disabled:opacity-50 mt-1"
            >
              {submitting
                ? "Memproses..."
                : mode === "login" ? "Masuk"
                : mode === "register" ? "Buat Akun"
                : "Kirim Link Reset"}
            </button>
          </form>

          {/* Mode switch */}
          <div className="mt-5 text-center text-sm">
            {mode === "login" ? (
              <p className="text-forest-500">
                Belum punya akun?{" "}
                <button onClick={() => switchMode("register")}
                  className="text-forest-700 font-semibold hover:underline">
                  Daftar sekarang
                </button>
              </p>
            ) : (
              <button onClick={() => switchMode("login")}
                className="text-forest-500 hover:text-forest-700 flex items-center gap-1 mx-auto">
                <ArrowLeft className="w-3.5 h-3.5" />Kembali ke login
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Reusable input ──────────────────────────────────────────
function InputField({ type, placeholder, value, onChange, icon }: {
  type: string; placeholder: string; value: string;
  onChange: (v: string) => void; icon: React.ReactNode;
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-400">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full pl-9 pr-4 py-3 border border-forest-200 rounded-xl text-sm text-forest-800 placeholder-forest-300 focus:outline-none focus:border-forest-500 bg-white"
      />
    </div>
  );
}