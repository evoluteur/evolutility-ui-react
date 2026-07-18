// Evolutility-UI-React :: utils/moMa.ts

// Models manager: fetch and cache models
// models can be stored in JSON files or in the database

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import all_models from "models/all_models";
import prepModels from "./moMaPrep";
import type { Model } from "types/model";

prepModels(all_models);
const preparedModels = all_models as unknown as Record<string, Model>;

export const modelsArray: Model[] = Object.values(preparedModels);

export const models: Record<string, Model> = preparedModels;

export const getModel = (mId: string | undefined): Model | null =>
  (mId && preparedModels[mId]) || null;

const moma = {
  getModel,
  models,
  modelsArray,
};

export default moma;
