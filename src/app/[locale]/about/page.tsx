import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildBreadcrumbListJsonLd } from "@/shared/lib/breadcrumbJsonLd";
import { openGraphAlternateLocale } from "@/shared/lib/openGraphLocale";
import { JsonLd } from "@/shared/ui/JsonLd/JsonLd";
import AboutPage from "@/views/AboutPage/AboutPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seoAbout" });

  const baseUrl = "https://t-mebel.com.ua";
  const path = "/about";
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

export default async function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutUsPage" });
  const tHeader = await getTranslations({ locale, namespace: "header" });

  const breadcrumbJsonLd = buildBreadcrumbListJsonLd(locale, [
    { name: tHeader("home"), path: "" },
    { name: tHeader("about"), path: "/about" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <AboutPage title={t("title")} subtitle={t("text1")} showHeader />
    </>
  );
}
