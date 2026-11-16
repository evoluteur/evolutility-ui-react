/*
  Evolutility-UI-React :: utils/filters.ts

  Helpers for the filters of the List and Cards views.
  Filters live in the URL query string, one condition per field,
  using the REST API syntax: "{fieldId}={operator}.{value}" (ex: "title=ct.abc").

  https://github.com/evoluteur/evolutility-ui-react
  (c) 2026 Olivier Giulieri
*/

import { fieldTypes as ft } from "utils/dico";
import type { Field, LovListItem } from "types/model";
import type { ManyQueryOptions } from "types/api";

export type FilterOperator =
  | "eq"
  | "ne"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "ct"
  | "nct"
  | "sw"
  | "fw"
  | "in"
  | "1"
  | "0"
  | "null"
  | "nn";

export interface Filter {
  fieldId: string;
  operator: FilterOperator;
  /** Value as in the URL (comma-separated ids for "in") */
  value: string;
}

// - query parameters which are not field filters
export const reservedParams = ["order", "page", "pageSize", "search", "select"];

// - operators which do not take a value
export const noValueOperators: FilterOperator[] = ["1", "0", "null", "nn"];

const textOps: FilterOperator[] = [
  "ct",
  "nct",
  "sw",
  "fw",
  "eq",
  "ne",
  "null",
  "nn",
];
const numOps: FilterOperator[] = [
  "eq",
  "ne",
  "gt",
  "gte",
  "lt",
  "lte",
  "null",
  "nn",
];
const boolOps: FilterOperator[] = ["1", "0"];
const lovOps: FilterOperator[] = ["in", "null", "nn"];
const emptyOps: FilterOperator[] = ["null", "nn"];

const allOps = new Set<string>([...textOps, ...numOps, ...boolOps, ...lovOps]);

// - operators available for a field (depends on its type)
export const fieldOperators = (f: Field): FilterOperator[] => {
  switch (f.type) {
    case ft.text:
    case ft.textml:
    case ft.email:
    case ft.url:
      return textOps;
    case ft.int:
    case ft.dec:
    case ft.money:
    case ft.date:
    case ft.time:
      return numOps;
    case ft.bool:
      return boolOps;
    case ft.lov:
      return lovOps;
    default:
      return emptyOps;
  }
};

export const filterableFields = (fields: Field[] = []): Field[] =>
  fields.filter((f) => !f.noFilters && f.type !== ft.json);

export const needsValue = (op: FilterOperator): boolean =>
  !noValueOperators.includes(op);

// - parse the URL query into a list of filters (ignores unknown fields)
export const parseFilters = (
  query: ManyQueryOptions,
  fields: Field[] = [],
): Filter[] => {
  const filters: Filter[] = [];
  const fieldIds = new Set(fields.map((f) => f.id));
  Object.keys(query || {}).forEach((key) => {
    if (reservedParams.includes(key) || !fieldIds.has(key)) {
      return;
    }
    const raw = query[key];
    if (raw === undefined || raw === "") {
      return;
    }
    const s = String(Array.isArray(raw) ? raw[0] : raw);
    const dot = s.indexOf(".");
    const operator = dot > -1 ? s.slice(0, dot) : s;
    if (allOps.has(operator)) {
      filters.push({
        fieldId: key,
        operator: operator as FilterOperator,
        value: dot > -1 ? s.slice(dot + 1) : "",
      });
    }
  });
  return filters;
};

// - URL value of a filter (ex: "ct.abc", "nn")
export const filterParam = (flt: Filter): string =>
  needsValue(flt.operator) ? `${flt.operator}.${flt.value}` : flt.operator;

// - new query w/ the filter added or replaced (back to the first page)
export const setFilter = (
  query: ManyQueryOptions,
  flt: Filter,
  previousFieldId?: string,
): ManyQueryOptions => {
  const q: ManyQueryOptions = { ...query };
  delete q.page;
  if (previousFieldId) {
    delete q[previousFieldId];
  }
  q[flt.fieldId] = filterParam(flt);
  return q;
};

export const removeFilter = (
  query: ManyQueryOptions,
  fieldId: string,
): ManyQueryOptions => {
  const q: ManyQueryOptions = { ...query };
  delete q.page;
  delete q[fieldId];
  return q;
};

export const setSearch = (
  query: ManyQueryOptions,
  search: string,
): ManyQueryOptions => {
  const q: ManyQueryOptions = { ...query };
  delete q.page;
  if (search) {
    q.search = search;
  } else {
    delete q.search;
  }
  return q;
};

// - remove all filters and search (keeps sorting and page size)
export const clearFilters = (query: ManyQueryOptions): ManyQueryOptions => {
  const q: ManyQueryOptions = {};
  if (query.order) {
    q.order = query.order;
  }
  if (query.pageSize) {
    q.pageSize = query.pageSize;
  }
  return q;
};

// - readable value of a filter (lov ids are replaced by their names)
export const filterValueText = (
  flt: Filter,
  list: LovListItem[] = [],
): string => {
  if (!needsValue(flt.operator)) {
    return "";
  }
  if (flt.operator === "in") {
    return flt.value
      .split(",")
      .map((id) => list.find((li) => String(li.id) === id)?.text || id)
      .join(", ");
  }
  return flt.value;
};

const filters = {
  fieldOperators,
  filterableFields,
  needsValue,
  parseFilters,
  filterParam,
  setFilter,
  removeFilter,
  setSearch,
  clearFilters,
  filterValueText,
};

export default filters;
