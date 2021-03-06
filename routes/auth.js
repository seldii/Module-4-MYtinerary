const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("../config/default");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

//City Model
const User = require("../models/User");

//@router  POST /auth
//@desc Auth user
//@access Public

router.post("/", (req, res) => {
  const { email, password } = req.body;
  //Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please fill out all fields" });
  }
  //Check for existing user
  User.findOne({ email: email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User not found" });

    //validating password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
      jwt.sign({ id: user.id }, config.jwtSecret, (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user
        });
      });
    });
  });
});

//@router  POST /auth/user
//@desc Get user data
// @access Private

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password") //disregard the password
    .then(user => res.json(user));
});

module.exports = router;
