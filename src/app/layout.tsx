import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/uk.json';
import JsonLd from "@/components/JsonLd/JsonLd";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://t-mebel.com.ua"),
  title: {
    default: "T-Mebel — Меблі на замовлення у Харкові",
    template: "%s | T-Mebel",
  },
  description: "Виготовляємо кухні, шафи та меблі на замовлення у Харкові. Індивідуальний підхід, доступні ціни, власне виробництво.",
  robots: { index: true, follow: true },
  twitter: {
    card: "summary_large_image",
    site: "@tmebel",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "name": "T-Mebel",
    "url": "https://t-mebel.com.ua",
    "logo": "https://t-mebel.com.ua/logo.svg",
    "telephone": "+380671496741",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "проспект Льва Ландау 8",
      "addressLocality": "Харків",
      "addressCountry": "UA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "49.9935",
      "longitude": "36.2304"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    }
  };

  return (
    <>
      <head>
        <JsonLd data={organizationJsonLd} />
        {/* Google Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16643061743"
          strategy="afterInteractive"
        />
        <Script id="google-tags" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16643061743');
            gtag('config', 'G-DSKK22XDCJ');
          `}
        </Script>
      </head>
      <NextIntlClientProvider locale="uk" messages={messages}>
        <SpeedInsights />
        <Analytics />
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </NextIntlClientProvider>
    </>
  );
}
