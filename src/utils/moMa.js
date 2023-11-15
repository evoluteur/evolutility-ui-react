// Evolutility-UI-React :: utils/moMa.js

// Models manager: fetch and cache models
// models can be stored in JSON files or in the database

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

import all_models from "../models/all_models";
import prepModels from "./moMaPrep";

prepModels(all_models);

export const modelsArray = Object.values(all_models);

export const models = all_models;

export const getModel = (mId) => all_models[mId] || null;

const moma = {
  getModel,
  models,
  modelsArray,
};

export default moma;
