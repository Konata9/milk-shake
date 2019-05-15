# Milk Shake

![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg) ![GitHub package.json version](https://img.shields.io/github/package-json/v/Konata9/milk-shake.svg) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Konata9/milk-shake.svg) ![Codecov](https://img.shields.io/codecov/c/gh/Konata9/milk-shake.svg)

> 使用 `TypeScript` 编写的用于格式化对象 **key** 的工具。2.x 版本不兼容 1.x 版本（1.x 版本已经弃用）[1.x 版本地址](https://github.com/Konata9/milk-shake/tree/v1.2.2)。

### 特点

- 让对象的 `key` 在 **驼峰** 与 **下划线** 或 **自定义** 形式间自由转换
- 简单的 API 使用
- 不会修改传入的数据
- 类似 `pipe` 的调用方式，根据自身需求调用需要的规则与顺序

### 快速上手

#### 1. 安装

[查看 NPM](https://www.npmjs.com/package/@konata9/milk-shake)

```shell
npm i @konata9/milk-shake
```

```javascript
import {shake, format, map, melt} from "@konata9/milk-shake";
// or
const {shake, fromat, map, melt} = require("@konata9/milk-shake");
```

#### 2. 使用

```javascript
import {shake, format, map, melt} from "@konata9/milk-shake";

const userInfo = {
  user_name: "konata",
  age: 16,
  friend_list: [{friend_name: "hiragi kagami"}, {friend_name: "hiragi tsukasa"}]
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
- `formatters`: `function` 用于处理数据的工具函数。`formatters` 的调用方式类似于管道，前一个 `formatter` 的结果会作为下一个 `fromatter` 的参数。因此只要满足返回的是一个对象的前提下，可以编写自定义的处理函数。**本库提供了 `format`、`melt` 和 `map` 三个方法。**

#### 自带 Formatters

> 自带的 `Formatters` 可以单独使用。

##### format(method, excludes)

> 返回格式化后的对象（会对嵌套对象进行处理）

- `method`: (_required_) `string` | `function`

  - `method` 可以为 "**toCamel**" 和 "**toSnake**" 两种字符串，分别将 `key` 转换为驼峰或下划线的形式。
  - `method` 也可以为自定义的转换方法 `function`。`function(key)` key 传入 params 的 key，必须提供返回值。返回转换后的 key。

    ```javascriot
    // 在所有 `key` 前加上下划线：
    (key) => `_${key}`
    ```

- `exclude`: (_not required_) `array` 不需要进行转换的 `key` 的数组。`exclude` 的对象其子元素也将被忽略。

```javascript
// 单独使用 fromat 方法
const formatData = {
  user_name: "konata",
  user_age: 18
};
format("toCamel", ["user_age"])(formatData);
// { userName: 'konata', user_age: 18 }
```

##### melt([{target, rule}])

> 接收一个包含 `targe` 和 `rule` 的对象数组，返回格式化后的对象

- target: (_required_) `string` 为需要移除或者扁平化的 `key`。当没有设置 `rule` 时，删除 `target` 对应的 `key`；设置 `rule` 时会根据 `rule` 进行处理。当有对象嵌套时，可以使用 `.` 的方法指定深层对象。如 `a.b.c` 对应 `a:{b:{c:1}}`。

- rule: (_not required_) `function(data, params) => object` 接收两个参数 `data`、`params`，必须提供一个对象类型的返回值。
  - `data`: `target` 对应的值
  - `params`: 传入的 `params`

```javascript
// 单独使用 melt 方法
const formatData = {
  user_name: "konata",
  user_age: 18
};
melt([{target: "user_age"}])(formatData);
// { userName: 'konata'}
```

##### map([{from, to, rule}])

> 接收一个包含 `from`、`to` 和 `rule` 的对象数组，返回格式化后的对象

- `from`: (_required_) `string` 为需要进行 `maping` 的 `key`，对应传入 `params` 的 `key`。当没有设置 `rule` 时，为 `from` => `to` 的简单映射；设置 `rule` 时会根据 `rule` 进行处理。当有对象嵌套时，可以使用 `.` 的方法指定深层对象。如 `a.b.c` 对应 `a:{b:{c:1}}`。

- `to`: (_required_) `string` 为需要进行 `mapping` 的 `key`，对应返回值中的 `key`。`to` 也支持 `.` 的方法用来设置嵌套对象，_需要注意的是嵌套对象的父级必须存在且为对象_

- rule: (_not required_) `function(data, params) => object` 接收两个参数 `data`、`params`。
  - `data`: `from` 对应的值
  - `params`: 传入的 `params`

```javascript
// 单独使用 map 方法
const formatData = {
  user_name: "konata",
  user_age: 18
};
map([{from: "user_name", to: "student_name"}])(formatData);
// { user_age: 18, student_name: 'konata' }
```

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

#### 完整的例子

```javascript
// 驼峰化 + 移除不要属性 + mapping 数据
const formatData = {
  user_name: "konata",
  // 通过 exclude 设置不需要处理的 key
  user_age: 18,
  // 利用 melt 删除嵌套对象
  address_info: {
    province: "sh1",
    city: "sh2",
    area: "sh3"
  },
  // 利用 melt 进行扁平化
  contact_way: {
    telephone: 12345678901,
    mail_box: "111@111.com"
  },
  // 通过 map 编辑数据
  scores: [1, 2, 3, 4],
  // fromat 会对嵌套的 key 也做处理
  friend_list: [
    {friend_name: "1", friend_age: 10},
    {friend_name: "2", friend_age: 10},
    {friend_name: "3", friend_age: 10}
  ],
  // 通过 map 对嵌套数据进行处理
  courses: {
    chinese: {teacher: "a", age: 18},
    math: {teacher: "b", age: 18},
    english: {teacher: "c", age: 18}
  }
};

const formattedData = shake(formatData)(
  melt([
    {target: "address_info.province"},
    {
      target: "contact_way",
      rule: (data) => ({
        telephone: data.telephone,
        mail_box: data.mail_box
      })
    }
  ]),
  map([
    {from: "scores", to: "scores", rule: (data) => data.map((x) => x * x)},
    {from: "courses.chinese", to: "courses.chineseLesson"},
    {from: "courses.math", to: "courses.mathLesson"},
    {from: "courses.english", to: "courses.englishLesson"}
  ]),
  format("toCamel", ["user_age"])
);

/**
 *  {
 *     userName: 'konata',
 *     user_age: 18,
 *     addressInfo: { city: 'sh2', area: 'sh3' },
 *     scores: [ 1, 4, 9, 16 ],
 *     friendList:
 *      [ { friendName: '1', friendAge: 10 },
 *        { friendName: '2', friendAge: 10 },
 *        { friendName: '3', friendAge: 10 } ],
 *     courses:
 *      { chineseLesson: { teacher: 'a', age: 18 },
 *        mathLesson: { teacher: 'b', age: 18 },
 *        englishLesson: { teacher: 'c', age: 18 } },
 *     telephone: 12345678901,
 *     mailBox: '111@111.com'
 *  }
 *
 * /
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

- `melt` 和 `map` 的相关使用场景

`melt` 适合扁平化和删除 `key`；`map` 适合数据的转换和整合，在一定程度上可以代替 `format`

#### 测试

使用 `jest` 进行了单元测试。测试用例在 `__test__` 文件夹下。

```shell
// 执行测试命令
npm run test
```
