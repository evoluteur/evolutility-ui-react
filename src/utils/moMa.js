// Evolutility-UI-React :: utils/moMa.js

// Models manager: fetch and cache models
// models can be stored in JSON files or in the database

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

import all_models from "../models/all_models";
import prepModels from "./moMaPrep";

prepModels(all_models);

export const modelsArray = Object.values(all_models);

export const modelIds = modelsArray
  //.filter((m) => m?.active)
  .sort(
    (a, b) => (all_models[a]?.position || 0) - (all_models[b]?.position || 0)
  )
  .map((m) => m.id);

export const models = all_models;

export const getModel = (mId) => all_models[mId] || null;

const moma = {
  getModel,
  models,
  modelIds,
};

export default moma;
