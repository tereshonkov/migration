"use client";

import styles from "./Faq.module.css";
import { useFaqAccordion } from "./model/useFaqAccordion";

export default function Accordion() {
  const { isOpen, toggleAccordion, faqData } = useFaqAccordion();

  return (
    <ul className={styles.accWrapper}>
      {faqData.map((elem, index) => (
        <li
          key={index}
          className={styles.accItem}
          onClick={() => toggleAccordion(index)}
          style={{ cursor: "pointer" }}
        >
          <h2
            className={`${styles.itemQ} ${index === isOpen ? styles.open : ""}`}
          >
            {elem.question}
          </h2>
          <div
            className={`${styles.collapse} ${index === isOpen ? styles.open : ""}`}
          >
            <div className={styles.answer}>{elem.answer}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
