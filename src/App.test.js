/* eslint-disable import/no-extraneous-dependencies */
import "core-js/modules/web.structured-clone";
import { render, screen } from "@testing-library/react";

import App from "./App";

test("shows app", () => {
  window.scrollTo = jest.fn();
  render(<App />);
  expect(screen.getByTestId("app")).toBeInTheDocument();
  expect(screen.getByText("Evolutility-UI-React")).toBeInTheDocument();
});
