"use client";

import { MdApartment } from "react-icons/md";
import { PiHouseLineFill } from "react-icons/pi";
import { FaPenRuler } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import styles from "./WhyYou.module.css";
import PopupForm from "../popup-form/PopupForm";
import { useTranslations } from "next-intl";

export default function WhyYou() {
  const t = useTranslations("whyYou");
  
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{t("title")}</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <MdApartment size={60} className={styles.icon} />
          <div className={styles.content}>
            <h3>{t("apartmentTitle")}</h3>
            <p>{t("apartmentDesc")}</p>
          </div>
        </div>
        <div className={styles.card}>
          <PiHouseLineFill size={60} className={styles.icon} />
          <div className={styles.content}>
            <h3>{t("houseTitle")}</h3>
            <p>{t("houseDesc")}</p>
          </div>
        </div>
        <div className={styles.card}>
          <FaPenRuler size={60} className={styles.icon} />
          <div className={styles.content}>
            <h3>{t("resultTitle")}</h3>
            <p>{t("resultDesc")}</p>
          </div>
        </div>
        <div className={styles.card}>
          <GiProgression size={60} className={styles.icon} />
          <div className={styles.content}>
            <h3>{t("processTitle")}</h3>
            <p>{t("processDesc")}</p>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.noteWrapper}>
          <p className={styles.note}>
            {t("note")}
          </p>
          <PopupForm 
            triggerLabel={t("ctaButton")}
            useDefaultTriggerStyles={false}
            triggerClassName={styles.ctaButton}
          />
        </div>
      </div>
    </section>
  );
}
