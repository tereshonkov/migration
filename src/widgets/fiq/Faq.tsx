import styles from "./Faq.module.css";
import Accordion from "./Accordion";
import { JsonLd } from "@/shared/ui/JsonLd/JsonLd";
import { getTranslations } from "next-intl/server";

export default async function Faq() {
  const t = await getTranslations("faq");

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ([1, 2, 3, 4, 5, 6] as const).map((n) => ({
      "@type": "Question" as const,
      name: t(`question${n}`),
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: t(`answer${n}`),
      },
    })),
  };

  return (
    <div className={styles.wrapper}>
      <JsonLd data={faqJsonLd} />
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>
          {t("title")} <span>{t("titleBold")}</span>
        </h2>
        <p>{t("subtitle")}</p>
      </div>
      <Accordion />
    </div>
  );
}
