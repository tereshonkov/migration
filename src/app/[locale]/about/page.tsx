import Form from "@/components/Form/Form"
import Footer from "@/components/Footer/Footer"
import About from "@/components/About/About"
import Reviews from "@/components/Reviews/Reviews"
import { Metadata } from "next"
import { getTranslations } from 'next-intl/server';
import PageHeader from "@/components/PageHeader/PageHeader"
import Header from "@/components/Header/Header"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoAbout' });

  const baseUrl = 'https://t-mebel.com.ua';
  const path = '/about';
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
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "T-Mebel" }],
      type: "website",
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
  const t = await getTranslations({ locale, namespace: 'aboutUsPage' });
  
  return (
    <>
      <Header />
      <div className="container">
      <PageHeader 
        title={t('title')}
        subtitle={t('text1')}
      />
      <main className="main-service">
        <About />
        <Reviews />
        <Form />
      </main>
      <Footer />
    </div>
    </>
  )
}