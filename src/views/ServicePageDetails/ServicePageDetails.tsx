import Footer from "@/widgets/footer/Footer";
import PageHeader from "@/widgets/page-title-section/PageHeader";
import ProductGallery from "@/widgets/service-gallery/ProductGallery";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/widgets/header/Header";
import { JsonLd } from "@/shared/ui/JsonLd/JsonLd";

type ServicePageDetailsProps = {
  locale: string;
  id: string;
};

export default async function ServicePageDetails({
  locale,
  id,
}: ServicePageDetailsProps) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: `data_${id}` });

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: t("title"),
    description: t("description"),
    brand: {
      "@type": "Brand",
      name: "T-Mebel",
    },
    offers: {
      "@type": "Offer",
      url: `https://t-mebel.com.ua/${locale === "uk" ? "" : `${locale}/`}service/${id}`,
      priceCurrency: "UAH",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <Header />
      <JsonLd data={productJsonLd} />
      <PageHeader title={t("title")} />
      <main>
        <ProductGallery id={id} />
      </main>
      <Footer />
    </>
  );
}
