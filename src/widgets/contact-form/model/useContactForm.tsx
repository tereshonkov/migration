"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-hot-toast";
import { reportConversion } from "@/utils/gtagConversion";
import { registerConversion } from "@/entities/services/conversion";
import { useSendTelegramMessageMutation } from "@/entities/services/lib/use-telegram-message";

type FormData = {
  name: string;
  phone: string;
  message: string;
};

type FocusState = Record<keyof FormData, boolean>;

export function useContactForm() {
  const t = useTranslations("contactForm");
  const sendTelegramMutation = useSendTelegramMessageMutation();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    message: "",
  });

  const [focused, setFocused] = useState<FocusState>({
    name: false,
    phone: false,
    message: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field: keyof FormData) => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: keyof FormData) => {
    if (!formData[field]) {
      setFocused((prev) => ({ ...prev, [field]: false }));
    }
  };

  const sendMessage = () => {
    const message = `Сообщение с сайта: Имя: ${formData.name}; Телефон: ${formData.phone}; Сообщение: ${formData.message || "Нет сообщения"}`;

    return toast.promise(sendTelegramMutation.mutateAsync({ message }), {
      loading: t("sending"),
      success: t("success"),
      error: t("error"),
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage();
    await registerConversion();
    reportConversion();
    setFormData({ name: "", phone: "", message: "" });
    setFocused({ name: false, phone: false, message: false });
  };

  return {
    t,
    formData,
    focused,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
  };
}

export type ContactFormViewModel = ReturnType<typeof useContactForm>;
