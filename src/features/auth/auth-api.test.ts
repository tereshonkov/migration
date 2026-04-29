// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const api = vi.hoisted(() => ({
  post: vi.fn(),
  get: vi.fn(),
}));

vi.mock("@/shared/api/base", () => ({
  default: api,
}));

import { login, logout, refreshToken } from "./api/auth";

describe("auth api", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const store: Record<string, string> = {};
    vi.stubGlobal("localStorage", {
      getItem: vi.fn((k: string) => store[k] ?? null),
      setItem: vi.fn((k: string, v: string) => {
        store[k] = v;
      }),
      clear: vi.fn(() => {
        for (const k of Object.keys(store)) delete store[k];
      }),
      removeItem: vi.fn(),
      key: vi.fn(),
      length: 0,
    });
  });

  it("login POST /auth/login with credentials", async () => {
    api.post.mockResolvedValue({ data: { token: "t" } });
    const r = await login("a@b.c", "secret");
    expect(api.post).toHaveBeenCalledWith(
      "/auth/login",
      { email: "a@b.c", password: "secret" },
      { withCredentials: true }
    );
    expect(r).toEqual({ token: "t" });
  });

  it("refreshToken GET /auth/refresh", async () => {
    api.get.mockResolvedValue({ data: { accessToken: "at" } });
    const token = await refreshToken();
    expect(api.get).toHaveBeenCalledWith("/auth/refresh", { withCredentials: true });
    expect(token).toBe("at");
  });

  it("logout POST /auth/logout and clears storage", async () => {
    api.post.mockResolvedValue({ data: { ok: true } });
    localStorage.setItem("token", "x");
    const r = await logout();
    expect(api.post).toHaveBeenCalledWith("/auth/logout", {}, { withCredentials: true });
    expect(localStorage.clear).toHaveBeenCalled();
    expect(r).toEqual({ ok: true });
  });

  it("login wraps api error in Error", async () => {
    api.post.mockRejectedValue(new Error("upstream"));
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(login("a@b.c", "x")).rejects.toThrow("upstream");
    spy.mockRestore();
  });

  it("login uses fallback message when error has no message", async () => {
    api.post.mockRejectedValue({});
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(login("a@b.c", "x")).rejects.toThrow("Ошибка входа");
    spy.mockRestore();
  });

  it("refreshToken wraps failure", async () => {
    api.get.mockRejectedValue(new Error("bad"));
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(refreshToken()).rejects.toThrow("bad");
    spy.mockRestore();
  });

  it("logout wraps failure without clearing storage when request throws", async () => {
    api.post.mockRejectedValue(new Error("net"));
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(logout()).rejects.toThrow("net");
    expect(localStorage.clear).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
