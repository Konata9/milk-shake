# Milk Shake

![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg) ![GitHub package.json version](https://img.shields.io/github/package-json/v/Konata9/milk-shake.svg) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Konata9/milk-shake.svg) ![Codecov](https://img.shields.io/codecov/c/gh/Konata9/milk-shake.svg)

> 一个用于格式化对象 **key** 的工具。

### 快速上手

#### 1. 安装

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
