"use strict";

// dependencies
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const RedisStore = require("connect-redis")(session);
const app = express();

// routes
const userRoutes = require('./lib/users/routes');

// envrionment variables
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'supersecret';

// set up body parser to parse url encoded form data from browser
app.use(bodyParser.urlencoded({extended: false}));

// use express sessions with session secret environment variable
// integrate redis for storing sessions even when server stops
app.use(session({
  secret: SESSION_SECRET,
  store: new RedisStore()
}));

// use user routes
app.use(userRoutes);

//create middleware to test session
app.use((req,res,next) =>
{
  req.session.visits = req.session.visits || {};
   req.session.visits[req.url] = req.session.visits[req.url] || 0;
   req.session.visits[req.url]++;
   console.log(req.session);

   app.locals.user = req.session.user || { email: 'Guest' };
   next();
});

// set view engine
app.set("view engine", "jade");

// index page
app.get("/", (req, res) =>
{
  res.render("index");
});

mongoose.connect("mongodb://localhost:27017/nodeauth", (err) =>
{
  if(err) throw err;
    app.listen (PORT, () =>
    {
      console.log(`App listening on port ${PORT}`);
    });
});
