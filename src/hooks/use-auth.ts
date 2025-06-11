import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { signInWithPopup, User } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { authManager } from "../lib/auth-interceptor";

const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL", API_URL);

export function useLogin() {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await axios.post(`${API_URL}/auth/login`, data);
      return res.data;
    },
    onSuccess: (data) => {
      authManager.setTokens({
        accessToken: data.token,
        refreshToken: data.refreshToken,
        expiresAt: data.expiresAt || Date.now() + 60 * 60 * 1000, // 1 hour default
      });
    },
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: async (data: {
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      password: string;
    }) => {
      const res = await axios.post(`${API_URL}/auth/signup`, data);
      return res.data;
    },
    onSuccess: (data) => {
      authManager.setTokens({
        accessToken: data.token,
        refreshToken: data.refreshToken,
        expiresAt: data.expiresAt || Date.now() + 60 * 60 * 1000,
      });
    },
  });
}

export function useFirebaseGoogleLogin() {
  return useMutation({
    mutationFn: async (): Promise<{ user: User; idToken: string }> => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const idToken = await result.user.getIdToken();
        return { user: result.user, idToken };
      } catch (error) {
        console.error("Firebase Google Sign-In Error:", error);
        throw error;
      }
    },
  });
}

export function useGoogleLogin() {
  return useMutation({
    mutationFn: async (data: { idToken: string }) => {
      const res = await axios.post(`${API_URL}/auth/google-login`, data);
      return res.data;
    },
    onSuccess: (data) => {
      authManager.setTokens({
        accessToken: data.token,
        refreshToken: data.refreshToken,
        expiresAt: data.expiresAt || Date.now() + 60 * 60 * 1000,
      });
    },
  });
}

export function isLoggedIn() {
  const tokens = authManager.getTokens();
  return !!tokens?.accessToken;
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const token = await authManager.getValidToken();
      const res = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!authManager.getTokens()?.accessToken,
    retry: (failureCount, error: unknown) => {
      if (
        (error as { response?: { status?: number } })?.response?.status === 401
      ) {
        return false;
      }
      return failureCount < 2;
    },
  });
}

export function logout() {
  authManager.clearTokens();
}
