// Evolutility-UI-React :: utils/moMa.ts

// Models manager: holds the models used by all views.
// Models come from the server (stored in its database) at startup, and can be
// edited in the app (see pages/Designer).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import { useSyncExternalStore } from "react";
import prepModels from "./moMaPrep";
import type { Model, ModelInput } from "types/model";

// - models as given (prep mutates models, so they are kept unprepared here)
let rawModels: Record<string, ModelInput> = {};

// - Live models. Mutated in place (never re-assigned) because other modules
//   import them.
export const models: Record<string, Model> = {};
export const modelsArray: Model[] = [];

// - error loading the models from the server (shown in the app)
export let modelsError: string | null = null;

// - change counter (to re-render components when models change)
let modelsVersion = 0;
const listeners = new Set<() => void>();

const byPosition = (a: Model, b: Model) =>
  (a.position ?? 999) - (b.position ?? 999);

// - copy keeping functions (titleFunction, fnValidate)
const cloneModel = (m: ModelInput): ModelInput => ({
  ...m,
  fields: (m.fields || []).map((f) => ({ ...f, list: f.list && [...f.list] })),
  groups: m.groups?.map((g) => ({ ...g, fields: [...(g.fields || [])] })),
  collections: m.collections?.map((c) => ({
    ...c,
    fields: c.fields ? [...c.fields] : c.fields,
  })),
  fieldsH: undefined,
});

function rebuild() {
  const prepared = prepModels(
    Object.fromEntries(
      Object.entries(rawModels).map(([id, m]) => [id, cloneModel(m)]),
    ),
  );
  Object.keys(models).forEach((k) => delete models[k]);
  Object.assign(models, prepared);
  modelsArray.length = 0;
  // - only "active" models are listed in menus
  modelsArray.push(
    ...Object.values(prepared)
      .filter((m) => m.active === true)
      .sort(byPosition),
  );
  modelsVersion++;
  listeners.forEach((l) => l());
}

// - replace all models
export function setModels(list: ModelInput[]) {
  rawModels = {};
  list.forEach((m) => (rawModels[m.id] = m));
  modelsError = null;
  rebuild();
}

export function setModelsError(message: string) {
  modelsError = message;
  rebuild();
}

// - add or replace one model (after it was edited)
export function setModel(m: ModelInput) {
  rawModels[m.id] = m;
  rebuild();
}

export function removeModel(id: string) {
  delete rawModels[id];
  rebuild();
}

export const getModel = (mId: string | undefined): Model | null =>
  (mId && models[mId]) || null;

// - hook: re-renders the component when models change
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
export const useModelsVersion = () =>
  useSyncExternalStore(subscribe, () => modelsVersion);

const moma = {
  getModel,
  models,
  modelsArray,
  setModels,
  setModelsError,
  setModel,
  removeModel,
};

export default moma;
