"use client";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { registerConversion } from "@/entities/services/conversion";

export function useRegisterConversionMutation(
  options?: UseMutationOptions<void, Error, void>,
) {
  return useMutation({
    ...options,
    mutationFn: registerConversion,
  });
}
