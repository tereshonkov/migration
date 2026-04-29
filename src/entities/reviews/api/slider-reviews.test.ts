// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const { get } = vi.hoisted(() => ({ get: vi.fn() }));
const getProducts = vi.hoisted(() => vi.fn());

vi.mock("@/shared/api/base", () => ({
  default: { get },
}));

vi.mock("@/entities/product/api/product", () => ({
  getProducts,
}));

import { getSliderReviews } from "./slider-reviews";

describe("getSliderReviews", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("merges approved reviews with product cover or fallback", async () => {
    const reviews = [
      {
        id: "r1",
        isApproved: true,
        name: "User",
        productId: "10",
        text: "Great",
      },
      {
        id: "r2",
        isApproved: false,
        name: "Spam",
        productId: "10",
        text: "x",
      },
    ];
    const products = [
      {
        id: 10,
        title: "P",
        description: "",
        images: [
          { url: "cover.webp", id: "i1", isCover: true, productId: "10", reviewId: null },
        ],
      },
    ];
    get.mockResolvedValue({ data: reviews });
    getProducts.mockResolvedValue(products);

    const result = await getSliderReviews();

    expect(get).toHaveBeenCalledWith("/reviews");
    expect(getProducts).toHaveBeenCalledTimes(1);
    expect(result).toEqual([
      {
        id: "r1",
        name: "User",
        text: "Great",
        image: "cover.webp",
      },
    ]);
  });
});
