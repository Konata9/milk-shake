import typeCheck from "@konata9/typecheck.js";
import { formatSnakeToCamel, formatCamelToSnake } from "./utils";

interface FormatOptions {
  method: string | RuleFunction;
  exclude?: Array<string>;
  mapping?: Array<MappingOptions>;
}

interface MappingOptions {
  from: string | Array<string>;
  to: string;
  rules?: (from: string | Array<string>, to: string) => any;
}

interface RuleFunction {
  (key: string): string;
}

function setFormatMethod(method: string | RuleFunction): RuleFunction {
  let formatMethod: RuleFunction;
  if (typeCheck(method) === "function") {
    formatMethod = <RuleFunction>method;
  } else {
    formatMethod =
      method === "toCamel" ? formatSnakeToCamel : formatCamelToSnake;
  }
  return formatMethod;
}

function checkMapping(
  key: string,
  mapping: Array<MappingOptions>
): { result: boolean; mapItem: MappingOptions | undefined } {
  const mapItem = mapping.find(item => {
    const { from } = item;
    if (typeCheck(from) === "string") {
      return key === from;
    } else {
      return from.includes(key);
    }
  });

  return {
    result: !!mapItem,
    mapItem
  };
}

function formatMapping(
  params: { [key: string]: any },
  mapItem: MappingOptions
): any {
  const { from, to, rules = null } = mapItem;
  if (!rules) {
    const fromKey = typeCheck(from) === "string" ? <string>from : from[0];
    return params[fromKey];
  } else {
    return rules(from, to);
  }
}

function formatParams(params: object, options: FormatOptions): object {
  if (!params) {
    throw new Error("input can not be null value");
  }

  if (typeCheck(params) !== "object") {
    throw new Error("input must be {}");
  }

  if (Object.keys(params).length === 0) {
    return {};
  }

  const copyParams: { [key: string]: any } = { ...params };
  const paramKeys = Object.keys(copyParams);
  const formattedParams: { [key: string]: any } = {};

  const { method, exclude = [], mapping = [] } = options;

  if (!["string", "function"].includes(typeCheck(method))) {
    throw new Error("method must be toCamel/toSnake or a function");
  }

  const formatMethod = setFormatMethod(method);

  paramKeys.forEach(key => {
    if (exclude.includes(key)) {
      formattedParams[key] = copyParams[key];
    } else {
      const { result, mapItem } = checkMapping(key, mapping);
      if (result) {
        const { to } = <MappingOptions>mapItem;
        formattedParams[to] = formatMapping(copyParams, <MappingOptions>(
          mapItem
        ));
      } else {
        formattedParams[formatMethod(key)] =
          typeCheck(copyParams[key]) === "object"
            ? formatParams(copyParams[key], options)
            : copyParams[key];
      }
    }
  });

  return formattedParams;
}

export { formatSnakeToCamel, formatCamelToSnake, formatParams };
export default formatParams;
