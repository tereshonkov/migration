"use client";

import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import styles from "./PageHeader.module.css";
import { useTranslations } from "next-intl";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  const router = useRouter();
  const t = useTranslations("pageHeader");

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <button
          onClick={() => router.back()}
          className={styles.backButton}
          aria-label={t("backButton")}
        >
          <IoArrowBack size={20} />
          <span>{t("backButton")}</span>
        </button>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </section>
  );
}
