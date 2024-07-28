const express = require("express");
const { check } = require("express-validator");
const {
  getAllUser,
  signUp,
  login,
} = require("../controllers/users-controller");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/", getAllUser);
router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("userName").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signUp
);
router.post("/login", login);

module.exports = router;
