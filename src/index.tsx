import { createRoot } from "react-dom/client";
import App from "./App";
import { applyTheme, getTheme } from "utils/theme";
import { setModels, setModelsError } from "utils/moMa";
import { getModelDefs } from "dao/dao";
import { restToModel } from "dao/mapping";

import "./index.scss";

applyTheme(getTheme());

// - models are stored on the server (in its database)
async function loadModels() {
  try {
    const defs = await getModelDefs();
    setModels((defs || []).map(restToModel));
  } catch (err) {
    console.error("Could not get the models from the server.", err);
    setModelsError((err as Error).message);
  }
}

const container = document.getElementById("root")!;
const root = createRoot(container);
loadModels().then(() => root.render(<App />));
