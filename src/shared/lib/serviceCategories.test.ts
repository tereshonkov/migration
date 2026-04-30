import { describe, expect, it } from "vitest";
import {
  getCategorySlug,
  normalizeSegment,
  resolveCategoryFromSlug,
  tabIdFromCategory,
  categoryFromTabId,
} from "./serviceCategories";

describe("serviceCategories", () => {
  it("resolves KITCHEN slug per locale", () => {
    expect(
      resolveCategoryFromSlug("uk", "kukhnia-na-zamovlennia-kharkiv"),
    ).toBe("KITCHEN");
    expect(resolveCategoryFromSlug("ru", "kuhnya-na-zakaz-kharkov")).toBe(
      "KITCHEN",
    );
    expect(
      resolveCategoryFromSlug("en", "kukhnia-na-zamovlennia-kharkiv"),
    ).toBe("KITCHEN");
  });

  it("normalizes casing and percent-encoding", () => {
    expect(
      resolveCategoryFromSlug(
        "uk",
        encodeURIComponent("Kukhnia-Na-Zamovlennia-Kharkiv"),
      ),
    ).toBe("KITCHEN");
    expect(
      resolveCategoryFromSlug(
        "ru",
        encodeURIComponent("Kuhnya-Na-Zakaz-Kharkov"),
      ),
    ).toBe("KITCHEN");
    expect(normalizeSegment("  %6b%69%74%63%68%65%6e  ")).toBe("kitchen");
  });

  it("returns undefined for unknown slug", () => {
    expect(resolveCategoryFromSlug("ru", "шкаф-купе")).toBeUndefined();
    expect(resolveCategoryFromSlug("ru", "")).toBeUndefined();
  });

  it("getCategorySlug mirrors configured segments", () => {
    expect(getCategorySlug("uk", "KITCHEN")).toBe(
      "kukhnia-na-zamovlennia-kharkiv",
    );
    expect(getCategorySlug("ru", "KITCHEN")).toBe("kuhnya-na-zakaz-kharkov");
    expect(getCategorySlug("en", "KITCHEN")).toBe(
      "kukhnia-na-zamovlennia-kharkiv",
    );
    expect(getCategorySlug("ru", "WARDROBE")).toBeUndefined();
  });

  it("tab id helpers align with Furniture order", () => {
    expect(tabIdFromCategory("KITCHEN")).toBe(1);
    expect(categoryFromTabId(1)).toBe("KITCHEN");
    expect(categoryFromTabId(5)).toBeUndefined();
  });
});
