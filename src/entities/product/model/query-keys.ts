import type { AppLocale } from "@/shared/lib/serviceCategories";

export const productQueryKeys = {
  all: ["product"] as const,
  list: (locale: AppLocale) =>
    [...productQueryKeys.all, "list", locale] as const,
  detail: (id: string, locale: AppLocale) =>
    [...productQueryKeys.all, "detail", id, locale] as const,
};
