/*
  Evolutility-UI-React :: dao/queryClient.ts

  TanStack Query client (replaces the home made cache).
  Caching is configured w/ "useCache" and "cacheDuration" in "src/config.ts".

  https://github.com/evoluteur/evolutility-ui-react
  (c) 2026 Olivier Giulieri
*/

import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import config from "config";

const { useCache, cacheDuration } = config;

// - time (in milliseconds) data stays fresh (no re-fetch)
export const staleTime = useCache ? (cacheDuration || 180) * 1000 : 0;

// - time (in milliseconds) unused data stays in memory
export const gcTime = Math.max(staleTime, 5 * 60 * 1000);

// - session expired (or logged out elsewhere): check the session again, the
//   app then shows the login page
const sessionKey = ["evol-auth", "session"];
const onError = (err: unknown) => {
  if ((err as { status?: number })?.status === 401) {
    queryClient.invalidateQueries({ queryKey: sessionKey });
  }
};

export const queryClient: QueryClient = new QueryClient({
  queryCache: new QueryCache({ onError }),
  mutationCache: new MutationCache({ onError }),
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
