import formatParams from "./../src";
import {
  userInfo,
  formattedUserInfo,
  customUserInfo,
  customUserInfo2,
  excludeInfo,
  excludeInfo2,
  userInfoFull,
  formattedUserInfoFull,
  userInfoMapping1,
  userInfoMapping2,
  userInfoMapping3,
  userInfoFullMapping1,
  userDumblicateInfo,
  formattedUserInfoAll,
  fullTestData,
  formattedFullData
} from "./test.data";

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

test("formatParams dumplicate name test", () =>
  expect(
    formatParams(userInfo, {
      method: "toCamel",
      mapping: [
        { from: "first_name", to: "first_name" },
        { from: "middle_name", to: "middle_name" }
      ]
    })
  ).toEqual(userDumblicateInfo));

test("formatParams all test", () =>
  expect(
    formatParams(userInfoFull, {
      method: "toCamel",
      exclude: ["user_name"],
      mapping: [{ from: "user_gender", to: "_user_gender_" }]
    })
  ).toEqual(formattedUserInfoAll));

test("formatParams full test", () =>
  expect(
    formatParams(fullTestData, {
      method: "toCamel",
      exclude: ["Type"],
      mapping: [
        { from: "extra", to: "job", rules: data => data["extra"]["job"] },
        {
          from: "user_address",
          to: "address",
          rules: data =>
            `${data["user_address"]["code"]}-${data["user_address"]["address"]}`
        }
      ]
    })
  ).toEqual(formattedFullData));

test("formatParams full test", () =>
  expect(
    formatParams(formattedFullData, {
      method: "toSnake",
      exclude: ["Type"],
      mapping: [
        {
          from: "job",
          to: "extra",
          rules: data => ({
            job: data["job"]
          })
        },
        {
          from: "address",
          to: "user_address",
          rules: data => {
            const addressInfo = data.address.split("-");
            return {
              code: addressInfo[0],
              address: addressInfo[1]
            };
          }
        }
      ]
    })
  ).toEqual(fullTestData));
