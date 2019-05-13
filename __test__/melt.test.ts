import {checkMeltMethodParams, melt} from "../src/melt";

// checkMeltMethodParams
test("params value null check", () =>
  expect(() => checkMeltMethodParams(null)).toThrow(
    "meltList must hava a value"
  ));

test("params type check not array", () =>
  expect(() => checkMeltMethodParams(123)).toThrow("meltList must be a list"));

// melt
// simple
const meltTargetSimple = {userName: "konata", age: 18};
const meltResultSimple = {userName: "konata"};
test("melt with rule test", () =>
  expect(melt([{target: "age"}])(meltTargetSimple)).toEqual(meltResultSimple));

// with rule
const meltTargetWithRule = {
  info: {userName: "konata", age: 18},
  other: [1, 2, 3, 4]
};
const meltResultWithRule = {
  userName: "konata",
  age: 18,
  other: [1, 2, 3, 4]
};
test("melt with rule test", () =>
  expect(
    melt([
      {
        target: "info",
        rule: (value) => ({
          userName: value.userName,
          age: value.age
        })
      }
    ])(meltTargetWithRule)
  ).toEqual(meltResultWithRule));

// with rule error
test("melt with rule error test", () =>
  expect(() =>
    melt([
      {
        target: "info",
        rule: (value) => {}
      }
    ])(meltTargetWithRule)
  ).toThrow("rule function must hava a return value"));

test("melt with rule error test", () =>
  expect(() =>
    melt([
      {
        target: "info",
        rule: (value) => value.userName
      }
    ])(meltTargetWithRule)
  ).toThrow("rule function must hava a {}"));

// melt with mutil targets
const meltTargetMulti = {userName: "konata", age: 18};
const meltResultMulti = {userName: "konata"};
test("melt with rule test", () =>
  expect(melt([{target: "age"}])(meltTargetSimple)).toEqual(meltResultSimple));
