import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { i18n_filters as i18n } from "i18n/i18n";
import FiltersBar from "./FiltersBar";
import type { Field, Model } from "types/model";

const fields = [
  { id: "title", type: "text", label: "Title" },
  {
    id: "priority",
    type: "lov",
    label: "Priority",
    list: [
      { id: 1, text: "High" },
      { id: 2, text: "Low" },
    ],
  },
] as Field[];

const model = {
  id: "todo",
  name: "task",
  namePlural: "tasks",
  fields,
  fieldsH: { title: fields[0], priority: fields[1] },
} as unknown as Model;

const renderBar = (query = {}) =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <Router>
        <FiltersBar entity="todo" model={model} view="list" query={query} />
      </Router>
    </QueryClientProvider>,
  );

describe("FiltersBar tests", () => {
  it("shows the search box and no chips w/o filters", () => {
    renderBar();
    expect(screen.getByTestId("filtersbar")).toBeInTheDocument();
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(screen.queryByText(i18n.clearAll)).not.toBeInTheDocument();
  });

  it("shows a chip per filter w/ readable values", () => {
    renderBar({ title: "ct.abc", priority: "in.1,2", search: "foo" });
    expect(screen.getByRole("searchbox")).toHaveValue("foo");
    expect(screen.getByText("High, Low", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("abc", { exact: false })).toBeInTheDocument();
    expect(screen.getByText(i18n.clearAll)).toBeInTheDocument();
  });

  it("opens the filter form", () => {
    renderBar();
    fireEvent.click(screen.getByText(i18n.addFilter));
    expect(screen.getByTestId("filterform")).toBeInTheDocument();
    expect(screen.getByText(i18n.apply)).toBeDisabled();
  });
});
