import { Metadata } from "next";
import messages from "@/messages/uk.json";
import HomePage from "@/views/HomePage/HomePage";

export async function generateMetadata(): Promise<Metadata> {
  const t = (key: string) => messages.seoHome[key as keyof typeof messages.seoHome];
  const locale = "uk";

  const baseUrl = "https://t-mebel.com.ua";
  const canonical = `${baseUrl}/`;

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonical,
      siteName: "T-Mebel",
      locale,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "T-Mebel" }],
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
