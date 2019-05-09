import typeCheck from "@konata9/typecheck.js";
import {formatSnakeToCamel, formatCamelToSnake} from "./utils";

interface HandleFunction {
  (params: {[key: string]: any}): {[key: string]: any};
}

function handleArrayValue() {}

const checkFormatKeysMethod = (method: any) => {
  if (!method) {
    throw new Error("method must hava a value");
  }

  if (method && !["string", "function"].includes(typeCheck(method))) {
    throw new Error("method must be a string type or a function");
  }

  if (
    method &&
    typeCheck(method) === "string" &&
    !["toCamel", "toSnake"].includes(method)
  ) {
    throw new Error('method must be "toCamel" or "toSnake"');
  }
};

const formatKeys = (
  method: string | ((key: string) => string),
  excludes: string[] = []
): HandleFunction => {
  checkFormatKeysMethod(method);
  return (params) => {
    const copyParams = {...params};
    const result: {[key: string]: any} = {};

    Object.keys(copyParams).forEach((key) => {
      if (excludes.includes(key)) {
        result[key] = copyParams[key];
      } else {
      }
    });
    return result;
  };
};

function meltKeys() {}

function mapKeys() {}

function shake(params: {[key: string]: any}, ...rest: [any]): object {
  return [...rest].reduce((prev, current) => {
    return current(prev);
  }, params);
}

export {shake, formatKeys, meltKeys, mapKeys};
export default {
  shake,
  formatKeys,
  meltKeys,
  mapKeys
};
