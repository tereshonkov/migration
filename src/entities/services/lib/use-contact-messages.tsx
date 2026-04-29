"use client";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { sendMessageApi } from "@/entities/services/messages";

type SendPayload = Parameters<typeof sendMessageApi>[0];

export function useSendContactMessageMutation(
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof sendMessageApi>>,
    Error,
    SendPayload
  >,
) {
  return useMutation({
    ...options,
    mutationFn: sendMessageApi,
  });
}
