import { describe, expect, it } from "vitest";
import {
  recordToRest,
  restToChart,
  restToRecord,
  restToRecords,
  restToStats,
} from "./mapping";
import { prepModel } from "utils/moMaPrep";
import type { Model, ModelInput } from "types/model";

const model: Model = prepModel({
  id: "test",
  name: "test",
  namePlural: "tests",
  titleField: "title",
  fields: [
    { id: "title", type: "text", label: "Title", inMany: true, inSearch: true },
    { id: "duedate", type: "date", label: "Due date" },
    { id: "done", type: "boolean", label: "Done" },
    { id: "price", type: "money", label: "Price" },
    {
      id: "category",
      type: "lov",
      label: "Category",
      lovIcon: true,
      list: [{ id: 1, text: "Home" }],
    },
  ],
} as ModelInput);

describe("restToRecord", () => {
  it("nests lov fields into a single value", () => {
    const record = restToRecord(model.fields, {
      id: 1,
      title: "Buy milk",
      category: 3,
      category_txt: "Home",
      category_icon: "home.png",
      _full_count: 42,
    });
    expect(record.category).toEqual({
      id: 3,
      name: "Home",
      icon: "home.png",
    });
    expect(record.category_txt).toBeUndefined();
    expect(record.category_icon).toBeUndefined();
    expect(record._full_count).toBeUndefined();
    expect(record.title).toBe("Buy milk");
  });

  it("returns null for empty lov fields", () => {
    const record = restToRecord(model.fields, { id: 1, category: null });
    expect(record.category).toBeNull();
  });

  it("maps a list of records", () => {
    expect(restToRecords(model.fields, null)).toEqual([]);
    expect(restToRecords(model.fields, [{ id: 1 }, { id: 2 }])).toHaveLength(2);
  });
});

describe("recordToRest", () => {
  it("sends the id of lov fields", () => {
    const payload = recordToRest(model, {
      category: { id: 3, name: "Home" },
    });
    expect(payload.category).toBe(3);
  });

  it("sends null for empty values", () => {
    const payload = recordToRest(model, {
      category: "",
      duedate: null,
      price: "",
    });
    expect(payload.category).toBeNull();
    expect(payload.duedate).toBeNull();
    expect(payload.price).toBeNull();
  });

  it("converts dates to ISO strings and booleans", () => {
    const payload = recordToRest(model, {
      duedate: new Date(Date.UTC(2026, 0, 5)),
      done: 1,
    });
    expect(payload.duedate).toBe("2026-01-05T00:00:00.000Z");
    expect(payload.done).toBe(true);
  });

  it("ignores fields not in the record", () => {
    const payload = recordToRest(model, { title: "x" });
    expect(Object.keys(payload)).toEqual(["title"]);
  });
});

describe("restToChart", () => {
  it("keeps labelled values only", () => {
    expect(
      restToChart([
        { id: 1, label: "Home", value: 3 },
        { id: 2, label: "Work", value: 0 },
        { id: 0, label: null, value: 7 },
      ]),
    ).toEqual([{ id: 1, label: "Home", value: 3 }]);
  });
});

describe("restToStats", () => {
  it("groups the aggregations per field", () => {
    const stats = restToStats(model, {
      count: 10,
      price: { min: 1, max: 5, avg: 2.5, sum: 25 },
      nulls: { title: 0, price: 2, category: 1 },
      u_date_max: "2026-01-05",
      c_date_min: "2025-01-05",
      u_date_week_count: 3,
    });
    expect(stats.count).toBe(10);
    expect(stats.title).toEqual({ nulls: 0 });
    expect(stats.price.nulls).toBe(2);
    expect(stats.price.min).toBe(1);
    expect(stats.price.avg).toBe("2.50");
    expect(stats.category).toEqual({ nulls: 1 });
    expect(stats.updated_at_max).toBe("2026-01-05");
    expect(stats.created_at_min).toBe("2025-01-05");
    expect(stats.updated_at_week_count).toBe(3);
  });
});
