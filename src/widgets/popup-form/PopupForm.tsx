'use client';

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import styles from './PopupForm.module.css';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { reportConversion } from '@/utils/gtagConversion';
import { registerConversion } from "@/entities/services/conversion";

interface PopupFormProps {
  triggerLabel?: string;
  triggerClassName?: string;
  useDefaultTriggerStyles?: boolean;
}

export default function PopupForm({
  triggerLabel,
  triggerClassName,
  useDefaultTriggerStyles = true,
}: PopupFormProps) {
  const t = useTranslations('popupForm');
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const postClick = async () => {
    try {
      const response = await fetch(
        "https://t-mebel.onrender.com/callclick/record",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

    const sendMessage = async () => {
    const data = {
      message: `Сообщение с сайта: Имя: ${formData.name}; Телефон: ${formData.phone}; Сообщение: Новая заявка!!!`,
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

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const closeForm = () => setIsOpen(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerConversion();
    sendMessage();
    postClick();
    reportConversion();
    setIsOpen(false);
    setFormData({ name: '', phone: '' });
  };

  const triggerClasses = [
    useDefaultTriggerStyles ? styles.triggerButton : null,
    triggerClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const modalContent = isOpen && mounted ? (
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
          onClick={closeForm}
          aria-label={t('closeButton')}
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <div className={styles.header}>
          <p className={styles.pill}>{t('pill')}</p>
          <h3 id="popup-form-title">{t('formTitle')}</h3>
          <p className={styles.subtitle}>
            {t('formSubtitle')}
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>{t('nameLabel')}</span>
            <input
              name="name"
              type="text"
              placeholder={t('namePlaceholder')}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label className={styles.field}>
            <span>{t('phoneLabel')}</span>
            <input
              name="phone"
              type="tel"
              placeholder={t('phonePlaceholder')}
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className={styles.submitButton}>
            {t('submitButton')}
          </button>
          <p className={styles.note}>
            {t('note')}
          </p>
        </form>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        className={triggerClasses}
        onClick={() => setIsOpen(true)}
      >
        {triggerLabel || t('triggerButton')}
      </button>

      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}
