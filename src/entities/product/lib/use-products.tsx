"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { CreateProductPayload } from "@/types/data";
import { createProduct, getProducts } from "@/entities/product/api/product";
import { productQueryKeys } from "@/entities/product/model/query-keys";

export function useProductsQuery<TData = Awaited<ReturnType<typeof getProducts>>>(
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getProducts>>, Error, TData>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: productQueryKeys.list(),
    queryFn: getProducts,
    ...options,
  });
}

export function useCreateProductMutation(
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof createProduct>>,
    Error,
    CreateProductPayload
  >
) {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: createProduct,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: productQueryKeys.list() });
      await options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
