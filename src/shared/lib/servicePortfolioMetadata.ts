import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCatalogPrimaryImageUrl } from "@/shared/lib/productCatalog";
import { mergeProductCopy } from "@/shared/lib/productCopyMerge";
import { getMessageProductFallback } from "@/shared/lib/productMessageFallback";
import { openGraphAlternateLocale } from "@/shared/lib/openGraphLocale";
import type { AppLocale } from "@/shared/lib/serviceCategories";
import {
  getCategorySlug,
  type ServiceCategoryCode,
} from "@/shared/lib/serviceCategories";
import { resolvePortfolioSlug } from "@/shared/lib/serviceSlug";
import { fetchProductForLocale } from "@/shared/lib/server-product";

const BASE_URL = "https://t-mebel.com.ua";

function categoryAlternateLanguages(category: ServiceCategoryCode) {
  const ukSlug = getCategorySlug("uk", category);
  const ruSlug = getCategorySlug("ru", category);
  const enSlug = getCategorySlug("en", category);
  if (!ukSlug || !ruSlug || !enSlug) return undefined;
  return {
    uk: `${BASE_URL}/service/${ukSlug}`,
    en: `${BASE_URL}/en/service/${enSlug}`,
    ru: `${BASE_URL}/ru/service/${ruSlug}`,
    "x-default": `${BASE_URL}/service/${ukSlug}`,
  };
}

export async function generateServicePortfolioMetadata(
  locale: AppLocale,
  slug: string,
): Promise<Metadata> {
  const resolved = resolvePortfolioSlug(locale, slug);
  if (!resolved) notFound();

  if (resolved.kind === "product") {
    const { productId: id } = resolved;

    const apiProduct = await fetchProductForLocale(id, locale);
    const fallback = getMessageProductFallback(locale, id);
    const copy = mergeProductCopy(apiProduct ?? {}, fallback);

    const path = `/service/${id}`;
    const canonical =
      locale === "uk" ? `${BASE_URL}${path}` : `${BASE_URL}/${locale}${path}`;
    const heroImage = getCatalogPrimaryImageUrl(id);

    return {
      title: copy.titleSeo,
      description: copy.description,
      openGraph: {
        title: copy.titleSeo,
        description: copy.description,
        url: canonical,
        siteName: "T-Mebel",
        locale: openGraphAlternateLocale(locale),
        images: heroImage
          ? [
              {
                url: heroImage,
                width: 1200,
                height: 630,
                alt: copy.title,
              },
            ]
          : [
              {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "T-Mebel",
              },
            ],
        type: "website",
      },
      alternates: {
        canonical,
        languages: {
          uk: `${BASE_URL}${path}`,
          en: `${BASE_URL}/en${path}`,
          ru: `${BASE_URL}/ru${path}`,
          "x-default": `${BASE_URL}${path}`,
        },
      },
    };
  }

  const { category } = resolved;
  const segment = getCategorySlug(locale, category);
  if (!segment) notFound();

  const t = await getTranslations({ locale, namespace: "seoServiceCategory" });
  const title = t(`${category}.title`);
  const description = t(`${category}.description`);

  const path =
    locale === "uk" ? `/service/${segment}` : `/${locale}/service/${segment}`;
  const canonical = `${BASE_URL}${path}`;

  const langs = categoryAlternateLanguages(category);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "T-Mebel",
      locale: openGraphAlternateLocale(locale),
      images: [
        { url: "/og-image.jpg", width: 1200, height: 630, alt: "T-Mebel" },
      ],
      type: "website",
    },
    alternates: {
      canonical,
      ...(langs ? { languages: langs } : {}),
    },
  };
}
