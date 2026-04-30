/**
 * Single source of truth for portfolio category URL segments vs product.category codes.
 * Segments are Latin lowercase + hyphens (ASCII).
 *
 * Category slugs transcribe localized phrases (Latin ASCII), not English marketing phrases.
 * Kitchen: «кухня на замовлення Харків» / «кухня на заказ Харьков».
 * Wardrobe: «шафа купе на замовлення Харків» / «шкаф купе на заказ Харьков».
 * Store / retail: «торгові меблі та стелажі на замовлення Харків» / «торговая мебель и стеллажи на заказ Харьков».
 * Bedroom: «меблі для спальні на замовлення Харків» / «мебель для спальни на заказ Харьков».
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

/** «шафа купе на замовлення Харків» → latin */
const WARDROBE_SLUG_UK_EN = "shafa-kupe-na-zamovlennia-kharkiv";

/** «шкаф купе на заказ Харьков» → latin */
const WARDROBE_SLUG_RU = "shkaf-kupe-na-zakaz-kharkov";

/** «торгові меблі та стелажі на замовлення Харків» → latin */
const STORE_SLUG_UK_EN = "torgovi-mebli-ta-stelazhi-na-zamovlennia-kharkiv";

/** «торговая мебель и стеллажи на заказ Харьков» → latin */
const STORE_SLUG_RU = "torgovaya-mebel-i-stellazhi-na-zakaz-kharkov";

/** «меблі для спальні на замовлення Харків» → latin */
const BEDROOM_SLUG_UK_EN = "mebli-dlia-spalni-na-zamovlennia-kharkiv";

/** «мебель для спальни на заказ Харьков» → latin */
const BEDROOM_SLUG_RU = "mebel-dlia-spalni-na-zakaz-kharkov";

/** Published slug per locale (transliterated phrases). */
const CATEGORY_SEGMENTS: Record<
  AppLocale,
  Partial<Record<ServiceCategoryCode, string>>
> = {
  uk: {
    KITCHEN: KITCHEN_SLUG_UK_EN,
    WARDROBE: WARDROBE_SLUG_UK_EN,
    STORE: STORE_SLUG_UK_EN,
    BEDROOM: BEDROOM_SLUG_UK_EN,
  },
  ru: {
    KITCHEN: KITCHEN_SLUG_RU,
    WARDROBE: WARDROBE_SLUG_RU,
    STORE: STORE_SLUG_RU,
    BEDROOM: BEDROOM_SLUG_RU,
  },
  en: {
    KITCHEN: KITCHEN_SLUG_UK_EN,
    WARDROBE: WARDROBE_SLUG_UK_EN,
    STORE: STORE_SLUG_UK_EN,
    BEDROOM: BEDROOM_SLUG_UK_EN,
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
