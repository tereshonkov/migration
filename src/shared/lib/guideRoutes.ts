import type { GuideDefinition } from "@/content/guides/types";
import type {
  AppLocale,
  ServiceCategoryCode,
} from "@/shared/lib/serviceCategories";
import { getCategorySlug } from "@/shared/lib/serviceCategories";

export const GUIDES_PATH = "/guides";

export function guideArticleSlug(
  guide: Pick<GuideDefinition, "slugUk" | "slugRu">,
  locale: string,
): string {
  return locale === "ru" ? guide.slugRu : guide.slugUk;
}

export function guideArticlePath(
  locale: string,
  guide: Pick<GuideDefinition, "slugUk" | "slugRu">,
): string {
  const slug = guideArticleSlug(guide, locale);
  return locale === "uk"
    ? `${GUIDES_PATH}/${slug}`
    : `/${locale}${GUIDES_PATH}/${slug}`;
}

export function guidesHubPath(locale: string): string {
  return locale === "uk" ? GUIDES_PATH : `/${locale}${GUIDES_PATH}`;
}

export function localizedServiceCategoryPath(
  locale: string,
  code: ServiceCategoryCode,
): string {
  const appLocale: AppLocale = locale === "ru" ? "ru" : "uk";
  const slug = getCategorySlug(appLocale, code);
  if (!slug) {
    return locale === "uk" ? "/service" : `/${locale}/service`;
  }
  return locale === "uk" ? `/service/${slug}` : `/${locale}/service/${slug}`;
}

export function localizedServiceProductPath(
  locale: string,
  productId: number,
): string {
  const id = String(productId);
  return locale === "uk" ? `/service/${id}` : `/${locale}/service/${id}`;
}
