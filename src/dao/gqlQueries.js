/*
    Evolutility-UI-React GraphQL query generation

    https://github.com/evoluteur/evolutility-ui-react
    (c) 2023 Olivier Giulieri
*/

//#region  ----- Helpers functions for GraphQL

import {
  fieldTypes as ft,
  fieldIsNumber,
  fieldIsText,
  fieldInStats,
  fieldInSearch,
  fieldStatsFunctions,
  allStats,
} from "../utils/dico";

import config from "../config";
import { getModel } from "../utils/moMa";
import { dateTZ, timeTZ } from "../utils/format";
import { isObject } from "underscore";

const timestampFields = config.withTimestamp ? " updated_at created_at " : " ";

const prepData = (m, data) => {
  let d = "{";
  m.fields.forEach((f) => {
    let v = data[f.id];
    if (v !== undefined) {
      const fType = f.type;
      const fId = f.id;
      if (fType === ft.lov) {
        d += `${fId}_id: ${v?.id || "null"} `;
      } else if (fType === ft.date) {
        d += `${fId}: ${dateTZ(v)} `;
      } else if (fType === ft.time) {
        d += `${fId}: ${timeTZ(v)} `;
      } else if (fType === ft.json) {
        if (v === null || v === "") {
          d += `${fId}: null `;
        } else {
          if (isObject(v)) {
            v = JSON.stringify(v);
          }
          v = v.replace(/"([^"]+)":/g, "$1:");
          // TODO: fix bug w/ spaces in attribute names
          d += `${fId}: ${v} `;
        }
      } else {
        d += `${fId}: "${v}" `;
      }
    }
  });
  d += "}";
  return d;
};

const aggregateCount = "{aggregate{count}}";
const fullCount = (qid) => `_full_count: ${qid}_aggregate ${aggregateCount}`;
const filteredCount = (qid, filters) =>
  `_filtered_count: ${qid}_aggregate(${filters}) ${aggregateCount}`;

const sqFieldCol = (f) => {
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
  "id " + m.fields?.map(sqFieldCol).join(" ") + timestampFields;

const conjunct = (join, conditions) => `{_${join}: [${conditions.join(", ")}]}`;
//#endregion

//#region  ----- Many ----------------------------

const searchClause = (m, searchValue) => {
  if (!searchValue) {
    return null;
  }
  const searchStr = `%${searchValue}%`;
  const gOptsSearch = [];
  m.fields.filter(fieldInSearch)?.forEach((f) => {
    gOptsSearch.push(`{ ${f.id}: { _ilike: "${searchStr}" } }`);
  });
  if (gOptsSearch.length) {
    if (gOptsSearch.length === 1) {
      return `{${gOptsSearch[0]}}`;
    }
    return conjunct("or", gOptsSearch);
  }
  return null;
};

const orderClause = (m, orderParam) => {
  const orderParams = orderParam?.split(".");
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
      let displayFieldId = "name";
      if (f.object) {
        const m2 = getModel(f.object);
        displayFieldId = m2.titleField || "name";
      }
      return `{${f.id}:{${displayFieldId}:${oDirection}}}`;
    } else {
      return `{${f.id}:${oDirection}}`;
    }
  }
  return null;
};

export const qMany = (entity, options) => {
  const m = getModel(entity);
  if (m) {
    const pSize = options?.pageSize || config.pageSize || 20;
    const gOpts = ["limit: " + pSize];
    if (options?.page) {
      gOpts.push("offset:" + options.page * pSize);
    }

    const gOptsFilter = [];
    let allFilters = "";
    let hasFilters = false;
    let searchQuery = "";
    if (options) {
      Object.keys(options).forEach((opt) => {
        if (opt === "page" || opt === "pageSize" || opt === "order") {
          // do nothing
        } else if (opt === "search") {
          searchQuery = searchClause(m, options.search);
        } else {
          const f = m.fieldsH[opt];
          if (f) {
            const fid = f.type === ft.lov ? opt + "_id" : opt;
            const params = options[opt].split(".");
            gOptsFilter.push(`${fid}: {_${params[0]}:${params[1]}}`);
          } else {
            console.error('Unexpected param "' + opt + '".');
          }
        }
      });
      const nbConds = gOptsFilter.length;
      hasFilters = nbConds > 0;
      if (nbConds === 1) {
        allFilters = "{" + gOptsFilter[0] + "}";
      } else if (nbConds > 1) {
        allFilters = conjunct("and", gOptsFilter);
      }
      if (searchQuery) {
        if (allFilters) {
          allFilters = "where: " + conjunct("and", [searchQuery, allFilters]);
        } else {
          allFilters = "where: " + searchQuery;
        }
      } else if (allFilters) {
        allFilters = "where: " + allFilters;
      }
    }

    const orderBy = orderClause(m, options?.order);
    if (orderBy) {
      gOpts.push(`order_by: ${orderBy}`);
    }

    const qParameters = `(${gOpts.join(", ")} ${allFilters})`;
    return `query getMany_${m.id} {
        many: ${m.qid}${qParameters}{
            ${qFields(m)}
        }
        ${fullCount(m.qid)}
        ${hasFilters || searchQuery ? filteredCount(m.qid, allFilters) : ""}
    }`;
  }
  return null;
};
//#endregion

//#region  ----- Analytics ----------------------------

