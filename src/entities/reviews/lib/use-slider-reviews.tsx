"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getSliderReviews } from "@/entities/reviews/api/slider-reviews";
import { reviewsQueryKeys } from "@/entities/reviews/model/query-keys";

export function useSliderReviewsQuery<
  TData = Awaited<ReturnType<typeof getSliderReviews>>,
>(
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getSliderReviews>>, Error, TData>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: reviewsQueryKeys.slider(),
    queryFn: getSliderReviews,
    staleTime: 120 * 1000,
    ...options,
  });
}
