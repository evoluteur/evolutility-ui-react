import { validateField } from "./validation";

test("check Integer validation", () => {
  const fieldDef = {
    id: "integer",
    type: "integer",
    label: "Integer",
    min: 5,
    max: 10,
  };
  expect(validateField(fieldDef, null)).toBe("");
  expect(validateField(fieldDef, undefined)).toBe("");
  expect(validateField(fieldDef, "abc")).not.toBe("");
  expect(validateField(fieldDef, 1)).not.toBe("");
  expect(validateField(fieldDef, 5)).toBe("");
  expect(validateField(fieldDef, 8)).toBe("");
  expect(validateField(fieldDef, 10)).toBe("");
  expect(validateField(fieldDef, 11)).not.toBe("");
});

test("check Decimal validation", () => {
  const fieldDef = {
    id: "decimal",
    type: "decimal",
    label: "Decimal",
    min: 1.5,
    max: 2.5,
  };
  expect(validateField(fieldDef, null)).toBe("");
  expect(validateField(fieldDef, undefined)).toBe("");
  expect(validateField(fieldDef, "abc")).not.toBe("");
  expect(validateField(fieldDef, 1)).not.toBe("");
  expect(validateField(fieldDef, 1.5)).toBe("");
  expect(validateField(fieldDef, 2)).toBe("");
  expect(validateField(fieldDef, 2.5)).toBe("");
  expect(validateField(fieldDef, 3)).not.toBe("");
});

test("check Text validation", () => {
  const fieldDef = {
    id: "text",
    type: "text",
    label: "Text",
    minLength: 5,
    maxLength: 10,
  };
  expect(validateField(fieldDef, null)).toBe("");
  expect(validateField(fieldDef, undefined)).toBe("");
  expect(validateField(fieldDef, "123")).not.toBe("");
  expect(validateField(fieldDef, "12345")).toBe("");
  expect(validateField(fieldDef, "1234567")).toBe("");
  expect(validateField(fieldDef, "1234567890123")).not.toBe("");
});

test("check Email validation", () => {
  const fieldDef = {
    id: "email",
    type: "email",
    label: "Email",
  };
  expect(validateField(fieldDef, null)).toBe("");
  expect(validateField(fieldDef, undefined)).toBe("");
  expect(validateField(fieldDef, "123")).not.toBe("");
  expect(validateField(fieldDef, "olivier@")).not.toBe("");
  expect(validateField(fieldDef, "olivier@evolutility")).not.toBe("");
  expect(validateField(fieldDef, "olivier@evolutility.com")).toBe("");
});

test("check Required validation", () => {
  const fieldDef = {
    id: "req",
    label: "Req",
    required: true,
  };
  expect(validateField(fieldDef, null)).not.toBe("");
  expect(validateField(fieldDef, undefined)).not.toBe("");
  expect(validateField(fieldDef, "a")).toBe("");
  expect(validateField(fieldDef, 0)).toBe("");
});
