"use client";

import { useEffect, useRef, useState } from "react";
import { ZonaRisiko, RisikoTanam } from "@/data/locations";
import { CheckCircle2, AlertTriangle, ShieldAlert, Ban } from "lucide-react";

interface Props {
  zonaRisiko: ZonaRisiko[];
  selectedKecamatan?: string | null;
  onKecamatanClick?: (zona: ZonaRisiko) => void;
  center?: [number, number];
  zoom?: number;
}

// Raw SVG strings untuk di-inject ke dalam HTML mentah Leaflet Popup
const RAW_SVGS = {
  aman: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  waspada: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
  bahaya: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>`,
  pantang: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>`,
  shieldBadge: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FDFBF7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
};

// Disesuaikan dengan Color Palette lu
const RISIKO_CONFIG: Record<RisikoTanam, { color: string; fill: string; bgHex: string; label: string; rawSvg: string; Icon: React.ElementType }> = {
  aman:    { color: "#186534", bgHex: "rgba(24, 101, 52, 0.1)", fill: "rgba(24, 101, 52, 0.4)", label: "Aman",    rawSvg: RAW_SVGS.aman,    Icon: CheckCircle2 }, // Primary Green
  waspada: { color: "#92400E", bgHex: "rgba(146, 64, 14, 0.1)", fill: "rgba(146, 64, 14, 0.4)", label: "Waspada", rawSvg: RAW_SVGS.waspada, Icon: AlertTriangle }, // Secondary Earthy Orange
  bahaya:  { color: "#9f1239", bgHex: "rgba(159, 18, 57, 0.1)", fill: "rgba(159, 18, 57, 0.4)",  label: "Bahaya",  rawSvg: RAW_SVGS.bahaya,  Icon: ShieldAlert }, // Deep Crimson
  pantang: { color: "#1c1917", bgHex: "rgba(28, 25, 23, 0.1)",  fill: "rgba(28, 25, 23, 0.4)",   label: "Pantang", rawSvg: RAW_SVGS.pantang, Icon: Ban }, // Charcoal/Stone
};

