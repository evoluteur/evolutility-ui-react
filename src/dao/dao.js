// Evolutility-UI-React
// access to data via GraphQL API (using Hasura)
// (c) 2023 Olivier Giulieri

import { getModel } from "../utils/moMa";
import { fieldTypes as ft } from "../utils/dico.js";
import {
  qOne,
  qStats,
  qChart,
  qDelete,
  qUpdateOne,
  qInsertOne,
  qMany,
  qObjectSearch,
} from "./gqlQueries.js";
import { setCache, getCache, clearCache } from "./cache";
import { decimalString } from "../utils/format.js";
import { i18n_errors } from "i18n/i18n";
import config from "../config.js";

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
//#endregion

//#region  ----- Many ----------------------------

export const getMany = (entity, options) => {
  const cacheKey = entity + JSON.stringify(options);
  const cacheData = getCache(cacheKey);
  if (cacheData) {
    return makePromise(cacheData);
  }
  return fetch(apiPath, gqlOptions(qMany(entity, options)))
    .then(toJSON)
    .then((resp) => {
      if (resp.data && resp.data.many) {
        const data = resp.data.many;
        data._full_count = resp.data._full_count.aggregate.count;
        data._entity = entity;
        setCache(cacheKey, data);
        return data;
      } else {
        return resp;
      }
    });
};
//#endregion

//#region  ----- Analytics ----------------------------
// get list of chartable values for field
export const getChart = (entity, field) => {
  const cacheKey = entity + "-chart-" + field;
  const cacheData = getCache(cacheKey);
  if (cacheData) {
    return makePromise(cacheData);
  }
  const m = getModel(entity);
  return fetch(apiPath, gqlOptions(qChart(m, field)))
    .then(toJSON)
    .then((resp) => {
      if (resp.data) {
        const fieldType = m.fieldsH[field]?.type;
        let data = fieldType === "lov" ? resp.data.chart : resp.data;
        data = cleanChartData(data, fieldType);
        setCache(cacheKey, data);
        return data;
      } else {
        return resp;
      }
    });
};

// get entity statistics
export const getStats = (entity) => {
  const cacheKey = entity + "-stats";
  const cacheData = getCache(cacheKey);
  if (cacheData) {
    return makePromise(cacheData);
  }
  const m = getModel(entity);
  return fetch(apiPath, gqlOptions(qStats(m)))
    .then(toJSON)
    .then((resp) => {
      const data = resp?.data;
      if (data?.stats) {
        const cleanData = {};
        const oStats = data?.stats?.aggregate || {};
        m.fields.forEach((f) => {
          const fid = f.id;
          const df = { nulls: resp.data["nulls_" + fid]?.aggregate?.count };
          let v = oStats.min?.[fid];
          if (v) {
            df.min = v;
          }
          v = oStats.max?.[fid];
          if (v) {
            df.max = v;
          }
          v = oStats.avg?.[fid];
          if (v) {
            df.avg = decimalString(v);
          }
          v = oStats.stddev?.[fid];
          if (v) {
            df.stddev = decimalString(v);
          }
          v = oStats.variance?.[fid];
          if (v) {
            df.variance = decimalString(v);
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
};
//#endregion

//#region  ----- One ----------------------------

// get a single item by id
export const getOne = (entity, id, nextOrPrevious) => {
  if (id) {
    return fetch(apiPath, gqlOptions(qOne(entity, nextOrPrevious), { id }))
      .then(toJSON)
      .then((resp) => {
        if (resp.error) {
          return resp;
        } else if (resp.data?.one === null) {
          return {
            errors: [{ message: i18n_errors.badId.replace("{0}", id) }],
          };
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
  }
};

// delete an item
export const deleteOne = (entity, id) => {
  const m = getModel(entity);
  return fetch(apiPath, gqlOptions(qDelete(m.qid), { id }))
    .then(toJSON)
    .then((resp) => {
      clearCache(entity);
      return resp;
    });
};

// add an item
export const insertOne = (entity, data) => {
  return fetch(apiPath, gqlOptions(qInsertOne(entity, data)))
    .then(toJSON)
    .then((resp) => {
      if (!resp.errors) {
        resp.data =
          resp.data.inserted && resp.data.inserted.returning.length
            ? resp.data.inserted.returning[0]
            : null;
        clearCache(entity);
      }
      return resp;
    });
};

// update (replace) an item
export const updateOne = (entity, id, data) => {
  const m = getModel(entity);
  return fetch(apiPath, gqlOptions(qUpdateOne(m.id, data), { id }))
    .then(toJSON)
    .then((resp) => {
      if (!resp.errors) {
        resp.data =
          resp.data.updated && resp.data.updated.returning.length
            ? resp.data.updated.returning[0]
            : null;
        clearCache(entity);
      }
      return resp;
    });
};

// upload a data item (doc or image)
// response value has filename
// export const uploadOne = (entity, id, field, data) => notImplementedYet();

// get list of values for field
export const getObjectSearch = (entity, fieldId, search) => {
  return fetch(apiPath, gqlOptions(qObjectSearch(entity, fieldId, search)))
    .then(toJSON)
    .then((resp) => {
      if (resp.errors) {
        return [{ id: -1, name: "Error in search" }];
      }
      return resp.data.lov;
    });
};

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
