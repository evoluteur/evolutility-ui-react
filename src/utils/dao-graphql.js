// Evolutility-UI-React

// access to data via GraphQL API (using Hasura)

// (c) 2022 Olivier Giulieri

import moMa from "./moMa";
import { fieldTypes, isFieldMany } from "./dico.js";
import config from "../config";
import {
  fullCount,
  gqlOptions,
  qModels,
  qOne,
  qField,
  qStats,
  qDelete,
  qUpdateOne,
  qInsertOne,
} from "./graphQLQueries.js";
import { apiPath, apiPathGraphQL, pageSize } from "../config.js";
import packageInfo from "../../package.json";

const { proxy } = packageInfo;

// TODO: error handling

const notImplementedYet = () =>
  alert("Not implemented for GraphQL yet (but working with REST).");

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

const mLOVFields = (entity) =>
  moMa.getModel(entity).fields.filter((f) => f.type === ft.lov);

const daoGraphQL = {
  apiType: "graphql",

  // get a single item
  getOne: function (entity, id) {
    if (id) {
      return fetch(apiPathGraphQL, gqlOptions(qOne(entity, id)))
        .then(toJSON)
        .then((r) => {
          if (r.data && r.data.one) {
            const m = moMa.getModel(entity);
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
  },

  // get an array of items
  getMany: function (entity, options) {
    const fields = (m) => m.fields.filter(isFieldMany);
    const gqlFields = (m) => "id " + fields(m).map(qField).join(" ");
    const qMany = (entity) => {
      const m = moMa.getModel(entity);
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
              const f = m.fieldsH[orderParams[0]];
              if (f && f.type === ft.lov) {
                gOpts.push(
                  "order_by:{" +
                    orderParams[0] +
                    ":{name:" +
                    orderParams[1] +
                    "}}"
                );
              } else {
                gOpts.push(
                  "order_by:{" + orderParams[0] + ":" + orderParams[1] + "}"
                );
              }
            } else if (opt === "search") {
              // do nothing
              // debugger
            } else {
              const f = m.fieldsH[opt];
              if (f) {
                const fn = f.type === ft.lov ? opt + "_id" : opt;
                const params = options[opt].split(".");
                gOptsSearch.push(
                  fn + ":{_" + params[0] + ":" + params[1] + "}"
                );
              } else {
                console.error('Unexpected param "' + opt + '".');
              }
            }
          });
          if (gOptsSearch.length) {
            gOpts.push("where:{" + gOptsSearch.join(",") + "}");
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

    return fetch(config.apiPathGraphQL, gqlOptions(qMany(entity)))
      .then(toJSON)
      .then((r) => {
        if (r.data && r.data.many) {
          const data = r.data.many;
          const m = moMa.getModel(entity);
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
  },

  // get a collection of sub-items (details for master)
  // getCollec: (entity, collid, id) => axios.get(apiPath + entity + '/collec/'+ collid + '?id=' + id + '&pageSize=' + pageSize),

  // delete an item
  deleteOne: function (entity, id) {
    const m = moMa.getModel(entity);
    return fetch(config.apiPathGraphQL, gqlOptions(qDelete(m.qid, id))).then(
      toJSON
    );
  },

  // add an item
  addOne: function (entity, data) {
    const m = moMa.getModel(entity);
    return fetch(
      config.apiPathGraphQL,
      gqlOptions(qInsertOne(entity, m.qid, data))
    )
      .then(toJSON)
      .then((data) => {
        data.data =
          data.data.inserted && data.data.inserted.returning.length
            ? data.data.inserted.returning[0]
            : null;
        return data;
      });
  },

  // update (replace) an item
  updateOne: function (entity, id, data) {
    const m = moMa.getModel(entity);
    return fetch(
      config.apiPathGraphQL,
      gqlOptions(qUpdateOne(m.id, m.qid, id, data))
    )
      .then(toJSON)
      .then((data) => {
        data.data =
          data.data.updated && data.data.updated.returning.length
            ? data.data.updated.returning[0]
            : null;
        return data;
      });
  },

  // upload a data item (doc or image)
  // response value has filename
  uploadOne: (entity, id, field, data) => notImplementedYet(),

  // get list of values for field
  getLov: (entity, field) => notImplementedYet(),

  // get list of chartable values for field
  getChart: (entity, field) => notImplementedYet(),

  // get entity statistics
  getStats: (entity) => {
    const m = moMa.getModel(entity);
    return fetch(config.apiPathGraphQL, gqlOptions(qStats(m)))
      .then(toJSON)
      .then((r) => {
        if (r.data && r.data.stats) {
          let data = r.data.stats.aggregate;
          // const m = moMa.getModel(entity)
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
  },

  // get entity as CSV file
  getManyCSV: (entity) => notImplementedYet(),

  // get the models
  getModels: () =>
    fetch(config.apiPathGraphQL, gqlOptions(qModels)).then(toJSON),

  getFileModel: (entity, path) => proxy + apiPath + entity + `'?model=${path}`,

  getAPI: (entity) => notImplementedYet(),

  getUrl: (url) => notImplementedYet(),
};

export default daoGraphQL;
