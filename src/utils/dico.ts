/*!
Evolutility-UI-React
https://github.com/evoluteur/evolutility-ui-react
(c) 2026 Olivier Giulieri
*/

// Helpers for models

import type { Field, FieldType } from "types/model";

// - Supported field types
const ft = {
  text: "text",
  textml: "textmultiline",
  bool: "boolean",
  int: "integer",
  dec: "decimal",
  money: "money",
  date: "date",
  time: "time",
  lov: "lov",
  // list: "list", // many values for one field (behave like tags - an array of strings or id?)
  // html: "html",
  // formula: "formula", // maybe a field attribute rather than a field type
  email: "email",
  image: "image",
  doc: "document",
  // geoloc: 'geolocation',
  url: "url",
  color: "color",
  // hidden: "hidden",
  json: "json",
  // rating: 'rating',
  // widget: 'widget'
} as const satisfies Record<string, FieldType>;

export const fieldTypes = ft;
export const fieldTypeStrings: FieldType[] = Object.keys(ft).map(
  (k) => ft[k as keyof typeof ft],
);

export const fieldIsNumber = (f: Field): boolean =>
  f.type === ft.int || f.type === ft.dec || f.type === ft.money;

export const fieldIsDateOrTime = (f: Field): boolean =>
  f.type === ft.date || f.type === ft.time;

export const fieldIsNumeric = (f: Field): boolean =>
  fieldIsNumber(f) || fieldIsDateOrTime(f);

export const fieldChartable = (f: Field): boolean =>
  //TODO: charts for  number fields
  f.type === ft.lov || f.type === ft.bool;

export const fieldInCharts = (f: Field): boolean =>
  fieldChartable(f) && !f.noCharts;
export const fieldInStats = (f: Field): boolean =>
  fieldIsNumeric(f) && !f.noStats;
export const fieldInSearch = (f: Field): boolean | undefined => f.inSearch;
// export const fieldInSearch = (f) => f.inSearch || (f.inMany && fieldIsText(f));

export const fieldIsText = (f: Field): boolean =>
  ([ft.text, ft.textml, ft.url, ft.email] as FieldType[]).includes(f.type);

export const fieldId2Field = (
  fieldIds: string[] | undefined,
  fieldsH: Record<string, Field>,
): (Field | undefined)[] | null => fieldIds?.map((id) => fieldsH[id]) || null;

export const allStats = ["avg", "stddev", "variance", "min", "max"] as const;
export const fieldStatsFunctions = (f: Field): readonly string[] => {
  if (fieldIsDateOrTime(f)) {
    return ["avg", "stddev", "min", "max"];
  }
  return allStats;
};

const dico = {
  fieldTypes,
  fieldTypeStrings,
  fieldIsText,
  fieldIsNumber,
  fieldIsDateOrTime,
  fieldIsNumeric,
  fieldInCharts,
  fieldChartable,
  fieldId2Field,
};

export default dico;
