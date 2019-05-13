import {checkFormatMethodParams, setFormatMethod, format} from "../src/format";
import typeCheck from "@konata9/typecheck.js";

// checkFormatMethodParams
test("method value check null", () =>
  expect(() => checkFormatMethodParams(null)).toThrow(
    "method must hava a value"
  ));

test("method value type check not string", () =>
  expect(() => checkFormatMethodParams(123)).toThrow(
    "method must be a string type or a function"
  ));

test("method value type check stirng value error", () =>
  expect(() => checkFormatMethodParams("toOther")).toThrow(
    'method must be "toCamel" or "toSnake"'
  ));

// setFormatMethod
test("formatmethod retun a method: toCamel", () =>
  expect(typeCheck(setFormatMethod("toCamel"))).toBe("function"));

test("formatmethod retun a method: toSnake", () =>
  expect(typeCheck(setFormatMethod("toSnake"))).toBe("function"));

test("formatmethod retun a method: (key)=>key", () =>
  expect(typeCheck(setFormatMethod((key) => key))).toBe("function"));

// format
// simplest
const snakeObject = {user_name: "konata"};
const camelObject = {userName: "konata"};
test("format camel/snake test", () =>
  expect(format("toCamel")(snakeObject)).toEqual(camelObject));

test("format camel/snake test", () =>
  expect(format("toSnake")(camelObject)).toEqual(snakeObject));

const customObject = {_user_name_: "konata"};
test("format custom test", () =>
  expect(format((key) => `_${key}_`)(snakeObject)).toEqual(customObject));

// with exclude
const snakeObjectWithExclude = {user_name: "konata", user_age: 18};
const camelObjectWithExclude = {userName: "konata", user_age: 18};
test("format camel/snake test", () =>
  expect(format("toCamel", ["user_age"])(snakeObjectWithExclude)).toEqual(
    camelObjectWithExclude
  ));

test("format camel/snake test", () =>
  expect(format("toSnake", ["user_age"])(camelObjectWithExclude)).toEqual(
    snakeObjectWithExclude
  ));

const customObjectWithExclude = {_user_name_: "konata", user_age: 18};
test("format custom test", () =>
  expect(
    format((key) => `_${key}_`, ["user_age"])(snakeObjectWithExclude)
  ).toEqual(customObjectWithExclude));

// null value

// with deep object

// with array

// with deep object/array mix