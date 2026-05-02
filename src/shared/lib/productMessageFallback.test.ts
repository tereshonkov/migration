// @vitest-environment node
import { describe, expect, it } from "vitest";
import { getMessageProductFallback } from "./productMessageFallback";

describe("getMessageProductFallback", () => {
  it("returns empty for unknown product id", () => {
    expect(getMessageProductFallback("uk", "__nonexistent_id__")).toEqual({});
  });
});
