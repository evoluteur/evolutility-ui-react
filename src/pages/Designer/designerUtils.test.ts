import { describe, expect, it } from "vitest";
import {
  invalidToPointer,
  modelToText,
  sortProps,
  textToModel,
} from "./designerUtils";
import type { ModelDef } from "types/api";

const model: ModelDef = {
  id: "todo",
  name: "task",
  namePlural: "tasks",
  _version: 3,
  _updatedAt: "2026-11-17",
  fields: [{ id: "title", type: "text", label: "Title", inMany: true }],
  collections: [{ id: "music-album", title: "Albums", fields: [] }],
};

describe("modelToText", () => {
  it("shows JSON5 w/o the props managed by the server", () => {
    const text = modelToText(model);
    expect(text).toContain('id: "todo"');
    expect(text).toContain('label: "Title"');
    expect(text).not.toContain("_version");
    expect(text).not.toContain("_updatedAt");
  });

  it("keeps double quotes for strings (and quotes keys only when needed)", () => {
    const text = modelToText({ ...model, "my-prop": "it's" } as ModelDef);
    expect(text).toContain('"my-prop": "it\'s"');
  });

  it("returns an empty text w/o model", () => {
    expect(modelToText(null)).toBe("");
  });
});

describe("textToModel", () => {
  it("reads its own output", () => {
    const { _version, _updatedAt, ...rest } = model;
    expect(textToModel(modelToText(model))).toEqual(rest);
    expect(_version && _updatedAt).toBeTruthy();
  });

  it("accepts comments, trailing commas, single quotes, and plain JSON", () => {
    const m = textToModel(`{
      // - the model
      id: 'todo', /* inline */
      fields: [{ id: "title", },],
    }`);
    expect(m).toEqual({ id: "todo", fields: [{ id: "title" }] });
    expect(textToModel('{"id": "todo"}')).toEqual({ id: "todo" });
  });

  it("refuses invalid JSON5 and non-objects", () => {
    expect(() => textToModel("{ oops")).toThrow(SyntaxError);
    expect(() => textToModel("[1, 2]")).toThrow(SyntaxError);
  });
});

describe("sortProps", () => {
  it("shows main props, other single values, then arrays", () => {
    // - order of the keys as Postgres (jsonb) returns them
    const fromDB = {
      id: "todo",
      icon: "todo.png",
      name: "task",
      pKey: "id",
      table: "task",
      title: "To-Do List",
      groups: [],
      fields: [
        {
          id: "category",
          list: [{ id: 1, text: "A" }],
          type: "lov",
          label: "Category",
          column: "category_id",
        },
      ],
      noStats: true,
      namePlural: "tasks",
      collections: [],
    };
    const sorted = sortProps(fromDB) as Record<string, unknown>;
    expect(Object.keys(sorted)).toEqual([
      "id",
      "title",
      "name",
      "namePlural",
      "icon",
      "pKey",
      "table",
      "noStats",
      "fields",
      "groups",
      "collections",
    ]);
    const field = (sorted.fields as Record<string, unknown>[])[0];
    expect(Object.keys(field)).toEqual([
      "id",
      "type",
      "label",
      "column",
      "list",
    ]);
  });

  it("doesn't change values", () => {
    const m = { b: [3, { y: 1, x: 2 }], a: "x", id: 1 };
    expect(sortProps(m)).toEqual(m);
  });
});

describe("invalidToPointer", () => {
  it("converts the paths of the server to JSON pointers", () => {
    expect(invalidToPointer("table")).toBe("/table");
    expect(invalidToPointer("fields[2].id")).toBe("/fields/2/id");
    expect(invalidToPointer("fields[2] (title).column")).toBe(
      "/fields/2/column",
    );
    expect(invalidToPointer("fields[0] (genre).list[1].id")).toBe(
      "/fields/0/list/1/id",
    );
    expect(invalidToPointer("collections[0].orderBy")).toBe(
      "/collections/0/orderBy",
    );
    expect(invalidToPointer("model")).toBe("");
  });
});
