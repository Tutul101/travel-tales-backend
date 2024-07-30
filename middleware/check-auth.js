const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

const jwt_private_key = "secret_tutul_private_key_do_not_share_it";

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorizaton.split(" ")[1]; //Authorization: Bearer token
    if (!token) {
      throw new Error("Authorization failed");
    }
    const decodedToken = jwt.verify(token, jwt_private_key);
    req.userData = { userId: decodedToken };
    next();
  } catch (err) {
    const error = new HttpError("Authorization failed", 500);
    return next(error);
  }
};

module.exports = checkAuth;
