"use client";

import styles from "./Faq.module.css";
import { useFaqAccordion } from "./model/useFaqAccordion";

export default function Accordion() {
  const { isOpen, toggleAccordion, faqData } = useFaqAccordion();

  return (
    <ul className={styles.accWrapper}>
      {faqData.map((elem, index) => {
        const expanded = index === isOpen;
        const panelId = `faq-panel-${index}`;
        const triggerId = `faq-trigger-${index}`;
        return (
          <li key={index} className={styles.accItem}>
            <h3 className={styles.itemQHeading}>
              <button
                type="button"
                id={triggerId}
                className={`${styles.itemQ} ${expanded ? styles.open : ""}`}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggleAccordion(index)}
              >
                {elem.question}
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`${styles.collapse} ${expanded ? styles.open : ""}`}
            >
              <div className={styles.answer}>{elem.answer}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
