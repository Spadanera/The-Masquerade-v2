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

export default router;