import ServicePage from "@/views/ServicePage/ServicePage";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { openGraphAlternateLocale } from "@/shared/lib/openGraphLocale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seoPortfolio" });

  const baseUrl = "https://t-mebel.com.ua";
  const path = "/service";
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

export default async function ServiceLocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicePage" });
  return <ServicePage title={t("title")} subtitle={t("subtitle")} showHeader />;
}
