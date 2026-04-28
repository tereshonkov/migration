"use client";
import { useState } from "react";
import styles from "./Faq.module.css";
import { useTranslations } from "next-intl";

type faqType = {
    question: string;
    answer: string;
};


export default function Accordion() {
  const [isOpen, setIsOpen] = useState<number | null>(null);
    const toggleAccordion = (index: number): void => {
        setIsOpen(isOpen === index ? null : index);
    };

    const t = useTranslations('faq');

    const faqData: faqType[] = [
        {
          question: t('question1'),
          answer: t('answer1'),
        },
        {
          question: t('question2'),
          answer: t('answer2'),
        },
        {
          question: t('question3'),
          answer: t('answer3'),
        },
        {
          question: t('question4'),
          answer: t('answer4'),
        },
        {
          question: t('question5'),
          answer: t('answer5'),
        },
        {
          question: t('question6'),
          answer: t('answer6'),
        },
      ];

  return (
    <ul className={styles.accWrapper}>
        {faqData.map((elem, index) => (
        <li key={index} className={styles.accItem} onClick={() => {toggleAccordion(index)}} style={{cursor: 'pointer'}}>
            <h2 className={`${styles.itemQ} ${index === isOpen ? styles.open : ""}`}>{elem.question}</h2>
            <div className={`${styles.collapse} ${index === isOpen ? styles.open : ""}`}>
            <div className={styles.answer}>{elem.answer}</div>
            </div>
        </li>
        ))}
    </ul>
  );
}
