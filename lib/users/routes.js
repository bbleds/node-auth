"use strict";
const express = require('express');
const router = express.Router();


const User = require("./user.model");

// login routes
router.get("/login", (req, res) =>
{
  res.render("login");
});

// use bcrypt, comapre password to password in db, if match, login
router.post('/login', (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) throw err;

    if (user) {
      user.authenticate(req.body.password, (err, valid) => {
        if (err) throw err;
        console.log('<<<<', valid);
        if (valid) {
          req.session.user = user;
          res.redirect('/');
        } else {
          res.message = {
            message: 'Email or password incorrect'
          };
          res.redirect('/login');
        }
      });
    } else {
      res.message = {
        message: 'Email or password incorrect'
      };
      res.redirect('/login');
    }
  });
});

// regenerate session on Logout
router.delete('/logout', (req, res) =>
{
  req.session.regenerate((err) =>
   {
    if(err) throw err;
        res.redirect('/');
    });
});

// register routes
router.get("/register", (req, res) =>
{
  res.render("register");
});
router.post('/register', (req, res) => {
  if (req.body.password === req.body.passwordVerify) {
   User.findOne({email: req.body.email}, (err, user) => {
     if (err) throw err;

     if (user) {
       res.redirect('/login');
     } else {
       User.create(req.body, (err) =>
       {
         if (err) throw err;
         res.redirect('/login');
       });
     }
   });
 } else {
   res.render('register', {
     email: req.body.email,
     message: 'Passwords do not match'
   });
 }

});

module.exports = router;
