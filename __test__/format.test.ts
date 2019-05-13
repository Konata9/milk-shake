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
const snakeObjectWithNull = {user_name: "konata", user_age: null};
const camelObjectWithNull = {userName: "konata", userAge: null};
test("format camel/snake test", () =>
  expect(format("toCamel")(snakeObjectWithNull)).toEqual(camelObjectWithNull));

test("format camel/snake test", () =>
  expect(format("toSnake")(camelObjectWithNull)).toEqual(snakeObjectWithNull));

const customObjectWithNull = {_user_name_: "konata", _user_age_: null};
test("format custom test", () =>
  expect(format((key) => `_${key}_`)(snakeObjectWithNull)).toEqual(
    customObjectWithNull
  ));

// with deep object
const snakeObjectWithObject = {
  user_name: "konata",
  contact_way: {
    cell_phone: 12345678901,
    mail_address: "123@123.com"
  }
};
const camelObjectWithObject = {
  userName: "konata",
  contactWay: {
    cellPhone: 12345678901,
    mailAddress: "123@123.com"
  }
};
test("format camel/snake test", () =>
  expect(format("toCamel")(snakeObjectWithObject)).toEqual(
    camelObjectWithObject
  ));

test("format camel/snake test", () =>
  expect(format("toSnake")(camelObjectWithObject)).toEqual(
    snakeObjectWithObject
  ));

const customObjectWithObject = {
  _user_name_: "konata",
  _contact_way_: {
    _cell_phone_: 12345678901,
    _mail_address_: "123@123.com"
  }
};
test("format custom test", () =>
  expect(format((key) => `_${key}_`)(snakeObjectWithObject)).toEqual(
    customObjectWithObject
  ));

// with array & deep object
const snakeObjectWithArray = {
  user_name: "konata",
  course_list: [1, 2, 3, "a", "b", "c"],
  friend_list: [{f_name: "a", f_age: 16}, {f_name: "b", f_age: 18}]
};
const camelObjectWithArray = {
  userName: "konata",
  courseList: [1, 2, 3, "a", "b", "c"],
  friendList: [{fName: "a", fAge: 16}, {fName: "b", fAge: 18}]
};
test("format camel/snake test", () =>
  expect(format("toCamel")(snakeObjectWithArray)).toEqual(
    camelObjectWithArray
  ));

test("format camel/snake test", () =>
  expect(format("toSnake")(camelObjectWithArray)).toEqual(
    snakeObjectWithArray
  ));

const customObjectWithArray = {
  _user_name_: "konata",
  _course_list_: [1, 2, 3, "a", "b", "c"],
  _friend_list_: [{_f_name_: "a", _f_age_: 16}, {_f_name_: "b", _f_age_: 18}]
};
test("format custom test", () =>
  expect(format((key) => `_${key}_`)(snakeObjectWithArray)).toEqual(
    customObjectWithArray
  ));

// with array & deep array
const snakeObjectWithDeepArray = {
  user_name: "konata",
  score_list: [[1, 2, 3, [4, 5, 6]]]
};
const camelObjectWithDeepArray = {
  userName: "konata",
  scoreList: [[1, 2, 3, [4, 5, 6]]]
};
test("format camel/snake test", () =>
  expect(format("toCamel")(snakeObjectWithDeepArray)).toEqual(
    camelObjectWithDeepArray
  ));

test("format camel/snake test", () =>
  expect(format("toSnake")(camelObjectWithDeepArray)).toEqual(
    snakeObjectWithDeepArray
  ));

const customObjectWithDeepArray = {
  _user_name_: "konata",
  _score_list_: [[1, 2, 3, [4, 5, 6]]]
};
test("format custom test", () =>
  expect(format((key) => `_${key}_`)(snakeObjectWithDeepArray)).toEqual(
    customObjectWithDeepArray
  ));

// with deep object/array mix
const snakeObjectWithMix = {
  user_name: "konata",
  user_age: 18,
  user_school: null,
  score_list: [
    [1, 2, 3, [4, 5, 6]],
    {
      course_list: [
        "english",
        "math",
        {
          other: [{course_name: "other", course_score: [5, 4, 3]}]
        }
      ]
    }
  ],
  friend_list: [{f_name: "a", f_age: 16}, {f_name: "b", f_age: 18}]
};
const camelObjectWithMix = {
  userName: "konata",
  user_age: 18,
  userSchool: null,
  scoreList: [
    [1, 2, 3, [4, 5, 6]],
    {
      courseList: [
        "english",
        "math",
        {
          other: [{course_name: "other", courseScore: [5, 4, 3]}]
        }
      ]
    }
  ],
  friendList: [{fName: "a", f_age: 16}, {fName: "b", f_age: 18}]
};
test("format camel/snake test", () =>
  expect(
    format("toCamel", ["user_age", "course_name", "f_age"])(snakeObjectWithMix)
  ).toEqual(camelObjectWithMix));

test("format camel/snake test", () =>
  expect(
    format("toSnake", ["user_age", "course_name", "f_age"])(
      camelObjectWithMix
    )
  ).toEqual(snakeObjectWithMix));

const customObjectWithMix = {
  _user_name_: "konata",
  user_age: 18,
  _user_school_: null,
  _score_list_: [
    [1, 2, 3, [4, 5, 6]],
    {
      _course_list_: [
        "english",
        "math",
        {
          _other_: [{course_name: "other", _course_score_: [5, 4, 3]}]
        }
      ]
    }
  ],
  _friend_list_: [{_f_name_: "a", f_age: 16}, {_f_name_: "b", f_age: 18}]
};
test("format custom test", () =>
  expect(
    format((key) => `_${key}_`, ["user_age", "course_name", "f_age"])(
      snakeObjectWithMix
    )
  ).toEqual(customObjectWithMix));
