"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Leaf, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft, User } from "lucide-react";

export const dynamic = "force-dynamic";

type Mode = "login" | "register" | "forgot";

function LoginContent() {
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
      "auth/user-not-found": "Email tidak terdaftar.",
      "auth/wrong-password": "Password salah.",
      "auth/invalid-credential": "Email atau password salah.",
      "auth/email-already-in-use": "Email sudah digunakan.",
      "auth/weak-password": "Password minimal 6 karakter.",
      "auth/invalid-email": "Format email tidak valid.",
      "auth/popup-closed-by-user": "Login Google dibatalkan.",
      "auth/too-many-requests": "Terlalu banyak percobaan. Tunggu beberapa menit.",
      "auth/network-request-failed": "Tidak ada koneksi internet.",
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
        if (!displayName.trim()) { setError("Nama harus diisi."); return; }
        await registerWithEmail(email, password, displayName.trim());
        router.replace(redirectTo);
      } else {
        await sendResetEmail(email);
        setSuccess("Link reset sudah dikirim ke email kamu.");
      }
    } catch (e: unknown) {
      setError(friendlyError((e as { code?: string }).code ?? ""));
    } finally { setSubmitting(false); }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-10 h-10 rounded-xl bg-forest-600 animate-pulse flex items-center justify-center">
          <Leaf className="w-5 h-5 text-white" />
        </div>
      </div>
    );
  }

  const titles = { login: "Masuk ke Nata Jagat", register: "Buat Akun Baru", forgot: "Reset Password" };
  const subs = {
    login: "Pantau musim tanam dengan kearifan Baduy & BMKG",
    register: "Mulai perjalanan bertanimu bersama Nata Jagat",
    forgot: "Masukkan email kamu, kami kirimkan link reset",
  };

  return (
    <div className="min-h-screen bg-cream bg-organic flex">
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
            Bintang Kidang<br /><span className="text-forest-400">memandu musim tanam</span><br />sejak berabad-abad.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Link href="/" className="inline-flex items-center gap-1.5 text-forest-500 text-sm mb-6 hover:text-forest-700 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />Kembali ke beranda
          </Link>
          <h1 className="font-serif text-2xl font-bold text-forest-900 mb-1">{titles[mode]}</h1>
          <p className="text-sm text-forest-500 mb-7">{subs[mode]}</p>

          {error && <div className="flex gap-2 items-center bg-red-50 border border-red-200 text-red-700 rounded-xl px-3 py-2.5 mb-4 text-sm"><AlertCircle className="w-4 h-4" />{error}</div>}
          {success && <div className="bg-forest-50 border border-forest-200 text-forest-700 rounded-xl px-3 py-2.5 mb-4 text-sm">{success}</div>}

          {mode !== "forgot" && (
            <>
              <button onClick={handleGoogle} disabled={submitting} className="w-full flex items-center justify-center gap-3 border border-forest-200 bg-white rounded-xl py-3 text-sm font-medium text-forest-800 hover:bg-forest-50 transition-all mb-4">
                Lanjutkan dengan Google
              </button>
              <div className="flex items-center gap-3 mb-4"><div className="flex-1 h-px bg-forest-100"/><span className="text-xs text-forest-400">atau</span><div className="flex-1 h-px bg-forest-100"/></div>
            </>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "register" && <InputField type="text" placeholder="Nama lengkap" value={displayName} onChange={setDisplayName} icon={<User className="w-4 h-4" />} />}
            <InputField type="email" placeholder="Email" value={email} onChange={setEmail} icon={<Mail className="w-4 h-4" />} />
            {mode !== "forgot" && (
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-400"><Lock className="w-4 h-4" /></span>
                <input type={showPw ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-9 pr-10 py-3 border border-forest-200 rounded-xl text-sm focus:outline-none focus:border-forest-500 bg-white" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-400">{showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
              </div>
            )}
            {mode === "register" && <InputField type={showPw ? "text" : "password"} placeholder="Konfirmasi password" value={confirmPassword} onChange={setConfirmPassword} icon={<Lock className="w-4 h-4" />} />}
            <button type="submit" disabled={submitting} className="w-full py-3 bg-forest-600 text-white font-semibold rounded-xl hover:bg-forest-500 transition-all text-sm mt-1">{submitting ? "Memproses..." : "Submit"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <LoginContent />
    </Suspense>
  );
}

function InputField({ type, placeholder, value, onChange, icon }: { type: string; placeholder: string; value: string; onChange: (v: string) => void; icon: React.ReactNode }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-400">{icon}</span>
      <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} required className="w-full pl-9 pr-4 py-3 border border-forest-200 rounded-xl text-sm focus:outline-none focus:border-forest-500 bg-white" />
    </div>
  );
}