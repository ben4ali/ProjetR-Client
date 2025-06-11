import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../types/User";

const API_URL = import.meta.env.VITE_API_URL;

export function useUserById(id?: string | number) {
  return useQuery<User, Error>({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/users/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useAllUsers() {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/users`);
      return data;
    },
  });
}

export function useChangePfp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, file }: { userId: string; file: File }) => {
      const formData = new FormData();
      formData.append("avatar", file);
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${API_URL}/users/${userId}/avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user", variables.userId] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ["currentUser"] });
      }, 100);
    },
  });
}

export function useChangeBanner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, file }: { userId: string; file: File }) => {
      const formData = new FormData();
      formData.append("banner", file);
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${API_URL}/users/${userId}/banner`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["user", variables.userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useSearchUsers(searchTerm: string) {
  return useQuery<User[], Error>({
    queryKey: ["users", "search", searchTerm],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/users/name/${searchTerm}`);
      return data;
    },
    enabled: searchTerm.length >= 3,
  });
}

export function useUserByFullName(firstName?: string, lastName?: string) {
  return useQuery<User[], Error>({
    queryKey: ["user", "name", firstName, lastName],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_URL}/users/name/${firstName}/${lastName}`,
      );
      return data;
    },
    enabled: !!firstName && !!lastName,
  });
}
