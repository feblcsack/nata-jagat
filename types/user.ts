import { Timestamp, FieldValue } from "firebase/firestore";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL: string | null;
  bio: string;

  // Pengaturan pertanian
  lokasiFavorit: string;       // ID lokasi BMKG (e.g. "lebak")
  lokasiNama: string;          // Nama tampil lokasi
  luasLahan: string;           // e.g. "0.5 hektar"
  varietasFavorit: string;     // e.g. "Ciherang"

  createdAt: Timestamp | FieldValue;
updatedAt: Timestamp | FieldValue;
}
