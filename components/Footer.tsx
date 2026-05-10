import { Leaf } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-forest-600 rounded-lg flex items-center justify-center hover:bg-forest-500 transition-colors">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif font-semibold text-lg">Nata Jagat</span>
            </div>
            <p className="text-sm text-forest-300 leading-relaxed">
              Memahami alam melalui perpaduan kearifan tradisional Baduy dan sains modern BMKG.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold text-forest-100 mb-4 uppercase tracking-widest">Navigasi</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Beranda" },
                { href: "/prediksi", label: "Prediksi Tanam" },
                { href: "/edukasi", label: "Edukasi Baduy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-forest-400 hover:text-forest-200 transition-colors duration-150 font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Data sources */}
          <div>
            <h4 className="text-xs font-bold text-forest-100 mb-4 uppercase tracking-widest">Sumber Data</h4>
            <ul className="space-y-2 text-sm text-forest-400">
              <li className="font-medium">🛰️ BMKG Open Data</li>
              <li className="font-medium">🌌 Kearifan Baduy</li>
              <li className="font-medium">📚 Kalender Kanekes</li>
              <li className="font-medium">🌙 Bentang Kidang</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-forest-800/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-forest-500 font-medium">
            © 2025 Nata Jagat. Dibuat dengan ❤️ untuk melestarikan kearifan lokal.
          </p>
          <p className="text-xs text-forest-500 font-medium">
            Data cuaca dari{" "}
            <a href="https://data.bmkg.go.id" target="_blank" rel="noopener noreferrer" className="text-forest-300 hover:text-white transition-colors underline">
              BMKG Open Data
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
