import typeCheck from "@konata9/typecheck.js";
import { formatSnakeToCamel, formatCamelToSnake } from "./utils";

interface HandleFunction {
  (params: { [key: string]: any }): { [key: string]: any };
}

interface FormatFunction {
  (key: string): string;
}

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

const setFormatMethod = (method: string | FormatFunction) => {
  let formatMethod: FormatFunction;
  if (method === "toCamel") {
    formatMethod = formatSnakeToCamel;
  } else if (method === "toSnake") {
    formatMethod = formatCamelToSnake;
  } else {
    formatMethod = <FormatFunction>method;
  }
  return formatMethod;
};

const formatKeys = (
  method: string | FormatFunction,
  excludes: string[] = []
): HandleFunction => {
  checkFormatKeysMethod(method);
  const formatMethod = setFormatMethod(method);

  return params => {
    const copyParams = { ...params };
    const result: { [key: string]: any } = {};

    Object.keys(copyParams).forEach(key => {
      const paramsValue = copyParams[key];
      if (excludes.includes(key)) {
        result[key] = paramsValue;
      } else {
        if (typeCheck(paramsValue) === "array") {
          result[key] = paramsValue.map((value: any) => {
            if (typeCheck(value) === "array") {
            } else if (typeCheck(value) === "object") {
              return formatKeys(method, excludes)(value);
            } else {
              return value;
            }
          });
        } else if (typeCheck(paramsValue) === "object") {
          result[key] = formatKeys(method, excludes)(paramsValue);
        } else {
          result[key] = formatMethod(key);
        }
      }
    });
    return result;
  };
};

function meltKeys() {}

function mapKeys() {}

function shake(params: { [key: string]: any }, ...rest: [any]): object {
  return [...rest].reduce((prev, current) => {
    return current(prev);
  }, params);
}

shake(data, formatKeys(method, exclude), meltKyes(() => {}, mapKeys(() => {})));

export { shake, formatKeys, meltKeys, mapKeys };
export default {
  shake,
  formatKeys,
  meltKeys,
  mapKeys
};
