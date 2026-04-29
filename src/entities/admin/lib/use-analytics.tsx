"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import {
  getAnalitycsDay,
  getAnalitycsMonth,
  getAnalitycsWeek,
  getCallClick,
  getPageVisits,
} from "@/entities/admin/api/analitycs";
import { adminQueryKeys } from "@/entities/admin/model/query-keys";

export function useAnalyticsDayQuery<
  TData = Awaited<ReturnType<typeof getAnalitycsDay>>,
>(
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getAnalitycsDay>>, Error, TData>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: adminQueryKeys.analytics.day(),
    queryFn: getAnalitycsDay,
    ...options,
  });
}

export function useAnalyticsWeekQuery<
  TData = Awaited<ReturnType<typeof getAnalitycsWeek>>,
>(
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getAnalitycsWeek>>, Error, TData>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: adminQueryKeys.analytics.week(),
    queryFn: getAnalitycsWeek,
    ...options,
  });
}

export function useAnalyticsMonthQuery<
  TData = Awaited<ReturnType<typeof getAnalitycsMonth>>,
>(
  options?: Omit<
    UseQueryOptions<
      Awaited<ReturnType<typeof getAnalitycsMonth>>,
      Error,
      TData
    >,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: adminQueryKeys.analytics.month(),
    queryFn: getAnalitycsMonth,
    ...options,
  });
}

export function useCallClickQuery<
  TData = Awaited<ReturnType<typeof getCallClick>>,
>(
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getCallClick>>, Error, TData>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: adminQueryKeys.analytics.callClick(),
    queryFn: getCallClick,
    ...options,
  });
}

export function usePageVisitsQuery<
  TData = Awaited<ReturnType<typeof getPageVisits>>,
>(
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getPageVisits>>, Error, TData>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: adminQueryKeys.analytics.pageVisits(),
    queryFn: getPageVisits,
    ...options,
  });
}
