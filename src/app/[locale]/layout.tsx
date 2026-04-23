import { notFound } from 'next/navigation';
import { Locale, hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import { routing } from '@/i18n/routing';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
 return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const { locale } = await props.params;
  
  const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

  return {
    metadataBase: new URL("https://t-mebel.com.ua"),
    title: {
      default: t('title'),
      template: "%s | T-Mebel",
    },
    description: "Виготовляємо кухні, шафи та меблі на замовлення у Харкові. Індивідуальний подхід, доступні ціни, власне виробництво.",
    robots: { index: true, follow: true },
    twitter: {
      card: "summary_large_image",
      site: "@tmebel",
      images: ["/og-image.jpg"],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
