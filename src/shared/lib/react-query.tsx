"use client";

import {
  QueryClient,
  QueryClientProvider,
  type QueryClientConfig,
} from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
};

type Props = { children: ReactNode };

export function ReactQueryProvider({ children }: Props) {
  const [client] = useState(() => new QueryClient(queryClientConfig));
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
