"use strict";

const router = require('express').Router();
import Chronicle from '../../models/Chronicle';
import Player from '../../models/Player';
import User from '../../models/User';

// Get all chronicles
router.get("/", async (req, res) => {
    try {
        res.json(await Chronicle.find({ storyTeller: req.session.userId }));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.get("/player", async (req, res) => {
    try {
        let players = await Player.find({ userId: req.session.userId }).select("_id");
        let chronicles = await Chronicle.find({ players: { "$in": players } }).select('name shortDescription publicStory createdAt status backgroundImage storyTeller');
        let chronicleOutput = [];
        for (var i = 0; i < chronicles.length; i++) {
            let chronicle = chronicles[i];
            let user = await User.findOne({ _id: chronicles[i].storyTeller }) || {};
            if (user) {
                chronicle.storyTellerName = user.displayName;
                chronicle.storyTellerPicture = user.picture;
            }
            chronicleOutput.push({
                _id: chronicle._id,
                storyTellerName: user.displayName,
                storyTellerPicture: user.picture,
                name: chronicle.name,
                shortDescription: chronicle.shortDescription,
                publicStory: chronicle.publicStory,
                createdAt: chronicle.createdAt,
                status: chronicle.status,
                backgroundImage: chronicle.backgroundImage
            });
        }
        res.json(chronicleOutput);
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.get("/player/:id", async (req, res) => {
    try {
        let players = await Player.find({ userId: req.session.userId }).select("_id");
        let chronicle = await Chronicle.findOne({ _id: req.params.id, players: { "$in": players } })
            .select('name shortDescription publicStory createdAt status backgroundImage');
            console.log("req.session.userId", req.session.userId);
        let player = await Player.findOne({ userId: req.session.userId, chronicleId: req.params.id }).select('_id');
        console.log("player._id", player._id);
        res.json(chronicle);
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
        req.body.storyTeller = req.session.userId; // "5c97bdf8664eff178ec46579";
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
        res.json(await Chronicle.findOneAndUpdate({ _id: req.params.id, storyTeller: req.session.userId }, req.body));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Delete chronicle
router.delete("/:id", async (req, res) => {
    try {
        let chronicle = await Chronicle.findOne({ _id: req.params.id, storyTeller: req.session.userId });
        await chronicle.remove();
        res.send("Deleted");
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.put("/archive/:id", async (req, res) => {
    try {
        res.json(await Chronicle.findOneAndUpdate({ _id: req.params.id, storyTeller: req.session.userId }, { status: "Archive" }));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.put("/activate/:id", async (req, res) => {
    try {
        res.json(await Chronicle.findOneAndUpdate({ _id: req.params.id, storyTeller: req.session.userId }, { status: "Live" }));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.put("/resume/:id", async (req, res) => {
    try {
        res.json(await Chronicle.findOneAndUpdate({ _id: req.params.id, storyTeller: req.session.userId }, { status: "Draft" }));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.post("storyongoing/:id", async (req, res) => {
    try {

    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

export default router;