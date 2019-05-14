const { shake, format, map, melt } = require("./dist/index");

const userInfo = {
  user_name: "konata",
  age: 16,
  friend_list: [
    { friend_name: "hiragi kagami" },
    { friend_name: "hiragi tsukasa" }
  ]
};

const result = shake(userInfo)(format("toCamel"));

console.log(result);
