"use client";

import { useTranslations } from "next-intl";
import styles from "../ProductGallery.module.css";

type ProductGalleryStatusProps = {
  variant: "loading" | "error";
};

export function ProductGalleryStatus({ variant }: ProductGalleryStatusProps) {
  const t = useTranslations("productGallery");
  const message = variant === "error" ? t("loadError") : t("loading");

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.loading}>{message}</div>
      </div>
    </section>
  );
}
