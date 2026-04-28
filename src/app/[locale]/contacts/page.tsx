import Footer from "@/widgets/footer/Footer"
import { Metadata } from "next"
import { getTranslations } from 'next-intl/server';
import ContactsPage from "@/views/ContactsPage/ContactsPage"
import Header from "@/widgets/header/Header"
import { JsonLd } from "@/shared/ui/JsonLd/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seoContact" });

  const baseUrl = "https://t-mebel.com.ua";
  const path = "/contacts";
  const canonical = locale === "uk" ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonical,
      siteName: "T-Mebel",
      locale,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "T-Mebel" }],
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

export default async function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  const subtitle =
    locale === "uk"
      ? "Зв'яжіться з нами будь-яким зручним способом. Ми завжди раді вам допомогти!"
      : locale === "en"
      ? "Contact us in any convenient way. We are always happy to help you!"
      : "Свяжитесь с любым удобным способом. Мы всегда рады вам помочь!";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === 'uk' ? 'Головна' : locale === 'en' ? 'Home' : 'Главная',
        "item": `https://t-mebel.com.ua${locale === 'uk' ? '' : '/' + locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t('contactTitle'),
        "item": `https://t-mebel.com.ua${locale === 'uk' ? '' : '/' + locale}/contacts`
      }
    ]
  };

  return (
    <>
      <Header />
      <div className="container">
      <JsonLd data={breadcrumbJsonLd} />
      <main className="main-service">
        <ContactsPage subtitle={subtitle} />
      </main>
      <Footer />
    </div>
    </>
  )
}