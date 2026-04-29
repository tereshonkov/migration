"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getAllReviews } from "@/entities/reviews/api/reviews-list";
import { reviewsQueryKeys } from "@/entities/reviews/model/query-keys";

export function useAllReviewsQuery<TData = Awaited<ReturnType<typeof getAllReviews>>>(
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getAllReviews>>, Error, TData>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: reviewsQueryKeys.list(),
    queryFn: getAllReviews,
    ...options,
  });
}
