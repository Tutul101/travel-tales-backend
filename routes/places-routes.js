const express = require("express");

const {
  getPlaceByid,
  getPlaceByUserid,
  createPlace,
  updataPlace,
  deletePlace,
} = require("../controllers/places-controller");

const router = express.Router();

router.get("/:placeId", getPlaceByid);

router.get("/user/:userId", getPlaceByUserid);

router.post("/", createPlace);

router.patch("/:placeId", updataPlace);

router.delete("/:placeId", deletePlace);

module.exports = router;
