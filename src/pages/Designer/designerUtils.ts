// Evolutility-UI-React :: pages/Designer/designerUtils.ts
// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import JSON5 from "json5";
import type { ModelDef } from "types/api";

// - Models are edited as JSON5 (keys w/o quotes, comments, trailing commas)
// - and stored as JSON (comments are lost on save).

type Obj = Record<string, unknown>;

// - props shown first (in this order) when they are present
const firstProps = [
  "id",
  "type",
  "label",
  "title",
  "name",
  "namePlural",
  "icon",
  "world",
  "active",
]; // - for fields, groups, collections and models
const lastArrays = ["fields", "groups", "collections"]; // - in this order

const isObject = (v: unknown): v is Obj =>
  typeof v === "object" && v !== null && !Array.isArray(v);

// - sort the props of an object (and of the objects in it) for reading:
//   main props, other single values, then arrays and objects.
//   (the database doesn't keep the order of the props)
export const sortProps = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(sortProps);
  if (!isObject(value)) return value;
  const keys = Object.keys(value);
  const isNested = (k: string) => Array.isArray(value[k]) || isObject(value[k]);
  const first = firstProps.filter((k) => keys.includes(k) && !isNested(k));
  const singles = keys.filter((k) => !first.includes(k) && !isNested(k));
  const nested = keys.filter(isNested);
  const rank = (k: string) =>
    lastArrays.includes(k) ? lastArrays.indexOf(k) + 1 : 0;
  nested.sort((a, b) => rank(a) - rank(b)); // - stable: others keep their order
  const sorted: Obj = {};
  [...first, ...singles, ...nested].forEach((k) => {
    sorted[k] = sortProps(value[k]);
  });
  return sorted;
};

// - path of an invalid property from the server -> JSON pointer
//   "fields[2] (title).column" -> "/fields/2/column", "model" -> ""
export const invalidToPointer = (id: string): string => {
  if (id === "model") return "";
  const clean = id.replace(/\s*\([^)]*\)/g, "");
  const parts = clean.match(/[^.[\]]+/g) || [];
  return parts
    .map((p) => "/" + p.replace(/~/g, "~0").replace(/\//g, "~1"))
    .join("");
};

// - model as text for the editor (w/o the props managed by the server)
export const modelToText = (m: ModelDef | null | undefined): string => {
  if (!m) return "";
  const copy: Obj = { ...m };
  delete copy._version;
  delete copy._updatedAt;
  return JSON5.stringify(sortProps(copy), { space: 2, quote: '"' });
};

// - parse the editor text (throws a SyntaxError on invalid JSON5)
export const textToModel = (text: string): ModelDef => {
  const m = JSON5.parse(text);
  if (!m || typeof m !== "object" || Array.isArray(m)) {
    throw new SyntaxError("the model must be a JSON object { ... }");
  }
  return m as ModelDef;
};

// - starting point for a new model
export const newModelTemplate: ModelDef = {
  id: "book",
  title: "Books",
  name: "book",
  namePlural: "books",
  icon: "todo.png",
  active: true,
  titleField: "title",
  fields: [
    {
      id: "title",
      type: "text",
      label: "Title",
      required: true,
      inMany: true,
      inSearch: true,
    },
    {
      id: "genre",
      type: "lov",
      label: "Genre",
      inMany: true,
      list: [
        { id: 1, text: "Novel" },
        { id: 2, text: "Essay" },
      ],
    },
    { id: "notes", type: "textmultiline", label: "Notes", height: 4 },
  ],
};
