// Routes for Evolutility views
import { Routes, Route } from "react-router-dom";

import Demos from "pages/Demos/Demos";
import EvolRoutes from "./EvolRoutes";

const DocsRoutes = () => (
  <Routes>
    <Route exact path="/" element={<Demos />} />
    <Route path="*" element={<EvolRoutes />} />
  </Routes>
);

export default DocsRoutes;
