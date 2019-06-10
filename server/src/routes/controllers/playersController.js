"use strict";

const router = require('express').Router();
import Player from "../../models/Player";
import Chronicle from '../../models/Chronicle';

// get all by chronicle id
router.get("/all/:id", async (req, res) => {
    try {
        let chronicle = Chronicle.findOne({ storyTeller: req.session.userId, coteries: { "$in": [req.params.id] } });
        if (chronicle) {
            let players = await Player.find({ chronicleId: req.params.id, active: true });
            res.json(players.sort((a, b) => a.createdAt < b.createdAt));
        }
        else {
            res.status(500).json({ error: "User not authorized to get players of this chronicle" });
        }
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
        let chronicles = await Chronicle.find({ storyTeller: req.session.userId }).select("_id");
        if (chronicles) {
            res.json(await Player.findOne({ _id: req.params.id, chronicleId: { "$in": chronicles } }).populate("characters"));
        }
        else {
            res.status(500).json({ error: "User not authorized to get characters of this player" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

export default router;