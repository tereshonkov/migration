"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  approveReviewApi,
  cancelReview,
  getReviews,
} from "@/entities/admin/api/reviews";
import { adminQueryKeys } from "@/entities/admin/model/query-keys";

export function useAdminReviewsQuery<
  TData = Awaited<ReturnType<typeof getReviews>>,
>(
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getReviews>>, Error, TData>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: adminQueryKeys.reviews(),
    queryFn: getReviews,
    ...options,
  });
}

export function useApproveReviewMutation(
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof approveReviewApi>>,
    Error,
    string
  >,
) {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: approveReviewApi,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({
        queryKey: adminQueryKeys.reviews(),
      });
      await options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useCancelReviewMutation(
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof cancelReview>>,
    Error,
    string
  >,
) {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: cancelReview,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({
        queryKey: adminQueryKeys.reviews(),
      });
      await options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
