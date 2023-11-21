/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import Panel from "./Panel";
import renderer from "react-test-renderer";

describe("panel props test", () => {
  let panelToTest;
  const props = {
    title: "my panel",
    collapsible: true,
    width: 120,
    header: null,
    footer: null,
    children: null,
    className: null,
  };
  beforeEach(() => {
    const testInstance = renderer.create(<Panel {...props} />);
    panelToTest = testInstance.root;
  });
  it("should render title in h2", () => {
    const strongRender = panelToTest.findByType("h2");
    expect(strongRender.children).toEqual([props.title]);
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
