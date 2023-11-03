// Routes for Evolutility views
import React from "react";
import { Routes, Route } from "react-router-dom";
import config from "../config";

import One from "./views/one/One";
import Many from "./views/many/Many";
import Stats from "./views/analytics/Stats/Stats";
import Charts from "./views/analytics/Charts/Charts";
import Overview from "./views/comfort/Overview/Overview";
import Activity from "./views/comfort/Activity/Activity";

import "./widgets/Misc.scss";
import "./widgets/Modal.scss";
import "rc-tooltip/assets/bootstrap_white.css";

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
