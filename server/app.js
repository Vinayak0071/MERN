const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
require("./db/conn");

// const User = require("./model/userSchema");

const PORT = process.env.PORT;

app.use(express.json());

app.use(require("./router/auth"));

const middleware = (req, res, next) => {
  console.log("Hello my middleware");
  next();
};

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.get("/about", middleware, (req, res) => {
  console.log("Hello About");
  res.send("About");
});

app.get("/contact", (req, res) => {
  res.send("Contact");
});

app.get("/signin", (req, res) => {
  res.send("Sign In");
});

app.get("/signup", (req, res) => {
  res.send("Sign Up");
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
