// Routes for Evolutility views
import { Routes, Route } from "react-router-dom";

import Doc from "pages/Docs/Doc";
import Metamodel from "pages/Docs/Metamodel";
import Views from "pages/Docs/Views";
import Installation from "pages/Docs/Installation";
import Configuration from "pages/Docs/Configuration";
import SampleModels from "pages/Docs/SampleModels";

const DocRoutes = () => (
  <Routes>
    <Route path="/metamodel" element={<Metamodel />} />
    <Route path="/views" element={<Views />} />
    <Route path="/install" element={<Installation />} />
    <Route path="/config" element={<Configuration />} />
    <Route path="/models" element={<SampleModels />} />
    <Route path="*" element={<Doc />} />
  </Routes>
);

export default DocRoutes;
