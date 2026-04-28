"use client";

import styles from "./TrustMe.module.css";
import { FaCalculator } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
import { MdOutlineControlCamera } from "react-icons/md";
import { FaHandshakeAngle } from "react-icons/fa6";
import { useTranslations } from "next-intl";

export default function TrustMe() {
  const t = useTranslations("trustMe");
  
  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <FaCalculator className={styles.icon} size={60} />
        <div className={styles.content}>
          <h3>{t("calculationTitle")}</h3>
          <p>{t("calculationDesc")}</p>
        </div>
      </div>
      <div className={styles.card}>
        <GoProjectRoadmap className={styles.icon} size={60} />
        <div className={styles.content}>
          <h3>{t("projectTitle")}</h3>
          <p>{t("projectDesc")}</p>
        </div>
      </div>
      <div className={styles.card}>
        <MdOutlineControlCamera className={styles.icon} size={60} />
        <div className={styles.content}>
          <h3>{t("controlTitle")}</h3>
          <p>{t("controlDesc")}</p>
        </div>
      </div>
      <div className={styles.card}>
        <FaHandshakeAngle className={styles.icon} size={60} />
        <div className={styles.content}>
          <h3>{t("responsibilityTitle")}</h3>
          <p>{t("responsibilityDesc")}</p>
        </div>
      </div>
    </section>
  );
}
