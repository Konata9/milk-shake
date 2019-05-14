import {format} from "./format";
import {melt} from "./melt";
import {map} from "./map";
import typeCheck from "@konata9/typecheck.js";

const checkParams = (params: any) => {
  if (!params) {
    throw new Error("params can not be null");
  }

  if (typeCheck(params) !== "object") {
    throw new Error("params must be {}");
  }
};

const shake = (params: {[key: string]: any}) => {
  checkParams(params);
  return (...formatters: any) => {
    return [...formatters].reduce((prev, current) => {
      return current(prev);
    }, params);
  };
};

const milkShake: any = {
  shake,
  format,
  melt,
  map
};

export {checkParams, shake, format, melt, map};
export default milkShake;
