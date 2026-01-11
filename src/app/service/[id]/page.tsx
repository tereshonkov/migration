import Footer from "@/components/Footer/Footer";
import Form from "@/components/Form/Form";
import FullPage from "@/components/FullPageCard/FullPage";
import Hero from "@/components/Hero/Hero";
import { use } from "react";
import { Metadata } from "next";
import messages from '@/messages/uk.json';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const locale = "uk";
  const messagesData = messages as any;
  const t = (key: string) => messagesData[`data_${id}`]?.[key] || key;

  const baseUrl = "https://t-mebel.com.ua";
  const path = `/product/${id}`;
  const canonical = `${baseUrl}${path}`;

  return {
    title: t("titleSeo"),
    description: t("description"),
    openGraph: {
      title: t("titleSeo"),
      description: t("description"),
      url: canonical,
      siteName: "T-Mebel",
      locale,
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

export default function FurniturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params) as { id: string };

  return (
    <>
      <Hero startIndex={2} page={true} />
      <main>
        <FullPage id={id} />
        <Form />
      </main>
      <Footer />
    </>
  );
}
