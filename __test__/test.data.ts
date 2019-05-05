const userInfo = {
  first_name: "ko",
  middle_name: "na",
  last_name: "ta"
};

const userInfoMelt = {
  middleName: "na",
  lastName: "ta"
};

const formattedUserInfo = {
  firstName: "ko",
  middleName: "na",
  lastName: "ta"
};

const customUserInfo = {
  _first_name_: "ko",
  _middle_name_: "na",
  _last_name_: "ta"
};

const customUserInfo2 = {
  eman_tsrif: "ko",
  eman_elddim: "na",
  eman_tsal: "ta"
};

const excludeInfo = {
  firstName: "ko",
  middle_name: "na",
  lastName: "ta"
};

const excludeInfo2 = {
  firstName: "ko",
  middle_name: "na",
  last_name: "ta"
};

const userInfoFull = {
  user_name: "konata",
  info: {
    user_age: 18,
    user_gender: "female"
  },
  friendList: [{f_name: "friend 1", f_age: 18}, {f_name: "friend 2", f_age: 18}]
};

const userInfoFullMelting = {
  userName: "konata",
  info: {
    userAge: 18
  },
  friendList: [{fName: "friend 1"}, {fName: "friend 2"}]
};

const userInfoFullMelting2 = {
  userName: "konata",
  userAge: 18,
  userGender: "female",
  friendList: [{fName: "friend 1", fAge: 18}, {fName: "friend 2", fAge: 18}]
};

const formattedUserInfoFull = {
  userName: "konata",
  info: {
    userAge: 18,
    userGender: "female"
  },
  friendList: [{fName: "friend 1", fAge: 18}, {fName: "friend 2", fAge: 18}]
};

const userInfoMapping1 = {
  myFirstName: "ko",
  middleName: "na",
  lastName: "ta"
};

const userInfoMapping2 = {
  myFirstName: "Konata10",
  middleName: "na",
  lastName: "ta"
};

const userInfoMapping3 = {
  firstName: "kona",
  lastName: "ta"
};

const userInfoFullMapping1 = {
  userInfo: {
    userName: "konata",
    age: 18,
    gender: "female"
  },
  friendInfo: [{f_name: "friend 1", f_age: 18}, {f_name: "friend 2", f_age: 18}]
};

const userDumblicateInfo = {
  first_name: "ko",
  middle_name: "na",
  lastName: "ta"
};

const formattedUserInfoAll = {
  user_name: "konata",
  info: {
    userAge: 18,
    _user_gender_: "female"
  },
  friendList: [{fName: "friend 1", fAge: 18}, {fName: "friend 2", fAge: 18}]
};

const fullTestData = {
  user_name: "konata",
  info: {user_country: "china", user_city: "sh"},
  user_address: {code: "12345", address: "aaabbbccc"},
  friend_list: [
    {
      first_name: "a",
      last_name: "b"
    },
    {
      first_name: "c",
      last_name: "d"
    }
  ],
  Type: 2,
  extra: {
    job: "engineer"
  }
};

const formattedFullData = {
  userName: "konata",
  info: {
    userCountry: "china",
    userCity: "sh"
  },
  address: "12345-aaabbbccc",
  friendList: [
    {firstName: "a", lastName: "b"},
    {firstName: "c", lastName: "d"}
  ],
  Type: 2,
  job: "engineer"
};

const userArray = {
  userName: ["k", "o", "n", "a", "t", "a"]
};

const deepArrayTest = {
  user_name: "konata",
  info: {
    friends: [
      {friend_name: "f1", friend_age: 20},
      [
        "a",
        "b",
        {
          inner_list: ["a", "b"],
          inner_info: {
            info_a: "a",
            info_b: "b"
          }
        },
        1,
        2,
        [3, 4, 5, [6, 7, {deep_inner: 8}]]
      ]
    ]
  }
};

const formattedDeepArrayTest = {
  userName: "konata",
  info: {
    friends: [
      {friendName: "f1", friendAge: 20},
      [
        "a",
        "b",
        {
          innerList: ["a", "b"],
          innerInfo: {
            infoA: "a",
            infoB: "b"
          }
        },
        1,
        2,
        [3, 4, 5, [6, 7, {deepInner: 8}]]
      ]
    ]
  }
};

export {
  userInfo,
  userInfoMelt,
  formattedUserInfo,
  customUserInfo,
  customUserInfo2,
  excludeInfo,
  excludeInfo2,
  userInfoFull,
  userInfoFullMelting,
  userInfoFullMelting2,
  formattedUserInfoFull,
  userInfoMapping1,
  userInfoMapping2,
  userInfoMapping3,
  userInfoFullMapping1,
  userDumblicateInfo,
  formattedUserInfoAll,
  fullTestData,
  formattedFullData,
  userArray,
  deepArrayTest,
  formattedDeepArrayTest
};
