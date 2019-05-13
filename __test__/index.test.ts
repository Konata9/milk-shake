import {shake, checkParams} from "../src/index";

// check params
test("check params not null", () =>
  expect(() => checkParams(null)).toThrow("params can not be null"));

test("check params type is object", () =>
  expect(() => checkParams("aaa")).toThrow("params must be {}"));

// shake test
