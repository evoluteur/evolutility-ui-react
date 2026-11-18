// Routes for the Designer (models stored on the server)
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import ModelList from "pages/Designer/ModelList/ModelList";
import Spinner from "components/ui/Spinner/Spinner";

// - the editor (CodeMirror) is only loaded when a model is edited
const ModelEdit = lazy(() => import("pages/Designer/ModelEdit/ModelEdit"));

const DesignerRoutes = () => (
  <Routes>
    <Route path="/" element={<ModelList />} />
    <Route
      path="/:id"
      element={
        <Suspense fallback={<Spinner />}>
          <ModelEdit />
        </Suspense>
      }
    />
  </Routes>
);

export default DesignerRoutes;
