"use strict";

const router = require('express').Router();
import Session from '../../models/Session';
import Story from '../../models/Story';
import Chronicle from '../../models/Chronicle';

// Create new session
router.post("/:id", async (req, res) => {
    try {
        let ongoingStory = await getOngoingStory(req.params.id, req.session.userId);
        if (ongoingStory) {
            let session = new Session(req.body);
            session.storyTeller = req.session.userId;
            session.storyId = ongoingStory._id;
            await session.save();
            ongoingStory.sessions.push(session);
            await ongoingStory.save();
            res.json(session);
        }
        else {
            res.status(404).send("Story not found");
        }
    }
    catch (e) {
        console.error(e);
        res.status(500).send(e.message);
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

// update by id
router.put("/:id", async (req, res) => {
    try {
        res.json(await Session.findOneAndUpdate({ 
            _id: req.params.id, 
            storyTeller: req.session.userId,
        }, req.body ));
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// get on going session by chronicle id
router.get("/ongoing/:id", async (req, res) => {
    try {
        if (await Story.findOne({ chronicleId: req.params.id, onGoing: true })) {
            res.json(await Session.findOne({ chronicleId: req.params.id, storyTeller: req.session.userId, completed: false }));
        }
        else {
            res.json({ noStory: true });
        }
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
            res.json(story.sessions.filter(s => s.completed === true).sort((a, b) => a.sessionDate < b.sessionDate));
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

async function getOngoingStory(chronicleId, userId) {
    console.log(chronicleId, userId);
    return await Story.findOne({ chronicleId: chronicleId, onGoing: true, storyTeller: userId });
}

export default router;