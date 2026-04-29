"use client";

import styles from "./ContactForm.module.css";
import { useContactForm } from "./model/useContactForm";
import { ContactFormFields } from "./ui/ContactFormFields";
import { ContactFormSideImage } from "./ui/ContactFormSideImage";

export default function ContactForm() {
  const vm = useContactForm();

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <ContactFormFields {...vm} />
        <ContactFormSideImage
          imageAlt="Меблі на замовлення"
          badgeYears={vm.t("badgeYears")}
          badgeExperience={vm.t("badgeExperience")}
        />
      </div>
    </section>
  );
}
