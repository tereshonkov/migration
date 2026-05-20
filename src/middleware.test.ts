// @vitest-environment node
import { NextRequest } from "next/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/middleware", () => ({
  default: () => () => new Response(null, { status: 200 }),
}));

import middleware from "./middleware";

describe("middleware legacy redirects", () => {
  it("redirects /product/:id to /service/:id", async () => {
    const req = new NextRequest(new URL("http://localhost/product/abc"));
    const res = await middleware(req);
    expect(res.status).toBe(301);
    expect(res.headers.get("location")).toBe("http://localhost/service/abc");
  });

  it("redirects /en/product/:id to /en/service/:id", async () => {
    const req = new NextRequest(new URL("http://localhost/en/product/abc"));
    const res = await middleware(req);
    expect(res.status).toBe(301);
    expect(res.headers.get("location")).toBe("http://localhost/en/service/abc");
  });

  it("redirects /uk/product/:id to /service/:id (default prefix stripped)", async () => {
    const req = new NextRequest(new URL("http://localhost/uk/product/abc"));
    const res = await middleware(req);
    expect(res.status).toBe(301);
    expect(res.headers.get("location")).toBe("http://localhost/service/abc");
  });

  it("redirects /blog to /", async () => {
    const req = new NextRequest(new URL("http://localhost/blog"));
    const res = await middleware(req);
    expect(res.status).toBe(301);
    expect(res.headers.get("location")).toBe("http://localhost/");
  });

  it("redirects /ru/blog to /ru", async () => {
    const req = new NextRequest(new URL("http://localhost/ru/blog"));
    const res = await middleware(req);
    expect(res.status).toBe(301);
    expect(res.headers.get("location")).toBe("http://localhost/ru");
  });

  it("redirects /uk to /", async () => {
    const req = new NextRequest(new URL("http://localhost/uk"));
    const res = await middleware(req);
    expect(res.status).toBe(301);
    expect(res.headers.get("location")).toBe("http://localhost/");
  });

  it("redirects /uk/contacts to /contacts", async () => {
    const req = new NextRequest(new URL("http://localhost/uk/contacts"));
    const res = await middleware(req);
    expect(res.status).toBe(301);
    expect(res.headers.get("location")).toBe("http://localhost/contacts");
  });
});
