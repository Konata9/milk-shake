import typeCheck from "@konata9/typecheck.js";

interface RuleFunction {
  (current: any, data: { [key: string]: any }): any;
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
  const { from, to, rule = null } = mapItem;
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

const formatTarget = (target: string): string => {
  let _target = "copyParams";
  // 多层对象时使用 . 分割
  // 为了获取多层对象内部的值，采用 eval 拼接字符串
  target.split(".").forEach(key => {
    _target += `['${key}']`;
  });
  return _target;
};

const map = (mapList: Array<MapOption>) => {
  checkMapMethodParams(mapList);
  return (params: { [key: string]: any }): { [key: string]: any } => {
    let copyParams = { ...params };

    mapList.forEach(mapItem => {
      checkMapItem(mapItem);
      const { from, to, rule = null } = mapItem;
      const _from = formatTarget(from);
      const _to = formatTarget(to);

      if (rule) {
        eval(`${_to}=rule(${_from}, copyParams)`);
      } else {
        eval(`${_to}=${_from}`);
      }

      eval(`delete ${_from}`);
    });

    return copyParams;
  };
};

export { checkMapMethodParams, map };
