const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const config = require("config");

// BodyParser Middleware

app.use(express.json({ limit: "50mb" }));

app.use("/cities", require("./routes/cities"));

app.use("/itineraries", require("./routes/itineraries"));

app.use("/users", require("./routes/users"));

app.use("/google", require("./routes/google"));

app.use("/auth", require("./routes/auth"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

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
