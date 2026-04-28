"use client";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { uploadImage } from "@/entities/admin/api/images";

export function useUploadImageMutation(
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof uploadImage>>,
    Error,
    FormData
  >
) {
  return useMutation({
    ...options,
    mutationFn: uploadImage,
  });
}
