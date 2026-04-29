import styles from "./ContactsPage.module.css";
import ContactForm from "@/widgets/contact-form/ContactForm";
import { getTranslations } from "next-intl/server";
import PageHeader from "@/widgets/page-title-section/PageHeader";
import Faq from "@/widgets/fiq/Faq";
import ContactTabs from "@/widgets/contact-tabs/ContactTabs";

export default async function ContactsPage({
  subtitle,
}: {
  subtitle?: string;
}) {
  const t = await getTranslations("contactPage");

  return (
    <section className={styles.wrapper}>
      <PageHeader title={t("contactTitle")} subtitle={subtitle} />
      <div className={styles.container}>
        <ContactTabs />
        <div className={styles.formSection}>
          <ContactForm />
        </div>
      </div>
      <Faq />
    </section>
  );
}
