import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

export const useApi = <T>() => {
  const [response, setResponse] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const request = async (
    method: "get" | "post" | "put" | "delete",
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => {
    setResponse({ data: null, error: null, isLoading: true });

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: token ? `Bearer ${token}` : undefined,
        ...config?.headers,
      };
      const res = await axios({ method, url, data, headers});
      setResponse({ data: res.data, error: null, isLoading: false });
      return res.data;
    } catch (error: any) {
      setResponse({
        data: null,
        error: error.response?.data?.message || "Une erreur est survenue.",
        isLoading: false,
      });
      throw error;
    }
  };

  return { ...response, request };
};