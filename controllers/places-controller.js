const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

let DUMMY_PLACES = [
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

const getPlaceByid = (req, res, next) => {
  const placeId = req.params.placeId;
  const place = DUMMY_PLACES.find((item) => item.id === placeId);
  if (!place) {
    const error = new HttpError(
      "Could not find place for the provided id",
      404
    );
    return next(error);
  }
  res.status(200).json({ place: place });
};

const getPlaceByUserid = (req, res, next) => {
  const userId = req.params.userId;
  const place = DUMMY_PLACES.filter((item) => item.creator === userId);

  if (!place) {
    const error = new HttpError(
      "Could not find the places for the user id",
      404
    );
    return next(error);
  }

  res.status(200).json({ places: place });
};

const createPlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid input passed, please check your data",
      422
    );
    return next(error);
  }
  const { title, description, coordinates, address, creator } = req.body;

  console.log("Post request body", req.body);
  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(createPlace);
  console.log("Place is added successfully !!!!!");
  res.status(201).json({ place: createdPlace });
};

const updataPlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid input passed, please check your data",
      422
    );
    return next(error);
  }
  const placeId = req.params.placeId;
  const { title, description } = req.body;
  const updatedPlace = {
    ...DUMMY_PLACES.find((item) => item.id === placeId),
  };
  const placeIndex = DUMMY_PLACES.findIndex((item) => item.id === placeId);
  console.log("placeIndex", placeIndex);
  if (placeIndex === -1) {
    const error = new HttpError("Could not found place for this id", 404);
    return next(error);
  }
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ updatedPlace: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.placeId;
  const placeIndex = DUMMY_PLACES.findIndex((item) => item.id === placeId);
  if (placeIndex === -1) {
    const error = new HttpError("This place is not exist", 404);
    return next(error);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((item) => item.id !== placeId);
  res.status(200).json({ message: "Place deleted Successfully" });
};
exports.getPlaceByid = getPlaceByid;
exports.getPlaceByUserid = getPlaceByUserid;
exports.createPlace = createPlace;
exports.updataPlace = updataPlace;
exports.deletePlace = deletePlace;
