"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useTranslations } from "next-intl";
import styles from "../PopupForm.module.css";

type PopupFormModalProps = {
  onClose: () => void;
  formData: { name: string; phone: string };
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function PopupFormModal({
  onClose,
  formData,
  onChange,
  onSubmit,
}: PopupFormModalProps) {
  const t = useTranslations("popupForm");

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-form-title"
    >
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label={t("closeButton")}
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <div className={styles.header}>
          <p className={styles.pill}>{t("pill")}</p>
          <h3 id="popup-form-title">{t("formTitle")}</h3>
          <p className={styles.subtitle}>{t("formSubtitle")}</p>
        </div>

        <form className={styles.form} onSubmit={onSubmit}>
          <label className={styles.field}>
            <span>{t("nameLabel")}</span>
            <input
              name="name"
              type="text"
              placeholder={t("namePlaceholder")}
              value={formData.name}
              onChange={onChange}
              required
            />
          </label>

          <label className={styles.field}>
            <span>{t("phoneLabel")}</span>
            <input
              name="phone"
              type="tel"
              placeholder={t("phonePlaceholder")}
              value={formData.phone}
              onChange={onChange}
              required
            />
          </label>

          <button type="submit" className={styles.submitButton}>
            {t("submitButton")}
          </button>
          <p className={styles.note}>{t("note")}</p>
        </form>
      </div>
    </div>
  );
}
