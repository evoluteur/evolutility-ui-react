// Evolutility-UI-React :: pages/Designer/designerUtils.ts
// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import type { ModelDef } from "types/api";

// - model as text for the editor (w/o the props managed by the server)
export const modelToText = (m: ModelDef | null | undefined): string => {
  if (!m) return "";
  const copy: Record<string, unknown> = { ...m };
  delete copy._version;
  delete copy._updatedAt;
  return JSON.stringify(copy, null, 2);
};

// - parse the editor text (throws a SyntaxError on invalid JSON)
export const textToModel = (text: string): ModelDef => {
  const m = JSON.parse(text);
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
