import {
  getCatalogImageUrlByProductId,
  getCatalogRowById,
} from "@/shared/lib/productCatalog";

export type ResolvedGuideImage = {
  productId: number;
  url: string;
  title: string;
};

export function resolveGuideImages(ids: number[]): ResolvedGuideImage[] {
  const out: ResolvedGuideImage[] = [];
  for (const id of ids) {
    const row = getCatalogRowById(id);
    const url = getCatalogImageUrlByProductId(id);
    if (!row?.id || !url) continue;
    out.push({
      productId: row.id,
      url,
      title: row.title?.trim() || `Portfolio #${row.id}`,
    });
  }
  return out;
}
