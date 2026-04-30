import { describe, expect, it } from "vitest";
import { resolvePortfolioSlug } from "./serviceSlug";

describe("resolvePortfolioSlug", () => {
  it("detects numeric product id", () => {
    expect(resolvePortfolioSlug("uk", "17")).toEqual({
      kind: "product",
      productId: "17",
    });
  });

  it("detects category slug per locale", () => {
    expect(
      resolvePortfolioSlug("uk", "kukhnia-na-zamovlennia-kharkiv"),
    ).toEqual({
      kind: "category",
      category: "KITCHEN",
    });
    expect(resolvePortfolioSlug("ru", "kuhnya-na-zakaz-kharkov")).toEqual({
      kind: "category",
      category: "KITCHEN",
    });
  });

  it("returns null for unknown segment", () => {
    expect(resolvePortfolioSlug("uk", "not-a-real-slug")).toBeNull();
  });
});
