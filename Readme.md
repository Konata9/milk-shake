# Milk Shake

![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg) ![GitHub package.json version](https://img.shields.io/github/package-json/v/Konata9/milk-shake.svg) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Konata9/milk-shake.svg) ![Codecov](https://img.shields.io/codecov/c/gh/Konata9/milk-shake.svg)

> 使用 `TypeScript` 编写的用于格式化对象 **key** 的工具。2.x 版本不兼容 1.x 版本（1.x 版本已经弃用）[1.x 版本地址](https://github.com/Konata9/milk-shake/tree/v1.2.2)。

### 特点

- 让对象的 `key` 在 **驼峰** 与 **下划线** 或 **自定义** 形式间自由转换
- 简单的 API 使用
- 不会修改传入的数据
- 类似 `pipe` 的调用方式

### 快速上手

#### 1. 安装

[查看 NPM](https://www.npmjs.com/package/@konata9/milk-shake)

```shell
npm i @konata9/milk-shake
```

```javascript
import { shake, format, map, melt } from "@konata9/milk-shake";
// or
const { shake, fromat, map, melt } = require("@konata9/milk-shake");
```

#### 2. 使用

```javascript
import { shake, format, map, melt } from "@konata9/milk-shake";

const userInfo = {
  user_name: "konata",
  age: 16,
  friend_list: [
    { friend_name: "hiragi kagami" },
    { friend_name: "hiragi tsukasa" }
  ]
};

const result = shake(userInfo)(format("toCamel"));

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

#### shake(params)(fromatters)

- `params`: (_required_) `object` 需要处理的对象
- `formatters`: `function` 用于处理数据的工具函数。`formatters` 的调用方式类似于管道，前一个 `formatter` 的结果会作为下一个 `fromatter` 的参数。因此只要满足返回的是一个对象的前提下，可以编写自定义的处理函数。_**本库提供了 `format`、`melt` 和 `map` 三个方法。** _

##### format(method, excludes)

- `method`: (_required_) `string` | `function`

  - `method` 接受 "**toCamel**" 和 "**toSnake**" 两种字符串，分别将 `key` 转换为驼峰或下划线的形式。
  - `method` 也可以为自定义的转换方法 `function`。`function(key)` key 传入 params 的 key，必须提供返回值。返回转换后的 key。

    ```javascriot
    // 在所有 `key` 前加上下划线：
    (key) => `_${key}`
    ```

- `exclude`: (_not required_) `array` 不需要进行转换的 `key` 的数组。`exclude` 的对象其子元素也将被忽略。

##### melt([{target, rule}])

-

##### map([{from, to, rule}])

##### 自定义 formatter

你可以根据实际需求，自定义 `formatter`。自定义的 `formatter` 需要满足下面的条件。

- `formatter` 需要**返回一个函数**。返回的函数接受需要处理的对象，并且返回处理后的对象。

```javascript
// 接收处理需要的参数
const customFormatter = formaOptions => {
  // 返回的函数接收需要处理的对象
  return params => {
    // ... 处理过程
    // 处理结束后返回处理过的对象
    return formattedParams;
  };
};

// 在 shake 中使用
shake(params)(
  customFormatter(opts),
  customFormatter(opts),
  customFormatter(opts),
  ...
)
```

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

- 3. 使用 `melting` 删除指定的 `key`

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
  melting: {
    target: ["age"]
  }
});

/** formattedUserInfo
 * { userName: 'konata',
 *  friendList: [
 *   { friendName: 'hiragi kagami' },
 *   { friendName: 'hiragi tsukasa' }
 *  ]
 * }
 */
```

- 4. 使用 `melting` 对嵌套结构进行扁平化

```javascript
const userInfo = {
  info: {
    user_name: "konata",
    age: 16
  },
  friend_list: [
    { friend_name: "hiragi kagami" },
    { friend_name: "hiragi tsukasa" }
  ]
};

const formattedUserInfo = shakeParams(userInfo, {
  method: "toCamel",
  melting: {
    target: ["info"],
    rules: data => ({
      userName: data.info["user_name"],
      age: data.info.age
    })
  }
});

/** formattedUserInfo
 * { userName: 'konata',
 *   age: 16,
 *   friendList:[
 *    { friendName: 'hiragi kagami' },
 *    { friendName: 'hiragi tsukasa' }
 *   ]
 * }
 */
```

- 5. 使用 `mapping` 对指定 `key` 进行转换

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

- 6. 使用 `mapping` 进行数据清洗与整合

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

#### 测试

使用 `jest` 进行了单元测试。测试用例在 `__test__` 文件夹下。

```shell
// 执行测试命令
npm run test
```
