// @vitest-environment node
import { describe, expect, it } from "vitest";
import { productQueryKeys } from "./query-keys";

describe("productQueryKeys", () => {
  it("builds stable list and detail keys", () => {
    expect(productQueryKeys.list()).toEqual(["product", "list"]);
    expect(productQueryKeys.detail("42")).toEqual(["product", "detail", "42"]);
    expect(productQueryKeys.all).toEqual(["product"]);
  });
});
