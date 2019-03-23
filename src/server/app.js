"use strict";

// Mongoose configuration
import mongoose from "mongoose";
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://172.17.0.2:27017/the-masquerade', { promiseLibrary: require('bluebird'), useNewUrlParser: true })
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

// Express Confiuration
const PORT = process.env.PORT || 3000;
import express, { json, urlencoded } from 'express';
import cors from "cors";
const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

// Auth Configuration
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import oauthConfig from './oauth';

// API routing
app.use("/api", require("./routes/router"));


// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});