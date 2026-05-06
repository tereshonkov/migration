/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

const refreshToken = vi.fn();

vi.mock("@/features/auth/api/auth", () => ({
  refreshToken,
  login: vi.fn(),
  logout: vi.fn(),
}));

const ctx = vi.hoisted(() => {
  const state = {
    requestOnFulfilled: null as ((config: Req) => Req) | null,
    responseOnRejected: null as ((error: unknown) => unknown) | null,
  };
  type Req = {
    headers?: Record<string, string>;
    _retry?: boolean;
    url?: string;
  };

  const instance = vi.fn();

  Object.assign(instance, {
    interceptors: {
      request: {
        use: (onFulfilled: (c: Req) => Req) => {
          state.requestOnFulfilled = onFulfilled;
        },
      },
      response: {
        use: (_onOk: unknown, onRejected: (e: unknown) => unknown) => {
          state.responseOnRejected = onRejected;
        },
      },
    },
  });

  return { state, instance };
});

vi.mock("axios", () => ({
  default: {
    create: vi.fn(() => ctx.instance),
  },
}));

import api from "./base";

describe("shared api base interceptors", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    refreshToken.mockReset();
    ctx.instance.mockReset();
    localStorage.clear();
  });

  it("exports the axios instance returned by create", () => {
    expect(api).toBe(ctx.instance);
    expect(ctx.state.requestOnFulfilled).toBeTypeOf("function");
    expect(ctx.state.responseOnRejected).toBeTypeOf("function");
  });

  it("request: adds Authorization Bearer when token exists", () => {
    localStorage.setItem("token", "tok");
    const config = { headers: {} as Record<string, string> };
    const out = ctx.state.requestOnFulfilled!(config);
    expect(out.headers?.Authorization).toBe("Bearer tok");
  });

  it("request: leaves headers without Authorization when no token", () => {
    const config = { headers: {} as Record<string, string> };
    const out = ctx.state.requestOnFulfilled!(config);
    expect(out.headers?.Authorization).toBeUndefined();
  });

  it("response: on 401 refreshes token, saves it, retries with new header", async () => {
    localStorage.setItem("token", "old");
    refreshToken.mockResolvedValue("newtok");

    const originalRequest: {
      headers: Record<string, string>;
      url: string;
      _retry?: boolean;
    } = {
      headers: {},
      url: "/x",
    };
    const error = {
      response: { status: 401 },
      config: originalRequest,
    };

    ctx.instance.mockResolvedValueOnce({ data: "retried" });

    const p = ctx.state.responseOnRejected!(error) as Promise<{ data: string }>;
    const result = await p;

    expect(refreshToken).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem("token")).toBe("newtok");
    expect(originalRequest._retry).toBe(true);
    expect(originalRequest.headers.Authorization).toBe("Bearer newtok");
    expect(ctx.instance).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ data: "retried" });
  });

  it("response: 401 without new token rejects original error", async () => {
    refreshToken.mockResolvedValue(undefined as unknown as string);
    const originalRequest = { headers: {} as Record<string, string> };
    const error = { response: { status: 401 }, config: originalRequest };

    const p = ctx.state.responseOnRejected!(error) as Promise<unknown>;
    await expect(p).rejects.toBe(error);
    expect(ctx.instance).not.toHaveBeenCalled();
  });

  it("response: 401 when already retried rejects without refresh", async () => {
    const originalRequest = {
      _retry: true,
      headers: {} as Record<string, string>,
    };
    const error = { response: { status: 401 }, config: originalRequest };

    const p = ctx.state.responseOnRejected!(error) as Promise<unknown>;
    await expect(p).rejects.toBe(error);
    expect(refreshToken).not.toHaveBeenCalled();
  });

  it("response: non-401 rejects immediately", async () => {
    const error = { response: { status: 500 }, config: {} };
    const p = ctx.state.responseOnRejected!(error) as Promise<unknown>;
    await expect(p).rejects.toBe(error);
    expect(refreshToken).not.toHaveBeenCalled();
  });

  it("response: refresh failure propagates", async () => {
    refreshToken.mockRejectedValue(new Error("refresh failed"));
    const originalRequest = { headers: {} as Record<string, string> };
    const error = { response: { status: 401 }, config: originalRequest };

    const p = ctx.state.responseOnRejected!(error) as Promise<unknown>;
    await expect(p).rejects.toThrow("refresh failed");
  });
});
