import { Metadata } from "next";
import messages from "@/messages/uk.json";
import { buildBreadcrumbListJsonLd } from "@/shared/lib/breadcrumbJsonLd";
import { openGraphAlternateLocale } from "@/shared/lib/openGraphLocale";
import { JsonLd } from "@/shared/ui/JsonLd/JsonLd";
import AboutPage from "@/views/AboutPage/AboutPage";

export async function generateMetadata(): Promise<Metadata> {
  const t = (key: string) =>
    messages.seoAbout[key as keyof typeof messages.seoAbout];
  const locale = "uk";

  const baseUrl = "https://t-mebel.com.ua";
  const path = "/about";

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: baseUrl + path,
      siteName: "T-Mebel",
      locale: openGraphAlternateLocale(locale),
      images: [
        { url: "/og-image.jpg", width: 1200, height: 630, alt: "T-Mebel" },
      ],
      type: "website",
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        uk: `${baseUrl}${path}`,
        en: `${baseUrl}/en${path}`,
        ru: `${baseUrl}/ru${path}`,
        "x-default": `${baseUrl}${path}`,
      },
    },
  };
}

export default function page() {
  const breadcrumbJsonLd = buildBreadcrumbListJsonLd("uk", [
    { name: messages.header.home, path: "" },
    { name: messages.header.about, path: "/about" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <AboutPage
        title={messages.aboutUsPage.title}
        subtitle={messages.aboutUsPage.text1}
      />
    </>
  );
}