export default function LeafletMap({ zonaRisiko, selectedKecamatan, onKecamatanClick, center = [-6.65, 106.22], zoom = 9 }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<unknown>(null);
  const circlesRef = useRef<unknown[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selected, setSelected] = useState<ZonaRisiko | null>(null);
  const [stats, setStats] = useState({ aman: 0, waspada: 0, bahaya: 0, pantang: 0 });

  useEffect(() => {
    const s = { aman: 0, waspada: 0, bahaya: 0, pantang: 0 };
    zonaRisiko.forEach(z => s[z.risiko]++);
    setStats(s);
  }, [zonaRisiko]);

  useEffect(() => {
    if (!mapRef.current || instanceRef.current) return;
    import("leaflet").then(L => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      if (!mapRef.current) return;
      const map = L.map(mapRef.current, { center, zoom, zoomControl: true, attributionControl: false });
      
      // Basemap tetap terang agar palet warna earthy pop-out
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", { 
        maxZoom: 18, 
        opacity: 0.9 
      }).addTo(map);
      
      L.control.attribution({ position: "bottomright", prefix: "© OSM · CARTO · BMKG" }).addTo(map);
      instanceRef.current = map;
      setIsLoaded(true);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoaded && instanceRef.current && center) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const map = instanceRef.current as any;
      map.setView(center, zoom);
    }
  }, [center, zoom, isLoaded]);

  useEffect(() => {
    if (!isLoaded || !instanceRef.current) return;
    import("leaflet").then(L => {
      const map = instanceRef.current as ReturnType<typeof L.map>;
      circlesRef.current.forEach(c => (c as ReturnType<typeof L.circle>).remove());
      circlesRef.current = [];

      zonaRisiko.forEach(zona => {
        const cfg = RISIKO_CONFIG[zona.risiko];
        const isSelected = selectedKecamatan === zona.kecamatanId;
        const radiusM = zona.radiusKm * 1000;

        const circle = L.circle([zona.lat, zona.lon], {
          radius: radiusM,
          fillColor: cfg.fill,
          fillOpacity: 1,
          color: cfg.color,
          weight: isSelected ? 3 : 1.5,
          opacity: isSelected ? 1 : 0.8,
          dashArray: isSelected ? undefined : "4 4",
          interactive: true,
        }).addTo(map);

        // UI Popup disesuaikan dengan tipografi Playfair Display & DM Sans, serta Neutral bg #FDFBF7
        const popupHtml = `
          <div style="font-family:'DM Sans', ui-sans-serif, system-ui, sans-serif; min-width:240px; padding:4px;">
            
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:14px;">
              <div style="width:42px; height:42px; border-radius:10px; background:${cfg.bgHex}; color:${cfg.color}; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                ${cfg.rawSvg}
              </div>
              <div>
                <h4 style="font-family:'Playfair Display', ui-serif, serif; font-weight:700; color:#1f2937; font-size:16px; margin:0 0 2px 0; line-height:1.2;">${zona.nama}</h4>
                <p style="font-size:11px; color:#6b7280; margin:0; font-weight:500; letter-spacing:0.3px;">Kab. Lebak, Banten</p>
              </div>
            </div>
            
            <div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:10px; padding:12px; margin-bottom:12px; box-shadow:0 1px 2px rgba(0,0,0,0.02);">
              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                <span style="font-size:10px; font-weight:700; color:#6b7280; text-transform:uppercase; letter-spacing:0.5px;">Status Tanam</span>
                <span style="background:${cfg.bgHex}; color:${cfg.color}; font-size:10px; font-weight:800; padding:4px 10px; border-radius:99px; text-transform:uppercase; letter-spacing:0.5px;">${cfg.label}</span>
              </div>
              <p style="font-size:12px; color:#374151; margin:0; line-height:1.6;">${zona.alasan}</p>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:12px;">
              <div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:8px; padding:10px; text-align:center;">
                <p style="font-size:10px; color:#6b7280; margin:0 0 4px 0; font-weight:700; text-transform:uppercase;">Skor Tanam</p>
                <p style="font-family:'Playfair Display', ui-serif, serif; font-size:20px; font-weight:800; color:${cfg.color}; margin:0;">${zona.skor}<span style="font-family:'DM Sans', sans-serif; font-size:10px; color:#9ca3af; font-weight:600;">/100</span></p>
              </div>
              <div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:8px; padding:10px; text-align:center;">
                <p style="font-size:10px; color:#6b7280; margin:0 0 4px 0; font-weight:700; text-transform:uppercase;">Elevasi</p>
                <p style="font-family:'Playfair Display', ui-serif, serif; font-size:20px; font-weight:800; color:#1f2937; margin:0;">${zona.elevasiM}<span style="font-family:'DM Sans', sans-serif; font-size:10px; color:#9ca3af; font-weight:600;">m</span></p>
              </div>
            </div>

            <div style="display:flex; align-items:center; gap:6px; font-size:11px; color:#4b5563; margin-bottom:14px; font-weight:500;">
              Lahan dominan: <span style="background:#f3f4f6; padding:3px 8px; border-radius:6px; font-weight:700; color:#1f2937;">${zona.lahanDominan.toUpperCase()}</span>
            </div>

            ${zona.kawasanAdat ? `
              <div style="display:flex; align-items:center; gap:8px; background:#14532D; border-radius:8px; padding:10px; margin-bottom:16px; box-shadow:0 2px 4px rgba(20, 83, 45, 0.2);">
                ${RAW_SVGS.shieldBadge}
                <span style="font-size:11px; font-weight:700; color:#FDFBF7; letter-spacing:0.3px;">Kawasan Adat — Dihormati</span>
              </div>
            ` : "<div style='margin-bottom:16px;'></div>"}

            <button
              onclick="window.dispatchEvent(new CustomEvent('zona-selected',{detail:'${zona.kecamatanId}'}));this.closest('.leaflet-popup').querySelector('.leaflet-popup-close-button')?.click();"
              style="width:100%; padding:12px; background:#186534; color:#FDFBF7; border:none; border-radius:8px; cursor:pointer; font-size:13px; font-weight:700; font-family:'DM Sans', sans-serif; transition:all 0.2s ease; box-shadow:0 2px 4px rgba(24, 101, 52, 0.2);">
              Pilih Kecamatan Ini
            </button>
          </div>
        `;

        circle.bindPopup(popupHtml, { 
          maxWidth: 300, 
          minWidth: 260,
          className: "nata-popup",
          // UX MOBILE FIX: Bikin auto-pan ngasih ruang di atas biar popup gak mentok notch/header HP
          autoPanPaddingTopLeft: L.point(20, 80),
          autoPanPaddingBottomRight: L.point(20, 20)
        });

        circle.on("click", (e) => {
          setSelected(zona);
          if (onKecamatanClick) onKecamatanClick(zona);
          
          // SUPER SMOOTH UX MOBILE: Peta otomatis "terbang" (flyTo) dan nge-center zona yang diklik 
          // offset sedikit ke bawah (-0.05 lat) supaya popup kebuka sempurna di tengah layar
          const offsetLat = zona.lat + 0.03; 
          map.flyTo([offsetLat, zona.lon], Math.max(map.getZoom(), 11), {
            animate: true,
            duration: 0.5
          });
        });

        const label = L.divIcon({
          html: `<div style="font-family:'DM Sans', system-ui, sans-serif; font-size:10px; font-weight:800; color:${cfg.color}; letter-spacing:0.5px; text-shadow:0 2px 4px white, 0 -2px 4px white, 2px 0 4px white, -2px 0 4px white; white-space:nowrap; pointer-events:none;">${zona.nama.split(" ")[0]}</div>`,
          className: "", iconSize: [80, 14], iconAnchor: [40, 7],
        });
        L.marker([zona.lat, zona.lon], { icon: label, interactive: false }).addTo(map);
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        circlesRef.current.push(circle as any);
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, zonaRisiko, selectedKecamatan]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#e5e7eb] shadow-sm bg-[#FDFBF7]">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossOrigin="" />
      
      {/* Impor Font Global langsung di Leaflet buat mastiin kerender */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap');
        
        /* Tema Netral #FDFBF7 pada popup wrapper */
        .nata-popup .leaflet-popup-content-wrapper { 
          background-color: #FDFBF7 !important;
          border-radius: 16px !important; 
          border: 1px solid rgba(0, 0, 0, 0.05) !important; 
          box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.15), 0 8px 16px -8px rgba(0, 0, 0, 0.1) !important; 
          padding: 6px !important; 
        }
        .nata-popup .leaflet-popup-content { margin: 16px !important; }
        .nata-popup .leaflet-popup-tip { background: #FDFBF7 !important; box-shadow: -1px -1px 1px rgba(0,0,0,0.05); }
        .nata-popup .leaflet-popup-close-button { color: #9ca3af !important; font-size: 20px !important; right: 12px !important; top: 12px !important; transition: color 0.2s; }
        .nata-popup .leaflet-popup-close-button:hover { color: #186534 !important; }
      `}</style>

      {/* Legend */}
      <div className="absolute top-4 left-4 z-[1000] bg-[#FDFBF7]/95 backdrop-blur-md rounded-xl px-4 py-3.5 shadow-sm border border-gray-200 space-y-2.5">
        <p className="font-sans text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Zona Risiko Tanam</p>
        {(Object.entries(RISIKO_CONFIG) as [RisikoTanam, typeof RISIKO_CONFIG[RisikoTanam]][]).map(([key, cfg]) => (
          <div key={key} className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <cfg.Icon className="w-4 h-4" style={{ color: cfg.color }} />
              <span className="font-sans text-[11px] font-bold text-gray-700">{cfg.label}</span>
            </div>
            <span className="font-sans text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: cfg.bgHex, color: cfg.color }}>{stats[key]}</span>
          </div>
        ))}
      </div>

      {/* Selected info panel */}
      {selected && (
        <div className="absolute bottom-4 left-4 right-4 z-[1000] bg-[#FDFBF7]/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-gray-200 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: RISIKO_CONFIG[selected.risiko].bgHex, color: RISIKO_CONFIG[selected.risiko].color }}
              >
                {(() => {
                  const Icon = RISIKO_CONFIG[selected.risiko].Icon;
                  return <Icon className="w-6 h-6" />;
                })()}
              </div>
              <div>
                <p className="font-serif text-base font-bold text-gray-900">{selected.nama}</p>
                <p className="font-sans text-[11px] text-gray-500 font-medium">{selected.alasan.substring(0, 40)}...</p>
              </div>
            </div>
            <div className="text-right pl-4 border-l border-gray-200">
              <p className="font-serif font-black text-2xl text-gray-900">{selected.skor}</p>
              <p className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-widest">skor</p>
            </div>
          </div>
        </div>
      )}

      {/* Map */}
      <div ref={mapRef} style={{ height: "480px", width: "100%" }} className="z-0" />

      {/* Loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#FDFBF7] flex items-center justify-center z-10 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-[#186534] rounded-full animate-spin mx-auto mb-3" />
            <p className="font-sans text-xs font-bold text-[#186534] uppercase tracking-widest">Memuat Peta...</p>
          </div>
        </div>
      )}
    </div>
  );
}