"use client";

import {
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { getUsers } from "@/entities/admin/api/users";
import { adminQueryKeys } from "@/entities/admin/model/query-keys";

export function useAdminUsersQuery<TData = Awaited<ReturnType<typeof getUsers>>>(
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error, TData>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: adminQueryKeys.users(),
    queryFn: getUsers,
    ...options,
  });
}
