import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL", API_URL);

export function useLogin() {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await axios.post(`${API_URL}/auth/login`, data);
      return res.data;
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
  });
}

export function useGoogleLogin() {
  return useMutation({
    mutationFn: async (data: { idToken: string }) => {
      const res = await axios.post(`${API_URL}/auth/google-login`, data);
      return res.data;
    },
  });
}

export function isLoggedIn() {
  const token = localStorage.getItem("token");
  return !!token;
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const res = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!localStorage.getItem("token"),
  });
}

export function logout() {
  localStorage.removeItem("token");
}
