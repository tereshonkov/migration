import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getCatalogPrimaryImageUrl } from "@/shared/lib/productCatalog";
import { openGraphAlternateLocale } from "@/shared/lib/openGraphLocale";
import ServicePageDetails from "@/views/ServicePageDetails/ServicePageDetails";

const DEFAULT_LOCALE = "uk";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const t = await getTranslations({
    locale: DEFAULT_LOCALE,
    namespace: `data_${id}`,
  });

  const baseUrl = "https://t-mebel.com.ua";
  const path = `/service/${id}`;
  const canonical = `${baseUrl}${path}`;
  const heroImage = getCatalogPrimaryImageUrl(id);

  return {
    title: t("titleSeo"),
    description: t("description"),
    openGraph: {
      title: t("titleSeo"),
      description: t("description"),
      url: canonical,
      siteName: "T-Mebel",
      locale: openGraphAlternateLocale(DEFAULT_LOCALE),
      images: heroImage
        ? [
            {
              url: heroImage,
              width: 1200,
              height: 630,
              alt: t("title"),
            },
          ]
        : [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "T-Mebel" }],
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

export default async function FurniturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ServicePageDetails locale={DEFAULT_LOCALE} id={id} />;
}
