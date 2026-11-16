// Light / dark theme
// The theme is stored in localStorage ("evol-theme") and applied as
// <html data-theme="light|dark">. Without a saved choice, the OS setting is used.

import { lcRead, lcWrite } from "utils/localStorage";

export type Theme = "light" | "dark";

const key = "theme";

const systemTheme = (): Theme =>
  window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

export const getTheme = (): Theme => {
  const saved = lcRead(key);
  return saved === "dark" || saved === "light" ? saved : systemTheme();
};

export const applyTheme = (theme: Theme): void => {
  document.documentElement.setAttribute("data-theme", theme);
};

export const setTheme = (theme: Theme): void => {
  lcWrite(key, theme);
  applyTheme(theme);
};
