import styles from "./Footer.module.css";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function Footer() {
  const t = await getTranslations("footer");
  return (
    <footer className={styles.wrapper}>
      <div className={styles.logoFooter}>
        <div className={styles.logo}>
          <Image
            width={60}
            height={60}
            src="/logo.png"
            alt="T-Mebel — меблі на замовлення Харків"
          />
        </div>
        <p>{t("title")}</p>
      </div>
      <div className={styles.socialWrapper}>
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
        <p>{t("subtitle")}</p>
      </div>
    </footer>
  );
}
