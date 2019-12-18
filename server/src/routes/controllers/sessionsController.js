"use strict";

const router = require('express').Router();
import Session from '../../models/Session';
import Story from '../../models/Story';
import Character from '../../models/Character';

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

// get by id for player
router.get("/player/:id", async (req, res) => {
    try {
        let characters = await Character.find({ userId: req.session.userId }).select("_id");
        let session = await Session.findOne({ _id: req.params.id, "characters.characterId": { $in: characters } }, {
            globalNote: true,
            characters: true,
            sessionDate: true,
            "characters.characterId": true,
            "characters.playerNote": true,
            "characters.experiencePoints": true,
            "characters.characterName": true
        });
        if (session) {
            res.json({
                _id: session._id,
                globalNote: session.globalNote,
                sessionDate: session.sessionDate,
                characters: session.characters.filter(c => {
                    return characters.find(character => {
                        return character._id.equals(c.characterId);
                    });
                })
            });
        }
        else {
            res.json({});
        }
    } catch (e) {
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

// update by id for player
router.put("/player/:id", async (req, res) => {
    try {
        let session = await Session.findById(req.params.id);
        let characters = await Character.find({ chronicleId: session.chronicleId, userId: req.session.userId }, "_id");
        await Session.findOneAndUpdate({
            _id: req.params.id,
            "characters.characterId": {
                $in: characters
            },
        }, { 
            "$set": {
                "characters.$.playerNote": req.body.characters[0].playerNote
            }
        });
        res.json({});
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
        }, req.body));
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// get on going session by chronicle id
router.get("/ongoing/player/:id", async (req, res) => {
    try {
        if (await Story.findOne({ chronicleId: req.params.id, onGoing: true })) {
            let characters = await Character.find({ userId: req.session.userId, chronicleId: req.params.id }).select("_id");
            console.log(characters);
            let session = await Session.findOne({ 
                chronicleId: req.params.id, 
                "characters.characterId": { $in: characters }, 
                completed: false 
            }, {
                globalNote: true,
                characters: true,
                sessionDate: true,
                "characters.characterId": true,
                "characters.playerNote": true,
                "characters.experiencePoints": true,
                "characters.characterName": true
            });
            if (session) {
                res.json({
                    _id: session._id,
                    globalNote: session.globalNote,
                    sessionDate: session.sessionDate,
                    characters: session.characters.filter(c => {
                        return characters.find(character => {
                            return character._id.equals(c.characterId);
                        });
                    })
                });
            }
            else {
                res.json({});
            }
        }
        else {
            res.json({ noStory: true });
        }
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
        var query = {
            storyId: req.params.id,
            completed: true
        };

        if (req.session.role === "player") {
            let characters = await Character.find({ userId: req.session.userId }, "_id");
            query["characters.characterId"] = {
                $in: characters
            };
        }
        else {
            query.storyTeller = req.session.userId;
        }

        let sessions = await Session.find(query, {
            sessionDate: true,
            globalNote: true
        });
        res.json(sessions.sort((a, b) => a.sessionDate < b.sessionDate ? 1 : -1));
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

router.get("/search/:chronicleid/", async (req, res) => {
    try {
        let query = {
            $text: { $search: req.query.search },
            chronicleId: req.params.chronicleid
        };
        if (req.query.storyid) {
            query.storyId = req.query.storyid;
        }

        if (req.session.role === "player") {
            let characters = await Character.find({ userId: req.session.userId }, "_id");
            query["characters.characterId"] = {
                $in: characters
            };
        }
        else {
            query.storyTeller = req.session.userId;
        }

        let sessions = await Session.find(query, {
            sessionDate: true,
            globalNote: true
        });
        res.send(sessions.sort((a, b) => a.sessionDate < b.sessionDate ? 1 : -1));
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.get("/character/:characterid", async (req, res) => {
    try {
        let filter = {
            completed: true,
            "characters.characterId": req.params.characterid,
        };
        if (req.query.search) {
            filter.$text = { $search: req.query.search };
        }
        if (req.query.storyid) {
            filter.storyId = { $search: req.query.storyid };
        }
        let sessions = await Session.find(filter, {
            sessionDate: 1,
            "characters.playerNote": 1,
            characters: {
                $elemMatch: { characterId: req.params.characterid }
            }
        });
        res.json(sessions.sort((a, b) => a.sessionDate < b.sessionDate ? 1 : -1));
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

async function getOngoingStory(chronicleId, userId) {
    return await Story.findOne({ chronicleId: chronicleId, onGoing: true, storyTeller: userId });
}

export default router;