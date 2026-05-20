import { Leaf } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-forest-600 rounded-lg flex items-center justify-center">
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
            <h4 className="text-sm font-semibold text-forest-200 mb-3 uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Beranda" },
                { href: "/prediksi", label: "Prediksi Tanam" },
                { href: "/edukasii", label: "Edukasi Baduy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-forest-400 hover:text-forest-200 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Data sources */}
          <div>
            <h4 className="text-sm font-semibold text-forest-200 mb-3 uppercase tracking-wider">Sumber Data</h4>
            <ul className="space-y-2 text-sm text-forest-400">
              <li> BMKG Open Data API</li>
              <li> Pengetahuan Tradisional Baduy</li>
              <li> Kalender Pertanian Kanekes</li>
              <li> Sistem Bentang Kidang</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-forest-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-forest-500">
            © 2026 Nata Jagat.
          </p>
          <p className="text-xs text-forest-500">
            Data cuaca dari{" "}
            <a href="https://data.bmkg.go.id" target="_blank" rel="noopener noreferrer" className="text-forest-400 hover:text-white underline">
              BMKG Open Data
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
