import { Metadata } from "next";
import messages from "@/messages/uk.json";
import AboutPage from "@/views/AboutPage/AboutPage";

export async function generateMetadata(): Promise<Metadata> {
  const t = (key: string) => messages.seoAbout[key as keyof typeof messages.seoAbout];
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

export default function page() {
  return (
    <AboutPage
      title={messages.aboutUsPage.title}
      subtitle={messages.aboutUsPage.text1}
    />
  );
}
