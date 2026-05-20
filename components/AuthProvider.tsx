"use client";

import {
  createContext, useContext, useEffect, useState, useCallback, useRef
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { UserProfile } from "@/types/user";

// ─── Context ────────────────────────────────────────────────

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  refreshProfile: async () => {},
});

// ─── Provider ───────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  // Start as false so SSR never blocks on "loading"
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const unsubRef = useRef<(() => void) | null>(null);

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    try {
      const { getUserProfile } = await import("@/lib/auth");
      const p = await getUserProfile(user.uid);
      setProfile(p);
    } catch (e) {
      console.warn("refreshProfile failed:", e);
    }
  }, [user]);

  useEffect(() => {
    // Mark mounted — only run Firebase on client
    setMounted(true);
    setLoading(true);

    let cancelled = false;

    async function initAuth() {
      // Dynamic import so Firebase never runs on server
      const { auth } = await import("@/lib/firebase");
      const { getUserProfile } = await import("@/lib/auth");

      unsubRef.current = onAuthStateChanged(auth, async (firebaseUser) => {
        if (cancelled) return;
        setUser(firebaseUser);

        if (firebaseUser) {
          // Fetch profile but DON'T block loading on it
          setLoading(false);
          try {
            const p = await getUserProfile(firebaseUser.uid);
            if (!cancelled) setProfile(p);
          } catch {
            // Profile fetch failed — non-fatal, user still logged in
            console.warn("Could not fetch user profile");
          }
        } else {
          setProfile(null);
          setLoading(false);
        }
      });
    }

    initAuth().catch((e) => {
      console.error("Firebase init failed:", e);
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
      unsubRef.current?.();
    };
  }, []);

  // On server / before mount — never block with loading spinner
  if (!mounted) {
    return (
      <AuthContext.Provider value={{ user: null, profile: null, loading: false, refreshProfile }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}