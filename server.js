// This helps run our server connection and routes
const express = require("express");

// This middleware helps with showing useful express information in the terminal 
const logger = require("morgan");

// This provides structure, schema validation and manages relationships for MongoDB
const mongoose = require("mongoose");

// This allows us to use gZip
const compression = require("compression");

const PORT = 3000;

const app = express();


app.use(logger("dev"));

// This activates gZip
app.use(compression());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Allows us to refrence our public folder
app.use(express.static("public"));

// connects Mongoose to our database
mongoose.connect("mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});