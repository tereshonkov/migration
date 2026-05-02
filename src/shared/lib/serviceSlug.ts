import type { AppLocale, ServiceCategoryCode } from "./serviceCategories";
import { resolveCategoryFromSlug } from "./serviceCategories";

/** Matches backend portfolio product IDs (RFC 4122 string form). */
const PORTFOLIO_PRODUCT_UUID_RE =
  /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i;

export function isPortfolioProductUuidSegment(segment: string): boolean {
  return PORTFOLIO_PRODUCT_UUID_RE.test(segment.trim());
}

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
  if (isPortfolioProductUuidSegment(trimmed)) {
    return { kind: "product", productId: trimmed };
  }
  const category = resolveCategoryFromSlug(locale, trimmed);
  if (category) return { kind: "category", category };
  return null;
}
