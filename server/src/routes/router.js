"use strict";

const router = require('express').Router();
import User from '../models/User';

router.use(async (req, res, next) => {
    if (req.url.startsWith("/invitations/chronicle/")) {
        next();
    }
    else {
        let user = await User.findOne({ _id: req.session.userId, token: req.session.token });
        if (user) {
            next();
        }
        else {
            res.status(401).send("Unauthorized");
        }
    }
});

router.use("/chronicles", require("./controllers/chroniclesController").default);
router.use("/user", require("./controllers/userController").default);
router.use("/characters", require("./controllers/charactersController").default);
router.use("/stories", require("./controllers/storiesController").default);
router.use("/sessions", require("./controllers/sessionsController").default);
router.use("/coteries", require("./controllers/coteriesController").default);
router.use("/invitations", require("./controllers/invitationsController").default);
router.use("/players", require("./controllers/playersController").default);

export default router;