export const productQueryKeys = {
  all: ["product"] as const,
  list: () => [...productQueryKeys.all, "list"] as const,
};
