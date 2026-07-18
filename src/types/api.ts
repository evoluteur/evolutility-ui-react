/*
  Evolutility-UI-React :: types/api.ts

  Types for GraphQL/DAO responses.
  https://github.com/evoluteur/evolutility-ui-react
*/

import type { RecordData, ChartDatum } from "./model";

export interface GqlError {
  message: string;
}

export interface GqlErrorResult {
  errors: GqlError[];
  data?: undefined;
}

export type ManyResult =
  | (RecordData[] & {
      _full_count: number;
      _filtered_count?: number;
      _entity: string;
    })
  | GqlErrorResult;

export interface ChartResult {
  data: ChartDatum[];
}

export type ChartResponse = ChartResult | GqlErrorResult;

export type StatsData = Record<string, any>;

export interface StatsResult {
  data: StatsData;
}

export type StatsResponse = StatsResult | GqlErrorResult;

export type OneResult = RecordData | GqlErrorResult;

export type LovsResult = Record<string, LovOption[]> | GqlErrorResult;

// Structural narrowing ("errors" in x) is unreliable against types with an
// index signature (like the LOVs record), so use an explicit type guard.
export const isGqlError = (r: unknown): r is GqlErrorResult =>
  !!r && typeof r === "object" && Array.isArray((r as GqlErrorResult).errors);

export interface LovOption {
  id: string | number;
  text?: string;
  name?: string;
  icon?: string;
}

export interface UpsertResult {
  data?: RecordData | null;
  errors?: GqlError[];
}
