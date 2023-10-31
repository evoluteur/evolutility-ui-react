import { render, screen } from "@testing-library/react";
import packageInfo from "../../../../package.json";
import Footer from "./Footer";

const { version } = packageInfo;

describe("footer widget tests", () => {
  it("footer shows version and author", async () => {
    render(<Footer />);
    const footer = screen.getByTestId("footer");
    expect(footer).toHaveTextContent("Olivier Giulieri");
    expect(footer).toHaveTextContent("Evolutility-UI-React");
    expect(footer).toHaveTextContent(version);
  });
});
