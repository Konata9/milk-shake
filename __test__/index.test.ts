import formatParams from "./../src";

const userInfo = {
  first_name: "ko",
  middle_name: "na",
  last_name: "ta"
};

const formattedUserInfo = {
  firstName: "ko",
  middleName: "na",
  lastName: "ta"
};

const customUserInfo = {
  _first_name_: "ko",
  _middle_name_: "na",
  _last_name_: "ta"
};

const customUserInfo2 = {
  eman_tsrif: "ko",
  eman_elddim: "na",
  eman_tsal: "ta"
};

const excludeInfo = {
  firstName: "ko",
  middle_name: "na",
  lastName: "ta"
};

const excludeInfo2 = {
  firstName: "ko",
  middle_name: "na",
  last_name: "ta"
};

const userInfoFull = {
  user_name: "konata",
  info: {
    user_age: 18,
    user_gender: "female"
  },
  friendList: [
    { f_name: "friend 1", f_age: 18 },
    { f_name: "friend 2", f_age: 18 }
  ]
};

const formattedUserInfoFull = {
  userName: "konata",
  info: {
    userAge: 18,
    userGender: "female"
  },
  friendList: [{ fName: "friend 1", fAge: 18 }, { fName: "friend 2", fAge: 18 }]
};

const userInfoMapping1 = {
  myFirstName: "ko",
  middleName: "na",
  lastName: "ta"
};

const userInfoMapping2 = {
  myFirstName: "Konata10",
  middleName: "na",
  lastName: "ta"
};

const userInfoMapping3 = {
  firstName: "kona",
  lastName: "ta"
};

const userInfoFullMapping1 = {
  userInfo: {
    userName: "konata",
    age: 18,
    gender: "female"
  },
  friendInfo: [
    { f_name: "friend 1", f_age: 18 },
    { f_name: "friend 2", f_age: 18 }
  ]
};

test("formatParams snake => camel check", () =>
  expect(formatParams(userInfo, { method: "toCamel" })).toEqual(
    formattedUserInfo
  ));

test("formatParams camel => snake check", () =>
  expect(formatParams(formattedUserInfo, { method: "toSnake" })).toEqual(
    userInfo
  ));

test("formatParams customFormatRules test", () =>
  expect(formatParams(userInfo, { method: key => `_${key}_` })).toEqual(
    customUserInfo
  ));

test("formatParams customFormatRules test", () =>
  expect(
    formatParams(userInfo, {
      method: key =>
        key
          .split("")
          .reverse()
          .join("")
    })
  ).toEqual(customUserInfo2));

test("formatParams exclude single test", () =>
  expect(
    formatParams(userInfo, { method: "toCamel", exclude: ["middle_name"] })
  ).toEqual(excludeInfo));

test("formatParams exclude list test", () =>
  expect(
    formatParams(userInfo, {
      method: "toCamel",
      exclude: ["middle_name", "last_name"]
    })
  ).toEqual(excludeInfo2));

test("formatParams deep test", () =>
  expect(
    formatParams(userInfoFull, {
      method: "toCamel"
    })
  ).toEqual(formattedUserInfoFull));

test("formatParams mapping test", () =>
  expect(
    formatParams(userInfo, {
      method: "toCamel",
      mapping: [{ from: "first_name", to: "myFirstName" }]
    })
  ).toEqual(userInfoMapping1));

test("formatParams mapping rules test", () =>
  expect(
    formatParams(userInfo, {
      method: "toCamel",
      mapping: [
        {
          from: "first_name",
          to: "myFirstName",
          rules: data => (data["first_name"] = "Konata10")
        }
      ]
    })
  ).toEqual(userInfoMapping2));

test("formatParams mapping rules combine test", () =>
  expect(
    formatParams(userInfo, {
      method: "toCamel",
      mapping: [
        {
          from: ["first_name", "middle_name"],
          to: "firstName",
          rules: data => data["first_name"] + data["middle_name"]
        }
      ]
    })
  ).toEqual(userInfoMapping3));

test("formatParams multi mapping test", () =>
  expect(
    formatParams(userInfoFull, {
      method: "toCamel",
      mapping: [
        {
          from: ["user_name", "info"],
          to: "userInfo",
          rules: data => ({
            userName: data["user_name"],
            age: data["info"]["user_age"],
            gender: data["info"]["user_gender"]
          })
        },
        { from: "friendList", to: "friendInfo" }
      ]
    })
  ).toEqual(userInfoFullMapping1));
