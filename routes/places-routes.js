const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    imageUrl:
      "https://media.istockphoto.com/id/486334510/photo/new-york-city-skyline.jpg?s=1024x1024&w=is&k=20&c=2XpMl1tWgCAAQ55ZI4PcMYr1CQTIs7JMkpfDzJSRJiE=",
    address: "20 W 34th St., New York, NY 10001, USA",
    location: {
      lat: "40.7484445",
      lng: "-73.9882393",
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    imageUrl:
      "https://media.istockphoto.com/id/486334510/photo/new-york-city-skyline.jpg?s=1024x1024&w=is&k=20&c=2XpMl1tWgCAAQ55ZI4PcMYr1CQTIs7JMkpfDzJSRJiE=",
    address: "20 W 34th St., New York, NY 10001, USA",
    location: {
      lat: "40.7484445",
      lng: "-73.9882393",
    },
    creator: "u2",
  },
];

router.get("/:placeId", (req, res, next) => {
  const placeId = req.params.placeId;
  const place = DUMMY_PLACES.find((item) => item.id === placeId);
  if (!place) {
    const error = new Error("Could not find a place for the provided id");
    error.code = 404;
    throw error;
  }

  res.status(200).json({
    place: place,
  });
});

router.get("/user/:userId", (req, res, next) => {
  const userId = req.params.userId;
  const place = DUMMY_PLACES.find((item) => item.creator === userId);

  if (!place) {
    const error = new Error("Could not find a place for the user id");
    error.code = 404;
    return next(error);
  }
  res.status(200).json({
    place: place,
  });
});

module.exports = router;
