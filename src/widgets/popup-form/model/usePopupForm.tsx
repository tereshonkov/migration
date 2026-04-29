"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";
import { reportConversion } from "@/utils/gtagConversion";
import { useRegisterConversionMutation } from "@/entities/services/lib/use-conversion";
import { useSendTelegramMessageMutation } from "@/entities/services/lib/use-telegram-message";
import styles from "../PopupForm.module.css";

type UsePopupFormOptions = {
  useDefaultTriggerStyles?: boolean;
  triggerClassName?: string;
};

export function usePopupForm({
  useDefaultTriggerStyles = true,
  triggerClassName,
}: UsePopupFormOptions) {
  const t = useTranslations("popupForm");
  const registerConversionMutation = useRegisterConversionMutation();
  const sendTelegramMutation = useSendTelegramMessageMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeForm = () => setIsOpen(false);
  const openForm = () => setIsOpen(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = `Сообщение с сайта: Имя: ${formData.name}; Телефон: ${formData.phone}; Сообщение: Новая заявка!!!`;

    void toast.promise(sendTelegramMutation.mutateAsync({ message }), {
      loading: t("sending"),
      success: t("success"),
      error: t("error"),
    });

    registerConversionMutation.mutate(undefined, {
      onError: (err) => console.error(err),
    });
    reportConversion();
    setIsOpen(false);
    setFormData({ name: "", phone: "" });
  };

  const triggerClasses = [
    useDefaultTriggerStyles ? styles.triggerButton : null,
    triggerClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    mounted,
    isOpen,
    openForm,
    closeForm,
    formData,
    handleChange,
    handleSubmit,
    triggerClasses,
  };
}
