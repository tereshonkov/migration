import type { MetadataRoute } from "next";
import data from "@/../public/data/data.json";
import { routing } from "@/i18n/routing";

const locales = routing.locales;

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

const pages: PageDef[] = [...staticPages, ...productPages];

function getUrl(locale: string, slug: string) {
  if (locale === "uk") {
    return slug ? `https://t-mebel.com.ua/${slug}` : `https://t-mebel.com.ua/`;
  }
  return slug
    ? `https://t-mebel.com.ua/${locale}/${slug}`
    : `https://t-mebel.com.ua/${locale}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const result: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      const url = getUrl(locale, page.slug);

      result.push({
        url,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            uk: getUrl("uk", page.slug),
            ru: getUrl("ru", page.slug),
            en: getUrl("en", page.slug),
            "x-default": getUrl("uk", page.slug),
          },
        },
      });
    }
  }

  return result;
}
