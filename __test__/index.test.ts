import { snakeToCamel, camelToSnake } from "./../src/index";

test("snakeToCamel params check: null", () =>
  expect(() => snakeToCamel("")).toThrow("input can not be null value"));
