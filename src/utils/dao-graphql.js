// Evolutility-UI-React

// access to data via GraphQL API (using Hasura)

// (c) 2022 Olivier Giulieri

import { getModel } from "./moMa";
import { fieldTypes, isFieldMany, fieldIsText } from "./dico.js";
import { qModels } from "./gqlQueriesMD.js";
import {
  fullCount,
  gqlOptions,
  qOne,
  qField,
  qStats,
  qChart,
  qDelete,
  qUpdateOne,
  qInsertOne,
} from "./gqlQueries.js";
import { apiPath, pathGraphQL, pageSize } from "../config.js";
import packageInfo from "../../package.json";

const { proxy } = packageInfo;

//#region Helpers

// TODO: error handling
const notImplementedYet = () => console.log("Not implemented yet.");
//alert("Not implemented for GraphQL yet (but working with REST).");

const ft = fieldTypes;

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

  if (fieldType === "lov") {
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
  if (fieldType === "boolean") {
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

//#endregion

//#region Many ----------------------------

// get an array of items
export const getMany = (entity, options) => {
  const fields = (m) => m.fields.filter(isFieldMany);
  const gqlFields = (m) => "id " + fields(m)?.map(qField).join(" ");
  const qMany = (entity) => {
    const m = getModel(entity);
    if (m) {
      const count = fullCount(m);
      const gOpts = ["limit:" + pageSize];
      const gOptsSearch = [];
      if (options) {
        Object.keys(options).forEach((opt) => {
          if (opt === "page") {
            gOpts.push("offset:" + options.page * pageSize);
          } else if (opt === "pageSize") {
            // do nothing
          } else if (opt === "order") {
            const orderParams = options.order.split(".");
            const [oField, oDirection] = orderParams;
            const f = m.fieldsH[oField];
            if (f) {
              if (f.type === ft.lov) {
                gOpts.push(`order_by:{${oField}:{name:${oDirection}}}`);
              } else {
                gOpts.push(`order_by:{${oField}:${oDirection}}`);
              }
            }
          } else if (opt === "search") {
            const { search } = options;
            // debugger;
            const searchFields = m.fields.filter(
              (f) => f.inSearch || (f.inMany && fieldIsText(f))
            );
            const searchStr = `%${search}%`;
            searchFields.forEach((f) => {
              gOptsSearch.push(`{ ${f.id}: { _ilike: "${searchStr}" } }`);
            });
          } else {
            const f = m.fieldsH[opt];
            if (f) {
              const fn = f.type === ft.lov ? opt + "_id" : opt;
              const params = options[opt].split(".");
              gOptsSearch.push(fn + ":{_" + params[0] + ":" + params[1] + "}");
            } else {
              console.error('Unexpected param "' + opt + '".');
            }
          }
        });
        if (gOptsSearch.length) {
          gOpts.push("where:{_or:[" + gOptsSearch.join(",") + "]}");
        }
      }
      const qParam = gOpts.length ? "(" + gOpts.join(", ") + ")" : "";
      return `
        query {
            many: ${m.qid} ${qParam}{
                ${gqlFields(m)}
            }
            ${count}
        }`;
    }
    return null;
  };

  return fetch(pathGraphQL, gqlOptions(qMany(entity)))
    .then(toJSON)
    .then((r) => {
      if (r.data && r.data.many) {
        const data = r.data.many;
        const m = getModel(entity);
        const lovFields = m.fields.filter((f) => f.type === ft.lov);
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
  return fetch(pathGraphQL, gqlOptions(qChart(m, field)))
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
  return fetch(pathGraphQL, gqlOptions(qStats(m)))
    .then(toJSON)
    .then((r) => {
      if (r.data && r.data.stats) {
        let data = r.data.stats.aggregate;
        // const m = getModel(entity)
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

// get entity as CSV file
export const getManyCSV = (entity) => notImplementedYet();

//#endregion

//#region One ----------------------------

// get a single item by id
export const getOne = (entity, id) => {
  if (id) {
    return fetch(pathGraphQL, gqlOptions(qOne(entity, id)))
      .then(toJSON)
      .then((r) => {
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

// delete an item
export const deleteOne = (entity, id) => {
  const m = getModel(entity);
  return fetch(pathGraphQL, gqlOptions(qDelete(m.qid, id))).then(toJSON);
};

// add an item
export const addOne = (entity, data) => {
  const m = getModel(entity);
  return fetch(pathGraphQL, gqlOptions(qInsertOne(entity, m.qid, data)))
    .then(toJSON)
    .then((data) => {
      data.data =
        data.data.inserted && data.data.inserted.returning.length
          ? data.data.inserted.returning[0]
          : null;
      return data;
    });
};

// update (replace) an item
export const updateOne = (entity, id, data) => {
  const m = getModel(entity);
  return fetch(pathGraphQL, gqlOptions(qUpdateOne(m.id, m.qid, id, data)))
    .then(toJSON)
    .then((data) => {
      data.data =
        data.data.updated && data.data.updated.returning.length
          ? data.data.updated.returning[0]
          : null;
      return data;
    });
};

// upload a data item (doc or image)
// response value has filename
export const uploadOne = (entity, id, field, data) => notImplementedYet();

// get list of values for field
export const getLov = (entity, field) => notImplementedYet();

// get a collection of sub-items (details for master)
// getCollec: (entity, collid, id) => axios.get(apiPath + entity + '/collec/'+ collid + '?id=' + id + '&pageSize=' + pageSize),

//#endregion

const daoGraphQL = {
  apiType: "graphql",

  getOne,
  deleteOne,
  updateOne,
  uploadOne,
  getLov,

  getMany,
  getStats,
  getManyCSV,

  // get the models
  getModels: () => fetch(pathGraphQL, gqlOptions(qModels)).then(toJSON),
  getFileModel: (entity, path) => proxy + apiPath + entity + `'?model=${path}`,
  getUrl: (url) => notImplementedYet(),
};

export default daoGraphQL;
