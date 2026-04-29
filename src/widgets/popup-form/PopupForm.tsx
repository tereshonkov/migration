"use client";

import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { usePopupForm } from "./model/usePopupForm";
import { PopupFormModal } from "./ui/PopupFormModal";

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
  const t = useTranslations("popupForm");
  const {
    mounted,
    isOpen,
    openForm,
    closeForm,
    formData,
    handleChange,
    handleSubmit,
    triggerClasses,
  } = usePopupForm({ useDefaultTriggerStyles, triggerClassName });

  return (
    <>
      <button
        type="button"
        className={triggerClasses}
        onClick={openForm}
      >
        {triggerLabel || t("triggerButton")}
      </button>

      {mounted &&
        isOpen &&
        createPortal(
          <PopupFormModal
            onClose={closeForm}
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />,
          document.body
        )}
    </>
  );
}
