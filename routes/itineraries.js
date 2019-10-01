const express = require("express");
const router = express.Router();

//Activity Image upload
const multer = require("multer");
//where sould the upcoming file be stored
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./profilePics");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
//file filters accept or deny the file

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    cb(null, true);
  else cb(new Error("Image should be in png or jpeg format"), false);
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

//Itinerary Model
const Itinerary = require("../models/Itinerary");

//validation
const itineraryValidation = require("../validation/itinerary");
const { validationResult } = require("express-validator/check");

const auth = require("../middleware/auth");

//Create
router.post(
  "/",
  itineraryValidation,
  upload.single("image"),
  async (req, res) => {
    console.log(req.file);
    console.log(req.body);
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newItinerary = await new Itinerary(req.body);
      newItinerary.save().then(itinerary => res.send(itinerary));
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

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

//@router  PATCH /itineraries
//@desc Add a new comment to the itinerary
//@access Private

router.patch("/itinerary/:id", async (req, res) => {
  const newComment = req.body;
  const id = req.params.id;
  await Itinerary.findById(id, (err, itinerary) => {
    itinerary.comments.push(newComment);
    itinerary.save((err, itinerary) => {
      if (err) throw err;
      res.json(itinerary);
    });
  });
});

//@router  DELETE /itineraries
//@desc Delete a  comment from the itinerary
//@access Private

router.delete("/itinerary/:id", async (req, res) => {
  const date = req.body.date;
  const id = req.params.id;

  const itinerary = await Itinerary.findByIdAndUpdate(
    { _id: id },
    {
      $pull: {
        comments: {
          date: date
        }
      }
    },
    { new: true }
  );
  if (itinerary)
    itinerary.save((err, itinerary) => {
      if (err) throw err;
      res.json(itinerary);
    });
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

//getByUser

router.get("/profile/:user", async (req, res) => {
  try {
    const itinerary = await Itinerary.find({ "user.name": req.params.user });
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
