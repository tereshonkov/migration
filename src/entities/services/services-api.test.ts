// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const { post } = vi.hoisted(() => ({ post: vi.fn() }));

vi.mock("@/shared/api/base", () => ({
  default: { post },
}));

import { registerConversion } from "./conversion";
import { sendMessageApi } from "./messages";
import { sendReviewApi } from "./reviews";
import { sendTelegramMessageApi } from "./telegram";

describe("entities/services API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("registerConversion POST /callclick/record", async () => {
    post.mockResolvedValue({ data: {} });
    await registerConversion();
    expect(post).toHaveBeenCalledWith("/callclick/record");
  });

  it("sendMessageApi POST /messages/send with body", async () => {
    const data = { name: "a", phone: "1", message: "m" };
    post.mockResolvedValue({ data: { ok: 1 } });
    const result = await sendMessageApi(data);
    expect(post).toHaveBeenCalledWith("/messages/send", data);
    expect(result).toEqual({ ok: 1 });
  });

  it("sendTelegramMessageApi POST /telegram/send-message", async () => {
    post.mockResolvedValue({ data: { sent: true } });
    const result = await sendTelegramMessageApi({ message: "hi" });
    expect(post).toHaveBeenCalledWith("/telegram/send-message", {
      message: "hi",
    });
    expect(result).toEqual({ sent: true });
  });

  it("sendReviewApi POST /reviews/create-review", async () => {
    const payload = {
      id: "1",
      name: "n",
      text: "t",
      isAproved: true,
    };
    post.mockResolvedValue({ data: { id: "1" } });
    const result = await sendReviewApi(payload);
    expect(post).toHaveBeenCalledWith("/reviews/create-review", payload);
    expect(result).toEqual({ id: "1" });
  });

  it("registerConversion logs and rethrows on failure", async () => {
    const err = new Error("click");
    post.mockRejectedValue(err);
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(registerConversion()).rejects.toBe(err);
    spy.mockRestore();
  });

  it("sendMessageApi logs and rethrows on failure", async () => {
    const err = new Error("smtp");
    post.mockRejectedValue(err);
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(
      sendMessageApi({ name: "a", phone: "1", message: "m" }),
    ).rejects.toBe(err);
    spy.mockRestore();
  });

  it("sendReviewApi logs and rethrows on failure", async () => {
    const err = new Error("rev");
    post.mockRejectedValue(err);
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(
      sendReviewApi({
        id: "1",
        name: "n",
        text: "t",
        isAproved: true,
      }),
    ).rejects.toBe(err);
    spy.mockRestore();
  });
});
