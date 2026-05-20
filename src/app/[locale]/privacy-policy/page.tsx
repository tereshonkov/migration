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
  const t = await getTranslations({ locale, namespace: "seoPrivacyPolicy" });

  const baseUrl = "https://t-mebel.com.ua";
  const path = "/privacy-policy";
  const canonical =
    locale === "uk" ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
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
  const t = await getTranslations({ locale, namespace: "privacyPolicy" });
  const tHeader = await getTranslations({ locale, namespace: "header" });
  const tSeo = await getTranslations({ locale, namespace: "seoPrivacyPolicy" });

  const breadcrumbJsonLd = buildBreadcrumbListJsonLd(locale, [
    { name: tHeader("home"), path: "" },
    { name: tSeo("breadcrumb"), path: "/privacy-policy" },
  ]);

  return (
    <>
      <Header />
      <div className="container">
        <JsonLd data={breadcrumbJsonLd} />
        <main className={styles.main}>
          <h1 className={styles.title}>{t("heading")}</h1>
          <section className={styles.section}>
            <h2 className={styles.subtitle}>{t("section1Title")}</h2>
            <p className={styles.text}>{t("section1Text")}</p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.subtitle}>{t("section2Title")}</h2>
            <p className={styles.text}>{t("section2Text")}</p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.subtitle}>{t("section3Title")}</h2>
            <p className={styles.text}>{t("section3Text")}</p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.subtitle}>{t("section4Title")}</h2>
            <p className={styles.text}>{t("section4Text")}</p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.subtitle}>{t("section5Title")}</h2>
            <p className={styles.text}>{t("section5Text")}</p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.subtitle}>{t("section6Title")}</h2>
            <p className={styles.text}>{t("section6Text")}</p>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
