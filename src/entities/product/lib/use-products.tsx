"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { useLocale } from "next-intl";
import type { CreateProductPayload } from "@/entities/product/model/type";
import type { AppLocale } from "@/shared/lib/serviceCategories";
import {
  createProduct,
  getProductById,
  getProducts,
} from "@/entities/product/api/product";
import { productQueryKeys } from "@/entities/product/model/query-keys";

export function useProductsQuery<
  TData = Awaited<ReturnType<typeof getProducts>>,
>(
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getProducts>>, Error, TData>,
    "queryKey" | "queryFn"
  >,
) {
  const locale = useLocale() as AppLocale;
  return useQuery({
    queryKey: productQueryKeys.list(locale),
    queryFn: () => getProducts(locale),
    ...options,
  });
}

export function useProductQuery<
  TData = Awaited<ReturnType<typeof getProductById>>,
>(
  id: string,
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getProductById>>, Error, TData>,
    "queryKey" | "queryFn"
  >,
) {
  const locale = useLocale() as AppLocale;
  return useQuery({
    queryKey: productQueryKeys.detail(id, locale),
    queryFn: () => getProductById(id, locale),
    enabled: Boolean(id),
    ...options,
  });
}

export function useCreateProductMutation(
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof createProduct>>,
    Error,
    CreateProductPayload
  >,
) {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: createProduct,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({
        queryKey: productQueryKeys.all,
      });
      await options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
