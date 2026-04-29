"use client";

import type { ReactNode } from "react";
import styles from "../ContactTabs.module.css";
import type { TabKey } from "../model/types";

type ContactTabPanelProps = {
  tabKey: TabKey;
  isActive: boolean;
  icon: ReactNode;
  children: ReactNode;
};

export function ContactTabPanel({
  tabKey,
  isActive,
  icon,
  children,
}: ContactTabPanelProps) {
  return (
    <div
      id={`contact-panel-${tabKey}`}
      role="tabpanel"
      aria-labelledby={`contact-tab-${tabKey}`}
      className={`${styles.infoCard} ${isActive ? styles.infoCardVisible : ""}`}
    >
      <div className={styles.iconWrapper}>{icon}</div>
      <div className={styles.infoContent}>{children}</div>
    </div>
  );
}
