"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Leaf, BarChart3, BookOpen, History, User, LogOut, Menu, X, ChevronRight } from "lucide-react";

const NAV = [
  { href: "/",        label: "Beranda",       Icon: Leaf,      desc: "Tentang Nata Jagat" },
  { href: "/prediksi",label: "Prediksi Tanam",Icon: BarChart3, desc: "Cek waktu tanam terbaik" },
  { href: "/edukasii", label: "Edukasi Baduy", Icon: BookOpen,  desc: "Pelajari Bentang Kidang" },
  { href: "/riwayat", label: "Riwayat Panen", Icon: History,   desc: "Catatan musim tanammu" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const initials = (profile?.displayName ?? user?.displayName ?? "P").charAt(0).toUpperCase();
  const avatar = profile?.photoURL ?? user?.photoURL;

  async function handleLogout() {
    setOpen(false);
    await logout();
    router.replace("/login");
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="mx-3 mt-3 rounded-2xl bg-white/90 backdrop-blur-md border border-forest-200/40 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-forest-600 flex items-center justify-center shadow-sm">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="font-serif font-bold text-forest-900 text-base leading-none block">Nata Jagat</span>
                <span className="text-[9px] text-earth-500 leading-none uppercase tracking-widest">Kearifan × Sains</span>
              </div>
            </Link>

            {/* Desktop nav — only show 3 key items */}
            <div className="hidden md:flex items-center gap-1">
              {NAV.slice(0, 3).map(({ href, label, Icon }) => (
                <Link key={href} href={href}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    pathname === href ? "bg-forest-600 text-white" : "text-forest-600 hover:bg-forest-50"
                  }`}>
                  <Icon className="w-3.5 h-3.5" />{label}
                </Link>
              ))}
            </div>

            {/* Right — user or login */}
            <div className="flex items-center gap-2">
              {user ? (
                <div className="relative">
                  <button onClick={() => setOpen(!open)} className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl hover:bg-forest-50 transition-colors">
                    {avatar
                      ? <img src={avatar} alt="" className="w-7 h-7 rounded-lg object-cover" />
                      : <div className="w-7 h-7 rounded-lg bg-forest-600 text-white text-xs font-bold flex items-center justify-center">{initials}</div>
                    }
                    <span className="hidden sm:block text-sm font-medium text-forest-700 max-w-[80px] truncate">
                      {profile?.displayName?.split(" ")[0] ?? "Petani"}
                    </span>
                  </button>

                  {open && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-lg border border-forest-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-forest-100 mb-1">
                        <p className="text-sm font-semibold text-forest-900 truncate">{profile?.displayName ?? "Petani"}</p>
                        <p className="text-xs text-forest-400 truncate">{user.email}</p>
                      </div>
                      {[
                        { href: "/profil",   label: "Pengaturan Profil", Icon: User    },
                        { href: "/riwayat",  label: "Riwayat Panen",    Icon: History  },
                      ].map(({ href, label, Icon }) => (
                        <Link key={href} href={href} onClick={() => setOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-forest-700 hover:bg-forest-50 transition-colors">
                          <Icon className="w-4 h-4 text-forest-400" />{label}
                        </Link>
                      ))}
                      <div className="border-t border-forest-100 mt-1 pt-1">
                        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full transition-colors">
                          <LogOut className="w-4 h-4" />Keluar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="px-4 py-2 bg-forest-600 text-white rounded-xl text-sm font-medium hover:bg-forest-500 transition-colors">
                  Masuk
                </Link>
              )}

              {/* Mobile hamburger */}
              <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-xl hover:bg-forest-50 transition-colors">
                {open ? <X className="w-5 h-5 text-forest-700" /> : <Menu className="w-5 h-5 text-forest-700" />}
              </button>
            </div>
          </div>

          {/* Mobile full-screen menu */}
          {open && (
            <div className="md:hidden border-t border-forest-100 px-3 pb-3 pt-2">
              {NAV.map(({ href, label, Icon, desc }) => (
                <Link key={href} href={href} onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl mb-1 transition-all ${
                    pathname === href ? "bg-forest-600 text-white" : "text-forest-700 hover:bg-forest-50"
                  }`}>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${pathname === href ? "bg-white/20" : "bg-forest-100"}`}>
                    <Icon className={`w-4 h-4 ${pathname === href ? "text-white" : "text-forest-600"}`} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${pathname === href ? "text-white" : "text-forest-900"}`}>{label}</p>
                    <p className={`text-[11px] ${pathname === href ? "text-white/70" : "text-forest-400"}`}>{desc}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${pathname === href ? "text-white/60" : "text-forest-300"}`} />
                </Link>
              ))}
              {user && (
                <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 w-full mt-1 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center"><LogOut className="w-4 h-4 text-red-500" /></div>
                  <span className="text-sm font-semibold">Keluar</span>
                </button>
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Overlay for dropdown close */}
      {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />}
    </>
  );
}
