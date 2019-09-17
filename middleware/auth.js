const config = require("../config/default");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  //Check for token

  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  //Verify

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    //Add User from payload

    req.user = decoded;

    next();
  } catch (err) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
