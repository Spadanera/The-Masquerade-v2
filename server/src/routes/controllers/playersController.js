"use strict";

const router = require('express').Router();
import Player from "../../models/Player";

// get all by chronicle id
router.get("/all/:id", async (req, res) => {
    try {
        let players = await Player.find({ chronicleId: req.params.id, active: true });
        res.json(players.sort((a, b) => a.createdAt < b.createdAt));
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.get("/characters", async (req, res) => {
    try {
        if (!req.session.playerId) {
            res.status(204).send();
        }
        else {
            res.json(await Player.findOne({ _id: req.session.playerId }).populate("characters"));
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.get("/:id/characters", async (req, res) => {
    try {
        res.json(await Player.findOne({ _id: req.params.id }).populate("characters"));
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

export default router;