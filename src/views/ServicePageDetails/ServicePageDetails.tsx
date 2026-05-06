import Footer from "@/widgets/footer/Footer";
import Form from "@/widgets/finalCta/Form";
import PageHeader from "@/widgets/page-title-section/PageHeader";
import ProductGallery from "@/widgets/service-gallery/ProductGallery";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/widgets/header/Header";
import { buildBreadcrumbListJsonLd } from "@/shared/lib/breadcrumbJsonLd";
import { mergeProductCopy } from "@/shared/lib/productCopyMerge";
import { getMessageProductFallback } from "@/shared/lib/productMessageFallback";
import type { AppLocale } from "@/shared/lib/serviceCategories";
import { fetchProductForLocale } from "@/shared/lib/server-product";
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
  const loc = locale as AppLocale;

  const apiProduct = await fetchProductForLocale(id, loc);
  const fallback = getMessageProductFallback(loc, id);
  const copy = mergeProductCopy(apiProduct ?? {}, fallback);

  const tHeader = await getTranslations({ locale, namespace: "header" });

  const breadcrumbJsonLd = buildBreadcrumbListJsonLd(locale, [
    { name: tHeader("home"), path: "" },
    { name: tHeader("service"), path: "/service" },
    { name: copy.title, path: `/service/${id}` },
  ]);

  return (
    <>
      <Header />
      <JsonLd data={breadcrumbJsonLd} />
      <PageHeader title={copy.title} />
      <main>
        <ProductGallery id={id} />
        <Form />
      </main>
      <Footer />
    </>
  );
}
