const {shake, format, map, melt} = require("./dist/index");

// const userInfo = {
//   user_name: "konata",
//   age: 16,
//   friend_list: [{friend_name: "hiragi kagami"}, {friend_name: "hiragi tsukasa"}]
// };
// const result = shake(userInfo)(format("toCamel"));
// console.log(result);
// const formatData = {
//   user_name: "konata",
//   user_age: 18
// };
// const formattedData = format("toCamel", ["user_age"])(formatData);
// const formattedData = melt([{target: "user_age"}])(formatData);
// const formattedData = map([{from: "user_name", to: "student_name"}])(formatData);
// console.log(formattedData);

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

console.log(formattedData);
