import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    updateEmail,
    updatePassword,
    sendPasswordResetEmail,
    EmailAuthProvider,
    reauthenticateWithCredential,
    User,
  } from "firebase/auth";
  import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
  import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
  import { auth, db, googleProvider, storage } from "../lib/firebase";
  import { UserProfile } from "../types/user";
  
  // ─── SIGN IN ───────────────────────────────────────────────
  
  export async function loginWithGoogle(): Promise<void> {
    const result = await signInWithPopup(auth, googleProvider);
    await ensureUserProfile(result.user);
  }
  
  export async function loginWithEmail(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
  }
  
  export async function registerWithEmail(
    email: string,
    password: string,
    displayName: string
  ): Promise<void> {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName });
    await createUserProfile(result.user, { displayName });
  }
  
  export async function logout(): Promise<void> {
    await signOut(auth);
  }
  
  export async function sendResetEmail(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  }
  
  // ─── USER PROFILE (FIRESTORE) ──────────────────────────────
  
  /** Buat profil baru jika belum ada */
  async function createUserProfile(user: User, extra?: Partial<UserProfile>): Promise<void> {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) return;
  
    await setDoc(ref, {
      uid: user.uid,
      email: user.email,
      displayName: extra?.displayName ?? user.displayName ?? "Petani",
      photoURL: user.photoURL ?? null,
      lokasiFavorit: "lebak",
      lokasiNama: "Lebak (Kawasan Baduy)",
      bio: "",
      luasLahan: "",
      varietasFavorit: "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    } satisfies Partial<UserProfile>);
  }
  
  /** Pastikan profil ada — dipanggil saat login Google */
  async function ensureUserProfile(user: User): Promise<void> {
    await createUserProfile(user);
  }
  
  export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? (snap.data() as UserProfile) : null;
  }
  
  export async function updateUserProfile(
    uid: string,
    data: Partial<UserProfile>
  ): Promise<void> {
    await updateDoc(doc(db, "users", uid), {
      ...data,
      updatedAt: serverTimestamp(),
    });
    // Sync displayName ke Firebase Auth jika berubah
    if (data.displayName && auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: data.displayName });
    }
  }
  
  // ─── FOTO PROFIL ───────────────────────────────────────────
  
  export async function uploadProfilePhoto(uid: string, file: File): Promise<string> {
    const storageRef = ref(storage, `profile-photos/${uid}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
  
    // Update di Auth dan Firestore
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { photoURL: url });
    }
    await updateDoc(doc(db, "users", uid), { photoURL: url, updatedAt: serverTimestamp() });
  
    return url;
  }
  
  // ─── UPDATE EMAIL / PASSWORD ───────────────────────────────
  
  export async function changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = auth.currentUser;
    if (!user?.email) throw new Error("Tidak ada user aktif");
  
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  }
  
  export async function changeEmail(
    currentPassword: string,
    newEmail: string
  ): Promise<void> {
    const user = auth.currentUser;
    if (!user?.email) throw new Error("Tidak ada user aktif");
  
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updateEmail(user, newEmail);
    await updateDoc(doc(db, "users", user.uid), {
      email: newEmail,
      updatedAt: serverTimestamp(),
    });
  }
  