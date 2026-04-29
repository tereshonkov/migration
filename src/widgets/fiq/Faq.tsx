import styles from "./Faq.module.css";
import Accordion from "./Accordion";
import { getTranslations } from "next-intl/server";

export default async function Faq() {
  const t = await getTranslations("faq");
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>
          {t("title")} <span>{t("titleBold")}</span>
        </h2>
        <p>{t("subtitle")}</p>
      </div>
      <Accordion />
    </div>
  );
}
