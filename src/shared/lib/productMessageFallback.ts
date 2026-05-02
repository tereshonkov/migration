import type { AppLocale } from "@/shared/lib/serviceCategories";
import type { ProductCopyStrings } from "@/shared/lib/productCopyMerge";
import en from "@/messages/en.json";
import ru from "@/messages/ru.json";
import uk from "@/messages/uk.json";

const BY_LOCALE: Record<AppLocale, Record<string, unknown>> = {
  uk: uk as Record<string, unknown>,
  ru: ru as Record<string, unknown>,
  en: en as Record<string, unknown>,
};

/** Reads legacy `data_<id>` entry from static message JSON (empty after cleanup). */
export function getMessageProductFallback(
  locale: AppLocale,
  productId: string,
): ProductCopyStrings {
  const messages = BY_LOCALE[locale];
  const key = `data_${productId}`;
  const raw = messages[key];
  if (!raw || typeof raw !== "object") return {};
  const e = raw as Record<string, unknown>;
  const title = typeof e.title === "string" ? e.title : undefined;
  const description =
    typeof e.description === "string" ? e.description : undefined;
  const titleSeo = typeof e.titleSeo === "string" ? e.titleSeo : undefined;
  return { title, description, titleSeo };
}
