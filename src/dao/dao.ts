/*
  Evolutility-UI-React :: dao/dao.ts

  Access to data via the Evolutility REST API.
  End-points are described in "src/dao/openapi.json".

  All functions return the data ready for the views, or throw an ApiError.
  They are consumed through the TanStack Query hooks in "src/dao/queries.ts".

  https://github.com/evoluteur/evolutility-ui-react
  (c) 2026 Olivier Giulieri
*/

import config from "config";
import { i18n_errors } from "i18n/i18n";
import { getModel } from "utils/moMa";
import { ApiError, apiUrl, apiGet, apiPost, apiPatch, apiDelete } from "./api";
import {
  recordToRest,
  restToChart,
  restToRecord,
  restToRecords,
  restToStats,
} from "./mapping";
import type {
  ChartDatum,
  Collection,
  LovListItem,
  RecordData,
} from "types/model";
import type {
  LovOption,
  LovsResult,
  ManyQueryOptions,
  ManyResult,
  StatsData,
} from "types/api";

const { pageSize: defaultPageSize } = config;

const modelOrThrow = (entity: string) => {
  const model = getModel(entity);
  if (!model) {
    throw new ApiError(`Model not found: "${entity}".`, 404);
  }
  return model;
};

//#region  ----- Many ----------------------------

// - get a page of records (filtered, searched, and sorted)
export async function getMany(
  entity: string,
  options?: ManyQueryOptions,
  signal?: AbortSignal,
): Promise<ManyResult> {
  const model = modelOrThrow(entity);
  const rows = await apiGet<RecordData[]>(entity, {
    params: {
      ...options,
      pageSize: options?.pageSize || defaultPageSize,
    },
    signal,
  });
  return {
    entity,
    rows: restToRecords(model.fields, rows),
    count: rows?.length || 0,
    // - the API returns the total record count on every row
    fullCount: rows?.length ? Number(rows[0]._full_count) || rows.length : 0,
  };
}

// - url to download all records as a CSV file
export const getManyCSVUrl = (
  entity: string,
  options?: ManyQueryOptions,
): string => apiUrl(entity, { ...options, format: "csv" });
//#endregion

//#region  ----- One ----------------------------

// - get a single record by id (w/ its sub-collections)
export async function getOne(
  entity: string,
  id: number,
  signal?: AbortSignal,
): Promise<RecordData> {
  const model = modelOrThrow(entity);
  const row = await apiGet<RecordData | null>(`${entity}/${id}`, { signal });
  if (!row) {
    throw new ApiError(i18n_errors.badId.replace("{0}", String(id)), 404);
  }
  const record = restToRecord(model.fields, row);
  // - the API nests sub-collections in "collections", the views expect them
  //   at the root of the record (one property per collection id)
  const collections = record.collections as
    Record<string, RecordData[]> | undefined;
  if (collections) {
    delete record.collections;
    model.collections?.forEach((collec: Collection) => {
      record[collec.id] = restToRecords(collec.fields, collections[collec.id]);
    });
  }
  return record;
}

// - get one sub-collection of a record (details for master)
export async function getCollec(
  entity: string,
  collecId: string,
  id: number,
  signal?: AbortSignal,
): Promise<RecordData[]> {
  const model = modelOrThrow(entity);
  const collec = model.collections?.find((c) => c.id === collecId);
  const rows = await apiGet<RecordData[]>(`${entity}/collec/${collecId}`, {
    params: { id },
    signal,
  });
  return restToRecords(collec?.fields, rows);
}

// - add a record
export async function insertOne(
  entity: string,
  data: RecordData,
): Promise<RecordData> {
  const model = modelOrThrow(entity);
  const row = await apiPost<RecordData>(entity, {
    body: recordToRest(model, data),
  });
  return restToRecord(model.fields, row || {});
}

// - update a record (only the changed fields are sent)
// - the API must allow PATCH in its "Access-Control-Allow-Methods" header,
//   otherwise browsers block the request (PUT hits the same end-point)
export async function updateOne(
  entity: string,
  id: number,
  data: RecordData,
): Promise<RecordData> {
  const model = modelOrThrow(entity);
  const row = await apiPatch<RecordData>(`${entity}/${id}`, {
    body: recordToRest(model, data),
  });
  return restToRecord(model.fields, row || {});
}

// - delete a record
export async function deleteOne(
  entity: string,
  id: number,
): Promise<{ id: number }> {
  modelOrThrow(entity);
  return apiDelete<{ id: number }>(`${entity}/${id}`);
}

// - upload a file (image or document) for a record
// - the response contains the file name
export async function uploadOne(
  entity: string,
  id: number,
  field: string,
  file: File,
): Promise<{ filename?: string }> {
  const body = new FormData();
  body.append(field, file);
  const response = await fetch(apiUrl(`${entity}/upload/${id}`, { field }), {
    method: "POST",
    body,
  });
  if (!response.ok) {
    throw new ApiError(
      `Upload failed (${response.status} ${response.statusText}).`,
      response.status,
    );
  }
  return response.json();
}
//#endregion

//#region  ----- LOV and Lookup ----------------------------

// - get the list of values of one field
export async function getLov(
  entity: string,
  fieldId: string,
  search?: string,
  signal?: AbortSignal,
): Promise<LovListItem[]> {
  const rows = await apiGet<LovListItem[]>(`${entity}/lov/${fieldId}`, {
    params: { search },
    signal,
  });
  return rows || [];
}

// - get the lists of values of all the "lov" fields without a list in the model
export async function getLOVs(
  entity: string,
  fieldIds: string[],
  signal?: AbortSignal,
): Promise<LovsResult> {
  const lists = await Promise.all(
    fieldIds.map((fieldId) => getLov(entity, fieldId, undefined, signal)),
  );
  const lovs: LovsResult = {};
  fieldIds.forEach((fieldId, idx) => {
    lovs[fieldId] = lists[idx];
  });
  return lovs;
}

// - lookup records of an object (for the typeahead of "lov" fields w/ an object)
export async function getObjectSearch(
  entity: string,
  search?: string,
  signal?: AbortSignal,
): Promise<LovOption[]> {
  // - the API uses the model id as field id to search the object itself
  const rows = await getLov(entity, entity, search, signal);
  return rows.map((row) => ({
    id: row.id,
    name: row.text,
    icon: row.icon,
  }));
}
//#endregion

//#region  ----- Analytics ----------------------------

// - get the data of one chart (count of records grouped by field value)
export async function getChart(
  entity: string,
  fieldId: string,
  signal?: AbortSignal,
): Promise<ChartDatum[]> {
  modelOrThrow(entity);
  const rows = await apiGet<RecordData[]>(`${entity}/chart/${fieldId}`, {
    signal,
  });
  return restToChart(rows);
}

// - get statistics on all the fields of a model
export async function getStats(
  entity: string,
  signal?: AbortSignal,
): Promise<StatsData> {
  const model = modelOrThrow(entity);
  const stats = await apiGet<StatsData>(`${entity}/stats`, { signal });
  return restToStats(model, stats || {});
}
//#endregion

const dao = {
  getMany,
  getManyCSVUrl,
  getOne,
  getCollec,
  insertOne,
  updateOne,
  deleteOne,
  uploadOne,
  getLov,
  getLOVs,
  getObjectSearch,
  getChart,
  getStats,
};

export default dao;
