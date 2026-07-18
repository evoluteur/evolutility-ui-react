import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";

import config from "config";

import ViewHeader from "./ViewHeader";

const { withComments } = config;

describe("ViewHeader tests", () => {
  it("ViewHeader shows props values", async () => {
    render(
      <Router>
        <ViewHeader
          entity="x"
          id=""
          view="list"
          title="title-test"
          count={50}
          comments={2}
          text="text-test"
        />
      </Router>,
    );
    const vh = screen.queryByTestId("viewheader");
    expect(vh).toHaveTextContent("title-test");
    expect(vh).toHaveTextContent("50");
    if (withComments) {
      expect(vh).toHaveTextContent("2");
    } else {
      expect(vh).not.toHaveTextContent("2");
    }

    expect(vh).toHaveTextContent("text-test");
  });
});
