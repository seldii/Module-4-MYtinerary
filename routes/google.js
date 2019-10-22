const express = require("express");
const router = express.Router();
const config = require("../config/default");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//validation

//City Model
const User = require("../models/User");

const auth = require("../middleware/auth");

router.post("/", (req, res) => {
  const { name, email, googleId, image } = req.body;
  //Validation
  if (!name || !email) {
    return res.status(400).json({ msg: "Please fill out all fields" });
  }
  //Check for existing user
  User.findOne({ email: email }).then(user => {
    if (user) {
      //validating password
      bcrypt.compare(googleId, user.password).then(isMatch => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials" });
        jwt.sign({ id: user.id }, config.jwtSecret, (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user
          });
        });
      });
    }
    const newUser = new User({
      name: name,
      email: email,
      image: image,
      password: googleId
    });

    newUser.save().then(user => {
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
              image: user.image
            }
          });
        }
      );
    });
  });
});

module.exports = router;
