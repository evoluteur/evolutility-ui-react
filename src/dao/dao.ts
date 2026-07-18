// Evolutility-UI-React
// access to data via GraphQL API (using Hasura)
// (c) 2026 Olivier Giulieri

import config from "config";
import { i18n_errors } from "i18n/i18n";
import { getModel } from "utils/moMa";
import { decimalString } from "utils/format";
import { fieldIsText, fieldTypes as ft } from "utils/dico";
import {
  qOne,
  qStats,
  qChart,
  qDelete,
  qUpdateOne,
  qInsertOne,
  qMany,
  qLOVs,
  qObjectSearch,
  type ManyQueryOptions,
} from "./gqlQueries";
import { setCache, getCache, clearCache } from "./cache";
import type { RecordData, ChartDatum, FieldType } from "types/model";
import type {
  ChartResponse,
  GqlErrorResult,
  LovOption,
  LovsResult,
  ManyResult,
  OneResult,
  StatsResponse,
  UpsertResult,
} from "types/api";

const { apiPath } = config;

//#region  ----- Helpers ----------------------------
const reqHeader: Record<string, string> = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
if (config.adminSecret) {
  reqHeader["X-Hasura-Admin-Secret"] = config.adminSecret;
}

const gqlOptions = (
  query: string | null,
  variables?: Record<string, unknown>,
): RequestInit => ({
  method: "POST",
  headers: reqHeader,
  body: JSON.stringify({ query, variables }),
});

const toJSON = (r: Response): Promise<any> => r.json();

const makePromise = <T>(response: T): Promise<T> => {
  return new Promise((resolve) => {
    resolve(response);
  });
};

const fakeError = (message: string): GqlErrorResult => ({
  errors: [{ message }],
});
//#endregion

//#region  ----- Many ----------------------------

export async function getMany(
  entity: string,
  options: ManyQueryOptions | undefined,
): Promise<ManyResult> {
  const cacheKey = entity + JSON.stringify(options);
  const cacheData = getCache(cacheKey);
  if (cacheData) {
    return makePromise(cacheData);
  }
  try {
    return await fetch(apiPath, gqlOptions(qMany(entity, options)))
      .then(toJSON)
      .then((resp) => {
        if (resp.data?.many) {
          const data = resp.data.many;
          data._full_count = resp.data._full_count.aggregate.count;
          const filteredCount = resp.data._filtered_count?.aggregate.count;
          if (filteredCount) {
            data._filtered_count = filteredCount;
          }
          data._entity = entity;
          setCache(cacheKey, data);
          return data;
        } else {
          return resp;
        }
      });
  } catch (err) {
    return fakeError((err as Error).message + ".");
  }
}
//#endregion

//#region  ----- Analytics ----------------------------

const cleanChartData = (
  data: any,
  fieldType: FieldType | undefined,
): { data: ChartDatum[] } => {
  const d2: ChartDatum[] = [];
  if (fieldType === ft.lov) {
    data?.forEach((row: any) => {
      const c = row.aggregate?.aggregate?.count;
      if (c > 0) {
        if (row.name !== "_name") {
          d2.push({
            id: row.id,
            label: row.name,
            value: c,
          });
        }
      }
    });
  }
  if (fieldType === ft.bool) {
    const countTrue = data.true.aggregate.count;
    d2.push(
      {
        id: 1,
        label: "True",
        value: countTrue,
      },
      {
        id: 0,
        label: "False",
        value: data.total.aggregate.count - countTrue,
      },
    );
  }
  return { data: d2 };
};

export async function getChart(
  entity: string,
  fieldId: string,
): Promise<ChartResponse> {
  const cacheKey = entity + "-chart-" + fieldId;
  const cacheData = getCache(cacheKey);
  if (cacheData) {
    return makePromise(cacheData);
  }
  const m = getModel(entity);
  try {
    return await fetch(apiPath, gqlOptions(m && qChart(m, fieldId)))
      .then(toJSON)
      .then((resp) => {
        if (resp.data) {
          const fieldType = m?.fieldsH[fieldId]?.type;
          let data = fieldType === "lov" ? resp.data.chart : resp.data;
          data = cleanChartData(data, fieldType);
          setCache(cacheKey, data);
          return data;
        } else {
          return resp;
        }
      });
  } catch (err) {
    return fakeError((err as Error).message + ".");
  }
}

