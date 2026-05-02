/** Plain strings used when merging API product copy with message fallback. */
export type ProductCopyStrings = {
  title?: string | null;
  description?: string | null;
  titleSeo?: string | null;
};

/** Prefer API fields when non-empty; otherwise message JSON (`data_<id>`). */
export function mergeProductCopy(
  api: ProductCopyStrings,
  messagesFallback: ProductCopyStrings,
): { title: string; description: string; titleSeo: string } {
  const title = api.title?.trim() || messagesFallback.title?.trim() || "";
  const description =
    api.description?.trim() || messagesFallback.description?.trim() || "";
  const titleSeoRaw = api.titleSeo?.trim() || messagesFallback.titleSeo?.trim();
  const titleSeo = titleSeoRaw?.length ? titleSeoRaw : title;
  return { title, description, titleSeo };
}
