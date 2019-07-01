const express = require("express");
const router = express.Router();
const City = require("../models/City");
router.get("/test", (req, res) => {
  res.send({ msg: "Cities test route." });
});

//Create
router.post("/", (req, res) => {
  const city = new City(req.body);
  city
    .save()
    .then(city => {
      res.send(city);
    })
    .catch(err => {
      res.status(500).send("Server Error");
    });
});

//Update
router.patch("/:id", (req, res) => {
  City.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
    .then(city => {
      if (!city) {
        return res.status(404).send({ msg: "City Not found" });
      }
      res.send(city);
    })
    .catch(err => {
      res.send(err.message);
    });
});

//Read

router.get("/", (req, res) => {
  City.find()
    .sort({ name: 1 })
    .then(cities => {
      res.send(cities);
    })
    .catch(err => res.send(err.message));
});

router.get("/:id", (req, res) => {
  City.findById(req.params.id)
    .then(city => {
      if (!city) {
        return res.status(404).send("City not found");
      }
      res.send(city);
    })
    .catch(err => {
      res.send(err.message);
    });
});

//Delete

router.delete("/:id", (req, res) => {
  City.findByIdAndDelete(req.params.id)
    .then(city => {
      if (!city) {
        return res.status(404).send("City not found.");
      }
      res.send({ msg: "City deleted." });
    })
    .catch(err => res.status(500).send(err.message));
});

module.exports = router;
