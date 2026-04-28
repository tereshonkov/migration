"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { login } from "@/features/auth/api/auth";
import styles from "./page.module.css";

interface LoginFormProps {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [value, setValue] = useState<LoginFormProps>({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // Загрузка сохраненных данных при монтировании
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    const savedRemember = localStorage.getItem("rememberMe") === "true";

    if (savedRemember && savedEmail) {
      setValue({
        email: savedEmail,
        password: savedPassword || "",
      });
      setRememberMe(true);
    }
  }, []);

  const onSubmit = async (): Promise<void> => {
    try {
      const token = await toast.promise(login(value.email, value.password), {
        loading: "Идет соединение...",
        success: "Вход разрешен!",
        error: (err: unknown) => `Ошибка при входе: ${(err as Error).message}`,
      });
      
      // Сохранение данных если включен "Запомнить меня"
      if (rememberMe) {
        localStorage.setItem("savedEmail", value.email);
        localStorage.setItem("savedPassword", value.password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("savedEmail");
        localStorage.removeItem("savedPassword");
        localStorage.removeItem("rememberMe");
      }
      
      localStorage.setItem("token", token);
      router.push("/admin");
    } catch (error: unknown) {
      console.error("Error:", error);
      toast.error((error as Error)?.message || "Ошибка входа");
    }
  };

  // const reg = async (): Promise<void> => {
  //   try {
  //     await toast.promise(
  //       (async () => {
  //         const res = await fetch("https://t-mebel.onrender.com/auth/register", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             name: "Дмитрий",
  //             email: "tereshonkov.dima@gmail.com",
  //             password: "682747Ljv",
  //             role: "ADMIN",
  //           }),
  //         });

  //         if (!res.ok) {
  //           const errorData = await res.json().catch(() => ({}));
  //           throw new Error(errorData.message || `Ошибка ${res.status}`);
  //         }

  //         return res.json();
  //       })(),
  //       {
  //         loading: "Идет соединение...",
  //         success: "Регистрация прошла успешно!",
  //         error: (err: unknown) =>
  //           `Ошибка при регистрации: ${(err as Error).message}`,
  //       }
  //     );
  //   } catch (error: unknown) {
  //     console.error("Error:", error);
  //     toast.error((error as Error)?.message || "Ошибка регистрации");
  //   }
  // }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Вход в панель управления</h1>
          <p className={styles.subtitle}>Введите свои данные для доступа</p>
        </div>
        
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={styles.input}
              value={value.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={styles.input}
              value={value.password}
              onChange={(e) => setValue({ ...value, password: e.target.value })}
              placeholder="••••••••"
              required
            />
          </div>

          <div className={styles.checkboxGroup}>
            <input
              id="rememberMe"
              type="checkbox"
              className={styles.checkbox}
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe" className={styles.checkboxLabel}>
              Запомнить меня
            </label>
          </div>

          <button type="submit" className={styles.button}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
