"use client";

import styles from "../ContactForm.module.css";
import { Link } from "@/i18n/navigation";
import type { ContactFormViewModel } from "../model/useContactForm";

type ContactFormFieldsProps = ContactFormViewModel;

export function ContactFormFields({
  t,
  formData,
  focused,
  handleChange,
  handleFocus,
  handleBlur,
  handleSubmit,
}: ContactFormFieldsProps) {
  return (
    <div className={styles.formSection}>
      <div className={styles.formContent}>
        <h2 className={styles.title}>{t("title")}</h2>
        <p className={styles.subtitle}>{t("subtitle")}</p>

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
                focused.message || formData.message ? styles.labelActive : ""
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
  );
}
