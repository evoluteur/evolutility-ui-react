import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

describe("badge props test", () => {
  const props = {
    text: "My Badge!",
  };
  it("should render text My Badge in span", () => {
    render(<Badge {...props} />);
    const badge = screen.getByTestId("badge");
    const spanRender = badge.querySelector("span");
    expect(spanRender).toHaveTextContent(props.text);
  });
});

describe("badge text tests", () => {
  it("badge shows text string correctly", async () => {
    render(<Badge text="You got a badge!" />);
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveTextContent("You got a badge!");
  });
  it("badge shows number correctly", async () => {
    render(<Badge text={4152341234} />);
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveTextContent("4152341234");
  });
  it("badge shows double byte text correctly", async () => {
    render(<Badge text="美味しい" />);
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveTextContent("美味しい");
  });
  it("badge shows special character text correctly", async () => {
    render(<Badge text="Ça va? #@$%" />);
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveTextContent("Ça va? #@$%");
  });
});
