const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use("/cities", require("./routes/cities"));

//DB Config
const db = require("./Config/keys").mongoURI;

//Connect to Mongo
mongoose
  .connect(db)
  .then(console.log("MongoDB Connected..."))
  .catch(err => console.log(err));
const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
