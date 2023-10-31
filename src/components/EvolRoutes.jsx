// Routes for Evolutility views
import React from "react";
import { Routes, Route } from "react-router-dom";
import config from "../config";

import Many from "./views/many/Many";
import Stats from "./views/many/Stats";
import Overview from "./views/comfort/Overview";
import Charts from "./views/charts/Charts";
import One from "./views/one/One";
import Activity from "./views/comfort/Activity";

import "./widgets/Misc.scss";
import "./widgets/Form.scss";
import "./widgets/Modal.scss";
import 'rc-tooltip/assets/bootstrap_white.css'

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
