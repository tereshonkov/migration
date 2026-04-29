export const reviewsQueryKeys = {
  all: ["reviews"] as const,
  slider: () => [...reviewsQueryKeys.all, "slider"] as const,
  list: () => [...reviewsQueryKeys.all, "list"] as const,
};
