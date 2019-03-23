"use strict";

const router = require('express').Router();

router.use("/accounts", require("./controllers/accountsController").default);
router.use("/stories", require("./controllers/storiesController").default);
router.use("/chronicles", require("./controllers/chroniclesController").default);
router.use("/sessions", require("./controllers/sessionsController"));
router.use("/characters", require("./controllers/charactersController"));

module.exports = router;