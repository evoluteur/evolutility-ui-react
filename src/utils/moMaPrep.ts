import { fieldInCharts, fieldInSearch, fieldIsText } from "./dico";
import { capitalize } from "./format";
import type { Field, Model, ModelInput } from "types/model";

export const prepModel = (m: ModelInput): Model => {
  const model = m as Model;
  if (!model._prepared) {
    // - Fields ---------------------------
    let fsMany = 0,
      fsSearch = 0,
      fsCharts = 0;
    if (!model.fieldsH) {
      const fsH: Record<string, Field> = {};
      const lovNoList: string[] = [];
      model.fields?.forEach((f) => {
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
      model.fieldsH = fsH;
      if (lovNoList.length > 0) {
        model._lovNoList = lovNoList;
      }
    }
    if (!fsMany) {
      console.error('No field w/ "inMany" in model "' + model.id + '".');
      // - default to first 5 fields
      model.fields?.slice(0, 5)?.forEach((f) => (f.inMany = true));
    }
    if (!fsSearch) {
      console.error('No field w/ "inSearch" in model "' + model.id + '".');
      // - default to first 3 text fields
      model.fields
        ?.filter(fieldIsText)
        .slice(0, 3)
        ?.forEach((f) => (f.inSearch = true));
    }
    // - Groups ---------------------------
    if (!model.groups || model?.groups.length === 0) {
      model.groups = [
        {
          id: "g1",
          type: "panel",
          label: capitalize(model.name),
          width: 100,
          fields: Object.keys(model.fieldsH),
        },
      ];
    }
    // - Model ---------------------------
    model.qid = model.qid || model.id;
    if (!model.title) {
      model.title = capitalize(model.namePlural || model.name);
    }
    if (!model.titleField) {
      model.titleField = model.fields[0].id;
    }
    if (!fsCharts) {
      model.noCharts = true;
    }
    model._prepared = true;
  }
  return model;
};

const prepModelCollecs = (
  m: Model | null,
  models: Record<string, Model>,
): Model | null => {
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
                  (f) => f.inMany && !(f.object === cId),
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
                `Model "${c.object}" not found in model "${m.id}" collection.`,
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

const prepModels = (
  models: Record<string, ModelInput>,
): Record<string, Model> => {
  const modelsRec = models as Record<string, Model>;
  const modelIds = Object.keys(modelsRec);
  // need 2 passes for field map to be populated first, then collecs
  modelIds.forEach((m) => {
    modelsRec[m] = prepModel(modelsRec[m]);
  });
  modelIds.forEach((m) => {
    modelsRec[m] = prepModelCollecs(modelsRec[m], modelsRec) as Model;
  });
  return modelsRec;
};

export default prepModels;
