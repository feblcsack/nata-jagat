// Firebase MUST only run on client — this file is safe to import
// because all callers either use "use client" or dynamic import it

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Guard: if config is empty (no .env.local), log a clear message
if (!firebaseConfig.apiKey && typeof window !== "undefined") {
  console.error(
    "[Nata Jagat] Firebase tidak dikonfigurasi.\n" +
    "Buat file .env.local dengan NEXT_PUBLIC_FIREBASE_* dari Firebase Console.\n" +
    "Lihat .env.example untuk templatenya."
  );
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
export const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export { googleProvider };