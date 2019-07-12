const express = require("express");
const router = express.Router();

//Itinerary Model

const Itinerary = require("../models/Itinerary");

//validation
const itineraryValidation = require("../validation/itinerary");
const { validationResult } = require("express-validator/check");

const auth = require("../../backend/middleware/auth");

//Create
router.post("/", itineraryValidation, auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newItinerary = await new Itinerary(req.body);
    newItinerary.save().then(itinerary => res.send(itinerary));
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//Update
router.patch("/:id", itineraryValidation, auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const itinerary = await Itinerary.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!itinerary) {
      return res.status(404).send({ msg: "Itinerary Not found" });
    }
    res.send(itinerary);
  } catch (err) {
    res.send(err.message);
  }
});

//Read
//all
router.get("/", async (req, res) => {
  try {
    const itineraries = await Itinerary.find();
    res.send(itineraries);
  } catch (err) {
    res.send(err.message);
  }
});
//getbyid
router.get("/:id", async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) {
      return res.status(404).send("Itinerary not found");
    }
    res.send(itinerary);
  } catch (err) {
    res.send(err.message);
  }
});

//getByCity

router.get("/itineraries/:city", async (req, res) => {
  try {
    const itinerary = await Itinerary.find({ city: req.params.city });
    if (!itinerary) {
      return res.status(404).send("Itinerary not found");
    }
    res.send(itinerary);
  } catch (err) {
    res.send(err.message);
  }
});

//Delete

router.delete("/:id", auth, async (req, res) => {
  try {
    const itinerary = await Itinerary.findByIdAndDelete(req.params.id);
    if (!itinerary) {
      return res.status(404).send("Itinerary not found.");
    }
    res.send({ msg: "Itinerary deleted." });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
