/**
 * Single source of truth for portfolio category URL segments vs product.category codes.
 * Segments are Latin lowercase + hyphens (ASCII).
 *
 * Kitchen slugs transcribe localized phrases (not English keywords):
 * - uk: official UA romanization (Cabinet of Ministers №55, 2010): «кухня на замовлення Харків»
 * - ru: common latinization for RU phrase: «кухня на заказ Харьков»
 * - en: same transcript as uk (Kharkiv spelling); adjust if you want EN-specific wording later.
 */

export type AppLocale = "uk" | "ru" | "en";

export type ServiceCategoryCode = "KITCHEN" | "WARDROBE" | "STORE" | "BEDROOM";

/** Tab order in Furniture UI (id 1 … 4) — keep aligned with useDataFurniture. */
export const SERVICE_CATEGORY_TAB_ORDER: readonly ServiceCategoryCode[] = [
  "KITCHEN",
  "WARDROBE",
  "STORE",
  "BEDROOM",
] as const;

/** «кухня на замовлення Харків» → latin */
const KITCHEN_SLUG_UK_EN = "kukhnia-na-zamovlennia-kharkiv";

/** «кухня на заказ Харьков» → latin */
const KITCHEN_SLUG_RU = "kuhnya-na-zakaz-kharkov";

/** Published slug per locale (transliterated phrases). */
const CATEGORY_SEGMENTS: Record<
  AppLocale,
  Partial<Record<ServiceCategoryCode, string>>
> = {
  uk: {
    KITCHEN: KITCHEN_SLUG_UK_EN,
  },
  ru: {
    KITCHEN: KITCHEN_SLUG_RU,
  },
  en: {
    KITCHEN: KITCHEN_SLUG_UK_EN,
  },
};

function slugReverseMaps(): Record<
  AppLocale,
  Map<string, ServiceCategoryCode>
> {
  const locales: AppLocale[] = ["uk", "ru", "en"];
  const out = {} as Record<AppLocale, Map<string, ServiceCategoryCode>>;
  for (const locale of locales) {
    const map = new Map<string, ServiceCategoryCode>();
    const entries = CATEGORY_SEGMENTS[locale];
    for (const code of Object.keys(entries) as ServiceCategoryCode[]) {
      const raw = entries[code];
      if (raw) map.set(normalizeSegment(raw), code);
    }
    out[locale] = map;
  }
  return out;
}

const REVERSE_BY_LOCALE = slugReverseMaps();

export function normalizeSegment(segment: string): string {
  let decoded = segment.trim();
  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    /* keep trimmed raw */
  }
  return decoded.toLowerCase();
}

export function getCategorySlug(
  locale: AppLocale,
  code: ServiceCategoryCode,
): string | undefined {
  return CATEGORY_SEGMENTS[locale][code];
}

/** Category landing segments configured for `locale` (tab order). */
export function listPublishedCategorySlugs(locale: AppLocale): string[] {
  const entries = CATEGORY_SEGMENTS[locale];
  return SERVICE_CATEGORY_TAB_ORDER.map((code) => entries[code]).filter(
    (s): s is string => Boolean(s),
  );
}

/** Resolve portfolio category from URL segment; unknown slug → undefined. */
export function resolveCategoryFromSlug(
  locale: AppLocale,
  segment: string,
): ServiceCategoryCode | undefined {
  return REVERSE_BY_LOCALE[locale].get(normalizeSegment(segment));
}

export function categoryFromTabId(
  tabId: number,
): ServiceCategoryCode | undefined {
  return SERVICE_CATEGORY_TAB_ORDER[tabId - 1];
}

export function tabIdFromCategory(code: ServiceCategoryCode): number {
  const index = SERVICE_CATEGORY_TAB_ORDER.indexOf(code);
  return index >= 0 ? index + 1 : 1;
}
