"use client";

import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { login } from "@/features/auth/api/auth";

export interface SignInFormValue {
  email: string;
  password: string;
}

export function useSignIn() {
  const router = useRouter();

  const [value, setValue] = useState<SignInFormValue>({
    email: "",
    password: "",
  });

  const onSubmit = useCallback(async (): Promise<void> => {
    try {
      const token = await toast.promise(login(value.email, value.password), {
        loading: "Идет соединение...",
        success: "Вход разрешен!",
        error: (err: unknown) => `Ошибка при входе: ${(err as Error).message}`,
      });

      localStorage.removeItem("savedEmail");
      localStorage.removeItem("savedPassword");
      localStorage.removeItem("rememberMe");
      localStorage.setItem("token", token);
      router.push("/admin");
    } catch (error: unknown) {
      console.error("Error:", error);
      toast.error((error as Error)?.message || "Ошибка входа");
    }
  }, [router, value.email, value.password]);

  return {
    value,
    setValue,
    onSubmit,
  };
}
