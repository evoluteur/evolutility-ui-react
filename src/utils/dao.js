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
} from "./gqlQueries.js";
import config from "../config.js";

const { apiPath } = config;

//#region Helpers ----------------------------
const toJSON = (r) => r.json();

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

//#endregion

//#region Many ----------------------------

export const getMany = (entity, options) => {
  return fetch(apiPath, gqlOptions(qMany(entity, options)))
    .then(toJSON)
    .then((resp) => {
      if (resp.data && resp.data.many) {
        const data = resp.data.many;
        data._full_count = resp.data._full_count.aggregate.count;
        return data;
      } else {
        return resp;
      }
    });
};

// get list of chartable values for field
export const getChart = (entity, field) => {
  const m = getModel(entity);
  return fetch(apiPath, gqlOptions(qChart(m, field)))
    .then(toJSON)
    .then((resp) => {
      if (resp.data) {
        const fieldType = m.fieldsH[field]?.type;
        let data = fieldType === "lov" ? resp.data.chart : resp.data;
        data = cleanChartData(m.id, data, fieldType);
        return data;
      } else {
        return resp;
      }
    });
};

// get entity statistics
export const getStats = (entity) => {
  const m = getModel(entity);
  return fetch(apiPath, gqlOptions(qStats(m)))
    .then(toJSON)
    .then((resp) => {
      if (resp?.data?.stats) {
        let data = resp.data.stats.aggregate;
        let d = {};
        for (let pMath in data) {
          const dataMath = data[pMath];
          for (const pField in dataMath) {
            if (!d[pField]) {
              d[pField] = {};
            }
            d[pField][pMath] = dataMath[pField];
          }
        }
        d.count = data.count;
        return { data: d };
      } else {
        return resp;
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
      .then((resp) => {
        if (resp.data && resp.data.one !== null) {
          return resp.data.one;
        } else {
          return resp;
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
    .then((resp) => {
      if (!resp.errors) {
        resp.data =
          resp.data.inserted && resp.data.inserted.returning.length
            ? resp.data.inserted.returning[0]
            : null;
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
      }
      return resp;
    });
};

// upload a data item (doc or image)
// response value has filename
// export const uploadOne = (entity, id, field, data) => notImplementedYet();

// get list of values for field
export const getLov = (entity, fieldId) => {
  console.log(entity, fieldId);
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
