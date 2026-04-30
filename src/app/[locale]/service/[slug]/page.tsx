import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ServicePortfolioSlugRoute from "@/views/ServicePortfolioSlugRoute/ServicePortfolioSlugRoute";
import { getPortfolioProductIds } from "@/shared/lib/productCatalog";
import { generateServicePortfolioMetadata } from "@/shared/lib/servicePortfolioMetadata";
import type { AppLocale } from "@/shared/lib/serviceCategories";
import { listPublishedCategorySlugs } from "@/shared/lib/serviceCategories";

export const dynamicParams = true;

export async function generateStaticParams() {
  const ids = getPortfolioProductIds().map((id) => String(id));
  const rows: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of ids) rows.push({ locale, slug });
    for (const slug of listPublishedCategorySlugs(locale as AppLocale)) {
      rows.push({ locale, slug });
    }
  }
  return rows;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return generateServicePortfolioMetadata(locale as AppLocale, slug);
}

export default async function ServicePortfolioSlugLocalePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return <ServicePortfolioSlugRoute locale={locale as AppLocale} slug={slug} />;
}
