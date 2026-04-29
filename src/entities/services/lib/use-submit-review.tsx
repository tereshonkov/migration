"use client";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { ReviewsTypes } from "@/entities/services/model/review";
import { sendReviewApi } from "@/entities/services/reviews";

export function useSubmitReviewMutation(
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof sendReviewApi>>,
    Error,
    ReviewsTypes
  >
) {
  return useMutation({
    ...options,
    mutationFn: sendReviewApi,
  });
}
