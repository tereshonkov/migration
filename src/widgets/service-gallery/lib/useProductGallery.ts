"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useProductQuery } from "@/entities/product/lib/use-products";

export function useProductGallery(productId: string) {
  const { data, isPending, isError } = useProductQuery(productId);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageUrls = useMemo(
    () => (data?.images ?? []).map((img) => img.url),
    [data?.images],
  );

  useEffect(() => {
    setCurrentIndex(0);
  }, [productId, data?.id]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      if (imageUrls.length === 0) return 0;
      return (prev + 1) % imageUrls.length;
    });
  }, [imageUrls.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      if (imageUrls.length === 0) return 0;
      return (prev - 1 + imageUrls.length) % imageUrls.length;
    });
  }, [imageUrls.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return {
    data,
    imageUrls,
    currentIndex,
    isPending,
    isError,
    nextSlide,
    prevSlide,
    goToSlide,
  };
}
