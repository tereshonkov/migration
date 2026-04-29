import Footer from "@/widgets/footer/Footer";
import Form from "@/widgets/finalCta/Form";
import PageHeader from "@/widgets/page-title-section/PageHeader";
import ProductGallery from "@/widgets/service-gallery/ProductGallery";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/widgets/header/Header";
import { buildBreadcrumbListJsonLd } from "@/shared/lib/breadcrumbJsonLd";
import { getCatalogPrimaryImageUrl } from "@/shared/lib/productCatalog";
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
  const tHeader = await getTranslations({ locale, namespace: "header" });
  const previewImage = getCatalogPrimaryImageUrl(id);

  const breadcrumbJsonLd = buildBreadcrumbListJsonLd(locale, [
    { name: tHeader("home"), path: "" },
    { name: tHeader("service"), path: "/service" },
    { name: t("title"), path: `/service/${id}` },
  ]);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: t("title"),
    description: t("description"),
    ...(previewImage ? { image: previewImage } : {}),
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
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={productJsonLd} />
      <PageHeader title={t("title")} />
      <main>
        <ProductGallery id={id} />
        <Form />
      </main>
      <Footer />
    </>
  );
}
