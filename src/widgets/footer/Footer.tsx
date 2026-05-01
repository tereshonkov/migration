import styles from "./Footer.module.css";
import Link from "next/link";
import { Link as IntlLink } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function Footer() {
  const t = await getTranslations("footer");
  const locale = await getLocale();
  return (
    <footer className={styles.wrapper}>
      <div className={styles.row}>
        <div className={styles.colLeft}>
          <div className={styles.logoFooter}>
            <div className={styles.logo}>
              <Image
                width={60}
                height={60}
                src="/logo.png"
                alt="T-Mebel — меблі на замовлення Харків"
              />
            </div>
            <p className={styles.tagline}>{t("title")}</p>
          </div>
        </div>
        <div className={styles.colCenter}>
          {locale !== "en" ? (
            <nav aria-label={t("guides")}>
              <IntlLink
                className={styles.guidesLink}
                href="/guides"
                prefetch={false}
              >
                {t("guides")}
              </IntlLink>
            </nav>
          ) : null}
        </div>
        <div className={styles.colRight}>
          <div className={styles.socialStack}>
            <div className={styles.social}>
              <Link
                aria-label="Instagram - связаться с нами"
                className={styles.insta}
                href="https://www.instagram.com/tereshonkov.alexander/"
                target="_blank"
              ></Link>
              <Link
                aria-label="Telegram - связаться с нами"
                className={styles.telega}
                href="https://t.me/+380980276709"
                target="_blank"
              ></Link>
              <Link
                aria-label="Facebook - связаться с нами"
                className={styles.facebook}
                href="https://www.facebook.com/tmebelsite?locale=ru_RU"
                target="_blank"
              ></Link>
            </div>
            <p className={styles.copyright}>{t("subtitle")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
