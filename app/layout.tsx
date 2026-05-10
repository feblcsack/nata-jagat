import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nata Jagat — Integrasi Kearifan Baduy & Data BMKG",
  description:
    "Platform integrasi pengetahuan tradisional Baduy (Bentang Kidang) dengan data cuaca modern BMKG untuk rekomendasi musim tanam padi yang akurat dan berkelanjutan.",
  keywords: [
    "Baduy",
    "Bentang Kidang",
    "BMKG",
    "musim tanam",
    "kearifan lokal",
    "pertanian tradisional",
    "Lebak",
    "Banten",
  ],
  openGraph: {
    title: "Nata Jagat",
    description: "Memahami alam melalui tradisi dan sains",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
