import { QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createTestQueryClient } from "@/test/query-client-wrapper";

const usersApi = vi.hoisted(() => ({ getUsers: vi.fn() }));
vi.mock("@/entities/admin/api/users", () => usersApi);

const messagesApi = vi.hoisted(() => ({
  getMessages: vi.fn(),
  markMessageAsRead: vi.fn(),
}));
vi.mock("@/entities/admin/api/messages", () => messagesApi);

const reviewsAdminApi = vi.hoisted(() => ({
  getReviews: vi.fn(),
  approveReviewApi: vi.fn(),
  cancelReview: vi.fn(),
}));
vi.mock("@/entities/admin/api/reviews", () => reviewsAdminApi);

const imagesApi = vi.hoisted(() => ({ uploadImage: vi.fn() }));
vi.mock("@/entities/admin/api/images", () => imagesApi);

const analyticsApi = vi.hoisted(() => ({
  getAnalitycsDay: vi.fn(),
  getAnalitycsWeek: vi.fn(),
  getAnalitycsMonth: vi.fn(),
  getCallClick: vi.fn(),
  getPageVisits: vi.fn(),
}));
vi.mock("@/entities/admin/api/analitycs", () => analyticsApi);

import {
  useAnalyticsDayQuery,
  useAnalyticsMonthQuery,
  useAnalyticsWeekQuery,
  useCallClickQuery,
  usePageVisitsQuery,
} from "./lib/use-analytics";
import {
  useAdminMessagesQuery,
  useMarkMessageReadMutation,
} from "./lib/use-messages";
import {
  useAdminReviewsQuery,
  useApproveReviewMutation,
  useCancelReviewMutation,
} from "./lib/use-reviews";
import { useUploadImageMutation } from "./lib/use-images";
import { useAdminUsersQuery } from "./lib/use-users";

function wrap(client: ReturnType<typeof createTestQueryClient>) {
  return function W({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
  };
}

describe("admin hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("useAdminUsersQuery", async () => {
    const client = createTestQueryClient();
    usersApi.getUsers.mockResolvedValue([]);
    const { result } = renderHook(() => useAdminUsersQuery(), {
      wrapper: wrap(client),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(usersApi.getUsers).toHaveBeenCalled();
  });

  it("useAdminMessagesQuery", async () => {
    const client = createTestQueryClient();
    messagesApi.getMessages.mockResolvedValue([]);
    const { result } = renderHook(() => useAdminMessagesQuery(), {
      wrapper: wrap(client),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it("useMarkMessageReadMutation invalidates messages", async () => {
    const client = createTestQueryClient();
    messagesApi.markMessageAsRead.mockResolvedValue({});
    const spy = vi.spyOn(client, "invalidateQueries");

    const { result } = renderHook(() => useMarkMessageReadMutation(), {
      wrapper: wrap(client),
    });
    result.current.mutate("1");

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(spy).toHaveBeenCalled();
  });

  it("useAdminReviewsQuery", async () => {
    const client = createTestQueryClient();
    reviewsAdminApi.getReviews.mockResolvedValue([]);
    const { result } = renderHook(() => useAdminReviewsQuery(), {
      wrapper: wrap(client),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it("useApproveReviewMutation", async () => {
    const client = createTestQueryClient();
    reviewsAdminApi.approveReviewApi.mockResolvedValue({});
    const { result } = renderHook(() => useApproveReviewMutation(), {
      wrapper: wrap(client),
    });
    result.current.mutate("2");
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(reviewsAdminApi.approveReviewApi.mock.calls[0]?.[0]).toBe("2");
  });

  it("useCancelReviewMutation", async () => {
    const client = createTestQueryClient();
    reviewsAdminApi.cancelReview.mockResolvedValue({});
    const { result } = renderHook(() => useCancelReviewMutation(), {
      wrapper: wrap(client),
    });
    result.current.mutate("3");
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(reviewsAdminApi.cancelReview.mock.calls[0]?.[0]).toBe("3");
  });

  it("useUploadImageMutation", async () => {
    const client = createTestQueryClient();
    imagesApi.uploadImage.mockResolvedValue({ url: "u" });
    const fd = new FormData();
    const { result } = renderHook(() => useUploadImageMutation(), {
      wrapper: wrap(client),
    });
    result.current.mutate(fd);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(imagesApi.uploadImage.mock.calls[0]?.[0]).toBe(fd);
  });

  it("useAnalyticsDayQuery and useCallClickQuery", async () => {
    const client = createTestQueryClient();
    analyticsApi.getAnalitycsDay.mockResolvedValue({});
    analyticsApi.getCallClick.mockResolvedValue({});

    const day = renderHook(() => useAnalyticsDayQuery(), {
      wrapper: wrap(client),
    });
    await waitFor(() => expect(day.result.current.isSuccess).toBe(true));

    const cc = renderHook(() => useCallClickQuery(), { wrapper: wrap(client) });
    await waitFor(() => expect(cc.result.current.isSuccess).toBe(true));

    expect(analyticsApi.getAnalitycsDay).toHaveBeenCalled();
    expect(analyticsApi.getCallClick).toHaveBeenCalled();
  });

  it("analytics week, month, page visits queries", async () => {
    const client = createTestQueryClient();
    analyticsApi.getAnalitycsWeek.mockResolvedValue({ w: 1 });
    analyticsApi.getAnalitycsMonth.mockResolvedValue({ m: 1 });
    analyticsApi.getPageVisits.mockResolvedValue({ p: 1 });

    const week = renderHook(() => useAnalyticsWeekQuery(), {
      wrapper: wrap(client),
    });
    await waitFor(() => expect(week.result.current.isSuccess).toBe(true));

    const month = renderHook(() => useAnalyticsMonthQuery(), {
      wrapper: wrap(client),
    });
    await waitFor(() => expect(month.result.current.isSuccess).toBe(true));

    const pv = renderHook(() => usePageVisitsQuery(), {
      wrapper: wrap(client),
    });
    await waitFor(() => expect(pv.result.current.isSuccess).toBe(true));

    expect(analyticsApi.getAnalitycsWeek).toHaveBeenCalled();
    expect(analyticsApi.getAnalitycsMonth).toHaveBeenCalled();
    expect(analyticsApi.getPageVisits).toHaveBeenCalled();
  });
});
