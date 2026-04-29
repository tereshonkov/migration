import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ServicePageDetails from "@/views/ServicePageDetails/ServicePageDetails";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: `data_${id}` });

  const baseUrl = "https://t-mebel.com.ua";
  const path = `/service/${id}`;
  const canonical =
    locale === "uk" ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;

  return {
    title: t("titleSeo"),
    description: t("description"),
    openGraph: {
      title: t("titleSeo"),
      description: t("description"),
      url: canonical,
      siteName: "T-Mebel",
      locale,
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

export default async function FurniturePage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  return <ServicePageDetails locale={locale} id={id} />;
}
