"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { getMessages, markMessageAsRead } from "@/entities/admin/api/messages";
import { adminQueryKeys } from "@/entities/admin/model/query-keys";

export function useAdminMessagesQuery<
  TData = Awaited<ReturnType<typeof getMessages>>,
>(
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getMessages>>, Error, TData>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: adminQueryKeys.messages(),
    queryFn: getMessages,
    ...options,
  });
}

export function useMarkMessageReadMutation(
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof markMessageAsRead>>,
    Error,
    string
  >,
) {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: markMessageAsRead,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({
        queryKey: adminQueryKeys.messages(),
      });
      await options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
