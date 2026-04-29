"use client";

import Image from "next/image";
import PopupForm from "../popup-form/PopupForm";
import styles from "./CtaBlock.module.css";
import { useTranslations } from "next-intl";

const CTA_IMAGE =
  "https://storage.googleapis.com/t-mebel/Image/ourPage/modal/kitchen/4/tablet.webp";

export default function CtaBlock() {
  const t = useTranslations("ctaBlock");

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.image}>
          <Image
            src={CTA_IMAGE}
            alt="кухня мдф крашеный глянцевый"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.photo}
          />
        </div>
        <div className={styles.content}>
          <h2>{t("title")}</h2>
          <p>{t("description")}</p>
          <PopupForm
            triggerClassName={styles.ctaButton}
            triggerLabel={t("button")}
          />
        </div>
      </div>
    </section>
  );
}
