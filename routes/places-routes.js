const express = require("express");

const {
  getPlaceByid,
  getPlaceByUserid,
  createPlace,
} = require("../controllers/places-controller");

const router = express.Router();

router.get("/:placeId", getPlaceByid);

router.get("/user/:userId", getPlaceByUserid);

router.post("/", createPlace);
module.exports = router;
