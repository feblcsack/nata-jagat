"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  // Give a brief window for Firebase to resolve before redirecting
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    } else {
      setChecked(true);
    }
  }, [user, loading, router, pathname]);

  // Show spinner only while Firebase is actively checking (loading=true)
  // Add a hard timeout — if Firebase takes > 5s, something is wrong
  const [timedOut, setTimedOut] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), 5000);
    return () => clearTimeout(t);
  }, []);

  if (loading && !timedOut) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-forest-600 flex items-center justify-center animate-pulse">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm text-forest-500 font-medium">Memuat...</p>
        </div>
      </div>
    );
  }

  // Timed out — Firebase probably misconfigured, redirect to login
  if (timedOut && !user) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">⚠️</span>
          </div>
          <p className="font-semibold text-forest-900 mb-1">Tidak bisa terhubung</p>
          <p className="text-sm text-forest-500 mb-4">
            Periksa koneksi internet atau pastikan Firebase sudah dikonfigurasi di <code className="bg-forest-100 px-1 rounded">.env.local</code>
          </p>
          <a href="/login" className="inline-block px-5 py-2 bg-forest-600 text-white rounded-xl text-sm font-medium">
            Ke Halaman Login
          </a>
        </div>
      </div>
    );
  }

  if (!user) return null;
  if (!checked) return null;

  return <>{children}</>;
}