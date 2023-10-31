import { render, screen } from "@testing-library/react";
import Spinner from "./Spinner";

describe("Spinner widget tests", () => {
  it("check children", () => {
    render(<Spinner message={"I am Spinner"} />);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toHaveTextContent("I am Spinner");
  });
});
