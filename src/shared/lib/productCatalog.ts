import catalog from "@/../public/data/data.json";

export type CatalogRow = {
  id: number;
  title?: string;
  image?: string;
  images?: string[];
  categories?: string[];
};

const rows = catalog as CatalogRow[];

export function getCatalogRowById(id: number): CatalogRow | undefined {
  if (!Number.isFinite(id)) return undefined;
  return rows.find((p) => p.id === id);
}

/** Resolved cover URL from static portfolio JSON (matches card gallery behaviour). */
export function getCatalogImageUrlByProductId(id: number): string | undefined {
  const row = getCatalogRowById(id);
  if (!row) return undefined;
  return row.images?.[0] ?? row.image;
}

/** IDs from static portfolio JSON — used with `dynamicParams` for paths not listed at build time. */
export function getPortfolioProductIds(): number[] {
  return rows.map((row) => row.id);
}

/** Primary image URL for JSON-LD / OG (same source as ProductGallery). */
export function getCatalogPrimaryImageUrl(id: string): string | undefined {
  const n = Number.parseInt(id, 10);
  if (Number.isNaN(n)) return undefined;
  return getCatalogImageUrlByProductId(n);
}
