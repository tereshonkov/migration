import { QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createTestQueryClient } from "@/test/query-client-wrapper";

const reviewsApi = vi.hoisted(() => ({
  getAllReviews: vi.fn(),
  getSliderReviews: vi.fn(),
}));

vi.mock("@/entities/reviews/api/reviews-list", () => ({
  getAllReviews: reviewsApi.getAllReviews,
}));

vi.mock("@/entities/reviews/api/slider-reviews", () => ({
  getSliderReviews: reviewsApi.getSliderReviews,
}));

import { useAllReviewsQuery } from "./use-reviews-list";
import { useSliderReviewsQuery } from "./use-slider-reviews";

function wrap(client: ReturnType<typeof createTestQueryClient>) {
  return function W({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  };
}

describe("useAllReviewsQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads via getAllReviews", async () => {
    const client = createTestQueryClient();
    const data = [] as Awaited<ReturnType<typeof reviewsApi.getAllReviews>>;
    reviewsApi.getAllReviews.mockResolvedValue(data);

    const { result } = renderHook(() => useAllReviewsQuery(), {
      wrapper: wrap(client),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(reviewsApi.getAllReviews).toHaveBeenCalledTimes(1);
  });
});

describe("useSliderReviewsQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads via getSliderReviews", async () => {
    const client = createTestQueryClient();
    reviewsApi.getSliderReviews.mockResolvedValue([]);

    const { result } = renderHook(() => useSliderReviewsQuery(), {
      wrapper: wrap(client),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(reviewsApi.getSliderReviews).toHaveBeenCalledTimes(1);
  });
});
