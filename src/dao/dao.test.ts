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
    mockFetch({
      id: 3,
      name: "Chateau Latour",
      collections: { wine_tastings: [{ id: 7, comments: "Good" }] },
    });
    const record = await getOne("winecellar", 3);
    expect(calls[0].url).toBe(`${apiPath}winecellar/3`);
    expect(record.collections).toBeUndefined();
    expect(record.wine_tastings).toHaveLength(1);
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
