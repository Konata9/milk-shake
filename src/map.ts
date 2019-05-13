import typeCheck from "@konata9/typecheck.js";

interface RuleFunction {
  (current: any, data: {[key: string]: any}): any;
}

interface MapOption {
  from: string;
  to: string;
  rule?: RuleFunction;
}

const checkMapMethodParams = (mapList: any) => {
  if (!mapList) {
    throw new Error("mapList must hava a value");
  }

  if (typeCheck(mapList) !== "array") {
    throw new Error("mapList must be a list");
  }
};

const checkMapItem = (mapItem: MapOption) => {
  const {from, to, rule = null} = mapItem;
  if (!from || !to) {
    throw new Error("property 'from' and 'to' are required");
  }

  if (typeCheck(from) !== "string" || typeCheck(to) !== "string") {
    throw new Error("'from' and 'to' must be a stirng");
  }

  if (rule && typeCheck(rule) !== "function") {
    throw new Error("rule must be a function");
  }
};

const checkResult = (result: any) => {
  if (!result) {
    throw new Error("rule function must hava a return value");
  }

  if (typeCheck(result) !== "object") {
    throw new Error("rule function must hava a {}");
  }
};

const map = (mapList: Array<MapOption>) => {
  checkMapMethodParams(mapList);
  return (params: {[key: string]: any}): {[key: string]: any} => {
    let copyParams = {...params};

    mapList.forEach((mapItem) => {
      checkMapItem(mapItem);
      const {from, to, rule = null} = mapItem;
      if (rule) {
        const result = rule(copyParams[from], params);
        checkResult(result);
        copyParams[to] = result;
      } else {
        copyParams[to] = copyParams[from];
      }
    });
    return copyParams;
  };
};

export {map};
