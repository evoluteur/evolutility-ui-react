export const colors = { scheme: "category10" } as const;

// CSS variable so chart labels follow the light/dark theme
export const labelColor = "var(--evo-chart-label)";
export const innerLabelColor = "white";
// - grid lines (subtle in dark mode)
export const gridColor = "var(--evo-chart-grid)";

// - tooltip follows the light/dark theme
export const tooltipTheme = {
  container: {
    background: "var(--evo-bg)",
    color: "var(--evo-text)",
    border: "1px solid var(--evo-border)",
  },
};

const chartOptions = {
  colors,
};

export default chartOptions;
