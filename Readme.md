# Milk Shake

![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg) ![GitHub package.json version](https://img.shields.io/github/package-json/v/Konata9/milk-shake.svg) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Konata9/milk-shake.svg) ![Codecov](https://img.shields.io/codecov/c/gh/Konata9/milk-shake.svg)

> 使用 `TypeScript` 编写的用于格式化对象 **key** 的工具。

### 特点

- 让对象的 `key` 在 **驼峰** 与 **下划线** 形式间自由转换
- 可以自定义 `key` 的转换方法
- 可以对传入的对象进行简单的数据变化
- 简单的 API 使用
- 不会修改传入的数据

### 快速上手

#### 1. 安装

[查看 NPM](https://www.npmjs.com/package/@konata9/milk-shake)

```shell
npm i @konata9/milk-shake
```

```javascript
import shakeParams from "@konata9/milk-shake";
// or
import { shakeParams } from "@konata9/milk-shake";
// or
const { shakeParams } = require("@konata9/milk-shake");
```

#### 2. 使用

```javascript
import shakeParams from "@konata9/milk-shake";

const userInfo = {
  user_name: "konata",
  age: 16,
  friend_list: [
    { friend_name: "hiragi kagami" },
    { friend_name: "hiragi tsukasa" }
  ]
};

const formattedUserInfo = shakeParams(userInfo, {
  method: "toCamel"
});

/**
 * formattedUserInfo:
 * {
 *  userName: 'konata',
 *  age: 16,
 *  friendList:[
 *    {friendName: 'hiragi kagami'},
 *    {friendName: 'hiragi tsukasa'},
 *  ]
 * }
 */
```

### API

> 推荐在 `TypeScript` 环境下使用。

#### shakeParams(params, options)

- `params`: (_required_) `object` 需要处理的对象
- `options`: (_required_) `object` 自定义参数
  - `method`: (_required_) `string` | `function` 格式化方法，详细配置见下文 `method`
  - `exclude`: (default `[]`) `Array` 不需要进行转换的 `key`
  - `mapping`: (default `[]`) `Array` 对 `key` 进行单独处理的配置，详细配置见下文 `mapping`

_返回_**处理后**的 `params` (不会修改原来的 `params`)

- `method`

  - `string` 接受 `"toCamel"` 和 `"toSnake"` 两种方法，分别将 `key` 转换为**驼峰**或**下划线**的形式。
  - `function` 为自定义 `key` 的转换方法
    - function(key)
      `key` 传入 `params` 的 `key`，必须提供返回值。返回转换后的 `key`（详细用例见后文）。

- `mapping`

  - from: (_required_) `string` | `Array` 需要进行映射的 `key`。当为数组且没有设置 `rules` 时，只会对数组的第一项做 `from` => `to` 的简单映射。
  - to: (_required_) `string` 映射后的 `key`
  - rules: (default `null`) `function` 自定义转换规则。当不设置此项时，仅做 `from` => `to` 的简单映射。

    - function(data, [from])

      1. `data` 为传入的 `params`，可以通过 `rules` 对数据进行编辑和转换（不建议在此做业务处理）。将转换好的结果映射到 `to` 上，建议提供一个返回值，否则对应的 `to` 为 `undefined`。（详细用例见后文）

      2. `from` 即 `mapping` 中定义的 `from`。方便在 `rules` 中调用。

- 处理顺序
  程序仅对 `exclude` 之外的 `key` 进行处理；之后进行 `mapping` 的检测，当符合 `mapping` 关系时，根据 `mapping` 的 `rules` 进行处理。

  因此当同时设置了 `method`，`exclude` 和 `mapping` 三个选项时，按照 `exclude` > `mapping` > `method` 的顺序进行处理（更多用例可以见后文）。

#### more example

- 1. 自定义 `method` 处理 `key`

```javascript
const userInfo = {
  user_name: "konata",
  age: 16,
  friend_list: [
    { friend_name: "hiragi kagami" },
    { friend_name: "hiragi tsukasa" }
  ]
};

const formattedUserInfo = shakeParams(userInfo, {
  method: key => `_${key}_` // 所有的 key 会在前后加 下划线
});

/** formattedUserInfo
 *  { _user_name_: 'konata',
 *    _age_: 16,
 *    _friend_list_:[
 *     { _friend_name_: 'hiragi kagami' },
 *     { _friend_name_: 'hiragi tsukasa' }
 *   ]
 * }
 */
```

- 2. 使用 `exclude` 过滤不需要处理的 `key`

```javascript
const userInfo = {
  user_name: "konata",
  age: 16,
  friend_list: [
    { friend_name: "hiragi kagami" },
    { friend_name: "hiragi tsukasa" }
  ]
};

const formattedUserInfo = shakeParams(userInfo, {
  method: "toCamel",
  exclude: ["friend_list"] // friend_list 以及其嵌套内容不做处理
});

/** formattedUserInfo
 * { userName: 'konata',
 *   age: 16,
 *   friend_list:[
 *     { friend_name: 'hiragi kagami' },
 *     { friend_name: 'hiragi tsukasa' }
 *   ]
 * }
 */
```

- 3. 使用 `mapping` 对指定 `key` 进行转换

```javascript
const userInfo = {
  user_name: "konata",
  age: 16,
  friend_list: [
    { friend_name: "hiragi kagami" },
    { friend_name: "hiragi tsukasa" }
  ]
};

const formattedUserInfo = shakeParams(userInfo, {
  method: "toCamel",
  mapping: [{ from: "age", to: "userAge" }] // 简单的 from => to 的映射
});

/** formattedUserInfo
 * { userName: 'konata',
 *   userAge: 16,
 *   friendList:[
 *     { friendName: 'hiragi kagami' },
 *     { friendName: 'hiragi tsukasa' }
 *   ]
 * }
 */
```

- 4. 使用 `mapping` 进行数据清洗与整合

```javascript
const userInfo = {
  user_name: "konata",
  age: 16,
  friend_list: [
    { friend_name: "hiragi kagami" },
    { friend_name: "hiragi tsukasa" }
  ]
};

const formattedUserInfo = shakeParams(userInfo, {
  method: "toCamel",
  mapping: [
    {
      from: ["user_name", "age"],
      to: "userInfo",
      rules: (data, from) => ({
        userName: data[from[0]],
        age: data[from[1]]
      }) // 设置 rules 之后就会根据 rules 进行数据编辑
    }
  ]
});

/** formattedUserInfo
 * { userInfo: { userName: 'konata', age: 16 },
 *   friendList:[
 *    { friendName: 'hiragi kagami' },
 *    { friendName: 'hiragi tsukasa' }
 *  ]
 * }
 */
```

#### 注意点

- 定义的 `method` 方法会处理深层嵌套的对象，包括数组型对象。如果不需要对嵌套数据进行处理，可以配置 `exclude` 或者 `mapping`。

  ```javascript
  // 嵌套的 key1_1、key2_2、key2_2_1 都会被处理
  obj:{
    key1:{key1_1: 'xxx'},
    key2:{
      key2_1:'xxx',
      key2_2:{
        key2_2_1:'xxx'
      }
    }
  }

  // 对 obj 数组中的每一项都会进行处理
  obj:[
    {key_1: 'xxx'},
    {key_2: 'xxx'},
  ]
  ```

- 使用 `mapping` 时，注意 `to` 的设置，不要出现 `key` 名称的重复，否则会出数据被覆盖的情况。

- 定义 `exclude` 和 `mapping` 中的 `key`，程序不会对其值做嵌套处理。如果需要在 `mapping` 后仍然需要进行嵌套处理，建议在 `mapping` 的 `rules` 中做处理。

  ```javascript
  // 如果在 exclude 或 mapping 中定义了 key2 的话，
  // 那么对 key2 的嵌套内容不会做处理(key2_1，key2_2)。
  // 需要自己定义 rules 来处理。
  obj:{
    key1:{key1_1: 'xxx'},
    key2:{
      key2_1:'xxx',
      key2_2:{
        key2_2_1:'xxx'
      }
    }
  }
  ```

#### 测试

使用 `jest` 进行了单元测试。测试用例在 `__test__` 文件夹下。

```shell
// 执行测试命令
npm run test
```
