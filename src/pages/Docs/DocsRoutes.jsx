// Routes for Evolutility views
import React from "react";
import { Routes, Route } from "react-router-dom";

import Doc from "./Doc";
import Metamodel from "./Metamodel";
import Views from "./Views";
import Installation from "./Installation";
import Configuration from "./Configuration";
import SampleModels from "./SampleModels";

const DocsRoutes = () => (
  <Routes>
    <Route exact path="/metamodel" element={<Metamodel />} />
    <Route exact path="/views" element={<Views />} />
    <Route exact path="/install" element={<Installation />} />
    <Route exact path="/config" element={<Configuration />} />
    <Route exact path="/models" element={<SampleModels />} />
    <Route exact path="*" element={<Doc />} />
  </Routes>
);

export default DocsRoutes;
