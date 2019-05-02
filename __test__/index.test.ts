import formatParams from "./../src";

const userInfo = {
  first_name: "ko",
  middle_name: "na",
  last_name: "ta",
  gender: "female",
  age: 18,
  job: "student"
};

const formattedUserInfo = {
  firstName: "ko",
  middleName: "na",
  lastName: "ta",
  gender: "female",
  age: 18,
  job: "student"
};

test("formatParams snake => camel check", () =>
  expect(formatParams(userInfo, { method: "toCamel" })).toEqual(
    formattedUserInfo
  ));

test("formatParams camel => snake check", () =>
  expect(formatParams(formattedUserInfo, { method: "toSnake" })).toEqual(
    userInfo
  ));
