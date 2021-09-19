// Evolutility-UI-React :: utils/moMa.js

// Models manager: fetch and cache models
// models can be stored in JSON files or in the database

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2021 Olivier Giulieri

import dao from "../utils/dao";
import models from "../models/all_models";
import { prepModel } from "./dico";

export function fetchModels(cb, cbErr) {
  dao
    .getModels()
    .then((response) => {
      addModels(response.data);
      if (cb) {
        cb(models);
      }
    })
    .catch((err) => {
      console.error(err);
      if (cbErr) {
        cbErr(err);
      }
    });
}

export const getModel = (mId) => models[mId] || null;

export function addModels(ms) {
  ms.forEach((m) => {
    models[m.id] = prepModel(m);
  });
}

export let modelIds = Object.keys(models);

const moma = {
  fetchModels: fetchModels,
  addModels: addModels,
  getModel: getModel,
  models: models,
  modelIds: modelIds,
};
export default moma;
