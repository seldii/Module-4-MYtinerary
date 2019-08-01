const User = require("../models/User");
const JWT = require("jsonwebtoken");
const config = require("config");

signToken = user => {
  return JWT.sign(
    {
      iss: "CodeWorkr",
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    },
    config.get("jwtSecret")
  );
};

module.exports = {
  signUp: (req, res) => {
    const { name, email, password, image } = req.body;
    //Validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill out all fields" });
    }
    //Check for existing user
    const foundUser = User.findOne({ "local.email": email });
    if (foundUser) return res.status(400).json({ msg: "User already exists" });
    // Is there a Google account with the same email?
    foundUser = User.findOne({
      $or: [{ "google.email": email }]
    });
    if (foundUser) {
      // Let's merge them?
      foundUser.methods.push("local");
      foundUser.local = {
        email: email,
        password: password
      };
      foundUser.save().then(user => {
        jwt.sign(
          { id: user.id },
          config.get("jwtSecret"),
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
      // Respond with token
      res.cookie("access_token", token, {
        httpOnly: true
      });
      res.status(200).json({ success: true });
    }
    const newUser = new User({
      methods: ["local"],
      local: {
        name: name,
        email: email,
        password: password,
        image: image
      }
    });

    newUser.save().then(user => {
      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
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

    // Send a cookie containing JWT
    res.cookie("access_token", token, {
      httpOnly: true
    });
    res.status(200).json({ success: true });
  },
  googleOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    console.log(req.user);
    res.cookie("access_token", token, {
      httpOnly: true
    });
    res.status(200).json({ token });
  },

  linkGoogle: async (req, res, next) => {
    res.json({
      success: true,
      methods: req.user.methods,
      message: "Successfully linked account with Google"
    });
  },

  unlinkGoogle: async (req, res, next) => {
    // Delete Google sub-object
    if (req.user.google) {
      req.user.google = undefined;
    }
    // Remove 'google' from methods array
    const googleStrPos = req.user.methods.indexOf("google");
    if (googleStrPos >= 0) {
      req.user.methods.splice(googleStrPos, 1);
    }
    await req.user.save();

    // Return something?
    res.json({
      success: true,
      methods: req.user.methods,
      message: "Successfully unlinked account from Google"
    });
  }
};
