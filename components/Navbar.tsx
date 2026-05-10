"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Leaf } from "lucide-react";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/prediksi", label: "Prediksi Tanam" },
  { href: "/edukasi", label: "Edukasi Baduy" },
  { href: "#tentang", label: "Tentang" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-md border-b border-forest-100/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-forest-600 rounded-lg flex items-center justify-center group-hover:bg-forest-700 transition-colors duration-200">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif font-semibold text-forest-900 text-lg tracking-tight hidden sm:inline">
              Nata Jagat
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-forest-700 hover:text-forest-900 hover:bg-forest-100/50 rounded-lg transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/prediksi"
            className="hidden md:flex items-center gap-2 px-5 py-2 bg-forest-600 text-white text-sm font-medium rounded-lg hover:bg-forest-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Cek Sekarang
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-forest-700 hover:bg-forest-50"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-forest-100/40 bg-cream/95 backdrop-blur-md">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm font-medium text-forest-700 hover:text-forest-900 hover:bg-forest-100/50 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/prediksi"
              className="block px-4 py-2 bg-forest-600 text-white text-sm font-medium rounded-lg text-center mt-2 hover:bg-forest-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Cek Prediksi Tanam
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
