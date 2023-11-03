/*
    Evolutility-UI-React

    https://github.com/evoluteur/evolutility-ui-react
    (c) 2023 Olivier Giulieri
*/

//#region Helpers functions for GraphQL

import {
  fieldTypes,
  fieldIsNumber,
  fieldIsText,
  fieldInStats,
  fieldIsDateOrTime,
  fieldStatsFunctions,
  allStats,
} from "../utils/dico";

import config from "../config";
import { getModel } from "../utils/moMa";
import { dateTZ } from "../utils/format";

const ft = fieldTypes;

const timestampFields = config.withTimestamp ? " u_date c_date " : " ";

const reqHeader = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
if (config.adminSecret) {
  reqHeader["X-Hasura-Admin-Secret"] = config.adminSecret;
}

export const gqlOptions = (query, variables) => ({
  method: "POST",
  headers: reqHeader,
  body: JSON.stringify({ query, variables }),
});

const prepData = (entity, data) => {
  const m = getModel(entity);
  let d = "{";
  m.fields.forEach((f) => {
    const v = data[f.id];
    if (v !== undefined) {
      if (f.type === ft.lov) {
        const fv = v.id;
        if (fv) {
          d += `${f.id}_id: ${fv} `;
        }
      } else if (f.type === ft.date) {
        d += `${f.id}:"${dateTZ(v)}" `;
      } else {
        d += `${f.id}:"${v}" `;
      }
    }
  });
  d += "}";
  return d;
};

// export const runQuery = (q, cb, cbError) => {
//   return fetch(config.apiPath, gqlOptions(q))
//     .then((r) => r.json())
//     .then((data) => {
//       if (data.errors) {
//         console.error(data.errors);
//         if (cbError) {
//           cbError(data.errors);
//         }
//       } else {
//         cb(data);
//       }
//     });
// };

export const fullCount = (m) =>
  " _full_count: " + m.qid + "_aggregate { aggregate { count }}";

export const qFieldCol = (f) => {
  if (f.type === ft.lov) {
    let displayFieldName;
    if (f.object) {
      const m1 = getModel(f.object);
      displayFieldName = m1.titleField || "name";
    } else {
      displayFieldName = f.lovColumn || "name";
    }
    return `${f.id} { id name:${displayFieldName} ${f.lovIcon ? "icon" : ""}}`;
  }
  return f.id;
};

export const qFields = (m) =>
  "id" + timestampFields + m.fields?.map(qFieldCol).join(" ");

// const qOrderBy = (m, sortField, sortDirection = "asc") => {
//   const mft = m.fieldsH[sortField];
//   let orderBy = ", order_by:{" + sortField + ":";
//   if (mft && mft.type === ft.lov) {
//     orderBy += "{name:" + sortDirection + "}}";
//   } else {
//     orderBy += sortDirection + "}";
//   }
//   return orderBy;
// };
//#endregion

//#region Many ----------------------------

export const qMany = (entity, options) => {
  const m = getModel(entity);
  if (m) {
    const count = fullCount(m);
    const pSize = options?.pageSize || config.pageSize || 20;
    const gOpts = ["limit:" + pSize];
    const gOptsSearch = [];
    if (options) {
      Object.keys(options).forEach((opt) => {
        if (opt === "page") {
          gOpts.push("offset:" + options.page * pSize);
        } else if (opt === "pageSize") {
          // do nothing
        } else if (opt === "order") {
          // const orderParams = options.order.split(".");
          // const [oField, oDirection] = orderParams;
          // const f = m.fieldsH[oField];
          // if (f) {
          //   if (f.type === ft.lov) {
          //     gOpts.push(`order_by:{${oField}:{name:${oDirection}}}`);
          //   } else {
          //     gOpts.push(`order_by:{${oField}:${oDirection}}`);
          //   }
          // }
        } else if (opt === "search") {
          const { search } = options;
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
            const fid = f.type === ft.lov ? opt + "_id" : opt;
            const params = options[opt].split(".");
            gOptsSearch.push(fid + ":{_" + params[0] + ":" + params[1] + "}");
          } else {
            console.error('Unexpected param "' + opt + '".');
          }
        }
      });
      if (gOptsSearch.length) {
        gOpts.push("where:{_or:[" + gOptsSearch.join(",") + "]}");
      }
    }

    const orderParams = options?.order?.split(".");
    let oField, oDirection;

    if (orderParams) {
      [oField, oDirection] = orderParams;
    }
    let f = null;
    if (oField) {
      f = m.fieldsH[oField];
    }
    if (!f) {
      f = m?.fields[0];
    }
    if (f) {
      oDirection = oDirection ? oDirection : "asc";
      if (f.type === ft.lov) {
        gOpts.push(`order_by:{${f.id}:{name:${oDirection}}}`);
        // TODO:
        // gOpts.push(`order_by:{${f.id}:{{f.lovColumn || 'name'}:${oDirection}}}`);
      } else {
        gOpts.push(`order_by:{${f.id}:${oDirection}}`);
      }
    }

    const qParam = gOpts.length ? "(" + gOpts.join(", ") + ")" : "";
    return `query getMany_${m.qid} {
        many: ${m.qid}${qParam}{
            ${qFields(m)}
        }
        ${count}
    }`;
  }
  return null;
};

