import {checkMapMethodParams, map} from "../src/map";

// checkMapMethodParams
test("params value null check", () =>
  expect(() => checkMapMethodParams(null)).toThrow(
    "mapList must hava a value"
  ));

test("params type check not array", () =>
  expect(() => checkMapMethodParams(123)).toThrow("mapList must be a list"));

// map
// simple
const mapTargetSimple = {userName: "konata", age: 18};
const mapResultSimple = {name: "konata", userAge: 18};
test("map simple", () =>
  expect(
    map([{from: "userName", to: "name"}, {from: "age", to: "userAge"}])(
      mapTargetSimple
    )
  ).toEqual(mapResultSimple));

// with rule
const mapTargetWithRule = {name: "konata", age: 18};
const mapResultWithRule = {info: {name: "konata"}, age: 18};
test("map simple with rule", () =>
  expect(
    map([{from: "name", to: "info", rule: (data) => ({name: data})}])(
      mapTargetWithRule
    )
  ).toEqual(mapResultWithRule));

// with deep obj
const mapTargetWithDeepObject = {
  info: {
    address: {
      province: "sh1",
      city: "sh2",
      area: "sh3"
    }
  },
  other: [1, 2, 3, 4]
};
const mapResultWithDeepObject = {
  info: {
    address: "sh1sh2sh3"
  },
  other: [1, 4, 9, 16]
};
test("map with deep object", () =>
  expect(
    map([
      {
        from: "info.address",
        to: "info.address",
        rule: (data) => data.province + data.city + data.area
      },
      {
        from: "other",
        to: "other",
        rule: (data) => data.map((x: number) => x * x)
      }
    ])(mapTargetWithDeepObject)
  ).toEqual(mapResultWithDeepObject));

const mapTargetWithDeepObject2 = {
  a: {
    b: 1,
    c: 2,
    d: {
      e: 3,
      f: {
        g: 4
      }
    }
  }
};

const mapResultWithDeepObject2 = {
  a: {
    i: 1,
    c: 2,
    d: {
      e: 6,
      g: 4
    }
  }
};
test("map with deep object", () =>
  expect(
    map([
      {
        from: "a.b",
        to: "a.i",
        rule: (data) => data
      },
      {
        from: "a.d.e",
        to: "a.d.e",
        rule: (data) => data * 2
      },
      {
        from: "a.d.f",
        to: "a.d.g",
        rule: (data) => data.g
      }
    ])(mapTargetWithDeepObject2)
  ).toEqual(mapResultWithDeepObject2));

// map with mutil targets
const mapTargetWithMutilObject = {
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
const mapResultWithMutilObject = {
  fullName: "konata",
  address: {
    province: "sh1",
    city: "sh2",
    area: "sh3"
  },
  age: 18,
  score: [1, 2, 3, 4]
};
test("map with muitl object", () =>
  expect(
    map([
      {
        from: "userName",
        to: "fullName",
        rule: (data) => data.firstName + data.middleName + data.lastName
      },
      {
        from: "info",
        to: "address",
        rule: (data) => data.address
      },
      {
        from: "other",
        to: "score"
      }
    ])(mapTargetWithMutilObject)
  ).toEqual(mapResultWithMutilObject));
