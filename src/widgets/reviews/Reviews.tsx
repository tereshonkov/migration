import styles from "./Reviews.module.css";
import { getTranslations } from "next-intl/server";
import ReviewsBody from "./ReviewsBody";

export default async function Reviews() {
  const t = await getTranslations("reviews");

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t("title")}</h2>
      </div>
      <ReviewsBody />
    </section>
  );
}
