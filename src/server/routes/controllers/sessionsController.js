"use strict";

const router = require('express').Router();
import Session from '../../models/Session';
import Story from '../../models/Story';

// Create new session
router.post("/:id", async (req, res) => {
    try {
        let story = await Story.findOne({ _id: req.params.id }); //, storyTeller: req.session.userId });
        if (story) {
            console.log(req.body);
            let session = new Session(req.body);
            await session.save();
            story.sessions.push(session);
            await story.save();
            res.json(session);
        }
        else {
            res.status(500).send("Story not found");
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
        res.json(await Session.findOne({ _id: req.params.id, storyTeller: req.session.userId }));
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// get all by story id
router.get("/all/:id", async (req, res) => {
    try {
        let story = await Story.findOne({ _id: req.params.id, storyTeller: req.session.userId }).populate("sessions");
        if (story) {
            res.json(story.sessions.sort((a, b) => a.createdAt < b.createdAt));
        }
        else {
            res.json([]);
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.delete("/:id", async (req, res) => {
    let session = await Session.findOne({ _id: req.params.id });
    await session.remove();
    res.send("Deleted");
});

export default router;