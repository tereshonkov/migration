// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const { get } = vi.hoisted(() => ({ get: vi.fn() }));

vi.mock("@/shared/api/base", () => ({
  default: { get },
}));

import { getAllReviews } from "./reviews-list";

describe("getAllReviews", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("GET /reviews and returns data", async () => {
    const data = [
      {
        id: "1",
        isApproved: true,
        name: "n",
        productId: "p",
        text: "t",
      },
    ];
    get.mockResolvedValue({ data });

    const result = await getAllReviews();

    expect(get).toHaveBeenCalledWith("/reviews");
    expect(result).toBe(data);
  });

  it("rejects when GET fails", async () => {
    get.mockRejectedValue(new Error("offline"));
    await expect(getAllReviews()).rejects.toThrow("offline");
  });
});
