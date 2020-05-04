const express = require("express");
const router = express.Router();
const config = require("../config/default");
const jwt = require("jsonwebtoken");
const multer = require("multer");
//where sould the upcoming file be stored
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/profilePics");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
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
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
//validationnpm

const userValidation = require("../validation/user");
const { validationResult } = require("express-validator/check");

//City Model
const User = require("../models/User");

const auth = require("../middleware/auth");

//@router  POST /users
//@desc Register new user
// @access Public

router.post("/", userValidation, upload.single("profileImage"), (req, res) => {
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password, profileImage } = req.body;

  //Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please fill out all fields" });
  }

  //Check for existing user
  User.findOne({ email: email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });
    const newUser = new User({
      name: name,
      email: email,
      password: password,
      profileImage: profileImage,
    });

    newUser.save().then((user) => {
      jwt.sign(
        { id: user.id },
        config.jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              profileImage: user.profileImage,
            },
          });
        }
      );
    });
  });
});

//@router  GET /users
//@desc Fetch the itinerary to the favorites
//@access Private

router.get("/favorites/:id", async (req, res) => {
  console.log(req.params);
  try {
    const user = await User.findById(req.params.id);
    res.send(user.favorites);
  } catch (error) {
    console.log(error);
  }
});

//@router  PATCH /users
//@desc Add the itinerary to the favorites
// @access Private

router.patch("/itinerary", (req, res) => {
  console.log(req.body);
  const newFavorite = req.body.favorite;
  const id = req.body.user;
  User.findOne({ _id: id }, function (err, user) {
    if (!user.favorites.includes(newFavorite)) {
      user.favorites.push(newFavorite);
      user.save(function (err, user) {
        if (err) throw err;
        res.json(user);
      });
    }
  });
});

//@router  DELETE /users
//@desc Remove the itinerary_id from the favorites
//@access Private

router.delete("/itinerary", async (req, res) => {
  const unFavorite = req.body.favorite;
  const id = req.body.user;

  const user = await User.findByIdAndUpdate(
    { _id: id },
    {
      $pull: {
        favorites: unFavorite,
      },
    },
    { new: true }
  );
  if (user)
    user.save(function (err, user) {
      if (err) throw err;

      res.json(user);
    });
});

module.exports = router;
