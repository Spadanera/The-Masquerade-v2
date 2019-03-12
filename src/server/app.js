"use strict";

import express, { json, urlencoded } from 'express';
import { use, authenticate } from 'passport';
import cors from "cors";
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { web } from "../client_secret.json";
const PORT = process.env.PORT || 3000;

const app = express();

// Body Parser Middleware
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

// use(new GoogleStrategy({
//   clientID: web.client_id,
//   clientSecret: web.client_secret,
//   callbackURL: "http://localhost:3000/auth/google/callback"
// },
//   function (accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ googleId: profile.id }, (err, user) => {
//       return done(err, user);
//     });
//   }
// ));

// app.get('/auth/google',
//   authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// app.get('/auth/google/callback',
//   authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     res.redirect('/');
//   });

app.use("/api", require("./routes/router"));

// app.get("/", function (req, res) {
//   return res.end('<a href="/auth/google">Sign In with Google</a>');
// });
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
