import { afterEach, describe, expect, it, vi } from "vitest";
import {
  deleteOne,
  getChart,
  getMany,
  getObjectSearch,
  getOne,
  insertOne,
  updateOne,
} from "./dao";
import { apiPath } from "./api";
import { removeModel, setModel } from "utils/moMa";

interface FetchCall {
  url: string;
  method?: string;
  body?: string;
}

const calls: FetchCall[] = [];

const mockFetch = (data: unknown, status = 200) => {
  calls.length = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn((url: string, options: RequestInit = {}) => {
      calls.push({
        url,
        method: options.method,
        body: options.body as string,
      });
      return Promise.resolve({
        ok: status < 400,
        status,
        statusText: "",
        json: () => Promise.resolve(data),
      } as Response);
    }),
  );
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getMany", () => {
  it("calls the list end-point w/ the query parameters", async () => {
    mockFetch([{ id: 1, title: "Buy milk", _full_count: 12 }]);
    const result = await getMany("todo", { page: 1, order: "title.asc" });
    expect(calls[0].url).toBe(
      `${apiPath}todo?page=1&order=title.asc&pageSize=50`,
    );
    expect(result.entity).toBe("todo");
    expect(result.count).toBe(1);
    expect(result.fullCount).toBe(12);
    expect(result.rows[0]._full_count).toBeUndefined();
  });

  it("returns an empty result w/o records", async () => {
    mockFetch([]);
    const result = await getMany("todo");
    expect(result.rows).toEqual([]);
    expect(result.fullCount).toBe(0);
  });
});

describe("getOne", () => {
  it("moves the sub-collections to the root of the record", async () => {
    setModel({
      id: "winecellar",
      name: "wine",
      namePlural: "wines",
      fields: [{ id: "name", type: "text", label: "Name", inMany: true }],
      collections: [
        {
          id: "wine_tastings",
          title: "Tastings",
          fields: [{ id: "comments", type: "text", label: "Comments" }],
        },
      ],
    });
    mockFetch({
      id: 3,
      name: "Chateau Latour",
      collections: { wine_tastings: [{ id: 7, comments: "Good" }] },
    });
    const record = await getOne("winecellar", 3);
    expect(calls[0].url).toBe(`${apiPath}winecellar/3`);
    expect(record.collections).toBeUndefined();
    expect(record.wine_tastings).toHaveLength(1);
    removeModel("winecellar");
  });

  it("throws when the record is not found", async () => {
    mockFetch(null);
    await expect(getOne("todo", 999)).rejects.toThrow("999");
  });

  it("throws the error message of the API", async () => {
    mockFetch({ error: 'Invalid id: "x".' }, 400);
    await expect(getOne("todo", 1)).rejects.toThrow('Invalid id: "x".');
  });
});

describe("insertOne and updateOne", () => {
  it("posts the record to the collection end-point", async () => {
    mockFetch({ id: 5, title: "New" });
    await insertOne("todo", { title: "New", category: { id: 2 } });
    expect(calls[0].url).toBe(`${apiPath}todo`);
    expect(calls[0].method).toBe("POST");
    expect(JSON.parse(calls[0].body as string)).toEqual({
      title: "New",
      category: 2,
    });
  });

  it("patches the record end-point w/ the changed fields", async () => {
    mockFetch({ id: 5, title: "Updated" });
    await updateOne("todo", 5, { title: "Updated" });
    expect(calls[0].url).toBe(`${apiPath}todo/5`);
    expect(calls[0].method).toBe("PATCH");
    expect(JSON.parse(calls[0].body as string)).toEqual({ title: "Updated" });
  });
});

describe("deleteOne", () => {
  it("deletes the record end-point", async () => {
    mockFetch({ id: 5 });
    const result = await deleteOne("todo", 5);
    expect(calls[0].method).toBe("DELETE");
    expect(result.id).toBe(5);
  });
});

describe("getObjectSearch", () => {
  it("searches the object as a list of values", async () => {
    mockFetch([{ id: 1, text: "Chateau Latour" }]);
    const options = await getObjectSearch("winecellar", "lat");
    expect(calls[0].url).toBe(`${apiPath}winecellar/lov/winecellar?search=lat`);
    expect(options[0]).toEqual({
      id: 1,
      name: "Chateau Latour",
      icon: undefined,
    });
  });
});

describe("getChart", () => {
  it("calls the chart end-point", async () => {
    mockFetch([{ id: 1, label: "Home", value: 4 }]);
    const data = await getChart("todo", "category");
    expect(calls[0].url).toBe(`${apiPath}todo/chart/category`);
    expect(data).toEqual([{ id: 1, label: "Home", value: 4 }]);
  });
});

describe("models (Designer)", () => {
  it("gets the models", async () => {
    const { getModelDefs } = await import("./dao");
    mockFetch([{ id: "todo", fields: [] }]);
    const defs = await getModelDefs();
    expect(calls[0].url).toBe(`${apiPath}meta/models`);
    expect(defs[0].id).toBe("todo");
  });

  it("checks a new model w/ POST and dryRun", async () => {
    const { saveModelDef } = await import("./dao");
    mockFetch({ model: { id: "book" }, sql: [], warnings: [], dryRun: true });
    await saveModelDef(
      { id: "book", name: "b", namePlural: "bs", fields: [] },
      { isNew: true, dryRun: true },
    );
    expect(calls[0].method).toBe("POST");
    expect(calls[0].url).toBe(`${apiPath}meta/models?dryRun=true`);
  });

  it("saves a model w/ PUT and its version", async () => {
    const { saveModelDef } = await import("./dao");
    mockFetch({ model: { id: "todo" }, sql: [], warnings: [], dryRun: false });
    await saveModelDef({
      id: "todo",
      name: "t",
      namePlural: "ts",
      fields: [],
      _version: 4,
    });
    expect(calls[0].method).toBe("PUT");
    expect(calls[0].url).toBe(`${apiPath}meta/models/todo`);
    expect(JSON.parse(calls[0].body!)._version).toBe(4);
  });

  it("keeps the list of invalid props in the error", async () => {
    const { saveModelDef } = await import("./dao");
    mockFetch(
      {
        error: "Invalid model",
        invalids: [{ id: "table", value: "a b", condition: "letters" }],
      },
      400,
    );
    await expect(
      saveModelDef({ id: "x", name: "x", namePlural: "xs", fields: [] }),
    ).rejects.toMatchObject({
      status: 400,
      invalids: [{ id: "table", value: "a b", condition: "letters" }],
    });
  });

  it("deletes a model", async () => {
    const { deleteModelDef } = await import("./dao");
    mockFetch({ id: "book" });
    await deleteModelDef("book");
    expect(calls[0].method).toBe("DELETE");
    expect(calls[0].url).toBe(`${apiPath}meta/models/book`);
  });
});
