const { v4: uuidv4 } = require("uuid");

const httpError = require("../models/http-error");
const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    userName: "Sayantan",
    email: "sayantanchakravarty83@gmail.com",
    password: "testpassword",
  },
];

const getAllUser = (req, res, next) => {
  res.status(200).json({
    users: DUMMY_USERS,
  });
};

const signUp = (req, res, next) => {
  const { userName, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((user) => user.email === email);
  if (hasUser) {
    const error = new HttpError("This email id is already exist", 500);
    return next(error);
  }
  const createdUser = {
    id: uuidv4(),
    userName: userName,
    email: email,
    password: password,
  };
  DUMMY_USERS.push(createdUser);

  res.status(201).json({
    message: "User is sign up successfull",
    user: createdUser,
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find((user) => user.email === email);
  if (!identifiedUser) {
    const error = new httpError("This accoount is not exist", 404);
    return next(error);
  } else {
    if (password !== identifiedUser.password) {
      const error = new httpError("Email or Password is incorrect", 500);
      return next(error);
    } else {
      res.status(200).json({ message: "User logged in successfull" });
    }
  }
};

exports.getAllUser = getAllUser;
exports.signUp = signUp;
exports.login = login;
