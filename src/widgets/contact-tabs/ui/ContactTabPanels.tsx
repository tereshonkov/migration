"use client";

import Link from "next/link";
import styles from "../ContactTabs.module.css";
import { PHONE_E164, type TabKey } from "../model/types";
import { ContactTabPanel } from "./ContactTabPanel";
import {
  IconChat,
  IconFacebook,
  IconInstagram,
  IconMapPin,
  IconPhone,
  IconTelegram,
} from "./ContactIcons";

type Translate = (key: string) => string;

type ContactTabPanelsProps = {
  active: TabKey;
  t: Translate;
};

export function ContactTabPanels({ active, t }: ContactTabPanelsProps) {
  return (
    <>
      <ContactTabPanel
        tabKey="address"
        isActive={active === "address"}
        icon={<IconMapPin />}
      >
        <h3 className={styles.infoTitle}>{t("addressHeading")}</h3>
        <p className={styles.infoText}>{t("addressLine")}</p>
      </ContactTabPanel>

      <ContactTabPanel
        tabKey="phone"
        isActive={active === "phone"}
        icon={<IconPhone />}
      >
        <h3 className={styles.infoTitle}>{t("phoneHeading")}</h3>
        <a href={`tel:${PHONE_E164}`} className={styles.phoneLink}>
          {t("phoneDisplay")}
        </a>
      </ContactTabPanel>

      <ContactTabPanel
        tabKey="social"
        isActive={active === "social"}
        icon={<IconChat />}
      >
        <h3 className={styles.infoTitle}>{t("socialHeading")}</h3>
        <div className={styles.socialLinks}>
          <Link
            href="https://www.instagram.com/tereshonkov.alexander/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={t("ariaInstagram")}
          >
            <IconInstagram />
          </Link>
          <Link
            href="https://t.me/+380980276709"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={t("ariaTelegram")}
          >
            <IconTelegram />
          </Link>
          <Link
            href="https://www.facebook.com/tmebelsite?locale=ru_RU"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={t("ariaFacebook")}
          >
            <IconFacebook />
          </Link>
        </div>
      </ContactTabPanel>
    </>
  );
}
