import type { AppLocale, ServiceCategoryCode } from "./serviceCategories";
import { resolveCategoryFromSlug } from "./serviceCategories";

export type ResolvedPortfolioSlug =
  | { kind: "product"; productId: string }
  | { kind: "category"; category: ServiceCategoryCode };

export function resolvePortfolioSlug(
  locale: AppLocale,
  slug: string,
): ResolvedPortfolioSlug | null {
  const trimmed = slug.trim();
  if (!trimmed) return null;
  if (/^\d+$/.test(trimmed)) {
    return { kind: "product", productId: trimmed };
  }
  const category = resolveCategoryFromSlug(locale, trimmed);
  if (category) return { kind: "category", category };
  return null;
}
