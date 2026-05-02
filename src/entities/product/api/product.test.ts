// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { CreateProductPayload } from "@/entities/product/model/type";

const { get, post } = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
}));

vi.mock("@/shared/api/base", () => ({
  default: { get, post },
}));

import { createProduct, getProductById, getProducts } from "./product";

describe("product api", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getProducts calls GET /product/products with locale", async () => {
    const data = [{ id: "1", title: "x", description: "", images: [] }];
    get.mockResolvedValue({ data });

    const result = await getProducts("uk");

    expect(get).toHaveBeenCalledWith("/product/products", {
      params: { locale: "uk" },
    });
    expect(result).toBe(data);
  });

  it("getProductById calls GET with id and locale", async () => {
    const one = { id: "1", title: "a", description: "", images: [] };
    get.mockResolvedValue({ data: one });

    const result = await getProductById("7", "en");

    expect(get).toHaveBeenCalledWith("/product/product/7", {
      params: { locale: "en" },
    });
    expect(result).toBe(one);
  });

  it("createProduct POSTs payload", async () => {
    const payload = {
      title: "t",
      description: "d",
      images: [{ url: "u", isCover: true }],
    } satisfies CreateProductPayload;
    post.mockResolvedValue({ data: { ok: true } });

    const result = await createProduct(payload);

    expect(post).toHaveBeenCalledWith("/product/create-product", payload);
    expect(result).toEqual({ ok: true });
  });

  it("getProducts logs and rethrows on failure", async () => {
    const err = new Error("network");
    get.mockRejectedValue(err);
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(getProducts("ru")).rejects.toBe(err);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("getProductById logs and rethrows on failure", async () => {
    const err = new Error("fail");
    get.mockRejectedValue(err);
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(getProductById("1", "uk")).rejects.toBe(err);
    spy.mockRestore();
  });

  it("createProduct logs and rethrows on failure", async () => {
    const err = new Error("fail");
    post.mockRejectedValue(err);
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const payload = {
      title: "t",
      description: "d",
      images: [],
    } satisfies CreateProductPayload;
    await expect(createProduct(payload)).rejects.toBe(err);
    spy.mockRestore();
  });
});
