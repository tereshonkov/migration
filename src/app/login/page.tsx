"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Загрузка сохраненного email при монтировании
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedRemember = localStorage.getItem("rememberMe") === "true";

    if (savedRemember && savedEmail) {
      setValue({
        email: savedEmail,
        password: "", // Пароль не сохраняем из соображений безопасности
      });
      setRememberMe(true);
    }
  }, []);

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await toast.promise(
        signIn("credentials", {
          email: value.email,
          password: value.password,
          redirect: false, // Не перенаправлять автоматически
        }),
        {
          loading: "Идет аутентификация...",
          success: "Вход выполнен успешно!",
          error: (err: unknown) => `Ошибка входа: ${(err as Error).message}`,
        }
      );

      if (result?.error) {
        throw new Error(result.error);
      }

      // Сохранение email если включен "Запомнить меня"
      if (rememberMe) {
        localStorage.setItem("savedEmail", value.email);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("savedEmail");
        localStorage.removeItem("rememberMe");
      }

      // Перенаправление на админку после успешного входа
      router.push("/admin");
      router.refresh(); // Обновление данных сессии на клиенте

    } catch (error: unknown) {
      console.error("Error:", error);
      toast.error((error as Error)?.message || "Ошибка входа");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Вход в панель управления</h1>
          <p className={styles.subtitle}>Введите свои данные для доступа</p>
        </div>
        
        <form
          className={styles.form}
          onSubmit={onSubmit}
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>

          <div className={styles.checkboxGroup}>
            <input
              id="rememberMe"
              type="checkbox"
              className={styles.checkbox}
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
            />
            <label htmlFor="rememberMe" className={styles.checkboxLabel}>
              Запомнить меня (сохранит email)
            </label>
          </div>

          <button 
            type="submit" 
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? "Вход..." : "Войти"}
          </button>
        </form>

        <div className={styles.note}>
          <p className={styles.noteText}>
            <strong>Примечание:</strong> Используется новая система аутентификации.
            Если у вас нет аккаунта, обратитесь к администратору.
          </p>
        </div>
      </div>
    </div>
  );
}