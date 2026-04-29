// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const api = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
}));

vi.mock("@/shared/api/base", () => ({
  default: api,
}));

import {
  getAnalitycsDay,
  getAnalitycsMonth,
  getAnalitycsWeek,
  getCallClick,
  getPageVisits,
} from "./api/analitycs";
import { uploadImage } from "./api/images";
import { getMessages, markMessageAsRead } from "./api/messages";
import { approveReviewApi, cancelReview, getReviews } from "./api/reviews";
import { getUsers } from "./api/users";

describe("admin API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getUsers GET /user/users", async () => {
    api.get.mockResolvedValue({ data: [{ id: 1 }] });
    const r = await getUsers();
    expect(api.get).toHaveBeenCalledWith("/user/users");
    expect(r).toEqual([{ id: 1 }]);
  });

  it("getMessages GET /messages", async () => {
    api.get.mockResolvedValue({ data: [] });
    await getMessages();
    expect(api.get).toHaveBeenCalledWith("/messages");
  });

  it("markMessageAsRead PATCH /messages/read/:id", async () => {
    api.patch.mockResolvedValue({ data: { ok: true } });
    await markMessageAsRead("5");
    expect(api.patch).toHaveBeenCalledWith("/messages/read/5");
  });

  it("getReviews GET /reviews/not-approved-reviews", async () => {
    api.get.mockResolvedValue({ data: [] });
    await getReviews();
    expect(api.get).toHaveBeenCalledWith("/reviews/not-approved-reviews");
  });

  it("approveReviewApi POST /reviews/approve-review/:id", async () => {
    api.post.mockResolvedValue({ data: {} });
    await approveReviewApi("9");
    expect(api.post).toHaveBeenCalledWith("/reviews/approve-review/9");
  });

  it("cancelReview DELETE /reviews/delete-review/:id", async () => {
    api.delete.mockResolvedValue({ data: {} });
    await cancelReview("9");
    expect(api.delete).toHaveBeenCalledWith("/reviews/delete-review/9");
  });

  it("uploadImage POST /images/upload with FormData", async () => {
    const fd = new FormData();
    api.post.mockResolvedValue({ data: { url: "x" } });
    await uploadImage(fd);
    expect(api.post).toHaveBeenCalledWith("/images/upload", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  });

  it("analytics endpoints", async () => {
    api.get.mockResolvedValue({ data: {} });
    await getAnalitycsDay();
    expect(api.get).toHaveBeenCalledWith("/analitycs/day");
    await getAnalitycsWeek();
    expect(api.get).toHaveBeenCalledWith("/analitycs/week");
    await getAnalitycsMonth();
    expect(api.get).toHaveBeenCalledWith("/analitycs/month");
    await getCallClick();
    expect(api.get).toHaveBeenCalledWith("/callclick");
    await getPageVisits();
    expect(api.get).toHaveBeenCalledWith("/analitycs/pageviews");
  });

  it("getUsers logs and rethrows on failure", async () => {
    const err = new Error("db");
    api.get.mockRejectedValue(err);
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(getUsers()).rejects.toBe(err);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("markMessageAsRead logs and rethrows on failure", async () => {
    const err = new Error("patch");
    api.patch.mockRejectedValue(err);
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(markMessageAsRead("1")).rejects.toBe(err);
    spy.mockRestore();
  });

  it("approveReviewApi logs and rethrows on failure", async () => {
    const err = new Error("no");
    api.post.mockRejectedValue(err);
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(approveReviewApi("9")).rejects.toBe(err);
    spy.mockRestore();
  });
});
