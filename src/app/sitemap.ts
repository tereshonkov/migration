import type { MetadataRoute } from "next";
import data from "@/../public/data/data.json";
import { routing } from "@/i18n/routing";
import type { AppLocale } from "@/shared/lib/serviceCategories";
import {
  getCategorySlug,
  listPublishedCategorySlugs,
  resolveCategoryFromSlug,
} from "@/shared/lib/serviceCategories";
import { ALL_GUIDES } from "@/content/guides/registry";
import { isPortfolioProductUuidSegment } from "@/shared/lib/serviceSlug";

const locales = routing.locales as readonly AppLocale[];

type PageDef = {
  slug: string;
  changeFrequency:
    | "yearly"
    | "monthly"
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "never";
  priority: number;
  /** If set, emit only these locales (category URLs use locale-specific slug segments). */
  emitLocales?: readonly AppLocale[];
  /** For guide articles only: UA vs RU path segments after `guides/`. */
  guideHreflangSlugs?: { slugUk: string; slugRu: string };
};

const staticPages: PageDef[] = [
  { slug: "", changeFrequency: "yearly", priority: 1 },
  { slug: "service", changeFrequency: "monthly", priority: 0.9 },
  { slug: "about", changeFrequency: "yearly", priority: 0.8 },
  { slug: "contacts", changeFrequency: "yearly", priority: 0.7 },
  { slug: "privacy-policy", changeFrequency: "yearly", priority: 0.6 },
];

const productPages: PageDef[] = (data as { id: number }[]).map((item) => ({
  slug: `service/${item.id}`,
  changeFrequency: "yearly",
  priority: 0.7,
}));

const categoryPages: PageDef[] = locales.flatMap((locale) =>
  listPublishedCategorySlugs(locale).map((segment) => ({
    slug: `service/${segment}`,
    changeFrequency: "monthly" as const,
    priority: 0.82,
    emitLocales: [locale],
  })),
);

const guideLocalesSubset = ["uk", "ru"] as const satisfies readonly AppLocale[];

const guideArticlePages: PageDef[] = ALL_GUIDES.flatMap((g) => [
  {
    slug: `guides/${g.slugUk}`,
    changeFrequency: "monthly",
    priority: 0.55,
    emitLocales: ["uk"] as const,
    guideHreflangSlugs: { slugUk: g.slugUk, slugRu: g.slugRu },
  },
  {
    slug: `guides/${g.slugRu}`,
    changeFrequency: "monthly",
    priority: 0.55,
    emitLocales: ["ru"] as const,
    guideHreflangSlugs: { slugUk: g.slugUk, slugRu: g.slugRu },
  },
]);

const guidesPages: PageDef[] = [
  {
    slug: "guides",
    changeFrequency: "monthly",
    priority: 0.58,
    emitLocales: guideLocalesSubset,
  },
  ...guideArticlePages,
];

const pages: PageDef[] = [
  ...staticPages,
  ...guidesPages,
  ...productPages,
  ...categoryPages,
];

function getUrl(locale: string, slug: string) {
  if (locale === "uk") {
    return slug ? `https://t-mebel.com.ua/${slug}` : `https://t-mebel.com.ua/`;
  }
  return slug
    ? `https://t-mebel.com.ua/${locale}/${slug}`
    : `https://t-mebel.com.ua/${locale}`;
}

function standardAlternates(
  slug: string,
): MetadataRoute.Sitemap[0]["alternates"] {
  return {
    languages: {
      uk: getUrl("uk", slug),
      ru: getUrl("ru", slug),
      en: getUrl("en", slug),
      "x-default": getUrl("uk", slug),
    },
  };
}

function buildAlternates(
  page: PageDef,
  rowLocale: AppLocale,
): MetadataRoute.Sitemap[0]["alternates"] {
  if (page.guideHreflangSlugs) {
    const { slugUk, slugRu } = page.guideHreflangSlugs;
    return {
      languages: {
        uk: getUrl("uk", `guides/${slugUk}`),
        ru: getUrl("ru", `guides/${slugRu}`),
        "x-default": getUrl("uk", `guides/${slugUk}`),
      },
    };
  }

  if (page.slug === "guides" || page.slug.startsWith("guides/")) {
    return {
      languages: {
        uk: getUrl("uk", page.slug),
        ru: getUrl("ru", page.slug),
        "x-default": getUrl("uk", page.slug),
      },
    };
  }

  const m = page.slug.match(/^service\/([^/]+)$/);
  if (!m) return standardAlternates(page.slug);

  const segment = m[1];
  if (/^\d+$/.test(segment) || isPortfolioProductUuidSegment(segment)) {
    return standardAlternates(page.slug);
  }

  const code = resolveCategoryFromSlug(rowLocale, segment);
  if (!code) return standardAlternates(page.slug);

  const ukSeg = getCategorySlug("uk", code);
  const ruSeg = getCategorySlug("ru", code);
  const enSeg = getCategorySlug("en", code);
  if (!ukSeg || !ruSeg || !enSeg) return standardAlternates(page.slug);

  return {
    languages: {
      uk: getUrl("uk", `service/${ukSeg}`),
      ru: getUrl("ru", `service/${ruSeg}`),
      en: getUrl("en", `service/${enSeg}`),
      "x-default": getUrl("uk", `service/${ukSeg}`),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const result: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    const localeList = page.emitLocales ?? locales;
    for (const locale of localeList) {
      const url = getUrl(locale, page.slug);

      result.push({
        url,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: buildAlternates(page, locale),
      });
    }
  }

  return result;
}
