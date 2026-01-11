import Hero from "@/components/Hero/Hero"
import Furniture from "@/components/Furniture/Furniture"
import Form from "@/components/Form/Form"
import Footer from "@/components/Footer/Footer"
import { Metadata } from "next"
import { getTranslations } from 'next-intl/server';
import CtaBlock from "@/components/CtaBlock/CtaBlock"
import TrustMe from "@/components/TrustMe/TrustMe"
import PageHeader from "@/components/PageHeader/PageHeader"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPortfolio' });

  const baseUrl = 'https://t-mebel.com.ua';
  const path = '/service';
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
  const t = await getTranslations({ locale, namespace: 'servicePage' });
  return (
    <div className="container">
      <PageHeader 
        title={t('title')}
        subtitle={t('subtitle')}
      />
      <main className="main-service">
        <Furniture />
        <TrustMe />
        <CtaBlock />
        <Form />
      </main>
      <Footer />
    </div>
  )
}