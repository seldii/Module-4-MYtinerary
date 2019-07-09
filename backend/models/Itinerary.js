const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ItinerarySchema = new Schema({
  user: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true,
    lowercase: true
  },
  profilePic: {
    type: String,
    required: true
  },
  rating: {
    type: Number
  },
  duration: {
    type: Number
  },
  price: {
    type: Number
  },
  hashtag: {
    type: Array
  }
});
module.exports = Itinerary = mongoose.model("itinerary", ItinerarySchema);
