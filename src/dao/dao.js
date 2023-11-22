// Evolutility-UI-React
// access to data via GraphQL API (using Hasura)
// (c) 2023 Olivier Giulieri

import config from "config.js";
import { i18n_errors } from "i18n/i18n";
import { getModel } from "utils/moMa";
import { decimalString } from "utils/format.js";
import { fieldIsText, fieldTypes as ft } from "utils/dico.js";
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
} from "./gqlQueries.js";
import { setCache, getCache, clearCache } from "./cache";

const { apiPath } = config;

//#region  ----- Helpers ----------------------------
const reqHeader = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
if (config.adminSecret) {
  reqHeader["X-Hasura-Admin-Secret"] = config.adminSecret;
}

const gqlOptions = (query, variables) => ({
  method: "POST",
  headers: reqHeader,
  body: JSON.stringify({ query, variables }),
});

const toJSON = (r) => r.json();

const makePromise = (response) => {
  return new Promise((resolve) => {
    resolve(response);
  });
};

const fakeError = (message) => ({
  errors: [{ message }],
});
//#endregion

//#region  ----- Many ----------------------------

export async function getMany(entity, options) {
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
    return fakeError(err.message + ".");
  }
}
//#endregion

//#region  ----- Analytics ----------------------------

const cleanChartData = (data, fieldType) => {
  const d2 = [];
  if (fieldType === ft.lov) {
    data?.forEach((row) => {
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
      }
    );
  }
  return { data: d2 };
};

export async function getChart(entity, fieldId) {
  const cacheKey = entity + "-chart-" + fieldId;
  const cacheData = getCache(cacheKey);
  if (cacheData) {
    return makePromise(cacheData);
  }
  const m = getModel(entity);
  try {
    return await fetch(apiPath, gqlOptions(qChart(m, fieldId)))
      .then(toJSON)
      .then((resp) => {
        if (resp.data) {
          const fieldType = m.fieldsH[fieldId]?.type;
          let data = fieldType === "lov" ? resp.data.chart : resp.data;
          data = cleanChartData(data, fieldType);
          setCache(cacheKey, data);
          return data;
        } else {
          return resp;
        }
      });
  } catch (err) {
    return fakeError(err.message + ".");
  }
}

// get entity statistics
export async function getStats(entity) {
  const cacheKey = entity + "-stats";
  const cacheData = getCache(cacheKey);
  if (cacheData) {
    return makePromise(cacheData);
  }
  const m = getModel(entity);
  try {
    return await fetch(apiPath, gqlOptions(qStats(m)))
      .then(toJSON)
      .then((resp) => {
        const data = resp?.data;
        if (data?.stats) {
          const cleanData = {};
          const oStats = data?.stats?.aggregate || {};
          m.fields.forEach((f) => {
            const fid = f.id;
            const df = { nulls: data["nulls_" + fid]?.aggregate?.count };
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
    return fakeError(err.message + ".");
  }
}
//#endregion

//#region  ----- One ----------------------------

// get a single item by id
export async function getOne(entity, id, nextOrPrevious) {
  try {
    return await fetch(
      apiPath,
      gqlOptions(qOne(entity, nextOrPrevious), { id })
    )
      .then(toJSON)
      .then((resp) => {
        if (resp.errors) {
          return resp;
        } else if (resp.data?.one === null) {
          return fakeError(i18n_errors.badId.replace("{0}", id));
        }
        const data = resp.data?.one;
        const m = getModel(entity);
        if (data && m._lovNoList) {
          data._lovs = {};
          m._lovNoList.forEach((fid) => {
            data._lovs[fid] = resp.data["lov_" + fid];
          });
        }
        return data;
      });
  } catch (err) {
    return fakeError(err.message + ".");
  }
}

// get LOVs (necessary to create new  record)
export async function getLOVs(entity) {
  const m = getModel(entity);
  try {
    return await fetch(apiPath, gqlOptions(qLOVs(m)))
      .then(toJSON)
      .then((resp) => {
        if (resp.errors) {
          return resp;
        }
        const data = {};
        m?._lovNoList.forEach((fid) => (data[fid] = resp.data["lov_" + fid]));
        return data;
      });
  } catch (err) {
    return fakeError(err.message + ".");
  }
}

// delete an item
export async function deleteOne(entity, id) {
  try {
    return await fetch(apiPath, gqlOptions(qDelete(entity), { id }))
      .then(toJSON)
      .then((resp) => {
        clearCache(entity);
        return resp;
      });
  } catch (err) {
    return fakeError(err.message + ".");
  }
}

// add an item
export async function insertOne(entity, data) {
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
    return fakeError(err.message + ".");
  }
}

// update (replace) an item
export async function updateOne(entity, id, data) {
  const m = getModel(entity);
  try {
    return await fetch(apiPath, gqlOptions(qUpdateOne(m.id, data), { id }))
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
    return fakeError(err.message + ".");
  }
}

// upload a data item (doc or image)
// response value has filename
// export const uploadOne = (entity, id, field, data) => notImplementedYet();

// get list of values for field
export async function getObjectSearch(entity, fieldId, search) {
  try {
    return await fetch(
      apiPath,
      gqlOptions(qObjectSearch(entity, fieldId, search))
    )
      .then(toJSON)
      .then((resp) => {
        if (resp.errors) {
          return [{ id: -1, name: "Error in search" }];
        }
        return resp.data.lov;
      });
  } catch (err) {
    return fakeError(err.message + ".");
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
