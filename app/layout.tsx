import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Inter } from "next/font/google"; // Ganti Geist ke Inter
import { cn } from "@/lib/utils";

// Setup Inter
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans' 
});

export const metadata: Metadata = {
  title: "Nata Jagat — Integrasi Kearifan Baduy & Data BMKG",
  description: "Platform integrasi pengetahuan tradisional Baduy (Bentang Kidang) dengan data cuaca modern BMKG untuk rekomendasi musim tanam padi.",
  keywords: ["Baduy", "Bentang Kidang", "BMKG", "musim tanam", "kearifan lokal", "Lebak", "Banten"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={cn("scroll-smooth", inter.variable)}>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}