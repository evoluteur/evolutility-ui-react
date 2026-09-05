/*
  Evolutility-UI-React :: dao/queryClient.ts

  TanStack Query client (replaces the home made cache).
  Caching is configured w/ "useCache" and "cacheDuration" in "src/config.ts".

  https://github.com/evoluteur/evolutility-ui-react
  (c) 2026 Olivier Giulieri
*/

import { QueryClient } from "@tanstack/react-query";
import config from "config";

const { useCache, cacheDuration } = config;

// - time (in milliseconds) data stays fresh (no re-fetch)
export const staleTime = useCache ? (cacheDuration || 180) * 1000 : 0;

// - time (in milliseconds) unused data stays in memory
export const gcTime = Math.max(staleTime, 5 * 60 * 1000);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime,
      gcTime,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;
