/*
  Evolutility-UI-React :: types/api.ts

  Types for the REST API and the DAO.
  https://github.com/evoluteur/evolutility-ui-react
*/

import type { RecordData, ChartDatum, LovListItem } from "./model";

// - Query parameters accepted by the REST "list" end-point:
//   pagination ("page", "pageSize"), sorting ("order" like "title.asc"),
//   full text search ("search"), and one filter per field ("category=eq.3").
export interface ManyQueryOptions {
  page?: number;
  pageSize?: number;
  order?: string;
  search?: string;
  [fieldId: string]: string | number | undefined;
}

// - Result of a "list" query (records + total number of records)
export interface ManyResult {
  entity: string;
  rows: RecordData[];
  // - number of records returned in this page
  count: number;
  // - total number of records in the table
  fullCount: number;
}

export interface ChartResult {
  data: ChartDatum[];
}

export type StatsData = Record<string, any>;

export interface StatsResult {
  data: StatsData;
}

// - Lists of values (for dropdowns), keyed by field id
export type LovsResult = Record<string, LovListItem[]>;

// - Single entry of a list of values
export interface LovOption {
  id: string | number;
  text?: string;
  name?: string;
  icon?: string;
}

export type OneResult = RecordData;
