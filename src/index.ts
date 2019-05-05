import typeCheck from "@konata9/typecheck.js";
import {formatSnakeToCamel, formatCamelToSnake} from "./utils";

interface FormatOptions {
  method: string | RuleFunction;
  exclude?: Array<string>;
  melting?: MeltingOptions;
  mapping?: Array<MappingOptions>;
}

interface RuleFunction {
  (key: string): string;
}

interface MappingOptions {
  from: string | Array<string>;
  to: string;
  rules?: (data: any, from?: string | Array<string>) => any;
}

interface MeltingOptions {
  target: Array<string>;
  rules?: (data: any) => any;
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
): {
  result: boolean;
  mapItem: MappingOptions | undefined;
  mappingIndex: number;
} {
  let mappingIndex = 0;
  const mapItem = mapping.find((item) => {
    const {from} = item;
    if (typeCheck(from) === "string") {
      return key === from;
    } else {
      // from 数组中的 index 为了避免重复处理
      mappingIndex = from.indexOf(key);
      return mappingIndex > -1;
    }
  });

  return {
    result: !!mapItem,
    mapItem,
    mappingIndex
  };
}

function formatMapping(
  params: {[key: string]: any},
  mapItem: MappingOptions
): any {
  const copyParams = {...params};
  const {from, rules = null} = mapItem;
  if (!rules) {
    const fromKey = typeCheck(from) === "string" ? <string>from : from[0];
    return copyParams[fromKey];
  } else {
    return rules(copyParams, from);
  }
}

function formatArrayParams(
  params: {[key: string]: any},
  options: FormatOptions
): any {
  if (typeCheck(params) === "array") {
    return params.map((innerParams: any) =>
      formatArrayParams(innerParams, options)
    );
  } else if (typeCheck(params) === "object") {
    return shakeParams(params, options);
  } else {
    return params;
  }
}

function shakeParams(
  params: {[key: string]: any},
  options: FormatOptions
): object {
  if (!params) {
    throw new Error("input can not be null value");
  }

  if (typeCheck(params) !== "object") {
    throw new Error("input must be {}");
  }

  if (Object.keys(params).length === 0) {
    return params;
  }

  const copyParams = {...params};
  const paramKeys = Object.keys(copyParams);
  let formattedParams: {[key: string]: any} = {};

  const {
    method,
    exclude = [],
    melting = <MeltingOptions>{},
    mapping = []
  } = options;
  const {target = []} = melting;

  if (!["string", "function"].includes(typeCheck(method))) {
    throw new Error("method must be toCamel/toSnake or a function");
  }

  const formatMethod = setFormatMethod(method);

  paramKeys.forEach((key) => {
    if (exclude.includes(key)) {
      formattedParams[key] = copyParams[key];
    } else if (target.includes(key)) {
      const {rules = null} = melting;
      if (rules) {
        const result = rules(copyParams);
        if (!result || typeCheck(result) !== "object") {
          throw new Error(
            "melting rules must provid a return value and the value must be {}"
          );
        }
        formattedParams = {
          ...formattedParams,
          ...result
        };
      }
    } else {
      const {result, mapItem, mappingIndex} = checkMapping(key, mapping);
      if (result) {
        const {to} = <MappingOptions>mapItem;
        // 当 mapping 的 from 为数组时，处理在第一个匹配的时候就已经完成了。
        //当 key 为 from 数组的第二个及之后元素时，跳过处理
        if (mappingIndex < 1) {
          formattedParams[to] = formatMapping(copyParams, <MappingOptions>(
            mapItem
          ));
        }
      } else {
        if (typeCheck(copyParams[key]) === "array") {
          formattedParams[formatMethod(key)] = copyParams[key].map(
            (innerParam: any) => formatArrayParams(innerParam, options)
          );
        } else if (typeCheck(copyParams[key]) === "object") {
          formattedParams[formatMethod(key)] = shakeParams(
            copyParams[key],
            options
          );
        } else {
          formattedParams[formatMethod(key)] = copyParams[key];
        }
      }
    }
  });

  return formattedParams;
}

export {formatSnakeToCamel, formatCamelToSnake, shakeParams};
export default shakeParams;
