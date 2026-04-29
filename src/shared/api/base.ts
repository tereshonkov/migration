"use client";

import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { getPublicApiBaseUrl } from "@/shared/lib/public-api-base-url";

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

const resolvedBaseUrl = getPublicApiBaseUrl();

if (process.env.NODE_ENV === "development" && !resolvedBaseUrl) {
  console.warn(
    "[api] NEXT_PUBLIC_API_BASE_URL is empty. Copy .env.example to .env or .env.local.",
  );
}

const api = axios.create({
  baseURL: resolvedBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Dynamic import avoids circular dependency (auth imports this module).
      const { refreshToken } = await import("@/features/auth/api/auth");
      const newToken = await refreshToken();
      if (newToken && typeof window !== "undefined") {
        localStorage.setItem("token", newToken);
        originalRequest.headers!["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
