"use client";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { logout } from "@/features/auth/api/auth";

export function useLogoutMutation(
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof logout>>,
    Error,
    void
  >
) {
  return useMutation({
    ...options,
    mutationFn: () => logout(),
  });
}
