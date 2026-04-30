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

  it("resolves WARDROBE slug per locale", () => {
    expect(
      resolveCategoryFromSlug("uk", "shafa-kupe-na-zamovlennia-kharkiv"),
    ).toBe("WARDROBE");
    expect(resolveCategoryFromSlug("ru", "shkaf-kupe-na-zakaz-kharkov")).toBe(
      "WARDROBE",
    );
    expect(
      resolveCategoryFromSlug("en", "shafa-kupe-na-zamovlennia-kharkiv"),
    ).toBe("WARDROBE");
  });

  it("resolves STORE and BEDROOM slug per locale", () => {
    expect(
      resolveCategoryFromSlug(
        "uk",
        "torgovi-mebli-ta-stelazhi-na-zamovlennia-kharkiv",
      ),
    ).toBe("STORE");
    expect(
      resolveCategoryFromSlug(
        "ru",
        "torgovaya-mebel-i-stellazhi-na-zakaz-kharkov",
      ),
    ).toBe("STORE");
    expect(
      resolveCategoryFromSlug(
        "en",
        "torgovi-mebli-ta-stelazhi-na-zamovlennia-kharkiv",
      ),
    ).toBe("STORE");

    expect(
      resolveCategoryFromSlug("uk", "mebli-dlia-spalni-na-zamovlennia-kharkiv"),
    ).toBe("BEDROOM");
    expect(
      resolveCategoryFromSlug("ru", "mebel-dlia-spalni-na-zakaz-kharkov"),
    ).toBe("BEDROOM");
    expect(
      resolveCategoryFromSlug("en", "mebli-dlia-spalni-na-zamovlennia-kharkiv"),
    ).toBe("BEDROOM");
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
    expect(getCategorySlug("uk", "WARDROBE")).toBe(
      "shafa-kupe-na-zamovlennia-kharkiv",
    );
    expect(getCategorySlug("ru", "WARDROBE")).toBe(
      "shkaf-kupe-na-zakaz-kharkov",
    );
    expect(getCategorySlug("en", "WARDROBE")).toBe(
      "shafa-kupe-na-zamovlennia-kharkiv",
    );
    expect(getCategorySlug("uk", "STORE")).toBe(
      "torgovi-mebli-ta-stelazhi-na-zamovlennia-kharkiv",
    );
    expect(getCategorySlug("ru", "STORE")).toBe(
      "torgovaya-mebel-i-stellazhi-na-zakaz-kharkov",
    );
    expect(getCategorySlug("en", "STORE")).toBe(
      "torgovi-mebli-ta-stelazhi-na-zamovlennia-kharkiv",
    );
    expect(getCategorySlug("uk", "BEDROOM")).toBe(
      "mebli-dlia-spalni-na-zamovlennia-kharkiv",
    );
    expect(getCategorySlug("ru", "BEDROOM")).toBe(
      "mebel-dlia-spalni-na-zakaz-kharkov",
    );
    expect(getCategorySlug("en", "BEDROOM")).toBe(
      "mebli-dlia-spalni-na-zamovlennia-kharkiv",
    );
  });

  it("tab id helpers align with Furniture order", () => {
    expect(tabIdFromCategory("KITCHEN")).toBe(1);
    expect(tabIdFromCategory("STORE")).toBe(3);
    expect(tabIdFromCategory("BEDROOM")).toBe(4);
    expect(categoryFromTabId(1)).toBe("KITCHEN");
    expect(categoryFromTabId(3)).toBe("STORE");
    expect(categoryFromTabId(4)).toBe("BEDROOM");
    expect(categoryFromTabId(5)).toBeUndefined();
  });
});
