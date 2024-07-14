const express = require("express");
const { check } = require("express-validator");

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

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty().isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  createPlace
);

router.patch(
  "/:placeId",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  updataPlace
);

router.delete("/:placeId", deletePlace);

module.exports = router;
