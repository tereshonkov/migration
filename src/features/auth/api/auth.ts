import api from "@/shared/api/base";

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post(
      `/auth/login`,
      {
        email,
        password,
      },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error((error as Error)?.message || "Ошибка входа");
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.get(`/auth/refresh`, {
      withCredentials: true,
    });
    return response.data.accessToken;
  } catch (error) {
    console.error("Error:", error);
    throw new Error((error as Error)?.message || "Ошибка обновления токена");
  }
};

export const logout = async () => {
  try {
    const response = await api.post(
      `/auth/logout`,
      {},
      { withCredentials: true },
    );
    localStorage.clear();
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error((error as Error)?.message || "Ошибка выхода");
  }
};
