import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp,
    Timestamp,
  } from "firebase/firestore";
  import { db } from "@/lib/firebase";
  
  // ─── TYPES ─────────────────────────────────────────────────
  
  export type HasilPanen = "Baik" | "Sedang" | "Buruk";
  export type StatusTanam = "Semai" | "Tanam" | "Tumbuh" | "Panen" | "Selesai";
  
  export interface RiwayatPanen {
    id: string;
    userId: string;
  
    // Info dasar
    musimKe: number;              // musim tanam ke-berapa user ini
    tahun: number;
    bulanTanam: number;           // 1-12
    bulanPanen: number | null;    // null jika belum panen
  
    // Lahan
    lokasiId: string;
    lokasiNama: string;
    luasLahan: string;            // e.g. "0.5 ha"
    varietas: string;             // e.g. "Ciherang"
  
    // Kondisi saat tanam (snapshot dari Decision Engine)
    bentangPhase: string;
    traditionalSeason: string;
    syncScore: number;
    statusRekomendasi: string;    // SANGAT_BAIK | BAIK | dst
    rainfallSaatTanam: number;
    suhuSaatTanam: number;
  
    // Hasil
    status: StatusTanam;
    hasilPanen: HasilPanen | null;
    beratPanen: string;           // e.g. "1.2 ton"
    catatanPetani: string;        // input bebas
    kendalaDihadapi: string[];    // pilihan: ["Hama", "Banjir", "Kekeringan", "Penyakit"]
    fotoUrl: string | null;       // opsional
  
    createdAt: Timestamp;
    updatedAt: Timestamp;
  }
  
  export type RiwayatPanenInput = Omit<RiwayatPanen, "id" | "createdAt" | "updatedAt">;
  
  // ─── FIRESTORE COLLECTION ──────────────────────────────────
  
  const COL = "riwayat_panen";
  
  // ─── CREATE ────────────────────────────────────────────────
  
  export async function tambahRiwayat(data: RiwayatPanenInput): Promise<string> {
    const docRef = await addDoc(collection(db, COL), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  }
  
  // ─── READ ──────────────────────────────────────────────────
  
  export async function getRiwayatUser(
    userId: string,
    maxItems: number = 20
  ): Promise<RiwayatPanen[]> {
    const q = query(
      collection(db, COL),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(maxItems)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as RiwayatPanen));
  }
  
  export async function getRiwayatById(id: string): Promise<RiwayatPanen | null> {
    const snap = await getDoc(doc(db, COL, id));
    return snap.exists() ? ({ id: snap.id, ...snap.data() } as RiwayatPanen) : null;
  }
  
  export async function getStatistikUser(userId: string): Promise<{
    totalMusim: number;
    hasilBaik: number;
    hasilSedang: number;
    hasilBuruk: number;
    rataRataSyncScore: number;
    variastasTerbanyak: string;
  }> {
    const semua = await getRiwayatUser(userId, 100);
    const selesai = semua.filter((r) => r.hasilPanen !== null);
  
    const hasilBaik = selesai.filter((r) => r.hasilPanen === "Baik").length;
    const hasilSedang = selesai.filter((r) => r.hasilPanen === "Sedang").length;
    const hasilBuruk = selesai.filter((r) => r.hasilPanen === "Buruk").length;
  
    const rataRataSyncScore =
      semua.length > 0
        ? Math.round(semua.reduce((acc, r) => acc + r.syncScore, 0) / semua.length)
        : 0;
  
    // Varietas terbanyak
    const varCount: Record<string, number> = {};
    semua.forEach((r) => {
      if (r.varietas) varCount[r.varietas] = (varCount[r.varietas] ?? 0) + 1;
    });
    const variastasTerbanyak =
      Object.entries(varCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
  
    return {
      totalMusim: semua.length,
      hasilBaik,
      hasilSedang,
      hasilBuruk,
      rataRataSyncScore,
      variastasTerbanyak,
    };
  }
  
  // ─── UPDATE ────────────────────────────────────────────────
  
  export async function updateRiwayat(
    id: string,
    data: Partial<Omit<RiwayatPanen, "id" | "userId" | "createdAt">>
  ): Promise<void> {
    await updateDoc(doc(db, COL, id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }
  
  // ─── DELETE ────────────────────────────────────────────────
  
  export async function hapusRiwayat(id: string): Promise<void> {
    await deleteDoc(doc(db, COL, id));
  }
  