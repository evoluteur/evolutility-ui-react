import { fieldInCharts, fieldInSearch, fieldIsText } from "./dico";
import { capitalize } from "./format";

export const prepModel = (m) => {
  if (!m._prepared) {
    // - Fields ---------------------------
    let fsMany = 0,
      fsSearch = 0,
      fsCharts = 0;
    if (!m.fieldsH) {
      const fsH = {};
      const lovNoList = [];
      m.fields?.forEach((f) => {
        fsH[f.id] = f;
        if (f.type === "lov" && !(f.object || f.list)) {
          lovNoList.push(f.id);
        }
        if (f.inMany) {
          fsMany++;
        }
        if (fieldInSearch(f)) {
          fsSearch++;
        }
        if (fieldInCharts(f)) {
          fsCharts++;
        }
      });
      m.fieldsH = fsH;
      if (lovNoList.length > 0) {
        m._lovNoList = lovNoList;
      }
    }
    if (!fsMany) {
      console.error('No field w/ "inMany" in model "' + m.id + '".');
      // - default to first 5 fields
      m.fields?.slice(0, 5)?.forEach((f) => (f.inMany = true));
    }
    if (!fsSearch) {
      console.error('No field w/ "inSearch" in model "' + m.id + '".');
      // - default to first 3 text fields
      m.fields
        ?.filter(fieldIsText)
        .slice(0, 3)
        ?.forEach((f) => (f.inSearch = true));
    }
    // - Groups ---------------------------
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
    // - Model ---------------------------
    m.qid = m.qid || m.id;
    if (!m.title) {
      m.title = capitalize(m.namePlural || m.name);
    }
    if (!m.titleField) {
      m.titleField = m.fields[0];
    }
    if (!fsCharts) {
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
                  (f) => f.inMany && !f.object === cId
                );
              }
              const fsh = collecModel.fieldsH;
              c.fields.forEach((f, idx) => {
                if (typeof f === "string") {
                  c.fields[idx] = structuredClone(fsh[f] || {});
                }
              });
            } else {
              console.error(
                `Model "${c.object}" not found in model "${m.id}" collection.`
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
  const modelIds = Object.keys(models);
  // need 2 passes for field map to be populated first, then collecs
  modelIds.forEach((m) => {
    models[m] = prepModel(models[m]);
  });
  modelIds.forEach((m) => {
    models[m] = prepModelCollecs(models[m], models);
  });
  return models;
};

export default prepModels;
