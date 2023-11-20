// Routes for Evolutility views
import React from "react";
import { Routes, Route } from "react-router-dom";
import config from "../config";

import One from "../components/views/one/One";
import Many from "../components/views/many/Many";
import Stats from "../components/views/analytics/Stats/Stats";
import Charts from "../components/views/analytics/Charts/Charts";
import Overview from "../components/views/comfort/Overview/Overview";
import Activity from "../components/views/comfort/Activity/Activity";

const EvolRoutes = () => (
  <Routes>
    <Route path="/:entity/" element={<Overview />} />
    <Route path="/:entity/:view/:id" element={<One />} />
    <Route path="/:entity/:view" element={<Many />} />
    <Route path="/:entity/charts" element={<Charts />} />
    <Route path="/:entity/stats" element={<Stats />} />
    {config.withActivity && (
      <Route path="/:entity/activity" element={<Activity />} />
    )}
  </Routes>
);

export default EvolRoutes;
