import { validate, validateField, diffData } from "./validation";

const intField = {
  id: "integer",
  type: "integer",
  label: "Integer",
  min: 5,
  max: 10,
};
const decField = {
  id: "decimal",
  type: "decimal",
  label: "Decimal",
  min: 1.5,
  max: 2.5,
};
const textField = {
  id: "text",
  type: "text",
  label: "Text",
  minLength: 5,
  maxLength: 10,
  required: true,
};
const emailField = {
  id: "email",
  type: "email",
  label: "Email",
};

// ---------- validate test ----------
describe("validate tests", () => {
  test("check validate ok", () => {
    const model = { fields: [intField, decField, textField, emailField] };
    const data = {
      integer: 5,
      decimal: 2.5,
      text: "abcdef",
      email: "olivier@evolutility.com",
    };
    expect(validate(model, data).isValid).toBe(true);
  });
  test("check validate fail", () => {
    const model = { fields: [intField] };
    const data = {
      integer: "abc",
    };
    expect(validate(model, data).isValid).toBe(false);
  });
});

// ---------- validateField tests ----------
describe("validateField tests", () => {
  test("check Integer validation", () => {
    // pass
    expect(validateField(intField, null)).toBe("");
    expect(validateField(intField, undefined)).toBe("");
    expect(validateField(intField, 5)).toBe("");
    expect(validateField(intField, 8)).toBe("");
    expect(validateField(intField, 10)).toBe("");
    // fail
    expect(validateField(intField, 11)).not.toBe("");
    expect(validateField(intField, "abc")).not.toBe("");
    expect(validateField(intField, 1)).not.toBe("");
  });

  test("check Decimal validation", () => {
    // pass
    expect(validateField(decField, null)).toBe("");
    expect(validateField(decField, undefined)).toBe("");
    expect(validateField(decField, 1.5)).toBe("");
    expect(validateField(decField, 2)).toBe("");
    expect(validateField(decField, 2.5)).toBe("");
    // fail
    expect(validateField(decField, 3)).not.toBe("");
    expect(validateField(decField, "abc")).not.toBe("");
    expect(validateField(decField, 1)).not.toBe("");
  });

  test("check Text validation", () => {
    expect(validateField(textField, null)).not.toBe("");
    expect(validateField(textField, undefined)).not.toBe("");
    textField.required = false;
    expect(validateField(textField, null)).toBe("");
    expect(validateField(textField, undefined)).toBe("");
    expect(validateField(textField, "12345")).toBe("");
    expect(validateField(textField, "1234567")).toBe("");
    expect(validateField(textField, "morethan10characters")).not.toBe("");
    textField.maxLength = null;
    expect(validateField(textField, "morethan10characters")).toBe("");
    expect(validateField(textField, "abc")).not.toBe("");
    textField.minLength = null;
    expect(validateField(textField, "abc")).toBe("");
  });

  test("check Email validation", () => {
    // pass
    expect(validateField(emailField, null)).toBe("");
    expect(validateField(emailField, undefined)).toBe("");
    expect(validateField(emailField, "olivier@evolutility.com")).toBe("");
    // fail
    expect(validateField(emailField, "123")).not.toBe("");
    expect(validateField(emailField, "olivier@")).not.toBe("");
    expect(validateField(emailField, "olivier@evolutility")).not.toBe("");
    emailField.required = true;
    expect(validateField(emailField, null)).not.toBe("");
    expect(validateField(emailField, undefined)).not.toBe("");
  });

  test("check Required validation", () => {
    const fieldDef = {
      id: "req",
      type: "text",
      label: "Req",
      required: true,
    };
    // pass
    expect(validateField(fieldDef, "a")).toBe("");
    expect(validateField(fieldDef, 0)).toBe("");
    // fail
    expect(validateField(fieldDef, null)).not.toBe("");
    expect(validateField(fieldDef, undefined)).not.toBe("");
  });
});

// ---------- diffData tests ----------
describe("diffData tests", () => {
  const model = {
    fields: [{ id: "name" }, { id: "email" }],
  };
  const data1 = {
    name: "Olivier",
    email: "evoluteur@evolutility.com",
  };
  test("check diffData same object", () => {
    expect(diffData(model, data1, data1)).toBe(null);
  });

  test("check diffData w/ delta", () => {
    const data2 = {
      name: null,
      email: "evoluteur@evolutility.com",
    };
    const data3 = {
      name: "John",
      email: "john@evolutility.com",
    };
    expect(diffData(model, data1, data1)).toBe(null);
    let deltaKeys = Object.keys(diffData(model, data1, data2));
    expect(deltaKeys.length).toBe(1);
    expect(deltaKeys[0]).toBe("name");
    deltaKeys = Object.keys(diffData(model, data1, data3));
    expect(deltaKeys.length).toBe(2);
    expect(deltaKeys[0]).toBe("name");
    expect(deltaKeys[1]).toBe("email");
  });
});
