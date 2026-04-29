"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

export type FaqItem = {
  question: string;
  answer: string;
};

export function useFaqAccordion() {
  const t = useTranslations("faq");
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setIsOpen((prev) => (prev === index ? null : index));
  };

  const faqData: FaqItem[] = useMemo(
    () => [
      { question: t("question1"), answer: t("answer1") },
      { question: t("question2"), answer: t("answer2") },
      { question: t("question3"), answer: t("answer3") },
      { question: t("question4"), answer: t("answer4") },
      { question: t("question5"), answer: t("answer5") },
      { question: t("question6"), answer: t("answer6") },
    ],
    [t]
  );

  return {
    isOpen,
    toggleAccordion,
    faqData,
  };
}