const aggregateName = (qid, f) => {
  if (f.aggregate) {
    return f.aggregate;
  } else {
    // rely on convention w/ array relationship names (using plural) given in Hasura
    const r = qid.endsWith("s") ? qid : qid + "s";
    return r + "_aggregate";
  }
};

export const qChart = (m, fieldId) => {
  // TODO: charts for number fields (buckets)
  const f = m.fieldsH[fieldId];
  if (!f) {
    console.error(`Invalid Chart ${m.id} ${fieldId}.`);
    return "";
  }
  const qName = `getChart_${m.id}_${fieldId}`;
  if (f.type === ft.lov) {
    let relatedObject;
    let displayFieldId = "name";
    if (f.chartObject) {
      relatedObject = f.chartObject;
    } else if (f.object) {
      const mro = getModel(f.object);
      relatedObject = mro.qid;
      displayFieldId = mro.titleField || "name";
    } else {
      relatedObject = `${m.qid}_${fieldId}`;
    }
    return `query ${qName} { chart: ${relatedObject}(limit: 20) {
        id name:${displayFieldId}
        aggregate: ${aggregateName(m.qid, f)} {
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
  // This query is expensiv so it has the @cached directive
  const sag = {};
  const nulls = [];
  allStats.forEach((stat) => (sag[stat] = []));
  m.fields.forEach((f) => {
    let fid = f.id;
    if (fieldInStats(f)) {
      if (fieldIsNumber(f)) {
        // if (fieldIsNumber(f)) {
        // TODO: use decimal rather than money type to make it work for money fields
        fieldStatsFunctions(f)?.forEach((p) => sag[p].push(fid));
      }
      if (f.type === ft.date) {
        sag.min.push(fid);
        sag.max.push(fid);
      }
    }
    if (f.type === "lov") {
      fid += "_id";
    }
    let sqNulls = ` nulls_${f.id}: ${m.qid}_aggregate(where:`;
    if (fieldIsText(f)) {
      sqNulls += conjunct("or", [
        `{${fid}: {_is_null: true}}`,
        `{${fid}: {_eq: ""}}`,
      ]);
    } else {
      sqNulls += ` {${fid}: {_is_null: true}}`;
    }
    sqNulls += "){aggregate {count}}";
    nulls.push(sqNulls);
  });

  return `query getStats_${m.id} @cached {
      stats: ${m.qid}_aggregate { aggregate {
        ${allStats
          .map((p) => (sag[p].length ? `${p}{${sag[p].join(" ")}}` : ""))
          .join(" ")}
     count}}
    ${nulls.join("")}}`;
};
//#endregion

//#region  ----- One ----------------------------

export const sqCollecs = (m) =>
  m.collections
    ?.map(
      (c) =>
        ` ${c.id}(order_by:{${c.order || "id"}: asc}) { id ${c.fields
          .map(sqFieldCol)
          .join(" ")}}`
    )
    .join(" ") || "";

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
    let q = `query getOne_${m.id}($id:Int!) { one: ` + m.qid;
    if (nextOrPrevious) {
      q += `(where: {id: {${nextPrev[nextOrPrevious].op}: $id}}, order_by: {id: ${nextPrev[nextOrPrevious].order}}, limit: 1)`;
    } else {
      q += `_by_pk(id:$id)`;
    }
    q += `{ ${qFields(m)} ${sqCollecs(m)} }`;
    if (m._lovNoList?.length > 0) {
      q += m._lovNoList.map((fid) => sqLOV(m, fid)).join(" ");
    }
    q += "}";
    return q;
  } else {
    console.error("Model not found " + entity);
    return null;
  }
};

export const qDelete = (entity) => {
  const m = getModel(entity);
  return `mutation($id:Int!) {
    deleted: delete_${m.qid} (
      where: {id: {_eq: $id}}
    ) {affected_rows}
  }`;
};

export const qUpdateOne = (entity, data) => {
  const m = getModel(entity);
  return `mutation($id:Int!) {
    updated: update_${m.qid} (
        where: {id: {_eq: $id}}
        _set: ${prepData(m, data)}
    ) {returning {${qFields(m) + sqCollecs(m)}}}
  }`;
};

export const qInsertOne = (entity, data) => {
  const m = getModel(entity);
  return `mutation {
    inserted: insert_${m.qid}(
      objects: [${prepData(m, data)}]
    ) {returning {${qFields(m)}}}
  }`;
};
//#endregion

//#region  ----- LOV and Lookup ----------------------------

export const qObjectSearch = (entity, search) => {
  const m = getModel(entity);
  const lookupField = m.titleField || "name";
  const qSearch = search
    ? `where: {${lookupField}: {_ilike: "%${search}%"}}`
    : "";
  return `query lookup_${entity}_${lookupField}{ lov: ${m.qid}(${qSearch}, limit: 100) {id name:${lookupField}} }`;
};

const sqLOV = (model, fid) => {
  const f = model.fieldsH[fid];
  const lovId = `${model.qid}_${fid}`;
  const icon = f.lovIcon ? "icon" : "";
  return `lov_${fid}: ${lovId}(limit: 200) {id text:name ${icon}}`;
};

export const qLOVs = (model) => {
  const qs = model._lovNoList.map((fid) => sqLOV(model, fid));
  return `query lovs_${model.id}{${qs.join(" ")}}`;
};
//#endregion
