"use strict";

// dependencies
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

// set up body parser to parse url encoded form data from browser
app.use(bodyParser.urlencoded({extended: false}));

// set view engine
app.set("view engine", "jade");

app.get("/", (req, res) =>
{
  res.render("index");
});
app.get("/login", (req, res) =>
{
  res.render("login");
});
app.post("/login", (req, res) =>
{
  console.log(req.body);
  res.redirect("/");
});

app.listen (PORT, () =>
{
  console.log(`App listening on port ${PORT}`);
});
