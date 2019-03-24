"use strict";

const router = require('express').Router();
import Character from '../../models/Character';

// Get single character
router.get("/:id", async (req, res) => {
    try {
        res.json(await Character.findOne({ _id: req.params.id, player: req.session.userId }));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Create new character
router.post("/", async (req, res) => {
    try {
        // req.body.player = req.session.userId;
        let character = await Character.create("5c97bdf8664eff178ec46579");
        res.json(character);
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

export default router;