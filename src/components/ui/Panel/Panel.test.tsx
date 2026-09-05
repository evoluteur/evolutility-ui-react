import { render, screen } from "@testing-library/react";
import Panel from "./Panel";

describe("panel props test", () => {
  const props = {
    title: "my panel",
    collapsible: true,
    width: 120,
  };
  it("should render title in h2", () => {
    render(<Panel {...props} />);
    const panel = screen.getByTestId("panel");
    const h2Render = panel.querySelector("h2");
    expect(h2Render).toHaveTextContent(props.title);
  });
});

describe("panel widget tests", () => {
  it("test default props", () => {
    render(<Panel title="My Panel" />);
    const panel = screen.getByTestId("panel");
    expect(panel).toHaveTextContent("My Panel");
  });
});

describe("panel widget shows children", () => {
  it("test default props", () => {
    render(<Panel title="My Panel">children</Panel>);
    const panel = screen.getByTestId("panel");
    expect(panel).toHaveTextContent("children");
  });
});

describe("panel widget shows header and footer", () => {
  it("test default props", () => {
    render(<Panel title="My Panel" header="my head" footer="my foot" />);
    const panel = screen.getByTestId("panel");
    expect(panel).toHaveTextContent("my head");
    expect(panel).toHaveTextContent("my foot");
  });
});
