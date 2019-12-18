"use strict";

const router = require('express').Router();
import Story from '../../models/Story';
import Chronicle from '../../models/Chronicle';
import Player from '../../models/Player';

// Create new story
router.post("/:id", async (req, res) => {
    try {
        let chronicle = await Chronicle.findOne({ _id: req.params.id, storyTeller: req.session.userId });
        if (chronicle) {
            let story = new Story(req.body);
            story.storyTeller = chronicle.storyTeller;
            story.onGoing = false;
            story.chronicleId = chronicle._id;
            await story.save();
            chronicle.stories.push(story);
            await chronicle.save();
            res.json(story);
        }
        else {
            res.status(500).send("Chronicle not found");
        }
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// get by id for player
router.get("/player/:id", async (req, res) => {
    try {
        let story = await Story.findOne({ _id: req.params.id });
        let player = await Player.findOne({ chronicleId: story.chronicleId, userId: req.session.userId });
        if (story) {
            let chronicle = await Chronicle.findOne({
                stories: { $in: [story._id] },
                players: { $in: [player._id] }
            });
            if (chronicle) {
                res.json(story);
            }
            else {
                res.json({});
            }
        }
        else {
            res.json({});
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// get all by chronicle id for player
router.get("/all/player/:id", async (req, res) => {
    try {
        let player = await Player.findOne({ chronicleId: req.params.id, userId: req.session.userId });
        let chronicle = await Chronicle.findOne({ _id: req.params.id, players: { $in: [player._id] } }).populate("stories");
        if (chronicle) {
            res.json(chronicle.stories.sort((a, b) => a.createdAt < b.createdAt));
        } else {
            res.json([]);
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// get by id
router.get("/:id", async (req, res) => {
    try {
        res.json(await Story.findOne({ _id: req.params.id, storyTeller: req.session.userId }));
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.put("/:id", async (req, res) => {
    try {
        res.json(await Story.findOneAndUpdate({ _id: req.params.id, storyTeller: req.session.userId }, req.body));
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// get all by chronicle id
router.get("/all/:id", async (req, res) => {
    try {
        let chronicle = await Chronicle.findOne({ _id: req.params.id, storyTeller: req.session.userId }).populate("stories");
        if (chronicle) {
            res.json(chronicle.stories.sort((a, b) => a.createdAt < b.createdAt));
        } else {
            res.json([]);
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.put("/start/:chronicleid/:id", async (req, res) => {
    try {
        let onGoingStory = await Story.findOne({ chronicleId: req.chronicleid, onGoing: true });
        if (onGoingStory) {
            res.status(500).send("Another story is on going");
        }
        else {
            let story = await setOnGoing(req.params.id, req.session.userId, true);
            res.json(story);
        }
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

router.put("/close/:id", async (req, res) => {
    try {
        let story = await setOnGoing(req.params.id, req.session.userId, false);
        res.json(story);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// delete stories
router.delete("/:id", async (req, res) => {
    let story = await Story.findOne({ _id: req.params.id, storyTeller: req.session.userId });
    await story.remove();
    res.send("Deleted");
});

async function setOnGoing(storyId, userId, onGoing) {
    return await Story.findOneAndUpdate({ _id: storyId, storyTeller: userId }, {
        onGoing: onGoing
    });
}

export default router;