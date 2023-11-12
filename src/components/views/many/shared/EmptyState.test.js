import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";

import { i18n_msg as i18n } from "../../../../i18n/i18n";

import EmptyState from "./EmptyState";

describe("EmptyState tests", () => {
  const model = { id: "test", name: "test", namePlural: "tests", fields: [] };
  it("EmptyState shows message w/ no filters", async () => {
    render(
      <Router>
        <EmptyState model={model} />
      </Router>
    );
    const component = screen.queryByTestId("emptystate");
    expect(component).toHaveTextContent(i18n.noResults);
    const msg = i18n.empty.replaceAll("{0}", model.namePlural);
    expect(component).toHaveTextContent(msg);
  });
  it("EmptyState shows message w/ filters", async () => {
    render(
      <Router>
        <EmptyState model={model} hasFilters={true} />
      </Router>
    );
    const component = screen.queryByTestId("emptystate");
    expect(component).toHaveTextContent(i18n.noResults);
    const msg = i18n.noData.replaceAll("{0}", model.namePlural);
    expect(component).toHaveTextContent(msg);
  });
});
