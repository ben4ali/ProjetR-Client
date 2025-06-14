import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { auth } from "./firebase";

const API_URL = import.meta.env.VITE_API_URL;

const refreshAxios = axios.create({
  baseURL: API_URL,
});

interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
}

class AuthManager {
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: Error) => void;
  }> = [];

  getTokens(): AuthTokens | null {
    const accessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const expiresAt = localStorage.getItem("tokenExpiresAt");

    if (!accessToken) return null;

    return {
      accessToken,
      refreshToken: refreshToken || undefined,
      expiresAt: expiresAt ? parseInt(expiresAt) : undefined,
    };
  }

  setTokens(tokens: AuthTokens) {
    localStorage.setItem("token", tokens.accessToken);

    if (tokens.refreshToken) {
      localStorage.setItem("refreshToken", tokens.refreshToken);
    }

    if (tokens.expiresAt) {
      localStorage.setItem("tokenExpiresAt", tokens.expiresAt.toString());
    }
  }

  clearTokens() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiresAt");
    auth.signOut().catch((error) => {
      console.error("Error signing out from Firebase:", error);
    });
  }

  isTokenExpired(): boolean {
    const tokens = this.getTokens();
    if (!tokens?.expiresAt) return false;

    const fiveMinutesFromNow = Date.now() + 5 * 60 * 1000;
    return tokens.expiresAt < fiveMinutesFromNow;
  }

  async getValidToken(): Promise<string> {
    const tokens = this.getTokens();

    if (!tokens?.accessToken) {
      throw new Error("No access token available");
    }

    if (!this.isTokenExpired()) {
      return tokens.accessToken;
    }

    return this.refreshToken();
  }

  async refreshToken(): Promise<string> {
    const tokens = this.getTokens();

    if (!tokens?.refreshToken) {
      return this.refreshFirebaseToken();
    }

    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject });
      });
    }

    this.isRefreshing = true;

    try {
      const response = await refreshAxios.post("/auth/refresh", {
        refreshToken: tokens.refreshToken,
      });

      const newTokens: AuthTokens = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken || tokens.refreshToken,
        expiresAt: response.data.expiresAt || Date.now() + 60 * 60 * 1000,
      };

      this.setTokens(newTokens);
      this.processQueue(null, newTokens.accessToken);

      return newTokens.accessToken;
    } catch (error) {
      this.processQueue(error as Error, null);
      this.clearTokens();

      window.location.href = "/authentification";
      throw error;
    } finally {
      this.isRefreshing = false;
    }
  }

  async refreshFirebaseToken(): Promise<string> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No Firebase user");
      }

      const idToken = await user.getIdToken(true);

      const response = await refreshAxios.post("/auth/google-login", {
        idToken,
      });

      const newTokens: AuthTokens = {
        accessToken: response.data.token,
        refreshToken: response.data.refreshToken,
        expiresAt: response.data.expiresAt || Date.now() + 60 * 60 * 1000,
      };

      this.setTokens(newTokens);
      return newTokens.accessToken;
    } catch (error) {
      this.clearTokens();
      window.location.href = "/authentification";
      throw error;
    }
  }

  private processQueue(error: Error | null, token: string | null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token!);
      }
    });

    this.failedQueue = [];
  }
}

const authManager = new AuthManager();

axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (
      config.url?.includes("/auth/refresh") ||
      config.url?.includes("/auth/login") ||
      config.url?.includes("/auth/signup")
    ) {
      return config;
    }
    try {
      const token = await authManager.getValidToken();
      config.headers.Authorization = `Bearer ${token}`;
    } catch {
      // If we can't get a valid token, let the request proceed without auth
      // The response interceptor will handle the 401 error
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await authManager.refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        authManager.clearTokens();
        window.location.href = "/authentification";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export { authManager };
export default authManager;
