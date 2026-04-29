"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { reportConversion } from "@/utils/gtagConversion";
import { registerConversion } from "@/entities/services/conversion";
import { useSendContactMessageMutation } from "@/entities/services/lib/use-contact-messages";
import { useScrollPopupTrigger } from "./use-scroll-popup-trigger";

const DISCOUNT_MESSAGE = "скидка 10%";

export type PopapInputState = {
  name: string;
  phone: string;
};

export function usePopap() {
  const t = useTranslations("popap");
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState<PopapInputState>({
    name: "",
    phone: "",
  });

  const openPopup = useCallback(() => setIsOpen(true), []);
  useScrollPopupTrigger({ onOfferClick: openPopup });

  const sendMessageMutation = useSendContactMessageMutation();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await toast.promise(
      (async () => {
        await registerConversion();
        await sendMessageMutation.mutateAsync({
          name: input.name,
          phone: input.phone,
          message: DISCOUNT_MESSAGE,
        });
        reportConversion();
      })(),
      {
        loading: "Отправка сообщения...",
        success: "Сообщение отправлено!",
        error: "Ошибка при отправке",
      }
    );
    setInput({ name: "", phone: "" });
    setIsOpen(false);
  };

  return {
    t,
    isOpen,
    setIsOpen,
    input,
    setInput,
    onSubmit,
    isSubmitPending: sendMessageMutation.isPending,
  };
}
