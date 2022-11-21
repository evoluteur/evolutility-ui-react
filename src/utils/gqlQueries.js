/*
    Evolutility-UI-React

    https://github.com/evoluteur/evolutility-ui-react
    (c) 2022 Olivier Giulieri
*/

//#region Helpers functions for GraphQL

import {
  fieldTypes,
  fieldIsNumber,
  fieldIsNumeric,
  fieldIsDateOrTime,
} from "./dico";

import config from "../config";
import { getModel } from "./moMa";
import { dateTZ } from "./format";

const ft = fieldTypes;

const prepData = (entity, data) => {
  const m = getModel(entity);
  let d = "{";
  m.fields.forEach((f) => {
    const v = data[f.id];
    if (v !== undefined) {
      if (f.type === ft.lov) {
        const vv = parseInt(v, 10);
        if (vv) {
          //const s = f.list.find(d => d.id === vv)
          d += f.id + "_id: " + vv + " ";
        }
      } else if (f.type === ft.date) {
        d += f.id + ':"' + dateTZ(v) + '" ';
      } else {
        d += f.id + ':"' + v + '" ';
      }
    }
  });
  d += "}";
  return d;
};

export const gqlOptions = (query) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({ query }),
});

export const runQuery = (q, cb, cbError) => {
  return fetch(config.pathGraphQL, gqlOptions(q))
    .then((r) => r.json())
    .then((data) => {
      if (data.errors) {
        console.error(data.errors);
        if (cbError) {
          cbError(data.errors);
        }
      } else {
        cb(data);
      }
    });
};

export const fullCount = (m) =>
  " _full_count: " + m.qid + "_aggregate  { aggregate { count }}";

export const qField = (f) =>
  f.type === ft.lov
    ? f.id +
      " {id " +
      (f.lovColumn || "name") +
      (f.lovIcon ? " icon" : "") +
      "} "
    : f.id;

export const qFields = (m) => "id " + m.fields?.map(qField).join(" ");

const gqlFields = (fields) => fields?.map(qField).join(" ");

//#endregion

//#region Many ----------------------------

export const qOrderBy = (m, sortField, sortDirection = "asc") => {
  const mft = m.fieldsH[sortField];
  let orderBy = ", order_by:{" + sortField + ":";
  if (mft && mft.type === ft.lov) {
    orderBy += "{name:" + sortDirection + "}}";
  } else {
    orderBy += sortDirection + "}";
  }
  return orderBy;
};

export const qChart = (m, field) => {
  const f = m.fieldsH[field];
  // TODO: number fields
  if (f.type === ft.lov) {
    return `query {chart: ${m.qid}_${field}(limit: 20) {
    id
    name
    ${m.qid}_aggregate {
      aggregate {count}
    }
  }
}`;
  }
  if (f.type === ft.bool) {
    return `query {
    true: ${m.qid}_aggregate(where: {${field}: {_eq: true}}) {
      aggregate {count}
    }
    total: ${m.qid}_aggregate {
      aggregate {count}
    }
  }`;
  }
  return null;
};

export const statsAggregate = (m) => {
  const props = ["min", "max", "avg", "sum"];
  const sag = {
    min: [],
    max: [],
    avg: [],
    sum: [],
  };
  m.fields.forEach((f) => {
    if (fieldIsNumeric(f) && !f.noStats) {
      if (f.type !== "money" && fieldIsNumber(f)) {
        // if (fieldIsNumber(f)) {
        // TODO make it work for money fields
        props.forEach((p) => sag[p].push(f.id));
      }
      if (fieldIsDateOrTime(f)) {
        sag.min.push(f.id);
        sag.max.push(f.id);
      }
    }
  });
  return (
    `stats: ${m.qid}_aggregate { aggregate {` +
    props
      .map((p) => (sag[p].length ? p + " {" + sag[p].join(" ") + "}" : ""))
      .join(" ") +
    " count" +
    "}}"
  );
};

export const qStats = (m) => "query {" + statsAggregate(m) + "}";

//#endregion

//#region One ----------------------------

export const qCollecs = (m) => {
  const collecs = m?.collections;
  if (collecs) {
    return collecs
      .map(
        (c) =>
          ` ${c.id}(order_by:{${c.order || "id"}: asc}) { id ${gqlFields(
            c.fields
          )}}`
      )
      .join(" ");
  }
  return "";
};

export const qOne = (entity, id) => {
  const m = getModel(entity);
  if (m) {
    let q = "query { one: " + m.qid;
    // if (m.collections?.length) {
    //   q += `(where:{id:{_eq:${id}}})`;
    // } else {
    q += `_by_pk(id:${id})`;
    // }
    q += " { " + qFields(m) + qCollecs(m) + " }}";
    return q;
  } else {
    console.error("Model not found " + entity);
    return null;
  }
};

export const qDelete = (mqid, id) => `mutation {
  deleted: ${"delete_" + mqid} (
    where: {id: {_eq: ${id}}}
  ) {affected_rows}
}`;

export const qUpdateOne = (entity, mqid, id, data) => {
  const m = getModel(entity);
  return `mutation {
    updated: ${"update_" + mqid} (
        where: {id: {_eq: ${id}}}
        _set: ${prepData(entity, data)}
        ) {returning {id ${qFields(m)} }}
  }`;
};
// ) {returning ${ qOne(entity, id) }  }

export const qInsertOne = (entity, mqid, data) => {
  const m = getModel(entity);
  return `mutation {
    inserted: ${"insert_" + mqid} (
      objects: [${prepData(entity, data)}]
    ) {returning {id ${qFields(m)}}}
  }`;
};

//#endregion
