/*
  Evolutility-UI-React :: types/api.ts

  Types for the REST API and the DAO.
  https://github.com/evoluteur/evolutility-ui-react
*/

import type { RecordData, ChartDatum, LovListItem, ModelInput } from "./model";

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

// - Model as stored on the server (JSON in table "evol_model"):
//   UI and DB props together, "titleFunction" as a template ("{firstname} {lastname}").
export type ModelDef = Omit<ModelInput, "titleFunction"> & {
  titleFunction?: string | null;
  table?: string;
  pKey?: string;
  // - version of the model (required to save changes)
  _version?: number;
  _updatedAt?: string;
  [prop: string]: unknown;
};

// - Answer to saving a model (or checking it w/ "dryRun")
export interface SaveModelResult {
  model: ModelDef;
  // - SQL run (or to run) to update the database
  sql: string[];
  warnings: string[];
  dryRun: boolean;
}

// - Login
export type Role = "viewer" | "editor" | "admin";

export interface AuthUser {
  id: number;
  email: string;
  name?: string | null;
  role: Role;
}

// - Answer of "auth/me": the user (null if not logged in) and the role of
//   the requests (the user's role, or the role given to anonymous visitors)
export interface Session {
  authEnabled: boolean;
  user: AuthUser | null;
  role: Role | null;
}

// - User as listed in the Users screen (admin)
export interface UserInfo extends AuthUser {
  active: boolean;
  lastLoginAt: string | null;
  createdAt: string | null;
}

// - Answer to creating or updating a user (password: only when generated)
export interface UserSaveResult {
  user: UserInfo;
  password?: string;
}

export interface ModelVersion {
  version: number;
  savedAt: string;
}
