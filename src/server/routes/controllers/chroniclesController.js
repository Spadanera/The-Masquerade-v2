"use strict";

const router = require('express').Router();
import Chronicle from '../../models/Chronicle';

// Get all chronicles
router.get("/", async (req, res) => {
    try {
        res.json(await Chronicle.find( { storyTeller: req.session.userId }));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Get by status
router.get("/status/:status", async (req, res) => {
    try {
        res.json(await Chronicle.find({ status: req.params.status, storyTeller: req.session.userId }));
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Get single chronicle
router.get("/:id", async (req, res) => {
    try {
        res.json(await Chronicle.findOne({ _id: req.params.id, storyTeller: req.session.userId }));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Create new chronicle
router.post("/", async (req, res) => {
    try {
        req.body.storyTeller = req.session.userId;
        let chronicle = new Chronicle(req.body);
        res.json(await chronicle.save());
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Update chronicle
router.put("/:id", async (req, res) => {
    try {
        res.json(await Chronicle.findByIdAndUpdate({ _id: req.params.id, storyTeller: req.session.userId }, req.body));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Delete chronicle
router.delete("/:id", async (req, res) => {
    try {
        res.json(await Chronicle.findByIdAndRemove({ _id: req.params.id, storyTeller: req.session.userId }));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.put("/archive/:id", async (req, res) => {
    try {
        res.json(await Chronicle.findByIdAndUpdate({ _id: req.params.id, storyTeller: req.session.userId }, { status: "Archive" }));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.put("/activate/:id", async (req, res) => {
    try {
        res.json(await Chronicle.findByIdAndUpdate({ _id: req.params.id, storyTeller: req.session.userId }, { status: "Live" }));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.put("/resume/:id", async (req, res) => {
    try {
        res.json(await Chronicle.findByIdAndUpdate({ _id: req.params.id, storyTeller: req.session.userId }, { status: "Draft" }));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

export default router;