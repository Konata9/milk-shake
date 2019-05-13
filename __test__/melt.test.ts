import { checkMeltMethodParams, melt } from "../src/melt";

// checkMeltMethodParams
test("params value null check", () =>
  expect(() => checkMeltMethodParams(null)).toThrow(
    "meltList must hava a value"
  ));

test("params type check not array", () =>
  expect(() => checkMeltMethodParams(123)).toThrow("meltList must be a list"));

// melt
// simple
const meltTargetSimple = { userName: "konata", age: 18 };
const meltResultSimple = { userName: "konata" };
test("melt with rule test", () =>
  expect(melt([{ target: "age" }])(meltTargetSimple)).toEqual(
    meltResultSimple
  ));

// with rule
const meltTargetWithRule = {
  info: { userName: "konata", age: 18 },
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
        rule: value => ({
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
        rule: value => {}
      }
    ])(meltTargetWithRule)
  ).toThrow("rule function must hava a return value"));

test("melt with rule error test", () =>
  expect(() =>
    melt([
      {
        target: "info",
        rule: value => value.userName
      }
    ])(meltTargetWithRule)
  ).toThrow("rule function must hava a {}"));

// melt with deep object
const meltTargetWithDeepObject = {
  info: {
    address: {
      province: "sh1",
      city: "sh2",
      area: "sh3"
    }
  },
  other: [1, 2, 3, 4]
};
const meltResultWithDeepObject = {
  info: {
    address: {
      province: "sh1",
      area: "sh3"
    }
  },
  other: [1, 2, 3, 4]
};
test("melt with deep object", () =>
  expect(
    melt([{ target: "info.address.city" }])(meltTargetWithDeepObject)
  ).toEqual(meltResultWithDeepObject));

// melt with mutil targets
const meltTargetWithMutilObject = {
  userName: {
    firstName: "ko",
    middleName: "na",
    lastName: "ta"
  },
  info: {
    address: {
      province: "sh1",
      city: "sh2",
      area: "sh3"
    }
  },
  age: 18,
  other: [1, 2, 3, 4]
};
const meltResultWithMutilObject = {
  fullName: "konata",
  info: {
    address: {
      city: "sh2"
    }
  },
  age: 18
};
test("melt with muitl object", () =>
  expect(
    melt([
      {
        target: "userName",
        rule: data => ({
          fullName: `${data.firstName}${data.middleName}${data.lastName}`
        })
      },
      { target: "info.address.province" },
      { target: "info.address.area" },
      { target: "other" }
    ])(meltTargetWithMutilObject)
  ).toEqual(meltResultWithMutilObject));
