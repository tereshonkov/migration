"use client";
import styles from "./Popap.module.css";
import { FaTags, FaGift } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { sendMessageApi } from "@/api/messages";
import { reportConversion } from "@/utils/gtagConversion";
import { registerConversion } from "@/api/conversion";

interface InputState {
  name: string;
  phone: string;
}

export default function Popap() {
  const t = useTranslations("popap");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toastIdRef = useRef<string | null>(null);
  const [input, setInput] = useState<InputState>({
    name: "",
    phone: "",
  });
  const sendMessage = async () => {
    const data = {
      message: `Сообщение с сайта: Имя: ${input.name}; Телефон: ${input.phone}; Сообщение: скидка 10%`,
    };

    await toast.promise(
      fetch("https://t-mebel.onrender.com/telegram/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
      {
        loading: "Отправка сообщения...",
        success: "Сообщение отправлено!",
        error: "Ошибка при отправке",
      }
    );
  };
  useEffect(() => {
    if (sessionStorage.getItem("popapShown")) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrolled / height) * 100;

      if (scrollPercentage >= 50 && !toastIdRef.current) {
        const id = toast.custom((toastProps) => (
          <div className={`${styles.toast} ${toastProps.visible ? styles.toastShow : styles.toastHide}`}>
            <div className={styles.toastText}>
              <FaGift className={styles.iconGift} />
              <div>
                <p>{t("title")}</p>
                <p>{t("description")}</p>
              </div>
            </div>
            <div className={styles.toastActions}>
              <button
                className={styles.button}
                onClick={() => {
                  setIsOpen(true);
                  sessionStorage.setItem("popapShown", "true");
                  if (toastIdRef.current) toast.dismiss(toastIdRef.current);
                }}
              >
                {t("btn")}
              </button>
              <button
                className={styles.toastClose}
                onClick={() => {
                  sessionStorage.setItem("popapShown", "true");
                  if (toastIdRef.current) toast.dismiss(toastIdRef.current);
                }}
              >
                <IoCloseCircleOutline size={24} />
              </button>
            </div>
          </div>
        ), { duration: Infinity });
        toastIdRef.current = id as string;
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [t]);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerConversion();
    await sendMessage();
    await sendMessageApi({name: input.name, phone: input.phone, message: "скидка 10%"});
    reportConversion();
    console.log(input);
    setInput({ name: "", phone: "" });
    setIsOpen(false);
  }
  if (!isOpen) return null;
  return (
    <div className={styles.wrapper}>
      <div className={styles.popapWrapper}>
        <IoCloseCircleOutline
          onClick={() => setIsOpen((prev) => !prev)}
          className={styles.close}
          size={32}
        />
        <div className={styles.header}>
          <FaGift className={styles.iconGift} />
          <h2 className={styles.heading}>{t("title")}</h2>
          <h3 className={styles.heading}>{t("description")}</h3>
        </div>
        <div className={styles.body}>
          <p className={styles.text}>{t("text")}</p>
          <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.inputsWrapper}>
              <input
                value={input.name}
                onChange={(e) => setInput({ ...input, name: e.target.value })}
                type="text"
                placeholder={t("name")}
                className={styles.input}
                required
              />
              <input
                value={input.phone}
                onChange={(e) => setInput({ ...input, phone: e.target.value })}
                type="text"
                placeholder={t("phone")}
                className={styles.input}
                required
              />
            </div>
            <button type="submit" className={styles.button}>
              {t("btn")}
            </button>
          </form>
        </div>
        <FaTags className={styles.iconBgLeft} />
        <FaTags className={styles.iconBgRight} />
      </div>
    </div>
  );
}
