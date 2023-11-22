// Routes for Evolutility views
import React from "react";
import { Routes, Route } from "react-router-dom";

import Doc from "pages/Docs/Doc";
import Metamodel from "pages/Docs/Metamodel";
import Views from "pages/Docs/Views";
import Installation from "pages/Docs/Installation";
import Configuration from "pages/Docs/Configuration";
import SampleModels from "pages/Docs/SampleModels";

const DocRoutes = () => (
  <Routes>
    <Route exact path="/metamodel" element={<Metamodel />} />
    <Route exact path="/views" element={<Views />} />
    <Route exact path="/install" element={<Installation />} />
    <Route exact path="/config" element={<Configuration />} />
    <Route exact path="/models" element={<SampleModels />} />
    <Route exact path="*" element={<Doc />} />
  </Routes>
);

export default DocRoutes;
