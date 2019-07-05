const express = require("express");
const router = express.Router();

//validation
const cityValidation = require("../validation/city");
const { validationResult } = require("express-validator/check");

//City Model
const City = require("../models/City");

//Create
router.post("/", cityValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newCity = await new City(req.body);
    newCity.save().then(city => res.json(city));
    res.send({ msg: "City created." });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//Update
router.patch("/:id", cityValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!city) {
      return res.status(404).send({ msg: "City Not found" });
    }
    res.send(city);
  } catch (err) {
    res.send(err.message);
  }
});

//Read

router.get("/", async (req, res) => {
  try {
    const cities = await City.find();
    cities.sort(function(a, b) {
      let nameA = a.name.toUpperCase(); // ignore upper and lowercase
      let nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    res.send(cities);
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).send("City not found");
    }
    res.send(city);
  } catch (err) {
    res.send(err.message);
  }
});

//Delete

router.delete("/:id", async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) {
      return res.status(404).send("City not found.");
    }
    res.send({ msg: "City deleted." });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
