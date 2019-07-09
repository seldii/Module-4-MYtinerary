const { check } = require("express-validator/check");
const itineraryValidation = [
  check("user")
    .not()
    .isEmpty()
    .withMessage("User field could not be empty.")
    .isAlpha()
    .withMessage("User field must contain only alphabetical chars"),

  check("title")
    .not()
    .isEmpty()
    .withMessage("Title field could not be left empty."),

  check("city")
    .not()
    .isEmpty()
    .withMessage("City field could not be left empty.")
    .isAlpha()
    .withMessage("City field must contain only alphabetical chars"),

  check("profilePic")
    .not()
    .isEmpty()
    .withMessage("Image field can not be empty.")
    .isURL()
    .withMessage("Image field must contain a valid url.")
];

module.exports = itineraryValidation;
