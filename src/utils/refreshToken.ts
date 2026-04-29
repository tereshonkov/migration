"use client";

import { getPublicApiBaseUrl } from "@/shared/lib/public-api-base-url";

export const getToken = async (): Promise<string | null> => {
  let token = localStorage.getItem("token");

  if (!token) return null;

  const baseUrl = getPublicApiBaseUrl();
  if (!baseUrl) {
    console.error("[api] NEXT_PUBLIC_API_BASE_URL is required for token refresh");
    return null;
  }

  try {
    const refreshRes = await fetch(`${baseUrl}/auth/refresh`, {
      method: "GET",
      credentials: "include", // чтобы кука с refresh токеном ушла
    });

    if (refreshRes.ok) {
      const newToken = await refreshRes.text();
      localStorage.setItem("token", newToken);
      token = newToken;
    }

    return token;
  } catch (error) {
    console.error("Ошибка обновления токена:", error);
    return null;
  }
};
