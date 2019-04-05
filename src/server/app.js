"use strict";

// Mongoose configuration
import mongoose from "mongoose";
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.Promise = require('bluebird');
// mongoose.connect('mongodb://172.17.0.2:27017/the-masquerade', { promiseLibrary: require('bluebird'), useNewUrlParser: true })
mongoose.connect('mongodb+srv://admin:admin@themasquerade-dfbrl.mongodb.net/test?retryWrites=true', { promiseLibrary: require('bluebird'), useNewUrlParser: true })
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
import auth from './oauth';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
auth(passport);
app.use(passport.initialize());
app.use(cookieSession({
  name: 'session',
  keys: ['123']
}));
app.use(cookieParser());

// Auth routing
app.use("/auth", require('./routes/middlewares/auth').default);

// API routing
app.use("/api", require("./routes/router").default);


// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});