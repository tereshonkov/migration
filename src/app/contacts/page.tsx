import Footer from "@/components/Footer/Footer"
import Faq from "@/components/Faq/Faq"
import { Metadata } from "next"
import messages from '@/messages/uk.json';
import PageHeader from "@/components/PageHeader/PageHeader"
import ContactsPage from "@/components/ContactsPage/ContactsPage"

export async function generateMetadata(): Promise<Metadata> {
  const t = (key: string) => messages.seoContact[key as keyof typeof messages.seoContact];
  const locale = 'uk'; // Default locale for non-localized routes

  const baseUrl = 'https://t-mebel.com.ua';
  const path = '/contacts';

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: baseUrl + path,
      siteName: 'T-Mebel',
      locale,
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        uk: `${baseUrl}${path}`,
        en: `${baseUrl}/en${path}`,
        ru: `${baseUrl}/ru${path}`,
        'x-default': `${baseUrl}${path}`,
      },
    },
  };
}


export default async function page() {
  return (
    <div className="container">
      <PageHeader 
        title={messages.contactPage.contactTitle}
        subtitle="Зв'яжіться з нами будь-яким зручним способом. Ми завжди раді вам допомогти!"
      />
      <main className="main-service">
        <ContactsPage />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}