import ServicePage from "@/views/ServicePage/ServicePage";
import { Metadata } from "next";
import messages from "@/messages/uk.json";

export async function generateMetadata(): Promise<Metadata> {
  const t = (key: string) =>
    messages.seoPortfolio[key as keyof typeof messages.seoPortfolio];
  const locale = "uk"; // Default locale for non-localized routes

  const baseUrl = "https://t-mebel.com.ua";
  const path = "/service";

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: baseUrl + path,
      siteName: "T-Mebel",
      locale,
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

export default function ServicePageRoute() {
  return (
    <ServicePage
      title="Наші роботи"
      subtitle="Індивідуальні меблі, створені з любов'ю до деталей. Кожен проєкт — унікальний."
    />
  );
}
