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
  
  // Pisahin state biar gak buka barengan bro
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const initials = (profile?.displayName ?? user?.displayName ?? "P").charAt(0).toUpperCase();
  const avatar = profile?.photoURL ?? user?.photoURL;

  async function handleLogout() {
    closeAllPopups();
    await logout();
    router.replace("/login");
  }

  // Fungsi helper buat nutup semua menu aktif
  function closeAllPopups() {
    setIsProfileOpen(false);
    setIsMobileOpen(false);
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="mx-3 mt-3 rounded-2xl bg-white/95 backdrop-blur-md border border-forest-200/40 shadow-sm transition-all duration-300">
          <div className="flex items-center justify-between px-4 py-3">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3" onClick={closeAllPopups}>
              <div className="w-9 h-9 rounded-xl bg-forest-600 flex items-center justify-center shadow-sm">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="font-serif font-bold text-forest-900 text-base leading-none block mb-0.5">Nata Jagat</span>
                <span className="text-[9px] text-forest-500/80 font-bold leading-none uppercase tracking-[0.15em]">Kearifan × Sains</span>
              </div>
            </Link>

            {/* Desktop nav — only show 3 key items */}
            <div className="hidden md:flex items-center gap-1.5">
              {NAV.slice(0, 3).map(({ href, label, Icon }) => (
                <Link key={href} href={href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    pathname === href 
                      ? "bg-forest-600 text-white shadow-md shadow-forest-600/20" 
                      : "text-forest-600 hover:bg-forest-50"
                  }`}>
                  <Icon className="w-4 h-4" />{label}
                </Link>
              ))}
            </div>

            {/* Right — user or login */}
            <div className="flex items-center gap-2">
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => {
                      setIsProfileOpen(!isProfileOpen);
                      setIsMobileOpen(false); // Tutup mobile menu kalau profile dipencet
                    }} 
                    className="flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-xl hover:bg-forest-50 transition-colors border border-transparent hover:border-forest-100"
                  >
                    {avatar
                      ? <img src={avatar} alt="Profile" className="w-8 h-8 rounded-lg object-cover shadow-sm" />
                      : <div className="w-8 h-8 rounded-lg bg-forest-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">{initials}</div>
                    }
                    <span className="hidden sm:block text-sm font-semibold text-forest-800 max-w-[90px] truncate">
                      {profile?.displayName?.split(" ")[0] ?? "Petani"}
                    </span>
                  </button>

                  {/* Profile Dropdown */}
                  <div className={`absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-forest-100 py-2 z-50 transform origin-top-right transition-all duration-200 ${
                    isProfileOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"
                  }`}>
                    <div className="px-4 py-3 border-b border-forest-50 mb-1">
                      <p className="text-sm font-bold text-forest-900 truncate">{profile?.displayName ?? "Petani"}</p>
                      <p className="text-xs text-forest-500 truncate font-medium mt-0.5">{user.email}</p>
                    </div>
                    {[
                      { href: "/profil",   label: "Pengaturan Profil", Icon: User    },
                      { href: "/riwayat",  label: "Riwayat Panen",    Icon: History  },
                    ].map(({ href, label, Icon }) => (
                      <Link key={href} href={href} onClick={closeAllPopups}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-forest-700 hover:bg-forest-50 hover:text-forest-900 transition-colors">
                        <Icon className="w-4 h-4 text-forest-400" />{label}
                      </Link>
                    ))}
                    <div className="border-t border-forest-50 mt-1 pt-1">
                      <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors">
                        <LogOut className="w-4 h-4" />Keluar
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/login" className="px-5 py-2.5 bg-forest-600 text-white rounded-xl text-sm font-bold hover:bg-forest-700 transition-colors shadow-md shadow-forest-600/20">
                  Masuk
                </Link>
              )}

              {/* Mobile hamburger */}
              <button 
                onClick={() => {
                  setIsMobileOpen(!isMobileOpen);
                  setIsProfileOpen(false); // Tutup profile dropdown kalau hamburger dipencet
                }} 
                className="md:hidden p-2 rounded-xl hover:bg-forest-50 transition-colors bg-forest-50/50"
              >
                {isMobileOpen ? <X className="w-5 h-5 text-forest-800" /> : <Menu className="w-5 h-5 text-forest-800" />}
              </button>
            </div>
          </div>

          {/* Mobile full-screen menu - dengan transisi */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileOpen ? "max-h-[400px] opacity-100 border-t border-forest-100" : "max-h-0 opacity-0"
          }`}>
            <div className="px-3 pb-4 pt-3 space-y-1">
              {NAV.map(({ href, label, Icon, desc }) => (
                <Link key={href} href={href} onClick={closeAllPopups}
                  className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all ${
                    pathname === href ? "bg-forest-600 text-white shadow-md shadow-forest-600/20" : "text-forest-700 hover:bg-forest-50"
                  }`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    pathname === href ? "bg-white/20" : "bg-forest-100"
                  }`}>
                    <Icon className={`w-5 h-5 ${pathname === href ? "text-white" : "text-forest-600"}`} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${pathname === href ? "text-white" : "text-forest-900"}`}>{label}</p>
                    <p className={`text-[11px] font-medium mt-0.5 ${pathname === href ? "text-white/80" : "text-forest-500"}`}>{desc}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${pathname === href ? "text-white/60" : "text-forest-300"}`} />
                </Link>
              ))}
              {user && (
                <button onClick={handleLogout} className="flex items-center gap-4 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 w-full mt-2 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <LogOut className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="text-sm font-bold">Keluar</span>
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Overlay global biar pas klik di luar area menu, pop-up bakal nutup otomatis */}
      {(isProfileOpen || isMobileOpen) && (
        <div className="fixed inset-0 z-40 bg-transparent" onClick={closeAllPopups} />
      )}
    </>
  );
}