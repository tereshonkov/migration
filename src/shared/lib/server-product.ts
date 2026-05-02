import type { Data } from "@/entities/product/model/type";
import type { AppLocale } from "@/shared/lib/serviceCategories";
import { getPublicApiBaseUrl } from "@/shared/lib/public-api-base-url";

/** Server-side fetch for RSC / metadata; returns null if URL missing or request fails. */
export async function fetchProductForLocale(
  id: string,
  locale: AppLocale,
): Promise<Data | null> {
  const base = getPublicApiBaseUrl();
  if (!base) return null;

  try {
    const url = `${base}/product/product/${encodeURIComponent(id)}?locale=${locale}`;
    const res = await fetch(url, { next: { revalidate: 120 } });
    if (!res.ok) return null;
    return (await res.json()) as Data;
  } catch {
    return null;
  }
}
