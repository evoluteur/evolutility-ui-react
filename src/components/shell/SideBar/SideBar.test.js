import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import SideBar from "./SideBar";

describe("SideBar widget tests", () => {
  it("SideBar shows doc and  demo", async () => {
    render(
      <Router>
        <SideBar />
      </Router>
    );
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toHaveTextContent("Documentation");
    expect(sidebar).toHaveTextContent("Demos");
  });
});
