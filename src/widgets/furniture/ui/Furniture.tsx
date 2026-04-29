import styles from "./Furniture.module.css";
import FurnitureClient from "./FurnitureClient";
import { getTranslations } from "next-intl/server";

export default async function Slider({ home }: { home?: boolean }) {
  const t = await getTranslations("furniture");
  return (
    <section id="furniture" className={styles.wrapper}>
      {home && <h2 className={styles.title}>{t("title")}</h2>}
      <FurnitureClient limit={home ? 6 : 20} />
    </section>
  );
}
