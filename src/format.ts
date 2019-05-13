import typeCheck from "@konata9/typecheck.js";
import {formatSnakeToCamel, formatCamelToSnake} from "./utils";

interface HandleFunction {
  (params: {[key: string]: any}): {[key: string]: any};
}

interface FormatFunction {
  (key: string): string;
}

const checkFormatMethodParams = (method: any) => {
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

const setFormatMethod = (method: string | FormatFunction): FormatFunction => {
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

const formatArrayValue = (
  array: [any],
  method: string | FormatFunction,
  excludes: string[]
): Array<any> => {
  return array.map((value) => {
    if (typeCheck(value) === "array") {
      return formatArrayValue(value, method, excludes);
    } else if (typeCheck(value) === "object") {
      return format(method, excludes)(value);
    } else {
      return value;
    }
  });
};

const format = (
  method: string | FormatFunction,
  excludes: string[] = []
): HandleFunction => {
  checkFormatMethodParams(method);

  const formatMethod = setFormatMethod(method);

  return (params) => {
    const copyParams = {...params};
    const result: {[key: string]: any} = {};

    Object.keys(copyParams).forEach((key) => {
      const paramsValue = copyParams[key];
      if (excludes.includes(key)) {
        result[key] = paramsValue;
      } else {
        if (typeCheck(paramsValue) === "array") {
          result[key] = formatArrayValue(paramsValue, formatMethod, excludes);
        } else if (typeCheck(paramsValue) === "object") {
          result[key] = format(method, excludes)(paramsValue);
        } else {
          result[formatMethod(key)] = copyParams[key];
        }
      }
    });
    return result;
  };
};

export {checkFormatMethodParams, setFormatMethod, format};
