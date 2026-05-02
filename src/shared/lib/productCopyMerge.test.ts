// @vitest-environment node
import { describe, expect, it } from "vitest";
import { mergeProductCopy } from "./productCopyMerge";

describe("mergeProductCopy", () => {
  it("prefers API when both set", () => {
    expect(
      mergeProductCopy(
        { title: "A", description: "B", titleSeo: "S" },
        { title: "X", description: "Y", titleSeo: "Z" },
      ),
    ).toEqual({ title: "A", description: "B", titleSeo: "S" });
  });

  it("falls back per field", () => {
    expect(
      mergeProductCopy(
        { title: "  ", description: "" },
        { title: "F", description: "G", titleSeo: "H" },
      ),
    ).toEqual({ title: "F", description: "G", titleSeo: "H" });
  });

  it("uses title when titleSeo missing", () => {
    expect(mergeProductCopy({ title: "T", description: "D" }, {})).toEqual({
      title: "T",
      description: "D",
      titleSeo: "T",
    });
  });
});
