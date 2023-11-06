import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";

import TableBody from "./TableBody";

describe("TableBody tests", () => {
  const fields = [
    { id: "name", type: "text" },
    { id: "num", type: "integer" },
    { id: "bool", type: "boolean" },
    { id: "img", type: "image" },
    { id: "color", type: "color" },
    { id: "url", type: "url" },
  ];
  const data = [
    {
      id: 1,
      name: "abc",
      num: 5,
      bool: true,
      img: "/pix/abc.png",
      color: "blue",
      url: "http://evolutility.com",
    },
    { id: 2, name: "xyz", num: 99, bool: false, color: "green" },
    { id: 12 },
  ];
  it("TableBody shows message w/ no search", async () => {
    render(
      <Router>
        <table>
          <TableBody fields={fields} data={data} />
        </table>
      </Router>
    );
    const component = screen.queryByTestId("tbody");
    ["abc", "5", "xyz", "12", "http://evolutility.com"].forEach((v) =>
      expect(component).toHaveTextContent(v)
    );
    expect(component).toHaveTextContent("(12)");
  });
});
