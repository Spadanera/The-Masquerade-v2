"use strict";

const router = require('express').Router();
const imageToUri = require('image-to-uri');
import Character from '../../models/Character';
import Coterie from '../../models/Coterie';
import Player from '../../models/Player';
import Chronicle from '../../models/Chronicle';

// Get single character owned by player from story-teller
router.get("/story-teller/:id", async (req, res) => {
    try {
        let chronicles = await Chronicle.find({ storyTeller: req.session.userId }).select("_id");
        let player = await Player.find({ chronicleId: { "$in": chronicles }, characters: { "$in": [req.params.id] } });
        if (player) {
            res.json(await Character.findOne({ _id: req.params.id }));
        }
        else {
            res.status(500).json({ error: "Story Teller not allowed to get this character" });
        }
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Get single character
router.get("/:id", async (req, res) => {
    try {
        res.json(await Character.findOne({ _id: req.params.id, userId: req.session.userId }));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Create new character for Player
router.post("/", async (req, res) => {
    try {
        let character = createCharacter(req);
        let player = await Player.findOne({ _id: req.session.playerId });
        if (player) {
            character.chronicleId = player.chronicleId;
            player.characters.push(character);
            await player.save();
            res.json(character.save());
        }
        else {
            res.status(500).json({ error: "Player not found" });
        }
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Create new character for Coterie
router.post("/:id", async (req, res) => {
    try {
        let chronicle = Chronicle.findOne({ storyTeller: req.session.userId, coteries: { "$in": [req.params.id] } });
        if (chronicle) {
            let character = createCharacter(req);
            let coterie = await Coterie.findOne({ _id: req.params.id });
            if (coterie) {
                coterie.characters.push(character);
                await coterie.save();
                res.json(await character.save());
            }
            else {
                res.status(500).json({ error: "Coterie not found" });
            }
        }
        else {
            res.status(500).json({ error: "User not authorized to create character in this coterie" });
        }
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// set image for character
router.post("/picture/:characterid", async (req, res) => {
    try {
        if (req.files && req.files.file) {
            let character = await Character.findById(req.params.characterid);
            character.picture = imageToUri(req.files.file.path);
            await character.save();
            res.send();
        }
        else {
            throw "Missing file";
        }
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Edit character
router.put("/:id", async (req, res) => {
    try {
        req.body.updateAt = Date.now();
        res.json(await Character.findByIdAndUpdate({ _id: req.params.id, userId: req.session.userId }, req.body));
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Delete character
router.delete("/:id", async (req, res) => {
    try {
        res.json(await Character.findByIdAndRemove({ _id: req.params.id, storyTeller: req.session.userId }));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

function createCharacter(req) {
    return new Character({
        userId: req.session.userId, // "5c97bdf8664eff178ec46579",
        name: req.body.name,
        alive: true,
        picture: req.body.picture,
        startingExperience: req.body.startingExperience,
        totalExperience: req.body.startingExperience,
        mortal: {},
        mainInformation: req.body.mainInformation || {},
        health: {},
        willPower: {},
        attributes: {
            physical: Character.createCapacities(["strength", "dexterity", "stamina"]),
            social: Character.createCapacities(["carisma", "manipulation", "composure"]),
            mental: Character.createCapacities(["intelligence", "wits", "resolve"])
        },
        skills: {
            talents: Character.createCapacities(["athletics", "brawl", "craft", "drive", "firearms", "larceny", "melee", "stealth", "survival"]),
            skills: Character.createCapacities(["animalKen", "etiquette", "insight", "intimidation", "leadership", "performance", "persuasion", "streetwise", "subterfuge"]),
            knowledges: Character.createCapacities(["academics", "awareness", "finance", "investigation", "medicine", "occult", "politics", "science", "technology"])
        },
        disciplines: [],
        advantages: [],
        flaws: [],
        backgrounds: []
    });
}

export default router;