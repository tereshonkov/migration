export const adminQueryKeys = {
  all: ["admin"] as const,
  users: () => [...adminQueryKeys.all, "users"] as const,
  messages: () => [...adminQueryKeys.all, "messages"] as const,
  reviews: () => [...adminQueryKeys.all, "reviews"] as const,
  analytics: {
    all: () => [...adminQueryKeys.all, "analytics"] as const,
    day: () => [...adminQueryKeys.analytics.all(), "day"] as const,
    week: () => [...adminQueryKeys.analytics.all(), "week"] as const,
    month: () => [...adminQueryKeys.analytics.all(), "month"] as const,
    callClick: () => [...adminQueryKeys.analytics.all(), "callClick"] as const,
    pageVisits: () =>
      [...adminQueryKeys.analytics.all(), "pageVisits"] as const,
  },
};
