"use strict";

const router = require('express').Router();
const passport = require('passport');

router.use("/accounts", passport.authenticate('google', { failureRedirect: '/' }), require("./controllers/accountsController"));
router.use("/stories", require("./controllers/storiesController"));
router.use("/chronicles", require("./controllers/chroniclesController"));
router.use("/sessions", require("./controllers/sessionsController"));
router.use("/characters", require("./controllers/charactersController"));

module.exports = router;