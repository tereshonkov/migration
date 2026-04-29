import styles from "./Hero.module.css";
import Header from "../header/Header";
import { Link } from "@/i18n/navigation";
import HeroCarusel from "./HeroCarusel";
import { getTranslations } from "next-intl/server";
import PopupForm from "../popup-form/PopupForm";

export default async function Hero({
  startIndex = 0,
  home,
  page,
}: {
  startIndex?: number;
  home?: boolean;
  page?: boolean;
}) {
  const t = await getTranslations("hero");
  const form = await getTranslations("form");
  return (
    <header
      className={styles.wrapper}
      style={page ? { minHeight: "50vh" } : { minHeight: "100vh" }}
    >
      <Header />
      <HeroCarusel initialIndex={startIndex} />
      {home && (
        <div className={styles.wrapperContent}>
          <div className={styles.banner}>
            <div className={styles.banerWrapper}>
              <div className={styles.bannerText}>
                <h1>{t("title")}</h1>
                <p>{t("subtitle")}</p>
              </div>
              <div className={styles.bannerButton}>
                <PopupForm
                  triggerLabel={t("button")}
                  triggerClassName={styles.btn}
                  useDefaultTriggerStyles={false}
                />
                <Link href="/service" className={styles.btnSecond}>
                  {t("buttonTwo")}
                </Link>
              </div>
            </div>
          </div>
          <h2 className={styles.title}>
            {t("header")} <span>{t("bold")}</span>
          </h2>
        </div>
      )}
      {!home && (
        <div className={styles.numberWrapper}>
          <h3 className={styles.number}>067 - 149 - 67 - 41</h3>
          <Link href="tel:0671496741" className={styles.btnCaller}>
            {form("btn")}
          </Link>
        </div>
      )}
    </header>
  );
}
