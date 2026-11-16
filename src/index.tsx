import { createRoot } from "react-dom/client";
import App from "./App";
import { applyTheme, getTheme } from "utils/theme";

import "./index.scss";

applyTheme(getTheme());

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(<App />);
