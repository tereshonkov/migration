import type { Metadata } from "next";
import type { GuideDefinition } from "@/content/guides/types";
import { guideArticlePath } from "@/shared/lib/guideRoutes";
import { getCatalogImageUrlByProductId } from "@/shared/lib/productCatalog";
import { openGraphAlternateLocale } from "@/shared/lib/openGraphLocale";

const baseUrl = "https://t-mebel.com.ua";

export function absoluteSiteUrl(pathWithLeadingSlash: string): string {
  const slug = pathWithLeadingSlash.startsWith("/")
    ? pathWithLeadingSlash
    : `/${pathWithLeadingSlash}`;
  return `${baseUrl}${slug}`;
}

export function guideArticleAlternates(params: {
  guide: GuideDefinition;
  activeLocale: string;
}): NonNullable<Metadata["alternates"]> {
  const ukPath = `/guides/${params.guide.slugUk}`;
  const ruPath = `/guides/${params.guide.slugRu}`;
  const ukUrl = `${baseUrl}${ukPath}`;
  const ruUrl = `${baseUrl}/ru${ruPath}`;
  const canonical =
    params.activeLocale === "uk"
      ? ukUrl
      : params.activeLocale === "ru"
        ? ruUrl
        : ukUrl;

  return {
    canonical,
    languages: {
      uk: ukUrl,
      ru: ruUrl,
      "x-default": ukUrl,
    },
  };
}

export function guideOpenGraphicImages(
  heroIds: number[],
): NonNullable<NonNullable<Metadata["openGraph"]>["images"]> {
  const firstId = heroIds[0];
  const remote =
    firstId != null ? getCatalogImageUrlByProductId(firstId) : undefined;
  if (remote) {
    return [{ url: remote, width: 1200, height: 720, alt: "T-Mebel" }];
  }
  return [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "T-Mebel" }];
}

export function buildGuideArticleMetadata(opts: {
  locale: string;
  guide: GuideDefinition;
}): Metadata {
  const { locale } = opts;
  const block = locale === "uk" ? opts.guide.uk : opts.guide.ru;
  const path = guideArticlePath(locale, opts.guide);
  const url = absoluteSiteUrl(path);
  return {
    title: { absolute: block.title },
    description: block.description,
    openGraph: {
      title: block.title,
      description: block.description,
      url,
      siteName: "T-Mebel",
      locale: openGraphAlternateLocale(locale),
      type: "article",
      publishedTime: opts.guide.datePublished,
      images: guideOpenGraphicImages(opts.guide.heroImageIds),
    },
    alternates: guideArticleAlternates({
      guide: opts.guide,
      activeLocale: locale,
    }),
  };
}

export function buildGuidesHubMetadata(opts: {
  locale: string;
  title: string;
  description: string;
}): Metadata {
  const path = opts.locale === "uk" ? "/guides" : `/${opts.locale}/guides`;
  const url = absoluteSiteUrl(path);
  const canonical =
    opts.locale === "uk"
      ? `${baseUrl}${path}`
      : `${baseUrl}/${opts.locale}/guides`;

  return {
    title: { absolute: opts.title },
    description: opts.description,
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: "T-Mebel",
      locale: openGraphAlternateLocale(opts.locale),
      images: [
        { url: "/og-image.jpg", width: 1200, height: 630, alt: "T-Mebel" },
      ],
      type: "website",
    },
    alternates: {
      canonical,
      languages: {
        uk: `${baseUrl}/guides`,
        ru: `${baseUrl}/ru/guides`,
        "x-default": `${baseUrl}/guides`,
      },
    },
  };
}
