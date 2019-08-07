const { check } = require("express-validator/check");

const userValidation = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("Name field could not be left empty."),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email field could not be left empty.")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Please enter a password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 chars long")
];
module.exports = userValidation;
