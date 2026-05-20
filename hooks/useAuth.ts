"use client";

// Re-export from AuthProvider for convenience + add action functions
import { useAuth as useAuthContext } from "@/components/AuthProvider";

export function useAuth() {
  const ctx = useAuthContext();

  async function loginWithGoogle() {
    const { loginWithGoogle: fn } = await import("@/lib/auth");
    return fn();
  }
  async function loginWithEmail(email: string, password: string) {
    const { loginWithEmail: fn } = await import("@/lib/auth");
    return fn(email, password);
  }
  async function registerWithEmail(email: string, password: string, displayName: string) {
    const { registerWithEmail: fn } = await import("@/lib/auth");
    return fn(email, password, displayName);
  }
  async function logout() {
    const { logout: fn } = await import("@/lib/auth");
    return fn();
  }
  async function sendResetEmail(email: string) {
    const { sendResetEmail: fn } = await import("@/lib/auth");
    return fn(email);
  }
  async function updateUserProfile(uid: string, data: Record<string, unknown>) {
    const { updateUserProfile: fn } = await import("@/lib/auth");
    return fn(uid, data as never);
  }
  async function uploadProfilePhoto(uid: string, file: File) {
    const { uploadProfilePhoto: fn } = await import("@/lib/auth");
    return fn(uid, file);
  }
  async function changePassword(current: string, next: string) {
    const { changePassword: fn } = await import("@/lib/auth");
    return fn(current, next);
  }
  async function changeEmail(password: string, newEmail: string) {
    const { changeEmail: fn } = await import("@/lib/auth");
    return fn(password, newEmail);
  }

  return {
    user: ctx.user,
    profile: ctx.profile,
    loading: ctx.loading,
    refreshProfile: ctx.refreshProfile,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
    sendResetEmail,
    updateUserProfile,
    uploadProfilePhoto,
    changePassword,
    changeEmail,
  };
}