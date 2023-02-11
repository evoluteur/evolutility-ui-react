import { fieldInCharts } from "./dico";
import { capitalize } from "./format";

const makeMapById = (arr) => {
  const objH = {};
  if (arr) {
    arr.forEach((o) => {
      objH[o.id] = o;
    });
  }
  return objH;
};

export const prepModel = (m) => {
  if (!m._prepared) {
    // - Fields
    if (!m.fieldsH) {
      m.fieldsH = makeMapById(m.fields);
    }
    // - Groups
    if (!m.groups || m?.groups.length === 0) {
      m.groups = [
        {
          id: "g1",
          type: "panel",
          label: capitalize(m.name),
          width: 100,
          fields: Object.keys(m.fieldsH),
        },
      ];
    }

    // - Model
    m.defaultViewOne = m.defaultViewOne || "browse";
    m.defaultViewMany = m.defaultViewMany || "list";
    if (!m.label) {
      m.label = m.title || m.namePlural || m.name;
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
};

const prepModelCollecs = (m, models) => {
  if (m) {
    if (!m._preparedCollecs) {
      if (m.collections) {
        m.collections.forEach((c) => {
          const cId = c.object || c.id;
          if (cId) {
            const collecModel = models[cId];
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

const prepModels = (models) => {
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

export default prepModels;
