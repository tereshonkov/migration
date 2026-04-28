"use client";

import styles from "./Form.module.css";
import { useTranslations } from "next-intl";
import PopupForm from "@/widgets/popup-form/PopupForm";

export default function Form() {
  const t = useTranslations("form");
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            {t('titleRegular')} <span>{t('titleBold')}</span>{t('titleRegularTwo')}<span>{t('titleBoldTwo')}</span>
          </h2>
          <p className={styles.subtitle}>
            {t('subtitle')}
          </p>
        </div>
        <div className={styles.buttonWrapper}>
          <PopupForm 
            triggerLabel={t('ctaButton')}
            useDefaultTriggerStyles={false}
            triggerClassName={styles.ctaButton}
          />
          <p className={styles.note}>
            {t('note')}
          </p>
        </div>
      </div>
    </section>
  );
}
