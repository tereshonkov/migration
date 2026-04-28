"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";
import { useTranslations } from "next-intl";
import { toast } from "react-hot-toast";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { reportConversion } from "@/utils/gtagConversion";
import { registerConversion } from "@/entities/services/conversion";

const CONTACT_SIDE_IMAGE =
  "https://storage.googleapis.com/t-mebel/Image/ourPage/modal/kitchen/5384567338008963271.webp";

export default function ContactForm() {
  const t = useTranslations("contactForm");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [focused, setFocused] = useState({
    name: false,
    phone: false,
    message: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field: string) => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    if (!formData[field as keyof typeof formData]) {
      setFocused((prev) => ({ ...prev, [field]: false }));
    }
  };

  const sendMessage = async () => {
    const data = {
      message: `Сообщение с сайта: Имя: ${formData.name}; Телефон: ${formData.phone}; Сообщение: ${formData.message || 'Нет сообщения'}`,
    };

    await toast.promise(
      fetch("https://t-mebel.onrender.com/telegram/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
      {
        loading: t('sending'),
        success: t('success'),
        error: t('error'),
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage();
    await registerConversion();
    reportConversion();
    setFormData({ name: "", phone: "", message: "" });
    setFocused({ name: false, phone: false, message: false });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.formSection}>
          <div className={styles.formContent}>
            <h2 className={styles.title}>{t("title")}</h2>
            <p className={styles.subtitle}>
              {t("subtitle")}
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={() => handleBlur("name")}
                  className={styles.input}
                  required
                />
                <label
                  htmlFor="name"
                  className={`${styles.label} ${
                    focused.name || formData.name ? styles.labelActive : ""
                  }`}
                >
                  {t("nameLabel")}
                </label>
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => handleFocus("phone")}
                  onBlur={() => handleBlur("phone")}
                  className={styles.input}
                  required
                />
                <label
                  htmlFor="phone"
                  className={`${styles.label} ${
                    focused.phone || formData.phone ? styles.labelActive : ""
                  }`}
                >
                  {t("phoneLabel")}
                </label>
              </div>

              <div className={styles.inputGroup}>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus("message")}
                  onBlur={() => handleBlur("message")}
                  className={`${styles.input} ${styles.textarea}`}
                  rows={4}
                />
                <label
                  htmlFor="message"
                  className={`${styles.label} ${
                    focused.message || formData.message
                      ? styles.labelActive
                      : ""
                  }`}
                >
                  {t("messageLabel")}
                </label>
              </div>

              <button type="submit" className={styles.submitButton}>
                {t("submitButton")}
              </button>

              <p className={styles.privacy}>
                {t("privacy")}{" "}
                <Link href="/privacy-policy">{t("privacyLink")}</Link>
              </p>
            </form>
          </div>
        </div>

        <div className={styles.imageSection}>
          <Image
            src={CONTACT_SIDE_IMAGE}
            alt="Меблі на замовлення"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.image}
          />
          <div className={styles.imageOverlay}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>✓</span>
              <div className={styles.badgeText}>
                <strong>{t("badgeYears")}</strong>
                <span>{t("badgeExperience")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
