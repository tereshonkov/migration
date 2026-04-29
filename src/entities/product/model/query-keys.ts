export const productQueryKeys = {
  all: ["product"] as const,
  list: () => [...productQueryKeys.all, "list"] as const,
  detail: (id: string) => [...productQueryKeys.all, "detail", id] as const,
};
