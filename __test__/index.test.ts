import {shake, checkParams, format, melt, map} from "../src/index";

// check params
test("check params not null", () =>
  expect(() => checkParams(null)).toThrow("params can not be null"));

test("check params type is object", () =>
  expect(() => checkParams("aaa")).toThrow("params must be {}"));

// shake test
// simpe format + melt + map
const shakeTargetSimple = {
  user_name: {
    first_name: "ko",
    middle_name: "na",
    last_name: "ta"
  },
  user_age: 18,
  address: {
    province: "sh1",
    city: "sh2",
    area: "sh3"
  },
  friend_list: [{f_name: "a", f_age: "b"}, {f_name: "a", f_age: "b"}],
  class_list: [null, 1, "a", [null, 2, "b", {class_score: [1, 2, 3]}]]
};
const shakeResultSimple = {
  userName: "konata",
  userAge: 18,
  address: {
    city: "sh2"
  },
  friendList: [{fName: "a", fAge: "b"}, {fName: "a", fAge: "b"}],
  classList: [null, 1, "a", [null, 2, "b", {classScore: [1, 4, 9]}]]
};
test("shake format, melt, map simple", () =>
  expect(shake(shakeTargetSimple)(
    format("toCamel"),
    melt([{ target: "info.address.city" }]),
    
    )).toEqual(
    shakeResultSimple
  ));
