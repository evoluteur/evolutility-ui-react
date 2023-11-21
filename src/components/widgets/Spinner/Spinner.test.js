import { render, screen } from "@testing-library/react";
import Spinner from "./Spinner";
import { i18n_nav } from "../../../i18n/i18n";

describe("Spinner widget tests", () => {
  it("check default text", () => {
    render(<Spinner />);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toHaveTextContent(i18n_nav.loading);
  });
  it("check children", () => {
    render(<Spinner message={"I am Spinner"} />);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toHaveTextContent("I am Spinner");
  });
});
