const { check } = require("express-validator/check");
const cityValidation = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("Name field could not be empty.")
    .isAlpha()
    .withMessage("Name field must contain only alphabetical chars"),
  check("country", "Country field could not be left empty.")
    .not()
    .isEmpty(),
  check(
    "country",
    "Country field should contain 2-letter country code."
  ).isLength({ min: 2 }),
  check("image")
    .not()
    .isEmpty()
    .withMessage("Image field can not be empty.")
    .isURL()
    .withMessage("Image field must contain a valid url.")
];

module.exports = cityValidation;
