import { render, screen } from "@testing-library/react";
import FieldLabel from "./FieldLabel";
import type { Field } from "types/model";

const fieldRequired: Field = {
  id: "name",
  label: "Name",
  type: "text",
  help: "hello",
  required: true,
};
const fieldNotRequired: Field = {
  ...fieldRequired,
  required: false,
  help: undefined,
};

describe("fieldlabel tests", () => {
  it("FieldLabel shows label and * for required", async () => {
    render(<FieldLabel field={fieldRequired} />);
    const fLabel = screen.getByTestId("fieldlabel");
    expect(fLabel).toHaveTextContent("Name");
    expect(fLabel).toHaveTextContent("*");
    const star = screen.queryByTestId("fl-required");
    expect(star).toBeInTheDocument();
    const help = screen.queryByTestId("fl-help");
    expect(help).toBeInTheDocument();
  });
  it("FieldLabel shows label and no *", async () => {
    render(<FieldLabel field={fieldNotRequired} />);
    const fLabel = screen.getByTestId("fieldlabel");
    expect(fLabel).toHaveTextContent("Name");
    const star = screen.queryByTestId("fl-required");
    expect(star).not.toBeInTheDocument();
    const help = screen.queryByTestId("fl-help");
    expect(help).not.toBeInTheDocument();
  });
});
