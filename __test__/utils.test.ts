import { formatSnakeToCamel, formatCamelToSnake } from "../src/utils";

// formatSnakeToCamel test
test("formatSnakeToCamel params check: null", () =>
  expect(() => formatSnakeToCamel("")).toThrow("input can not be null value"));

test("formatSnakeToCamel fun check: userName => userName", () =>
  expect(formatSnakeToCamel("userName")).toBe("userName"));

test("formatSnakeToCamel fun check: user name => user name", () =>
  expect(formatSnakeToCamel("user name")).toBe("user name"));

test("formatSnakeToCamel fun check: user_name => userName", () =>
  expect(formatSnakeToCamel("user_name")).toBe("userName"));

test("formatSnakeToCamel fun check: _user_name_ => userName", () =>
  expect(formatSnakeToCamel("_user_name_")).toBe("userName"));

test("formatSnakeToCamel fun check: _user___name__ => userName", () =>
  expect(formatSnakeToCamel("_user___name__")).toBe("userName"));

test("formatSnakeToCamel fun check: user_phone_number => userPhoneNumber", () =>
  expect(formatSnakeToCamel("user_phone_number")).toBe("userPhoneNumber"));

// formatCamelToSnake test
test("formatCamelToSnake params check: null", () =>
  expect(() => formatCamelToSnake("")).toThrow("input can not be null value"));

test("formatCamelToSnake fun check: user_name => user_name", () =>
  expect(formatCamelToSnake("user_name")).toBe("user_name"));

test("formatCamelToSnake fun check: userName => user_name", () =>
  expect(formatCamelToSnake("userName")).toBe("user_name"));

test("formatCamelToSnake fun check: userPhoneNumber => user_phone_number", () =>
  expect(formatCamelToSnake("userPhoneNumber")).toBe("user_phone_number"));

test("formatCamelToSnake fun check: UserName => user_name", () =>
  expect(formatCamelToSnake("UserName")).toBe("user_name"));

test("formatCamelToSnake fun check: userISExist => user_i_s_exist", () =>
  expect(formatCamelToSnake("userISExist")).toBe("user_i_s_exist"));
