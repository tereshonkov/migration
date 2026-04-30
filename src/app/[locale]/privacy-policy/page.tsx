import Footer from "@/widgets/footer/Footer";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import styles from "./page.module.css";
import { buildBreadcrumbListJsonLd } from "@/shared/lib/breadcrumbJsonLd";
import { openGraphAlternateLocale } from "@/shared/lib/openGraphLocale";
import { JsonLd } from "@/shared/ui/JsonLd/JsonLd";
import Header from "@/widgets/header/Header";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://t-mebel.com.ua";
  const path = "/privacy-policy";
  const canonical =
    locale === "uk" ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;

  return {
    title: "Політика конфіденційності | T-Mebel",
    description:
      "Дізнайтеся про політику конфіденційності T-Mebel: як ми збираємо, використовуємо та захищаємо ваші персональні дані.",
    openGraph: {
      title: "Політика конфіденційності | T-Mebel",
      description:
        "Дізнайтеся про політику конфіденційності T-Mebel: як ми збираємо, використовуємо та захищаємо ваші персональні дані.",
      url: canonical,
      siteName: "T-Mebel",
      locale: openGraphAlternateLocale(locale),
      images: [
        { url: "/og-image.jpg", width: 1200, height: 630, alt: "T-Mebel" },
      ],
      type: "website",
    },
    alternates: {
      canonical,
      languages: {
        uk: `${baseUrl}${path}`,
        en: `${baseUrl}/en${path}`,
        ru: `${baseUrl}/ru${path}`,
        "x-default": `${baseUrl}${path}`,
      },
    },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tHeader = await getTranslations({ locale, namespace: "header" });

  const breadcrumbJsonLd = buildBreadcrumbListJsonLd(locale, [
    { name: tHeader("home"), path: "" },
    { name: "Політика конфіденційності", path: "/privacy-policy" },
  ]);

  return (
    <>
      <Header />
      <div className="container">
        <JsonLd data={breadcrumbJsonLd} />
        <main className={styles.main}>
          <h1 className={styles.title}>Політика конфіденційності</h1>
          <section className={styles.section}>
            <h2 className={styles.subtitle}>1. Загальні положення</h2>
            <p className={styles.text}>
              Ця Політика конфіденційності визначає порядок отримання,
              зберігання, обробки та використання персональних даних
              користувачів сайту t-mebel.com.ua (далі — «Сайт»).
            </p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.subtitle}>
              2. Збір та використання інформації
            </h2>
            <p className={styles.text}>
              Ми збираємо лише ті персональні дані, які ви добровільно надаєте
              при використанні Сайту (наприклад, при оформленні замовлення,
              реєстрації, підписці на розсилку).
            </p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.subtitle}>3. Захист персональних даних</h2>
            <p className={styles.text}>
              Ми вживаємо всіх необхідних заходів для захисту ваших персональних
              даних від несанкціонованого доступу, зміни, розголошення або
              знищення.
            </p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.subtitle}>4. Передача даних третім особам</h2>
            <p className={styles.text}>
              Ми не передаємо ваші персональні дані третім особам, за винятком
              випадків, передбачених законодавством України.
            </p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.subtitle}>5. Зміни до політики</h2>
            <p className={styles.text}>
              Ми можемо періодично оновлювати цю Політику конфіденційності.
              Зміни набирають чинності з моменту їх публікації на Сайті.
            </p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.subtitle}>6. Контактна інформація</h2>
            <p className={styles.text}>
              Якщо у вас виникли питання щодо цієї Політики конфіденційності,
              зв’яжіться з нами через форму зворотного зв’язку на Сайті.
            </p>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
