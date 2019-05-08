import typeCheck from "@konata9/typecheck.js";
import { formatSnakeToCamel, formatCamelToSnake } from "./utils";

interface FormatOptions{
  method: string | ((key:string) => string)
  exclude: string[]
}

function handleArrayValue() {}

function formatKeys(method: string | ((key:string) => string), exclude:string[] = []) : {
  return (params) =>
}

function meltKeys() {}

function mapKeys() {}

function shake(params: { [key: string]: any }, ...rest: [any]): object {
  return [...rest].reduce((prev, current) => {
    return current(prev);
  }, params);
}

export { shake, formatKeys, meltKeys, mapKeys };
export default {
  shake,
  formatKeys,
  meltKeys,
  mapKeys
};
