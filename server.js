"use strict";

// dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// set view engine
app.set("view engine", "jade");

app.get("/", (req, res) =>
{
  res.render("index");
});

app.listen (PORT, () =>
{
  console.log(`App listening on port ${PORT}`);
});
