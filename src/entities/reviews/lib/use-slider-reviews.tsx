"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { getSliderReviews } from "@/entities/reviews/api/slider-reviews";
import { reviewsQueryKeys } from "@/entities/reviews/model/query-keys";
import type { AppLocale } from "@/shared/lib/serviceCategories";

export function useSliderReviewsQuery<
  TData = Awaited<ReturnType<typeof getSliderReviews>>,
>(
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getSliderReviews>>, Error, TData>,
    "queryKey" | "queryFn"
  >,
) {
  const locale = useLocale() as AppLocale;
  return useQuery({
    queryKey: reviewsQueryKeys.slider(locale),
    queryFn: () => getSliderReviews(locale),
    staleTime: 120 * 1000,
    ...options,
  });
}
