import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";

import TableBody from "./TableBody";

describe("TableBody tests", () => {
  const fields = [
    { id: "name", type: "text", label: "text" },
    { id: "num", type: "integer", label: "integer" },
    { id: "bool", type: "boolean", label: "boolean" },
    { id: "img", type: "image", label: "image" },
    { id: "color", type: "color", label: "color" },
    { id: "url", type: "url", label: "url" },
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
          <TableBody
            fields={fields}
            data={data}
            link="/somewhere/"
            iconPath="/"
          />
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
