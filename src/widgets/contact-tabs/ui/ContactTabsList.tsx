"use client";

import styles from "../ContactTabs.module.css";
import type { TabKey } from "../model/types";

export type ContactTabItem = {
  id: TabKey;
  label: string;
};

type ContactTabsListProps = {
  items: ContactTabItem[];
  active: TabKey;
  onSelect: (id: TabKey) => void;
  regionAriaLabel: string;
};

export function ContactTabsList({
  items,
  active,
  onSelect,
  regionAriaLabel,
}: ContactTabsListProps) {
  return (
    <ul className={styles.tabList} role="tablist" aria-label={regionAriaLabel}>
      {items.map(({ id, label }) => (
        <li key={id} role="none" className={styles.tabItem}>
          <button
            type="button"
            role="tab"
            id={`contact-tab-${id}`}
            aria-selected={active === id}
            aria-controls={`contact-panel-${id}`}
            className={styles.tab}
            onClick={() => onSelect(id)}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
}
