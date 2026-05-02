import type { AppLocale } from "@/shared/lib/serviceCategories";

export const reviewsQueryKeys = {
  all: ["reviews"] as const,
  slider: (locale: AppLocale) =>
    [...reviewsQueryKeys.all, "slider", locale] as const,
  list: () => [...reviewsQueryKeys.all, "list"] as const,
};
