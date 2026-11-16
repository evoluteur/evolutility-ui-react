import {
  parseFilters,
  filterParam,
  setFilter,
  removeFilter,
  setSearch,
  clearFilters,
  filterValueText,
  fieldOperators,
} from "./filters";
import type { Field } from "types/model";

const fields = [
  { id: "title", type: "text", label: "Title" },
  { id: "priority", type: "lov", label: "Priority" },
  { id: "complete", type: "boolean", label: "Complete" },
  { id: "duedate", type: "date", label: "Due date" },
] as Field[];

describe("filters utils", () => {
  it("parses filters from the query and ignores reserved/unknown params", () => {
    const q = {
      title: "ct.abc.d",
      priority: "in.1,2",
      complete: "1",
      order: "title.asc",
      page: 2,
      search: "x",
      foo: "eq.1",
    };
    expect(parseFilters(q, fields)).toEqual([
      { fieldId: "title", operator: "ct", value: "abc.d" },
      { fieldId: "priority", operator: "in", value: "1,2" },
      { fieldId: "complete", operator: "1", value: "" },
    ]);
  });

  it("builds URL values", () => {
    expect(filterParam({ fieldId: "a", operator: "sw", value: "z" })).toBe(
      "sw.z",
    );
    expect(filterParam({ fieldId: "a", operator: "nn", value: "z" })).toBe(
      "nn",
    );
  });

  it("sets, replaces and removes filters (and resets paging)", () => {
    const q = { page: 3, order: "title.asc", title: "ct.a" };
    expect(
      setFilter(q, { fieldId: "duedate", operator: "gt", value: "2026-01-01" }),
    ).toEqual({ order: "title.asc", title: "ct.a", duedate: "gt.2026-01-01" });
    expect(
      setFilter(q, { fieldId: "complete", operator: "0", value: "" }, "title"),
    ).toEqual({ order: "title.asc", complete: "0" });
    expect(removeFilter(q, "title")).toEqual({ order: "title.asc" });
    expect(setSearch(q, "abc")).toEqual({
      order: "title.asc",
      title: "ct.a",
      search: "abc",
    });
    expect(clearFilters({ ...q, search: "x" })).toEqual({ order: "title.asc" });
  });

  it("shows lov names instead of ids", () => {
    const list = [
      { id: 1, text: "High" },
      { id: 2, text: "Low" },
    ];
    expect(
      filterValueText(
        { fieldId: "priority", operator: "in", value: "1,2" },
        list,
      ),
    ).toBe("High, Low");
  });

  it("gives operators by field type", () => {
    expect(fieldOperators(fields[2])).toEqual(["1", "0"]);
    expect(fieldOperators(fields[1])).toContain("in");
    expect(fieldOperators(fields[3])).toContain("gte");
  });
});
