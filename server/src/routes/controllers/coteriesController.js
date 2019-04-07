"use strict";

const router = require('express').Router();
import Coterie from '../../models/Coterie';
import Chronicle from '../../models/Chronicle';

// Create new coterie
router.post("/:id", async (req, res) => {
    try {
        let chronicle = await Chronicle.findOne({ _id: req.params.id, storyTeller: req.session.userId });
        if (chronicle) {
            console.log(1);
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
        res.json(await Coterie.findOne({ _id: req.params.id }).populate("characters"));
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
    let coterie = await Coterie.findOne({ _id: req.params.id });
    await coterie.remove();
    res.send("Deleted");
});

export default router;