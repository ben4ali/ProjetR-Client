import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  Portfolio,
  CreatePortfolioData,
  UpdatePortfolioData,
  isValidTemplate,
} from "../types/Portfolio";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export function useAllPortfolios() {
  return useQuery<Portfolio[], Error>({
    queryKey: ["portfolios"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/portfolios`, {
        headers: getAuthHeaders(),
      });
      return data;
    },
  });
}

export function usePortfolioById(id?: string | number) {
  return useQuery<Portfolio, Error>({
    queryKey: ["portfolio", id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/portfolios/${id}`, {
        headers: getAuthHeaders(),
      });
      return data;
    },
    enabled: !!id,
  });
}

export function usePortfolioByUserId(userId?: string | number) {
  return useQuery<Portfolio, Error>({
    queryKey: ["portfolio", "user", userId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/portfolios/user/${userId}`, {
        headers: getAuthHeaders(),
      });
      return data;
    },
    enabled: !!userId,
    retry: (failureCount, error) => {
      if (
        error &&
        "response" in error &&
        (error as { response?: { status?: number } }).response?.status === 404
      ) {
        return false;
      }
      return failureCount < 2;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useCreatePortfolio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (portfolioData: CreatePortfolioData) => {
      if (!isValidTemplate(portfolioData.template)) {
        throw new Error(`Invalid template: ${portfolioData.template}`);
      }

      const { data } = await axios.post(
        `${API_URL}/portfolios`,
        portfolioData,
        {
          headers: getAuthHeaders(),
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });
}

export function useUpdatePortfolio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      portfolioData,
    }: {
      id: number;
      portfolioData: UpdatePortfolioData;
    }) => {
      if (portfolioData.template && !isValidTemplate(portfolioData.template)) {
        throw new Error(`Invalid template: ${portfolioData.template}`);
      }

      const { data } = await axios.put(
        `${API_URL}/portfolios/${id}`,
        portfolioData,
        {
          headers: getAuthHeaders(),
        },
      );
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio", id] });
    },
  });
}

export function useDeletePortfolio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`${API_URL}/portfolios/${id}`, {
        headers: getAuthHeaders(),
      });
      return data;
    },
    onSuccess: (data: Portfolio) => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio", data.id] });
      queryClient.invalidateQueries({ queryKey: ["portfolio", "user", data.user.id] });
    },
  });
}

export function useArchivePortfolio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.put(
        `${API_URL}/portfolios/archive/${id}`,
        {},
        {
          headers: getAuthHeaders(),
        },
      );
      return data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio", id] });
    },
  });
}

export function useRestorePortfolio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.put(
        `${API_URL}/portfolios/restore/${id}`,
        {},
        {
          headers: getAuthHeaders(),
        },
      );
      return data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio", id] });
    },
  });
}

export function usePermaDeletePortfolio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(
        `${API_URL}/portfolios/perma-delete/${id}`,
        {
          headers: getAuthHeaders(),
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });
}