// get entity statistics
export async function getStats(entity: string): Promise<StatsResponse> {
  const cacheKey = entity + "-stats";
  const cacheData = getCache(cacheKey);
  if (cacheData) {
    return makePromise(cacheData);
  }
  const m = getModel(entity);
  try {
    return await fetch(apiPath, gqlOptions(m && qStats(m)))
      .then(toJSON)
      .then((resp) => {
        const data = resp?.data;
        if (data?.stats && m) {
          const cleanData: Record<string, any> = {};
          const oStats = data?.stats?.aggregate || {};
          m.fields.forEach((f) => {
            const fid = f.id;
            const df: Record<string, any> = {
              nulls: data["nulls_" + fid]?.aggregate?.count,
            };
            if (!fieldIsText(f) || f.type === ft.time) {
              ["min", "max"].forEach((aggreg) => {
                const v = oStats[aggreg]?.[fid];
                if (v !== undefined) {
                  df[aggreg] = v;
                }
              });
              ["avg", "stddev", "variance"].forEach((aggreg) => {
                const v = oStats[aggreg]?.[fid];
                if (v !== undefined) {
                  df[aggreg] = v === 0 ? v : decimalString(v);
                }
              });
            }
            cleanData[fid] = df;
          });
          cleanData.count = oStats.count;
          const statsData = { data: cleanData };
          setCache(cacheKey, statsData);
          return statsData;
        } else {
          return resp;
        }
      });
  } catch (err) {
    return fakeError((err as Error).message + ".");
  }
}
//#endregion

//#region  ----- One ----------------------------

// get a single item by id
export async function getOne(
  entity: string,
  id: number,
  nextOrPrevious?: "next" | "prev",
): Promise<OneResult> {
  try {
    return await fetch(
      apiPath,
      gqlOptions(qOne(entity, nextOrPrevious), { id }),
    )
      .then(toJSON)
      .then((resp) => {
        if (resp.errors) {
          return resp;
        } else if (resp.data?.one === null) {
          return fakeError(i18n_errors.badId.replace("{0}", String(id)));
        }
        const data = resp.data?.one;
        const m = getModel(entity);
        if (data && m?._lovNoList) {
          data._lovs = {};
          m._lovNoList.forEach((fid) => {
            data._lovs[fid] = resp.data["lov_" + fid];
          });
        }
        return data;
      });
  } catch (err) {
    return fakeError((err as Error).message + ".");
  }
}

// get LOVs (necessary to create new  record)
export async function getLOVs(entity: string): Promise<LovsResult> {
  const m = getModel(entity);
  try {
    return await fetch(apiPath, gqlOptions(m && qLOVs(m)))
      .then(toJSON)
      .then((resp) => {
        if (resp.errors) {
          return resp;
        }
        const data: Record<string, LovOption[]> = {};
        m?._lovNoList?.forEach((fid) => (data[fid] = resp.data["lov_" + fid]));
        return data;
      });
  } catch (err) {
    return fakeError((err as Error).message + ".");
  }
}

// delete an item
export async function deleteOne(entity: string, id: number): Promise<any> {
  try {
    return await fetch(apiPath, gqlOptions(qDelete(entity), { id }))
      .then(toJSON)
      .then((resp) => {
        clearCache(entity);
        return resp;
      });
  } catch (err) {
    return fakeError((err as Error).message + ".");
  }
}

// add an item
export async function insertOne(
  entity: string,
  data: RecordData,
): Promise<UpsertResult> {
  try {
    return await fetch(apiPath, gqlOptions(qInsertOne(entity, data)))
      .then(toJSON)
      .then((resp) => {
        if (!resp.errors) {
          resp.data = resp.data?.inserted.returning.length
            ? resp.data.inserted.returning[0]
            : null;
          clearCache(entity);
        }
        return resp;
      });
  } catch (err) {
    return fakeError((err as Error).message + ".");
  }
}

// update (replace) an item
export async function updateOne(
  entity: string,
  id: number,
  data: RecordData,
): Promise<UpsertResult> {
  const m = getModel(entity);
  try {
    return await fetch(apiPath, gqlOptions(m && qUpdateOne(m.id, data), { id }))
      .then(toJSON)
      .then((resp) => {
        if (!resp.errors) {
          resp.data = resp.data?.updated.returning.length
            ? resp.data.updated.returning[0]
            : null;
          clearCache(entity);
        }
        return resp;
      });
  } catch (err) {
    return fakeError((err as Error).message + ".");
  }
}

// upload a data item (doc or image)
// response value has filename
// export const uploadOne = (entity, id, field, data) => notImplementedYet();

// get list of values for field
export async function getObjectSearch(
  entity: string,
  search?: string,
): Promise<LovOption[]> {
  try {
    return await fetch(apiPath, gqlOptions(qObjectSearch(entity, search)))
      .then(toJSON)
      .then((resp) => {
        if (resp.errors) {
          return [{ id: -1, name: "Error in search" }];
        }
        return resp.data.lov;
      });
  } catch (err) {
    return [{ id: -1, name: (err as Error).message + "." }];
  }
}

// get a collection of sub-items (details for master)
// getCollec: (entity, collid, id) => axios.get(apiPath + entity + '/collec/'+ collid + '?id=' + id + '&pageSize=' + pageSize),

//#endregion

const daoGraphQL = {
  getOne,
  deleteOne,
  updateOne,
  // uploadOne,
  getObjectSearch,
  getMany,
  getStats,
  getChart,
};

export default daoGraphQL;
