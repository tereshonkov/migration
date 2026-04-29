"use client";

import { useCallback, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { FaGift } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import styles from "../Popap.module.css";

type UseScrollPopupTriggerOptions = {
  onOfferClick: () => void;
};

export function useScrollPopupTrigger({
  onOfferClick,
}: UseScrollPopupTriggerOptions) {
  const t = useTranslations("popap");
  const toastIdRef = useRef<string | null>(null);

  const dismissInvitationToast = useCallback(() => {
    if (!toastIdRef.current) return;
    toast.dismiss(toastIdRef.current);
    toastIdRef.current = null;
  }, []);

  useEffect(() => {
    if (typeof sessionStorage === "undefined") return;
    if (sessionStorage.getItem("popapShown")) return;

    const handleScroll = () => {
      if (toastIdRef.current) return;

      const scrolled = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;
      if (height <= 0) return;

      const scrollPercentage = (scrolled / height) * 100;
      if (scrollPercentage < 50) return;

      const id = toast.custom(
        (toastProps) => (
          <div
            className={`${styles.toast} ${toastProps.visible ? styles.toastShow : styles.toastHide}`}
          >
            <div className={styles.toastText}>
              <FaGift className={styles.iconGift} />
              <div>
                <p>{t("title")}</p>
                <p>{t("description")}</p>
              </div>
            </div>
            <div className={styles.toastActions}>
              <button
                type="button"
                className={styles.button}
                onClick={() => {
                  sessionStorage.setItem("popapShown", "true");
                  onOfferClick();
                  dismissInvitationToast();
                }}
              >
                {t("btn")}
              </button>
              <button
                type="button"
                className={styles.toastClose}
                onClick={() => {
                  sessionStorage.setItem("popapShown", "true");
                  dismissInvitationToast();
                }}
              >
                <IoCloseCircleOutline size={24} />
              </button>
            </div>
          </div>
        ),
        { duration: Infinity }
      );

      toastIdRef.current = id as string;
      window.removeEventListener("scroll", handleScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissInvitationToast, onOfferClick, t]);
}
