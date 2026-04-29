// @vitest-environment node
import { describe, expect, it } from "vitest";
import { reviewsQueryKeys } from "./query-keys";

describe("reviewsQueryKeys", () => {
  it("builds list and slider keys", () => {
    expect(reviewsQueryKeys.list()).toEqual(["reviews", "list"]);
    expect(reviewsQueryKeys.slider()).toEqual(["reviews", "slider"]);
    expect(reviewsQueryKeys.all).toEqual(["reviews"]);
  });
});
