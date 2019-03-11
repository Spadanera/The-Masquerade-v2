"use strict";

var express = require('express');
var bodyParser = require('body-parser')
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const clientSecret = require("../client_secret.json");
const PORT = process.env.PORT || 3000;

var app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

passport.use(new GoogleStrategy({
  clientID: clientSecret.web.client_id,
  clientSecret: clientSecret.web.client_secret,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, (err, user) => {
      return done(err, user);
    });
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

app.use("/api", require("./api/routes/router"));

app.get("/", function (req, res) {
  return res.end('<a href="/auth/google">Sign In with Google</a>');
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
