/* eslint-disable jest/no-conditional-expect */
import { render, screen } from "@testing-library/react";
import Field from "./Field";

const noOp = () => {};
const callbacks = { change: noOp };

const simpleTest = (fType, value) =>
  it(`Field ${fType} shows`, async () => {
    const meta = { id: fType, type: fType, label: "Field " + fType };
    render(
      <Field fieldDef={meta} callbacks={callbacks} value={value || null} />
    );
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
  simpleTest("image");
  simpleTest("time");
  simpleTest("document");
  simpleTest("json");
});
