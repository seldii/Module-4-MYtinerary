const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const config = require("config");

// BodyParser Middleware
app.use(express.json());

app.use("/cities", require("./routes/cities"));

app.use("/itineraries", require("./routes/itineraries"));

app.use("/users", require("./routes/users"));

app.use("/auth", require("./routes/auth"));

//DB Config
const db = config.get("mongoURI");

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set("useFindAndModify", false);

//Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(console.log("MongoDB Connected..."))
  .catch(err => console.log(err));
const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
