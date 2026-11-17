import { afterEach, describe, expect, it } from "vitest";
import todo from "../fixtures/todo";
import {
  getModel,
  models,
  modelsArray,
  modelsError,
  removeModel,
  setModel,
  setModels,
  setModelsError,
} from "./moMa";
import type { ModelInput } from "types/model";

const book: ModelInput = {
  id: "book",
  name: "book",
  namePlural: "books",
  active: true,
  fields: [{ id: "title", type: "text", label: "Title", inMany: true }],
};

afterEach(() => setModels([todo]));

describe("moMa", () => {
  it("has the models that were set", () => {
    expect(getModel("todo")?.fieldsH.title).toBeDefined();
    expect(modelsArray.map((m) => m.id)).toEqual(["todo"]);
  });

  it("setModel adds a prepared model, in the same objects", () => {
    const ref = models;
    const refArr = modelsArray;
    setModel(book);
    expect(ref).toBe(models);
    expect(refArr).toBe(modelsArray);
    expect(getModel("book")?.fieldsH.title).toBeDefined();
    expect(getModel("book")?.title).toBe("Books");
    expect(book.fieldsH).toBeUndefined(); // - input not mutated
  });

  it("setModel replaces a model", () => {
    setModel({ ...book, title: "My books" });
    setModel({ ...book, title: "Library" });
    expect(getModel("book")?.title).toBe("Library");
  });

  it("removeModel removes it", () => {
    setModel(book);
    removeModel("book");
    expect(getModel("book")).toBeNull();
  });

  it("lists only active models", () => {
    setModels([book, { ...book, id: "old", active: false }]);
    expect(modelsArray.map((m) => m.id)).toEqual(["book"]);
    expect(getModel("old")).not.toBeNull();
  });

  it("keeps the error when models can't be loaded", () => {
    setModelsError("Failed to fetch.");
    expect(modelsError).toBe("Failed to fetch.");
    setModels([todo]);
    expect(modelsError).toBeNull();
  });
});
