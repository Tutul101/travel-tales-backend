const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const httpError = require("../models/http-error");

const User = require("../models/user");

const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new httpError("Could not found any users", 500);
    return next(error);
  }

  res.status(200).json({
    users: users.map((user) => user.toObject()),
  });
};

const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new httpError(
      "Invalid input passed, please check your data",
      422
    );
    return next(error);
  }
  const { userName, email, password } = req.body;
  const imagePath = req.file.path;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new httpError(
      "Signing up failed please try again later",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new httpError("User already exists, Please login", 422);
    return next(error);
  }
  const createdUser = new User({
    name: userName,
    email: email,
    password: password,
    image: imagePath,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new httpError("Sign up failed please try again", 500);
    console.log(err);
    return next(error);
  }

  res.status(201).json({
    message: "User is sign up successfull",
    user: createdUser.toObject(),
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new httpError("Login failed please try again", 500);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new httpError("Invalid credentials", 401);
    return next(error);
  }

  res
    .status(200)
    .json({ message: "Login successfull", user: existingUser.toObject() });
};

exports.getAllUser = getAllUser;
exports.signUp = signUp;
exports.login = login;
