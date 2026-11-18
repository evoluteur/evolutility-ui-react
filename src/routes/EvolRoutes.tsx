// Routes for Evolutility views
import { lazy, Suspense, type ReactNode } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import config from "config";
import Spinner from "components/ui/Spinner/Spinner";

import One from "components/views/one/One";
import Many from "components/views/many/Many";

// - views w/ charts (nivo) and less used views: loaded when needed
const Stats = lazy(() => import("components/views/analytics/Stats/Stats"));
const Charts = lazy(() => import("components/views/analytics/Charts/Charts"));
const Overview = lazy(
  () => import("components/views/comfort/Overview/Overview"),
);
const Activity = lazy(
  () => import("components/views/comfort/Activity/Activity"),
);

const later = (view: ReactNode) => (
  <Suspense fallback={<Spinner />}>{view}</Suspense>
);

const EvolRoutes = () => (
  <Routes>
    <Route
      path="/:entity/"
      element={
        config.entityRoot === "overview" ? (
          later(<Overview />)
        ) : (
          <Navigate to="list" replace />
        )
      }
    />
    <Route path="/:entity/overview" element={later(<Overview />)} />
    <Route path="/:entity/:view/:id" element={<One />} />
    <Route path="/:entity/:view" element={<Many />} />
    <Route path="/:entity/charts" element={later(<Charts />)} />
    <Route path="/:entity/stats" element={later(<Stats />)} />
    {config.withActivity && (
      <Route path="/:entity/activity" element={later(<Activity />)} />
    )}
  </Routes>
);

export default EvolRoutes;
