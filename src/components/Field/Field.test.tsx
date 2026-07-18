import { render, screen } from "@testing-library/react";
import Field from "./Field";
import type { Field as FieldDef, FieldType } from "types/model";

const noOp = () => {};

const simpleTest = (fType: FieldType, value?: string | number) =>
  it(`Field ${fType} shows`, async () => {
    const meta: FieldDef = { id: fType, type: fType, label: "Field " + fType };
    render(<Field fieldDef={meta} onChange={noOp} value={value || null} />);
    const f = screen.getByTestId("field-" + fType);
    expect(f).toBeInTheDocument();
    if (value) {
      expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    }
    const label = screen.getByTestId("fieldlabel");
    expect(label).toHaveTextContent("Field " + fType);
  });

describe("Editable field tests", () => {
  // TODO: all field types w/ more complex use-cases
  simpleTest("text", "abc");
  simpleTest("textmultiline", "abc");
  simpleTest("lov");
  simpleTest("boolean");
  simpleTest("email", "olivier@evolutility.com");
  simpleTest("url", "http://evolutility.com");
  simpleTest("integer", 1212);
  simpleTest("decimal", 12.12);
  simpleTest("money", 119.99);
  // simpleTest("date");
  simpleTest("time");
  simpleTest("image");
  simpleTest("document");
  simpleTest("json");
});
