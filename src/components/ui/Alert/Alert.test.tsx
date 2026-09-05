import { render, screen, cleanup } from "@testing-library/react";
import Alert from "./Alert";

afterEach(cleanup);

describe("alert props test", () => {
  const props = {
    title: "Alert!",
    message: "You got alert!",
    type: "success" as const,
  };
  it("should render title in strong", () => {
    render(<Alert {...props} />);
    const alert = screen.getByTestId("alert");
    const strongRender = alert.querySelector("strong");
    expect(strongRender).toHaveTextContent(props.title);
  });
});
describe("alert widget tests", () => {
  it("alert has title and message", async () => {
    render(<Alert title="Hello!" message="you have alert" type="danger" />);
    const alert = screen.getByTestId("alert");
    expect(alert).toHaveTextContent("Hello!");
    expect(alert).toHaveTextContent("you have alert");
  });
  it("alert has null title and message", async () => {
    render(<Alert title="" message="you have alert" type="danger" />);
    const alert = screen.getByTestId("alert");
    expect(alert).toHaveTextContent("you have alert");
  });
  it("test type: info", async () => {
    render(<Alert title="" message="info alert" type="info" />);
    const alert = screen.getByTestId("alert");
    expect(alert).toHaveTextContent("info alert");
  });
  it("test type: success", async () => {
    render(<Alert title="" message="success alert" type="success" />);
    const alert = screen.getByTestId("alert");
    expect(alert).toHaveTextContent("success alert");
  });
  it("test type: warning", async () => {
    render(<Alert title="" message="warning alert" type="warning" />);
    const alert = screen.getByTestId("alert");
    expect(alert).toHaveTextContent("warning alert");
  });
});
