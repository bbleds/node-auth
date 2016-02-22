"use strict";

// dependencies
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

// envrionment variables
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'supersecret';

// set up body parser to parse url encoded form data from browser
app.use(bodyParser.urlencoded({extended: false}));

// use express sessions with session secret environment variable
app.use(session({
  secret: SESSION_SECRET
}));

//create middleware to test session
app.use((req,res,next) =>
{
  req.session.count = req.session.count || 0;
  req.session.count++;
  console.log(req.session);
  next();
});

// set view engine
app.set("view engine", "jade");

// index page
app.get("/", (req, res) =>
{
  res.render("index");
});

// login routes
app.get("/login", (req, res) =>
{
  res.render("login");
});
app.post("/login", (req, res) =>
{
  console.log(req.body);
  res.redirect("/");
});

// register routes
app.get("/register", (req, res) =>
{
  res.render("register");
});
app.post("/register", (req, res) =>
{
  console.log(req.body);
  if(req.body.password === req.body.passwordVerify){
    res.redirect("/");
  } else {
    res.render("register", {email: req.body.email});
  }

});

app.listen (PORT, () =>
{
  console.log(`App listening on port ${PORT}`);
});
