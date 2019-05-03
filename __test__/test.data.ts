const userInfo = {
  first_name: "ko",
  middle_name: "na",
  last_name: "ta"
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
  friendList: [
    { f_name: "friend 1", f_age: 18 },
    { f_name: "friend 2", f_age: 18 }
  ]
};

const formattedUserInfoFull = {
  userName: "konata",
  info: {
    userAge: 18,
    userGender: "female"
  },
  friendList: [{ fName: "friend 1", fAge: 18 }, { fName: "friend 2", fAge: 18 }]
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
  friendInfo: [
    { f_name: "friend 1", f_age: 18 },
    { f_name: "friend 2", f_age: 18 }
  ]
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
  friendList: [{ fName: "friend 1", fAge: 18 }, { fName: "friend 2", fAge: 18 }]
};

export {
  userInfo,
  formattedUserInfo,
  customUserInfo,
  customUserInfo2,
  excludeInfo,
  excludeInfo2,
  userInfoFull,
  formattedUserInfoFull,
  userInfoMapping1,
  userInfoMapping2,
  userInfoMapping3,
  userInfoFullMapping1,
  userDumblicateInfo,
  formattedUserInfoAll
};
