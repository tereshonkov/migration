import { QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createTestQueryClient } from "@/test/query-client-wrapper";

vi.mock("next-intl", () => ({
  useLocale: () => "uk",
}));

const productApi = vi.hoisted(() => ({
  getProducts: vi.fn(),
  getProductById: vi.fn(),
  createProduct: vi.fn(),
}));

vi.mock("@/entities/product/api/product", () => ({
  getProducts: productApi.getProducts,
  getProductById: productApi.getProductById,
  createProduct: productApi.createProduct,
}));

import {
  useCreateProductMutation,
  useProductQuery,
  useProductsQuery,
} from "./use-products";

function wrapperFor(client: ReturnType<typeof createTestQueryClient>) {
  return function W({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
  };
}

describe("use-products hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("useProductsQuery resolves from getProducts", async () => {
    const client = createTestQueryClient();
    const data = [{ id: "1", title: "x", description: "", images: [] }];
    productApi.getProducts.mockResolvedValue(data);

    const { result } = renderHook(() => useProductsQuery(), {
      wrapper: wrapperFor(client),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(data);
    expect(productApi.getProducts).toHaveBeenCalledWith("uk");
  });

  it("useProductQuery is disabled when id is empty", () => {
    const client = createTestQueryClient();
    const { result } = renderHook(() => useProductQuery(""), {
      wrapper: wrapperFor(client),
    });

    expect(result.current.fetchStatus).toBe("idle");
    expect(productApi.getProductById).not.toHaveBeenCalled();
  });

  it("useCreateProductMutation calls createProduct and invalidates product queries", async () => {
    const client = createTestQueryClient();
    const payload = {
      title: "t",
      description: "d",
      images: [{ url: "u", isCover: true }],
    };
    productApi.createProduct.mockResolvedValue({ created: true });
    productApi.getProducts.mockResolvedValue([]);

    const invalidateSpy = vi.spyOn(client, "invalidateQueries");

    const { result } = renderHook(() => useCreateProductMutation(), {
      wrapper: wrapperFor(client),
    });

    result.current.mutate(payload);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(productApi.createProduct.mock.calls[0]?.[0]).toEqual(payload);
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ["product"],
    });
  });
});
