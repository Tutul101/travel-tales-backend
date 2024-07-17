const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Place = require("../models/place");

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

const getPlaceByid = async (req, res, next) => {
  const placeId = req.params.placeId;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Some thing went wrong could not find a place",
      500
    );
    return next(error);
  }
  if (!place) {
    const error = new HttpError(
      "Could not find place for the provided id",
      404
    );
    return next(error);
  }
  res.status(200).json({ place: place.toObject() });
};

const getPlaceByUserid = async (req, res, next) => {
  const userId = req.params.userId;
  let place;
  try {
    place = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong could not find a place",
      500
    );
    return next(error);
  }
  if (!place) {
    const error = new HttpError(
      "Could not find the places for the user id",
      404
    );
    return next(error);
  }

  res.status(200).json({ places: place.map((item) => item.toObject()) });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid input passed, please check your data",
      422
    );
    return next(error);
  }
  const { title, description, address, creator } = req.body;
  const coordinates = {
    lat: "40.7484445",
    lng: "-73.9882393",
  };
  console.log("Post request body", req.body);

  const createdPlace = new Place({
    title: title,
    description: description,
    image:
      "https://images.unsplash.com/photo-1517713982677-4b66332f98de?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    address: address,
    location: coordinates,
    creator: creator,
  });
  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError("Creating place failed, Please try again", 500);
    console.log(err);
    return next(error);
  }

  console.log("Place is added successfully !!!!!");
  res.status(201).json({ place: createdPlace });
};

const updataPlace = async (req, res, next) => {
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
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Some thing went wrong could not update", 500);
    return next(error);
  }
  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError("Some thing went wrong could not update", 500);
    return next(error);
  }
  res.status(200).json({ place: place.toObject() });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.placeId;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong could not dete the place",
      500
    );
    return next(error);
  }

  try {
    await place.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong could not dete the place",
      500
    );
    return next(error);
  }
  res.status(200).json({ message: "Place deleted Successfully" });
};
exports.getPlaceByid = getPlaceByid;
exports.getPlaceByUserid = getPlaceByUserid;
exports.createPlace = createPlace;
exports.updataPlace = updataPlace;
exports.deletePlace = deletePlace;
