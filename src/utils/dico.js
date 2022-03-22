/*!
Evolutility-UI-React
https://github.com/evoluteur/evolutility-ui-react
(c) 2022 Olivier Giulieri
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
const fta = Object.keys(ft).map((k) => ft[k]);

export const fieldTypes = ft;
export const fieldTypeStrings = fta;

export const fieldIsNumber = (f) =>
  f.type === ft.int || f.type === ft.dec || f.type === ft.money;

export const fieldIsDateOrTime = (f) =>
  f.type === ft.date || f.type === ft.datetime || f.type === ft.time;

export const fieldIsNumeric = (f) => fieldIsNumber(f) || fieldIsDateOrTime(f);

export const fieldChartable = (f) =>
  f.type === ft.lov || f.type === ft.bool || fieldIsNumber(f);

export const fieldInCharts = (f) => fieldChartable(f) && !f.noCharts;

export function hById(arr, prop = "id") {
  const objH = {};
  if (arr) {
    arr.forEach((o) => {
      objH[o[prop]] = o;
    });
  }
  return objH;
}

export function prepModel(m) {
  if (m) {
    if (!m._prepared) {
      // - Model
      m.defaultViewOne = m.defaultViewOne || "browse";
      m.defaultViewMany = m.defaultViewMany || "list";
      if (!m.label) {
        m.label = m.title || m.namePlural || m.name;
      }
      // - Fields
      if (!m.fieldsH) {
        m.fieldsH = hById(m.fields);
      }
      if (!m.titleField) {
        m.titleField = m.fields[0];
      }
      if (m.fields.filter(fieldInCharts).length < 1) {
        m.noCharts = true;
      }
      m._prepared = true;
    }
    return m;
  }
  return null;
}

const prepModelCollecs = (m, models) => {
  if (m) {
    if (!m._preparedCollecs) {
      if (m.collections) {
        m.collections.forEach((c) => {
          if (c.object) {
            const collecModel = models[c.object];
            if (collecModel) {
              // - if no icon, get it from collec object
              if (!c.icon && collecModel.icon) {
                c.icon = collecModel.icon;
              }
              // - if no fields, get it from collec object (fields in list but not the object)
              if (!c.fields) {
                c.fields = collecModel.fields.filter(
                  (f) => f.inMany && !f.object === c.object
                );
              }
              const fsh = collecModel.fieldsH;
              c.fields.forEach((f, idx) => {
                if (typeof f === "string") {
                  c.fields[idx] = JSON.parse(JSON.stringify(fsh[f] || {}));
                }
              });
            } else {
              console.log(
                'Model "' + c.object + '" not found in model "' + m.id + '".'
              );
            }
          }
        });
      }
      m._preparedCollecs = true;
    }
    return m;
  }
  return null;
};

export const prepModels = (models) => {
  const ms = Object.keys(models);
  // need 2 passes for field map to be populated first, then collecs
  ms.forEach((m) => {
    models[m] = prepModel(models[m]);
  });
  ms.forEach((m) => {
    models[m] = prepModelCollecs(models[m], models);
  });
  return models;
};

export const isFieldMany = (f) => f.inList || f.inMany;

export const fieldIsText = (f) =>
  [ft.text, ft.textml, ft.url, ft.html, ft.email].indexOf(f.type) > -1;

export const fieldId2Field = (fieldIds, fieldsH) =>
  fieldIds ? fieldIds.map((id) => fieldsH[id] || null) : null;

const dico = {
  fieldTypes: ft,
  fieldTypeStrings: fta,
  fieldIsNumber,
  fieldIsDateOrTime,
  fieldIsNumeric,
  fieldInCharts,
  fieldChartable,
  hById,
  hByX: hById,
  prepModel,
  prepModelCollecs,
  isFieldMany,
  fieldIsText,
  fieldId2Field,
};

export default dico;
