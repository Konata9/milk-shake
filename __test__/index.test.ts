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
  classList: [null, 1, "a", [null, 2, "b", {classScore: [1, 2, 3]}]]
};
test("shake format, melt, map simple", () =>
  expect(
    shake(shakeTargetSimple)(
      format("toCamel"),
      melt([{target: "address.province"}, {target: "address.area"}]),
      map([
        {
          from: "userName",
          to: "userName",
          rule: (data) => data.firstName + data.middleName + data.lastName
        }
      ])
    )
  ).toEqual(shakeResultSimple));

// simpe format + melt + map change order
test("shake format, melt, map change order", () =>
  expect(
    shake(shakeTargetSimple)(
      map([
        {
          from: "user_name",
          to: "userName",
          rule: (data) => data.first_name + data.middle_name + data.last_name
        }
      ]),
      format("toCamel"),
      melt([{target: "address.province"}, {target: "address.area"}])
    )
  ).toEqual(shakeResultSimple));

// shake with custom format and deep obj
const shakeTargetDeep = {
  info: {
    name: "konata",
    age: 18,
    gender: "male",
    school: "abcd",
    class: "5",
    school_id: "8"
  },
  course: {
    chinese: {
      teacher: "abcd",
      score: [1, 2, 3, 4, 5]
    },
    math: {
      teacher: "efgh",
      score: [6, 7, 8, null]
    },
    english: {
      teacher: "ijkl",
      score: [null, 9, 10, null]
    }
  },
  classMates: [{name: "11", age: 18}, {name: "22", age: 19}]
};

const shakeResultDeep = {
  _name: "konata",
  _info: {
    _studentInfo: "abcd-5-8",
    _age: 18
  },
  _course: {
    chinese: {
      teacher: "abcd"
    },
    math: {
      teacher: "efgh"
    },
    english: {
      teacher: "ijkl"
    }
  },
  _classMates: [{_name: "11", _age: 10}, {_name: "22", _age: 10}]
};

test("shake custom format and deep obj", () =>
  expect(
    shake(shakeTargetDeep)(
      map([
        {
          from: "info.name",
          to: "name"
        },
        {
          from: "info.school",
          to: "info.studentInfo",
          rule: (_, params) =>
            `${params.info.school}-${params.info.class}-${
              params.info.school_id
            }`
        },
        {
          from: "classMates",
          to: "classMates",
          rule: (data) =>
            data.map((classmate: any) => ({
              ...classmate,
              age: 10
            }))
        }
      ]),
      melt([
        {target: "info.gender"},
        {target: "info.school"},
        {target: "info.class"},
        {target: "info.school_id"},
        {target: "course.chinese.score"},
        {target: "course.math.score"},
        {target: "course.english.score"}
      ]),
      format((key: string) => `_${key}`, ["chinese", "math", "english"])
    )
  ).toEqual(shakeResultDeep));
