// @vitest-environment node
import { describe, expect, it } from "vitest";
import { productQueryKeys } from "./query-keys";

describe("productQueryKeys", () => {
  it("builds stable list and detail keys with locale", () => {
    expect(productQueryKeys.list("uk")).toEqual(["product", "list", "uk"]);
    expect(productQueryKeys.detail("42", "ru")).toEqual([
      "product",
      "detail",
      "42",
      "ru",
    ]);
    expect(productQueryKeys.all).toEqual(["product"]);
  });
});
