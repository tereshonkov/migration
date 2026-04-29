"use client";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { sendTelegramMessageApi } from "@/entities/services/telegram";

type SendTelegramPayload = Parameters<typeof sendTelegramMessageApi>[0];

export function useSendTelegramMessageMutation(
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof sendTelegramMessageApi>>,
    Error,
    SendTelegramPayload
  >,
) {
  return useMutation({
    ...options,
    mutationFn: sendTelegramMessageApi,
  });
}
