const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("Get request in places");
  res.json({
    message: "It is working",
  });
});

module.exports = router;
