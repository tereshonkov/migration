// @vitest-environment node
import { describe, expect, it } from "vitest";
import { reviewsQueryKeys } from "./query-keys";

describe("reviewsQueryKeys", () => {
  it("builds list and slider keys", () => {
    expect(reviewsQueryKeys.list()).toEqual(["reviews", "list"]);
    expect(reviewsQueryKeys.slider("uk")).toEqual(["reviews", "slider", "uk"]);
    expect(reviewsQueryKeys.all).toEqual(["reviews"]);
  });
});
