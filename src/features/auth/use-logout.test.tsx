import { QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createTestQueryClient } from "@/test/query-client-wrapper";

const authApi = vi.hoisted(() => ({
  logout: vi.fn(),
}));

vi.mock("@/features/auth/api/auth", () => authApi);

import { useLogoutMutation } from "./lib/use-logout";

function wrap(client: ReturnType<typeof createTestQueryClient>) {
  return function W({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
  };
}

describe("useLogoutMutation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls logout", async () => {
    const client = createTestQueryClient();
    authApi.logout.mockResolvedValue({});

    const { result } = renderHook(() => useLogoutMutation(), {
      wrapper: wrap(client),
    });
    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(authApi.logout).toHaveBeenCalledTimes(1);
  });
});
