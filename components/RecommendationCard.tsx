"use client";

import { useState } from "react";
import { SyncAnalysis } from "@/types";
import { EnhancedSyncAnalysis, RiskFactor, WeeklyOutlook, PlantingAlert } from "@/lib/decisionEngine";
import { getStatusConfig } from "@/lib/utils";
import {
  TrendingUp, Shield, Calendar, AlertTriangle, CheckCircle,
  Info, ChevronDown, ChevronUp, Target, Zap, Clock,
  Sparkles, Satellite // <-- Icon baru pengganti emoji 🌌 dan 🛰️
} from "lucide-react";

type Analysis = EnhancedSyncAnalysis | SyncAnalysis;
function isEnhanced(a: Analysis): a is EnhancedSyncAnalysis { return "riskFactors" in a; }

interface Props { analysis: Analysis; onSave?: () => void; isSaved?: boolean; }

export default function RecommendationCard({ analysis, onSave, isSaved }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const cfg = getStatusConfig(analysis.recommendation.status);
  const rec = analysis.recommendation;
  const enhanced = isEnhanced(analysis) ? analysis : null;

  // Warna gradasi diperbarui menjadi lebih modern/pastel
  const statusBg: Record<string, string> = {
    SANGAT_BAIK: "from-[#186534] to-emerald-600",
    BAIK: "from-teal-600 to-teal-500",
    CUKUP: "from-amber-500 to-amber-400",
    TUNDA: "from-orange-500 to-orange-400",
    DILARANG: "from-rose-600 to-rose-500",
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
      <div className={`bg-gradient-to-r ${statusBg[rec.status] ?? "from-[#186534] to-emerald-600"} p-5`}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/20 text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm">Rekomendasi Nata Jagat</span>
              {enhanced && <span className="bg-white/15 text-white/90 text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">{enhanced.confidence.label}</span>}
            </div>
            <h2 className="font-serif text-xl font-bold text-white leading-snug">{rec.title}</h2>
          </div>
          <div className="text-3xl flex-shrink-0 bg-white/20 p-2 rounded-xl backdrop-blur-md">
            {cfg.icon}
          </div>
        </div>
        <p className="text-white/90 text-sm leading-relaxed font-medium">{rec.message}</p>
      </div>

      {enhanced && enhanced.alerts.length > 0 && (
        <div className="border-b border-slate-100 divide-y divide-slate-100">
          {enhanced.alerts.map((alert, i) => <AlertBanner key={i} alert={alert} />)}
        </div>
      )}

      <div className="p-5 bg-[#FDFBF7]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-bold text-slate-700">Sinkronisasi Tradisional ↔ Modern</span>
          </div>
          <span className="font-serif font-black text-lg text-slate-900">{analysis.syncScore}/100</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-4">
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${analysis.syncScore}%`, background: analysis.syncScore >= 75 ? "#10b981" : analysis.syncScore >= 50 ? "#f59e0b" : "#f43f5e" }} />
        </div>

        {enhanced && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            <ScoreBox 
              label="Tradisional (Baduy)" 
              score={enhanced.traditionalScore} 
              color="earth" 
              icon={<Sparkles className="w-4 h-4 text-amber-600" />} 
              sub={analysis.traditionalSays} 
            />
            <ScoreBox 
              label="Modern (BMKG)" 
              score={enhanced.modernScore} 
              color="sky" 
              icon={<Satellite className="w-4 h-4 text-sky-600" />} 
              sub={analysis.modernSays} 
            />
          </div>
        )}
        
        {enhanced && (
          <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 bg-white border border-slate-100 p-2.5 rounded-xl">
            <Target className="w-3.5 h-3.5 text-slate-400" />
            <span>Interval: {enhanced.confidence.lower}–{enhanced.confidence.upper} · {enhanced.confidence.label}</span>
          </div>
        )}
        
        {analysis.conflictNote && (
          <div className="flex gap-2 items-start mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs font-medium text-amber-800 leading-relaxed">{analysis.conflictNote}</p>
          </div>
        )}
      </div>

      {enhanced?.optimalWindow && (
        <div className="mx-5 mb-4 bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-3">
          <div className="w-8 h-8 bg-[#186534] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-emerald-900 mb-0.5">Window Tanam Optimal</p>
            <p className="text-xs text-emerald-700 leading-relaxed">{enhanced.optimalWindow.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-1.5 flex-1 bg-emerald-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#186534] rounded-full" style={{ width: `${enhanced.optimalWindow.probability}%` }} />
              </div>
              <span className="text-[10px] font-bold text-emerald-600">{enhanced.optimalWindow.probability}% Probabilitas</span>
            </div>
          </div>
        </div>
      )}

      {enhanced && (
        <div className="px-5 pb-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> Outlook 4 Minggu
          </p>
          <div className="grid grid-cols-4 gap-2">
            {enhanced.weeklyOutlook.map((w) => <WeekCard key={w.week} week={w} />)}
          </div>
        </div>
      )}

      {enhanced && enhanced.riskFactors.length > 0 && (
        <div className="px-5 pb-4 border-t border-slate-100 pt-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" /> Faktor Risiko
          </p>
          <div className="space-y-2">
            {enhanced.riskFactors.slice(0, showDetails ? undefined : 3).map((rf, i) => <RiskFactorRow key={i} risk={rf} />)}
            {enhanced.riskFactors.length > 3 && (
              <button onClick={() => setShowDetails(!showDetails)} className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 py-2 rounded-lg w-full mt-2 transition-colors">
                {showDetails ? <><ChevronUp className="w-3.5 h-3.5" />Sembunyikan</> : <><ChevronDown className="w-3.5 h-3.5" />Lihat {enhanced.riskFactors.length - 3} faktor lain</>}
              </button>
            )}
          </div>
        </div>
      )}

      <div className="px-5 pb-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <BasisBox icon={<Sparkles className="w-4 h-4 text-amber-500" />} label="Basis Tradisional" text={rec.traditionalBasis} />
          <BasisBox icon={<Satellite className="w-4 h-4 text-sky-500" />} label="Basis BMKG" text={rec.modernBasis} />
        </div>
        {rec.actions.length > 0 && (
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" /> Tindakan Disarankan
            </p>
            <ul className="space-y-2">
              {rec.actions.map((action, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="w-5 h-5 rounded-md bg-white border border-slate-200 text-slate-500 text-[10px] flex items-center justify-center font-black flex-shrink-0 shadow-sm">{i + 1}</span>
                  <span className="mt-0.5 leading-relaxed font-medium">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5" />Tinjau: {rec.nextReviewDate}
          </div>
          {onSave && (
            <button onClick={onSave} disabled={isSaved} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${isSaved ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-[#186534] text-white hover:bg-emerald-700 shadow-sm"}`}>
              {isSaved ? <><CheckCircle className="w-3.5 h-3.5" /> Tersimpan</> : "Simpan Prediksi"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function AlertBanner({ alert }: { alert: PlantingAlert }) {
  const s = { 
    danger: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-100", icon: <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0" /> }, 
    warning: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-100", icon: <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" /> }, 
    info: { bg: "bg-sky-50", text: "text-sky-800", border: "border-sky-100", icon: <Info className="w-4 h-4 text-sky-500 flex-shrink-0" /> }, 
    success: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-100", icon: <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" /> } 
  }[alert.type];
  
  return (
    <div className={`flex gap-3 p-3.5 px-5 ${s.bg} border-b ${s.border}`}>
      {s.icon}
      <div>
        <p className={`text-xs font-bold ${s.text} mb-0.5`}>{alert.title}</p>
        <p className={`text-xs ${s.text} font-medium opacity-80 leading-relaxed`}>{alert.message}</p>
      </div>
    </div>
  );
}

