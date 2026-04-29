"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./ContactTabs.module.css";
import { CONTACT_TAB_DEFS, type TabKey } from "./model/types";
import { ContactTabsList } from "./ui/ContactTabsList";
import { ContactTabPanels } from "./ui/ContactTabPanels";

export default function ContactTabs() {
  const t = useTranslations("contactTabs");
  const [active, setActive] = useState<TabKey>("address");

  const tabItems = useMemo(
    () =>
      CONTACT_TAB_DEFS.map(({ id, labelKey }) => ({
        id,
        label: t(labelKey),
      })),
    [t],
  );

  return (
    <div className={styles.wrapper}>
      <ContactTabsList
        items={tabItems}
        active={active}
        onSelect={setActive}
        regionAriaLabel={t("tabsRegionLabel")}
      />

      <div className={styles.infoSection}>
        <ContactTabPanels active={active} t={t} />
      </div>
    </div>
  );
}
