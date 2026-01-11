import Footer from "@/components/Footer/Footer"
import Faq from "@/components/Faq/Faq"
import { Metadata } from "next"
import { getTranslations } from 'next-intl/server';
import PageHeader from "@/components/PageHeader/PageHeader"
import ContactsPage from "@/components/ContactsPage/ContactsPage"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoContact' });

  const baseUrl = 'https://t-mebel.com.ua';
  const path = '/contacts';
  const canonical = locale === 'uk' ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonical,
      siteName: 'T-Mebel',
      locale,
    },
    alternates: {
      canonical,
      languages: {
        uk: `${baseUrl}${path}`,
        en: `${baseUrl}/en${path}`,
        ru: `${baseUrl}/ru${path}`,
        'x-default': `${baseUrl}${path}`,
      },
    },
  };
}


export default async function page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contactPage' });
  const subtitle = locale === 'uk'
    ? "Зв'яжіться з нами будь-яким зручним способом. Ми завжди раді вам допомогти!"
    : locale === 'en'
      ? "Contact us in any convenient way. We are always happy to help you!"
      : "Свяжитесь с нами любым удобным способом. Мы всегда рады вам помочь!";
  return (
    <div className="container">
      <PageHeader 
        title={t('contactTitle')}
        subtitle={subtitle}
      />
      <main className="main-service">
        <ContactsPage />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}