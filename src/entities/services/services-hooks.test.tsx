import { QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createTestQueryClient } from "@/test/query-client-wrapper";

const svc = vi.hoisted(() => ({
  sendReviewApi: vi.fn(),
  sendMessageApi: vi.fn(),
  sendTelegramMessageApi: vi.fn(),
  registerConversion: vi.fn(),
}));

vi.mock("@/entities/services/reviews", () => ({
  sendReviewApi: svc.sendReviewApi,
}));

vi.mock("@/entities/services/messages", () => ({
  sendMessageApi: svc.sendMessageApi,
}));

vi.mock("@/entities/services/telegram", () => ({
  sendTelegramMessageApi: svc.sendTelegramMessageApi,
}));

vi.mock("@/entities/services/conversion", () => ({
  registerConversion: svc.registerConversion,
}));

import { useRegisterConversionMutation } from "./lib/use-conversion";
import { useSendContactMessageMutation } from "./lib/use-contact-messages";
import { useSubmitReviewMutation } from "./lib/use-submit-review";
import { useSendTelegramMessageMutation } from "./lib/use-telegram-message";

function wrap(client: ReturnType<typeof createTestQueryClient>) {
  return function W({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  };
}

describe("services mutations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("useSubmitReviewMutation calls sendReviewApi", async () => {
    const client = createTestQueryClient();
    svc.sendReviewApi.mockResolvedValue({ ok: true });
    const payload = { id: "1", name: "n", text: "t", isAproved: true };

    const { result } = renderHook(() => useSubmitReviewMutation(), {
      wrapper: wrap(client),
    });
    result.current.mutate(payload);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(svc.sendReviewApi.mock.calls[0]?.[0]).toEqual(payload);
  });

  it("useSendContactMessageMutation calls sendMessageApi", async () => {
    const client = createTestQueryClient();
    const payload = { name: "a", phone: "1", message: "x" };
    svc.sendMessageApi.mockResolvedValue({});

    const { result } = renderHook(() => useSendContactMessageMutation(), {
      wrapper: wrap(client),
    });
    result.current.mutate(payload);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(svc.sendMessageApi.mock.calls[0]?.[0]).toEqual(payload);
  });

  it("useSendTelegramMessageMutation calls sendTelegramMessageApi", async () => {
    const client = createTestQueryClient();
    svc.sendTelegramMessageApi.mockResolvedValue({});

    const { result } = renderHook(() => useSendTelegramMessageMutation(), {
      wrapper: wrap(client),
    });
    result.current.mutate({ message: "m" });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(svc.sendTelegramMessageApi.mock.calls[0]?.[0]).toEqual({
      message: "m",
    });
  });

  it("useRegisterConversionMutation calls registerConversion", async () => {
    const client = createTestQueryClient();
    svc.registerConversion.mockResolvedValue(undefined);

    const { result } = renderHook(() => useRegisterConversionMutation(), {
      wrapper: wrap(client),
    });
    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(svc.registerConversion).toHaveBeenCalledTimes(1);
  });
});
