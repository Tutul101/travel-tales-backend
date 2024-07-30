const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const httpError = require("../models/http-error");

const User = require("../models/user");

const jwt_private_key = "secret_tutul_private_key_do_not_share_it";

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
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new httpError("Could not create user please try again", 500);
    return next(error);
  }

  const createdUser = new User({
    name: userName,
    email: email,
    password: hashedPassword,
    image: imagePath,
    places: [],
  });

  let token;

  try {
    await createdUser.save();
    token = await jwt.sign(
      { userId: createdUser._id, email: createdUser.email },
      jwt_private_key,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new httpError("Sign up failed please try again", 500);
    console.log(err);
    return next(error);
  }

  res.status(201).json({
    message: "User is sign up successfull",
    user: { userId: createdUser._id, email: createdUser.email, token: token },
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

  if (!existingUser) {
    const error = new httpError("Invalid credentials", 401);
    return next(error);
  }

  let isValidPassword;
  try {
    isValidPassword = bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new httpError(
      "Could not log you in please check your credentials",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new httpError("Invalid credentials", 401);
    return next(error);
  }
  let token;
  try {
    token = await jwt(
      { userId: existingUser._id, email: existingUser.email },
      jwt_private_key,
      { expiresIn: "1h" }
    );
  } catch (err) {}
  res.status(200).json({
    message: "Login successfull",
    user: { userId: existingUser._id, email: existingUser.email, token: token },
  });
};

exports.getAllUser = getAllUser;
exports.signUp = signUp;
exports.login = login;
