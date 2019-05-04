# Milk Shake

![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg) ![GitHub package.json version](https://img.shields.io/github/package-json/v/Konata9/milk-shake.svg) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Konata9/milk-shake.svg) ![Codecov](https://img.shields.io/codecov/c/gh/Konata9/milk-shake.svg)

> 使用 `TypeScript` 编写的用于格式化对象 **key** 的工具。

### 特点

- 让对象的 `key` 在 **驼峰** 与 **下划线** 形式间自由转换
- 可以自定义 `key` 的转换方法
- 可以对传入的对象进行简单的数据变化
- 简单的 API 使用

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

_返回_**处理后**的 `params`

- `method`

- `mapping`

- 处理顺序
  程序仅对 `exclude` 之外的 `key` 进行处理；之后进行 `mapping` 的检测，当符合 `mapping` 关系时，可以

  因此当同时设置了 `method`，`exclude` 和 `mapping` 三个选项时，按照 `exclude` > `mapping` > `method` 的顺序进行处理（更多用例可以见后文）。

- _注意点_

#### more example

- 1. 自定义 `method` 处理 `key`
- 2. 使用 `exclude` 过滤不需要处理的 `key`
- 3. 使用 `mapping` 对指定 `key` 进行转换
- 4. 使用 `mapping` 进行数据清洗与整合
