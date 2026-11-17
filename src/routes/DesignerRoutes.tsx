// Routes for the Designer (models stored on the server)
import { Routes, Route } from "react-router-dom";

import ModelList from "pages/Designer/ModelList/ModelList";
import ModelEdit from "pages/Designer/ModelEdit/ModelEdit";

const DesignerRoutes = () => (
  <Routes>
    <Route path="/" element={<ModelList />} />
    <Route path="/:id" element={<ModelEdit />} />
  </Routes>
);

export default DesignerRoutes;
