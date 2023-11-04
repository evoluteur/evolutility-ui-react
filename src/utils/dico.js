/*!
Evolutility-UI-React
https://github.com/evoluteur/evolutility-ui-react
(c) 2023 Olivier Giulieri
*/

// Helpers for models

// - Field Types
const ft = {
  text: "text",
  textml: "textmultiline",
  bool: "boolean",
  int: "integer",
  dec: "decimal",
  money: "money",
  date: "date",
  datetime: "datetime",
  time: "time",
  lov: "lov",
  list: "list", // many values for one field (behave like tags - return an array of strings)
  html: "html",
  formula: "formula", // soon to be a field attribute rather than a field type
  email: "email",
  image: "image",
  doc: "document",
  // geoloc: 'geolocation',
  url: "url",
  color: "color",
  hidden: "hidden",
  json: "json",
  // rating: 'rating',
  // widget: 'widget'
};

export const fieldTypes = ft;
export const fieldTypeStrings = Object.keys(ft).map((k) => ft[k]);

export const fieldIsNumber = (f) =>
  f.type === ft.int || f.type === ft.dec || f.type === ft.money;

export const fieldIsDateOrTime = (f) =>
  f.type === ft.date || f.type === ft.datetime || f.type === ft.time;

export const fieldIsNumeric = (f) => fieldIsNumber(f) || fieldIsDateOrTime(f);

export const fieldChartable = (f) =>
  //TODO: more charts
  f.type === ft.lov || f.type === ft.bool;
// TODO: implement queries for other field types
// f.type === ft.lov || f.type === ft.bool || fieldIsNumber(f);

export const fieldInCharts = (f) => fieldChartable(f) && !f.noCharts;

export const fieldIsText = (f) =>
  [ft.text, ft.textml, ft.url, ft.html, ft.email].indexOf(f.type) > -1;

export const fieldId2Field = (fieldIds, fieldsH) =>
  fieldIds ? fieldIds.map((id) => fieldsH[id] || null) : null;

export const fieldInStats = (f) => fieldIsNumeric(f) && !f.noStats;

export const allStats = ["avg", "stddev", "variance", "min", "max"];
export const fieldStatsFunctions = (f) => {
  // TODO: more field types
  if (fieldIsDateOrTime(f)) {
    return ["avg", "stddev", "min", "max"];
  }
  return allStats;
};

const dico = {
  fieldTypes: ft,
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
