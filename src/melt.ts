import typeCheck from "@konata9/typecheck.js";

interface RuleFunction {
  (current: any, data: { [key: string]: any }): any;
}

interface MeltOption {
  target: string;
  rule?: RuleFunction;
}

const checkMeltMethodParams = (meltList: any) => {
  if (!meltList) {
    throw new Error("meltList must hava a value");
  }

  if (typeCheck(meltList) !== "array") {
    throw new Error("meltList must be a list");
  }
};

const checkMeltItem = (meltItem: MeltOption) => {
  const { target, rule = null } = meltItem;
  if (!target) {
    throw new Error("property target is required");
  }

  if (typeCheck(target) !== "string") {
    throw new Error("target must be a stirng");
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

const formatTarget = (target: string): string => {
  let _target = "copyParams";
  // 多层对象时使用 . 分割，为了获取多层对象内部的值，采用 eval 拼接字符串
  target.split(".").forEach(key => {
    _target += `['${key}']`;
  });
  return _target;
};

const melt = (meltList: Array<MeltOption>) => {
  checkMeltMethodParams(meltList);

  return (params: { [key: string]: any }): { [key: string]: any } => {
    let copyParams = { ...params };

    meltList.forEach(meltItem => {
      checkMeltItem(meltItem);
      const { target, rule = null } = meltItem;
      let result = {};

      let _target = formatTarget(target);

      if (rule) {
        result = rule(eval(_target), copyParams);
        checkResult(result);
      }

      eval(`delete ${_target}`);
      copyParams = {
        ...copyParams,
        ...result
      };
    });

    return copyParams;
  };
};

export { checkMeltMethodParams, melt };
