// Evolutility-UI-React :: utils/moMa.js

// Models manager: fetch and cache models
// models can be stored in JSON files or in the database

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2022 Olivier Giulieri

import dao from "./dao";
import models from "../models/all_models";
import { prepModel } from "./dico";

export const getModel = (mId) => models[mId] || null;

export function addModels(ms) {
  ms.forEach((m) => {
    models[m.id] = prepModel(m);
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

export const modelIds = Object.keys(models);

const moma = {
  fetchModels,
  addModels,
  getModel,
  models,
  modelIds,
};

export default moma;
