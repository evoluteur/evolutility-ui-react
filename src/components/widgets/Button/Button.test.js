/* eslint-disable testing-library/no-await-sync-query */
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Button from "./Button";
import { MemoryRouter as Router } from "react-router-dom";

describe("button widget tests", () => {
  it("reder Button component", () => {
    const noop = () => {};
    render(<Button label="Submit" onClick={noop} />);
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
  });
  it("Button renders with correct label", () => {
    const noop = () => {};
    render(<Button label="Submit" onClick={noop} type="default" />);
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Submit");
  });
  it("Button click event", async () => {
    const noop = () => {};
    render(<Button label="Submit" onClick={noop} />);
    const button = await screen.findByTestId("button");
    user.click(button);
    //expect(noop).toHaveBeenCalled();
    expect(button).toBeInTheDocument();
  });
  it("Button click event with onClick", async () => {
    const noop = () => {};
    render(<Button label="Submit" onClick={noop} />);
    const button = await screen.findByTestId("button");
    user.click(button);
    //expect(noop).toHaveBeenCalled();
    expect(button).toBeInTheDocument();
  });
  it("Button event with url", async () => {
    render(
      <Router>
        <Button label="Submit" url="https://evoluteur.github.io/" />
      </Router>
    );
    // user.click(link);
    const hello = await screen.getByText("Submit");
    expect(hello).toHaveTextContent("Submit");
  });
  it("Button property test add type", async () => {
    const noop = () => {};
    render(<Button type="primary" label="Default" onClick={noop} />);
    const button = await screen.findByTestId("button");
    expect(button).toBeInTheDocument();
  });
  it("Button property test add icon", async () => {
    const noop = () => {};
    render(<Button icon="account" label="Default" onClick={noop} />);
    const button = await screen.findByTestId("button");
    expect(button).toBeInTheDocument();
  });
  it("Button property test add class", async () => {
    const noop = () => {};
    render(
      <Button className="btn btn-primary" label="Default" onClick={noop} />
    );
    const button = await screen.findByTestId("button");
    expect(button).toBeInTheDocument();
  });
});
