"use client";

import styles from "./SignInForm.module.css";
import { useSignIn } from "@/features/auth/lib/use-signin";

export default function SignInForm() {
  const { value, setValue, rememberMe, setRememberMe, onSubmit } = useSignIn();

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
