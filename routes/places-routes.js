const express = require("express");

const {
  getPlaceByid,
  getPlaceByUserid,
} = require("../controllers/places-controller");

const router = express.Router();

router.get("/:placeId", getPlaceByid);

router.get("/user/:userId", getPlaceByUserid);

module.exports = router;
