// Evolutility-UI-React :: utils/moMa.js

// Models manager: fetch and cache models
// models can be stored in JSON files or in the database

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2022 Olivier Giulieri

import dao from "./dao";
import all_models from "../models/all_models";
import { prepModel } from "./dico";

export const modelIds = Object.keys(all_models)
  .filter((m) => all_models[m]?.active)
  .sort(
    (a, b) => (all_models[a]?.position || 0) - (all_models[b]?.position || 0)
  );

const getByWorld = (w) => (m) => all_models[m]?.world === w;

export const demoModelIds = modelIds.filter(getByWorld("organizer"));

export const designerModelIds = modelIds.filter(getByWorld("designer"));

export const models = all_models;

export const getModel = (mId) => all_models[mId] || null;

export function addModels(ms) {
  ms.forEach((m) => {
    all_models[m.id] = prepModel(m);
  });
}

export function fetchModels(cb, cbErr) {
  dao
    .getModels()
    .then((response) => {
      let data = response.data;
      if (data.objects) {
        data = data.objects;
      }
      addModels(data);
      if (cb) {
        cb(all_models);
      }
    })
    .catch((err) => {
      console.error(err);
      if (cbErr) {
        cbErr(err);
      }
    });
}

const moma = {
  fetchModels,
  addModels,
  getModel,
  models,
  modelIds,
  demoModelIds,
  designerModelIds,
};

export default moma;
