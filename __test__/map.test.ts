import { checkMapMethodParams, map } from "../src/map";

// checkMapMethodParams
test("params value null check", () =>
  expect(() => checkMapMethodParams(null)).toThrow(
    "mapList must hava a value"
  ));

test("params type check not array", () =>
  expect(() => checkMapMethodParams(123)).toThrow("mapList must be a list"));

// map
// simple
const mapTargetSimple = { userName: "konata", age: 18 };
const mapResultSimple = { name: "konata", userAge: 18 };
test("map simple", () =>
  expect(
    map([{ from: "userName", to: "name" }, { from: "age", to: "userAge" }])(
      mapTargetSimple
    )
  ).toEqual(mapResultSimple));

// with rule
const mapTargetWithRule = { name: "konata", age: 18 };
const mapResultWithRule = { info: { name: "konata" }, age: 18 };
test("map simple with rule", () =>
  expect(
    map([{ from: "name", to: "info", rule: data => ({ name: data }) }])(
      mapTargetWithRule
    )
  ).toEqual(mapResultWithRule));
