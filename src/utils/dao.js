// Evolutility-UI-React
// access to data via GraphQL API (using Hasura)
// (c) 2023 Olivier Giulieri

import { getModel } from "./moMa";
import { fieldTypes as ft } from "./dico.js";
import {
  gqlOptions,
  qOne,
  qStats,
  qChart,
  qDelete,
  qUpdateOne,
  qInsertOne,
  qMany,
  qLov,
} from "./gqlQueries.js";
import config from "../config.js";

const { apiPath } = config;

//#region Helpers ----------------------------
const toJSON = (r) => r.json();

const cleanLOV = (f, data) => {
  const df = data[f.id];
  if (df !== undefined && df !== null) {
    data[f.id + "_txt"] = df.name;
    if (df.icon) {
      data[f.id + "_icon"] = df.icon;
    }
    data[f.id] = df.id;
  }
};

const cleanChartData = (e, data, fieldType) => {
  const m = getModel(e);
  const mid = m.qid;
  const d2 = [];

  if (fieldType === ft.lov) {
    data?.forEach((row) => {
      const c = row[mid + "_aggregate"]?.aggregate?.count;
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

const mLOVFields = (entity) =>
  getModel(entity).fields.filter((f) => f.type === ft.lov);

const cleanLOVs = (entity, data) => {
  const lovFields = mLOVFields(entity);
  if (lovFields.length) {
    lovFields.forEach((f) => cleanLOV(f, data));
  }
  return data;
};

//#endregion

//#region Many ----------------------------

export const getMany = (entity, options) => {
  return fetch(apiPath, gqlOptions(qMany(entity, options)))
    .then(toJSON)
    .then((r) => {
      if (r.data && r.data.many) {
        const data = r.data.many;
        const lovFields = mLOVFields(entity);
        if (lovFields.length) {
          data.forEach((d) => lovFields.forEach((f) => cleanLOV(f, d)));
        }
        data._full_count = r.data._full_count.aggregate.count;
        return data;
      } else {
        return r;
      }
    });
};

// get list of chartable values for field
export const getChart = (entity, field) => {
  const m = getModel(entity);
  return fetch(apiPath, gqlOptions(qChart(m, field)))
    .then(toJSON)
    .then((r) => {
      if (r.data) {
        const fieldType = m.fieldsH[field]?.type;
        let data = fieldType === "lov" ? r.data.chart : r.data;
        data = cleanChartData(m.id, data, fieldType);
        return data;
      } else {
        return r;
      }
    });
};

// get entity statistics
export const getStats = (entity) => {
  const m = getModel(entity);
  return fetch(apiPath, gqlOptions(qStats(m)))
    .then(toJSON)
    .then((r) => {
      if (r.data && r.data.stats) {
        let data = r.data.stats.aggregate;
        let d = {};
        for (let pMath in data) {
          for (const pField in data[pMath]) {
            if (!d[pField]) {
              d[pField] = {};
            }
            d[pField][pMath] = data[pMath][pField];
          }
        }
        d.count = data.count;
        return { data: d };
      } else {
        return r;
      }
    });
};
//#endregion

//#region One ----------------------------

// get a single item by id
export const getOne = (entity, id, nextOrPrevious) => {
  if (id) {
    return fetch(apiPath, gqlOptions(qOne(entity, nextOrPrevious), { id }))
      .then(toJSON)
      .then((r) => {
        if (r.data && r.data.one !== null) {
          return cleanLOVs(entity, r.data.one);
        } else {
          return r;
        }
      });
  }
};

// delete an item
export const deleteOne = (entity, id) => {
  const m = getModel(entity);
  return fetch(apiPath, gqlOptions(qDelete(m.qid), { id })).then(toJSON);
};

// add an item
export const insertOne = (entity, data) => {
  return fetch(apiPath, gqlOptions(qInsertOne(entity, data)))
    .then(toJSON)
    .then((data) => {
      data.data =
        data.data.inserted && data.data.inserted.returning.length
          ? cleanLOVs(entity, data.data.inserted.returning[0])
          : null;
      return data;
    });
};

// update (replace) an item
export const updateOne = (entity, id, data) => {
  const m = getModel(entity);
  return fetch(apiPath, gqlOptions(qUpdateOne(m.id, id, data)))
    .then(toJSON)
    .then((data) => {
      data.data =
        data.data.updated && data.data.updated.returning.length
          ? cleanLOVs(entity, data.data.updated.returning[0])
          : null;
      return data;
    });
};

// upload a data item (doc or image)
// response value has filename
// export const uploadOne = (entity, id, field, data) => notImplementedYet();

// get list of values for field
export const getLov = (entity, fieldId) => {
  const m = getModel(entity);
  const f = m?.fieldsH[fieldId];
  if (f) {
    return fetch(apiPath, gqlOptions(qLov(entity, fieldId))).then((r) => {
      if (r.data && r.data.one) {
        const m = getModel(entity);
        let data = r.data.one;
        const lovFields = mLOVFields(entity);
        if (lovFields.length) {
          lovFields.forEach((f) => cleanLOV(f, data));
        }
        if (!data.collections) {
          data.collections = {};
        }
        if (m.collections) {
          m.collections.forEach((c) => {
            const cid = c.id;
            const d = data[cid];
            if (d) {
              data.collections[cid] = d;
              delete data[cid];
            }
          });
        }
        return data;
      } else {
        return r;
      }
    });
  } else {
    return null;
  }
};

// get a collection of sub-items (details for master)
// getCollec: (entity, collid, id) => axios.get(apiPath + entity + '/collec/'+ collid + '?id=' + id + '&pageSize=' + pageSize),

//#endregion

const daoGraphQL = {
  getOne,
  deleteOne,
  updateOne,
  // uploadOne,
  getLov,

  getMany,
  getStats,
  getChart,
};

export default daoGraphQL;
