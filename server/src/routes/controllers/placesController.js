"use strict";

const router = require('express').Router();
import Place from "../../models/Place";
import Player from "../../models/Player";
import Chronicle from "../../models/Chronicle";
import Character from "../../models/Character";

// create places
router.post("/:chronicleid", async (req, res) => {
    try {
        let chronicle = await Chronicle.findOne({ _id: req.params.chronicleid, storyTeller: req.session.userId });
        if (chronicle) {
            let place = new Place(req.body);
            for (let i = 0; i < place.playerVisibility.length; i++) {
                let player = await Player.findById(place.playerVisibility[i].playerId);
                place.playerVisibility[i].playerName = player.userDisplayName;
                place.playerVisibility[i].playerImage = player.userPicture;
            }
            place.storyTellerId = req.session.userId;
            place.chronicleId = req.params.chronicleid;
            await place.save();
            chronicle.places.push(place);
            await chronicle.save();
            res.json(place);
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

// get place
router.get("/:id", async (req, res) => {
    try {
        let place = await Place.findOne({ _id: req.params.id });
        place.gmaps = JSON.parse(place.gmaps);
        res.json(place);
    }

    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// get all places
router.get("/chronicle/:chronicleid", async (req, res) => {
    try {
        let places = await Place.find({ chronicleId: req.params.chronicleid });
        res.json(places);
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// get all refuges
router.get("/refuges/:chronicleid", async (req, res) => {
    try {
        let places = await Character.find({ chronicleId: req.params.chronicleid, alive: "alive", refuge: { $exists: true } }, {
            name: 1, picture: 1, refuge: 1
        });
        res.json(places);
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// update place
router.put("/:id", async (req, res) => {
    try {
        let place = req.body;
        for (let i = 0; i < place.playerVisibility.length; i++) {
            let player = await Player.findById(place.playerVisibility[i].playerId);
            place.playerVisibility[i].playerName = player.userDisplayName;
            place.playerVisibility[i].playerImage = player.userPicture;
        }
        await Place.findOneAndUpdate({ _id: place._id }, place);
        res.send("updated");
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// remove place
router.delete("/:id", async (req, res) => {
    try {
        let place = await Place.findOne({ _id: req.params.id });
        place.remove();
        res.send("Deleted");
    }

    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

export default router;