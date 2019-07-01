const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});
module.exports = City = mongoose.model("city", CitySchema);
