import { notFound } from "next/navigation";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { buildBreadcrumbListJsonLd } from "@/shared/lib/breadcrumbJsonLd";
import type { AppLocale } from "@/shared/lib/serviceCategories";
import { getCategorySlug } from "@/shared/lib/serviceCategories";
import { resolvePortfolioSlug } from "@/shared/lib/serviceSlug";
import { JsonLd } from "@/shared/ui/JsonLd/JsonLd";
import ServicePage from "@/views/ServicePage/ServicePage";
import ServicePageDetails from "@/views/ServicePageDetails/ServicePageDetails";

type Props = {
  locale: AppLocale;
  slug: string;
};

export default async function ServicePortfolioSlugRoute({
  locale,
  slug,
}: Props) {
  const resolved = resolvePortfolioSlug(locale, slug);
  if (!resolved) notFound();

  if (resolved.kind === "product") {
    return <ServicePageDetails locale={locale} id={resolved.productId} />;
  }

  setRequestLocale(locale);
  const segment = getCategorySlug(locale, resolved.category);
  if (!segment) notFound();

  const cat = resolved.category;
  const t = await getTranslations({ locale, namespace: "seoServiceCategory" });
  const messages = await getMessages();
  const categoryBlock = (
    messages as { seoServiceCategory?: Record<string, Record<string, string>> }
  ).seoServiceCategory?.[cat];
  const pageHeading = categoryBlock?.pageHeading;
  const h1Title = pageHeading ?? t(`${cat}.pageTitle`);
  const tHeader = await getTranslations({ locale, namespace: "header" });

  const breadcrumbJsonLd = buildBreadcrumbListJsonLd(locale, [
    { name: tHeader("home"), path: "" },
    { name: tHeader("service"), path: "/service" },
    {
      name: t(`${cat}.breadcrumbName`),
      path: `/service/${segment}`,
    },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <ServicePage title={h1Title} subtitle={t(`${cat}.pageSubtitle`)} />
    </>
  );
}
