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
    expect(
      resolvePortfolioSlug("uk", "shafa-kupe-na-zamovlennia-kharkiv"),
    ).toEqual({
      kind: "category",
      category: "WARDROBE",
    });
    expect(resolvePortfolioSlug("ru", "shkaf-kupe-na-zakaz-kharkov")).toEqual({
      kind: "category",
      category: "WARDROBE",
    });
    expect(
      resolvePortfolioSlug(
        "uk",
        "torgovi-mebli-ta-stelazhi-na-zamovlennia-kharkiv",
      ),
    ).toEqual({ kind: "category", category: "STORE" });
    expect(
      resolvePortfolioSlug("uk", "mebli-dlia-spalni-na-zamovlennia-kharkiv"),
    ).toEqual({ kind: "category", category: "BEDROOM" });
  });

  it("returns null for unknown segment", () => {
    expect(resolvePortfolioSlug("uk", "not-a-real-slug")).toBeNull();
  });
});
