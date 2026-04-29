import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { openGraphAlternateLocale } from "@/shared/lib/openGraphLocale";
import HomePage from "@/views/HomePage/HomePage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seoHome" });

  const baseUrl = "https://t-mebel.com.ua";
  const canonical = locale === "uk" ? baseUrl + "/" : `${baseUrl}/${locale}`;

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
        uk: `${baseUrl}/`,
        en: `${baseUrl}/en`,
        ru: `${baseUrl}/ru`,
        "x-default": `${baseUrl}/`,
      },
    },
  };
}

export default function Page() {
  return <HomePage />;
}
