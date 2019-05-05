import shakeParams from "./../src";
import {
  userInfo,
  userInfoMelt,
  formattedUserInfo,
  customUserInfo,
  customUserInfo2,
  excludeInfo,
  excludeInfo2,
  userInfoFull,
  userInfoFullMelting,
  userInfoFullMelting2,
  formattedUserInfoFull,
  userInfoMapping1,
  userInfoMapping2,
  userInfoMapping3,
  userInfoFullMapping1,
  userDumblicateInfo,
  formattedUserInfoAll,
  fullTestData,
  formattedFullData,
  userArray,
  deepArrayTest,
  formattedDeepArrayTest
} from "./test.data";

test("shakeParams snake => camel check", () =>
  expect(shakeParams(userInfo, {method: "toCamel"})).toEqual(
    formattedUserInfo
  ));

test("shakeParams camel => snake check", () =>
  expect(shakeParams(formattedUserInfo, {method: "toSnake"})).toEqual(
    userInfo
  ));

test("shakeParams customFormatRules test", () =>
  expect(shakeParams(userInfo, {method: (key) => `_${key}_`})).toEqual(
    customUserInfo
  ));

test("shakeParams customFormatRules test", () =>
  expect(
    shakeParams(userInfo, {
      method: (key) =>
        key
          .split("")
          .reverse()
          .join("")
    })
  ).toEqual(customUserInfo2));

test("shakeParams exclude single test", () =>
  expect(
    shakeParams(userInfo, {method: "toCamel", exclude: ["middle_name"]})
  ).toEqual(excludeInfo));

test("shakeParams exclude list test", () =>
  expect(
    shakeParams(userInfo, {
      method: "toCamel",
      exclude: ["middle_name", "last_name"]
    })
  ).toEqual(excludeInfo2));

test("shakeParams deep test", () =>
  expect(
    shakeParams(userInfoFull, {
      method: "toCamel"
    })
  ).toEqual(formattedUserInfoFull));

test("shakeParams melting rules no return", () =>
  expect(() =>
    shakeParams(userInfo, {
      method: "toCamel",
      melting: {
        target: ["first_name"],
        rules: () => {}
      }
    })
  ).toThrow(
    "melting rules must provid a return value and the value must be {}"
  ));

test("shakeParams melting rules return type error", () =>
  expect(() =>
    shakeParams(userInfo, {
      method: "toCamel",
      melting: {
        target: ["first_name"],
        rules: () => "a"
      }
    })
  ).toThrow(
    "melting rules must provid a return value and the value must be {}"
  ));

test("shakeParams melting remove key", () =>
  expect(
    shakeParams(userInfo, {
      method: "toCamel",
      melting: {
        target: ["first_name"]
      }
    })
  ).toEqual(userInfoMelt));

test("shakeParams melting remove key inside", () =>
  expect(
    shakeParams(userInfoFull, {
      method: "toCamel",
      melting: {
        target: ["user_gender", "f_age"]
      }
    })
  ).toEqual(userInfoFullMelting));

test("shakeParams melting with rules", () =>
  expect(
    shakeParams(userInfoFull, {
      method: "toCamel",
      melting: {
        target: ["info"],
        rules: (data) => ({
          userAge: data["info"]["user_age"],
          userGender: data["info"]["user_gender"]
        })
      }
    })
  ).toEqual(userInfoFullMelting2));

test("shakeParams mapping test", () =>
  expect(
    shakeParams(userInfo, {
      method: "toCamel",
      mapping: [{from: "first_name", to: "myFirstName"}]
    })
  ).toEqual(userInfoMapping1));

test("shakeParams mapping rules test", () =>
  expect(
    shakeParams(userInfo, {
      method: "toCamel",
      mapping: [
        {
          from: "first_name",
          to: "myFirstName",
          rules: (data) => (data["first_name"] = "Konata10")
        }
      ]
    })
  ).toEqual(userInfoMapping2));

test("shakeParams mapping rules combine test", () =>
  expect(
    shakeParams(userInfo, {
      method: "toCamel",
      mapping: [
        {
          from: ["first_name", "middle_name"],
          to: "firstName",
          rules: (data) => data["first_name"] + data["middle_name"]
        }
      ]
    })
  ).toEqual(userInfoMapping3));

test("shakeParams multi mapping test", () =>
  expect(
    shakeParams(userInfoFull, {
      method: "toCamel",
      mapping: [
        {
          from: ["user_name", "info"],
          to: "userInfo",
          rules: (data) => ({
            userName: data["user_name"],
            age: data["info"]["user_age"],
            gender: data["info"]["user_gender"]
          })
        },
        {from: "friendList", to: "friendInfo"}
      ]
    })
  ).toEqual(userInfoFullMapping1));

test("shakeParams dumplicate name test", () =>
  expect(
    shakeParams(userInfo, {
      method: "toCamel",
      mapping: [
        {from: "first_name", to: "first_name"},
        {from: "middle_name", to: "middle_name"}
      ]
    })
  ).toEqual(userDumblicateInfo));

test("shakeParams all test", () =>
  expect(
    shakeParams(userInfoFull, {
      method: "toCamel",
      exclude: ["user_name"],
      mapping: [{from: "user_gender", to: "_user_gender_"}]
    })
  ).toEqual(formattedUserInfoAll));

test("shakeParams full test", () =>
  expect(
    shakeParams(fullTestData, {
      method: "toCamel",
      exclude: ["Type"],
      mapping: [
        {from: "extra", to: "job", rules: (data) => data["extra"]["job"]},
        {
          from: "user_address",
          to: "address",
          rules: (data) =>
            `${data["user_address"]["code"]}-${data["user_address"]["address"]}`
        }
      ]
    })
  ).toEqual(formattedFullData));

test("shakeParams full test", () =>
  expect(
    shakeParams(formattedFullData, {
      method: "toSnake",
      exclude: ["Type"],
      mapping: [
        {
          from: "job",
          to: "extra",
          rules: (data) => ({
            job: data["job"]
          })
        },
        {
          from: "address",
          to: "user_address",
          rules: (data) => {
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

test("shakeParams array test", () =>
  expect(
    shakeParams(userArray, {
      method: "toCamel"
    })
  ).toEqual(userArray));

test("shakeParams array deep test", () =>
  expect(
    shakeParams(deepArrayTest, {
      method: "toCamel"
    })
  ).toEqual(formattedDeepArrayTest));
