const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

const jwt_private_key = process.env.JWT_KEY;

const checkAuth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    console.log("req.headers.authorizaton", req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1]; //Authorization: Bearer token
    console.log("token", token);
    if (!token) {
      throw new Error("Authorization failed");
    }
    const decodedToken = jwt.verify(token, jwt_private_key);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authorization failed", 500);
    return next(error);
  }
};

module.exports = checkAuth;