export const qChart = (m, fieldId) => {
  const qName = `getChart_${m.qid}_${fieldId}`;
  const f = m.fieldsH[fieldId];
  if (!f) {
    return "";
  }
  // TODO: number fields
  if (f.type === ft.lov) {
    return `query ${qName} { chart: ${m.qid}_${fieldId}(limit: 20) {
        id name
        ${m.qid}_aggregate {
          aggregate {count}
        }
      }
    }`;
  }
  if (f.type === ft.bool) {
    return `query ${qName} { true: ${m.qid}_aggregate(where: {${fieldId}: {_eq: true}}) {
        aggregate {count}
      }
      total: ${m.qid}_aggregate {
        aggregate {count}
      }
    }`;
  }
  return null;
};

export const qStats = (m) => {
  const sag = {};
  const nulls = [];
  allStats.forEach((stat) => (sag[stat] = []));
  m.fields.forEach((f) => {
    let fid = f.id;
    if (fieldInStats(f)) {
      if (f.type !== "money" && fieldIsNumber(f)) {
        // if (fieldIsNumber(f)) {
        // TODO: use decimal rather than money type to make it work for money fields
        fieldStatsFunctions(f)?.forEach((p) => sag[p].push(fid));
      }
      if (fieldIsDateOrTime(f)) {
        sag.min.push(fid);
        sag.max.push(fid);
      }
    }
    if (f.type === "lov" || f.type === "list") {
      fid = fid + "_id";
    }
    let qNulls = ` nulls_${f.id}: ${m.qid}_aggregate(where:`;
    if (fieldIsText(f)) {
      qNulls += ` {_or: [{${fid}: {_is_null: true}}, {${fid}: { _eq: ""}}]}`;
    } else {
      qNulls += ` {${fid}: {_is_null: true}}`;
    }
    qNulls += "){aggregate {count}}";
    nulls.push(qNulls);
  });

  return `query getStats_${m.qid} {
      stats: ${m.qid}_aggregate { aggregate {
        ${allStats
          .map((p) => (sag[p].length ? p + " {" + sag[p].join(" ") + "}" : ""))
          .join(" ")}
     count}}
    ${nulls.join("")}}`;
};
//#endregion

//#region One ----------------------------

export const qCollecs = (m) => {
  const collecs = m?.collections;
  if (collecs) {
    return collecs
      .map(
        (c) =>
          ` ${c.id}(order_by:{${c.order || "id"}: asc}) { id ${c.fields
            .map(qFieldCol)
            .join(" ")}}`
      )
      .join(" ");
  }
  return "";
};

const nextPrev = {
  next: {
    op: "_gt",
    order: "asc",
  },
  prev: {
    op: "_lt",
    order: "desc",
  },
};

export const qOne = (entity, nextOrPrevious) => {
  const m = getModel(entity);
  if (m) {
    let q = "query getOne($id:Int!) { one: " + m.qid;
    if (nextOrPrevious) {
      q += `(where: {id: {${nextPrev[nextOrPrevious].op}: $id}}, order_by: {id: ${nextPrev[nextOrPrevious].order}}, limit: 1)`;
    } else {
      q += `_by_pk(id:$id)`;
    }
    q += `{ ${qFields(m)} ${qCollecs(m)} }}`;
    return q;
  } else {
    console.error("Model not found " + entity);
    return null;
  }
};

export const qDelete = (mqid) => `mutation($id:Int!) {
  deleted: delete_${mqid} (
    where: {id: {_eq: $id}}
  ) {affected_rows}
}`;

export const qUpdateOne = (entity, data) => {
  const m = getModel(entity);
  return `mutation($id:Int!) {
    updated: update_${m.qid} (
        where: {id: {_eq: $id}}
        _set: ${prepData(entity, data)}
    ) {returning {${qFields(m) + qCollecs(m)}}}
  }`;
};

export const qInsertOne = (entity, data) => {
  const m = getModel(entity);
  return `mutation {
    inserted: insert_${m.qid} (
      objects: [${prepData(entity, data)}]
    ) {returning {${qFields(m)}}}
  }`;
};

export const qObjectSearch = (entity, search) => {
  const m = getModel(entity);
  const lookupField = m.titleField || "name";
  const qSearch = search
    ? `where: {${lookupField}: {_ilike: "%${search}%"}}`
    : "";
  return `query { lov: ${m.qid}(${qSearch}, limit:100) {id name:${lookupField}} }`;
};
//#endregion
