import {
  integerString,
  decimalString,
  moneyString,
  capitalize,
} from "./format";

test("check Integer formatting", () => {
  expect(integerString(-1000)).toEqual("-1,000");
  expect(integerString(-10)).toEqual("-10");
  expect(integerString(0)).toEqual("0");
  expect(integerString(1)).toEqual("1");
  expect(integerString(10)).toEqual("10");
  expect(integerString(1000)).toEqual("1,000");
});

test("check Decimal formatting", () => {
  expect(decimalString(-1.2)).toEqual("-1.20");
  expect(decimalString(-1.124)).toEqual("-1.12");
  expect(decimalString(-1.125)).toEqual("-1.12");
  expect(decimalString(-1.126)).toEqual("-1.13");
  expect(decimalString(0)).toEqual("0.00");
  expect(decimalString(1.1)).toEqual("1.10");
  expect(decimalString(1.12)).toEqual("1.12");
  expect(decimalString(1.124)).toEqual("1.12");
  expect(decimalString(1.125)).toEqual("1.13");
  expect(decimalString(1.126)).toEqual("1.13");
  expect(decimalString(10)).toEqual("10.00");
  expect(decimalString(101.5)).toEqual("101.50");
  expect(decimalString(1000)).toEqual("1,000.00");
});

test("check Money formatting", () => {
  expect(moneyString(-1.2)).toEqual("-$1.20");
  expect(moneyString(-1.124)).toEqual("-$1.12");
  expect(moneyString(-1.125)).toEqual("-$1.12");
  expect(moneyString(-1.126)).toEqual("-$1.13");
  expect(moneyString(0)).toEqual("$0.00");
  expect(moneyString(1.1)).toEqual("$1.10");
  expect(moneyString(1.12)).toEqual("$1.12");
  expect(moneyString(1.124)).toEqual("$1.12");
  expect(moneyString(1.125)).toEqual("$1.13");
  expect(moneyString(1.126)).toEqual("$1.13");
  expect(moneyString(10)).toEqual("$10.00");
  expect(moneyString(101.5)).toEqual("$101.50");
  expect(moneyString(1000)).toEqual("$1,000.00");
});

test("check capitalize", () => {
  expect(capitalize("aaa")).toEqual("Aaa");
  expect(capitalize("aaa bb")).toEqual("Aaa bb");
  expect(capitalize("Aaa")).toEqual("Aaa");
});
