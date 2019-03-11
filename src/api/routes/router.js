"use strict";

var express = require('express');
var router = express.Router();

router.use("/accounts", require("./controllers/accountsController"));
router.use("/stories", require("./controllers/storiesController"));
router.use("/chronicles", require("./controllers/chroniclesController"));
router.use("/sessions", require("./controllers/sessionsController"));
router.use("/characters", require("./controllers/charactersController"));

module.exports = router;