import {
    collection, addDoc, getDocs, query,
    where, orderBy, limit, serverTimestamp, Timestamp,
  } from "firebase/firestore";
  import { db } from "@/lib/firebase";
  
  export interface SavedPrediction {
    id: string;
    userId: string;
    month: number;
    monthName: string;
    locationId: string;
    locationName: string;
    status: string;
    syncScore: number;
    notes: string;
    savedAt: Timestamp;
    bentangPhase: string;
    traditionalSeason: string;
    rainfall: number;
    temperature: number;
  }
  
  export interface SavePredictionInput {
    userId: string;
    month: number;
    monthName: string;
    locationId: string;
    locationName: string;
    status: string;
    syncScore: number;
    notes: string;
    bentangPhase: string;
    traditionalSeason: string;
    rainfall: number;
    temperature: number;
  }
  
  export async function savePrediction(input: SavePredictionInput): Promise<string> {
    const ref = await addDoc(collection(db, "predictions"), {
      ...input,
      savedAt: serverTimestamp(),
    });
    return ref.id;
  }
  
  export async function getUserPredictions(userId: string): Promise<SavedPrediction[]> {
    const q = query(
      collection(db, "predictions"),
      where("userId", "==", userId),
      orderBy("savedAt", "desc"),
      limit(20)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as SavedPrediction));
  }
  