function ScoreBox({ label, score, color, icon, sub }: { label: string; score: number; color: string; icon: React.ReactNode; sub: string }) {
  const c = { 
    earth: "bg-amber-50/60 border-amber-200 text-amber-900", 
    sky: "bg-sky-50/60 border-sky-200 text-sky-900" 
  }[color] ?? "";
  
  return (
    <div className={`border rounded-xl p-3.5 ${c} shadow-sm`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-white p-1 rounded-md shadow-sm border border-white/50">{icon}</div>
        <span className="text-[9px] font-bold uppercase tracking-widest opacity-70">{label}</span>
      </div>
      <p className="font-serif text-3xl font-black opacity-90 leading-none mb-1.5">{score}<span className="font-sans text-xs font-bold opacity-50">/100</span></p>
      <p className="text-[10px] font-medium opacity-80 leading-tight">{sub}</p>
    </div>
  );
}

function WeekCard({ week }: { week: WeeklyOutlook }) {
  const c = { 
    SANGAT_BAIK: "bg-emerald-500 text-white", 
    BAIK: "bg-teal-500 text-white", 
    CUKUP: "bg-amber-400 text-amber-950", 
    TUNDA: "bg-orange-500 text-white", 
    DILARANG: "bg-rose-500 text-white" 
  }[week.status] ?? "bg-slate-300 text-slate-800";
  
  return (
    <div className="bg-[#FDFBF7] border border-slate-200 rounded-xl p-2.5 text-center shadow-sm">
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{week.label}</p>
      <div className={`w-8 h-8 rounded-lg ${c} text-xs font-black flex items-center justify-center mx-auto mb-2 shadow-sm`}>{week.score}</div>
      <p className="text-[9px] font-medium text-slate-500 leading-tight">{week.note.split(" ").slice(0, 4).join(" ")}</p>
    </div>
  );
}

function RiskFactorRow({ risk }: { risk: RiskFactor }) {
  const cfg = { 
    low: { bg: "bg-emerald-50", dot: "bg-emerald-400", text: "text-emerald-700", label: "Rendah", border: "border-emerald-100" }, 
    medium: { bg: "bg-amber-50", dot: "bg-amber-400", text: "text-amber-700", label: "Sedang", border: "border-amber-100" }, 
    high: { bg: "bg-orange-50", dot: "bg-orange-500", text: "text-orange-700", label: "Tinggi", border: "border-orange-100" }, 
    critical: { bg: "bg-rose-50", dot: "bg-rose-500", text: "text-rose-800", label: "Kritis", border: "border-rose-100" } 
  }[risk.level];
  
  return (
    <div className={`${cfg.bg} border ${cfg.border} rounded-xl px-3.5 py-3 flex items-start gap-3`}>
      <div className={`w-2 h-2 rounded-full ${cfg.dot} flex-shrink-0 mt-1.5 shadow-sm`} />
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-bold text-slate-800">{risk.factor}</span>
          <span className={`text-[9px] font-black uppercase tracking-widest ${cfg.text}`}>{cfg.label}</span>
        </div>
        <p className="text-[11px] font-medium text-slate-600 leading-relaxed">{risk.description}</p>
      </div>
    </div>
  );
}

function BasisBox({ icon, label, text }: { icon: React.ReactNode; label: string; text: string }) {
  return (
    <div className="bg-[#FDFBF7] border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      </div>
      <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{text}</p>
    </div>
  );
}