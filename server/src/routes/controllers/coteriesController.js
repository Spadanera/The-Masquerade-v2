"use strict";

const router = require('express').Router();
import Coterie from '../../models/Coterie';
import Chronicle from '../../models/Chronicle';

// Create new coterie
router.post("/:id", async (req, res) => {
    try {
        let chronicle = await Chronicle.findOne({ _id: req.params.id, storyTeller: req.session.userId });
        if (chronicle) {
            let coterie = new Coterie(req.body);
            await coterie.save();
            chronicle.coteries.push(coterie);
            await chronicle.save();
            res.json(coterie);
        }
        else {
            res.status(500).send("Chronacle not found");
        }
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// get by id
router.get("/:id", async (req, res) => {
    try {
        let chronicle = Chronicle.findOne({ storyTeller: req.session.userId, coteries: { "$in": [req.params.id] } });
        if (chronicle) {
            res.json(await Coterie.findOne({ _id: req.params.id }).populate("characters"));
        }
        else {
            res.status(500).json({ error: "User not authorized to see this coterie" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// get all by chronicle id
router.get("/all/:id", async (req, res) => {
    try {
        let chronicle = await Chronicle.findOne({ _id: req.params.id, storyTeller: req.session.userId }).populate("coteries");
        res.json(chronicle.coteries.sort((a, b) => a.createdAt < b.createdAt));
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.delete("/:id", async (req, res) => {
    let chronicle = Chronicle.findOne({ storyTeller: req.session.userId, coteries: { "$in": [req.params.id] } });
    if (chronicle) {
        await Coterie.findOneAndDelete({ _id: req.params.id });
        res.send("Deleted");
    }
    else {
        res.status(500).json({ error: "User not authorized to delete this coterie" });
    }
});

export default router;