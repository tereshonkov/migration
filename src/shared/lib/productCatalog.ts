import catalog from "@/../public/data/data.json";

export type CatalogRow = {
  id: number;
  image?: string;
  images?: string[];
};

const rows = catalog as CatalogRow[];

/** IDs from static portfolio JSON — used with `dynamicParams` for paths not listed at build time. */
export function getPortfolioProductIds(): number[] {
  return rows.map((row) => row.id);
}

/** Primary image URL for JSON-LD / OG (same source as ProductGallery). */
export function getCatalogPrimaryImageUrl(id: string): string | undefined {
  const n = Number.parseInt(id, 10);
  if (Number.isNaN(n)) return undefined;
  const item = rows.find((p) => p.id === n);
  if (!item) return undefined;
  return item.images?.[0] ?? item.image;
}
