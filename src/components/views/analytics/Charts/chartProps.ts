import type { ChartDatum } from "types/model";

export const chartTypes = ["bars", "pie", "table"] as const;
export type ChartType = (typeof chartTypes)[number];

export const chartSizes = ["tiny", "small", "large"] as const;
export type ChartSize = (typeof chartSizes)[number];

export interface ChartCommonProps {
  data?: ChartDatum[] | null;
  size?: ChartSize;
  showLegend?: boolean;
}
