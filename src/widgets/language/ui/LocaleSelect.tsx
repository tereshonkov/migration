"use client";

import type { Dispatch, SetStateAction } from "react";
import styles from "../Language.module.css";

type LocaleSelectProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  labels: Record<string, string>;
  supportedLocales: readonly string[];
  currentLocale: string;
  onSelectLocale: (locale: string) => void;
};

export function LocaleSelect({
  open,
  setOpen,
  labels,
  supportedLocales,
  currentLocale,
  onSelectLocale,
}: LocaleSelectProps) {
  return (
    <div className={styles.langSelect}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{labels[currentLocale]}</span>
        <span className={styles.chevron} aria-hidden="true">
          ▾
        </span>
      </button>
      {open && (
        <ul className={styles.options} role="listbox">
          {supportedLocales.map((locale) => (
            <li key={locale}>
              <button
                type="button"
                role="option"
                aria-selected={locale === currentLocale}
                className={styles.option}
                onClick={() => onSelectLocale(locale)}
              >
                {labels[locale]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
